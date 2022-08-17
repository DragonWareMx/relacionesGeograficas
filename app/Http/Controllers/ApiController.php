<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Api;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ApiController extends Controller
{
    public function update(Request $request){
        DB::beginTransaction();
        try {
            $api = Api::firstOrFail();
            $api->url=$request->url;
            $api->save();
            
            DB::commit();
            return Redirect::back()->with('success', '¡Api editada con éxito!');
        } catch (\Throwable $th) {
            DB::rollBack();
            return Redirect::back()->with('error', 'Error: ' . $th->getMessage());
        }
    }
}
