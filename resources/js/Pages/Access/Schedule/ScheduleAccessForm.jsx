import React, { useState } from 'react';
import Select from 'react-select';
import TextInput from '@/Components/TextInput';
import FieldGroup from '@/Components/Form/FieldGroup';
import convertOptions from '@/Utils/ReactSelectOption';
import LocalizationDate from '@/Utils/LocalizationDate';

const ScheduleAccessForm = ({ datas, access, data, setData, errors }) => {
  const [schedule, setSchedule] = useState({});
  const handleSelect = (option) => {
    setData('datas', option);

    const selectedSchedule = datas.find(schedule => schedule.id === option.value);
    setSchedule(selectedSchedule);
  }

  return (
    <>
      <FieldGroup 
        label='Schedule'
        name='schedule'
        error={errors.datas}
        isPrimary={true}
      >
        <Select
          options={convertOptions(datas)}
          value={data.datas}
          onChange={handleSelect}
        />
      </FieldGroup>

      <FieldGroup label='Schdule Time' >
        <TextInput
          name='course_time'
          className="mt-1 block w-full"
          value={
            schedule?.start_time && schedule?.end_time
              ? `${LocalizationDate(schedule.start_time, 'id')} - ${LocalizationDate(schedule.end_time, 'id')}`
              : ''
          }
          disabled={true}
          placeholder="Time..."
        />
      </FieldGroup>

      <FieldGroup label='Desription'>
        <TextInput
          name='desc'
          className="mt-1 block w-full"
          value={schedule?.desc || ''}
          disabled={true}
          placeholder="Description..."
        />
      </FieldGroup>
      
      <FieldGroup 
        label='Users'
        name='user'
        error={errors.access}
        isPrimary={true}
      >
        <Select
          isMulti
          options={convertOptions(access)}
          value={data.access}
          onChange={(option) => setData('access', option)}
        />
      </FieldGroup>
    </>
  );
};

export default ScheduleAccessForm;
