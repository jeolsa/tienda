<?php

namespace App\Models\Course;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseClaseFile extends Model
{
    use HasFactory;
    use SoftDeletes;

     protected $fillable = [
        "course_clase_id",
        "name_file",
        "size",
        "time",
        "resolution",
        "file",
        "type",
    ];

    public function setCreatedAtAttribute($value){
        date_default_timezone_set("America/Bogota");
        $this->attributes["created_at"] = Carbon::now();
    }

    public function setUpdatedAtAttribute($value){
        date_default_timezone_set("America/Bogota");
        $this->attributes["updated_at"] = Carbon::now();
    }

   /* public function setDeletedAtAttribute($value){
        date_default_timezone_set("America/Bogota");
        $this->attributes["deleted_at"] = Carbon::now();
    }*/

    public function getSizeAttribute($size)
    {
        $size = (int) $size;
        $base = log($size) / log(1024);
        $suffixes = array(' bytes',' KB', ' MB', ' GB', ' TB');
        return round(pow(1024, $base - floor($base)), 2) . $suffixes[floor($base)];
    }
}
