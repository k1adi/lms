<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserProgession extends Pivot
{
    protected $table = 'user_progressions';
    protected $foreignKey = 'user_id';
    protected $relatedKey = 'subsection_id';
    public $timestamps = false;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function subsection(): BelongsTo
    {
        return $this->belongsTo(SubSection::class, 'subsection_id', 'id');
    }
}
