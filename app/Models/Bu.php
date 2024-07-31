<?php

namespace App\Models;

use Database\Seeders\PositionSeeder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Bu extends Model
{
    use HasFactory;
    protected $fillable = ['code','name'];

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($bu) {
            $bu->hasPositions()->detach();
        });
    }

    public function hasPositions(): BelongsToMany
    {
        return $this->belongsToMany(Position::class, 'bu_position', 'bu_id', 'position_id');
    }
}
