<?php

namespace App\Http\Controllers;

use App\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserProfileController extends Controller
{
    public function __construct() {
        $this->middleware('user');
    }
    public function store(Request $request) {
        $user = Auth::user();
        if($user->profile instanceof UserProfile) {
            $profile = $user->profile;
        } else {
            if($user->profile) $user->profile()->delete();
            $profile = new UserProfile;
        }
        $profile->full_name = $request->json('full_name');
        $profile->phone = $request->json('phone');
        $profile->save();

        $user->city_slug = $request->json('city_slug');
        $user->save();

        $profile->user()->save($user);

        return response()->json($user, 201);
    }
}
