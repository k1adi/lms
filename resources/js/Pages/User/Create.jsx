import React from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

const Create = () => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('users.index'), text: 'User' },
	];

	const { data, setData, post, errors, processing } = useForm({
		full_name: '',
    username: '',
    email: '',
    no_hp: '',
    no_nik: '',
    password: '',
	});

	const submit = (e) => {
		e.preventDefault();
		post(route('users.store'))
	}

	return (
		<div className='content-box'>
			<Breadcrumb title='Create User' pageName='Create' prevPage={prevPage} />
			<form onSubmit={submit} className="w-full">
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

				

				<PrimaryButton disabled={processing}>
					Submit
				</PrimaryButton>
			</form>
		</div>
	);
}

Create.layout = (page) => (
	<DashboardLayout title='User Create' children={page} />
);

export default Create;

// export default function CreateCourse({ auth }) {	
// 	const { data, setData, post, errors, processing } = useForm({
// 		full_name: '',
//     username: '',
//     email: '',
//     no_hp: '',
//     no_nik: '',
//     password: '',
// 	});

// 	const submit = (e) => {
// 		e.preventDefault();

// 		post(route('users.store'))
// 	}

// 	return (
// 		<AuthenticatedLayout
// 			user={auth.user}
// 			header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">User Create</h2>}
// 		>
// 			<Head title="User Create" />

// 			<div className="py-12">
// 				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
// 					<div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
// 						<form onSubmit={submit} className="space-y-6 max-w-xl">
//               <div>
// 								<InputLabel htmlFor="full_name" value="Full Name" />

// 								<TextInput
// 									id="full_name"
// 									className="mt-1 block w-full"
// 									value={data.full_name}
// 									onChange={(e) => setData('full_name', e.target.value)}
// 									required
// 									isFocused
// 									autoComplete="full_name"
// 									placeholder="Full Name"
// 								/>

// 								<InputError className="mt-2" message={errors.full_name} />
// 							</div>
// 							<div>
// 								<InputLabel htmlFor="username" value="Username" />

// 								<TextInput
// 									id="username"
// 									className="mt-1 block w-full"
// 									value={data.username}
// 									onChange={(e) => setData('username', e.target.value)}
// 									required
// 									autoComplete="username"
// 									placeholder="Username"
// 								/>

// 								<InputError className="mt-2" message={errors.username} />
// 							</div>
//               <div>
// 								<InputLabel htmlFor="email" value="Email" />

// 								<TextInput
// 									id="email"
//                   type="email"
// 									className="mt-1 block w-full"
// 									value={data.email}
// 									onChange={(e) => setData('email', e.target.value)}
//                   required
// 									autoComplete="email"
// 									placeholder="User Email"
// 								/>

// 								<InputError className="mt-2" message={errors.email} />
// 							</div>
//               <div>
// 								<InputLabel htmlFor="no_hp" value="Handphone" />

// 								<TextInput
// 									id="no_hp"
// 									className="mt-1 block w-full"
// 									value={data.no_hp}
// 									onChange={(e) => setData('no_hp', e.target.value)}
//                   required
// 									autoComplete="no_hp"
// 									placeholder="Handphone Number"
// 								/>

// 								<InputError className="mt-2" message={errors.no_hp} />
// 							</div>
// 							<div>
// 								<InputLabel htmlFor="no_nik" value="Identity Number" />
// 								<TextInput
// 									id="no_nik"
// 									className="mt-1 block w-full"
// 									value={data.no_nik}
// 									onChange={(e) => setData('no_nik', e.target.value)}
//                   required
// 									autoComplete="no_nik"
// 									placeholder="Employee Identify Number"
// 								/>
// 								<InputError className="mt-2" message={errors.no_nik} />
// 							</div>
// 							<div>
// 								<InputLabel htmlFor="password" value="Password" />
// 								<TextInput
// 									id="password"
//                   type="password"
// 									className="mt-1 block w-full"
// 									value={data.password}
// 									onChange={(e) => setData('password', e.target.value)}
//                   required
// 									autoComplete="password"
// 									placeholder="User Password"
// 								/>
// 								<InputError className="mt-2" message={errors.password} />
// 							</div>
// 							<PrimaryButton disabled={processing}>
// 								Submit
// 							</PrimaryButton>
// 						</form>
// 					</div>
// 				</div>
// 			</div>
// 		</AuthenticatedLayout>
// 	);
// }
