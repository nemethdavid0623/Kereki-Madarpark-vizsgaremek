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

        ], [
            'SpeciesName.required' => 'Fajnév megadása kötelező',
            'SpeciesName.string' => 'Hibás formátum',

            'Quantity.required' => 'A mennyiség megadása kötelező',
            'Quantity.numeric' => 'A mennyiség csak szám lehet',

            'ForSaleQuantity.required' => 'Az eladásra szánt mennyiség megadása kötelező',
            'ForSaleQuantity.numeric' => 'Az eladásra szánt mennyiség csak szám lehet',
            'ForSaleQuantity.min' => 'Az eladásra szánt mennyiség nem lehet negatív',

            'Description.required' => 'A leírás megadása kötelező',
            'Description.string' => 'A leírás formátuma hibás',
            'More.required' => 'A leírás megadása kötelező',
            'More.string' => 'A leírás formátuma hibás',

            'SpeciesID.required' => 'A faj azonosító megadása kötelező',
            'SpeciesID.numeric' => 'A faj azonosító csak szám lehet'

        ]);
        if ($validator->fails()) {
            return response()->json(["success" => false, "message" => "Hiba a hozzáadaás során!", $validator->errors()->toArray()], 400);
        }

        $NewRecord = new Animal();
        $NewRecord->SpeciesName = $request->SpeciesName;
        $NewRecord->Quantity = $request->Quantity;
        $NewRecord->ForSaleQuantity = $request->ForSaleQuantity;
        $NewRecord->Description = $request->Description;
        $NewRecord->More = $request->More;
        $NewRecord->SpeciesID = $request->SpeciesID;

        $NewRecord->save();

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();

            // Mentés
            $file->storeAs('uploads', $fileName, 'public');

            // Kép rekord létrehozása
            Image::create([
                'ImageData' => $fileName,
                'AnimalID'  => $NewRecord->ID // Fontos: nagybetűs ID
            ]);
        }

        return response()->json(["success" => true, "data" => $NewRecord], 201);
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

        // 1. Validáció (a kép most opcionális: 'nullable')
        $validator = Validator::make($request->all(), [
            'SpeciesName'     => 'required|string',
            'Quantity'        => 'required|numeric',
            'ForSaleQuantity' => 'required|numeric|min:0',
            'Description'     => 'required|string',
            'More'            => 'required|string',
            'SpeciesID'       => 'required|numeric',
            'image'           => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ], [
            // ... a korábbi magyar hibaüzeneteid ...
            'image.image' => 'A fájl csak kép lehet!',
            'image.max'   => 'A kép mérete nem lehet több 2MB-nál!'
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

        // 3. Képkezelés (Csak ha küldtek új képet)
        if ($request->hasFile('image')) {
            $imageRecord = Image::where('AnimalID', $id)->first();

            // Régi kép törlése a mappából, ha létezik
            if ($imageRecord && Storage::disk('public')->exists('uploads/' . $imageRecord->ImageData)) {
                Storage::disk('public')->delete('uploads/' . $imageRecord->ImageData);
            }

            // Új kép mentése
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('uploads', $fileName, 'public');

            // Adatbázis rekord frissítése vagy létrehozása
            Image::updateOrCreate(
                ['AnimalID' => $id],
                ['ImageData' => $fileName]
            );
        }

        return response()->json(["success" => true, "message" => "Minden sikeresen frissítve!"], 200);
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
