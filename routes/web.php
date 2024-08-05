<?php

use App\Http\Controllers\AccessController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DeptController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function() {
    Route::resources([
        'bus' => BusController::class,
        'depts' => DeptController::class,
        'positions' => PositionController::class,

        'users' => UserController::class,
        'roles' => RoleController::class,
        'permissions' => PermissionController::class,
        
        'courses' => CourseController::class,
        'schedules' => ScheduleController::class,
    ]);

    Route::get('/access', [AccessController::class, 'index'])->name('access.index');
    Route::get('/course-access/{course}/edit', [AccessController::class, 'courseAccess'])->name('course-access.edit');
    Route::get('/schedule-access/{schedule}/edit', [AccessController::class, 'scheduleAccess'])->name('schedule-access.edit');
    Route::patch('/course-access/{course}', [AccessController::class, 'updateCourse'])->name('course-access.update');
    Route::patch('/schedule-access/{schedule}', [AccessController::class, 'updateSchedule'])->name('schedule-access.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
