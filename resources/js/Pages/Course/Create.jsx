import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import SelectOption from '@/Components/SelectOption';
import PrimaryButton from '@/Components/PrimaryButton';

// const Create = () => {
// 	const { data, setData, post, errors, processing } = useForm({
// 		name: '',
// 		type: '',
// 		trainer: '',
// 		thumbnail: '',
// 		url_attachment: '',
// 		prerequisite: '',
// 		description: ''
// 	});

// 	const submit = (e) => {
// 		e.preventDefault();

// 		post(route('courses.store'))
// 	}

// 	return (
// 		<div className='content-box'>
// 			<Breadcrumb pageName='Course Create' prevPage={prevPage} />

// 		</div>
// 	);
// }

// Create.layout = (page) => (
// 	<DashboardLayout title='Courses' children={page} />
// );

// export default Create;

export default function CreateCourse({ auth, courses }) {	
	const { data, setData, post, errors, processing } = useForm({
		name: '',
    type: '',
    trainer: '',
    thumbnail: '',
    url_attachment: '',
    prerequisite: '',
    description: ''
	});

	const submit = (e) => {
		e.preventDefault();

		post(route('courses.store'))
	}

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Course Create</h2>}
		>
			<Head title="Course Create" />

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
									placeholder="Course Name"
								/>

								<InputError className="mt-2" message={errors.name} />
							</div>
							<div>
								<InputLabel htmlFor="type" value="Type" />
								
								<SelectOption 
									id="type"
									className="mt-1 block w-full"
									currentValue={data.type}
									onChange={(e) => setData('type', e.target.value)}
									options={[
                    {value: 'offline', label: 'Offline'},
                    {value: 'online', label: 'Online' }
                  ]}
									required
								/>
								<InputError className="mt-2" message={errors.type} />
							</div>
							<div>
								<InputLabel htmlFor="trainer" value="Trainer" />

								<TextInput
									id="trainer"
									className="mt-1 block w-full"
									value={data.trainer}
									onChange={(e) => setData('trainer', e.target.value)}
									required
									autoComplete="trainer"
									placeholder="Trainer Name"
								/>

								<InputError className="mt-2" message={errors.trainer} />
							</div>
              <div>
								<InputLabel htmlFor="thumbnail" value="Thumbnail" />

								<TextInput
									id="thumbnail"
									className="mt-1 block w-full"
									value={data.thumbnail}
									onChange={(e) => setData('thumbnail', e.target.value)}
									autoComplete="thumbnail"
									placeholder="Thumbnail"
								/>

								<InputError className="mt-2" message={errors.thumbnail} />
							</div>
              <div>
								<InputLabel htmlFor="url" value="Url Attachment" />

								<TextInput
									id="urL_attachment"
									className="mt-1 block w-full"
									value={data.url_attachment}
									onChange={(e) => setData('url_attachment', e.target.value)}
									autoComplete="url_attachment"
									placeholder="URL Attachment"
								/>

								<InputError className="mt-2" message={errors.url_attachment} />
							</div>
							<div>
								<InputLabel htmlFor="prerequisite" value="Require Course" />
								
								<SelectOption 
									id="prerequisite"
									className="mt-1 block w-full"
									currentValue={data.prerequisite}
									onChange={(e) => setData('prerequisite', e.target.value)}
									defaultOption={true}
									options={courses?.map(key => (
										{value: key.id, label: key.name}
									))}
								/>
								<InputError className="mt-2" message={errors.prerequisite} />
							</div>
							<div>
								<InputLabel htmlFor="description" value="Description" />
								
								<TextArea
									id="description"
									className="mt-1 block w-full"
									value={data.description}
									onChange={(e) => setData('description', e.target.value)}
									autoComplete="description"
									placeholder="Description"
									rows={3}
								/>
								<InputError className="mt-2" message={errors.description} />
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
