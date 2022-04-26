<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RelationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('relations')->insert([
            'uuid' => '1234567890',
            'nombre' => 'Culhuacan',
            'api' => '{}',
            'banner' => 'banner_culhuacan.jpg',
            'miniatura' => 'mini_culhuacan.jpg',
        ]);

        // DB::table('relations')->insert([
        //     '' => '',
        //     '' => '',
        //     '' => '',
        // ]);

    }
}
