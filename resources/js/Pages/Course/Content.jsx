import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';

const Content = ({ course, section, lesson }) => {
  const prevPage = [
    { link: route('training-online.index'), text: 'Training' },
    { link: route('training-online.detail', {code: course.code}), text: course.name },
    { link: '#', text: section.name },
	];

  return (
    <>
      <div className='content-box mb-2'>
        <Breadcrumb title={lesson.name} pageName={lesson.name} prevPage={prevPage} className='mb-1'/>
      </div>
    </>
  );
}

Content.layout = (page) => (
	<DashboardLayout title='Course Content' children={page} />
);

export default Content;