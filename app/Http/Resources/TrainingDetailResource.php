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
            'code' => $this->code,
            'name' => $this->name,
            'type' => $this->type,
            'trainer' => $this->trainer,
            'thumbnail' => $this->thumbnail,
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
