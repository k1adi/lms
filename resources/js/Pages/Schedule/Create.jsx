import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import TextArea from '@/Components/TextArea';
import FieldGroup from '@/Components/Form/FieldGroup';
import PrimaryButton from '@/Components/PrimaryButton';
import DateTimePicker from '@/Components/Form/DateTimePicker';

const Create = ({ courses, users }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('schedules.index'), text: 'Schedule' },
	];

	const { data, setData, post, errors, processing } = useForm({
		course_id: '',
		selectCourse: '',
		start_time: '',
    end_time: '',
		desc: '',
		user_id: '',
		selectUser: '',
	});

	const handleSelectCourse = (option) => {
		setData((prevData) => ({
			...prevData,
			selectCourse: option,
			course_id: option.value,
		}));
	}

	const handleSelectUser = (option) => {
		const userIds = option.map((user) => user.value);

		setData((prevData) => ({
			...prevData,
			user_id: userIds,
			selectUser: option,
		}));
	}

	const submit = (e) => {
		e.preventDefault();
		post(route('schedules.store'))
	}

  return (
    <div className='content-box'>
			<Breadcrumb title='Create Schedule' pageName='Create' prevPage={prevPage} />

			<form onSubmit={submit} className='w-full'>
        <FieldGroup 
					label='Course'
					name='course'
					error={errors.course_id}
					isPrimary={true}
				>
					<Select
            options={courses}
            value={data.selectCourse}
            onChange={handleSelectCourse}
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
            className='mt-1 block w-full'
            name='start_time'
            placeholder='Select start datetime...'
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
            className='mt-1 block w-full' 
            name='end_time'
            placeholder='Select end datetime...'
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

				<FieldGroup 
					label='Users'
					name='users'
					error={errors.user_id}
					isPrimary={true}
				>
					<Select
						isMulti
            options={users}
            value={data.selectUser}
            onChange={handleSelectUser}
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