<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Authorize the action using Gate
        Gate::authorize('permission_access');

        return Inertia::render('Permission/Index');
    }

    public function list(Request $request)
    {
        // Determine the current page
        $currentPage = $request->query('page', 1);

        // Cache key, using the current page to differentiate cached pages
        $cacheKey = 'permissions_page_' . $currentPage;

        // Cache duration in minutes
        $cacheDuration = 60;

        // Retrieve the paginated permissions from the cache or query the database if not cached
        $permissions = Cache::remember($cacheKey, $cacheDuration, function () {
            return Permission::paginate(25);
        });

        // Return the permissions as a JSON response
        return response()->json($permissions);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Permission/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePermissionRequest $request): RedirectResponse
    {
        try{
            Permission::create($request->validated());

            return Redirect::route('permissions.index');
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
    public function edit(Permission $permission): Response
    {
        return Inertia::render('Permission/Edit', [
            'permission' => $permission
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermissionRequest $request, Permission $permission): RedirectResponse
    {
        try {
            $permission->fill($request->validated());
            $permission->save();

            return Redirect::route('permissions.index');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission): RedirectResponse
    {
        // Authorize the action using Gate
        Gate::authorize('permission_delete');

        $permission->delete();
        return Redirect::back();
    }
}
