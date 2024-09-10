<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseOnlineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = auth()->user();

        // Get total sub-sections count for the course
        $total = $this->subSections()->count();

        // Get the count of sub-sections the user has visited
        $visited = $this->subSections()
            ->whereHas('progress', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->count();
        $percentage = ($visited / $total) * 100;

        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'type' => $this->type,
            'trainer' => $this->trainer,
            'total_sub_section' => $total,
            'progress' => $visited,
            'percentage' => number_format($percentage) . '%'
        ];
    }
}
