<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Course/Index', [
            'courses' => Course::paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Course/Create', [
            'courses' => Course::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCourseRequest $request)
    {
        try{
            $validated = $request->validated();
            $validated['type'] = $validated['type']['value'];
            if(isset($validated['prerequisite'])){
                $validated['prerequisite'] = $validated['prerequisite']['value'];
            }

            $validated['code'] = Carbon::now()->timestamp;
            $course = Course::create($validated);

            // Handle sections and subsections if type is 'online'
            if ($validated['type'] === 'online') {
                foreach ($request->input('sections', []) as $sectionData) {
                    $section = $course->sections()->create(['name' => $sectionData['name']]);
                    foreach ($sectionData['subsections'] as $subsectionData) {
                        $section->subSection()->create($subsectionData);
                    }
                }
            }

            return Redirect::route('courses.index');
        } catch (\Exception $e) {
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
    public function edit(Course $course): Response
    {
        // dd($course->type);
        if($course->type == 'online') {
            $course->load('sections.subSection');
        }
        $courses = Course::where('id', '!=', $course->id)->get();

        $course->load('prerequisiteCourse');
        return Inertia::render('Course/Edit', [
            'course' => $course,
            'courses' => $courses,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course): RedirectResponse
    {
        // dd($request->all());

        try {
            $validated = $request->validated();
            $validated['type'] = $validated['type']['value'];
            if(isset($validated['prerequisite'])){
                $validated['prerequisite'] = $validated['prerequisite']['value'];
            }

            $course->fill($validated);

            if($validated['type'] === 'online'){
                $sectionsData = $request->input('sections', []);
                foreach ($sectionsData as $sectionData) {
                    $section = $course->sections()->updateOrCreate(
                        ['id' => $sectionData['id'] ?? null],
                        ['name' => $sectionData['name']]
                    );
            
                    $subsectionsData = $sectionData['subsections'] ?? [];
                    foreach ($subsectionsData as $subsectionData) {
                        $section->subSection()->updateOrCreate(
                            ['id' => $subsectionData['id'] ?? null],
                            [
                                'section_id' => $section->id,
                                'name' => $subsectionData['name'],
                                'url' => $subsectionData['url'],
                            ]
                        );
                    }
                }
            }

            return Redirect::route('courses.index');
        } catch (\Exception $e) {
            dd($e);
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course): RedirectResponse
    {
        $course->delete();
        return Redirect::back();
    }

    public function removedSectionAndSubSection(Course $course, array $sections) {
        $sectionIds = collect($sections)->pluck('id')->filter()->all();
        $subsectionIds = collect($sections)->pluck('subSections')->flatten(1)->pluck('id')->filter()->all();

        $course->sections()->whereNotIn('id', $sectionIds)->delete();
        $course->sections()->each(function ($section) use ($subsectionIds) {
            $section->subsections()->whereNotIn('id', $subsectionIds)->delete();
        });
    }
}
