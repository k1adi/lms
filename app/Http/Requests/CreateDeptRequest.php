<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class CreateDeptRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('dept_create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'bu_id' => ['required', 'array'],
            'bu_id.value' => ['integer', 'exists:bus,id'],
            'code' => ['required', 'string', 'max:7', 'unique:depts,code'],
            'name' => ['required', 'string', 'max:50'],
        ];
    }
}
