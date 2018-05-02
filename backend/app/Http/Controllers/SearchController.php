<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke(Request $request) {
        $city = $request->json('city');
        $service = $request->json('service');
        $usergroup_id = $request->json('usergroup_id');
        $usergroups = $request->json('usergroup') ? [$request->json('usergroup')] : [User::Usergroup['freelancer'], User::Usergroup['company']];

        $results = User::with('profile')
            ->with('city')
            ->with('services')
            ->where('profile_id', '>', 0);

        if (!empty($usergroup_id)) {
            $results = $results->where('usergroup_id', $usergroup_id);
        } else {
            $results = $results->whereIn('usergroup_id',$usergroups);
        }

        if (!empty($service))
            $results = $results->whereHas('services', function($query) use($service) {
                $query->where('slug', $service)
                    ->where('confirmed', true);
            });
        else
            $results = $results->has('services');

        if (!empty($city))
            $results = $results->where('city_slug', $city);
        else
            $results = $results->has('city');



        $results = $results->paginate(3);


        $results->getCollection()->transform(function ($result) {
            $result['rating'] = $result->rating();
            return $result;
        });



        return response()->json($results, 200);
    }
}
