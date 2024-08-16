<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Dept;
use App\Models\Tna;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TnaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Authorize the action using Gate
        Gate::authorize('course_access');

        return Inertia::render('Tna/Index', [
            'tnas' => Tna::with(['dept.bu', 'course'])->paginate()
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Tna/Create', [
            'depts' => Dept::all(),
            'courses' => Course::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request): RedirectResponse
    // {
    //     //
    // }

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
    // public function edit(string $id): Response
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, string $id): RedirectResponse
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tna $tna): RedirectResponse
    {
        $tna->delete();
        return Redirect::back();
    }
}
