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
            'type' => 'Online',
            'trainer' => 'Trainer 1',
            'thumbnail' => 'www.youtube.com/',
            'url_attachment' => 'www.drive.com/',
            'prerequisite' => null,
            'description' => 'Lorem ipsum dolor sit amet'
        ]);
    }
}
