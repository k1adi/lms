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
            'assignment_access', // 4
            'assignment_create', // 5
            'assignment_edit', // 6
            'assignment_delete', // 7
            'tna_access', // 8
            'tna_create', // 9
            'tna_edit', // 10
            'tna_delete', // 11
            'schedule_access', // 12
            'schedule_create', // 13
            'schedule_edit', // 14
            'schedule_delete', // 15
            'reports_access', // 16
            'bu_access', // 17
            'bu_create', // 18
            'bu_edit', // 19
            'bu_delete', // 20
            'dept_access', // 21
            'dept_create', // 22
            'dept_edit', // 23
            'dept_delete', // 24
            'position_access', // 25
            'position_create', // 26
            'position_edit', // 27
            'position_delete', // 28
            'course_access', // 29
            'course_create', // 30
            'course_edit', // 31
            'course_delete', // 32
            'accessible_access', // 33
            'accessible_create', // 34
            'accessible_course_edit', // 35
            'accessible_schedule_edit', // 36
            'user_access', // 37
            'user_create', // 38
            'user_edit', // 39
            'user_delete', // 40
            'role_access', // 41
            'role_create', // 42
            'role_edit', // 43
            'role_delete', // 44
            'permission_access', // 45
            'permission_create', // 46
            'permission_edit', // 47
            'permission_delete', // 48
        ];
        
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
    }
}
