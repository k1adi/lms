<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Assignment extends Model
{
    use SoftDeletes, HasFactory;
    protected $table = 'assignments';
    protected $fillable = ['code', 'course_id', 'access_time', 'minimum_score', 'type'];
    protected $dates = ['deleted_at'];

    public static function generateCode(): string
    {
        $date = Carbon::now();
        $testCount = self::withTrashed()->count();

        // Generate the code with zero-padded number and month
        return sprintf("TEST%03d%02d%s", 
            $testCount + 1, $date->month, $date->format('y')
        );
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class, 'assignment_id', 'id');
    }
    
    public function answers(): HasManyThrough
    {
        return $this->hasManyThrough(Answer::class, Question::class);
    }
}
