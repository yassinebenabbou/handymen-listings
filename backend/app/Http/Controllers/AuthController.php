<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use JWTAuth;
use Config;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use GuzzleHttp;

class AuthController extends Controller
{
    public function __construct() {
        $this->middleware('jwt.auth')->only('completeRegistration');
    }

    private function getFacebookProfile($params) {
        $client = new GuzzleHttp\Client();

        $accessTokenResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/oauth/access_token', [
            'query' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        $fields = 'id,email,first_name,last_name,link,name';
        $profileResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/me', [
            'query' => [
                'access_token' => $accessToken['access_token'],
                'fields' => $fields
            ]
        ]);

        return json_decode($profileResponse->getBody(), true);
    }

    private function getGoogleProfile($params) {
        $client = new GuzzleHttp\Client();
        $params['grant_type'] = 'authorization_code';

        $accessTokenResponse = $client->request('POST', 'https://accounts.google.com/o/oauth2/token', [
            'form_params' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        $profileResponse = $client->request('GET', 'https://www.googleapis.com/plus/v1/people/me/openIdConnect', [
            'headers' => array('Authorization' => 'Bearer ' . $accessToken['access_token'])
        ]);
        $profile = json_decode($profileResponse->getBody(), true);
        $profile['id'] = $profile['sub'];

        return $profile;
    }

    public function login(Request $request) {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
                return response()->json(['error' => 'Couldn\'t create token'], 500);
        }

        return response()->json(compact('token'), 200);
    }

    public function socialAuth($provider, Request $request) {
        $this->validate($request, [
            'code' => 'required',
            'clientId' => 'required',
            'redirectUri' => 'required'
        ]);

        $params = [
            'code' => $request->json('code'),
            'client_id' => $request->json('clientId'),
            'redirect_uri' => $request->json('redirectUri'),
            'client_secret' => Config::get('app.' . $provider . '_secret')
        ];

        $getProfile = 'get' . ucfirst($provider) . 'Profile';
        $profile = $this->$getProfile($params);

        $user = User::where('provider_id', $profile['id'])->first();
        if (!$user) {
            $user = new User;
            $user->provider = $provider;
            $user->provider_id = $profile['id'];
            $user->email = $profile['email'];
            $user->save();
        }

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'), 200);

    }

    public function register(Request $request) {
        $this->validate($request, [
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed',
            'usergroup_id' => 'required|integer|in:' . join(',', array_slice(User::Usergroup, 1, 3))
        ]);

        $user = new User();
        $user->email = $request->json('email');
        $user->password = bcrypt($request->json('password'));
        $user->usergroup_id = $request->json('usergroup_id');
        $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'), 201);
    }

    public function emailAvailable(Request $request) {
        $email = User::where('email', $request->input('email'))->first();
        if($email) {
            return response()->json(['taken' => true], 200);
        } else {
            return response()->json(null, 200);
        }
    }

}
