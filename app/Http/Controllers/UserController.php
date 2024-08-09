<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Authorize the action using Gate
        Gate::authorize('user_access');

        return Inertia::render('User/Index', [
            'users' => User::with(['hasRole'])->paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('User/Create', [
            'roles' => Role::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUserRequest $request): RedirectResponse
    {
        try{
            $validated = $request->validated();

            // Check the structure of the 'roles' field
            $roles = array_map(function($role) {
                return $role['value'];
            }, $validated['roles']);
            
            // Insert user data to user table
            $user = User::create($validated);
            // Sync user_id and role_id to user_role
            $user->hasRole()->sync($roles);

            return Redirect::route('users.index');
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
    public function edit(User $user): Response
    {
        $user->load('hasRole');

        return Inertia::render('User/Edit', [
            'user' => $user,
            'roles' => Role::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        try {
            $validated = $request->validated();

            // Check the structure of the 'roles' field
            $roles = array_map(function($role) {
                return $role['value'];
            }, $validated['roles']);
            
            // Update user data to user table
            $user->fill($validated);
            $user->save();
            // Sync user_id and role_id to user_role
            $user->hasRole()->sync($roles);

            return Redirect::route('users.index');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();
        return Redirect::back();
    }
}
