<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseOnlineResource;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class TrainingController extends Controller
{
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
        $course = Course::where('code', $code)
            ->with(['hasAssignment' => function ($query) {
                $query->whereNotNull('id'); // Load only if an assignment exists
            }])
        ->firstOrFail();
        $page = ($course->type === 'online') ? 'DetailOnline' : 'DetailOffline';
        
        if($course->type == 'online') {
            $course->load('sections.subSection');
        }

        return Inertia::render("Training/$page", [
            'course' => $course,
        ]);
    }

    public function section($code, $section, $sub_section): Response
    {
        $course = Course::where('code', $code)->firstOrFail();
        $course->load('sections.subSection');
        $section = $course->sections()->findOrFail($section);
        $subSection = $section->subSection()->findOrFail($sub_section);

        $user = auth()->user();
        $user = User::findOrFail($user->id);
        $user->courseProgress()->syncWithoutDetaching([$subSection->id]);

        return Inertia::render('Training/Content', [
            'course' => $course,
            'section' => $section,
            'lesson' => $subSection
        ]);
    }

    public function test(string $code): Response
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
            'course' => $course
        ]);
    }

    public function testValidate(Request $request)
    {
        $id = $request->input('id');
        $answers = $request->input('answers');
        $correctAnswers = Assignment::where('id', $id)
            ->with(['questions.answers' => function($query) {
                $query->where('is_correct', true); // Filter for correct answers
            }])
            ->get()
            ->pluck('questions.*.answers.*.id')
            ->flatten(); // Flatten the nested array into a single collection

        $correctAnswers = $correctAnswers->toArray();
        $correctAnswers = array_map('strval', $correctAnswers);

        $userAnswer = array_values($answers);
        $userAnswer = array_map('strval', $userAnswer);
        
        // Find the matching answers using array_intersect
        $matchingAnswers = array_intersect($correctAnswers, $userAnswer);
        // Count the number of matching values
        $countMatching = count($matchingAnswers);
        $totalQuestion = count($correctAnswers);

        $grade = ($countMatching / $totalQuestion) * 100;
        // Return or display the result
        dd([
            'Grade' => $grade,  // Output: [2, 6]
            'Count of matching values' => $countMatching // Output: 2
        ]); 
    }
}
