<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRatingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->increments('id');
            $table->decimal('rating', 2, 1);
            $table->integer('rater_id')->unsigned();
            $table->foreign('rater_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('rated_id')->unsigned();
            $table->foreign('rated_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(array('rater_id', 'rated_id'));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ratings');
    }
}
