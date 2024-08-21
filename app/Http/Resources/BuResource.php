<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'positions' => $this->userPosition->pluck('pivot.position')->unique()->toArray(),
            'canDelete' => $this->userPosition->isEmpty(),
        ];
    }
}
