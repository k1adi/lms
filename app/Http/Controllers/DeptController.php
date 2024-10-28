<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDeptRequest;
use App\Http\Requests\UpdateDeptRequest;
use App\Models\Bu;
use App\Models\Dept;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
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
        // Authorize the action using Gate
        Gate::authorize('dept_access');

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
            $validated = $request->validated();
            $validated['bu_id'] = $validated['bu_id']['value'];
            
            // Insert dept data to dept table
            Dept::create($validated);

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
    public function edit(Dept $dept): Response
    {
        $dept->load('bu');

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
            $validated = $request->validated();
            $validated['bu_id'] = $validated['bu_id']['value'];

            $dept->fill($validated);
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
        // Authorize the action using Gate
        Gate::authorize('dept_delete');

        $dept->delete();
        return Redirect::back();
    }

    public function buDept($id): JsonResponse 
    {
        $dept = Dept::where('bu_id', $id)->get();

        return response()->json($dept->map(function ($option) {
            return [
                'value' => $option->id,
                'label' => "({$option->code}) - {$option->name}"
            ];
        }));
    }
}
