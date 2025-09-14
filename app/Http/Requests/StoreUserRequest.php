<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user') ? $this->route('user')->id : null;

        $emailRule = 'required|email|max:255';
        if ($userId) {
            $emailRule .= '|unique:users,email,' . $userId;
        } else {
            $emailRule .= '|unique:users,email';
        }

        return [
            'name' => 'required|string|max:255',
            'email' => $emailRule,
            'password' => $userId ? 'nullable|string|min:8' : 'required|string|min:8',
            'roles' => 'array',
            'roles.*' => 'exists:roles,id',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The user name is required.',
            'email.required' => 'The email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email address is already registered.',
            'password.required' => 'The password is required.',
            'password.min' => 'The password must be at least 8 characters.',
            'roles.array' => 'Roles must be provided as an array.',
            'roles.*.exists' => 'One or more selected roles do not exist.',
        ];
    }
}
