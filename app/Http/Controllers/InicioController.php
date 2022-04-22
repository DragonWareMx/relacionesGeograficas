<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Relation;

class InicioController extends Controller
{
    public function index(){
        // Listar las relaciones alfabeticamente, nombre, miniatura, uuid
        $relaciones = Relation::select('uuid','nombre','miniatura')->orderBy('nombre')->get();
        // dd($relaciones);
        return Inertia::render('Pages/index',['relaciones' => $relaciones]);
    }
}
