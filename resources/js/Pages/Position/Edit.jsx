import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, position }) {
	const { data, setData, patch, errors, processing } = useForm({
		name: position.name,
	});

	const submit = (e) => {
		e.preventDefault();

		patch(route('positions.update', position));
	}

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Position Edit</h2>}
		>
			<Head title="Position Edit" />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
						<form onSubmit={submit} className="space-y-6 max-w-xl">
							<div>
								<InputLabel htmlFor="name" value="Name" />

								<TextInput
									id="name"
									className="mt-1 block w-full"
									value={data.name}
									onChange={(e) => setData('name', e.target.value)}
									required
									isFocused
									autoComplete="name"
									placeholder="Position Name"
								/>

								<InputError className="mt-2" message={errors.name} />
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