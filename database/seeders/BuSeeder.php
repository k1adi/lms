<?php

namespace Database\Seeders;

use App\Models\Bu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bu::create([
            'code' => 'BU1',
            'name' => "Business Unit 1"
        ]);

        Bu::create([
            'code' => 'BU2',
            'name' => "Business Unit 2"
        ]);
        
        Bu::create([
            'code' => 'BU3',
            'name' => "Business Unit 3"
        ]);
    }
}
