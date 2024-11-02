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

        $user = auth()->user();
        $userId = $user->id;
        
        // Filter `userLog` by the logged-in user
        $userLogs = $hasAssignment 
        ? $this->hasAssignment->userLog->where('pivot.user_id', $userId) 
        : collect();

        return [
            'id' => $this->id,
            'code' => $this->code,
            'course' => $this->name,
            'type' => $this->type,
            'attempts' => $userLogs->isNotEmpty() ? $userLogs->count() : '0',
            'score' => $userLogs->isNotEmpty() ? $userLogs->max('pivot.score') : '0',
            'test' => $hasAssignment ? $this->hasAssignment->type : '-',
        ];
    }
}
