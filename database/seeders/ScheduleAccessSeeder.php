<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScheduleAccessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('schedule_accesses')->insert([
            ['schedule_id' => 1, 'user_id' => 1],
            ['schedule_id' => 1, 'user_id' => 2],
            ['schedule_id' => 1, 'user_id' => 3],

            ['schedule_id' => 2, 'user_id' => 1],
            ['schedule_id' => 2, 'user_id' => 2],
        ]);
    }
}
