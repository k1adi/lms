<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseOnlineResource;
use App\Models\Course;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

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

        return Inertia::render('Course/Online', [
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

        return Inertia::render('Course/Offline', [
            'courses' => Course::forUserWithPosition(auth()->user(), 'offline')->paginate(),
        ]);
    }

    public function detail(string $code): Response
    {
        $course = Course::where('code', $code)->firstOrFail();
        $page = ($course->type === 'online') ? 'DetailOnline' : 'DetailOffline';
        
        if($course->type == 'online') {
            $course->load('sections.subSection');
            $course['progression'] = [];
        }

        return Inertia::render("Course/$page", [
            'course' => $course,
        ]);
    }

    public function section($code, $section, $sub_section)
    {
        $course = Course::where('code', $code)->firstOrFail();
        $course->load('sections.subSection');
        $section = $course->sections()->findOrFail($section);
        $subSection = $section->subSection()->findOrFail($sub_section);

        $user = auth()->user();
        $user = User::findOrFail($user->id);
        $user->courseProgress()->syncWithoutDetaching([$subSection->id]);

        return Inertia::render('Course/Content', [
            'course' => $course,
            'section' => $section,
            'lesson' => $subSection
        ]);
    }
}
