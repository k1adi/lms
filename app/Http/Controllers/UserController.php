<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Bu;
use App\Models\Dept;
use App\Models\Position;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
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
            'users' => UserResource::collection(User::paginate()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('User/Create', [
            'bus' => Bu::all(),
            'roles' => Role::all(),
            'positions' => Position::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUserRequest $request): RedirectResponse
    {
        DB::beginTransaction(); // Start the transaction

        try{
            $validated = $request->validated();
            
            // Insert user data to user table
            $user = User::create($validated);
            // Sync user and role to user_role
            $user->hasRole()->sync($validated['role']);
            // Sync user with bu and position to user_bu_position
            $user->syncBuPosition($validated['pivot']);
            // Sync user with user_dept
            $user->syncDepts($validated['pivot']);

            DB::commit();
            return Redirect::route('users.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
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
        $user->load('hasRole', 'hasDepts');

        return Inertia::render('User/Edit', [
            'user' => $user,
            'bus' => Bu::all(),
            'roles' => Role::all(),
            'depts' => Dept::all(),
            'positions' => Position::all(),
            'pivots' => $this->groupPositionsByBu($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        DB::beginTransaction(); // Start the transaction

        try {
            $validated = $request->validated();
            
            // Update user data to user table
            $user->fill($validated);
            $user->save();
            // // Sync user and role to user_role
            $user->hasRole()->sync($validated['role']);
            $user->buPosition()->detach();
            // Sync user with bu and position to user_bu_position
            $user->syncBuPosition($validated['pivot']);
            // Sync user with user_dept
            $user->hasDepts()->detach();
            $user->syncDepts($validated['pivot']);

            DB::commit();
            return Redirect::route('users.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        // Authorize the action using Gate
        Gate::authorize('user_delete');

        $user->delete();
        return Redirect::back();
    }

    /**
     * Group positions by business unit.
     *
     * @param User $user
     * @return \Illuminate\Support\Collection
     */
    private function groupPositionsByBu(User $user)
    {
        // Assuming buPosition is a relationship that can be grouped
        return $user->buPosition->groupBy('pivot.bu')->map(function ($items, $bu) {
            return [
                'bu' => json_decode($bu, true),
                'positions' => $items->pluck('pivot.position')->toArray(),
            ];
        })->values();
    }
}
