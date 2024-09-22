<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Question::create([
            'assignment_Id' => 1,
            'text' => 'Laravel is a framework for which programming language?',
        ]);
        
        Question::create([
            'assignment_Id' => 1,
            'text' => 'Who is the creator of Laravel?',
        ]);
        
        Question::create([
            'assignment_Id' => 1,
            'text' => 'In what year was Laravel first created?',
        ]);

        Question::create([
            'assignment_Id' => 1,
            'text' => 'What is the latest version of Laravel as of 2024?',
        ]);
    }
}
