<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TnaReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tna_reports')->insert([
            ['tna_id' => 1, 'user_id' => 1],
            ['tna_id' => 1, 'user_id' => 2],
        ]);
    }
}
