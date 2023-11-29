<?php

namespace App\Http\Controllers\Admin\Course;

use App\Http\Controllers\Controller;
use App\Http\Resources\Course\Clases\CourseClaseCollection;
use App\Models\Course\CourseClase;
use Illuminate\Http\Request;
use App\Http\Resources\Course\Clases\CourseClaseResource;
use App\Models\Course\CourseClaseFile;
use Illuminate\Support\Facades\Storage;
use Owenoj\LaravelGetId3\GetId3;
use Vimeo\Laravel\Facades\Vimeo;

class ClaseGCntroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $clases = CourseClase::where("course_section_id", $request->course_section_id)->orderBy("id", "asc")->get();

        return response()->json([
            "clases" => CourseClaseCollection::make($clases),
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
        if($clase = CourseClase::create($request->all())){

            foreach ($request->file("files") as $key => $file){
                $extension = $file->getClientOriginalExtension();
                $size = $file->getSize();
                $name_file = $file->getClientOriginalName();
                $data = null;
                if(in_array(strtolower($extension),["jpeg","bmp","jpg","png"])){
                    $data = getimagesize($file);
                }
                $path = Storage::putFile("clases_files", $file);

                $clase_file = CourseClaseFile::create([
                    "course_clase_id" => $clase->id,
                    "name_file" => $name_file,
                    "size" => $size,
                    "resolution" => $data ? $data[0]. " X " .$data[1] : NULL,
                    "file" => $path,
                    "type" => $extension,
                ]);
            }

            return response()->json([
                "clase" => CourseClaseResource::make($clase),
                "codigo" => 200,
                "msg" => "Se guardó la clase exitosamente"
            ]);

        }
        else {
            return response()->json([
                "codigo" => 400,
                "msg" => "No se pudo guardar la clase"
            ]);
        }


    }

    public function upload_video(Request $request, $id){
        $time = 0;
        //instantiate class with file
        $track = new GetId3($request->file('video'));

        //get playtime
        $time = $track->getPlaytimeSeconds();

        //guarda el video en vimeo
        $response = Vimeo::upload($request->file('video'));

        $course_clase = CourseClase::findOrFail($id);

        $vimeo_id = explode("/",$response)[2];

        $course_clase->update(["vimeo_id" => $vimeo_id, "time" => date("H:i:s",$time)]);

        return response()->json([
            //"time" => date("H:i:s",$time),
            "message_text" => 'Se guardó video correctamente',
            "tipo" => "success",
            "link_video" => "https://player.vimeo.com/video/".$vimeo_id,
        ]);
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
        $clase = CourseClase::findOrFail($id);
        if($clase->update($request->all())){
            return response()->json([
                "clase" => CourseClaseResource::make($clase),
                "codigo" => 200,
                "msg" => "Se actualizó la clase con exito"
            ]);
        }
        else {
            return response()->json([
                "clase" => CourseClaseResource::make($clase),
                "codigo" => 400,
                "msg" => "No se pudo actializar la clase"
            ]);
        }
    }

    public function addFiles(Request $request)
    {
        $clase = CourseClase::findOrFail($request->course_clase_id);
        foreach ($request->file("files") as $key => $file){
            $extension = $file->getClientOriginalExtension();
            $size = $file->getSize();
            $name_file = $file->getClientOriginalName();
            $data = null;
            if(in_array(strtolower($extension),["jpeg","bmp","jpg","png"])){
                $data = getimagesize($file);
            }
            $path = Storage::putFile("clases_files", $file);

            $clase_file = CourseClaseFile::create([
                "course_clase_id" => $clase->id,
                "name_file" => $name_file,
                "size" => $size,
                "resolution" => $data ? $data[0]. " X " .$data[1] : NULL,
                "file" => $path,
                "type" => $extension,
            ]);
        }

        return response()->json([
            "clase" => CourseClaseResource::make($clase),
            "codigo" => 200,
            "msg" => "Se guardó la clase exitosamente"
        ]);

    }

    public function removeFiles($id){
        $course_clase_file = CourseClaseFile::findOrFail($id);

        if($course_clase_file->delete()){
            return response()->json([
                "codigo" => 200,
                "msg" => "Se eliminó el archivo exitosamente"
            ]);
        }
        else {
            return response()->json([
                "codigo" => 400,
                "msg" => "No se pudo eliminar el archivo"
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
        $clase = CourseClase::findOrFail($id);
        if ($clase->delete()) {
            return response([
                "codigo" => 200,
                "msg" => "Se eliminó clase con exito"
            ]);
        }
        else {
            return response([
                "codigo" => 400,
                "msg" => "No pudo eliminarse la clase"
            ]);
        }
    }
}
