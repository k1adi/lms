<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Section::create([
           'course_id' => 1,
           'name' => 'Section A-01' 
        ]);
        
        Section::create([
           'course_id' => 1,
           'name' => 'Section A-02' 
        ]);

        Section::create([
            'course_id' => 1,
            'name' => 'Section A-03' 
        ]);

        Section::create([
            'course_id' => 4,
            'name' => 'Section B-01' 
        ]);
    }
}
