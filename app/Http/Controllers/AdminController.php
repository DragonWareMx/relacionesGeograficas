<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Relation;
use App\Models\Api;
use App\Models\Credit;
use App\Models\MainText;
use App\Models\Pdf;
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
        $mainText = MainText::first();
        $pdf = Pdf::first();
        $credits = Credit::first();

        return Inertia::render('Admin/relations', [
            'relations' => $relations,
            'api' => $api,
            'mainText' => $mainText,
            'pdf' => $pdf,
            'credits' => $credits
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
