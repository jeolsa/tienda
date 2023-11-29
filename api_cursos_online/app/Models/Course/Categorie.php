<?php

namespace App\Models\Course;

use App\Models\Discount\DiscountCategorie;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categorie extends Model
{
    use HasFactory;
    //use SoftDeletes;

    protected $fillable = [
        "name",
        "imagen",
        "categorie_id",
        "estado",
    ];

    public function setCreatedAtAttribute($value){
        date_default_timezone_set("America/Bogota");
        $this->attributes["created_at"] = Carbon::now();
    }

    public function setUpdatedAtAttribute($value){
        date_default_timezone_set("America/Bogota");
        $this->attributes["updated_at"] = Carbon::now();
    }

    public function children(){
        return $this->hasMany(Categorie::class,"categorie_id");
    }

    public function father(){
        return $this->belongsTo(Categorie::class,"categorie_id");
    }

    public function courses(){
        return $this->hasMany(Course::class);
    }

    public function discount_categories()
    {
        return $this->hasMany(DiscountCategorie::class);
    }

    public function scopeFilterCatAdvance($query, $search, $state){
        if($search){
            $query->where("name","like","%".$search."%");
        }

        if($state){
            $query->where("estado",$state);
        }
    }
}
