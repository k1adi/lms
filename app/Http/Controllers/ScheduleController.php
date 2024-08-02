<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\CreateScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;
use App\Models\Course;
use App\Models\Schedule;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use PhpParser\Node\Expr\Cast\Array_;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Schedule/Index', [
            'schedules' => Schedule::with(['course'])->paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Schedule/Create', [
            'courses' => $this->getOfflineCourse(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateScheduleRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();
            $input = $this->createObjectSchedule($validated);

            // Insert schedule data to schedule table
            Schedule::create($input);

            return Redirect::route('schedules.index');
        } 
        catch (\Exception $e) {
            dd($e);
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

        return Inertia::render('Schedule/Edit', [
            'schedule' => $schedule,
            'courses' => $this->getOfflineCourse(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduleRequest $request, Schedule $schedule): RedirectResponse
    {
        try {
            $validated = $request->validated();
            $input = $this->createObjectSchedule($validated);
            
            // Update schedule data to schedule table
            $schedule->fill($input);
            $schedule->save();

            return Redirect::route('schedules.index');
        } 
        catch (\Exception $e) {
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
        $schedule->delete();
        return Redirect::back();
    }

    // Get offline course
    public function getOfflineCourse(): Collection
    {
        return Course::where('type', 'offline')->get();
    }

    public function createObjectSchedule(array $input): array
    {
        return [
            'course_id' => $input['course_id']['value'],
            'start_time' => convertToJakartaTime($input['start_time']),
            'end_time' => convertToJakartaTime($input['end_time'])
        ];
    }
}
