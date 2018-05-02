<?php

namespace App\Http\Controllers;

use App\Rating;
use Illuminate\Http\Request;
use Auth;
use App\User;

class RatingController extends Controller
{
    public function __construct() {
        $this->middleware('user')->only('rate');
    }

    public function rate(User $user, Request $request) {
        $this->validate($request, [
            'rating' => 'required|between:1,5'
        ]);

        $rater = Auth::user();
        $ratingValue = $request->json('rating');
        $rated_id = $user->id;
        $rater_id = $rater->id;

        $rating = Rating::firstOrNew(['rater_id' => $rater_id, 'rated_id' => $rated_id]);

        $rating->rated_id = $rated_id;
        $rating->rater_id = $rater_id;
        $rating->rating = $ratingValue;
        $rating->save();
        return response()->json($user->rating(), 201);
    }
}