<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BuPositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('bu_position')->insert([
            ['bu_id' => 1, 'position_id' => 1],
            ['bu_id' => 1, 'position_id' => 2],
            
            ['bu_id' => 2, 'position_id' => 1],
            ['bu_id' => 2, 'position_id' => 2],
            ['bu_id' => 2, 'position_id' => 3],
        ]);
    }
}
