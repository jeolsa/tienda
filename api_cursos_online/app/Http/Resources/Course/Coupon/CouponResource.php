<?php

namespace App\Http\Resources\Course\Coupon;

use Illuminate\Http\Resources\Json\JsonResource;

class CouponResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->resource->id,
            "code" => $this->resource->code,
            "type_discount" => $this->resource->type_discount,
            "discount" => $this->resource->discount,
            "type_count" => $this->resource->type_count,
            "num_use" => $this->resource->num_use,
            "type_coupon" => $this->resource->type_coupon,
            "state" => $this->resource->state ?? 1,
            "courses" => $this->resource->courses->map(function($course_aux) {
                return [
                    "id" => $course_aux->course->id,
                    "title" => $course_aux->course->title,
                    "imagen" => env("APP_URL")."storage/".$course_aux->course->imagen,
                    "aux_id" => $course_aux->id,
                ];
            }),
            "categories" => $this->resource->categories->map(function($categorie_aux) {
                return [
                    "id" => $categorie_aux->categorie->id,
                    "name" => $categorie_aux->categorie->name,
                    "imagen" => env("APP_URL")."storage/".$categorie_aux->categorie->imagen,
                    "aux_id" => $categorie_aux->id,
                ];
            }),
        ];
    }
}
