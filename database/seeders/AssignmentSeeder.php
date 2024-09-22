<?php

namespace Database\Seeders;

use App\Models\Assignment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Assignment for course 01 (laravel)
        Assignment::create([
            'code' => 'TEST0010924',
            'course_id' => 1,
            'minimum_score' => 80,
            'type' => 'knowledge',
        ]);
    }
}
