<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TnaDetailResource extends JsonResource
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
            'dept' => $this->dept ? [
                'value' => $this->dept->id,
                'label' => "({$this->dept->code}) - {$this->dept->name}",
            ] : null,
            'bu' => $this->bu ? [
                'value' => $this->bu->id,
                'label' => "({$this->bu->code}) - {$this->bu->name}",
            ] : null,
            'course' => $this->courses ? 
                $this->courses->map(function ($user) {
                return [
                    'value' => $user->id,
                    'label' => $user->name,
                ];
            }) : null,
            'title' => $this->title,
            'objective' => $this->objective,
            'participant' => $this->participants,
            'training_time' => $this->training_time,
            'location' => $this->location,
            'trainer' => $this->trainer,
            'position' => $this->positions ? 
                $this->positions->map(function ($item){
                return [
                    'value' => $item->id,
                    'label' => $item->name,
                ]; 
            }) : null,
            'user' => $this->users ? 
                $this->users->map(function ($user) {
                return [
                    'value' => $user->id,
                    'label' => $user->full_name,
                ];
            }) : null,
        ];
    }
}
