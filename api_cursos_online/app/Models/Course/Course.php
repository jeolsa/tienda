<?php

namespace App\Models\Course;

use App\Models\User;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Discount\DiscountCourse;

class Course extends Model
{
    use HasFactory;
    //use SoftDeletes;

    protected $fillable = [
        "title",
        "slug",
        "subtitle",
        "imagen",
        "precio_usd",
        "precio_co",
        "user_id",
        "categorie_id",
        "sub_categorie_id",
        "level",
        "idioma",
        "vimeo_id",
        "time",
        "description",
        "requirements",
        "who_is_it_for",
        "state",
    ];

    public function setCreatedAtAttribute($value){
        date_default_timezone_set("America/Bogota");
        $this->attributes["created_at"] = Carbon::now();
    }

    public function setUpdatedAtAttribute($value){
        date_default_timezone_set("America/Bogota");
        $this->attributes["updated_at"] = Carbon::now();
    }

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function categorie(){
        return $this->belongsTo(Categorie::class,'categorie_id');
    }

    public function subcategorie(){
        return $this->belongsTo(Categorie::class,'categorie_id');
    }

    public function instructor(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function sections(){
        return $this->hasMany(CourseSection::class);
    }

    public function discount_courses()
    {
        return $this->hasMany(DiscountCourse::class);
    }

    public function getDiscountCAttribute()
    {
        date_default_timezone_set("America/Bogota");

        $discount = null;

        foreach ($this->discount_courses as $key => $discount_course) {
            if ($discount_course->discount && $discount_course->discount->type_campaing == 1 && $discount_course->discount->state == 1) {
                if (Carbon::now()->between($discount_course->discount->start_date, $discount_course->discount->end_date)) {
                    //existe una campaña de descuento con el curso
                    $discount = $discount_course->discount;
                    break;
                }
            }
        }

        return $discount;
    }

    public function getDiscountCTAttribute()
    {
        date_default_timezone_set("America/Bogota");

        $discount = null;

        foreach ($this->categorie->discount_categories as $key => $discount_categorie) {
            if ($discount_categorie->discount && $discount_categorie->discount->type_campaing == 1 &&  $discount_categorie->discount->state == 1) {
                if (Carbon::now()->between($discount_categorie->discount->start_date, $discount_categorie->discount->end_date)) {
                    //existe una campaña de descuento con el curso
                    $discount = $discount_categorie->discount;
                    break;
                }
            }
        }

        return $discount;
    }

    function AddTimes($horas){
        $total = 0;

        foreach($horas as $h){
            $parts = explode(":", $h);
            $total += $parts[2] + $parts[1]*60 + $parts[0]*3600;
        }

        $hours = floor($total / 3600);
        $minutes = floor(($total / 60 ) % 60);
        $seconds = $total % 60;

        return $hours." hrs ".$minutes." mins";
    }

    public function getCountClassAttribute(){
        $num = 0;

        foreach ($this->sections as $key => $section) {
            $num += $section->clases->count();
        }

        return $num;
    }

    public function getTimeCourseAttribute()
    {
        $times = [];

        foreach ($this->sections as $keyS => $section) {
            foreach ($section->clases as $keyC => $clase) {
                array_push($times, $clase->time);
            }
        }

        return $this->AddTimes($times);
    }

    public function scopeFilterCourseAdvance($query, $search, $state){
        if($search){
            $query->where("title","like","%".$search."%");
        }

        if($state){
            $query->where("state",$state);
        }
    }
}
