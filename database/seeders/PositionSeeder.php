<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Position::create([
            'name' => 'Dept. Head'
        ]);
        
        Position::create([
            'name' => 'Manager'
        ]);
        
        Position::create([
            'name' => 'Operational'
        ]);
    }
}
