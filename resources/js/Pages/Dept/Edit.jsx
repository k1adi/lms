import React from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectOption from '@/Components/SelectOption';
import PrimaryButton from '@/Components/PrimaryButton';



// export default function EditDept({ auth, dept, bus }) {	
// 	const { data, setData, patch, errors, processing } = useForm({
// 		bu_id: dept.bu_id,
// 		code: dept.code,
// 		name: dept.name,
// 	});

// 	const submit = (e) => {
// 		e.preventDefault();

// 		patch(route('depts.update', dept));
// 	}

// 	return (
// 		<AuthenticatedLayout
// 			user={auth.user}
// 			header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Department Update</h2>}
// 		>
// 			<Head title="Department Update" />

// 			<div className="py-12">
// 				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
// 					<div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
// 						<form onSubmit={submit} className="space-y-6 max-w-xl">
// 							<div>
// 								<InputLabel htmlFor="bu" value="Business Unit" />
								
// 								<SelectOption 
// 									id="bu"
// 									className="mt-1 block w-full"
// 									currentValue={data.bu_id}
// 									onChange={(e) => setData('bu_id', +e.target.value)}
// 									options={bus?.map(key => (
// 										{value: key.id, label: key.name}
// 									))}
// 									required
// 								/>
// 								<InputError className="mt-2" message={errors.bu_id} />
// 							</div>
// 							<div>
// 								<InputLabel htmlFor="code" value="Code" />

// 								<TextInput
// 									id="code"
// 									className="mt-1 block w-full"
// 									value={data.code}
// 									onChange={(e) => setData('code', e.target.value)}
// 									required
// 									autoComplete="code"
// 									placeholder="Business Unit Code"
// 								/>

// 								<InputError className="mt-2" message={errors.code} />
// 							</div>
// 							<div>
// 								<InputLabel htmlFor="name" value="Name" />

// 								<TextInput
// 									id="name"
// 									className="mt-1 block w-full"
// 									value={data.name}
// 									onChange={(e) => setData('name', e.target.value)}
// 									required
// 									autoComplete="name"
// 									placeholder="Business Unit Name"
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
