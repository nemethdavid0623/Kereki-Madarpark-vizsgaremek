<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ImageFile' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'AnimalID'  => 'required|numeric|exists:animal,ID',
        ], [
            'ImageFile.required' => 'Kép kiválasztása kötelező!',
            'ImageFile.image'    => 'A feltöltött fájl csak kép lehet!',
            'AnimalID.required'  => 'Az állat azonosítója hiányzik!',
            'AnimalID.exists'    => 'A megadott állat nem létezik az adatbázisban!',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => "Validációs hiba!",
                "errors" => $validator->errors()->toArray()
            ], 400);
        }

        if ($request->hasFile('ImageFile')) {
            $file = $request->file('ImageFile');


            $fileName = time() . '_' . $file->getClientOriginalName();


            $file->storeAs('uploads', $fileName, 'public');


            $NewRecord = new Image();
            $NewRecord->ImageData = $fileName;
            $NewRecord->AnimalID = $request->AnimalID;
            $NewRecord->save();

            return response()->json([
                "success" => true,
                "message" => "Kép sikeresen feltöltve és az állathoz rendelve!",
                "id" => $NewRecord->id,
                "fileName" => $fileName
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $image = Image::find($id);

        if ($image) {
            // 1. Törlés a mappából
            if (Storage::disk('public')->exists('uploads/' . $image->ImageData)) {
                Storage::disk('public')->delete('uploads/' . $image->ImageData);
            }

            // 2. Törlés az adatbázisból
            $image->delete();

            return response()->json(["success" => true, "message" => "Kép törölve!"], 200);
        }

        return response()->json(["success" => false, "message" => "Kép nem található!"], 404);
    }
}
