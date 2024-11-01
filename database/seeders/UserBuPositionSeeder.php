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
            // Superadmin
            ['user_id' => 1, 'bu_id' => 1, 'position_id' => 1],
            ['user_id' => 1, 'bu_id' => 1, 'position_id' => 2],
            ['user_id' => 1, 'bu_id' => 1, 'position_id' => 3],
            ['user_id' => 1, 'bu_id' => 2, 'position_id' => 1],
            ['user_id' => 1, 'bu_id' => 2, 'position_id' => 2],
            ['user_id' => 1, 'bu_id' => 2, 'position_id' => 3],
            ['user_id' => 1, 'bu_id' => 3, 'position_id' => 1],
            ['user_id' => 1, 'bu_id' => 3, 'position_id' => 2],
            ['user_id' => 1, 'bu_id' => 3, 'position_id' => 3],

            // Admin
            ['user_id' => 2, 'bu_id' => 1, 'position_id' => 1],
            ['user_id' => 2, 'bu_id' => 1, 'position_id' => 2],
            ['user_id' => 2, 'bu_id' => 1, 'position_id' => 3],
            ['user_id' => 2, 'bu_id' => 2, 'position_id' => 2],
            ['user_id' => 2, 'bu_id' => 3, 'position_id' => 3],

            // Rizki Adi
            ['user_id' => 3, 'bu_id' => 2, 'position_id' => 2],

            // Instrutor
            ['user_id' => 4, 'bu_id' => 3, 'position_id' => 3],

            // User
            ['user_id' => 5, 'bu_id' => 1, 'position_id' => 2],
        ]);
    }
}
