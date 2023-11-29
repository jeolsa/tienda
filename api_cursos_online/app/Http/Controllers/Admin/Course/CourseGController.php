<?php

namespace App\Http\Controllers\Admin\Course;

use App\Http\Controllers\Controller;
use App\Http\Resources\Course\CourseGCollection;
use App\Http\Resources\Course\CourseGResource;
use App\Models\Course\Categorie;
use App\Models\Course\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Owenoj\LaravelGetId3\GetId3;
use Vimeo\Laravel\Facades\Vimeo;

class CourseGController extends Controller
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

        $courses = Course::filterCourseAdvance($search, $state)->orderby("id","desc")->get();

        return response()->json([
            "courses" => CourseGCollection::make($courses),

        ]);
    }

    public function config(){
        $categories = Categorie::where("categorie_id",NULL)->orderBy("id","desc")->get();
        $subcategories = Categorie::where("categorie_id","<>",NULL)->orderBy("id","desc")->get();
        $instructores = User::where("role_id",3)->orderBy("id","desc")->get();

        return response()->json([
            "categories" => $categories,
            "subcategories" => $subcategories,
            "instructores" => $instructores->map(function($user){
                return [
                    "id" => $user->id,
                    "full_name" => $user->name.' '. $user->surname,
                ];
            }),
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
        $is_exists = Course::where("title", $request->title)->first();

        if($is_exists){
            return response()->json(["message" => 403, "message_text" => "Ya existe un curso con este titulo"]);
        }

        if($request->hasFile("portada")){
            $path = Storage::putFile("courses",$request->file("portada"));
            $request->request->add(["imagen" => $path]);//echo $path;
        }


        $request->request->add(["slug" => Str::slug($request->title)]);
        $request->request->add(["requirements" => json_encode( explode( ",", $request->requirements))]);
        $request->request->add(["who_is_it_for" => json_encode( explode( ",", $request->who_is_it_for))]);
       // echo $request->imagen;
        $course = Course::create($request->all());
        return response()->json(["message" => 200, "message_text" => "Se agregó curso exitosamente"]);
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
        $course = Course::findOrFail($id);
        return response()->json([
            "course" => CourseGResource::make($course)
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
        $is_exists = Course::where("id","<>",$id)->where("title", $request->title)->first();

        if($is_exists){
            return response()->json(["message" => 403, "message_text" => "Ya existe un curso con este titulo"]);
        }

        $course = Course::findOrFail($id);
        if($request->hasFile("image")){
            if($course->imagen){
                Storage::delete($course->imagen);
            }
            $path = Storage::putFile("courses",$request->file("image"));
            $request->request->add(["imagen" => $path]);
        }

        $request->request->add(["slug" => Str::slug($request->title)]);
        $request->request->add(["requirements" => json_encode(explode( ",",$request->requirements))]);
        $request->request->add(["who_is_it_for" => json_encode(explode( ",",$request->who_is_it_for))]);
        $course->update($request->all());

        return response()->json(["message" => 200, "message_text" => "Se actualizó curso exitosamente"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);

        if ($course->state === 2) {
            $course->state = 1;
        }
        else if ($course->state === 1) {
            $course->state = 2;
        }

        $course->save();
        return response()->json(["course" => CourseGResource::make($course)]);
    }

    public function upload_video(Request $request, $id){
        $time = 0;
        //instantiate class with file
        $track = new GetId3($request->file('video'));

        //get playtime
        $time = $track->getPlaytimeSeconds();

        //guarda el video en vimeo
        $response = Vimeo::upload($request->file('video'));

        $course = Course::findOrFail($id);

        $vimeo_id = explode("/",$response)[2];

        $course->update(["vimeo_id" => $vimeo_id, "time" => date("H:i:s",$time)]);

        return response()->json([
            //"time" => date("H:i:s",$time),
            "message_text" => 'Se guardó video correctamente',
            "tipo" => "success",
            "link_video" => "https://player.vimeo.com/video/".$vimeo_id,
        ]);
    }
}
