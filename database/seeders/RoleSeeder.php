<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'name' => 'superadmin' // 1
        ]);
        
        Role::create([
            'name' => 'admin' // 2
        ]);
        
        Role::create([
            'name' => 'instructor' // 3
        ]);

        Role::create([
            'name' => 'user' // 4
        ]);
    }
}
