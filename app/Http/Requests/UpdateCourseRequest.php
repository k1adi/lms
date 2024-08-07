<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

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
        $id = $this->route('course');

        $rules = [
            'name' => ['required', 'string', 'max:150', Rule::unique('courses')->ignore($id)],
            'type.value' => ['required', 'in:offline,online'],
            'trainer' => ['required', 'string', 'max:120'],
            'thumbnail' => ['nullable', 'string'],
            'url_attachment' => ['nullable', 'url'],
            'prerequisite.value' => ['nullable', 'integer', 'exists:courses,id'],
            'description' => ['nullable', 'string']
        ];

        if ($this->input('type.value') === 'online') {
            $rules['sections'] = 'required|array|min:1';
            $rules['sections.*.name'] = 'required|string|max:100';
            $rules['sections.*.subsections'] = 'required|array|min:1';
            $rules['sections.*.subsections.*.name'] = 'required|string|max:100';
            $rules['sections.*.subsections.*.url'] = 'required|url';
        }

        return $rules;

        // return [
        //     'name' => ['required', 'string', 'max:150', Rule::unique('courses')->ignore($id)],
        //     'type' => ['required', 'in:offline,online'],
        //     'trainer' => ['required', 'string', 'max:120'],
        //     'thumbnail' => ['nullable', 'string'],
        //     'url_attachment' => ['nullable', 'url'],
        //     'prerequisite' => ['nullable', 'integer', 'exists:courses,id'],
        //     'description' => ['required', 'string']
        // ];
    }

    public function withValidator(Validator $validator)
    {
        $validator->sometimes('sections', 'nullable', function ($input) {
            return $input->type === 'offline';
        });

        $validator->sometimes('sections.*.name', 'nullable', function ($input) {
            return $input->type === 'offline';
        });

        $validator->sometimes('sections.*.subsections', 'nullable', function ($input) {
            return $input->type === 'offline';
        });

        $validator->sometimes('sections.*.subsections.*.name', 'nullable', function ($input) {
            return $input->type === 'offline';
        });

        $validator->sometimes('sections.*.subsections.*.url', 'nullable', function ($input) {
            return $input->type === 'offline';
        });
    }
}
