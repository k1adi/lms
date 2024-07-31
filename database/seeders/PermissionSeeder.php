<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create([
            'name' => 'access_course' // 1
        ]);
        Permission::create([
            'name' => 'access_schedule' // 2
        ]);
        Permission::create([
            'name' => 'access_online_training' // 3
        ]);
        Permission::create([
            'name' => 'access_offline_training' // 4
        ]);
        Permission::create([
            'name' => 'access_bu' // 5
        ]);
        Permission::create([
            'name' => 'access_dept' // 6
        ]);
        Permission::create([
            'name' => 'access_position' // 7
        ]);
        Permission::create([
            'name' => 'access_course_control' // 8
        ]);
        Permission::create([
            'name' => 'access_user' // 9
        ]);
        Permission::create([
            'name' => 'access_role' // 10
        ]);
        Permission::create([
            'name' => 'access_permission' // 11
        ]);
    }
}
