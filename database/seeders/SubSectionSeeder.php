<?php

namespace Database\Seeders;

use App\Models\SubSection;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SubSection::create([
            'section_id' => 1,
            'name' => 'Sub-Section Course 1 - Section A-01',
            'url' => 'https://www.youtube.com/'
        ]);

        SubSection::create([
            'section_id' => 2,
            'name' => 'Sub-Section Course 1 - Section A-02',
            'url' => 'https://www.youtube.com/'
        ]);

        SubSection::create([
            'section_id' => 3,
            'name' => 'Sub-Section Course 1 - Section A-03',
            'url' => 'https://www.youtube.com/'
        ]);

        SubSection::create([
            'section_id' => 4,
            'name' => 'Sub-Section Course 1 - Section B-01',
            'url' => 'https://www.youtube.com/'
        ]);
        SubSection::create([
            'section_id' => 4,
            'name' => 'Sub-Section Course 1 - Section B-02',
            'url' => 'https://www.youtube.com/'
        ]);
        SubSection::create([
            'section_id' => 4,
            'name' => 'Sub-Section Course 1 - Section B-03',
            'url' => 'https://www.youtube.com/'
        ]);
    }
}
