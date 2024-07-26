import React from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

const Edit = ({ permission }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('permissions.index'), text: 'Permission' },
	];

	const { data, setData, patch, errors, processing } = useForm({
		name: permission.name,
	});

	const submit = (e) => {
		e.preventDefault();

		patch(route('permissions.update', permission));
	}

	return (
		<div className='content-box'>
			<Breadcrumb title='Edit Permission' pageName='Edit' prevPage={prevPage} />
			<form onSubmit={submit} className="w-full">
				<FieldGroup 
					label='Permission Name'
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
						isFocused
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
	<DashboardLayout title='Edit Permission' children={page} />
);

export default Edit;