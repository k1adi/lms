<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\CreateScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;
use App\Models\Course;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Authorize the action using Gate
        Gate::authorize('schedule_access');

        return Inertia::render('Schedule/Index', [
            'schedules' => Schedule::with(['course'])->paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $users = User::all()->map(function ($item) {
            return [ 'value' => $item->id, 'label' => $item->full_name ];
        });
        $courses = $this->labelOfflineCourse($this->getOfflineCourse()); 

        return Inertia::render('Schedule/Create', [
            'courses' => $courses,
            'users' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateScheduleRequest $request): RedirectResponse
    {
        DB::beginTransaction(); // Start the transaction
        try {
            $validated = $request->validated();
            $input = $this->createObjectSchedule($validated);

            // Insert schedule data to schedule table
            $schedule = Schedule::create($input);
            // Sync user_id with schedule_id
            $schedule->assignUser()->sync($validated['user_id']);

            DB::commit();
            return Redirect::route('schedules.index');
        } 
        catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e
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
    public function edit(Schedule $schedule)
    {
        $schedule->load('course');
        $schedule['users'] = $schedule->assignUser->map(function ($item) {
            return ['value' => $item->id, 'label' => $item->full_name];
        });

        // Remove the duplicated `assign_user` key if it exists
        unset($schedule->assignUser);

        $courses = $this->labelOfflineCourse($this->getOfflineCourse());
        $users = User::all()->map(function ($item) {
            return [ 'value' => $item->id, 'label' => $item->full_name ];
        });
        return Inertia::render('Schedule/Edit', [
            'schedule' => $schedule,
            'courses' => $courses,
            'allUser' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduleRequest $request, Schedule $schedule): RedirectResponse
    {
        DB::beginTransaction(); // Start the transaction
        try {
            $validated = $request->validated();
            $input = $this->createObjectSchedule($validated);
            
            // Update schedule data to schedule table
            $schedule->fill($input);
            $schedule->save();
            // Sync user_id with schedule_id
            $schedule->assignUser()->sync($validated['user_id']);

            DB::commit();
            return Redirect::route('schedules.index');
        } 
        catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule): RedirectResponse
    {
        // Authorize the action using Gate
        Gate::authorize('schedule_delete');

        $schedule->delete();
        return Redirect::back();
    }

    // Get offline course
    public function getOfflineCourse(): Collection
    {
        return Course::where('type', 'offline')->get();
    }

    public function labelOfflineCourse(Collection $course): SupportCollection
    {
        return $course->map(function ($item) {
            return [ 'value' => $item->id, 'label' => $item->name ];
        });
    }

    private function createObjectSchedule(array $input): array
    {
        return [
            'course_id' => $input['course_id'],
            'start_time' => convertToJakartaTime($input['start_time']),
            'end_time' => convertToJakartaTime($input['end_time']),
            'desc' => $input['desc']
        ];
    }
}
