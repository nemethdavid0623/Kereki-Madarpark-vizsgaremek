<?php

use App\Http\Controllers\AnimalController;
use App\Http\Controllers\ImageController;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OpeningController;


Route::post('/login', [UserController::class, 'login'])->name('login');
Route::get('/AllData', [AnimalController::class, "index"]);
Route::get('/ForSale', [AnimalController::class, "forSale"]);
Route::get('/openings', [OpeningController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::match(['post', 'put'], '/UpdateAnimal/{id}', [AnimalController::class, 'update']);
    Route::post('/NewAnimal', [AnimalController::class, "store"]);
    Route::delete('/DeleteAnimal/{id}', [AnimalController::class, "destroy"]);
    Route::delete('/DeleteImage/{id}', [ImageController::class, 'destroy']);
    Route::put('/openings/{id}', [OpeningController::class, 'update']);
});
