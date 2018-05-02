<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Auth;
use DB;


class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    const Usergroup = [
        'admin' => 1,
        'user' => 2,
        'freelancer' => 3,
        'company' => 4
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'profile_id', 'profile_type', 'provider_id'
    ];

    public function isAdmin() {
        return $this->usergroup_id === User::Usergroup['admin'];
    }

    public function inGroup($usergroup) {
        return $this->usergroup_id === User::Usergroup[$usergroup];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [
            'usergroup_id' => $this->usergroup_id
        ];
    }

    public function usergroup() {
        return $this->belongsTo('App\Usergroup');
    }

    public function profile() {
        return $this->morphTo();
    }

    public function city() {
        return $this->belongsTo('App\City', 'city_slug', 'slug');
    }

    public function ratings() {
        return $this->hasMany('App\Rating', 'rated_id');
    }

    public function rated() {
        return $this->belongsToMany('App\User', 'ratings', 'rater_id', 'rated_id')->withPivot('rating');
    }

    public function services() {
        return $this->belongsToMany('App\Service')->orderBy('confirmed', 'desc');
    }

    public function attachService($id) {
        $this->services()->attach($id);
    }

    public function detachService($id) {
        $this->services()->detach($id);
    }

    public function rating() {
        $stats = $this->ratings()->selectRaw('count(*) as total, avg(rating) as rating')->first();
        $response = ['rating' => (float)$stats->rating, 'total' => $stats->total, 'auth_rating' => 0];
        if ($user = Auth::user())
            if ($rating = Rating::where('rater_id', $user->id)->where('rated_id', $this->id)->first())
                $response['auth_rating'] = (float)$rating->rating;
        return $response;
    }



}
