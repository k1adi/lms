<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\CreateRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Authorize the action using Gate
        Gate::authorize('role_access');

        return Inertia::render('Role/Index', [
            'roles' => Role::with(['hasPermission'])->paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Role/Create', [
            'permissions' => Permission::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRoleRequest $request): RedirectResponse
    {
        try{
            $validated = $request->validated();

            // Check the structure of the 'permissions' field
            $permissions = array_map(function($permission) {
                return $permission['value'];
            }, $validated['permissions']);
            
            // Insert role data to role table
            $role = Role::create($validated);
            // Sync role_id and permission_id to role_permission
            $role->hasPermission()->sync($permissions);

            return Redirect::route('roles.index');
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
    public function edit(Role $role): Response
    {
        $role->load('hasPermission');

        return Inertia::render('Role/Edit', [
            'role' => $role,
            'permissions' => Permission::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role): RedirectResponse
    {
        try {
            $validated = $request->validated();

            // Check the structure of the 'permissions' field
            $permissions = array_map(function($permission) {
                return $permission['value'];
            }, $validated['permissions']);
            
            // Update role data to role table
            $role->fill($validated);
            $role->save();
            // Sync role_id and permission_id to role_permission
            $role->hasPermission()->sync($permissions);

            return Redirect::route('roles.index');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role): RedirectResponse
    {
        $role->delete();
        return Redirect::back();
    }
}
