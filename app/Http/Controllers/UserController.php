<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    //

    public function index()
    {
        if (!Auth::user()->is_admin) {
            abort(403);
        }
        $users = User::get();

        return Inertia::render("Admin/Users/index", ['users' => $users]);
    }

    public function create()
    {
        return Inertia::render("Admin/Users/create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!Auth::user()->is_admin) {
            abort(403);
        }

        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|unique:users,email|email|max:255',
            'is_admin' => 'boolean',
            'password' => 'required|confirmed|string|min:8'
        ]);

        DB::beginTransaction();
        try {
            //code...
            $usuario = new User();
            $usuario->name = request()->nombre;
            $usuario->email = request()->email;
            $usuario->password = Hash::make(request()->password);
            $usuario->is_admin = request()->is_admin;
            $usuario->save();

            DB::commit();
            return redirect()->route("users.index")->with('success', 'Usuario creado con éxito.');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return redirect()->back()->with('error', 'Error: ' . $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!Auth::user()->is_admin) {
            abort(403);
        }

        $user = User::findOrFail($id);

        return Inertia::render("Admin/Users/show", ['user' => $user]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * @param  int  $id
     */
    public function update(Request $request, $id)
    {
        if (!Auth::user()->is_admin) {
            abort(403);
        }

        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|unique:users,email,' . $id . '|email|max:255',
            'is_admin' => 'boolean',
            'password' => 'nullable|confirmed|string|min:8'
        ]);

        DB::beginTransaction();
        try {
            //code...
            $usuario = User::findOrFail($id);
            $usuario->name = request()->nombre;
            $usuario->email = request()->email;
            if (isset(request()->password) && !is_null(request()->password)) {
                $usuario->password = Hash::make(request()->password);
            }
            $usuario->is_admin = request()->is_admin;
            $usuario->save();

            DB::commit();
            return redirect()->route("users.index")->with('success', 'Usuario guardado con éxito.');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return redirect()->back()->with('error', 'Error: ' . $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!Auth::user()->is_admin) {
            abort(403);
        }

        if (Auth::id() == $id) {
            return redirect()->back()->with('error', 'Error: No te puedes eliminar a ti mismo.');
        }

        DB::rollBack();
        try {
            //code...
            $usuario = User::findOrFail($id);
            $usuario->delete();

            DB::commit();
            return redirect()->route("users.index")->with('success', 'Usuario eliminado con éxito.');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return redirect()->back()->with('error', 'Error: ' . $th->getMessage());
        }
    }


    public function profile()
    {


        $user = Auth::user();

        return Inertia::render("Admin/Users/profile", ['user' => $user]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function profileUpdate(Request $request)
    {
        $usuario = User::findOrFail(Auth::id());

        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|unique:users,email,' . Auth::id() . '|email|max:255',
            'is_admin' => 'boolean',
            'password' => 'nullable|confirmed|string|min:8',
            'actual_password' => ['nullable', function ($attribute, $value, $fail) use ($usuario) {
                if (!Hash::check($value, $usuario->password)) {
                    return $fail(__('La contraseña actual es incorrecta.'));
                }
            }],
        ]);

        DB::beginTransaction();
        try {
            //code...

            $usuario->name = request()->nombre;
            $usuario->email = request()->email;
            if (isset(request()->password) && !is_null(request()->password)) {
                $usuario->password = Hash::make(request()->password);
            }
            $usuario->save();

            DB::commit();
            return redirect()->route("admin.index")->with('success', 'Usuario guardado con éxito.');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return redirect()->back()->with('error', 'Error: ' . $th->getMessage());
        }
    }
}