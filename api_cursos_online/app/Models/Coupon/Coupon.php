<?php

namespace App\Models\Coupon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Coupon extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "cupons";
    protected $fillable = [
        "code",
        "type_discount",
        "discount",
        "type_count",
        "num_use",
        "type_coupon",
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
        return $this->hasMany(CouponCourse::class);
    }

    public function categories(){
        return $this->hasMany(CouponCategorie::class);
    }

    public function scopeFilterCoupAdvance($query, $search, $state){
        if($search){
            $query->where("code","like","%".$search."%");
        }

        if($state){
            $query->where("estado",$state);
        }
    }
}
