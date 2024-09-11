import React from 'react';
import Flatpickr from 'react-flatpickr';
import { Indonesian } from 'flatpickr/dist/l10n/id.js'
import 'flatpickr/dist/themes/airbnb.css'; // Import a Flatpickr theme
import 'flatpickr/dist/flatpickr.css'; // Import Flatpickr base CSS

export default function DateTimePicker({ value, onChange, className='', minDate='', currentDate='', withTime = true, ...props }) {
  return (
    <Flatpickr
      {...props}
      data-enable-time
      options={{
        altInput: true,
        time_24hr: true,
        enableTime: withTime,
        locale: Indonesian,
        dateFormat: withTime ? 'Y-m-d H:i:S' : 'Y-m-d',
        altFormat: withTime ? "j F Y H:i:S" : 'j F Y',
        minDate: minDate,
        defaultDate: currentDate,
        defaultHour: 10
      }}
      value={value}
      onChange={([selectedDate]) => onChange(selectedDate)}
      className={'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' + className }
    />
  );
};
