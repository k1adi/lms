<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Validator;

class CreateCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('course_create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'string', 'max:150', 'unique:courses,name'],
            'type.value' => ['required', 'in:offline,online'],
            'trainer' => ['required', 'string', 'max:120'],
            'thumbnail' => ['nullable', 'url', 'regex:/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i'],
            'url_attachment' => ['nullable', 'url'],
            // 'prerequisite.value' => ['nullable', 'integer', 'exists:courses,id'],
            'description' => ['nullable', 'string']
        ];

        if ($this->input('type.value') === 'online') {
            $rules['sections'] = 'required|array|min:1';
            $rules['sections.*.name'] = 'required|string|max:100';
            $rules['sections.*.subsections'] = 'required|array|min:1';
            $rules['sections.*.subsections.*.name'] = 'required|string|max:100';
            $rules['sections.*.subsections.*.type'] = 'required|in:media,file';
            $rules['sections.*.subsections.*.url'] = 'required|url';
            $rules['sections.*.subsections.*.desc'] = 'nullable|string';
        }

        return $rules;
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

        $validator->sometimes('sections.*.subsections.*.type', 'nullable', function ($input) {
            return $input->type === 'offline';
        });

        $validator->sometimes('sections.*.subsections.*.desc', 'nullable', function ($input) {
            return $input->type === 'offline';
        });
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'thumbnail.regex' => 'The URL must be a valid YouTube link.',
        ];
    }
}
