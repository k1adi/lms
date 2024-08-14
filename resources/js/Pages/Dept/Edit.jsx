import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import SelectOption from '@/Components/SelectOption';
import PrimaryButton from '@/Components/PrimaryButton';
import convertOptions from '@/Utils/ReactSelectOption';

const Edit = ({ dept, bus }) => {	
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('depts.index'), text: 'Depts' },
	];

  const { data, setData, patch, errors, processing } = useForm({
		bu_id: {
      value: dept.bu.id,
      label: dept.bu.name
    },
    code: dept.code,
    name: dept.name,
  });

  const submit = (e) => {
    e.preventDefault();

    patch(route('depts.update', dept));
  }

  return (
    <div className='content-box'>
      <Breadcrumb title='Edit Department' pageName='Edit' prevPage={prevPage} />

      <form onSubmit={submit} className="w-full">
				<FieldGroup 
					label='Business Unit'
					name='bu'
					error={errors.bu_id}
					isPrimary={true}
				>
					<Select
            options={convertOptions(bus)}
            value={data.bu_id}
            onChange={(option) => setData('bu_id', option)}
						className="mt-1 block w-full"
						required
          />
				</FieldGroup>

				<FieldGroup 
					label='Department Code'
					name='code'
					error={errors.code}
					isPrimary={true}
				>
					<TextInput
						name='code'
						className="mt-1 block w-full"
						value={data.code}
						onChange={(e) => setData('code', e.target.value)}
						required
						autoComplete="code"
						placeholder="Dept Code..."
					/>
				</FieldGroup>

				<FieldGroup 
					label='Department Name'
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

Edit.layout = (page) => (
  <DashboardLayout title='Dept Edit' children={page} />
);

export default Edit;