<?php

namespace App\Models\Coupon;

use App\Models\Course\Categorie;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class CouponCategorie extends Model
{
    use HasFactory;

    protected $fillable = [
        "coupon_id",
        "categorie_id",
    ];

    public function setCreatedAtAttribute($value){
        date_default_timezone_set("America/Bogota");
        $this->attributes["created_at"] = Carbon::now();
    }

    public function setUpdatedAtAttribute($value){
        date_default_timezone_set("America/Bogota");
        $this->attributes["updated_at"] = Carbon::now();
    }

    public function categorie(){
        return $this->belongsTo(Categorie::class);
    }
}
