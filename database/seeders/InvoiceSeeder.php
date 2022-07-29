<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class InvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'folio' => 1,
            'nombre' => 'traducción',
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'folio' => 2,
            'nombre' => 'traducción',
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'folio' => 3,
            'nombre' => 'traducción',
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'folio' => 4,
            'nombre' => 'traducción',
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'folio' => 5,
            'nombre' => 'traducción',
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'folio' => 6,
            'nombre' => 'traducción',
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'folio' => 7,
            'nombre' => 'traducción',
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'folio' => 8,
            'nombre' => 'traducción',
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

    }
}
