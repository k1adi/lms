<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseOnlineResource;
use App\Http\Resources\TrainingDetailResource;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;

class TrainingController extends Controller
{
    private function getCourseWithAssignment(string $column, $value): Course
    {
        return Course::where($column, $value)
               ->with(['hasAssignment' => function ($query) {
                   $query->whereNotNull('id'); // Load only if an assignment exists
               }])->firstOrFail();
    }

    /**
     * Display a listing of the Online Training.
     */
    public function online(): Response
    {
        // Authorize the action using Gate
        Gate::authorize('online_course_access');

        // Fetch courses for the authenticated user's positions
        $courses = Course::forUserWithPosition(auth()->user(), 'online')
                   ->with('sections.subSection') // Eager load sections and sub-sections
                   ->paginate();

        return Inertia::render('Training/Online', [
            'courses' => CourseOnlineResource::collection($courses),
        ]);
    }

    
    /**
     * Display a listing of the Offline Training.
     */
    public function offline(): Response
    {
        // Authorize the action using Gate
        Gate::authorize('offline_course_access');

        return Inertia::render('Training/Offline', [
            'courses' => Course::forUserWithPosition(auth()->user(), 'offline')->paginate(),
        ]);
    }

    public function detail(string $code): Response
    {
        $course = $this->getCourseWithAssignment('code', $code);
        // Conditionally load sections.subSection if the course is 'online'
        if ($course->type === 'online') {
            $course->load('sections.subSection');
            $firstSection = $course->sections->first();
            $firstSubSection = $firstSection->subSection->first();
        }

        $page = ($course->type === 'online') ? 'DetailOnline' : 'DetailOffline';

        return Inertia::render("Training/$page", [
            'course' => new TrainingDetailResource($course),
            'section' => $firstSection->id ?? null,
            'subSection' => $firstSubSection->id ?? null,
        ]);
    }

    public function section($code, $section, $sub_section): Response
    {
        $course = $this->getCourseWithAssignment('code', $code);
        $course->load('sections.subSection');
        $section = $course->sections()->findOrFail($section);
        $subSection = $section->subSection()->findOrFail($sub_section);

        $user = auth()->user();
        $user = User::findOrFail($user->id);
        $user->courseProgress()->syncWithoutDetaching([$subSection->id]);

        return Inertia::render('Training/Content', [
            'course' => new TrainingDetailResource($course),
            'section' => $section,
            'lesson' => $subSection
        ]);
    }

    public function test(string $code)
    {
        $assignment = Assignment::where('code', $code)->firstOrFail();
        $assignment->load('questions.answers');
        
        $course = Course::with(['hasAssignment' => function ($query) {
            $query->whereNotNull('id'); // Load only if an assignment exists
        }])->findOrFail($assignment->course_id);
        if($course->type == 'online') {
            $course->load('sections.subSection');
        }

        return Inertia::render('Training/Test', [
            'assignment' => $assignment,
            'course' => new TrainingDetailResource($course)
        ]);
    }

    public function testValidate(Request $request)
    {
        try {
            $course_id = $request->input('course_id');
            $assignment_id = $request->input('assignment_id');
            $answers = $request->input('answers');
            $assignmentData = Assignment::where('id', $assignment_id)
                ->with(['questions.answers' => function($query) {
                    $query->where('is_correct', true); // Filter for correct answers
                }])
                ->first(); // Use first() since you're fetching a single assignment, not a collection
    
            // Retrieve the minimum_score from the assignment
            $minimum_score = $assignmentData->minimum_score;
    
            // Retrieve the correct answer IDs (flatten the nested array)
            $correctAnswers = $assignmentData->questions->pluck('answers.*.id')->flatten();
    
            $correctAnswers = $correctAnswers->toArray();
            $correctAnswers = array_map('strval', $correctAnswers);
    
            $userAnswer = array_values($answers);
            $userAnswer = array_map('strval', $userAnswer);
            
            // Find the matching answers using array_intersect
            $matchingAnswers = array_intersect($correctAnswers, $userAnswer);
            // Count the number of matching values
            $countMatching = count($matchingAnswers);
            $totalQuestion = count($correctAnswers);
    
            $score = ($countMatching / $totalQuestion) * 100;
            
            $user = auth()->user();
            $user = User::findOrFail($user->id);
    
            $passed = intval($score) >= intval($minimum_score);
            
            $user->assignmentLog()->attach([
                $assignment_id => [
                    'score' => $score, 'status' => (string)(int)$passed, 'created_at' => now()
                ]
            ]);
    
            if($passed) {
                $user->courseFinisheds()->syncWithoutDetaching([$course_id]);
                DB::commit();
                return Redirect::route('training.online.index')->with('success', 'Selamat anda lulus dengan nilai ' . $score);
            }

            DB::commit();
            return Redirect::back()->with('error', 'Mohon maaf, Anda tidak lulus');
        } catch (\Exception $e) {
            dd($e);
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }
}
