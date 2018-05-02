<?php

use Illuminate\Database\Seeder;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $services = [
            ['First Service', 'الخدمات الأولية']/*,
            ['Second Service', 'الخدمات الثانية'],
            ['Third Service', 'الخدمات الثاثة'],
            ['Fourth Service', 'الخدمات الرابعة'],
            ['Fifth Service', 'الخدمات الخامسة']*/
        ];
        foreach ($services as $service) {
            DB::table('services')->insert([
                'name' => $service[0],
                'name_ar' => $service[1],
                'slug' => str_slug($service[0]),
                'confirmed' => true
            ]);
        }
    }
}
