<?php

use Illuminate\Database\Seeder;

class CitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cities = [
            ["Marrakech", "مراكش"],
            ["Casablanca", "الدار البيضاء"],
            ["Rabat", "الرباط"],
            ["Tanger", "طنجة"],
            ["Kenitra", "القنيطرة"],
            ["Agadir", "اكادير"]
        ];

        foreach($cities as $city) {
            DB::table('cities')->insert([
                'name_ar' => $city[1],
                'name' => $city[0],
                'slug' => str_slug($city[0])
            ]);
        }
    }
}
