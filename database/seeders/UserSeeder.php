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
            'no_nik' => '1234567890123456',
            'password' => Hash::make('password')
        ]);
    }
}
