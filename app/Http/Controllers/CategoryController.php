<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $categories = Category::query()
            ->when($search, function ($query, $search) {
                $query->whereRaw('LOWER(name) LIKE LOWER(?)', ["%{$search}%"]);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('categories/page', [
            'categories' => $categories,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('categories/form');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'is_active' => 'required|in:true,false',
            'description' => 'nullable|string|max:255',
        ]);

        Category::create([
            'name' => $request->name,
            'is_active' => $request->boolean('is_active'),
            'description' => $request->description,
        ]);

        return redirect()->route('categories.index')->with('success', 'Category created successfully');
    }

    public function edit(Category $category)
    {
        return Inertia::render('categories/form', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'is_active' => 'required|in:true,false',
            'description' => 'nullable|string|max:255',
        ]);

        $category->update([
            'name' => $request->name,
            'is_active' => $request->boolean('is_active'),
            'description' => $request->description,
        ]);

        return redirect()->route('categories.index')->with('success', 'Category updated successfully');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully');
    }
}
