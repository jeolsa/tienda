<?php

namespace App\Http\Controllers\Admin\Coupon;

use App\Http\Controllers\Controller;
use App\Models\Coupon\Coupon;
use App\Http\Resources\Course\Coupon\CouponCollection;
use App\Http\Resources\Course\Coupon\CouponResource;
use App\Models\Coupon\CouponCategorie;
use App\Models\Coupon\CouponCourse;
use App\Models\Course\Categorie;
use App\Models\Course\Course;
use Illuminate\Http\Request;

class CouponController extends Controller
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

        $coupons = Coupon::filterCoupAdvance($search,$state)->orderBy("id","desc")->get();

        return response()->json(["msj" => 200, "coupons" => CouponCollection::make($coupons)]);
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

    public function config(){
        $categories = Categorie::where("categorie_id",NULL)->orderBy("id","desc")->get();

        $courses = Course::where("state",2)->orderBy("id","desc")->get();

        return response()->json([
            "categories" => $categories->map(function($categorie){
                return [
                    "id" => $categorie->id,
                    "name" => $categorie->name,
                    "imagen" => env("APP_URL")."storage/".$categorie->imagen
                ];
            }),
            "courses" => $courses->map(function($course){
                return [
                    "id" => $course->id,
                    "title" => $course->title,
                    "imagen" => env("APP_URL")."storage/".$course->imagen
                ];
            }),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $is_exist = Coupon::where("code", $request->code)->first();

        if ($is_exist) {
            return response()->json(["codigo" => 403, "msj" => "Este código de cupón ya existe"]);
        }

        $coupon = Coupon::create($request->all());

        if($coupon){
            if($request->type_coupon == 1){
                //es course
                foreach($request->course_selected as $key => $course){
                    CouponCourse::create([
                        "coupon_id" => $coupon->id,
                        "course_id" => $course["id"],
                    ]);
                }
            }

            if($request->type_coupon == 2){
                //es categorie
                foreach($request->categorie_selected as $key => $categorie){
                    CouponCategorie::create([
                        "coupon_id" => $coupon->id,
                        "categorie_id" => $categorie["id"],
                    ]);
                }
            }

            return response()->json([
                "codigo" => 200,
                "msj" => "Se agregó cupón con exito",
            ]);
        }
        else{
            return response()->json([
                "codigo" => 403,
                "msj" => "No se pudo agregar el cupón",
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
        $coupon = Coupon::findOrFail($id);

        return response()->json([
            "coupon" => CouponResource::make($coupon),
        ]);
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
        $is_exist = Coupon::where("id","<>",$id)->where("code", $request->code)->first();

        if ($is_exist) {
            return response()->json(["codigo" => 403, "msj" => "Este código de cupón ya existe"]);
        }

        $coupon = Coupon::findOrFail($id);

        if($coupon->update($request->all())){

            foreach($coupon->courses as $key => $courseD){
                $courseD->delete();
            }

            foreach($coupon->categories as $key => $categorieD){
                $categorieD->delete();
            }

            if($request->type_coupon == 1){
                //es course
                foreach($request->course_selected as $key => $course){
                    CouponCourse::create([
                        "coupon_id" => $coupon->id,
                        "course_id" => $course["id"],
                    ]);
                }
            }

            if($request->type_coupon == 2){
                //es categorie
                foreach($request->categorie_selected as $key => $categorie){
                    CouponCategorie::create([
                        "coupon_id" => $coupon->id,
                        "categorie_id" => $categorie["id"],
                    ]);
                }
            }

            return response()->json([
                "codigo" => 200,
                "msj" => "Se actualizó el cupón con exito",
            ]);
        }
        else{
            return response()->json([
                "codigo" => 403,
                "msj" => "No se pudo actualizar el cupón",
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
        $coupon = Coupon::findOrFail($id);

        if($coupon->delete()){
            return response()->json([
                "codigo" => 200,
                "msj" => "Se eliminó el cupón con exito",
                "coupon" => $coupon,
            ]);
        }
        else {
            return response()->json([
                "codigo" => 403,
                "msj" => "No se pudo eliminar el cupón",
            ]);
        }

    }
}
