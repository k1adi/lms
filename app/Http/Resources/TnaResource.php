<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TnaResource extends JsonResource
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
            'bu' => $this->bu->name,
            'user' => $this->creator->full_name,
            'title' => $this->title,
            'goal' => $this->objective,
            'start_time' => $this->training_time
        ];
    }
}
