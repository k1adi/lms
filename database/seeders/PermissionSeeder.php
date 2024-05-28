<?php

namespace Database\Seeders;

use App\Models\Permissions;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permissions::create([
            'name' => 'create course'
        ]);
        
        Permissions::create([
            'name' => 'edit course'
        ]);

        Permissions::create([
            'name' => 'delete course'
        ]);
    }
}
