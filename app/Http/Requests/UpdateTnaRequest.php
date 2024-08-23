<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateTnaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('tna_edit');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'course' => ['required', 'array'],
            'course.value' => ['integer', 'exists:courses,id'],
            'bu' => ['required', 'array'],
            'bu.value' => ['integer', 'exists:bus,id'],
            'dept' => ['required', 'array'],
            'dept.value' => ['integer', 'exists:depts,id'],
            'positions' => ['required', 'array', 'min:1'],
            'positions.*.value' => ['required', 'integer', 'exists:positions,id'],
            'users' => ['required', 'array', 'min:1'],
            'users.*.value' => ['required', 'integer', 'exists:users,id'],
            'objective' => ['required', 'string'],
            'participant' => ['required', 'integer'],
            'trainingTime' => ['required', 'date_format:Y-m-d\TH:i:s.v\Z'],
            'location' => ['required', 'string', 'max:150'],
            'trainer' => ['required', 'string', 'max:120'],
        ];
    }
}
