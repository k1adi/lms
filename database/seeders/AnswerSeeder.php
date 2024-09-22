<?php

namespace Database\Seeders;

use App\Models\Answer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnswerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Programming Language
        Answer::create([
            'question_id' => 1,
            'text' => 'Phyton',
            'is_correct' => false,
        ]);
        Answer::create([
            'question_id' => 1,
            'text' => 'PHP',
            'is_correct' => true,
        ]);
        Answer::create([
            'question_id' => 1,
            'text' => 'Ruby',
            'is_correct' => false,
        ]);

        // The creator
        Answer::create([
            'question_id' => 2,
            'text' => 'Jeffrey Way',
            'is_correct' => false
        ]);
        Answer::create([
            'question_id' => 2,
            'text' => 'Rasmus Lerdorf',
            'is_correct' => false
        ]);
        Answer::create([
            'question_id' => 2,
            'text' => 'Taylor Otwell',
            'is_correct' => true,
        ]);
        
        // Years
        Answer::create([
            'question_id' => 3,
            'text' => '2011',
            'is_correct' => true,
        ]);
        Answer::create([
            'question_id' => 3,
            'text' => '2015',
            'is_correct' => false
        ]);
        Answer::create([
            'question_id' =>3,
            'text' => '2013',
            'is_correct' => false,
        ]);

        // Versions
        Answer::create([
            'question_id' => 4,
            'text' => 'Laravel 13',
            'is_correct' => false
        ]);
        Answer::create([
            'question_id' => 4,
            'text' => 'Laravel 9',
            'is_correct' => false
        ]);
        Answer::create([
            'question_id' => 4,
            'text' => 'Laravel 11',
            'is_correct' => true
        ]);
    }
}
