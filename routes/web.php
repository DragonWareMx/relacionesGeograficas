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

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('inicio');

Route::get('/creditos', function () {
    return Inertia::render('Pages/creditos');
});

Route::name('sources.')->group(function () {
    Route::get('/fuentes/{id}', [App\Http\Controllers\SourceController::class, 'index'])->name('index');
});

Route::name('relations.')->group(function () {
    Route::get('/relaciones-geograficas/{id}', [App\Http\Controllers\RelationController::class, 'index'])->name('index');
});

Route::name('admin.')->middleware('auth')->group(function () {
    Route::get('/admin/create', [App\Http\Controllers\RelationController::class, 'create'])->name('create');
    Route::get('/admin/index', [App\Http\Controllers\RelationController::class, 'index'])->name('index');
    Route::post('/admin/store', [App\Http\Controllers\RelationController::class, 'store'])->name('store');
});

Auth::routes(['register' => false]);

// Route::get('/login', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::post('login', [App\Http\Controllers\Auth\LoginController::class, 'login']);