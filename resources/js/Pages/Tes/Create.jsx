import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import DateTimePicker from '@/Components/Form/DateTimePicker';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';

const Edit = ({ courses }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('tests.index'), text: 'Test' },
	];

  const { data, setData, post, errors, processing } = useForm({
    course: '',
		accessTime: '',
		minimumScore: '',
    type: '',
    questions: [{
      name:  '',
      answer: [{
        text: '',
        isCorrect: '',
      }]
    }],
	});

  const handleScoreChange = (e) => {
    const value = Math.max(0, Math.min(100, parseInt(e.target.value))); // Ensure value is between 0 and 100
    setData('minimumScore', isNaN(value) ? '' : value); // Handle NaN for invalid input
  };

  const submit = (e) => {
		e.preventDefault();
		post(route('tests.store'))
	}

  return (
    <form onSubmit={submit} className='w-full'>
      <div className='content-box'>
        <Breadcrumb pageName='Create Test' prevPage={prevPage}/>

        {/* Course */}
        <FieldGroup 
					label='Course'
					name='type'
					error={errors.course}
					isPrimary={true}
				>
					<Select
						name='course'
						placeholder={'Select Course...'}
            options={convertOptions(courses)}
            value={data.course}
            onChange={(option) => setData('course', option)}
						className='mt-1 block w-full'
						required
          />
				</FieldGroup>

        {/* Access Time */}
        <FieldGroup 
					label='Access Time'
					name='accessTime'
					error={errors.accessTime}
					isPrimary={true}
				>
					<DateTimePicker 
						minDate='today'
            withTime={false}
            value={data.accessTime}
            onChange={(value) => setData('accessTime', value)}
            className='mt-1 block w-full'
            name='accessTime'
            placeholder='Select access time...'
            required
          />
				</FieldGroup>

        {/* Minimum Score */}
        <FieldGroup
          label="Minimum Score"
          name="minimumScore"
          error={errors.minimumScore}
          isPrimary={true}
        >
          <TextInput
            name="minimumScore"
            type="number"
            min="0"
            max="100"
            value={data.minimumScore}
            onChange={handleScoreChange}
            className="mt-1 block w-full"
            required
            placeholder="Minimum score (0-100)..."
          />
        </FieldGroup>

        {/* Type */}
        <FieldGroup 
					label='Course Type'
					name='type'
					error={errors.type}
					isPrimary={true}
				>
					<Select
						name='type'
						placeholder={'Select Type...'}
            options={[
							{value: 'knowledge', label: 'Knowledge'},
							{value: 'skill', label: 'Skill' }
						]}
            value={data.type}
            onChange={(option) => setData('type', option)}
						className='mt-1 block w-full'
						required
          />
				</FieldGroup>
      </div>
    </form>
  );
}

Edit.layout = (page) => (
  <DashboardLayout title='Tes Create' children={page} />
)

export default Edit;