<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Relation;
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

        return Inertia::render('Admin/relations', ['relations' => $relations]);
    }

    public function show($id)
    {
        $relation = Relation::with('maps')->findOrFail($id);
        return Inertia::render('Admin/edit', ['oldRelation' => $relation]);
    }
}
