<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->nullable();
            $table->string('password')->nullable();
            $table->integer('usergroup_id')->unsigned()->nullable();
            $table->foreign('usergroup_id')->references('id')->on('usergroups')->onDelete('cascade');
            $table->integer('profile_id')->unsigned()->nullable();
            $table->string('profile_type')->nullable();
            $table->string('city_slug')->nullable();
            $table->foreign('city_slug')->references('slug')->on('cities')->onDelete('set null');
            $table->string('picture')->default('default_profile.jpg');
            $table->string('provider')->nullable();
            $table->string('provider_id')->unique()->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
