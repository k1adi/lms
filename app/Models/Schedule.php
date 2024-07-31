<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Schedule extends Model
{
    use HasFactory;
    protected $fillable = ['course_id', 'start_time', 'end_time'];

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($schedule) {
            $schedule->assignUser()->detach();
        });
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }

    public function assignUser(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'schedules_access', 'schedule_id', 'user_id');
    }
}
