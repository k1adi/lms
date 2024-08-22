<?php

namespace Database\Seeders;

use App\Models\Tna;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TnaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tna::create([
            'dept_id' => 1,
            'course_id' => 1,
            'objective' => 'Mempelajari course online',
            'participants' => 15,
            'training_time' => '2024-08-20 10:00:00',
            'location' => 'Darmawan Park',
            'trainer' => 'Trainer A',
        ]);
    }
}
