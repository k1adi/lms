<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\TnaReport;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            BuSeeder::class,
            DeptSeeder::class,
            PositionSeeder::class,
            CourseSeeder::class,
            SectionSeeder::class,
            SubSectionSeeder::class,
            ScheduleSeeder::class,
            BuPositionSeeder::class,
            RolePermissionSeeder::class,
            UserRoleSeeder::class,
            CourseAccessSeeder::class,
            ScheduleAccessSeeder::class,
            UserBuPositionSeeder::class,
            TnaSeeder::class,
            TnaReportSeeder::class,
            AssignmentSeeder::class,
        ]);
    }
}
