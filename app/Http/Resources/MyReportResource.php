<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MyReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $hasAssignment = !is_null($this->hasAssignment);

        return [
            'id' => $this->id,
            'code' => $this->code,
            'course' => $this->name,
            'type' => $this->type,
            'attemps' => $hasAssignment ? count($this->hasAssignment->userLog) : '-',
            'score' => $hasAssignment ? collect($this->hasAssignment->userLog)->max('pivot.score') : '-',
            'test' => $hasAssignment ? $this->hasAssignment->type : '-',
        ];
    }
}
