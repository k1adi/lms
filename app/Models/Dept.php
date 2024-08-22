<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Dept extends Model
{
    use HasFactory;
    protected $fillable = ['bu_id', 'code', 'name'];

    public function bu(): BelongsTo {
        return $this->belongsTo(Bu::class, 'bu_id', 'id');
    }
}
