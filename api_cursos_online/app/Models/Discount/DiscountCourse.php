<?php

namespace App\Models\Discount;

use App\Models\Course\Course;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;


class DiscountCourse extends Model
{
    use HasFactory;

    //protected $table = "discount_courses";

    protected $fillable = [
        "discount_id",
        "course_id",
    ];

    public function setCreatedAtAttribute($value){
        date_default_timezone_set("America/Bogota");
        $this->attributes["created_at"] = Carbon::now();
    }

    public function setUpdatedAtAttribute($value){
        date_default_timezone_set("America/Bogota");
        $this->attributes["updated_at"] = Carbon::now();
    }

    public function course(){
        return $this->belongsTo(Course::class);
    }

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }
}
