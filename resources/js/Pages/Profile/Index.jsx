import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';
import MyReportTable from './Partials/MyReportTable';

const Index = ({ auth, user, pivots, reports }) => {
  const prevPage = [
    { link: route('dashboard'), text: 'Dashboard' },
  ];
	console.log(auth, 'cek auth user');
	const graduated = auth.user.finisheds;

	const { full_name, username, has_role, email, no_hp, no_nik, has_depts } = user;

  const { data, setData, patch, errors, processing } = useForm({
		full_name: full_name,
		username: username,
		roles: has_role,
		email: email,
		no_hp: no_hp,
		no_nik: no_nik,
		password: '',
    pivot: pivots.map(item => ({
			bu: item.bu.name,
			position: convertOptions(item.positions),
			dept: convertOptions(has_depts.filter(dept => dept.bu_id = item.bu.id)),
		})),
	});

  const submit = (e) => {
		e.preventDefault();
		patch(route('profile.update', user));
	}

  return (
		<>
			<div className='content-box mb-3'>
				<Breadcrumb title='My Profile' pageName='Profile' prevPage={prevPage} />

				<form onSubmit={submit} className='w-full'>
					{/* Username */}
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

					{/* Full name */}
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
							autoComplete="full_name"
							placeholder="Full Name..."
						/>
					</FieldGroup>

					{/* User Email */}
					<FieldGroup 
						label='Email'
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

					{/* User Phone */}
					<FieldGroup
						label='Phone'
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

					{/* User NIK */}
					<FieldGroup
						label='NIK'
						name='no_nik'
						error={errors.no_nik}
					>
						<TextInput
							name='no_nik'
							className='mt-1 block w-full'
							value={data.no_nik}
							readOnly={true}
							disabled={true}
						/>
					</FieldGroup>

					{/* Roles */}
					<FieldGroup 
						label='Roles'
						name='role'
						error={errors.role}
						isPrimary={true}
					>
						<TextInput
							name='roles'
							className='mt-1 block w-full'
							value={data.roles[0].name}
							readOnly={true}
							disabled={true}
						/>
					</FieldGroup>


					{data.pivot.map((item, index) => (
						<FieldGroup
						key={index}
							label='Business Unit & Position'
						>
							<div className='flex items-start gap-2'>
								<TextInput
									name='roles'
									className='mt-1'
									value={item.bu}
									readOnly={true}
									disabled={true}
								/>

								<div className="flex-1">
									<Select
										isMulti
										name={`pivot.${index}.dept`}
										value={item.dept}
										className="mt-1"
										isDisabled={true}
									/>
									<Select
										isMulti
										name={`pivot.${index}.position`}
										value={item.position}
										className="mt-2"
										isDisabled={true}
									/>
								</div>
							</div>
						</FieldGroup>
					))}
					<PrimaryButton disabled={processing}>
						Submit
					</PrimaryButton>
				</form>
			</div>

			<div className='content-box'>
				<h1 className='text--title'>My Report</h1>
				<MyReportTable graduated={graduated} reports={reports} />
			</div>
		</>
  );
}

Index.layout = (page) => (
  <DashboardLayout title='My Profile' children={page} />
);
export default Index;
