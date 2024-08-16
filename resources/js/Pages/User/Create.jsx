import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';
import { Plus, Trash2 } from 'lucide-react';

const Create = ({ bus, roles, positions }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('users.index'), text: 'User' },
	];

	const { data, setData, post, errors, processing } = useForm({
		full_name: '',
    username: '',
		roles: [],
    email: '',
    no_hp: '',
    no_nik: '',
    password: '',
		pivot: [{
			bu: null,
			position: [],
		}],
	});

	const handleAddPivot = () => {
    setData('pivot', [...data.pivot, { bu: null, position: [] }]);
  };

  const handleRemovePivot = (pivotIndex) => {
    const pivots = data.pivot.filter((_, i) => i !== pivotIndex);
    setData('pivot', pivots);
  };

	const submit = (e) => {
		e.preventDefault();
		post(route('users.store'))
	}

	return (
		<form onSubmit={submit} className="w-full">
			<div className='content-box'>
				<Breadcrumb title='Create User' pageName='Create' prevPage={prevPage} />
				<FieldGroup 
					label='Full Name'
					name='full_name'
					error={errors.full_name}
					isPrimary={true}
				>
					<TextInput
						name='full_name'
						className="mt-1 block w-full"
						value={data.full_name}
						onChange={(e) => setData('full_name', e.target.value)}
						required
						isFocused
						autoComplete="full_name"
						placeholder="Full Name..."
					/>
				</FieldGroup>

				<FieldGroup 
					label='Username'
					name='username'
					error={errors.username}
					isPrimary={true}
				>
					<TextInput
						name='username'
						className="mt-1 block w-full"
						value={data.username}
						onChange={(e) => setData('username', e.target.value)}
						required
						autoComplete="username"
						placeholder="Username..."
					/>
				</FieldGroup>
				
				<FieldGroup 
					label='Roles'
					name='role'
					error={errors.role}
					isPrimary={true}
				>
					<Select
            isMulti
            options={convertOptions(roles)}
            value={data.roles}
            onChange={(option) => setData('roles', option)}
          />
				</FieldGroup>

				<FieldGroup 
					label='User Email'
					name='email'
					error={errors.email}
					isPrimary={true}
				>
					<TextInput
						name='email'
						type='email'
						className='mt-1 block w-full'
						value={data.email}
						onChange={(e) => setData('email', e.target.value)}
						required
						autoComplete='email'
						placeholder='User Email...'
					/>
				</FieldGroup>

				<FieldGroup
					label='User Phone'
					name='no_hp'
					error={errors.no_hp}
					isPrimary={true}
				>
					<TextInput
						name='no_hp'
						className='mt-1 block w-full'
						value={data.no_hp}
						onChange={(e) => setData('no_hp', e.target.value)}
						required
						autoComplete='no_hp'
						placeholder='Handphone Number...'
					/>
				</FieldGroup>

				<FieldGroup
					label='User NIK'
					name='no_nik'
					error={errors.no_nik}
					isPrimary={true}
				>
					<TextInput
						name='no_nik'
						className='mt-1 block w-full'
						value={data.no_nik}
						onChange={(e) => setData('no_nik', e.target.value)}
						required
						autoComplete='no_nik'
						placeholder='NIK...'
					/>
				</FieldGroup>

				<FieldGroup
					label='Password'
					name='password'
					error={errors.password}
					isPrimary={true}
				>
					<TextInput
						type='password'
						name='password'
						className='mt-1 block w-full'
						value={data.password}
						onChange={(e) => setData('password', e.target.value)}
						required
						autoComplete='password'
						placeholder='Password...'
					/>
				</FieldGroup>

				<div className='flex justify-between items-center'>
					<button className='btn btn--primary' type='button' onClick={handleAddPivot}>
						<Plus className='inline-block mb-1' /> Add Bu Position
					</button>

					<PrimaryButton disabled={processing}>
						Submit
					</PrimaryButton>
				</div>
			</div>

			<div className='content-box mt-2'>
				{data.pivot.map((item, pivotIndex) => (
					<div className='py-2 border-b border-gray-300' key={pivotIndex}>
						<FieldGroup
							label='Business Unit'
							name={`pivot.${pivotIndex}.bu`}
							error={errors[`pivot.${pivotIndex}.bu`]}
						>
							<div className='flex flex-row items-end gap-x-2'>
								<Select
									name={`pivot.${pivotIndex}.bu`}
									placeholder={'Select Type...'}
									options={convertOptions(bus)}
									value={item.bu}
									onChange={(option) => {
										const bus = [...data.pivot];
										bus[pivotIndex].bu = option;
										setData('pivot', bus);
									}}
									className="mt-1 block w-full"
								/>

								<button className='btn-sm btn--danger' type='button' onClick={() => handleRemovePivot(pivotIndex)}>
									<Trash2 />
								</button>
							</div>
						</FieldGroup>
						<FieldGroup
							label='Position'
							name={`pivot.${pivotIndex}.position`}
							error={errors[`pivot.${pivotIndex}.position`]}
						>
							<Select
								isMulti
								name={`pivot.${pivotIndex}.position`}
								placeholder={'Select Type...'}
								options={convertOptions(positions)}
								value={item.position}
								onChange={(option) => {
									const positions = [...data.pivot];
									positions[pivotIndex].position = option;
									setData('pivot', positions);
								}}
								className="mt-1 block w-full"
							/>
						</FieldGroup>
					</div>
				))}
			</div>
		</form>
	);
}

Create.layout = (page) => (
	<DashboardLayout title='User Create' children={page} />
);

export default Create;