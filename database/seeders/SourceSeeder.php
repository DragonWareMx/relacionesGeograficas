<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('sources')->insert([
            'uuid' => '',
            'ficha' => '',
            'relation_id' => '',
        ]);
        DB::table('sources')->insert([
            '' => '',
            '' => '',
            '' => '',
        ]);

    }
}
