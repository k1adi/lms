<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAssignmentRequest;
use App\Http\Requests\CreateObservationRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Http\Resources\TestDetailResource;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\UserAssignmentLog;
use App\Models\UserBuPosition;
use DateTime;
use DateTimeZone;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Authorize the action using Gate
        Gate::authorize('assignment_access');
        $assignments = Assignment::with('course')->paginate();

        return Inertia::render('Tes/Index', [
            'assignments' => $assignments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $course = Course::withoutAssignment()->map(function($item) {
            return ['id' => $item->id, 'name' => $item->name];
        });

        return Inertia::render('Tes/Create', [
            'courses' => $course,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateAssignmentRequest $request): RedirectResponse
    {
        DB::beginTransaction(); // Start the transaction

        try {
            $validated = $request->validated();
            $validated['code'] = Assignment::generateCode();            
            $assignment = Assignment::create($validated);

            if($validated['type'] === 'knowledge') {
                foreach ($request->input('questions', []) as $questions) {
                    $question = $assignment->questions()->create(['text' => $questions['text']]);
                    foreach ($questions['answers'] as $answers) {
                        $question->answers()->create($answers);
                    }
                }
            }

            DB::commit();
            return Redirect::route('tests.index')->with('success', 'Assignment created');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $courses = Course::all();
        $assignment = Assignment::findOrFail($id);
        $assignment->load('course');

        if($assignment->type == 'knowledge') {
            $assignment->load('questions.answers');
        }

        return Inertia::render('Tes/Edit', [
            'assignment' => $assignment,
            'courses' => $courses
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssignmentRequest $request, string $id): RedirectResponse
    {
        DB::beginTransaction(); // Start the transaction
        $assignment = Assignment::findOrFail($id);

        try {
            $validated = $request->validated();
            $assignment->fill($validated);
            $assignment->save(); // Ensure the assignment is saved

            if ($validated['type'] === 'knowledge') {
                // Handle questions
                $questions = $request->input('questions', []);

                // Get the current question IDs
                $existingQuestionIds = $assignment->questions()->pluck('id')->toArray();
                $newQuestionIds = collect($questions)->pluck('id')->filter()->toArray(); // Only keep non-null IDs

                // Delete questions that are not in the update request
                $questionsToDelete = array_diff($existingQuestionIds, $newQuestionIds);
                $assignment->questions()->whereIn('id', $questionsToDelete)->delete();

                foreach ($questions as $questionData) {
                    // Update or create the question
                    $question = $assignment->questions()->updateOrCreate(
                        ['id' => $questionData['id'] ?? null],
                        ['text' => $questionData['text']]
                    );

                    // Handle answers
                    $answers = $questionData['answers'] ?? [];
                    
                    // Get the current answer IDs for the question
                    $existingAnswerIds = $question->answers()->pluck('id')->toArray();
                    $newAnswerIds = collect($answers)->pluck('id')->filter()->toArray();

                    // Delete answers that are not in the update request
                    $answersToDelete = array_diff($existingAnswerIds, $newAnswerIds);
                    $question->answers()->whereIn('id', $answersToDelete)->delete();

                    foreach ($answers as $answerData) {
                        // Update or create the answer
                        $question->answers()->updateOrCreate(
                            ['id' => $answerData['id'] ?? null],
                            [
                                'question_id' => $question->id,
                                'text' => $answerData['text'],
                                'is_correct' => $answerData['is_correct'] ?? false,
                            ]
                        );
                    }
                }
            }

            DB::commit();
            return Redirect::route('tests.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        Gate::authorize('assignment_delete');
        $assignment = Assignment::findOrFail($id);

        $assignment->delete();
        return Redirect::back();
    }

    /**
     * Show the form for creating a new observation test.
     */
    public function observation(): Response
    {
        $assignments = Assignment::with('course.assignPosition')
            ->where('type', 'skill')
            ->get()
            ->map(function ($assignment) {
                $assignment['position'] = $assignment->course->assignPosition->pluck('pivot.position_id');
                // Hide the pivot attribute from the assignment's data
                $assignment->course->assignPosition->makeHidden('pivot');
                return $assignment;
            });

        return Inertia::render('Tes/Observation', [
            'assignments' => $assignments
        ]);
    }

    public function storeObservation(CreateObservationRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();
            $validated['created_at'] = new DateTime('now', new DateTimeZone('Asia/Jakarta'));
    
            UserAssignmentLog::create([
                'user_id' => $validated['user_id'],
                'assignment_id' => $validated['assignment_id'],
                'score' => $validated['score'],
                'status' => $validated['status'],
                'created_at' => $validated['created_at'],
            ]);
    
            return Redirect::route('tests.index');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

    public function userObservation(Request $request): JsonResponse
    {
        $positions = $request->query('positions');

        if(!$positions){
            return response()->json([]);
        }

        $users = UserBuPosition::with('user')->whereIn('position_id', $positions)->get();
        $responseUser = $users->unique('user_id')->map(function ($item) {
            return [
                'value' => $item->user->id,
                'label' => $item->user->full_name
            ];
        })->values();

        return response()->json($responseUser);
    }
}
