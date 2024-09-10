import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';
import LocalizationDate from '@/Utils/LocalizationDate';

const Edit = ({ schedule, users }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('access.index'), text: 'Access' },
		{ link: '#', text: 'Schedule' },
	];

	const { data, setData, patch, errors, processing } = useForm({
		users: convertOptions(schedule.assign_user, 'full_name')
	});

	const submit = (e) => {
		e.preventDefault();

		patch(route('schedule-access.update', schedule));
	}

  return (
    <div className='content-box'>
			<Breadcrumb title='Edit Schedule Access' pageName='Edit' prevPage={prevPage} />

			<form onSubmit={submit} className="w-full">
        <FieldGroup label='Course Name' >
					<TextInput
						name='course_name'
						className="mt-1 block w-full"
						value={schedule.course.name}
            disabled={true}
						placeholder="Name..."
					/>
				</FieldGroup>

				<FieldGroup label='Schdule Time' >
					<TextInput
						name='course_time'
						className="mt-1 block w-full"
						value={LocalizationDate(schedule.start_time, 'id') + ' - ' + LocalizationDate(schedule.end_time, 'id')}
            disabled={true}
						placeholder="Time..."
					/>
				</FieldGroup>

        <FieldGroup label='Desription'>
					<TextInput
						name='desc'
						className="mt-1 block w-full"
						value={schedule.desc}
            disabled={true}
						placeholder="Description..."
					/>
				</FieldGroup>

				<FieldGroup 
					label='Users'
					name='users'
					error={errors.users}
					isPrimary={true}
				>
					<Select
            isMulti
            options={convertOptions(users, 'full_name')}
            value={data.users}
            onChange={(option) => setData('users', option)}
          />
				</FieldGroup>

				<PrimaryButton disabled={processing}>
					Submit
				</PrimaryButton>
			</form>
		</div>
  );
}

Edit.layout = page => (
  <DashboardLayout title='Edit Schedule Access' children={page} />
);

export default Edit;