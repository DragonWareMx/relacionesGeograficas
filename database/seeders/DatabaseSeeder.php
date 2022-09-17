<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            RelationSeeder::class,
            MapSeeder::class,
            SourceSeeder::class,
            InvoiceSeeder::class,
            TranscriptionSeeder::class,
            UsersSeeder::class,
            ApiSeeder::class,
            UserINAHSeeder::class,
        ]);
    }
}