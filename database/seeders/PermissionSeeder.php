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
            'observation_create', //8
            
            'tna_access', // 9
            'tna_create', // 10
            'tna_edit', // 11
            'tna_delete', // 12
            
            'schedule_access', // 13
            'schedule_create', // 14
            'schedule_edit', // 15
            'schedule_delete', // 16
            'reports_access', // 17
            
            'bu_access', // 18
            'bu_create', // 19
            'bu_edit', // 20
            'bu_delete', // 21
            'dept_access', // 22
            'dept_create', // 23
            'dept_edit', // 24
            'dept_delete', // 25
            
            'position_access', // 26
            'position_create', // 27
            'position_edit', // 28
            'position_delete', // 29
            'course_access', // 30
            'course_create', // 31
            'course_edit', // 32
            'course_delete', // 33
            
            'accessible_access', // 34
            'accessible_create', // 35
            'accessible_course_edit', // 36
            'accessible_schedule_edit', // 37
            
            'user_access', // 38
            'user_create', // 39
            'user_edit', // 40
            'user_delete', // 41
            'role_access', // 42
            'role_create', // 43
            'role_edit', // 44
            'role_delete', // 45
            
            'permission_access', // 46
            'permission_create', // 47
            'permission_edit', // 48
            'permission_delete', // 49
        ];
        
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
    }
}
