import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectOption from '@/Components/SelectOption';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';

export default function CreateDept({ auth, bus }) {	
	const { data, setData, post, errors, processing } = useForm({
		bu_id: bus[0].id,
		code: '',
		name: '',
	});

	const submit = (e) => {
		e.preventDefault();

		post(route('depts.store'))
	}

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Department Create</h2>}
		>
			<Head title="Department Create" />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
						<form onSubmit={submit} className="space-y-6 max-w-xl">
							<div>
								<InputLabel htmlFor="bu" value="Business Unit" />
								
								<SelectOption 
									id="bu"
									className="mt-1 block w-full"
									currentValue={+data.bu_id}
									onChange={(e) => setData('bu_id', +e.target.value)}
									options={bus}
									required
								/>
								<InputError className="mt-2" message={errors.bu_id} />
							</div>
							<div>
								<InputLabel htmlFor="code" value="Code" />

								<TextInput
									id="code"
									className="mt-1 block w-full"
									value={data.code}
									onChange={(e) => setData('code', e.target.value)}
									required
									autoComplete="code"
									placeholder="Business Unit Code"
								/>

								<InputError className="mt-2" message={errors.code} />
							</div>
							<div>
								<InputLabel htmlFor="name" value="Name" />

								<TextInput
									id="name"
									className="mt-1 block w-full"
									value={data.name}
									onChange={(e) => setData('name', e.target.value)}
									required
									autoComplete="name"
									placeholder="Business Unit Name"
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
