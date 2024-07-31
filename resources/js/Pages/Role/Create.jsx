import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';

const Create = ({ permissions }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('roles.index'), text: 'Role' },
	];

	const { data, setData, post, errors, processing } = useForm({
		name: '',
		permissions: [],
	});

	const handleSelectedPermission = selectedOption => {
		setData('permissions', selectedOption);
	}

	const submit = (e) => {
		e.preventDefault();
		post(route('roles.store'))
	}

	return (
		<div className='content-box'>
			<Breadcrumb title='Create Role' pageName='Create' prevPage={prevPage} />

			<form onSubmit={submit} className="w-full">
				<FieldGroup 
					label='Role Name'
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

				<FieldGroup 
					label='Permissions'
					name='permissions'
					error={errors.permissions}
					isPrimary={true}
				>
					<Select
            isMulti
            options={convertOptions(permissions)}
            value={data.permissions}
            onChange={handleSelectedPermission}
          />
				</FieldGroup>

				<PrimaryButton disabled={processing}>
					Submit
				</PrimaryButton>
			</form>
		</div>
	);
}

Create.layout = (page) => (
	<DashboardLayout title='Create Role' children={page} />
);

export default Create;