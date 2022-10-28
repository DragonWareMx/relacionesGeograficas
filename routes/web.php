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

Route::name('sources.')->group(function () {
    Route::get('/fuentes/{id}', [App\Http\Controllers\SourceController::class, 'index'])->name('index');
});

Route::name('relations.')->group(function () {
    Route::get('/relaciones-geograficas/{id}', [App\Http\Controllers\RelationController::class, 'index'])->name('index');
});

Route::name('folio.')->middleware('auth')->group(function () {
    Route::post('/admin/{relation}/folio/{invoice}', [App\Http\Controllers\InvoiceController::class, 'update'])->scopeBindings()->name('update');
    Route::post('/admin/{relation}/folio', [App\Http\Controllers\InvoiceController::class, 'store'])->name('store');
    Route::delete('/admin/{relation}/folio/{invoice}', [App\Http\Controllers\InvoiceController::class, 'delete'])->scopeBindings()->name('delete');
});

Route::name('admin.')->middleware('auth')->group(function () {
    Route::get('/admin/create', [App\Http\Controllers\RelationController::class, 'create'])->name('create');
    Route::get('/admin/index', [App\Http\Controllers\AdminController::class, 'relations'])->name('index');
    Route::post('/admin', [App\Http\Controllers\RelationController::class, 'store'])->name('store');
    Route::post('/admin/{id}', [App\Http\Controllers\RelationController::class, 'update'])->name('update');
    Route::delete('/admin/{relation}', [App\Http\Controllers\RelationController::class, 'destroy'])->name('delete');
    Route::get('/admin/relations/{id}', [App\Http\Controllers\AdminController::class, 'show'])->name('show');
});


Route::name('api.')->middleware('auth')->group(function () {
    Route::post('/updateApi', [App\Http\Controllers\ApiController::class, 'update'])->name('update');
});

Route::name('mainText.')->middleware('auth')->group(function () {
    Route::post('/updateMainText', [App\Http\Controllers\MainTextController::class, 'update'])->name('update');
});

Route::name('pdf.')->middleware('auth')->group(function () {
    Route::post('/updatePdf', [App\Http\Controllers\PdfController::class, 'update'])->name('update');
});

Route::name('credits.')->middleware('auth')->group(function () {

    Route::get('/creditos', [App\Http\Controllers\CreditController::class, 'index'])->name('index');
    Route::post('/updateCredits', [App\Http\Controllers\CreditController::class, 'update'])->name('update');
});

Route::get('/fromapi/{idDS}', [App\Http\Controllers\ApiController::class, 'fromapi'])->name('fromapi');

Route::get('/verify/{idDS}', [App\Http\Controllers\ApiController::class, 'verify'])->name('verify');


Auth::routes(['register' => false]);

// Route::get('/login', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::post('login', [App\Http\Controllers\Auth\LoginController::class, 'login']);
