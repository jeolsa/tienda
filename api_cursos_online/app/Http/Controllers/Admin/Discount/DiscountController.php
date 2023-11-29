<?php

namespace App\Http\Controllers\Admin\Discount;

use App\Http\Controllers\Controller;
use App\Http\Resources\Discount\DiscountCollection;
use App\Http\Resources\Discount\DiscountResource;
use App\Models\Discount\Discount;
use App\Models\Discount\DiscountCategorie;
use App\Models\Discount\DiscountCourse;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $tipo = $request->tipo;
        $clase = $request->clase;
        $campaing = $request->campaing;
        $state = $request->state;

        //filterAdvance($search,$state)
        $discounts = Discount::filterDiscountAdvance($tipo,$clase,$campaing,$state)->orderBy("id","desc")->get();

        return response()->json(["msj" => 200, "discounts" => DiscountCollection::make($discounts)]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->clase_discount == 1){//courses
            foreach($request->course_selected as $key => $course){
                $is_discount_start_date = Discount::where("type_campaing", $request->type_campaing)->where("clase_discount", $request->clase_discount)->whereHas("courses", function($q) use($course) {
                    return $q->where("course_id", $course["id"]);
                })->whereBetween("start_date",[$request->start_date, $request->end_date])->first();

                $is_discount_end_date = Discount::where("type_campaing", $request->type_campaing)->where("clase_discount", $request->clase_discount)->whereHas("courses", function($q) use($course) {
                    return $q->where("course_id", $course["id"]);
                })->whereBetween("end_date",[$request->start_date, $request->end_date])->first();

                if($is_discount_start_date || $is_discount_end_date){
                    return response()->json(["codigo" => 403, "msj" => "El curso".$course["title"].", ya se encuentra en una campaña de descuento - ".($is_discount_start_date ? $is_discount_start_date : '-').($is_discount_end_date ? $is_discount_end_date : '')]);
                }
            }

        }

        if($request->clase_discount == 2){//categories
            foreach($request->categorie_selected as $key => $categorie){
                $is_discount_start_date = Discount::where("type_campaing", $request->type_campaing)->where("clase_discount", $request->clase_discount)->whereHas("categories", function($q) use($categorie) {
                    return $q->where("categorie_id", $categorie["id"]);
                })->whereBetween("start_date",[$request->start_date, $request->end_date])->first();

                $is_discount_end_date = Discount::where("type_campaing", $request->type_campaing)->where("clase_discount", $request->clase_discount)->whereHas("categories", function($q) use($categorie) {
                    return $q->where("categorie_id", $categorie["id"]);
                })->whereBetween("end_date",[$request->start_date, $request->end_date])->first();

                if($is_discount_start_date || $is_discount_end_date){
                    return response()->json(["codigo" => 403, "msj" => "La categoria ".$categorie["name"].", ya se encuentra en una campaña de descuento - ".($is_discount_start_date ? $is_discount_start_date : '-').($is_discount_end_date ? $is_discount_end_date : '')]);
                }
            }
        }


        $request->request->add(["code" => uniqid()]);
        $discount = Discount::create($request->all());

        if($discount){
            if($request->clase_discount == 1){
                //es course
                foreach($request->course_selected as $key => $course){
                    DiscountCourse::create([
                        "discount_id" => $discount->id,
                        "course_id" => $course["id"],
                    ]);
                }
            }

            if($request->clase_discount == 2){
                //es categorie
                foreach($request->categorie_selected as $key => $categorie){
                    DiscountCategorie::create([
                        "discount_id" => $discount->id,
                        "categorie_id" => $categorie["id"],
                    ]);
                }
            }

            return response()->json([
                "codigo" => 200,
                "msj" => "Se agregó campaña de descuento con exito",
            ]);
        }
        else{
            return response()->json([
                "codigo" => 403,
                "msj" => "No se pudo agregar la campaña de descuento",
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $discount = Discount::findOrFail($id);

        return response()->json(["discount" => DiscountResource::make($discount)]);
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
        if($request->clase_discount == 1){//courses
            foreach($request->course_selected as $key => $course){
                $is_discount_start_date = Discount::where("id","<>",$id)->where("type_campaing", $request->type_campaing)->where("clase_discount", $request->clase_discount)->whereHas("courses", function($q) use($course) {
                    return $q->where("course_id", $course["id"]);
                })->whereBetween("start_date",[$request->start_date, $request->end_date])->first();

                $is_discount_end_date = Discount::where("id","<>",$id)->where("type_campaing", $request->type_campaing)->where("clase_discount", $request->clase_discount)->whereHas("courses", function($q) use($course) {
                    return $q->where("course_id", $course["id"]);
                })->whereBetween("end_date",[$request->start_date, $request->end_date])->first();

                if($is_discount_start_date || $is_discount_end_date){
                    return response()->json(["codigo" => 403, "msj" => "El curso".$course["title"].", ya se encuentra en una campaña de descuento - ".($is_discount_start_date ? $is_discount_start_date : '-').($is_discount_end_date ? $is_discount_end_date : '')]);
                }
            }

        }

        if($request->clase_discount == 2){//categories
            foreach($request->categorie_selected as $key => $categorie){
                $is_discount_start_date = Discount::where("id","<>",$id)->where("type_campaing", $request->type_campaing)->where("clase_discount", $request->clase_discount)->whereHas("categories", function($q) use($categorie) {
                    return $q->where("categorie_id", $categorie["id"]);
                })->whereBetween("start_date",[$request->start_date, $request->end_date])->first();

                $is_discount_end_date = Discount::where("id","<>",$id)->where("type_campaing", $request->type_campaing)->where("clase_discount", $request->clase_discount)->whereHas("categories", function($q) use($categorie) {
                    return $q->where("categorie_id", $categorie["id"]);
                })->whereBetween("end_date",[$request->start_date, $request->end_date])->first();

                if($is_discount_start_date || $is_discount_end_date){
                    return response()->json(["codigo" => 403, "msj" => "La categoria ".$categorie["name"].", ya se encuentra en una campaña de descuento - ".($is_discount_start_date ? $is_discount_start_date : '-').($is_discount_end_date ? $is_discount_end_date : '')]);
                }
            }
        }


        //$request->request->add(["code" => uniqid()]);
        $discount = Discount::findOrFail($id);

        if($discount->update($request->all())){

            foreach($discount->courses as $key => $courseD){
                $courseD->delete();
            }

            foreach($discount->categories as $key => $categorieD){
                $categorieD->delete();
            }

            if($request->clase_discount == 1){
                //es course
                foreach($request->course_selected as $key => $course){
                    DiscountCourse::create([
                        "discount_id" => $discount->id,
                        "course_id" => $course["id"],
                    ]);
                }
            }

            if($request->clase_discount == 2){
                //es categorie
                foreach($request->categorie_selected as $key => $categorie){
                    DiscountCategorie::create([
                        "discount_id" => $discount->id,
                        "categorie_id" => $categorie["id"],
                    ]);
                }
            }

            return response()->json([
                "codigo" => 200,
                "msj" => "Se actualizó campaña de descuento con exito",
            ]);
        }
        else{
            return response()->json([
                "codigo" => 403,
                "msj" => "No se pudo actualizar la campaña de descuento",
            ]);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $discount = Discount::findOrFail($id);

        if($discount->delete()){
            return response()->json([
                "codigo" => 200,
                "msj" => "Se eliminó el descuento con exito",
                "discount" => $discount,
            ]);
        }
        else {
            return response()->json([
                "codigo" => 403,
                "msj" => "No se pudo eliminar el descuento",
            ]);
        }
    }
}
