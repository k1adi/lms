<?php

namespace App\Models;

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
            $bu->userPosition()->detach();
        });
    }

    public function userPosition(): BelongsToMany
    {
        return $this->belongsToMany(Position::class, 'user_bu_positions', 'bu_id', 'position_id')
                    ->withPivot('user_id')
                    ->using(UserBuPosition::class);
    }
}
