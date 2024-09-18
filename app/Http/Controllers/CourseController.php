<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
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
        // Authorize the action using Gate
        Gate::authorize('course_access');

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
            // if(isset($validated['prerequisite'])){
            //     $validated['prerequisite'] = $validated['prerequisite']['value'];
            // }

            $validated['code'] = Course::generateCode($validated['type']);
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

            return Redirect::route('courses.index')->with('success', 'Course created');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    // public function show(string $id)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course): Response
    {
        if($course->type == 'online') {
            $course->load('sections.subSection');
        }

        // $course->load('prerequisiteCourse');
        return Inertia::render('Course/Edit', [
            'course' => $course,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course): RedirectResponse
    {
        try {
            $validated = $request->validated();
            $validated['type'] = $validated['type']['value'];

            $course->fill($validated);
            $course->save(); // Ensure course is saved before processing sections

            if ($validated['type'] === 'online') {
                // Handle sections
                $sectionsData = $request->input('sections', []);

                // Get the current section IDs
                $existingSectionIds = $course->sections()->pluck('id')->toArray();
                $newSectionIds = collect($sectionsData)->pluck('id')->filter()->toArray(); // Only keep non-null IDs

                // Delete sections that are not in the update request
                $sectionsToDelete = array_diff($existingSectionIds, $newSectionIds);
                $course->sections()->whereIn('id', $sectionsToDelete)->delete();

                foreach ($sectionsData as $sectionData) {
                    // Update or create the section
                    $section = $course->sections()->updateOrCreate(
                        ['id' => $sectionData['id'] ?? null],
                        ['name' => $sectionData['name']]
                    );

                    // Handle subsections
                    $subsectionsData = $sectionData['subsections'] ?? [];

                    // Get the current subsection IDs for the section
                    $existingSubsectionIds = $section->subSection()->pluck('id')->toArray();
                    $newSubsectionIds = collect($subsectionsData)->pluck('id')->filter()->toArray();

                    // Delete subsections that are not in the update request
                    $subsectionsToDelete = array_diff($existingSubsectionIds, $newSubsectionIds);
                    $section->subSection()->whereIn('id', $subsectionsToDelete)->delete();

                    foreach ($subsectionsData as $subsectionData) {
                        // Update or create the subsection
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
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course): RedirectResponse
    {
        // Authorize the action using Gate
        Gate::authorize('course_delete');

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
