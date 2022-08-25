<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserINAHSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'name' => 'Alberto Alcantara',
            'email' =>  'Luis.betoasaber@gmail.com',
            'password' => Hash::make('betoINAH20222'),
        ]);

        DB::table('users')->insert([
            'name' => 'Diego Jiménez Badillo',
            'email' =>  'diego.jimenez61@gmail.com',
            'password' => Hash::make('diegoINAH20222'),
        ]);

        DB::table('users')->insert([
            'name' => 'Juan Carlos Jiménez Abarca',
            'email' =>  'juancjimeneza@gmail.com',
            'password' => Hash::make('juancINAH20222'),
        ]);

        DB::table('users')->insert([
            'name' => 'Francisco Cruz',
            'email' =>  'franciscoczr@gmail.com	',
            'password' => Hash::make('franciscoINAH20222'),
        ]);

        DB::table('users')->insert([
            'name' => 'Laura Moreno',
            'email' =>  'mosolau@gmail.com',
            'password' => Hash::make('lauMoINAH20222'),
        ]);
    }
}