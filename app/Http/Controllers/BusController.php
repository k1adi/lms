<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBuRequest;
use App\Http\Requests\UpdateBuRequest;
use App\Models\Bu;
use Illuminate\Http\RedirectResponse;
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
        return Inertia::render('Bu/Index', [
            'bus' => Bu::paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Bu/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateBuRequest $request): RedirectResponse
    {
        try{
            Bu::create($request->validated());

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
        return Inertia::render('Bu/Edit', [
            'bu' => $bu
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBuRequest $request, Bu $bu): RedirectResponse
    {
        try {
            $bu->fill($request->validated());
            $bu->save();

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
        $bu->delete();
        return Redirect::back();
    }
}
