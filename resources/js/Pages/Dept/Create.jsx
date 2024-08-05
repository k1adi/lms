import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';

const Create = ({ bus }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('depts.index'), text: 'Depts' },
	];
	
	const { data, setData, post, errors, processing } = useForm({
		bu_id: bus[0].id,
		code: '',
		name: '',
	});

	const handleReactSelect = selectedOption => {
		setData('bu_id', selectedOption);
	}

	const submit = (e) => {
		e.preventDefault();

		post(route('depts.store'))
	}

	return (
		<div className='content-box'>
			<Breadcrumb title='Create Department' pageName='Create' prevPage={prevPage} />

			<form onSubmit={submit} className="w-full">
				<FieldGroup 
					label='Business Unit'
					name='bu'
					error={errors.bu_id}
					isPrimary={true}
				>
					<Select
            options={convertOptions(bus)}
            value={data.bu_id}
            onChange={handleReactSelect}
						className="mt-1 block w-full"
						required
          />
				</FieldGroup>

				<FieldGroup 
					label='Department Code'
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
						autoComplete="code"
						placeholder="Dept Code..."
					/>
				</FieldGroup>

				<FieldGroup 
					label='Department Name'
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

Create.layout = (page) => (
	<DashboardLayout title='Dept Create' children={page} />
);

export default Create;