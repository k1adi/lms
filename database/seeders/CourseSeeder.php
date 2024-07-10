<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::create([
            'name' => 'Course 1',
            'type' => 'online',
            'trainer' => 'Trainer 1',
            'thumbnail' => 'www.youtube.com/',
            'url_attachment' => 'www.drive.com/',
            'prerequisite' => null,
            'description' => 'Lorem ipsum dolor sit amet'
        ]);
        Course::create([
            'name' => 'Course 2',
            'type' => 'offline',
            'trainer' => 'Trainer 2',
            'thumbnail' => 'www.youtube.com/',
            'url_attachment' => 'www.drive.com/',
            'prerequisite' => 1,
            'description' => 'Lorem ipsum dolor sit amet asd'
        ]);
    }
}
