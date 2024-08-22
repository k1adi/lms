<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tna extends Model
{
    use SoftDeletes;

    protected $fillable = ['dept_id', 'course_id', 'objective', 'participants', 'training_time', 'location', 'trainer'];
    protected $dates = ['deleted_at'];

    public function dept(): BelongsTo 
    {
        return $this->belongsTo(Dept::class, 'dept_id');
    }

    public function bu()
    {
        return $this->hasOneThrough(Bu::class, Dept::class, 'id', 'id', 'dept_id', 'bu_id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }

    public function tnaReport(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'tna_reports', 'tna_id', 'user_id');
    }
}
