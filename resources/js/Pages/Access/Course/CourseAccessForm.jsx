import React from 'react';
import Select from 'react-select';
import FieldGroup from '@/Components/Form/FieldGroup';
import convertOptions from '@/Utils/ReactSelectOption';

const CourseAccessForm = ({ datas, access, data, setData, errors }) => {
  return (
    <>
      <FieldGroup 
        label='Course'
        name='course'
        error={errors.datas}
        isPrimary={true}
      >
        <Select
          options={convertOptions(datas)}
          value={data.datas}
          onChange={(option) => setData('datas', option)}
        />
      </FieldGroup>

      <FieldGroup 
        label='Posiitons'
        name='position'
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

export default CourseAccessForm;
