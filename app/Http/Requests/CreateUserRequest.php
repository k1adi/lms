<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
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
        return [
            'full_name' => ['required', 'string'],
            'username' => ['required', 'string', 'max:100', 'unique:users,username'],
            'roles' => ['required', 'array'],
            'roles.*.value' => ['integer', 'exists:roles,id'],
            'email' => ['required', 'email', 'unique:users,email'],
            'no_hp' => ['required', 'string', 'max:16', 'unique:users,no_hp'],
            'no_nik' => ['required', 'string', 'max:16', 'unique:users,no_nik'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }
}
