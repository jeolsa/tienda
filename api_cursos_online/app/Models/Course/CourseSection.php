<?php

namespace App\Models\Course;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseSection extends Model
{
    use HasFactory;
     //use SoftDeletes;
     //protected $table = 'course_sections';
     protected $fillable = [
        "course_id",
        "name",
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

    public function sections(){
        return $this->belongsTo(CourseSection::class);
    }

    public function clases(){
        return $this->hasMany(CourseClase::class,"course_section_id");
    }
}
