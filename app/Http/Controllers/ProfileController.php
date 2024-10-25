<?php

namespace App\Http\Controllers;

use App\Http\Requests\MyProfileUpdateRequest;
use App\Http\Resources\MyReportResource;
use App\Models\Course;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();
        $user = User::findOrFail($user->id);
        $user->load('hasRole');

        $reports = Course::forUserWithPosition(auth()->user())->with('hasAssignment.userLog')->get();

        return Inertia::render('Profile/Index', [
            'user' => $user,
            'pivots' => $user->groupPositionsByBu(),
            'reports' => MyReportResource::collection($reports)
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(MyProfileUpdateRequest $request, User $user): RedirectResponse 
    {
        $validated = $request->validated();

        $user->fill($validated);
        $user->save();

        return Redirect::route('dashboard');
    }

    // public function update(ProfileUpdateRequest $request): RedirectResponse
    // {
    //     $request->user()->fill($request->validated());

    //     if ($request->user()->isDirty('email')) {
    //         $request->user()->email_verified_at = null;
    //     }

    //     $request->user()->save();

    //     return Redirect::route('profile.edit');
    // }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
