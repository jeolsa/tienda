<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Validator;
use Illuminate\Support\Facades\DB;


class AuthController extends Controller
{
   /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'login_tienda']]);
    }


    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register() {
       /* $validator = Validator::make(request()->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:8',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }*/

        $user = new User;
        $user->name = request()->name;
        $user->surname = request()->surname;
        $user->email = request()->email;
        $user->password = bcrypt(request()->password);

        $userExiste = DB::table('users')->where('email', $user->email)->first();

        if(empty($userExiste)){
            $user->save();
            return response()->json(['msg' => 'Usuario registrado correctamente', 'status' => '200'], 200);
        }
        else{
            return response()->json(['msg' => 'No se pudo registrar el usuario, email ya existe', 'status' => '401'], 200);
        }

    }


    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth('api')->attempt(["email" => $request->email, "password" => $request->password, "tipo" => 2, "estado" => 1])) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function login_tienda(Request $request)
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth('api')->attempt(["email" => $request->email, "password" => $request->password, "estado" => 1])) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60000,
            "user" => [
                "name" => auth('api')->user()->name,
                "email" => auth('api')->user()->email,
                "id" => auth('api')->user()->id,
                "avatar" => auth('api')->user()->avatar,
            ]
        ]);
    }
}
