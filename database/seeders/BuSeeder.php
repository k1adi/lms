<?php

namespace Database\Seeders;

use App\Models\Bus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bus::create([
            'code' => 'BU1',
            'name' => "Business Unit 1"
        ]);

        Bus::create([
            'code' => 'BU2',
            'name' => "Business Unit 2"
        ]);
    }
}
