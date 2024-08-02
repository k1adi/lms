import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';
import DateTimePicker from '@/Components/Form/DateTimePicker';

const Create = ({ courses }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('schedules.index'), text: 'Schedule' },
	];

	const { data, setData, post, errors, processing } = useForm({
		course_id: '',
		start_time: '',
    end_time: ''
	});

	const handleReactSelect = selectedOption => {
		setData('course_id', selectedOption);
	}

	const submit = (e) => {
		e.preventDefault();
		post(route('schedules.store'))
	}

  return (
    <div className='content-box'>
			<Breadcrumb title='Create Schedule' pageName='Create' prevPage={prevPage} />

			<form onSubmit={submit} className="w-full">
        <FieldGroup 
					label='Course'
					name='course'
					error={errors.course_id}
					isPrimary={true}
				>
					<Select
            options={convertOptions(courses)}
            value={data.course_id}
            onChange={handleReactSelect}
          />
				</FieldGroup>

        <FieldGroup 
					label='Start Time'
					name='start_time'
					error={errors.start_time}
					isPrimary={true}
				>
					<DateTimePicker 
						minDate='today'
            value={data.start_time}
            onChange={(value) => setData('start_time', value)}
            className="mt-1 block w-full"
            name='start_time'
            placeholder='Select start datetime'
            required
          />
				</FieldGroup>

        <FieldGroup 
					label='End Time'
					name='end_time'
					error={errors.end_time}
					isPrimary={true}
				>
          <DateTimePicker
						minDate='today'
            value={data.end_time}
            onChange={(value) => setData('end_time', value)}
            className="mt-1 block w-full" 
            name='end_time'
            placeholder='Select end datetime'
            required
          />
				</FieldGroup>

				<PrimaryButton disabled={processing}>
					Submit
				</PrimaryButton>
      </form>
    </div>
  )
}

Create.layout = page => (
  <DashboardLayout title='Create Schedule' children={page} />
);

export default Create;