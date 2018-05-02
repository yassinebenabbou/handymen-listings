<?php

Route::post('login', 'AuthController@login');
Route::post('register', 'AuthController@register');
Route::post('email-available', 'AuthController@emailAvailable');
Route::post('complete-registration', 'UserController@completeRegistration');

Route::post('auth/{provider}', 'AuthController@socialAuth');

Route::get('cities', 'CityController@index');
Route::get('services', 'ServiceController@index');
Route::get('services/pending', 'ServiceController@pending');

Route::post('/search', 'SearchController');
Route::get('users/{user}', 'UserController@show')->where('user', '[0-9]+');
Route::post('users/{user}/rating', 'UserController@rating')->where('user', '[0-9]+');

Route::get('mail', 'ContactController');

Route::group(['middleware' => ['jwt.auth', 'jwt.refresh']], function() {

    Route::post('users/user-profile', 'UserProfileController@store');
    Route::post('users/freelancer-profile', 'FreelancerProfileController@store');
    Route::post('users/company-profile', 'CompanyProfileController@store');
    Route::post('users/picture', 'UserController@uploadPicture');

    Route::get('users/services', 'UserController@services');
    Route::get('users/picture', 'UserController@picture');

    Route::post('services/{service}/attach-service', 'ServiceController@attach');
    Route::post('services/attach-new-service', 'ServiceController@attachNew');
    Route::delete('services/{service}/detach-service', 'ServiceController@detach');

    Route::post('users/{user}/rate', 'RatingController@rate');

    Route::group(['middleware' => ['admin']], function() {
        Route::get('services/{service}', 'ServiceController@show')->where('service', '[0-9]+');
        Route::post('services', 'ServiceController@store');
        Route::put('services/{service}', 'ServiceController@update');
        Route::delete('services/{service}', 'ServiceController@destroy');

        Route::get('cities/{city}', 'CityController@show');
        Route::post('cities', 'CityController@store');
        Route::put('cities/{city}', 'CityController@update');
        Route::delete('cities/{city}', 'CityController@destroy');

        Route::delete('users/{user}', 'UserController@destroy');
    });
});