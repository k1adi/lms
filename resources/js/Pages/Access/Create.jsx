import React from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import PrimaryButton from '@/Components/PrimaryButton';
import CourseAccessForm from './Course/CourseAccessForm';
import ScheduleAccessForm from './Schedule/ScheduleAccessForm';

const Create = ({ page, datas, access }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('access.index'), text: 'Access' },
		{ link: '#', text: page },
	];

  const { data, setData, post, errors, processing } = useForm({
		page: page.toLowerCase(),
    datas: '',
    access: '',
	});

	const submit = (e) => {
		e.preventDefault();
		post(route('access.store'));
	}

  return (
    <div className='content-box'>
      <Breadcrumb title={`Create ${page} Access`} pageName='Create' prevPage={prevPage} />

      <form onSubmit={submit} className='w-full'>
        { page === 'Course' && (
          <CourseAccessForm datas={datas} access={access} data={data} setData={setData} errors={errors} />
        )}

        { page === 'Schedule' && (
          <ScheduleAccessForm datas={datas} access={access} data={data} setData={setData} errors={errors} />
        )}

        <PrimaryButton disabled={processing}>
					Submit
				</PrimaryButton>
      </form>
    </div>
  );
}

Create.layout = (page) => (
  <DashboardLayout title={`Create ${page.props.page}  Access`} children={page} />
)

export default Create;