<?php

namespace App\MyApp\Poll\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShowPollByIdRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'poll_id' => 'required|int',
        ];
    }

    public function messages(): array
    {
        return [
            'poll_id.required' => 'Poll ID is required!',
        ];
    }
}
