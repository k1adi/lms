<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDeptRequest;
use App\Http\Requests\UpdateDeptRequest;
use App\Models\Bu;
use App\Models\Dept;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
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
    public function store(CreateDeptRequest $request)
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDeptRequest $request, Dept $dept)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dept $dept)
    {
        //
    }
}
