<?php

namespace App\Http\Controllers;

use App\FreelancerProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FreelancerProfileController extends Controller
{
    public function __construct() {
        $this->middleware('freelancer');
    }

    public function store(Request $request) {
        $user = Auth::user();

        if($user->profile instanceof FreelancerProfile) {
            $profile = $user->profile;
        } else {
            if($user->profile) $user->profile()->delete();
            $profile = new FreelancerProfile;
        }
        $profile->full_name = $request->json('full_name');
        $profile->gender = $request->json('gender');
        $profile->address = $request->json('address');
        $profile->phone = $request->json('phone');
        $profile->CIN = $request->json('CIN');
        $profile->CAE = $request->json('CAE');
        $profile->save();

        $user->city_slug = $request->json('city_slug');
        $user->save();

        $profile->user()->save($user);

        return response()->json($user, 201);
    }
}
