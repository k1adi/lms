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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('code', 16);
            $table->string('name', 100);
            $table->enum('type', ['offline', 'online']);
            $table->string('trainer', 100);
            $table->string('thumbnail')->nullable();
            $table->text('url_attachment')->nullable();
            // $table->unsignedBigInteger('prerequisite')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
