<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    public function index() {
        $services = Service::where('confirmed', true)->orderBy('name')->get();
        return response()->json($services, 200);
    }

    public function pending() {
        $services = Service::where('confirmed', false)->orderBy('name')->get();
        return response()->json($services, 200);
    }

    public function show(Service $service) {
        return response()->json($service, 200);
    }

    public function store(Request $request) {
        $this->validate($request, [
            'name' => 'required',
            'name_ar' => 'required'
        ]);
        $service = new Service;
        $service->name = $request->json('name');
        $service->name_ar = $request->json('name_ar');
        $service->slug = str_slug($service->name);
        $service->confirmed = true;
        $service->save();

        return response()->json($service , 201);
    }

    public function update(Request $request, Service $service) {
        $this->validate($request, [
            'name' => 'required',
            'name_ar' => 'required'
        ]);

        $service->name = $request->json('name');
        $service->name_ar = $request->json('name_ar');
        $service->slug = str_slug($service->name);
        $service->confirmed = $request->json('confirmed');
        $service->save();

        return response()->json($service , 201);
    }

    public function attach(Service $service) {
        $user = Auth::user();
        $user->attachService($service->id);

        return response()->json($service, 200);
    }

    public function attachNew(Request $request) {
        $user = Auth::user();

        if(! $service = Service::where('slug', str_slug($request->json('service_name')))->first()) {
            $service = new Service;
            $service->name = $request->json('service_name');
            $service->slug = str_slug($service->name);
            $service->confirmed = false;
            $service->requested_by = $user->id;
            $service->save();
        }

        $user->attachService($service->id);
        return response()->json($service,200);
    }

    public function detach(Service $service) {
        Auth::user()->detachService($service->id);
        return response()->json(['message' => 'service detached'], 204);
    }

    public function destroy(Service $service) {
        $service->delete();
        return response()->json(['message' => 'Service deleted'], 200);
    }

}


