<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UsergroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $usergroups = ['admin', 'user', 'freelancer', 'company'];
        foreach ($usergroups as $usergroup) {
            DB::table('usergroups')->insert([
                'name' => $usergroup
            ]);
        }
    }
}
