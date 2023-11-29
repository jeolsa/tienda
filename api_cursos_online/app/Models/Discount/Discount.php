<?php

namespace App\Models\Discount;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Discount extends Model
{
    use HasFactory;
    use SoftDeletes;

    //protected $table = "discounts";
    protected $fillable = [
        "code",
        "type_discount",
        "discount",
        "start_date",
        "end_date",
        "clase_discount",
        "type_campaing",
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

    public function courses(){
        return $this->hasMany(DiscountCourse::class);
    }

    public function categories(){
        return $this->hasMany(DiscountCategorie::class);
    }

    public function scopeFilterDiscountAdvance($query, $tipo, $clase, $campaing, $state){
        /*if($search){
            $query->where("code","like","%".$search."%");
        }*/
        if($tipo){
            $query->where("type_discount",$tipo);
        }

        if($clase){
            $query->where("clase_discount",$clase);
        }

        if($campaing){
            $query->where("type_campaing",$campaing);
        }

        if($state){
            $query->where("state",$state);
        }
    }
}
