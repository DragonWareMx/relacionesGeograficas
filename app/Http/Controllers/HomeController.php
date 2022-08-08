<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Relation;

class HomeController extends Controller
{
    // /**
    //  * Create a new controller instance.
    //  *
    //  * @return void
    //  */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // Listar las relaciones alfabeticamente, nombre, miniatura, uuid
        $relaciones = Relation::select('uuid', 'nombre', 'miniatura')->orderBy('nombre')->get();
        $banners = Relation::select('uuid', 'nombre', 'banner')->inRandomOrder()->take(12)->get();

        return Inertia::render('Pages/index', ['relaciones' => $relaciones, 'banners' => $banners]);
    }
}