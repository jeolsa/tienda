<?php

namespace App\Http\Resources\Course;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseGResource extends JsonResource
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
            "title" => $this->resource->title,
            "slug" => $this->resource->slug,
            "subtitle" => $this->resource->subtitle,
            "imagen" => env("APP_URL")."storage/".$this->resource->imagen,
            "precio_usd" => $this->resource->precio_usd,
            "precio_co" => $this->resource->precio_co,
            "user_id" => $this->resource->user_id,
            "user" => [
                "id" => $this->resource->user->id,
                "full_name" => $this->resource->user->name.' '.$this->resource->user->surname,
                "email" => $this->resource->user->email,
            ],
            "categorie_id" => $this->resource->categorie_id,
            "categorie" =>  [
                "id" => $this->resource->categorie->id,
                "full_name" => $this->resource->categorie->name,
            ],
            "sub_categorie_id" => $this->resource->sub_categorie_id,
            "subcategorie" =>  [
                "id" => $this->resource->subcategorie->id,
                "full_name" => $this->resource->subcategorie->name,
            ],
            "level" => $this->resource->level,
            "idioma" => $this->resource->idioma,
            "vimeo_id" => $this->resource->vimeo_id,
            "time" => $this->resource->time,
            "description" => $this->resource->description,
            "requirements" => json_decode($this->resource->requirements),
            "who_is_it_for" => json_decode($this->resource->who_is_it_for),
            "state" => $this->resource->state,
        ];
    }
}
