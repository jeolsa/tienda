<?php

use App\Http\Controllers\Admin\Course\CategorieController;
use App\Http\Controllers\Admin\Course\CourseGController;
use App\Http\Controllers\Admin\Course\SeccionGController;
use App\Http\Controllers\Admin\Course\ClaseGCntroller;
use App\Http\Controllers\Admin\Coupon\CouponController;
use App\Http\Controllers\Admin\Discount\DiscountController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Tienda\HomeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login_tienda', [AuthController::class, 'login_tienda']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('/me', [AuthController::class, 'me'])->name('me');
});

Route::group([

    'middleware' => 'api',
], function ($router) {
    Route::resource('/users', UserController::class);
    Route::post('/users/{id}', [UserController::class, "update"]);
    Route::post('/users/inactivar/{id}', [UserController::class, "destroy"]);
    //
    Route::resource('/categorie', CategorieController::class);
    Route::post('/categorie/{id}', [CategorieController::class, "update"]);
    Route::post('/categorie/inactivar/{id}', [CategorieController::class, "destroy"]);

    //Route::resource('/categorie', CategorieController::class);
    Route::get('/course/config', [CourseGController::class, "config"]);
    Route::resource('/course', CourseGController::class);
    Route::post('/course/upload_video/{id}', [CourseGController::class, "upload_video"]);
    Route::post('/course/{id}', [CourseGController::class, "update"]);
    Route::post('/course/inactivar/{id}', [CourseGController::class, "destroy"]);

    Route::resource('/course-section', SeccionGController::class);
    Route::post('/course-section/inactivar/{id}', [SeccionGController::class, "destroy"]);

    Route::resource('/course-clases', ClaseGCntroller::class);
    Route::post('/course-clases-file',[ClaseGCntroller::class, "addFiles"]);
    Route::delete('/course-clases-file/{id}',[ClaseGCntroller::class, "removeFiles"]);
    Route::post('/course-clases/upload_video/{id}', [ClaseGCntroller::class, "upload_video"]);

    Route::get('/coupon/config', [CouponController::class, "config"]);
    Route::resource('/coupon', CouponController::class);

    Route::resource('/discount', DiscountController::class);

});

Route::group(["prefix" => "ecomerce"],function($router){
    Route::get("home",[HomeController::class,"home"]);
});
