<?php

namespace App\Http\Controllers;

use App\Models\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class PdfController extends Controller
{
    public function update(Request $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'file' => 'required|file|mimes:pdf',
            ]);

            $pdf = Pdf::first();
            if (!$pdf) $pdf = new Pdf();

            if ($request->hasFile('file')) {

                // Get filename with the extension
                $filenameWithExt = $request->file('file')->getClientOriginalName();
                //Get just filename
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                // Get just ext
                $extension = $request->file('file')->getClientOriginalExtension();
                // Filename to store
                $fileNameToStore = $filename . '_' . time() . '.' . $extension;
                // Upload Image
                $path = $request->file('file')->storeAs('public/pdf', $fileNameToStore);

                $pdf->pdf = $fileNameToStore;
            }
            $pdf->save();
            DB::commit();

            return Redirect::back()->with('success', 'Pdf editado con éxito!');
        } catch (\Throwable $th) {
            DB::rollback();
            dd($th);
            return Redirect::back()->with('error', 'Error: ' . $th->getMessage());
        }
    }
}
