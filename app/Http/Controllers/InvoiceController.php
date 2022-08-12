<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Relation;
use App\Models\Transcription;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Relation $relation, Request $request)
    {
        $validated = $request->validate([
            'no_folio' => 'required|numeric',
            'nombre' => 'required|max:255|string',
            'descripcion' => 'nullable',
            'image.*' => 'required|array',
            'image.*' => 'required|image',
            'transcriptions' => 'nullable|array',
            'transcriptions.*.nombre' => 'nullable|string|max:255',
            'transcriptions.*.texto' => 'nullable|string',
        ]);

        $image = null;
        DB::beginTransaction();

        try {

            $folio = new Invoice;
            $folio->uuid = Str::uuid();
            $folio->folio = $request->no_folio;
            $folio->nombre = $request->nombre;
            $folio->descripcion = $request->descripcion;

            if ($request->image) {
                //Se sube foto
                $image = $request->file('image')[0]->store('public/relaciones');
                $fileName = $request->file('image')[0]->hashName();
                // $image = Image::make(Storage::get($foto));

                // $image->resize(1280, null, function ($constraint) {
                //     $constraint->aspectRatio();
                //     $constraint->upsize();
                // });

                // Storage::put($foto, (string) $image->encode('jpg', 30));
                $folio->imagen = $fileName;
            }

            
            $folio->save();
            
            if($request->transcriptions){
                foreach ($request->transcriptions as $key => $transcription) {
                    if($transcription["nombre"] && $transcription["texto"]){
                        $newTranscription = new Transcription;
                        $newTranscription->uuid = Str::uuid();
                        $newTranscription->nombre = $transcription["nombre"];
                        $newTranscription->texto = $transcription["texto"];
                        $newTranscription->save();

                        $folio->transcriptions()->save($newTranscription);
                    }
                }
            }

            $relation->invoices()->save($folio);


            DB::commit();
            return Redirect::back()->with('success', '¡Folio creado con éxito!');
        } catch (\Throwable $th) {
            DB::rollBack();

            if ($image) {
                Storage::delete($image);
            }
            return Redirect::back()->with('error', 'Ha ocurrido un error con su solicitud, inténtelo de nuevo más tarde');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function show(Invoice $invoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function update(Relation $relation, Invoice $invoice, Request $request)
    {
        $validated = $request->validate([
            'no_folio' => 'required|numeric',
            'nombre' => 'required|max:255|string',
            'descripcion' => 'nullable',
            'image.*' => 'nullable|array',
            'image.*' => 'required|image',
            'transcriptions' => 'nullable|array',
            'transcriptions.*.nombre' => 'nullable|string|max:255',
            'transcriptions.*.texto' => 'nullable|string',
        ]);

        $image = null;
        DB::beginTransaction();

        try {
            $invoice->uuid = Str::uuid();
            $invoice->folio = $request->no_folio;
            $invoice->nombre = $request->nombre;
            $invoice->descripcion = $request->descripcion;

            if ($request->image && $request->image[0]) {
                if($invoice->imagen){
                    \Storage::delete('public/relaciones/'.$invoice->imagen);
                }
                //Se sube foto
                $image = $request->file('image')[0]->store('public/relaciones');
                $fileName = $request->file('image')[0]->hashName();
                // $image = Image::make(Storage::get($foto));

                // $image->resize(1280, null, function ($constraint) {
                //     $constraint->aspectRatio();
                //     $constraint->upsize();
                // });

                // Storage::put($foto, (string) $image->encode('jpg', 30));
                $invoice->imagen = $fileName;
            }
            
            $invoice->save();
            
            if($request->transcriptions){
                $invoice->transcriptions()->delete();
                foreach ($request->transcriptions as $key => $transcription) {
                    if($transcription["nombre"] && $transcription["texto"]){
                        $newTranscription = new Transcription;
                        $newTranscription->uuid = Str::uuid();
                        $newTranscription->nombre = $transcription["nombre"];
                        $newTranscription->texto = $transcription["texto"];
                        $newTranscription->save();

                        $invoice->transcriptions()->save($newTranscription);
                    }
                }
            }

            $relation->invoices()->save($invoice);


            DB::commit();
            return Redirect::back()->with('success', '¡Folio editado con éxito!');
        } catch (\Throwable $th) {
            DB::rollBack();

            if ($image) {
                Storage::delete($image);
            }
            return Redirect::back()->with('error', 'Ha ocurrido un error con su solicitud, inténtelo de nuevo más tarde');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function delete(Relation $relation, Invoice $invoice)
    {
        DB::beginTransaction();

        try {
            if($invoice->imagen){
                \Storage::delete('public/relaciones/'.$invoice->imagen);
            }
            $invoice->transcriptions()->delete();
            $invoice->delete();

            DB::commit();
            return Redirect::back()->with('success', '¡Folio eliminado con éxito!');
        } catch (\Throwable $th) {
            DB::rollBack();

            return Redirect::back()->with('error', 'Ha ocurrido un error con su solicitud, inténtelo de nuevo más tarde');
        }
    }
}
