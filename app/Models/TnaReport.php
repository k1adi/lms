<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\Pivot;

class TnaReport extends Pivot
{
    protected $table = 'tna_reports';
    protected $foreignKey = 'tna_id';
    protected $relatedKey = 'user_id';
    public $timestamps = false;

    // Define the third foreign key
    // Default value, can be null or any default 
    protected $attributes = [ 'course_id' => null ]; 

    public function tna(): BelongsTo
    {
        return $this->belongsTo(Tna::class, 'tna_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }

    public function courseFinished(): HasOne
    {
        return $this->hasOne(CourseFinished::class, 'course_id', 'course_id')
                    ->whereColumn('user_id', 'user_id')
                    ->where('user_id', $this->user_id);
    }
}
