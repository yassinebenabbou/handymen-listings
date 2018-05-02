<?php

use Illuminate\Database\Seeder;
use App\User;
use App\UserProfile;
use App\FreelancerProfile;
use App\CompanyProfile;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User;
        $user->email = 'admin@serbis.ma';
        $user->password = bcrypt('1234');
        $user->city_slug = "marrakech";
        $user->usergroup_id = User::Usergroup['admin'];
        $user->save();

        $profile = new UserProfile;
        $profile->full_name = "yassine benabbou";
        $profile->phone = "025412354";
        $profile->save();

        $profile->user()->save($user);

        /*
        // new User
        $user = new User;
        $user->email = 'freelancer@serbis.ma';
        $user->password = bcrypt('1234');
        $user->usergroup_id = User::Usergroup['freelancer'];
        $user->city_slug = "rabat";
        $user->save();

        $profile = new FreelancerProfile;
        $profile->full_name = "jason rogue";
        $profile->gender = "m";
        $profile->address = "something Ryad";
        $profile->phone = "02145369";
        $profile->CIN = "AE201456";
        $profile->save();

        $profile->user()->save($user);

        $user->services()->attach(1);
        $user->services()->attach(2);
        $user->services()->attach(3);

        // new User
        $user = new User;
        $user->email = 'freelancer2@serbis.ma';
        $user->password = bcrypt('1234');
        $user->usergroup_id = User::Usergroup['freelancer'];
        $user->city_slug = "agadir";
        $user->save();

        $profile = new FreelancerProfile;
        $profile->full_name = "jason2 rogue";
        $profile->gender = "m";
        $profile->address = "something Ryad";
        $profile->phone = "02145369";
        $profile->CIN = "AE201456";
        $profile->save();

        $profile->user()->save($user);

        $user->services()->attach(1);
        $user->services()->attach(2);
        $user->services()->attach(3);

        // new User
        $user = new User;
        $user->email = 'freelancer3@serbis.ma';
        $user->password = bcrypt('1234');
        $user->usergroup_id = User::Usergroup['freelancer'];
        $user->city_slug = "marrakech";
        $user->save();

        $profile = new FreelancerProfile;
        $profile->full_name = "jason3 rogue";
        $profile->gender = "m";
        $profile->address = "something Ryad";
        $profile->phone = "02145369";
        $profile->CIN = "AE201456";
        $profile->save();

        $profile->user()->save($user);

        $user->services()->attach(1);
        $user->services()->attach(2);
        $user->services()->attach(3);

        // new User
        $user = new User;
        $user->email = 'company@serbis.ma';
        $user->password = bcrypt('1234');
        $user->city_slug = "casablanca";
        $user->usergroup_id = User::Usergroup['company'];
        $user->save();

        $profile = new CompanyProfile;
        $profile->name = "MDT ltd.";
        $profile->phone = "0537145236";
        $profile->save();

        $profile->user()->save($user);

        $user->services()->attach(3);
        $user->services()->attach(2);
        $user->services()->attach(4);

        // new User
        $user = new User;
        $user->email = 'company2@serbis.ma';
        $user->password = bcrypt('1234');
        $user->city_slug = "marrakech";
        $user->usergroup_id = User::Usergroup['company'];
        $user->save();

        $profile = new CompanyProfile;
        $profile->name = "MDT2 ltd.";
        $profile->phone = "0537145236";
        $profile->save();

        $profile->user()->save($user);

        $user->services()->attach(3);
        $user->services()->attach(2);
        $user->services()->attach(4);

        // new User
        $user = new User;
        $user->email = 'company3@serbis.ma';
        $user->password = bcrypt('1234');
        $user->city_slug = "kenitra";
        $user->usergroup_id = User::Usergroup['company'];
        $user->save();

        $profile = new CompanyProfile;
        $profile->name = "MDT3 ltd.";
        $profile->phone = "0537145236";
        $profile->save();

        $profile->user()->save($user);

        $user->services()->attach(3);
        $user->services()->attach(2);
        $user->services()->attach(4);
        */
    }
}
