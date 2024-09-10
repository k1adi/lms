<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'full_name' => 'Rizki Adi',
            'username' => 'kiadi',
            'email' => 'rizki@email.com',
            'no_hp' => '081284416531',
            'no_nik' => 'PRI-001',
            'password' => Hash::make('password')
        ]);
        User::create([
            'full_name' => 'Instructor',
            'username' => 'instructor',
            'email' => 'instructor@email.com',
            'no_hp' => '081234567891',
            'no_nik' => 'PRI-002',
            'password' => Hash::make('password')
        ]);
        User::create([
            'full_name' => 'User',
            'username' => 'user',
            'email' => 'user@email.com',
            'no_hp' => '081098765432',
            'no_nik' => 'PRI-003',
            'password' => Hash::make('password')
        ]);
        User::create([
            'full_name' => 'Admin',
            'username' => 'admin',
            'email' => 'admin@email.com',
            'no_hp' => '081234567890',
            'no_nik' => 'PRI-000',
            'password' => Hash::make('password')
        ]);
        User::create([
            'full_name' => 'Super Admin',
            'username' => 'superadmin',
            'email' => 'superadmin@email.com',
            'no_hp' => '081234567892',
            'no_nik' => 'PRI-000',
            'password' => Hash::make('password')
        ]);
    }
}
