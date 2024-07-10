import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';

export default function CreateCourse({ auth, user }) {	
	const { data, setData, patch, errors, processing } = useForm({
		full_name: user.full_name,
    username: user.username,
    email: user.email,
    no_hp: user.no_hp,
    no_nik: user.no_nik,
    password: user.password,
	});

	const submit = (e) => {
		e.preventDefault();

		patch(route('users.update', user))
	}

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">User Update</h2>}
		>
			<Head title="User Update" />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
						<form onSubmit={submit} className="space-y-6 max-w-xl">
              <div>
								<InputLabel htmlFor="full_name" value="Full Name" />

								<TextInput
									id="full_name"
									className="mt-1 block w-full"
									value={data.full_name}
									onChange={(e) => setData('full_name', e.target.value)}
									required
									isFocused
									autoComplete="full_name"
									placeholder="Full Name"
								/>

								<InputError className="mt-2" message={errors.full_name} />
							</div>
							<div>
								<InputLabel htmlFor="username" value="Username" />

								<TextInput
									id="username"
									className="mt-1 block w-full"
									value={data.username}
									onChange={(e) => setData('username', e.target.value)}
									required
									autoComplete="username"
									placeholder="Username"
								/>

								<InputError className="mt-2" message={errors.username} />
							</div>
              <div>
								<InputLabel htmlFor="email" value="Email" />

								<TextInput
									id="email"
                  type="email"
									className="mt-1 block w-full"
									value={data.email}
									onChange={(e) => setData('email', e.target.value)}
                  required
									autoComplete="email"
									placeholder="User Email"
								/>

								<InputError className="mt-2" message={errors.email} />
							</div>
              <div>
								<InputLabel htmlFor="no_hp" value="Handphone" />

								<TextInput
									id="no_hp"
									className="mt-1 block w-full"
									value={data.no_hp}
									onChange={(e) => setData('no_hp', e.target.value)}
                  required
									autoComplete="no_hp"
									placeholder="Handphone Number"
								/>

								<InputError className="mt-2" message={errors.no_hp} />
							</div>
							<div>
								<InputLabel htmlFor="no_nik" value="Identity Number" />
								<TextInput
									id="no_nik"
									className="mt-1 block w-full"
									value={data.no_nik}
									onChange={(e) => setData('no_nik', e.target.value)}
                  required
									autoComplete="no_nik"
									placeholder="Employee Identify Number"
								/>
								<InputError className="mt-2" message={errors.no_nik} />
							</div>
							<div>
								<InputLabel htmlFor="password" value="Password" />
								<TextInput
									id="password"
                  type="password"
									className="mt-1 block w-full"
									value={data.password}
									onChange={(e) => setData('password', e.target.value)}
                  required
									autoComplete="password"
									placeholder="User Password"
								/>
								<InputError className="mt-2" message={errors.password} />
							</div>
							<PrimaryButton disabled={processing}>
								Submit
							</PrimaryButton>
						</form>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
