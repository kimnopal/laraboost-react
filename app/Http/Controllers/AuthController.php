<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/login');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (! Auth::attempt($request->only(['email', 'password']))) {
            return back()->withErrors([
                'email' => 'These credentials do not match our records.',
                'password' => 'These credentials do not match our records.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard'))->with('success', 'Logged in successfully');
    }

    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

    public function redirectToGoogle()
    {
        // dd('Fungsi redirectToGoogle berjalan!');
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->user();

        $user = User::updateOrCreate([
            'email' => $user->email,
        ], [
            'name' => $user->name,
            'google_id' => $user->id,
            'google_token' => $user->token,
            'google_refresh_token' => $user->refreshToken,
        ]);

        Auth::login($user);

        return redirect()->intended(route('dashboard'))->with('success', 'Logged in successfully');
    }
}
