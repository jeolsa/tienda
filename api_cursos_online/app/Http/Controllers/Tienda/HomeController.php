<?php
namespace App\Http\Controllers\Tienda;

use App\Http\Controllers\Controller;
use App\Http\Resources\Ecomerce\Course\CourseHomeCollection;
use App\Http\Resources\Ecomerce\Course\CourseHomeResource;
use App\Models\Course\Categorie;
use App\Models\Course\Course;
use App\Models\Discount\Discount;
use Illuminate\Http\Request;
use Carbon\Carbon;

class HomeController extends Controller
{
    public function home(Request $request)
    {


        $categories = Categorie::where("categorie_id",NULL)->withCount("courses")->orderBy("id","desc")->get();
        $courses = Course::where("state",2)->inRandomOrder()->limit(3)->get();
        $categories_courses = Categorie::where("categorie_id",NULL)->withCount("courses")
                              ->having("courses_count",">",0)
                              ->orderBy("id","Desc")->take(5)->get();
        $group_courses_categories = collect([]);

        foreach ($categories_courses as $key => $categories_course) {
            $group_courses_categories->push([
                "id" => $categories_course->id,
                "name" => $categories_course->name,
                "name_empty" => str_replace(" ","",$categories_course->name),
                "courses_count" => $categories_course->courses_count,
                "courses" => CourseHomeCollection::make($categories_course->courses),
            ]);
        }
        date_default_timezone_set("America/Bogota");
        $discount_banner = Discount::where("type_campaing",3)->where("state",1)
                           ->where("start_date","<=",today())
                           ->where("end_date",">=",today())
                           ->first();

        $discount_banner_courses = collect([]);
        if ($discount_banner) {
            foreach ($discount_banner->courses as $key => $course_discount) {
                $discount_banner_courses->push(CourseHomeResource::make($course_discount->course));
            }
        }

        date_default_timezone_set("America/Bogota");
        $discount_flash = Discount::where("type_campaing",2)->where("state",1)
                           ->where("start_date","<=",today())
                           ->where("end_date",">=",today())
                           ->first();

        $discount_flash_courses = collect([]);
        if ($discount_flash) {
            foreach ($discount_flash->courses as $key => $course_discount) {
                $discount_flash_courses->push(CourseHomeResource::make($course_discount->course));
            }
        }

        return response()->json([
            "categories" => $categories->map(function($categorie){
                return[
                    "id" => $categorie->id,
                    "name" => $categorie->name,
                    "imagen" => env("APP_URL")."storage/".$categorie->imagen,
                    "course_count" => $categorie->courses_count,
                ];
            }),
            "courses_home" => CourseHomeCollection::make($courses),
            "group_courses_categories" => $group_courses_categories,
            "discount_banner" => $discount_banner,
            "discount_banner_courses" => $discount_banner_courses,
            "discount_flash" => $discount_flash ? [
                "id" => $discount_flash->id,
                "discount" => $discount_flash->discount,
                "type_discount" => $discount_flash->type_discount,
                "end_date" => Carbon::parse($discount_flash->end_date)->format("Y-m-d"),
                "start_date_d" => Carbon::parse($discount_flash->start_date)->format("Y/m/d"),
                "end_date_d" => Carbon::parse($discount_flash->end_date)->format("Y/m/d"),
            ] : NULL,
            "discount_flash_courses" => $discount_flash_courses,
        ]);
    }
}
