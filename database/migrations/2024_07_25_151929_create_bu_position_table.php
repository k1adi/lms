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
        Schema::create('bu_position', function (Blueprint $table) {
            $table->unsignedBigInteger('bu_id');
            $table->unsignedBigInteger('position_id');

            $table->primary(['bu_id', 'position_id']);
            $table->foreign('bu_id')->references('id')->on('bus');
            $table->foreign('position_id')->references('id')->on('positions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bu_position');
    }
};
