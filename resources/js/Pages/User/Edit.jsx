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

const Edit = ({ user, roles, depts, bus, positions, pivots }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('users.index'), text: 'User' },
	];

	const { full_name, username, has_role, email, no_hp, no_nik, has_depts } = user;

	const { data, setData, patch, errors, processing } = useForm({
		full_name: full_name,
		username: username,
		role: has_role[0].id,
		roleSelected: convertOptions(has_role),
		email: email,
		no_hp: no_hp,
		no_nik: no_nik,
		password: '',
		pivot: pivots.map(item => {
			const deptValues = has_depts.map(dept => dept.id);

			return {
				bu: item.bu.id,
				buSelected: { value: item.bu.id, label: item.bu.name },

				positions: item.positions.map(position => position.id),
				positionSelected: convertOptions(item.positions),
				
				depts: deptValues,
				deptOptions: convertOptions(depts.filter(dept => dept.bu_id === item.bu.id)),
				deptSelected: convertOptions(depts.filter(dept => dept.bu_id === item.bu.id && deptValues.includes(dept.id))),
			};
		}),
	});

	const handleAddPivot = () => {
    setData('pivot', [...data.pivot, { bu: null, position: [] }]);
  };

  const handleRemovePivot = (pivotIndex) => {
    const pivots = data.pivot.filter((_, i) => i !== pivotIndex);
    setData('pivot', pivots);
  };

	const handleSelectRole = (option) => {
		setData((prevData) => ({
			...prevData,
			role: option.value,
			roleSelected: option,
		}));
	}

	const submit = (e) => {
		e.preventDefault();

		patch(route('users.update', user))
	}

	return (
		<form onSubmit={submit} className="w-full">
			<div className='content-box'>
			<Breadcrumb title='Edit User' pageName='Edit' prevPage={prevPage} />
				{/* Fullname */}
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

				{/* User name */}
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

				{/* Roles */}
				<FieldGroup 
					label='Roles'
					name='role'
					error={errors.role}
					isPrimary={true}
				>
					<Select
            options={convertOptions(roles)}
            value={data.roleSelected}
            onChange={handleSelectRole}
          />
				</FieldGroup>

				{/* Email */}
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

				{/* Phone */}
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

				{/* NIK */}
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

				{/* Password */}
				<FieldGroup
					label='Password'
					name='password'
					error={errors.password}
				>
					<TextInput
						type='password'
						name='password'
						className='mt-1 block w-full'
						value={data.password}
						onChange={(e) => setData('password', e.target.value)}
						autoComplete='password'
						placeholder='Password...'
					/>
				</FieldGroup>

				<div className='flex justify-between items-center'>
					<button className='btn btn--primary text-black font-semibold' type='button' onClick={handleAddPivot}>
						<Plus className='inline-block mb-1' /> Add Positioning
					</button>

					<PrimaryButton disabled={processing}>
						Submit
					</PrimaryButton>
				</div>
			</div>

			{data.pivot.map((item, pivotIndex) => (
				<div className='content-box mt-2 z-0' key={pivotIndex}>
					<div className='py-2 border-b border-gray-300'>
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
									value={item.buSelected}
									onChange={async (option) => {
										const bus = [...data.pivot];
										bus[pivotIndex].bu = option.value;
										bus[pivotIndex].buSelected = option;
										bus[pivotIndex].depts = [];
										bus[pivotIndex].deptSelected = [];

										// Fetch departments by selected bu
										const response = await axios.get(`/getBuDept/${option.value}`);
										bus[pivotIndex].deptOptions = response.data; // Store fetched departments
										
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
								value={item.positionSelected}
								onChange={(option) => {
									const positions = [...data.pivot];
									positions[pivotIndex].positions = option.map((item) => item.value);
									positions[pivotIndex].positionSelected = option;
									setData('pivot', positions);
								}}
								className="mt-1 block w-full"
							/>
						</FieldGroup>

						<FieldGroup
							label='Department'
							name={`pivot.${pivotIndex}.dept`}
							error={errors[`pivot.${pivotIndex}.dept`]}
						>
							<Select
								isMulti
								name={`pivot.${pivotIndex}.dept`}
								placeholder={'Select Department...'}
								options={data.pivot[pivotIndex].deptOptions || []} // Options will be updated after fetching
								value={item.deptSelected}
								onChange={(option) => {
									const depts = [...data.pivot];
									depts[pivotIndex].depts = option.map((item) => item.value);
									depts[pivotIndex].deptSelected = option;
									setData('pivot', depts);
								}}
								className="mt-1 block w-full"
								menuPortalTarget={document.body} 
								menuPosition={'fixed'}
							/>
						</FieldGroup>
					</div>
				</div>
			))}
		</form>
	)
}

Edit.layout = (page) => (
	<DashboardLayout title='User Edit' children={page} />
);

export default Edit;