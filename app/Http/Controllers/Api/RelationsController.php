<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Relation;
use Illuminate\Http\Request;

class RelationsController extends Controller
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Relation  $relation
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $relation = Relation::with('maps', 'invoices')->where('idDS', $id)->first();

        if ($relation) {
            //put the full route of the image
            $relation->banner = $relation->banner ? url('storage/relaciones/' . $relation->banner) : null;
            $relation->miniatura = $relation->miniatura ? url('storage/relaciones/' . $relation->miniatura) : null;
            //iterate on each map and put the full route of the image
            foreach ($relation->maps as $map) {
                $map->imagen = $map->imagen ? url('storage/relaciones/' . $map->imagen) : null;
            }
            //iterate on each invoice and put the full route of the image
            foreach ($relation->invoices as $invoice) {
                $invoice->imagen = $invoice->imagen ? url('storage/relaciones/' . $invoice->imagen) : null;
                $invoice->min = $invoice->min ? url('storage/relaciones/' . $invoice->min) : null;
            }
            return response()->json($relation, 200);
        } else {
            return response()->json(['message' => 'No se encontró la relación'], 404);
        }
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