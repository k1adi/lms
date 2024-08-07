<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use SoftDeletes, HasFactory;
    
    protected $fillable = ['code', 'name', 'type', 'trainer', 'thumbnail', 'url_attachment', 'prerequisite', 'description'];
    protected $dates = ['deleted_at'];
    
    public static function boot()
    {
        parent::boot();

        static::deleted(function ($course) {
            $course->assignPosition()->detach();
        });
    }

    public static function filterByType($type)
    {
        $query = self::where('type', $type);

        if($type == 'offline') {
            $query = $query->with('schedules');
        }

        return $query->get();
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class, 'course_id', 'id');     
    }

    public function sections(): HasMany
    {
        return $this->hasMany(Section::class, 'course_id', 'id');
    }

    // Self-referential relationship
    public function prerequisiteCourse(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'prerequisite');
    }

    public function coursesWithThisAsPrerequisite(): HasMany
    {
        return $this->hasMany(Course::class, 'prerequisite');
    }

    public function assignPosition(): BelongsToMany
    {
        return $this->belongsToMany(Position::class, 'course_accesses', 'course_id', 'position_id');
    }
}
