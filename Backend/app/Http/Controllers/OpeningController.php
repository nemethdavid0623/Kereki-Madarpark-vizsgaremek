<?php

namespace App\Http\Controllers;

use App\Models\Opening;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OpeningController extends Controller
{

    public function index()
    {
        return response()->json(Opening::all(), 200);
    }

    public function update(Request $request, $id)
    {
        $opening = Opening::find($id);

        if (!$opening) {
            return response()->json(["message" => "Nap nem található"], 404);
        }

        $validator = Validator::make($request->all(), [
            'open_time' => 'nullable',
            'close_time' => 'nullable',
            'is_closed' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $opening->update([
            'open_time' => $request->open_time,
            'close_time' => $request->close_time,
            'is_closed' => $request->is_closed,
        ]);

        return response()->json(["success" => true, "data" => $opening], 200);
    }
}
