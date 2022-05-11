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
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

        DB::table('invoices')->insert([
            'uuid' => Str::uuid(),
            'descripcion' => '',
            'imagen' => 'Culhuacan1.jpg',
            'relation_id' => '1',
        ]);

    }
}
