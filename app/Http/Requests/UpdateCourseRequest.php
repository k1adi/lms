<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCourseRequest extends FormRequest
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
        $id = $this->route('bu');

        return [
            'name' => ['required', 'string', 'max:150', Rule::unique('courses')->ignore($id)],
            'type' => ['required', 'in:offline,online'],
            'trainer' => ['required', 'string', 'max:120'],
            'thumbnail' => ['nullable', 'string'],
            'url_attachment' => ['nullable', 'url'],
            'prerequisite' => ['nullable', 'integer', 'exists:courses,id'],
            'description' => ['required', 'string']
        ];
    }
}
