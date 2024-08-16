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
        Schema::create('user_bu_positions', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('bu_id');
            $table->unsignedBigInteger('position_id');

            $table->primary(['user_id', 'bu_id', 'position_id']);
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('bu_id')->references('id')->on('bus');
            $table->foreign('position_id')->references('id')->on('positions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_bu_positions');
    }
};
