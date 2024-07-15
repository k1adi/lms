<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\DB;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function setUp(): void
    {
        parent::setUp();
        DB::delete('DELETE FROM schedules_access');

        DB::table('schedules')->delete();
        DB::statement('ALTER TABLE schedules AUTO_INCREMENT = 1');

        DB::table('sections')->delete();
        DB::statement('ALTER TABLE sections AUTO_INCREMENT = 1');
        
        DB::table('sub_sections')->delete();
        DB::statement('ALTER TABLE sub_sections AUTO_INCREMENT = 1');
        
        DB::table('courses')->delete();
        DB::statement('ALTER TABLE courses AUTO_INCREMENT = 1');
        
        DB::table('users')->delete();
        DB::statement('ALTER TABLE users AUTO_INCREMENT = 1');
    }
}
