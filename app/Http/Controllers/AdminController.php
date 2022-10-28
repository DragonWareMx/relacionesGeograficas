<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Relation;
use App\Models\Api;
use App\Models\Credit;
use App\Models\MainText;
use App\Models\Pdf;
use App\Models\Transcription;
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
        $last = 0;
        if ($relation->invoices && count($relation->invoices) >= 1) {
            foreach ($relation->invoices as $invoice) {
                $last = $invoice->folio;
            }
        }
        $next = $last + 1;
        $api = Api::firstOrFail();
        $autors = Transcription::select('nombre')->groupBy('nombre')->get();

        return Inertia::render('Admin/edit', [
            'oldRelation' => $relation,
            'api' => $api,
            'next' => $next,
            'autors' => $autors
        ]);
    }
}
