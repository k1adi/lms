import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';


const Create = ({ depts, courses }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('tnas.index'), text: 'TNA' },
	];

  const [buId, setBuId] = useState(null);

  const { data, setData, post, errors, processing } = useForm({
		dept_id: null,
    course_id: null,
    objective: null,
    participant: 0,
    training_time: null,
    place: null,
    trainer: null,
	});

	const submit = (e) => {
		e.preventDefault();
		post(route('tnas.store'))
	}

  return (
    <div className='content-box'>
			<Breadcrumb title='Create TNA' pageName='Create' prevPage={prevPage} />

			<form onSubmit={submit} className='w-full'>
        <FieldGroup 
					label='Business Unit'
					error={errors.bu_id}
					isPrimary={true}
				>
					<Select
            options={convertOptions(depts)}
            value={data.course_id}
            onChange={(option) => setData('course_id', option)}
          />
				</FieldGroup>

        <FieldGroup 
					label='Course'
					name='course'
					error={errors.course_id}
					isPrimary={true}
				>
					<Select
            options={convertOptions(courses)}
            value={data.course_id}
            onChange={(option) => setData('course_id', option)}
          />
				</FieldGroup>
      </form>
    </div>
  );
}

Create.layout = page => (
  <DashboardLayout title='TNA Create' children={page} />
)

export default Create;