<?php

namespace App\Http\Resources\Discount;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class DiscountResource extends JsonResource
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
            "start_date" => Carbon::parse($this->resource->start_date)->format("Y-m-d"),
            "end_date" => Carbon::parse($this->resource->end_date)->format("Y-m-d"),
            "clase_discount" => $this->resource->clase_discount,
            "type_campaing" => $this->resource->type_campaing,
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
