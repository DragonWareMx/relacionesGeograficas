<?php

namespace App\Http\Controllers;

use App\Models\Relation;
use App\Models\Invoice;
use App\Models\Transcription;
use App\Models\Map;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class RelationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        //
        $relation = Relation::where('uuid', $id)
        ->with(['maps', 'invoices', 'invoices.transcriptions'])
        ->firstOrFail();

        return Inertia::render('Pages/relacion', ['relation' => $relation]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/create');
    }

    /**
     * Store a newly created resource in storage
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|max:255|string',
            'fuentes' => 'required|string',
            'mapa_geografico' => 'required|string',

            'imageBanner' => 'required',
            'imageMin' => 'required',
            'mapImages' => 'required',
            'folios' => 'required',
            'mapa_geografico' => 'required|url',

            'folios' => 'nullable',
            'descripcion' => 'nullable',
            'imageFolio' => 'nullable',
        ]);

        $foto = null;
        $fotoMin = null;
        $mapasFolios = null;
        $mapas = null;
        DB::beginTransaction();

        try {
            $relation = new Relation();
            $relation->uuid = Str::uuid();
            $relation->api = $request->mapa_geografico;
            $relation->nombre = $request->nombre;
            if ($request->imageBanner) {
                //Se sube foto
                $foto = $request->file('imageBanner')[0]->store('public/relaciones');
                $fileName = $request->file('imageBanner')[0]->hashName();
                // $image = Image::make(Storage::get($foto));

                // $image->resize(1280, null, function ($constraint) {
                //     $constraint->aspectRatio();
                //     $constraint->upsize();
                // });

                // Storage::put($foto, (string) $image->encode('jpg', 30));
                $relation->banner = $fileName;
            }
            if ($request->imageMin) {
                //Se sube foto
                $fotoMin = $request->file('imageMin')[0]->store('public/relaciones');
                $fileName = $request->file('imageMin')[0]->hashName();
                // $image = Image::make(Storage::get($foto));

                // $image->resize(1280, null, function ($constraint) {
                //     $constraint->aspectRatio();
                //     $constraint->upsize();
                // });

                // Storage::put($foto, (string) $image->encode('jpg', 30));
                $relation->miniatura = $fileName;
            }

            $relation->save();

            if($request->folios){
                $mapasFolios = [];
                foreach ($request->folios as $key => $folio) {
                    $folioM = new Invoice;
                    $folioM->uuid = Str::uuid();
                    $folioM->descripcion = $folio["descripcion"];
                    
                    $mapasFolios[$key] = $request->file('folios')[$key]["imageFolio"][0]->store('public/relaciones');
                    $fileName = $request->file('folios')[$key]["imageFolio"][0]->hashName();
                    $folioM->imagen = $fileName;

                    $folioM->save();

                    $relation->invoices()->save($folioM);

                    foreach ($folio["transcriptions"] as $key2 => $transcripcion) {
                        $transcription = new Transcription;
                        $transcription->uuid = Str::uuid();
                        $transcription->nombre = $transcripcion["name"];
                        $transcription->texto = $transcripcion["text"];
                        $transcription->invoice_id = $folioM->id;
                        $transcription->save();
                    }
                }
            }

            if ($request->mapImages) {
                $mapas = [];
                foreach ($request->mapImages as $key => $mapa) {
                    $map = new Map;
                    $map->uuid = Str::uuid();
                    //Se sube foto
                    $mapas[$key] = $mapa->store('public/relaciones');
                    $fileName = $mapa->hashName();
    
                    $map->imagen = $fileName;
                    $map->relation_id = $relation->id;
                    $map->save();

                    // $map->relation()->associate($relation);
                }
            }

            DB::commit();
            return Redirect::route('admin.index')->with('success', '??Relaci??n creada con ??xito!');
        } catch (\Throwable $th) {
            DB::rollBack();

            //Si hay foto se elimina del servidor
            if ($foto) {
                Storage::delete($foto);
            }
            if ($fotoMin) {
                Storage::delete($fotoMin);
            }

            if($mapasFolios && count($mapasFolios) > 0){
                foreach ($mapasFolios as $key => $mapa) {
                    Storage::delete($mapa);
                }
            }

            if($mapas && count($mapas) > 0){
                foreach ($mapas as $key => $mapa) {
                    Storage::delete($mapa);
                }
            }

            return Redirect::route('admin.create')->with('error', 'Ha ocurrido un error con su solicitud, int??ntelo de nuevo m??s tarde');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Relation  $relation
     * @return \Illuminate\Http\Response
     */
    public function show(Relation $relation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Relation  $relation
     * @return \Illuminate\Http\Response
     */
    public function edit(Relation $relation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Relation  $relation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Relation $relation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Relation  $relation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Relation $relation)
    {
        //
    }
}
