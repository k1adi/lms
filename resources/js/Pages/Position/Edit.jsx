import React from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

const Edit = ({ position }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('positions.index'), text: 'Position' },
	];

	const { data, setData, patch, errors, processing } = useForm({
		name: position.name,
	});

	const submit = (e) => {
		e.preventDefault();

		patch(route('positions.update', position));
	}

	return (
		<div className='content-box'>
			<Breadcrumb title='Create Position' pageName='Create' prevPage={prevPage} />
			<form onSubmit={submit} className="w-full">
				<FieldGroup 
					label='Position Name'
					name='name'
					error={errors.name}
					isPrimary={true}
				>
					<TextInput
						name='name'
						className="mt-1 block w-full"
						value={data.name}
						onChange={(e) => setData('name', e.target.value)}
						required
						autoComplete="name"
						placeholder="Name..."
					/>
				</FieldGroup>

				<PrimaryButton disabled={processing}>
					Submit
				</PrimaryButton>
			</form>

		</div>
	);
}

Edit.layout = (page) => (
	<DashboardLayout title='Position Edit' children={page} />
);

export default Edit;