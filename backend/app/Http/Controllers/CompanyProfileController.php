<?php

namespace App\Http\Controllers;

use App\CompanyProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompanyProfileController extends Controller
{
    public function __construct() {
        $this->middleware('company');
    }
    public function store(Request $request) {
        $user = Auth::user();

        if($user->profile instanceof CompanyProfile) {
            $profile = $user->profile;
        } else {
            if($user->profile) $user->profile()->delete();
            $profile = new CompanyProfile;
        }
        $profile->name = $request->json('name');
        $profile->phone = $request->json('phone');
        $profile->save();

        $user->city_slug = $request->json('city_slug');
        $user->save();

        $profile->user()->save($user);

        return response()->json($user, 201);
    }
}
