<?php

namespace App\Http\Controllers;

use App\Models\MainText;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class MainTextController extends Controller
{
    public function update(Request $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'izq' => 'required|string|max:5000',
                'der' => 'required|string|max:5000',
            ]);
            $mainText = MainText::first();
            if (!$mainText) $mainText = new MainText();

            $mainText->izq = $validated['izq'];
            $mainText->der = $validated['der'];
            $mainText->save();
            DB::commit();

            return Redirect::back()->with('success', '¡Texto editado con éxito!');
        } catch (\Throwable $th) {
            DB::rollback();
            return Redirect::back()->with('error', 'Error: ' . $th->getMessage());
        }
    }
}
