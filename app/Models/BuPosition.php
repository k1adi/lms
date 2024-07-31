<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class BuPosition extends Pivot
{
    protected $table = 'bu_position';
    protected $foreignKey = 'bu_id';
    protected $relatedKey = 'position_id';
    public $timestamps = false;

    public function bu(): BelongsTo
    {
        return $this->belongsTo(Bu::class, 'bu_id', 'id');
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'position_id', 'id');
    }
}
