<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class TnaReport extends Pivot
{
    protected $table = 'tna_reports';
    protected $foreignKey = 'tna_id';
    protected $relatedKey = 'user_id';
    public $timestamps = false;

    public function tna(): BelongsTo
    {
        return $this->belongsTo(Tna::class, 'tna_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
