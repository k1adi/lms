<?php

namespace Tests\Feature;

use App\Models\Schedule;
use Database\Seeders\CourseSeeder;
use Database\Seeders\ScheduleSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ScheduleTest extends TestCase
{
    public function testSyncRow()
    {
        $this->seed([UserSeeder::class, CourseSeeder::class, ScheduleSeeder::class]);

        $schedule = Schedule::find(1);
        // Assign schedule to user with id 1,2
        $schedule->assignUser()->sync([1,2]);
        
        $users = $schedule->assignUser;
        $this->assertCount(2, $users);

        // Set expected username
        $expected_username = ['kiadi', 'dido'];
        for($i=0; $i < $users->count(); $i++){
            $expected =  $expected_username[$i];
            $actual = $users[$i]->username;

            $this->assertEquals($expected, $actual);
        }

        $schedules = Schedule::find(1);
        // Re-assign schedule to user with id 3
        $schedules->assignUser()->sync([3]);

        $user = $schedules->assignUser;
        $this->assertCount(1, $user);

        // Set expected username
        $expected_username = ['asep'];
        for($i=0; $i < $user->count(); $i++){
            $expected =  $expected_username[$i];
            $actual = $user[$i]->username;

            $this->assertEquals($expected, $actual);
        }
    }
}
