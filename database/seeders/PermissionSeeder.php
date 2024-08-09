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
        $permissions = [
            'dashboard_access', // 1
            'online_course_access', // 2
            'offline_course_access', // 3
            'test_access', // 4
            'tna_access', // 5
            'schedule_access', // 6
            'reports_access', // 7
            'bu_access', // 8
            'dept_access', // 9
            'position_access', // 10
            'course_access', // 11
            'accessible_access', // 12
            'user_access', // 13
            'role_access', // 14
            'permission_access', // 15
        ];
        
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
    }
}
