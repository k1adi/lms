<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'username' => $this->username,
            'email' => $this->email,
            'role' => $this->hasRole,
            'pivot' => $this->BuPositionList(),
        ];
    }

    private function BuPositionList()
    {
        return [
            'bu' => $this->buPosition->pluck('pivot.bu')->unique()->toArray(),
            'positions' => $this->buPosition->pluck('pivot.position')->unique()->toArray(),
        ];
    }
}
