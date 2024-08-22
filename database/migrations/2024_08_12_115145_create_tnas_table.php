<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tnas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('dept_id');
            $table->unsignedBigInteger('course_id');
            $table->text('objective');
            $table->integer('participants');
            $table->dateTime('training_time');
            $table->string('location', 150);
            $table->string('trainer', 120); 
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('dept_id')->references('id')->on('depts');
            $table->foreign('course_id')->references('id')->on('courses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tnas');
    }
};
