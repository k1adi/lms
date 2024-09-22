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
           'name' => 'Laravel Logging' 
        ]);
        
        Section::create([
           'course_id' => 1,
           'name' => 'Laravel Blade Template' 
        ]);

        Section::create([
            'course_id' => 1,
            'name' => 'Laravel Collection' 
        ]);

        Section::create([
            'course_id' => 4,
            'name' => 'Excel Section' 
        ]);
    }
}
