<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserAssignmentLog extends Pivot
{
    protected $table = 'user_assignment_logs';
    protected $foreignKey = 'user_id';
    protected $relatedKey = 'assignment_id';
    public $timestamps = false;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function assignment(): BelongsTo
    {
        return $this->belongsTo(Assignment::class, 'assignment_id', 'id');
    }
}
