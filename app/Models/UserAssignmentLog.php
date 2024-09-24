<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserAssignmentLog extends Pivot
{
    protected $table = 'user_assignment_logs';

    // Set the composite primary key (no auto-increment)
    protected $primaryKey = ['user_id', 'assignment_id', 'created_at'];
    public $incrementing = false;
    protected $keyType = 'string'; // Treat the primary key as a string due to composite key

    // Fields that are mass assignable
    protected $fillable = ['user_id', 'assignment_id', 'score', 'status', 'created_at'];

    // Disable automatic timestamps (created_at/updated_at)
    public $timestamps = false;

    // Relationship with the User model
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    // Relationship with the Assignment model
    public function assignment(): BelongsTo
    {
        return $this->belongsTo(Assignment::class, 'assignment_id', 'id');
    }
}
