<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubSection extends Model
{
    use HasFactory;
    protected $fillable = ['section_id', 'name', 'url'];

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class, 'section_id', 'id');
    }

    public function progress(): HasMany
    {
        return $this->hasMany(UserProgression::class, 'sub_section_id', 'id');
    }
}
