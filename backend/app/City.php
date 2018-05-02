<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = ['name', 'slug', 'city_slug'];
    protected $hidden = ['created_at', 'updated_at'];
}
