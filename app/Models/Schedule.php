<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Schedule extends Model
{
    use HasFactory;
    protected $fillable = ['course_id', 'start_time', 'end_time', 'desc'];

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($schedule) {
            $schedule->assignUser()->detach();
        });
    }

    public static function withoutAccess(): Collection
    {
        return self::whereDoesntHave('accesses')->get();
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }

    public function assignUser(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'schedule_accesses', 'schedule_id', 'user_id');
    }

    public function accesses(): HasMany
    {
        return $this->hasMany(ScheduleAccess::class, 'schedule_id', 'id');
    }
}
