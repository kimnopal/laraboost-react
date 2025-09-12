<?php


namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('categories/page', [
            'categories' => Category::all(),
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
        ]);

        Category::create($request->all());

        return redirect()->route('categories.index')->with('success', 'Category created successfully');
    }
}
