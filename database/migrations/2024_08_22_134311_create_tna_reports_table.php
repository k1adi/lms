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
        Schema::create('tna_reports', function (Blueprint $table) {
            $table->unsignedBigInteger('tna_id');
            $table->unsignedBigInteger('user_id');

            $table->primary(['tna_id', 'user_id']);
            $table->foreign('tna_id')->references('id')->on('tnas');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tna_reports');
    }
};
