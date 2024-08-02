<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Schedule;
use Inertia\Inertia;
use Inertia\Response;

class AccessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $courses = Course::with(['assignPosition'])->whereHas('assignPosition')->paginate();
        $schedules = Schedule::with(['assignUser'])->whereHas('assignUser')->paginate();

        return Inertia::render('Access/Index',[
            'courses' => $courses,
            'schedules' => $schedules,
        ]);
    }
}
