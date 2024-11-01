<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportIndexResource extends JsonResource
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
            'title' => $this->title,
            'goal' => $this->objective,
            'graduated' => $this->calculateGraduate(),
            'progress' => $this->calculateProgress(),
        ];
    }

    public function calculateGraduate(): string
    {
        // Get the total number of reports for this TNA
        $uniqueReports = $this->hasReports->unique(function ($report) {
            return $report->user_id . '-' . $report->course_id;
        });
    
        // Count total unique pairs
        $totalReports = $uniqueReports->count();
        // Count the number of pairs that exist in course_finished
        $graduatedCount = $uniqueReports->filter(function ($report) {
            return $report->courseFinished()->exists();
        })->count();
    
        // Calculate the graduated percentage
        $percentage = $totalReports > 0 ? ($graduatedCount / $totalReports) * 100 : 0;
        return number_format($percentage) . '%';
    }

    public function calculateProgress(): string
    {
        $progress = [];
        foreach($this->hasReports as $report){
            if($report->course->type == 'online'){
                $totalSubSections = $report->course->subSections->count();

                // Count subsections visited by the user
                $visitedSubSections = $report->course->subSections()
                    ->whereHas('progress', function ($query) use ($report) {
                        $query->where('user_id', $report->user_id);
                    })
                    ->count();

                // Calculate progression percentage for this course
                $progressPercentage = $totalSubSections > 0 ? ($visitedSubSections / $totalSubSections) * 100 : 0;

                $progress[] = [
                    'percentage' => number_format($progressPercentage),
                ];
            }
        }

        $result = count($progress) > 0 
        ? array_sum(array_column($progress, 'percentage')) / count($progress)
        : 0;
        
        return number_format($result) . '%';
    }
}
