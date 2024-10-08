<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateScheduleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('schedule_edit');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'course_id' => ['required', 'integer', 'exists:courses,id'],
            'start_time' => ['required', 'date_format:Y-m-d\TH:i:s.v\Z'],
            'end_time' => ['required', 'date_format:Y-m-d\TH:i:s.v\Z', 'after_or_equal:start_time'],
            'desc' => ['nullable', 'string'],
            'user_id' => ['required', 'array', 'min:1'],
            'user_id.*' => ['integer', 'exists:users,id']
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $startDatetime = Carbon::parse($this->input('start_time'));
            $endDatetime = Carbon::parse($this->input('end_time'));

            if ($endDatetime->lt($startDatetime)) {
                $validator->errors()->add('end_time', 'The end time must be a date after or equal to start time.');
            }
        });
    }
}
