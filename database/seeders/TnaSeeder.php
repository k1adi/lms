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
            'created_by' => 1,
            'title' => 'First TNA',
            'objective' => 'Mempelajari course online',
            'participants' => 15,
            'training_time' => '2024-11-20 10:00:00',
            'location' => 'Darmawan Park',
            'trainer' => 'Trainer A',
        ]);

        Tna::create([
            'dept_id' => 4,
            'created_by' => 2,
            'title' => 'Second TNA',
            'objective' => 'Mempelajari course Offline',
            'participants' => 20,
            'training_time' => '2024-11-20 10:00:00',
            'location' => 'Darmawan Park',
            'trainer' => 'Trainer B',
        ]);
    }
}
