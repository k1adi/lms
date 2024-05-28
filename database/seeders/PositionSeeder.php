<?php

namespace Database\Seeders;

use App\Models\Positions;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Positions::create([
            'name' => 'Dept. Head'
        ]);
        
        Positions::create([
            'name' => 'Manager'
        ]);
        
        Positions::create([
            'name' => 'Operational'
        ]);
    }
}
