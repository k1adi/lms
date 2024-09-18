<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Validator;

class CreateAssignmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('assignment_create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'course_id' => ['required', 'integer', 'exists:courses,id'],
            'type' => ['required', 'string', 'in:knowledge,skill'],
            'access_time' => ['nullable', 'date'],
        ];

        if ($this->input('type') === 'knowledge') {
            $rules['minimum_score'] = ['required', 'integer', 'min:0', 'max:100'];
            $rules['questions'] = ['required', 'array'];
            $rules['questions.*.name'] = ['required', 'string'];
            $rules['questions.*.answers'] = ['required', 'array', 'min:1'];
            $rules['questions.*.answers.*.text'] = ['required', 'string'];
            $rules['questions.*.answers.*.is_correct'] = ['required', 'boolean'];
        }

        return $rules;
    }

    public function withValidator(Validator $validator)
    {
        $validator->after(function ($validator) {
            // Loop through each question
            if ($this->type === 'knowledge') {
                foreach ($this->questions as $index => $question) {
                    // Get all the answers for the current question
                    $correctAnswers = array_filter($question['answers'], function ($answer) {
                        return $answer['is_correct'] === true; // Filter correct answers
                    });
        
                    // Ensure that exactly one answer is marked as correct
                    if (count($correctAnswers) !== 1) {
                        $validator->errors()->add("questions.$index.answers", "Each question must have exactly one correct answer.");
                    }
                }
            }
        });

        $validator->sometimes('minimum_score', 'nullable', function($input) {
            return $input->type === 'skill';
        });

        $validator->sometimes('questions', 'nullable', function($input) {
            return $input->type === 'skill';
        });

        $validator->sometimes('questions.*.name', 'nullable', function($input) {
            return $input->type === 'skill';
        });
        
        $validator->sometimes('questions.*.answers', 'nullable', function($input) {
            return $input->type === 'skill';
        });
        
        $validator->sometimes('questions.*.answers.*.text', 'nullable', function($input) {
            return $input->type === 'skill';
        });
        
        $validator->sometimes('questions.*.answers.*.isCorrect', 'nullable', function($input) {
            return $input->type === 'skill';
        });
    }
}
