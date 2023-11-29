<?php

namespace App\Http\Resources\Ecomerce\Course;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseHomeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $discount_g = null;//campaña de descuento relacionada

        //si tiene una campaña de descuento a nivel curso y categoria

        if ($this->resource->discount_c && $this->resourse->discount_c_t) {
            //se prioriza campaña por categoria
            $discount_g = $this->resourse->discount_c_t;
        } else {
            //si tiene campaña por curso pero no por categoria
           if ($this->resource->discount_c && !$this->resourse->discount_c_t) {
                $discount_g = $this->resourse->discount_c;
           } else {
                //si tiene campaña por campaña pero no por curso
                if (!$this->resource->discount_c && $this->resourse->discount_c_t) {
                    $discount_g = $this->resourse->discount_c_t;
                }
           }

        }


        return [
            "id" => $this->resource->id,
            "title" => $this->resource->title,
            "subtitle" => $this->resource->subtitle,
            "imagen" => env("APP_URL")."storage/".$this->resource->imagen,
            "precio_usd" => $this->resource->precio_usd,
            "precio_co" => $this->resource->precio_co,
            "count_class" => $this->resource->count_class, //? $this->resource->count_class : 0
            "time_course" => $this->resource->time_course,
            "idioma" => $this->resource->idioma,
            "discount_g" => $discount_g,
            "instructor" => $this->resource->instructor ? [
                    "id" => $this->resource->instructor->id,
                    "full_name" => $this->resource->instructor->name. ' ' .$this->resource->instructor->surname,
                    "avatar" => env("APP_URL")."storage/".$this->resource->instructor->avatar,
                ] : NULL
        ];
    }
}
