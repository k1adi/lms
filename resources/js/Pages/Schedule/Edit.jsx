import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';
import DateTimePicker from '@/Components/Form/DateTimePicker';

const Edit = ({ schedule, courses }) => {
  console.log(schedule);
  console.log(courses);

  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('schedules.index'), text: 'Schedule' },
	];

  const startTime = new Date(schedule.start_time);
  const endTime = new Date(schedule.end_time);

	const { data, setData, patch, errors, processing } = useForm({
		course_id: {
      value: schedule.course.id,
      label: schedule.course.name
    },
		start_time: startTime.toISOString(),
    end_time: endTime.toISOString(),
    desc: schedule.desc
	});

	const submit = (e) => {
		e.preventDefault();
		patch(route('schedules.update', schedule))
	}

  return (
    <div className='content-box'>
			<Breadcrumb title='Edit Schedule' pageName='Edit' prevPage={prevPage} />

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
            onChange={(option) => setData('course_id', option)}
          />
				</FieldGroup>

        <FieldGroup 
					label='Start Time'
					name='start_time'
					error={errors.start_time}
					isPrimary={true}
				>
					<DateTimePicker 
            value={data.start_time}
            currentDate={data.start_time}
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
            value={data.end_time}
            currentDate={data.end_time}
            onChange={(value) => setData('end_time', value)}
            className="mt-1 block w-full" 
            name='end_time'
            placeholder='Select end datetime'
            required
          />
				</FieldGroup>

        <FieldGroup 
					label='Description'
					name='desc'
					error={errors.desc}
				>
          <TextArea
						id='desc'
						name='desc'
						className='mt-1 block w-full'
						value={data.desc}
						onChange={(e) => setData('desc', e.target.value)}
						autoComplete='desc'
						placeholder='Schedule Description...'
						rows={3}
					/>
				</FieldGroup>

				<PrimaryButton disabled={processing}>
					Submit
				</PrimaryButton>
      </form>
    </div>
  )
}

Edit.layout = page => (
  <DashboardLayout title='Edit Schedule' children={page} />
);

export default Edit;