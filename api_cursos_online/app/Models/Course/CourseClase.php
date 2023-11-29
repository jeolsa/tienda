<?php

namespace App\Models\Course;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class CourseClase extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "course_section_id",
        "name",
        "description",
        "state",
        "vimeo_id",
        "time",
    ];

    public function setCreatedAtAttribute($value){
        date_default_timezone_set("America/Bogota");
        $this->attributes["created_at"] = Carbon::now();
    }

    public function setUpdatedAtAttribute($value){
        date_default_timezone_set("America/Bogota");
        $this->attributes["updated_at"] = Carbon::now();
    }

    public function course_section(){
        return $this->belongsTo(CourseSection::class);
    }

    public function files(){
        return $this->hasMany(CourseClaseFile::class,"course_clase_id");
    }

}
