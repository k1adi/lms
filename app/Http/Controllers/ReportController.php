<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReportDetailResource;
use App\Http\Resources\ReportIndexResource;
use App\Http\Resources\TnaResource;
use App\Models\Role;
use App\Models\Tna;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Http\Request;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        // Authorize the action using Gate
        Gate::authorize('reports_access');

        $depts = $request->session()->get('depts');
        $report = Tna::whereIn('dept_id', $depts)
                  ->with(['hasReports'])->get();

        $result = ReportIndexResource::collection($report);
        return Inertia::render('Report/Index', [
            'report' => $result,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function detail(string $id)
    {
        // Authorize the action using Gate
        Gate::authorize('reports_detail');

        $tna = Tna::findOrFail($id);
        $tna->load('dept', 'bu', 'courses.tnaReport', 'courses.subSections.progress');

        $data = new ReportDetailResource($tna);
        
        return Inertia::render('Report/Detail', [
            'report' => $data,
        ]);
    }
};
