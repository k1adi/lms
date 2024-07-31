import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';

const Create = ({ positions }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('bus.index'), text: 'BU' },
	];

	const { data, setData, post, errors, processing } = useForm({
		code: '',
		name: '',
		positions: []
	});

	const handleReactSelect = selectedOption => {
		setData('positions', selectedOption);
	}

	const submit = (e) => {
		e.preventDefault();
		post(route('bus.store'))
	}

	return (
		<div className='content-box'>
			<Breadcrumb title='Create Business Unit' pageName='Create' prevPage={prevPage} />
			
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
            onChange={handleReactSelect}
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
	<DashboardLayout title='BU Create' children={page} />
);

export default Create;