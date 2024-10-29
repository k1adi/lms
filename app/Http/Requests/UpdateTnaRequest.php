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
            'courses' => ['required', 'array', 'min:1'],
            'courses.*' => ['required', 'integer', 'exists:courses,id'],
            'bu' => ['required', 'integer', 'exists:bus,id'],
            'dept' => ['required', 'integer', 'exists:depts,id'],
            'title' => ['required', 'string', 'max:150'],
            'objective' => ['required', 'string'],
            'participant' => ['required', 'integer'],
            'trainingTime' => ['required', 'date_format:Y-m-d\TH:i:s.v\Z'],
            'location' => ['required', 'string', 'max:150'],
            'trainer' => ['required', 'string', 'max:120'],
            'users' => ['required', 'array', 'min:1'],
            'users.*' => ['required', 'integer', 'exists:users,id'],
        ];
    }
}
