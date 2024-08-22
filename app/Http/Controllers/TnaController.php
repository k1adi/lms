<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTnaRequest;
use App\Http\Resources\TnaResource;
use App\Models\Bu;
use App\Models\Course;
use App\Models\Dept;
use App\Models\Tna;
use App\Models\UserBuPosition;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TnaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Authorize the action using Gate
        Gate::authorize('tna_access');

        return Inertia::render('Tna/Index', [
            'tnas' => TnaResource::collection(Tna::paginate()),
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Tna/Create', [
            'bus' => Bu::all(),
            'courses' => Course::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTnaRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();

            $input = $this->createObjectTNA($validated);
            $users = array_map(function ($user) {
                return $user['value'];
            }, $validated['users']);
    
            $tna = Tna::create($input);
            $tna->tnaReport()->sync($users);

            return Redirect::route('tnas.index');
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
    public function edit(Tna $tna): Response
    {
        $tna->load('dept', 'bu', 'course');

        dd(print_r(json_encode($tna)));
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, string $id): RedirectResponse
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tna $tna): RedirectResponse
    {
        $tna->delete();
        return Redirect::back();
    }

    private function createObjectTNA(array $input): array
    {
        return [
            'dept_id' => $input['dept']['value'],
            'course_id' => $input['course']['value'],
            'objective' => $input['objective'],
            'participants' => $input['participant'],
            'training_time' => convertToJakartaTime($input['trainingTime']),
            'location' => $input['location'],
            'trainer' => $input['trainer'],
        ];
    }

    public function getDeptPosition(Request $request): JsonResponse
    {
        $id = $request->query('buId');

        $dept = Dept::where('bu_id', $id)->get();
        $responseDept = $dept->map(function ($option) {
            return [
                'value' => $option->id,
                'label' => $option->name
            ];
        });

        $position = UserBuPosition::with('position')
                    ->where('bu_id', $id)->get();
        $responsePosition = $position->unique('position_id')->map(function ($item) {
            return [
                'value' => $item->position->id,
                'label' => $item->position->name
            ];
        })->values();

        return response()->json([
            'depts' => $responseDept,
            'positions' => $responsePosition,
        ]);
    }

    public function getUserPosition(Request $request): JsonResponse
    {
        $buId = $request->query('buId');
        $positions = $request->query('positions');

        $users = UserBuPosition::with('user')->where('bu_id', $buId)
                 ->whereIn('position_id', $positions)
                 ->get();
        $responseUser = $users->unique('user_id')->map(function ($item) {
            return [
                'value' => $item->user->id,
                'label' => $item->user->full_name
            ];
        })->values();

        return response()->json($responseUser);
    }
}
