<?php

namespace App\Http\Resources;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportDetailResource extends JsonResource
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
            'objective' => $this->objective,
            'bu' => $this->bu->name,
            'dept' => $this->dept->name,
            'courses' => $this->courses->map(function ($course) {
                $graduatedPercentage = $this->calculateGraduatedPercentage($course);
                $progressPercentage = $this->calculateUserProgression($course);
                $userAssigmentLogs = $this->getUserAssignmentLogs($course);

                return [
                    'id' => $course->id,
                    'code' => $course->code,
                    'title' => $course->name,
                    'type' => $course->type,
                    'minimum' => $course->hasAssignment->minimum_score ?? '-',
                    'test' => $course->hasAssignment->type ?? '-',
                    'graduated' => number_format($graduatedPercentage) . '%',
                    'progress' => $progressPercentage,
                    'assignment' => $userAssigmentLogs,
                ];
            }),
        ];
    }

    /**
     * Calculate the graduated percentage for each course.
     *
     * @param  \App\Models\Course  $course
     * @return float
     */
    protected function calculateGraduatedPercentage(Course $course)
    {
        $uniqueReports = $course->courseReport->unique(function ($report) {
            return $report->user_id . '-' . $report->course_id;
        });

        $totalReports = $uniqueReports->count();

        $graduatedCount = $uniqueReports->filter(function ($report) {
            return $report->courseFinished()->exists();
        })->count();

        return $totalReports > 0 ? ($graduatedCount / $totalReports) * 100 : 0;
    }

    /**
     * Calculate user progression for each course's subsections.
     *
     * @param  \App\Models\Course  $course
     * @return float
     */
    protected function calculateUserProgression($course)
    {
        if($course->type == 'offline') {
            return '-';
        }
        
        // Count total subsections
        $totalSubSections = $course->subSections->count();
        // Get unique user IDs from tnaReports (assuming `tnaReports` is the correct relation name)
        $userIds = $course->courseReport->pluck('user_id')->unique()->toArray();

        $progressUser = [];
        foreach($userIds as $id) {
            // Count visited subsections by the user
            $visitedSubSections = $course->subSections()
            ->whereHas('progress', function ($query) use ($id) {
                $query->where('user_id', $id); // Assuming $this->user_id is available
            })
            ->count();

            $progress = $totalSubSections > 0 ? ($visitedSubSections / $totalSubSections) * 100 : 0;
            $progressUser[] = number_format($progress);
        }

        $result = count($progressUser) > 0 ? array_sum($progressUser) / count($progressUser)
        : 0;

        return number_format($result).'%';
    }

    /**
     * Get assignment logs for each user in the course.
     *
     * @param  \App\Models\Course  $course
     * @return array
     */
    protected function getUserAssignmentLogs($course)
    {
        // Ensure there is an assignment for the course
        $assignment = $course->hasAssignment;

        if (!$assignment) {
            return [];
        }
        
        // Retrieve all `user_id`s associated with the course from `tnaReports`
        $userIds = $course->courseReport->pluck('user_id')->unique();

        // Retrieve all logs for this assignment
        $logs = $course->hasAssignment->userLog;

        // Group logs by `user_id` for easier access
        $groupedLogs = $logs->groupBy('id');

        // Iterate through each `user_id`, including those without logs
        $userAssignmentLogs = $userIds->map(function ($userId) use ($groupedLogs, $assignment) {
            // Get the user's name (assuming `full_name` is in the User model)
            $userName = User::find($userId)->full_name;

            // Retrieve logs by `user_id`, if they exist
            $userLogs = $groupedLogs->get($userId, collect()); // Use an empty collection if no logs exist

            return [
                'code' => $assignment->code,
                'user' => $userName,
                'attempt' => $userLogs->count(), // If no logs, this will be 0
                'score' => $userLogs->isEmpty() ? 0 : $userLogs->max('pivot.score'), // If no logs, default score is 0
                'type' => $assignment->type
            ];
        });

        return $userAssignmentLogs->all();
    }
}
