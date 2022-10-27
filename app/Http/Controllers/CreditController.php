<?php

namespace App\Http\Controllers;

use App\Models\Credit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class CreditController extends Controller
{
    public function update(Request $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'credits_izq' => 'required|string|max:5000',
                'credits_der' => 'required|string|max:5000',
            ]);
            $credit = Credit::first();
            if (!$credit) $credit = new Credit();

            $credit->izq = $validated['credits_izq'];
            $credit->der = $validated['credits_der'];
            $credit->save();
            DB::commit();

            return Redirect::back()->with('success', 'Créditos editados con éxito!');
        } catch (\Throwable $th) {
            DB::rollback();
            return Redirect::back()->with('error', 'Error: ' . $th->getMessage());
        }
    }
}
