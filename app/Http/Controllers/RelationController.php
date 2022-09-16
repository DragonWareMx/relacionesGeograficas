<?php

namespace App\Http\Controllers;

use App\Models\Relation;
use App\Models\Invoice;
use App\Models\api;
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
            ->with(['invoices' => function ($query) {
                $query->orderBy('folio', 'ASC');
            }, 'invoices.transcriptions'])
            ->with(['maps'])
            ->firstOrFail();

        $api = Api::firstOrFail();

        return Inertia::render('Pages/relacion', [
            'relation' => $relation,
            'api' => $api
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $api = Api::firstOrFail();
        return Inertia::render('Admin/create', ['api' => $api]);
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
            'fuentes' => 'nullable|string',
            'idDS' => 'required|numeric',
            'alt_nombre' => 'nullable|string|max:255',

            'imageBanner' => 'required',
            'imageMin' => 'required',
            'mapImages' => 'required',
            'folios' => 'required',

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
            $relation->idDS = $request->idDS;
            $relation->nombre = $request->nombre;
            $relation->alt_nombre = $request->alt_nombre;
            $relation->fuentes = $request->fuentes;
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

            if ($request->folios) {
                $mapasFolios = [];
                foreach ($request->folios as $key => $folio) {
                    $folioM = new Invoice;
                    $folioM->uuid = Str::uuid();
                    $folioM->nombre = $folio["nombre"];
                    $folioM->folio = $folio["no_folio"];
                    $folioM->descripcion = $folio["descripcion"] ?? null;

                    $mapasFolios[$key] = $request->file('folios')[$key]["imageFolio"][0]->store('public/relaciones');
                    $fileName = $request->file('folios')[$key]["imageFolio"][0]->hashName();
                    $folioM->imagen = $fileName;

                    $folioM->save();

                    $relation->invoices()->save($folioM);

                    if (isset($folio["transcriptions"]) && count($folio["transcriptions"]) > 0) {
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
            return Redirect::route('admin.index')->with('success', '¡Relación creada con éxito!');
        } catch (\Throwable $th) {
            DB::rollBack();

            //Si hay foto se elimina del servidor
            if ($foto) {
                Storage::delete($foto);
            }
            if ($fotoMin) {
                Storage::delete($fotoMin);
            }

            if ($mapasFolios && count($mapasFolios) > 0) {
                foreach ($mapasFolios as $key => $mapa) {
                    Storage::delete($mapa);
                }
            }

            if ($mapas && count($mapas) > 0) {
                foreach ($mapas as $key => $mapa) {
                    Storage::delete($mapa);
                }
            }

            return Redirect::back()->with('error', 'Error: ' . $th->getMessage());
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
    public function update(Request $request, $id)
    {
        //
        $validated = $request->validate([
            'nombre' => 'required|max:255|string',
            'fuentes' => 'nullable|max:1000|string',
            'idDS' => 'required|numeric',
            'alt_nombre' => 'nullable|string|max:255',

            'imageBanner' => 'nullable',
            'imageBanner.*' => 'image',
            'imageMin' => 'nullable',
            'imageMin.*' => 'image',
            'mapImages' => 'nullable',
            'mapImages.*' => 'image',
            'deletedPictos' => 'nullable',
            'deletedPictos.*' => 'numeric',
            // 'folios' => 'required',

            // 'folios' => 'nullable',
            // 'descripcion' => 'nullable',
            // 'imageFolio' => 'nullable',
        ]);

        // dd($request);
        $foto = null;
        $fotoMin = null;
        $mapasFolios = null;
        $mapas = null;
        DB::beginTransaction();

        try {
            $relation = Relation::findOrFail($id);
            $relation->idDS = $request->idDS;
            $relation->nombre = $request->nombre;
            $relation->alt_nombre = $request->alt_nombre;
            $relation->fuentes = $request->fuentes;

            //images
            if ($request->imageBanner && $request->imageBanner[0]) {
                // si ya tenia una en el sistema, se borra
                if ($relation->banner) {
                    \Storage::delete('public/relaciones/' . $relation->banner);
                }

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

            // if($request->imageMin && $request->imageMin[0]){
            //     // si ya tenia una en el sistema, se borra
            //     if($relation->banner){
            //         \Storage::delete('public/relaciones/'.$relation->banner);
            //     }

            //     $fotoMin = $request->file('imageMin')[0]->store('public/relaciones');
            //     $fileName = $request->file('imageMin')[0]->hashName();
            //     // $image = Image::make(Storage::get($foto));

            //     // $image->resize(1280, null, function ($constraint) {
            //     //     $constraint->aspectRatio();
            //     //     $constraint->upsize();
            //     // });

            //     // Storage::put($foto, (string) $image->encode('jpg', 30));
            //     $relation->banner = $fileName;
            // }

            if ($request->imageMin && $request->imageMin[0]) {
                if ($relation->miniatura) {
                    \Storage::delete('public/relaciones/' . $relation->miniatura);
                }
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

            if ($request->folios) {
                $mapasFolios = [];
                foreach ($request->folios as $key => $folio) {
                    $folioM = new Invoice;
                    $folioM->uuid = Str::uuid();
                    $folioM->nombre = $folio["nombre"];
                    $folioM->folio = $folio["no_folio"];
                    $folioM->descripcion = $folio["descripcion"] ?? null;

                    $mapasFolios[$key] = $request->file('folios')[$key]["imageFolio"][0]->store('public/relaciones');
                    $fileName = $request->file('folios')[$key]["imageFolio"][0]->hashName();
                    $folioM->imagen = $fileName;

                    $folioM->save();

                    $relation->invoices()->save($folioM);

                    if (isset($folio["transcriptions"]) && count($folio["transcriptions"]) > 0) {
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
            }

            if ($request->deletedPictos) {
                foreach ($request->deletedPictos as $key => $mapId) {
                    $map = Map::find($mapId);
                    //Se elimina la foto
                    \Storage::delete('public/relaciones/' . $map->imagen);

                    $map->delete();
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
                }
            }

            DB::commit();
            return Redirect::route('admin.index')->with('success', '¡Relación editada con éxito!');
        } catch (\Throwable $th) {
            DB::rollBack();

            //Si hay foto se elimina del servidor
            if ($foto) {
                Storage::delete($foto);
            }
            if ($fotoMin) {
                Storage::delete($fotoMin);
            }

            if ($mapasFolios && count($mapasFolios) > 0) {
                foreach ($mapasFolios as $key => $mapa) {
                    Storage::delete($mapa);
                }
            }

            if ($mapas && count($mapas) > 0) {
                foreach ($mapas as $key => $mapa) {
                    Storage::delete($mapa);
                }
            }
            return Redirect::back()->with('error', 'Error: ' . $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Relation  $relation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Relation $relation)
    {
        DB::beginTransaction();

        try {
            //delete all maps
            foreach ($relation->maps as $key => $map) {
                if ($map->imagen) {
                    \Storage::delete('public/relaciones/' . $map->imagen);
                }
            }
            $relation->maps()->delete();

            //delete invoices images
            foreach ($relation->invoices as $key => $invoice) {
                if ($invoice->imagen) {
                    \Storage::delete('public/relaciones/' . $invoice->imagen);
                }
                $invoice->transcriptions()->delete();
            }
            $relation->invoices()->delete();

            if ($relation->banner) {
                \Storage::delete('public/relaciones/' . $relation->banner);
            }
            if ($relation->miniatura) {
                \Storage::delete('public/relaciones/' . $relation->miniatura);
            }

            $relation->delete();

            DB::commit();
            return Redirect::route('admin.index')->with('success', '¡Relación eliminada con éxito!');
        } catch (\Throwable $th) {
            DB::rollBack();
            return Redirect::back()->with('error', 'Error: ' . $th->getMessage());
        }
    }
}