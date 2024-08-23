<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTnaRequest;
use App\Http\Requests\UpdateTnaRequest;
use App\Http\Resources\TnaDetailResource;
use App\Http\Resources\TnaResource;
use App\Models\Bu;
use App\Models\Course;
use App\Models\Dept;
use App\Models\Tna;
use App\Models\UserBuPosition;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
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
        // Load related data
        $tna->load('dept', 'bu', 'course', 'users');
        
        // Get the Business Unit (BU) ID from the related Department
        $buId = $tna->dept->bu_id;
        
        // Get the user IDs related to this TNA via the tnaReport pivot table
        $userIds = $tna->tnaReport()->pluck('user_id')->toArray();
        
        // Get positions related to the BU and users
        $positions = $tna->positions($buId, $userIds);
        $tna->positions = $positions;

        // Get all options for departments, positions, and users based on BU and positions
        $options = $this->getAllOptions($buId, $positions->toArray());
        
        // Render the Inertia view with the necessary data
        return Inertia::render('Tna/Edit', [
            'tna' => new TnaDetailResource($tna),
            'bus' => Bu::all(),
            'courses' => Course::all(),
            'options' => $options
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTnaRequest $request, Tna $tna): RedirectResponse
    {
        try {
            $validated = $request->validated();

            $input = $this->createObjectTNA($validated);
            $users = array_map(function ($user) {
                return $user['value'];
            }, $validated['users']);
    
            $tna->fill($input);
            $tna->save();

            $tna->tnaReport()->sync($users);

            return Redirect::route('tnas.index');
        } catch (\Exception $e) {
            dd($e);
            return Redirect::back()->withErrors([
                'error' => $e
            ])->withInput();
        }
    }

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

    private function getAllOptions(string $buId, array $positions): array
    {
        // Extract position IDs from the positions array
        $positionIds = array_column($positions, 'id');

        // Create requests to fetch department positions and users by positions
        $deptPositionRequest = Request::create('/getDeptAndPosition', 'GET', ['buId' => $buId]);
        $userPositionRequest = Request::create('/getUserByPosition', 'GET', ['buId' => $buId, 'positions' => $positionIds]);

        // Fetch responses from the respective controller methods
        $deptPositionResponse = $this->getDeptPosition($deptPositionRequest);
        $userPositionResponse = $this->getUserPosition($userPositionRequest);

        // Extract data from the responses
        $deptPositionData = $deptPositionResponse->getData();
        $userPositionData = $userPositionResponse->getData();

        // Return the structured options array
        return [
            'depts' => $deptPositionData->depts,
            'positions' => $deptPositionData->positions,
            'users' => $userPositionData,
        ];
    }

    public function getDeptPosition(Request $request): JsonResponse
    {
        $id = $request->query('buId');

        $dept = Dept::where('bu_id', $id)->get();
        $responseDept = $dept->map(function ($option) {
            return [
                'value' => $option->id,
                'label' => "({$option->code}) - {$option->name}"
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
