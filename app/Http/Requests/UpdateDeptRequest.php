<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDeptRequest extends FormRequest
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
        $id = $this->route('dept');

        return [
            'bu_id' => ['required', 'integer', 'exists:bus,id'],
            'code' => ['required', 'string', 'max:7', Rule::unique('depts')->ignore($id)],
            'name' => ['required', 'string', 'max:50'],
        ];
    }
}