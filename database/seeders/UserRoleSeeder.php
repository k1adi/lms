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
            // Superadmin -> superadmin
            ['user_id' => 1, 'role_id' => 1],

            // Rizki Adi -> superadmin
            ['user_id' => 3, 'role_id' => 1],

            // Admin -> admin
            ['user_id' => 2, 'role_id' => 2],

            // Instructor -> instructor
            ['user_id' => 4, 'role_id' => 3],

            // User -> user
            ['user_id' => 5, 'role_id' => 4],
        ]);
    }
}
