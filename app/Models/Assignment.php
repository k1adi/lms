<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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
        $testCount = self::withTrashed()->count();

        // Generate the code with zero-padded number and month
        return sprintf("T%04d",  $testCount + 1);
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

    public function userLog(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_assignment_logs')
                    ->withPivot('score', 'status', 'created_at');
    } 
}
