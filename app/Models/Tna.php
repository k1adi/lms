<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;

class Tna extends Model
{
    use SoftDeletes;

    protected $fillable = ['dept_id', 'created_by', 'title', 'objective', 'participants', 'training_time', 'location', 'trainer'];
    protected $dates = ['deleted_at'];

    public function dept(): BelongsTo 
    {
        return $this->belongsTo(Dept::class, 'dept_id', 'id');
    }

    public function bu(): HasOneThrough
    {
        return $this->hasOneThrough(Bu::class, Dept::class, 'id', 'id', 'dept_id', 'bu_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }

    public function tnaReports(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'tna_reports', 'tna_id', 'user_id')
                    ->withPivot('course_id');
    }

    public function users(): HasManyThrough
    {
        return $this->hasManyThrough(User::class, TnaReport::class, 'tna_id', 'id', 'id', 'user_id');
    }

    public function courses(): HasManyThrough
    {
        return $this->hasManyThrough(Course::class, TnaReport::class, 'tna_id', 'id', 'id', 'course_id');
    }

    public function positions(string $bu, array $users): Collection
    {
        $positions = UserBuPosition::whereIn('user_id', $users)
                     ->where('bu_id', $bu)->with('position')
                     ->get()->pluck('position')
                     ->unique();

        return $positions;
    }
}
