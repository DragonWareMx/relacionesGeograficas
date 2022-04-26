<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TranscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('transcriptions')->insert([
            'uuid' => '2345678920',
            'nombre' => 'Acuña 1986',
            'texto' => 'texto texto texto',
            'invoice_id' => '1',

        ]);

        // DB::table('transcriptions')->insert([
        //     '' => '',
        //     '' => '',
        //     '' => '',
        // ]);

    }
}
