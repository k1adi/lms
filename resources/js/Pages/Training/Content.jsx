import React from 'react';
import ReactPlayer from 'react-player/youtube';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';

const Content = ({ course, section, lesson }) => {
  const { name, code } = course.data;

  const prevPage = [
    { link: route('training.online.index'), text: 'Training' },
    { link: route('training.online.detail', {code: code}), text: name },
    { link: '#', text: section.name },
	];

  return (
    <>
      <div className='content-box mb-2'>
        <Breadcrumb title={lesson.name} pageName={lesson.name} prevPage={prevPage} className='mb-1'/>
      </div>

      <div className='content-box'>
        <ReactPlayer url={lesson.url} controls={true}/>
      </div>
    </>
  );
}

Content.layout = (page) => (
	<DashboardLayout title='Course Content' children={page} />
);

export default Content;