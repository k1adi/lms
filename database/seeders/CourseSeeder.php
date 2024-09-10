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
            'code' => 'PRIONL0010824',
            'name' => 'Course 1',
            'type' => 'online',
            'trainer' => 'Trainer 1',
            'thumbnail' => 'https://www.youtube.com/',
            'url_attachment' => 'https://www.drive.com/',
            'description' => 'Online Course 01'
        ]);

        Course::create([
            'code' => 'PRIOFL0020824',
            'name' => 'Course 2',
            'type' => 'offline',
            'trainer' => 'Trainer 2',
            'description' => 'Offline Course 01'
        ]);

        Course::create([
            'code' => 'PRIOFL0030824',
            'name' => 'Course 3',
            'type' => 'offline',
            'trainer' => 'Trainer 3',
            'description' => 'Offline Course 02'
        ]);

        Course::create([
            'code' => 'PRIONL0040824',
            'name' => 'Course 4',
            'type' => 'online',
            'trainer' => 'Trainer 4',
            'thumbnail' => 'https://www.youtube.com/',
            'url_attachment' => 'https://www.drive.com/',
            'description' => 'Online Course 02'
        ]);
    }
}
