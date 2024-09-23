<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        // Get user permissions
        $permissions = $user ? $user->grantPermission()->pluck('name') : [];

        // Get sub_section_id from user_progressions pivot table
        $progressions = $user ? $user->courseProgress()->pluck('sub_section_id')->toArray() : [];
        $progressions = array_map('strval', $progressions);

        $finisheds = $user ? $user->courseFinisheds()->pluck('course_id')->toArray() : [];
        $finisheds = array_map('strval', $finisheds);

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? array_merge($user->toArray(), [
                    'finisheds' => $finisheds,
                    'progression' => $progressions,
                ]) : null,
                'permissions' => $permissions,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ]
        ];
    }
}
