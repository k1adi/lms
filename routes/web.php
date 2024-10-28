<?php

use App\Http\Controllers\AccessController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DeptController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\TnaController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    // Authorize the action using Gate
    Gate::authorize('dashboard_access');
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function() {
    Route::resources([
        '/setting/bus' => BusController::class,
        '/setting/depts' => DeptController::class,
        '/setting/positions' => PositionController::class,
        '/setting/courses' => CourseController::class,

        '/authorization/users' => UserController::class,
        '/authorization/roles' => RoleController::class,
        '/authorization/permissions' => PermissionController::class,
        
        'schedules' => ScheduleController::class,
        '/assignment/tnas' => TnaController::class,
        '/assignment/tests' => AssignmentController::class,
    ]);

    // Training
    Route::get('/training/online', [TrainingController::class, 'online'])->name('training.online.index');
    Route::get('/training/offline', [TrainingController::class, 'offline'])->name('training.offline.index');
    Route::get('/training/offline/{code}', [TrainingController::class, 'detail'])->name('training.offline.detail');
    Route::get('/training/online/{code}', [TrainingController::class, 'detail'])->name('training.online.detail');
    Route::get('/training/test/{code}', [TrainingController::class, 'test'])->name('training.test');
    Route::post('/training/test/validate', [TrainingController::class, 'testValidate'])->name('training.test.validate');
    Route::get('/training/detail/{code}/{section}/{sub_section}', [TrainingController::class, 'section'])->name('training.online.section');

    // Test
    Route::get('/assignment/observation', [AssignmentController::class, 'observation'])->name('observation.create');
    Route::post('/assignment/observation', [AssignmentController::class, 'storeObservation'])->name('observation.store');
    Route::get('/assignment/user-by-position', [AssignmentController::class, 'userObservation'])->name('observation.user');
    
    // Get Dept by Business Unit
    Route::get('/getBuDept/{id}', [DeptController::class, 'buDept'])->name('bu.dept');

    // Get Dept, Position and User for TNA
    Route::get('/getDeptAndPosition', [TnaController::class, 'getDeptPosition'])->name('deptPosition');
    Route::get('/getUserByPosition', [TnaController::class, 'getUserPosition'])->name('userPosition');
    
    // Course and Schedule Access
    Route::get('/setting/access', [AccessController::class, 'index'])->name('access.index');
    Route::get('/setting/access/create', [AccessController::class, 'create'])->name('access.create');
    Route::post('/setting/access/store', [AccessController::class, 'store'])->name('access.store');
    Route::get('/setting/access/course/{course}/edit', [AccessController::class, 'editCourseAccess'])->name('access.course.edit');
    Route::get('/setting/access/schedule/{schedule}/edit', [AccessController::class, 'editScheduleAccess'])->name('access.schedule.edit');
    Route::patch('/setting/course-access/{course}', [AccessController::class, 'updateCourse'])->name('access.course.update');
    Route::patch('/setting/schedule-access/{schedule}', [AccessController::class, 'updateSchedule'])->name('access.schedule.update');

    // Asynchronous permission list
    Route::get('/permissions-list', [PermissionController::class, 'list'])->name('permissions.list');
});

Route::middleware('auth')->group(function () {
    Route::get('/my-profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile/{user}', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
