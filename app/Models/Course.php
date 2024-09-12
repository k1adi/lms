<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Course extends Model
{
    use SoftDeletes, HasFactory;
    
    protected $fillable = ['code', 'name', 'type', 'trainer', 'thumbnail', 'url_attachment', 'description'];
    protected $dates = ['deleted_at'];
    
    public static function boot()
    {
        parent::boot();

        static::deleted(function ($course) {
            $course->assignPosition()->detach();
        });
    }

    public static function generateCode($course): string
    {
        $date = Carbon::now();
        $type = ($course == 'online') ? 'ONL' : 'OFL';

        $courseCount = self::whereYear('created_at', $date->year)
                       ->whereMonth('created_at', $date->month)->count();

        // Generate the code with zero-padded number and month
        return sprintf("PRI%s%03d%02d%s", 
            $type, $courseCount + 1, $date->month, $date->format('y')
        );
    }

    public static function withoutAccess(): Collection
    {
        return self::whereDoesntHave('accesses')->get();
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class, 'course_id', 'id');     
    }

    public function sections(): HasMany
    {
        return $this->hasMany(Section::class, 'course_id', 'id');
    }

    public function subSections(): HasManyThrough
    {
        return $this->hasManyThrough(SubSection::class, Section::class);
    }
        
    public function accesses(): HasMany
    {
        return $this->hasMany(CourseAccess::class, 'course_id', 'id');
    }

    public function assignPosition(): BelongsToMany
    {
        return $this->belongsToMany(Position::class, 'course_accesses', 'course_id', 'position_id');
    }

    public function scopeForUserWithPosition($query, $user, $type)
    {
        $userPositions = $user->buPosition()->pluck('position_id'); // Get user positions

        return $query->where('type', $type)
                ->whereHas('accesses', function ($query) use ($userPositions) {
                    $query->whereIn('position_id', $userPositions);
                });
    }

    public function hasAssignment(): HasOne
    {
        return $this->hasOne(Assignment::class, 'course_id', 'id');
    }
}
