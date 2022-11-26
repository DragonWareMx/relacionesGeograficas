<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Relation;
use App\Models\Api;
use App\Models\MainText;
use App\Models\Pdf;

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
    public function index(Request $request)
    {
        // Listar las relaciones alfabeticamente, nombre, miniatura, uuid
        $relaciones = Relation::select('uuid', 'nombre', 'alt_nombre', 'miniatura')
            ->when($request->search, function ($query, $search) {
                return $query->where('alt_nombre', 'LIKE', "%" . $search . "%");
            })
            ->orderBy('alt_nombre')
            ->get();
        $banners = Relation::select('uuid', 'nombre', 'banner')->inRandomOrder()->get();
        $api = Api::firstOrFail();
        $mainText = MainText::first();
        $pdf = Pdf::first();

        return Inertia::render('Pages/index', [
            'relaciones' => $relaciones,
            'banners' => $banners,
            'api' => $api,
            'mainText' => $mainText,
            'pdf' => $pdf,
        ]);
    }
}
