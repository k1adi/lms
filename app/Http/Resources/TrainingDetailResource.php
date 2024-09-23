<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainingDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'type' => $this->type,
            'trainer' => $this->trainer,
            'description' => $this->description,
            'url_attachment' => $this->url_attachment,
            // Load sections and subsections only if the course type is 'online'
            'sections' => ($this->type === 'online') ? $this->sections : [],
            'assignment' => $this->hasAssignment ? [
                'id' => $this->hasAssignment->id,
                'code' => $this->hasAssignment->code,
            ] : [],
        ];
    }
}
