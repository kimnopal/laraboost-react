<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePermissionRequest;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PermissionController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->search;

        $permissions = Permission::when($search, function ($query, $search) {
            return $query->whereRaw('LOWER(name) LIKE LOWER(?)', ["%{$search}%"]);
        })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('permissions/page', [
            'permissions' => $permissions,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('permissions/form');
    }

    public function store(StorePermissionRequest $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();

        Permission::create($validated);

        return redirect()->route('permissions.index')
            ->with('success', 'Permission created successfully.');
    }

    public function edit(Permission $permission): Response
    {
        return Inertia::render('permissions/form', [
            'permission' => $permission,
        ]);
    }

    public function update(StorePermissionRequest $request, Permission $permission): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();

        $permission->update($validated);

        return redirect()->route('permissions.index')
            ->with('success', 'Permission updated successfully.');
    }

    public function destroy(Permission $permission): \Illuminate\Http\RedirectResponse
    {
        $permission->delete();

        return redirect()->route('permissions.index')
            ->with('success', 'Permission deleted successfully.');
    }
}
