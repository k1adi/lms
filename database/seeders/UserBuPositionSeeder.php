<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserBuPositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_bu_positions')->insert([
            // Rizki -> admin
            ['user_id' => 1, 'bu_id' => 1, 'position_id' => 1],
            ['user_id' => 1, 'bu_id' => 1, 'position_id' => 2],
            ['user_id' => 1, 'bu_id' => 1, 'position_id' => 3],
            ['user_id' => 1, 'bu_id' => 2, 'position_id' => 2],
            ['user_id' => 1, 'bu_id' => 3, 'position_id' => 3],
            // Admin -> admin
            ['user_id' => 4, 'bu_id' => 1, 'position_id' => 1],
            ['user_id' => 4, 'bu_id' => 1, 'position_id' => 2],
            ['user_id' => 4, 'bu_id' => 1, 'position_id' => 3],
            ['user_id' => 4, 'bu_id' => 2, 'position_id' => 1],
            ['user_id' => 4, 'bu_id' => 2, 'position_id' => 2],
            ['user_id' => 4, 'bu_id' => 2, 'position_id' => 3],
            ['user_id' => 4, 'bu_id' => 3, 'position_id' => 1],
            ['user_id' => 4, 'bu_id' => 3, 'position_id' => 2],
            ['user_id' => 4, 'bu_id' => 3, 'position_id' => 3],

            // Budi -> instructor
            ['user_id' => 2, 'bu_id' => 2, 'position_id' => 2],

            // User -> user
            ['user_id' => 3, 'bu_id' => 3, 'position_id' => 3],
        ]);
    }
}
