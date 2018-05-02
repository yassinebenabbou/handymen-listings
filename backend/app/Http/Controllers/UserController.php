<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use File;
use Storage;
use JWTAuth;

class UserController extends Controller
{

    public function index() {
        $users = User::paginate();
        return response()->json(null, 200);
    }

    public function show($id) {
        $user = User::where('id', $id)
            ->with('profile')
            ->with('city')
            ->with('services')
            ->first();

        $user['rating'] = $user->rating();
        return response()->json($user, 200);
    }

    public function services() {
        $services = Auth::user()->services;
        return response()->json($services, 200);
    }

    public function completeRegistration(Request $request) {
        $this->validate($request, [
            'usergroup_id' => 'required|integer|in:' . join(',', array_slice(User::Usergroup, 1, 3)),
        ]);

        $user = Auth::user();
        $user->usergroup_id = $request->json('usergroup_id');
        $user->profile_id = null;
        $user->profile_type = null;
        $user->save();
        if ($user->profile) $user->profile()->delete();

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'), 200);
    }

    public function rating($id) {
        $rating = User::find($id)->rating();
        return response()->json($rating, 200);
    }

    public function picture() {
        return response()->json(['picture' => Auth::user()->picture], 200);
    }

    public function uploadPicture(Request $request) {
        $this->validate($request, [
            'picture' => 'mimes:jpeg,jpg'
        ]);

        $user = Auth::user();
        $picture = $request->file('picture');

        $directory = 'public/pictures/';
        $filename = md5($user->email).'_'.time().'.jpg';

        if($user->picture != "default_profile.jpg")
            File::delete('storage/pictures/' . $user->picture);

        if (substr(File::mimeType($picture), 0, 5) == 'image') {
            $thumb = \Image::make($picture)->fit(240, null, null, 'top')->encode('jpg');
            Storage::put($directory.$filename, $thumb->__toString());
            $user->picture = $filename;
            $user->save();
        }

        return response()->json(compact('filename'), 201);
    }

    public function destroy(User $user) {
        $user->delete();
        return response()->json(["message" => "User deleted"], 200);
    }

}
