<?php

namespace Database\Seeders;

use App\Models\Dept;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Dept::create([
            'bu_id' => 1,
            'code' => 'DEPT1',
            'name' => 'Department 1'
        ]);
        
        Dept::create([
            'bu_id' => 2,
            'code' => 'DEPT2',
            'name' => 'Department 2'
        ]);
    }
}
