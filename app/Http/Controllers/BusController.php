<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBuRequest;
use App\Http\Requests\UpdateBuRequest;
use App\Http\Resources\BuResource;
use App\Models\Bu;
use App\Models\Position;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class BusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Authorize the action using Gate
        Gate::authorize('bu_access');
        $bus = BuResource::collection(Bu::paginate());

        return Inertia::render('Bu/Index', [
            'bus' => $bus,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Bu/Create', [
            'positions' => Position::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateBuRequest $request): RedirectResponse
    {
        try{
            $validated = $request->validated();

            // Check the structure of the 'positions' field
            // $positions = array_map(function($position) {
            //     return $position['value'];
            // }, $validated['positions']);
            
            // Insert bu data to bu table
            Bu::create($validated);
            // $bu = Bu::create($validated);
            // Sync bu_id and position_id to bu_position
            // $bu->hasPositions()->sync($positions);

            return Redirect::route('bus.index');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Bu $bu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bu $bu): Response
    {
        // $bu->load('hasPositions');

        return Inertia::render('Bu/Edit', [
            'bu' => $bu,
            // 'positions' => Position::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBuRequest $request, Bu $bu): RedirectResponse
    {
        try {
            $validated = $request->validated();

            // Check the structure of the 'positions' field
            // $positions = array_map(function($position) {
            //     return $position['value'];
            // }, $validated['positions']);
            
            // Update bu data to bu table
            $bu->fill($validated);
            $bu->save();
            // Sync bu_id and position_id to bu_position
            // $bu->hasPositions()->sync($positions);

            return Redirect::route('bus.index');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bu $bu): RedirectResponse
    {
        // Authorize the action using Gate
        Gate::authorize('bu_delete');

        $bu->delete();
        return Redirect::back();
    }
}
