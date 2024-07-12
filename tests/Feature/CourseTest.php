<?php

namespace Tests\Feature;

use App\Models\Course;
use Database\Seeders\CourseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class CourseTest extends TestCase
{
    public function testDeleteCourse()
    {
        $this->seed([CourseSeeder::class]);
        $onlineCourses = Course::filterByType('online');

        // Loop through each course and delete it
        foreach ($onlineCourses as $onlineCourse) {
            $onlineCourse->delete();
        }

        // Assert that there are no online courses left
        $remainingOnlineCourses = Course::filterByType('online');
        $this->assertTrue($remainingOnlineCourses->isEmpty());
    }

    public function testGetOnlineCourse()
    {
        $this->seed([CourseSeeder::class]);

        $onlineCourse = Course::filterByType('online');
        Log::info($onlineCourse);
        $this->assertNotNull($onlineCourse);
        $this->assertCount(1, $onlineCourse);
    }

    public function testGetOfflineCourse()
    {
        $this->seed([CourseSeeder::class]);

        $offlineCourse = Course::filterByType('offline');
        $this->assertNotNull($offlineCourse);
        $this->assertCount(2, $offlineCourse);
    }
}
