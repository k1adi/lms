<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_role')->insert([
            // Rizki -> admin
            ['user_id' => 1, 'role_id' => 1],

            // Budi -> instructor
            ['user_id' => 2, 'role_id' => 2],

            // User -> user
            ['user_id' => 3, 'role_id' => 3],
        ]);
    }
}