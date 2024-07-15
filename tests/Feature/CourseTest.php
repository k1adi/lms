<?php

namespace Tests\Feature;

use App\Models\Course;
use Database\Seeders\CourseSeeder;
use Database\Seeders\ScheduleSeeder;
use Database\Seeders\SectionSeeder;
use Database\Seeders\SubSectionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Log;
use PhpParser\Node\Stmt\Foreach_;
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
        $this->assertCount(2, $onlineCourse);
    }

    public function testGetOfflineCourse()
    {
        $this->seed([CourseSeeder::class, ScheduleSeeder::class]);

        $offlineCourse = Course::filterByType('offline');
        $this->assertNotNull($offlineCourse);
        $this->assertCount(2, $offlineCourse);
    }

    public function testGetSectionCourse()
    {
        $this->seed([CourseSeeder::class, SectionSeeder::class]);

        $onlineCourse = Course::filterByType('online');
        $this->assertNotNull($onlineCourse);
        $this->assertCount(2, $onlineCourse);

        $expected_section = [3, 1];
        for($i=0; $i < $onlineCourse->count(); $i++){
            $expected =  $expected_section[$i];
            $actual = $onlineCourse[$i]->sections;

            $this->assertCount($expected, $actual);
        }
    }
}
