<?php

namespace App\Http\Controllers\Admin\Course;

use App\Http\Controllers\Controller;
use App\Models\Course\Categorie;
use App\Http\Resources\Course\Categorie\CategorieCollection;
use App\Http\Resources\Course\Categorie\CategorieResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $state = $request->state;

        $categories = Categorie::filterCatAdvance($search, $state)->orderby("id","desc")->get();

        return response()->json([
            "categories" => CategorieCollection::make($categories),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->hasFile("image")){
            $path = Storage::putFile("categories",$request->file("image"));
            $request->request->add(["imagen" => $path]);
        }

        $categorie = Categorie::create($request->all());

        return response()->json(["categorie" => CategorieResource::make($categorie)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $categorie = Categorie::findOrFail($id);
        if($request->hasFile("image")){
            if($categorie->imagen){
                Storage::delete($categorie->imagen);
            }
            $path = Storage::putFile("categories",$request->file("image"));
            $request->request->add(["imagen" => $path]);
        }

        $categorie->update($request->all());

        return response()->json(["categorie" => CategorieResource::make($categorie)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $categorie = Categorie::findOrFail($id);

        if ($categorie->estado === 2) {
            $categorie->estado = 1;
        }
        else if ($categorie->estado === 1) {
            $categorie->estado = 2;
        }

        $categorie->save();
        return response()->json(["categorie" => CategorieResource::make($categorie)]);
    }
}
