<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserDept extends Pivot
{
    protected $table = 'user_depts';
    protected $foreignKey = 'user_id';
    protected $relatedKey = 'dept_id';
    public $timestamps = false;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function dept(): BelongsTo
    {
        return $this->belongsTo(Dept::class, 'dept_id', 'id');
    }
}
