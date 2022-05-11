<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('maps')->insert([
            'uuid' => '5678901234',
            'imagen' => 'Culhuacan_mapa.jpg',
            'relation_id' => '1',
        ]);
        // DB::table('maps')->insert([
        //     '' => '',
        //     '' => '',
        //     '' => '',
        // ]);

    }
}
