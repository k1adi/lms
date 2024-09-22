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
            'name' => 'Logging',
            'url' => 'https://youtu.be/1cq9RgHrqvk',
            'type' => 'media',
            'desc' => ''
        ]);

        SubSection::create([
            'section_id' => 2,
            'name' => 'Blade Template',
            'url' => 'https://youtu.be/cEN1dHwnLP0',
            'type' => 'media',
            'desc' => ''
        ]);

        SubSection::create([
            'section_id' => 3,
            'name' => 'Collection',
            'url' => 'https://youtu.be/ilWODseVxNM',
            'type' => 'media',
            'desc' => ''
        ]);

        SubSection::create([
            'section_id' => 4,
            'name' => 'Excel Sub-Section 01',
            'url' => 'https://youtu.be/q_EvK1Ycbek',
            'type' => 'media',
            'desc' => ''
        ]);
        SubSection::create([
            'section_id' => 4,
            'name' => 'Excel Sub-Section 02',
            'url' => 'https://youtu.be/8Ob8Hre_SnI',
            'type' => 'media',
            'desc' => ''
        ]);
        SubSection::create([
            'section_id' => 4,
            'name' => 'Excel Sub-Section 03',
            'url' => 'https://docs.google.com/spreadsheets/d/1yyTmFbQhe784Bs_HdP7ceDoUn5brcrTw_qDegEsUiQM/edit',
            'type' => 'file',
            'desc' => 'Hands-on Excel Formulas and Functions Practice'
        ]);
    }
}
