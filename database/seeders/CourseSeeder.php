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
            'name' => 'Learn Laravel from Hero to Zero',
            'type' => 'online',
            'trainer' => 'Programmer Zaman Now',
            'thumbnail' => 'https://youtu.be/ClMX6TXvh_o',
            'url_attachment' => '',
            'description' => 'Hi guys, di kelas ini kita akan bahas tentang dasar-dasar Laravel Framework. Ini adalah materi awal dari roadmap kelas Laravel. Pastikan teman-teman menguasai materi ini sebelum mengikuti kelas-kelar Laravel selanjutnya'
        ]);

        Course::create([
            'code' => 'PRIOFL0020824',
            'name' => 'Business Management',
            'type' => 'offline',
            'trainer' => 'Trainer 2',
            'url_attachment' => 'https://docs.google.com/document/d/1mV0kYf7OEt1q37oM5zsLyTb-K9zQSzlMblKn4dOMIq4',
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
            'name' => 'Microsoft Excel Tutorial Videos 🔥[2024 Updated]',
            'type' => 'online',
            'trainer' => 'Simplilearn',
            'thumbnail' => 'https://youtu.be/5ABOjWLMu4c',
            'url_attachment' => '',
            'description' => 'Embark on a comprehensive journey into the world of Excel with the "Excel Tutorial for Beginners" playlist, designed to transform absolute beginners into proficient users. This expansive playlist covers every conceivable aspect of Excel, from foundational basics to advanced functionalities, ensuring that learners of all levels find valuable insights and skills to enhance their mastery of this essential tool.'
        ]);
    }
}
