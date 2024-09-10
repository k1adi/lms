import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';

const DetailOffline = ({ course }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Training' },
		{ link: route('training-offline.index'), text: 'Offline' },
	];

  return (
    <>
      <div className='content-box mb-2'>
        <Breadcrumb title={course.name} pageName={course.code} prevPage={prevPage} className='mb-0'/>
        <span>Trainer: {course.trainer}</span>

        <p className='mt-8'>
          {course.description}
        </p>

        {course.url_attachment &&
          <a href={course.url_attachment} target='_blank' className='btn btn--primary mt-8'>
            Lampiran Pendukung
          </a>
        }
      </div>
    </>
  );
}

DetailOffline.layout = (page) => (
  <DashboardLayout title={page.props.course.name} children={page} />
);

export default DetailOffline;