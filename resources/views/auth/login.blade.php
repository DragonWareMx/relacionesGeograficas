@extends('layouts.app')

@section('content')
<div style="
        background-image: url('{{ asset('images/background.jpg')}}');
        background-repeat: no-repeat;
        background-position: center; 
        background-size:cover;  
        background-color: white;
        width:100%;
        height:100vh;
    "
>
    <div class="row justify-content-center">
        <div class="col-md-8" style='display:flex;justify-content:center;'>
            <div 
                style='
                    background: rgb(19,19,19);
                    background: linear-gradient(90deg, rgba(19,19,19,0.9) 12%, rgba(5,84,139,0.9) 100%);
                    width:100%;
                    max-width:550px;
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    border:1px solid transparent;
                    border-radius:10px;
                    margin-top:100px;
                '
            >

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}" >
                        @csrf

                        <div class="row mb-3" style='font-family:nunito;width:100%;text-align:center;margin-top:27px;color:white;'>
                            <label for="email" >{{ __('Correo electrónico') }}</label>

                            <div class="col-md-6">
                                <input 
                                    id="email" 
                                    type="email" 
                                    class="form-control @error('email') is-invalid @enderror" 
                                    name="email" 
                                    value="{{ old('email') }}" 
                                    required 
                                    autocomplete="email" 
                                    autofocus
                                    style='
                                        width:100%;
                                        margin-bottom:15px;
                                    '
                                >

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3" style='font-family:nunito;width:100%;text-align:center;color:white;'>
                            <label for="password" class="col-md-4 col-form-label text-md-end">{{ __('Contraseña') }}</label>

                            <div class="col-md-6">
                                <input 
                                    id="password" 
                                    type="password" 
                                    class="form-control @error('password') is-invalid @enderror" 
                                    name="password" 
                                    required 
                                    autocomplete="current-password"
                                    style='
                                        width:100%;
                                        margin-bottom:15px;
                                    '
                                >

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-0">
                            <div 
                                style='
                                    width:100%;
                                    display:flex;
                                    justify-content:center;
                                    margin-bottom:27px;
                                '
                            >
                                <button type="submit" 
                                    style='
                                        background-color:#193661;
                                        padding:10px 15px;
                                        color:white;
                                        font-family:nunito;
                                        border:1px solid #193661;
                                        border-radius:5px;
                                        margin-top:10px;
                                    '
                                >
                                    {{ __('Iniciar Sesión') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
