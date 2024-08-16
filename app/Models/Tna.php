<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tna extends Model
{
    use SoftDeletes;

    protected $fillable = ['dept_id', 'course_id', 'objective', 'participants', 'training_time', 'place', 'trainer'];
    protected $dates = ['deleted_at'];

    public function dept(): BelongsTo 
    {
        return $this->belongsTo(Dept::class, 'dept_id');
    }

    public function buDept(): HasOneThrough
    {
        return $this->hasOneThrough(Bu::class, Dept::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
