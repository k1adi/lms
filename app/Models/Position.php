<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Position extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function BuRelated(): BelongsToMany
    {
        return $this->belongsToMany(Bu::class, 'bu_position', 'position_id', 'bu_id');
    }
}
