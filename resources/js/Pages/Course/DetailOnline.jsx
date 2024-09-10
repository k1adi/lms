import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';

const DetailOnline = ({ course }) => {
  console.log(course, 'online')
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Training' },
    { link: route('training-online.index'), text: 'Online' },
	];

  return (
    <>
      <div className='content-box mb-2'>
        <Breadcrumb title={course.name} pageName={course.code} prevPage={prevPage} className='mb-1'/>
        <span>Trainer: {course.trainer}</span>
      </div>
    </>
  );
}

DetailOnline.layout = (page) => (
	<DashboardLayout title={page.props.course.name} children={page} />
);

export default DetailOnline;