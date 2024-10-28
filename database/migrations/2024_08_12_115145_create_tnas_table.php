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
            $table->unsignedBigInteger('created_by');
            $table->string('title', 150);
            $table->text('objective');
            $table->integer('participants');
            $table->dateTime('training_time');
            $table->string('location', 120);
            $table->string('trainer', 100); 
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('dept_id')->references('id')->on('depts');
            $table->foreign('created_by')->references('id')->on('users');
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
