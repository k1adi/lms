<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAccessRequest;
use App\Models\User;
use App\Models\Course;
use App\Models\Position;
use App\Models\Schedule;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\UpdateCourseAccessRequest;
use App\Http\Requests\UpdateScheduleAccessRequest;
use App\Http\Resources\ScheduleAccessResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AccessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Authorize the action using Gate
        Gate::authorize('accessible_access');

        $courses = Course::with(['assignPosition'])->whereHas('assignPosition')->paginate();
        $schedules = Schedule::with(['course', 'assignUser'])->whereHas('assignUser')->paginate();

        return Inertia::render('Access/Index', [
            'courses' => $courses,
            'schedules' => ScheduleAccessResource::collection($schedules),
        ]);
    }

    public function create(Request $request)
    {
        $page = $request->query('page');

        if (is_null($page) || !in_array($page, ['course', 'schedule'])) {
            // Redirect back if 'page' is invalid or null with an error message
            return Redirect::route('access.index');
        }

        $data = ($page == 'course') 
            ? Course::withoutAccess()->map(function ($item) {
                return [ 'id' => $item->id, 'name' => $item->name ];
            })
            : Schedule::withoutAccess()->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->course->name,
                    'start_time' => $item->start_time,
                    'end_time' => $item->end_time,
                    'desc' => $item->desc
                ];
            });
        $access = ($page == 'course') 
            ? Position::all()->map(function ($item){
                return [ 'id' => $item->id, 'name' => $item->name ];
            })
            : User::all()->map(function ($item) {
                return [ 'id' => $item->id, 'name' => $item->full_name ];
            });

        return Inertia::render('Access/Create', [
            'page' => ucfirst($page),
            'datas' => $data,
            'access' => $access,
        ]);
    }

    public function store(CreateAccessRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();
            $id = $validated['datas']['value'];
            $options = array_column($validated['access'], 'value'); // Use array_column for simplicity
    
            if ($validated['page'] === 'course') {
                $course = Course::findOrFail($id);
                $course->assignPosition()->sync($options);
            } else {
                $schedule = Schedule::findOrFail($id);
                $schedule->assignUser()->sync($options);
            }
    
            return redirect()->route('access.index'); // Use route name for redirection
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage() // Return the exception message only
            ])->withInput();
        }
    }

    public function editCourseAccess(Course $course): Response
    {
        $course->load('assignPosition');

        return Inertia::render('Access/Course/Edit', [
            'course' => $course,
            'positions' => Position::all(),
        ]);
    }

    public function editScheduleAccess(Schedule $schedule): Response
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
