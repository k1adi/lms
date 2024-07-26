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
		{ link: route('roles.index'), text: 'Role' },
	];

	const { data, setData, post, errors, processing } = useForm({
		name: '',
	});

	const submit = (e) => {
		e.preventDefault();

		post(route('roles.store'))
	}

	return (
		<div className='content-box'>
			<Breadcrumb title='Create Role' pageName='Create' prevPage={prevPage} />

			<form onSubmit={submit} className="w-full">
				<FieldGroup 
					label='Role Name'
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
						isFocused
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
	<DashboardLayout title='Create Role' children={page} />
);

export default Create;

// export default function CreateRole({ auth }) {
// 	const { data, setData, post, errors, processing } = useForm({
// 		name: '',
// 	});

// 	const submit = (e) => {
// 		e.preventDefault();

// 		post(route('roles.store'))
// 	}

// 	return (
// 		<AuthenticatedLayout
// 			user={auth.user}
// 			header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Role Create</h2>}
// 		>
// 			<Head title="Role Create" />

// 			<div className="py-12">
// 				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
// 					<div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
// 						<form onSubmit={submit} className="space-y-6 max-w-xl">
// 							<div>
// 								<InputLabel htmlFor="name" value="Name" />

// 								<TextInput
// 									id="name"
// 									className="mt-1 block w-full"
// 									value={data.name}
// 									onChange={(e) => setData('name', e.target.value)}
// 									required
// 									isFocused
// 									autoComplete="name"
// 									placeholder="Role Name"
// 								/>

// 								<InputError className="mt-2" message={errors.name} />
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
