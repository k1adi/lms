<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBuRequest;
use App\Http\Requests\UpdateBuRequest;
use App\Models\Bus;
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
            'bus' => Bus::paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Bu/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateBuRequest $request)
    {
        try{
            Bus::create($request->validated());

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
    public function show(Bus $bu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bus $bu)
    {
        return Inertia::render('Bu/Edit', [
            'bu' => $bu
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBuRequest $request, Bus $bu)
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
    public function destroy(Bus $bu): RedirectResponse
    {
        $bu->delete();
        return Redirect::back();
    }
}
