<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Course;
use App\Models\Position;
use App\Models\Schedule;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\UpdateCourseAccessRequest;
use App\Http\Requests\UpdateScheduleAccessRequest;
use Illuminate\Support\Facades\Redirect;

class AccessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $courses = Course::with(['assignPosition'])->whereHas('assignPosition')->paginate();
        $schedules = Schedule::with(['course', 'assignUser'])->whereHas('assignUser')->paginate();

        return Inertia::render('Access/Index', [
            'courses' => $courses,
            'schedules' => $schedules,
        ]);
    }

    public function courseAccess(Course $course): Response
    {
        $course->load('assignPosition');

        return Inertia::render('Access/Course/Edit', [
            'course' => $course,
            'positions' => Position::all(),
        ]);
    }

    public function scheduleAccess(Schedule $schedule): Response
    {
        $schedule->load(['course', 'assignUser']);

        return Inertia::render('Access/Schedule/Edit', [
            'schedule' => $schedule,
            'users' => User::all()
        ]);
    }

    public function updateCourse(UpdateCourseAccessRequest $request, Course $course): RedirectResponse
    {
        try {
            $validated = $request->validated();

            $positions = array_map(function($position) {
                return $position['value'];
            }, $validated['positions']);

            $course->assignPosition()->sync($positions);

            return Redirect::route('access.index');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

    public function updateSchedule(UpdateScheduleAccessRequest $request, Schedule $schedule): RedirectResponse
    {
        try {
            $validated = $request->validated();

            $users = array_map(function($user) {
                return $user['value'];
            }, $validated['users']);

            $schedule->assignUser()->sync($users);

            return Redirect::route('access.index');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }
}
