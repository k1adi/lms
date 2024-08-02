<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseAccessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('course_accesses')->insert([
            ['course_id' => 1, 'position_id' => 1],
            ['course_id' => 1, 'position_id' => 2],
            ['course_id' => 1, 'position_id' => 3],

            ['course_id' => 2, 'position_id' => 1],
            ['course_id' => 2, 'position_id' => 2],
        ]);
    }
}
