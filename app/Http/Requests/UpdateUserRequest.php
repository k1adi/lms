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
            'email' => ['required', 'email', Rule::unique('users')->ignore($id)],
            'role' => ['required', 'integer', 'exists:roles,id'],
            'no_hp' => ['required', 'string', 'min:10', 'max:16', Rule::unique('users')->ignore($id)],
            'no_nik' => ['required', 'string', 'min:7', 'max:16', Rule::unique('users')->ignore($id)],
            'password' => ['nullable', 'string', 'min:8'],

            'pivot' => ['required', 'array', 'min:1'],
            'pivot.*.bu' => ['required', 'integer', 'exists:bus,id'],
            'pivot.*.positions' => ['required', 'array', 'min:1', 'exists:positions,id'],
            'pivot.*.depts' => ['required', 'array', 'min:1', 'exists:depts,id'],
        ];
    }
}
