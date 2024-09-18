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
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->string('code', 16)->unique();
            $table->unsignedBigInteger('course_id');
            $table->date('access_time')->nullable();
            $table->integer('minimum_score')->nullable();
            $table->enum('type', ['knowledge', 'skill']);
            $table->timestamps();
            $table->softDeletes();

            // Added foreign key constraint
            $table->foreign('course_id')->references('id')->on('courses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};
