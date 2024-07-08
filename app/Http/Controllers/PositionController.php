<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePositionRequest;
use App\Http\Requests\UpdatePositionRequest;
use App\Models\Positions;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Position/Index', [
            'positions' => Positions::paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Position/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePositionRequest $request): RedirectResponse
    {
        try{
            Positions::create($request->validated());

            return Redirect::route('positions.index');
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
    public function edit(Positions $position): Response
    {
        return Inertia::render('Position/Edit', [
            'position' => $position
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePositionRequest $request, Positions $position): RedirectResponse
    {
        try {
            $position->fill($request->validated());
            $position->save();

            return Redirect::route('positions.index');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Positions $position): RedirectResponse
    {
        $position->delete();
        return Redirect::back();
    }
}
