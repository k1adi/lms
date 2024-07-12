<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;
    protected $fillable = ['name','type','trainer','thumbnail','url_attachment','prerequisite','description'];

    public static function filterByType($type)
    {
        $query = self::where('type', $type);

        if($type == 'offline') {
            $query = $query->with('schedule');
        }

        return $query->get();
    }

    public function schedule(): HasMany
    {
        return $this->hasMany(Schedule::class, 'course_id'. 'id');     
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
}
