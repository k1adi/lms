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
            'no_hp' => '081384406530',
            'no_nik' => 'PRI-001',
            'password' => Hash::make('password')
        ]);
        User::create([
            'full_name' => 'Budi doremi',
            'username' => 'dido',
            'email' => 'dido@email.com',
            'no_hp' => '081234567890',
            'no_nik' => 'PRI-002',
            'password' => Hash::make('password')
        ]);
        User::create([
            'full_name' => 'Asep kebon',
            'username' => 'asep',
            'email' => 'asep@email.com',
            'no_hp' => '081098765432',
            'no_nik' => 'PRI-003',
            'password' => Hash::make('password')
        ]);
    }
}
