<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MyProfileUpdateRequest extends FormRequest
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
            'username' => ['required', 'string', 'max:100', Rule::unique('users')->ignore($this->user()->id)],
            'full_name' => ['required', 'string'],
            'email' => ['required', 'email', Rule::unique('users')->ignore($this->user()->id)],
            'no_nik' => ['required', 'string', 'min:7', 'max:16', Rule::unique('users')->ignore($this->user()->id)],
            'no_hp' => ['required', 'string', 'min:10', 'max:16', Rule::unique('users')->ignore($this->user()->id)],
            'password' => ['nullable', 'string', 'min:8'],
        ];
    }
}
