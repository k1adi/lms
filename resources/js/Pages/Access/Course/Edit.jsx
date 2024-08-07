import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';

const Edit = ({ course, positions }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('access.index'), text: 'Access' },
		{ link: '#', text: 'Course' },
	];

	const { data, setData, patch, errors, processing } = useForm({
		positions: convertOptions(course.assign_position)
	});

	const submit = (e) => {
		e.preventDefault();

		patch(route('course-access.update', course));
	}

  return (
    <div className='content-box'>
			<Breadcrumb title='Edit Course Access' pageName='Edit' prevPage={prevPage} />

			<form onSubmit={submit} className="w-full">
				<FieldGroup label='Course Name' >
					<TextInput
						name='course_name'
						className="mt-1 block w-full"
						value={course.name}
            disabled={true}
						placeholder="Name..."
					/>
				</FieldGroup>

				<FieldGroup 
					label='Positions'
					name='positions'
					error={errors.positions}
					isPrimary={true}
				>
					<Select
            isMulti
            options={convertOptions(positions)}
            value={data.positions}
            onChange={(option) => setData('positions', option)}
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
  <DashboardLayout title='Edit Course Access' children={page} />
);

export default Edit;