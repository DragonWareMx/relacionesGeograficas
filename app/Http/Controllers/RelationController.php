<?php

namespace App\Http\Controllers;

use App\Models\Relation;
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
        $relation = Relation::where('uuid', $id)->firstOrFail();

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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|max:255|string',
            'imageBanner' => 'required',
            'imageMin' => 'required',
            'fuentes' => 'required|string',
            'mapa_geografico' => 'nullable',
            'mapImages' => 'nullable',
            'folios' => 'nullable',
            'descripcion' => 'nullable',
            'imageFolio' => 'nullable',
        ]);

        $foto = null;
        $fotoMin = null;
        DB::beginTransaction();
        try {
            $relation = new Relation();
            $relation->uuid = Str::uuid();
            $relation->api = '{}';
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
            return Redirect::route('admin.create')->with('error', 'Ha ocurrido un error con su solicitud, inténtelo de nuevo más tarde');
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
