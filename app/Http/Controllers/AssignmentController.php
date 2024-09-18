<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAssignmentRequest;
use App\Http\Requests\CreateObservationRequest;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\UserAssignmentLog;
use App\Models\UserBuPosition;
use Carbon\Carbon;
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
        $tes = Assignment::paginate();

        return Inertia::render('Tes/Index', [
            'tes' => $tes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $course = Course::all();

        return Inertia::render('Tes/Create', [
            'courses' => $course,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateAssignmentRequest $request)
    {
        DB::beginTransaction(); // Start the transaction

        try {
            $validated = $request->validated();
            $validated['code'] = Assignment::generateCode();            
            $assignment = Assignment::create($validated);

            if($validated['type'] === 'knowledge') {
                foreach ($request->input('questions', []) as $questions) {
                    $question = $assignment->questions()->create(['text' => $questions['name']]);
                    foreach ($questions['answers'] as $answers) {
                        $question->answers()->create($answers);
                    }
                }
            }

            DB::commit();
            return Redirect::route('tests.index')->with('success', 'Assignment created');
        } catch (\Exception $e) {
            DB::rollBack();
        
            dd($e);
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
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
