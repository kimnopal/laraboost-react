<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Models\Permission;
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
            ->withCount('users')
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

    public function create(): Response
    {
        $permissions = Permission::all();

        return Inertia::render('roles/form', [
            'permissions' => $permissions,
        ]);
    }

    public function store(StoreRoleRequest $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();

        $role = Role::create([
            'name' => $validated['name'],
        ]);

        if (isset($validated['permissions'])) {
            $role->permissions()->attach($validated['permissions']);
        }

        return redirect()->route('roles.index')
            ->with('success', 'Role created successfully.');
    }

    public function edit(Role $role): Response
    {
        $permissions = Permission::all();
        $role->load('permissions');

        return Inertia::render('roles/form', [
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }

    public function update(StoreRoleRequest $request, Role $role): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();

        $role->update([
            'name' => $validated['name'],
        ]);

        // Sync permissions (this will remove old ones and add new ones)
        if (isset($validated['permissions'])) {
            $role->permissions()->sync($validated['permissions']);
        } else {
            $role->permissions()->detach();
        }

        return redirect()->route('roles.index')
            ->with('success', 'Role updated successfully.');
    }

    public function destroy(Role $role): \Illuminate\Http\RedirectResponse
    {
        $role->delete();

        return redirect()->route('roles.index')
            ->with('success', 'Role deleted successfully.');
    }
}
