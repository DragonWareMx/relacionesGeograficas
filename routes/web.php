<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return Inertia::render('Pages/index');
});

Route::get('/relaciones-geograficas', function () {
    return Inertia::render('Pages/relacion');
});

Route::get('/creditos', function () {
    return Inertia::render('Pages/creditos');
});

Route::get('/fuentes', function () {
    return Inertia::render('Pages/fuentes');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');