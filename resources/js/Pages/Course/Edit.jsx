import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';
import { Plus, Trash2 } from 'lucide-react';

const Edit = ({ course, courses }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('courses.index'), text: 'Courses' },
	];

	const { data, setData, patch, errors, processing } = useForm({
		name: course.name,
		type: {
			value: course.type,
			label: course.type.charAt(0).toUpperCase() + course.type.slice(1)
		},
		trainer: course.trainer,
		thumbnail: course.thumbnail,
		url_attachment: course.url_attachment,
		prerequisite: course.prerequisite ? {
			value: course.prerequisite_course.id,
			label: course.prerequisite_course.name,
		} : {},
		description: course.description,
		sections: course.type == 'online' ? course.sections.map(section => ({
			id: section.id,
			name: section.name,
			subsections: section.sub_section.map(subsection => ({
				id: subsection.id,
				section_id: subsection.section_id,
				name: subsection.name,
				url: subsection.url
			}))
		})) 
		: []
	});

	const handleAddSection = () => {
    setData('sections', [...data.sections, { name: '', subsections: [{ name: '', url: '' }] }]);
  };

  const handleRemoveSection = (secIndex) => {
    const sections = data.sections.filter((_, i) => i !== secIndex);
    setData('sections', sections);
  };

  const handleAddSubsection = (secIndex) => {
    const sections = [...data.sections];
    sections[secIndex].subsections.push({ name: '', url: '' });
    setData('sections', sections);
  };

  const handleRemoveSubsection = (secIndex, subIndex) => {
    const sections = [...data.sections];
    sections[secIndex].subsections = sections[secIndex].subsections.filter((_, i) => i !== subIndex);
    setData('sections', sections);
  };

	const submit = (e) => {
		e.preventDefault();

		patch(route('courses.update', course));
	}

	return (
		<form onSubmit={submit} className="w-full">
			<div className='content-box'>
				<Breadcrumb pageName='Edit Course' prevPage={prevPage} />

				{/* Course Name */}
				<FieldGroup 
					label='Course Name'
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
						isFocused={true}
						autoComplete="name"
						placeholder="Name..."
					/>
				</FieldGroup>

				{/* Course Type */}
				<FieldGroup 
					label='Course Type'
					name='type'
					error={errors.type}
					isPrimary={true}
				>
					<Select
						name='type'
						placeholder={'Select Type...'}
            options={[
							{value: 'offline', label: 'Offline'},
							{value: 'online', label: 'Online' }
						]}
            value={data.type}
            onChange={(option) => setData('type', option)}
						className="mt-1 block w-full"
						required
          />
				</FieldGroup>

				{/* Course Trainer */}
				<FieldGroup 
					label='Trainer Name'
					name='trainer'
					error={errors.trainer}
					isPrimary={true}
				>
					<TextInput
						name='trainer'
						className="mt-1 block w-full"
						value={data.trainer}
						required
						onChange={(e) => setData('trainer', e.target.value)}
						autoComplete="trainer"
						placeholder="Trainer..."
					/>
				</FieldGroup>

				{/* Course Thumbnail */}
				<FieldGroup 
					label='Course Intro'
					name='thumbnail'
					error={errors.thumbnail}
				>
					<TextInput
						type='url'
						name='thumbnail'
						className="mt-1 block w-full"
						value={data.thumbnail}
						onChange={(e) => setData('thumbnail', e.target.value)}
						autoComplete="thumbnail"
						placeholder="URL Video..."
					/>
				</FieldGroup>

				{/* Course Attachment */}
				<FieldGroup 
					label='Attachment'
					name='url_attachment'
					error={errors.url_attachment}
				>
					<TextInput
						type='url'
						name='url_atachment'
						className="mt-1 block w-full"
						value={data.url_atachment}
						onChange={(e) => setData('url_atachment', e.target.value)}
						autoComplete="url_atachment"
						placeholder="URL Attachment..."
					/>
				</FieldGroup>

				{/* Prerequisites */}
				<FieldGroup 
					label='Course Requirement'
					name='prerequisite'
					error={errors.prerequisite}
				>
					<Select
						name='prerequisite'
						placeholder={'Select Prerequisite'}
            options={convertOptions(courses)}
            value={data.prerequisite}
            onChange={(option) => setData('prerequisite', option)}
						className="mt-1 block w-full"
          />
				</FieldGroup>

				{/* Description */}
				<FieldGroup 
					label='Description'
					name='description'
					error={errors.description}
				>
					<TextArea
						id="description"
						className="mt-1 block w-full"
						value={data.description}
						onChange={(e) => setData('description', e.target.value)}
						autoComplete="description"
						placeholder="Description"
						rows={3}
					/>
				</FieldGroup>
			</div>

			{data.type.value == 'online' && (
				<div className='content-box mt-2'>
					<div className='flex flex-row items-center justify-between'>
						<h2 className='text--sub-heading'>Section</h2>
						<button className='btn btn--primary' type='button' onClick={handleAddSection}>
							<Plus />
						</button>
					</div>
				</div>
			)}

			{data.type.value == 'online' && data.sections.map((section, secIndex) => (
				<div className='content-box mt-2' key={secIndex}>
					<FieldGroup
						label='Section Name'
						name={`sections.${secIndex}.name`}
						error={errors[`sections.${secIndex}.name`]}
					>
						<div className='flex flex-row items-end gap-x-2'>
							<TextInput
								name={`sections.${secIndex}.name`}
								className="flex-1 mt-1"
								value={section.name}
								onChange={(e) => {
									const sections = [...data.sections];
									sections[secIndex].name = e.target.value;
									setData('sections', sections);
								}}
								placeholder="Section Name..."
							/>
							<button className='btn btn--danger' type='button' onClick={() => handleRemoveSection(secIndex)}>
								<Trash2 />
							</button>
						</div>
					</FieldGroup>

					<div className='flex flex-row items-center justify-between mt-5 mb-3'>
						<h2 className='text--sub-heading'>Sub Section</h2>
						<button className='btn-sm btn--primary' type='button' onClick={() => handleAddSubsection(secIndex)}>
							<Plus size={18} />
						</button>
					</div>

					{/* Sub Section List */}
					{section.subsections.map((subsection, subIndex) => (
						<div className='flex flex-row items-start gap-2 mt-2' key={subIndex}>
							<button className='btn btn--danger' type='button' onClick={() => handleRemoveSubsection(secIndex, subIndex)}>
								<Trash2 />
							</button>
							<div className='flex-1'>
								<TextInput
									name={`sections.${secIndex}.subsections.${subIndex}.name`}
									className="w-full"
									value={subsection.name}
									onChange={(e) => {
										const sections = [...data.sections];
										sections[secIndex].subsections[subIndex].name = e.target.value;
										setData('sections', sections);
									}}
									placeholder="Name..."
								/>
								<InputError message={errors[`sections.${secIndex}.subsections.${subIndex}.name`]} className="mt-2" />
							</div>

							<div className='flex-1'>
								<TextInput
									name={`sections.${secIndex}.subsections.${subIndex}.url`}
									className="w-full"
									value={subsection.url}
									onChange={(e) => {
										const sections = [...data.sections];
										sections[secIndex].subsections[subIndex].url = e.target.value;
										setData('sections', sections);
									}}
									placeholder="url..."
								/>
								<InputError message={errors[`sections.${secIndex}.subsections.${subIndex}.url`]} className="mt-2" />
							</div>
						</div>
					))}
				</div>
			))}

			<div className='content-box mt-2 text-center'>
				<PrimaryButton className='w-full justify-center' disabled={processing}>
					Submit
				</PrimaryButton>
			</div>
		</form>
	);
}

Edit.layout = page => (
	<DashboardLayout title='Course Edit' children={page} />
);

export default Edit;