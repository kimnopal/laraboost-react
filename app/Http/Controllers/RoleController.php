<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->search;

        $roles = Role::with('permissions')
            ->when($search, function ($query, $search) {
                return $query->whereRaw('LOWER(name) LIKE LOWER(?)', ["%{$search}%"]);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('roles/page', [
            'roles' => $roles,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function destroy(Role $role): \Illuminate\Http\RedirectResponse
    {
        $role->delete();

        return redirect()->route('roles.index')
            ->with('success', 'Role deleted successfully.');
    }
}
