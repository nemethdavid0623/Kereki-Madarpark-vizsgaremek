<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Mime\Message;

class AnimalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allData = Animal::with('images', 'species')->get();
        return response()->json($allData);
    }

    public function forSale()
    {
        $forSale = Animal::with(['images', 'species'])->where('ForSaleQuantity', '>', 0)->get();

        return response()->json($forSale);;
    }

    public function parkQuantity()
    {
        $quantity = Animal::with(['images', 'species'])->where('Quantity', '>', 0)->get();
        return response()->json($quantity);;
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
            'SpeciesName' => 'required|string',
            'Quantity' => 'required|numeric',
            'ForSaleQuantity' => 'required|numeric|min:0',
            'Description' => 'required|string',
            'More' => 'required|string',
            'SpeciesID' => 'required|numeric',
            // Opcionális: Validálhatod a képeket is a tömbben
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ], [
            'SpeciesName.required' => 'Fajnév megadása kötelező',
            'Quantity.required' => 'A mennyiség megadása kötelező',
            'ForSaleQuantity.required' => 'Az eladásra szánt mennyiség megadása kötelező',
            'Description.required' => 'A leírás megadása kötelező',
            'More.required' => 'A leírás megadása kötelező',
            'SpeciesID.required' => 'A faj azonosító megadása kötelező',
        ]);

        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => "Hiba a hozzáadás során!", "errors" => $validator->errors()->toArray()], 400);
        }

        $NewRecord = new Animal();
        $NewRecord->SpeciesName = $request->SpeciesName;
        $NewRecord->Quantity = $request->Quantity;
        $NewRecord->ForSaleQuantity = $request->ForSaleQuantity;
        $NewRecord->Description = $request->Description;
        $NewRecord->More = $request->More;
        $NewRecord->SpeciesID = $request->SpeciesID;
        $NewRecord->save();

        // TÖBB KÉP KEZELÉSE
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $fileName = time() . '_' . $file->getClientOriginalName();

                // Mentés a storage/app/public/uploads mappába
                $file->storeAs('uploads', $fileName, 'public');

                // Minden egyes képhez külön rekord az Image táblában
                Image::create([
                    'ImageData' => $fileName,
                    'AnimalID'  => $NewRecord->ID // Vagy $NewRecord->id, attól függ mi a PK
                ]);
            }
        }

        return response()->json(["success" => true, "data" => $NewRecord->load('images')], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Animal $animal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Animal $animal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $animal = Animal::find($id);
        if (!$animal) {
            return response()->json(["success" => false, "message" => "Az állat nem található!"], 404);
        }

        // 1. Validáció (figyelj az 'images.*' formátumra a tömb miatt!)
        $validator = Validator::make($request->all(), [
            'SpeciesName'     => 'required|string',
            'Quantity'        => 'required|numeric',
            'ForSaleQuantity' => 'required|numeric|min:0',
            'Description'     => 'required|string',
            'More'            => 'required|string',
            'SpeciesID'       => 'required|numeric',
            'images.*'        => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ], [
            'images.*.image' => 'A fájlok csak képek lehetnek!',
            'images.*.max'   => 'Egy kép mérete sem lehet több 2MB-nál!'
        ]);

        if ($validator->fails()) {
            return response()->json(["success" => false, "errors" => $validator->errors()], 400);
        }

        // 2. Szöveges adatok frissítése
        $animal->update($request->only([
            'SpeciesName',
            'Quantity',
            'ForSaleQuantity',
            'Description',
            'More',
            'SpeciesID'
        ]));

        // 3. TÖBB ÚJ KÉP HOZZÁADÁSA (Csak ha küldtek újakat)
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $fileName = time() . '_' . $file->getClientOriginalName();

                // Mentés a storage mappába
                $file->storeAs('uploads', $fileName, 'public');

                // Új rekord létrehozása (NEM felülírás, hanem hozzáadás a galériához)
                Image::create([
                    'AnimalID' => $id,
                    'ImageData' => $fileName
                ]);
            }
        }

        return response()->json([
            "success" => true,
            "message" => "Minden sikeresen frissítve!",
            "data" => $animal->load('images') // Frissített adatok visszaadása
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $animal = Animal::find($id);

        if ($animal) {
            // 1. Képek lekérése a fájlrendszer miatt
            $images = Image::where('AnimalID', $id)->get();

            // 2. Fájlok törlése a mappából
            foreach ($images as $image) {
                if (Storage::disk('public')->exists('uploads/' . $image->ImageData)) {
                    Storage::disk('public')->delete('uploads/' . $image->ImageData);
                }
            }

            // 3. Rekordok törlése az adatbázisból (tömegesen)
            Image::where('AnimalID', $id)->delete();

            // 4. Állat törlése
            $animal->delete();

            return response()->json(["Message" => "Állat és képei törölve!"], 202);
        }

        return response()->json(["Message" => "Állat nem található!"], 404);
    }
}
