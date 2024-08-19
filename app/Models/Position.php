<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Position extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($position) {
            $position->userBU()->detach();
        });
    }

    public function userBU(): BelongsToMany
    {
        return $this->belongsToMany(Bu::class, 'user_bu_positions', 'position_id', 'bu_id')
                    ->withPivot('user_id')
                    ->using(UserBuPosition::class);
    }
}
