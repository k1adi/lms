import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';

const DetailOnline = ({ course }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Training' },
    { link: route('training.online.index'), text: 'Online' },
	];

  const { name, code, trainer, description, url_attachment, assignment } = course.data;


  return (
    <>
      <div className='content-box mb-2'>
        <Breadcrumb title={name} pageName={code} prevPage={prevPage} className='mb-1'/>
        <span>Trainer: {trainer}</span>
      </div>
    </>
  );
}

DetailOnline.layout = (page) => (
	<DashboardLayout title={page.props.course.data.name} children={page} />
);

export default DetailOnline;