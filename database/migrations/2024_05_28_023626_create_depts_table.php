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
        Schema::create('depts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bu_id');
            $table->string('code', 7);
            $table->string('name', 50);
            $table->timestamps();

            // Added foreign key constraint
            $table->foreign('bu_id')->references('id')->on('bus');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('depts');
    }
};
