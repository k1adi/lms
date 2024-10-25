<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('user_edit');
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
            'roles' => ['required', 'array'],
            'roles.*.value' => ['integer', 'exists:roles,id'],
            'email' => ['required', 'email', Rule::unique('users')->ignore($id)],
            'no_hp' => ['required', 'string', 'min:10', 'max:16', Rule::unique('users')->ignore($id)],
            'no_nik' => ['required', 'string', 'min:7', 'max:16', Rule::unique('users')->ignore($id)],
            'password' => ['nullable', 'string', 'min:8'],
            'pivot' => ['required', 'array', 'min:1'],
            'pivot.*.bu.value' => ['required', 'integer', 'exists:bus,id'],
            'pivot.*.position' => ['required', 'array', 'min:1'],
            'pivot.*.position.*.value' => ['required', 'integer', 'exists:positions,id'],
        ];
    }
}
