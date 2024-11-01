<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserDeptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_depts')->insert([
            ['user_id' => 1, 'dept_id' => 1],
            ['user_id' => 1, 'dept_id' => 2],
            ['user_id' => 1, 'dept_id' => 3],
            ['user_id' => 1, 'dept_id' => 4],
            ['user_id' => 1, 'dept_id' => 5],
            ['user_id' => 1, 'dept_id' => 6],
            
            ['user_id' => 2, 'dept_id' => 4],
            ['user_id' => 2, 'dept_id' => 5],
            ['user_id' => 3, 'dept_id' => 4],
            ['user_id' => 4, 'dept_id' => 6],
            ['user_id' => 5, 'dept_id' => 2],
        ]);
    }
}
