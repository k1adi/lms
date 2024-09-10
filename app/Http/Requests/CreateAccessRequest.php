<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class CreateAccessRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('accessible_create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return array_merge([
            'page' => ['required', 'string', 'in:course,schedule'],
        ], $this->extendedRules());
    }

    protected function extendedRules(): array
    {
        $page = $this->input('page');

        if($page === 'course') {
            return $this->courseRule();
        } else if($page === 'schedule') {
            return $this->scheduleRule();
        }

        return [];
    }

    protected function courseRule(): array
    {
        return [
            'datas' => ['required', 'array'],
            'datas.value' => ['integer', 'exists:courses,id'],
            'access' => ['required', 'array', 'min:1'],
            'access.*.value' => ['integer', 'exists:positions,id'],
        ];
    }
    
    protected function scheduleRule(): array
    {
        return [
            'datas' => ['required', 'array'],
            'datas.value' => ['integer', 'exists:schedules,id'],
            'access' => ['required', 'array', 'min:1'],
            'access.*.value' => ['integer', 'exists:users,id'],
        ];
    }
}
