import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';

const Edit = ({ bu, positions }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('bus.index'), text: 'BU' },
	];

	const { data, setData, patch, errors, processing } = useForm({
		code: bu.code,
		name: bu.name,
		positions: convertOptions(bu.has_positions)
	});

	const submit = (e) => {
		e.preventDefault();

		patch(route('bus.update', bu));
	}

	return (
		<div className='content-box'>
			<Breadcrumb title='Edit Business Unit' pageName='Edit' prevPage={prevPage} />

			<form onSubmit={submit} className="w-full">
				<FieldGroup 
					label='BU Code'
					name='code'
					error={errors.code}
					isPrimary={true}
				>
					<TextInput
						name='code'
						className="mt-1 block w-full"
						value={data.code}
						onChange={(e) => setData('code', e.target.value)}
						required
						isFocused
						autoComplete="code"
						placeholder="Code..."
					/>
				</FieldGroup>

				<FieldGroup 
					label='BU Name'
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
	)
}

Edit.layout = (page) => (
	<DashboardLayout title='BU Edit' children={page} />
);

export default Edit;