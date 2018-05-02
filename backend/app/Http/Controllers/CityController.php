<?php

namespace App\Http\Controllers;

use App\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index() {
        $cities = City::orderBy('name')->get();
        return response()->json($cities, 200);
    }

    public function show(City $city) {
        return response()->json($city, 200);
    }

    public function store(Request $request) {
        $this->validate($request, [
            'name' => 'required',
            'name_ar' => 'required'
        ]);

        $city = new City();
        $city->name = $request->json('name');
        $city->name_ar = $request->json('name_ar');
        $city->slug = str_slug($city->name);
        $city->save();

        return response()->json($city, 200);
    }

    public function update(City $city, Request $request) {
        $this->validate($request, [
            'name' => 'required',
            'name_ar' => 'required'
        ]);

        $city->name = $request->json('name');
        $city->name_ar = $request->json('name_ar');
        $city->slug = str_slug($city->name);
        $city->save();

        return response()->json($city, 200);
    }

    public function destroy(City $city) {
        $city->delete();
        return response()->json(['message' => 'City deleted'], 200);
    }
}
