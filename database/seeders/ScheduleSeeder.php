<?php

namespace Database\Seeders;

use App\Models\Schedule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schedule::create([
            'course_id' => 2,
            'start_time' => '2024-07-12 16:10:31',
            'end_time' => '2024-07-14 20:10:31',
        ]);

        Schedule::create([
            'course_id' => 3,
            'start_time' => '2024-07-10 10:10:31',
            'end_time' => '2024-07-15 20:10:31',
        ]);
    }
}
