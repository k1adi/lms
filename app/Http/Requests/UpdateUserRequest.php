<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
        $id = $this->route('user');

        return [
            'full_name' => ['required', 'string'],
            'username' => ['required', 'string', 'max:100', Rule::unique('users')->ignore($id)],
            'email' => ['required', 'email', Rule::unique('users')->ignore($id)],
            'no_hp' => ['required', 'string', 'max:16', Rule::unique('users')->ignore($id)],
            'no_nik' => ['required', 'string', 'max:16', Rule::unique('users')->ignore($id)],
            'password' => ['nullable', 'string', 'min:8'],
        ];
    }
}
