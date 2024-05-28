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
            'name' => 'Rizki Adi',
            'username' => 'kiadi',
            'email' => 'rizki@email.com',
            'phone' => '081384406530',
            'nik' => '1234567890123456',
            'password' => Hash::make('password')
        ]);
    }
}
