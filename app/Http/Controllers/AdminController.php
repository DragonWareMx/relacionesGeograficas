<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Relation;
use App\Models\Api;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function relations()
    {
        $relations = Relation::orderBy('nombre')->get();
        $api = Api::firstOrFail();

        return Inertia::render('Admin/relations', [
            'relations' => $relations,
            'api' => $api
        ]);
    }

    public function show($id)
    {
        $relation = Relation::with('maps')
            ->with(['invoices' => function ($query) {
                $query->orderBy('folio', 'ASC');
            }, 'invoices.transcriptions'])
            ->findOrFail($id);
        $api = Api::firstOrFail();

        return Inertia::render('Admin/edit', [
            'oldRelation' => $relation,
            'api' => $api
        ]);
    }
}
