<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDeptRequest;
use App\Http\Requests\UpdateDeptRequest;
use App\Models\Bu;
use App\Models\Dept;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class DeptController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Dept/Index', [
            'depts' => Dept::with(['bu'])->paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Dept/Create', [
            'bus' => Bu::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateDeptRequest $request): RedirectResponse
    {
        try{
            Dept::create($request->validated());

            return Redirect::route('depts.index');
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
    public function edit(Dept $dept)
    {
        return Inertia::render('Dept/Edit', [
            'dept' => $dept,
            'bus' => Bu::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDeptRequest $request, Dept $dept): RedirectResponse
    {
        try {
            $dept->fill($request->validated());
            $dept->save();

            return Redirect::route('depts.index');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dept $dept): RedirectResponse
    {
        $dept->delete();
        return Redirect::back();
    }
}