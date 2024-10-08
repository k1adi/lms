import React from 'react';
import { Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import VideoPlayer from '@/Components/VideoPlayer';
import Alert from '@/Components/Alert/Alert';

const DetailOnline = ({ course, section, subSection, flash }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Training' },
    { link: route('training.online.index'), text: 'Online' },
	];

  const { name, code, trainer, description, thumbnail, url_attachment } = course.data;


  return (
    <>
      {flash.error && (
        <Alert type='error' title='Oops!' message={flash.error} btnText='Coba Lagi!' />
      )}
      <div className='content-box mb-2'>
        <Breadcrumb title={name} pageName={code} prevPage={prevPage} className='mb-1'/>
        <span>Trainer: {trainer}</span>
      </div>

      <div className='content-box'>
        {thumbnail && (
          <VideoPlayer url={thumbnail}/>
        )}

        <p className='my-4'>{description}</p>
        
        {url_attachment && (
          <div className='mb-4'>
            <p className='font-bold mb-1'>Lampiran Pendukung</p>
            <a href={url_attachment} target='_blank' className='btn btn--primary'>
              Lihat lampiran
            </a>
          </div>
        )}

        <div className='flex flex-wrap items-end justify-between'>
          <Link href={route('training.online.index')} className='btn btn--secondary'>
            Kembali
          </Link>

          <Link href={
            route('training.online.section', {
              code: code, 
              section: section, 
              sub_section: subSection
            })} 
            className='btn btn--secondary'
          >
            Selanjutnya
          </Link>
        </div>
      </div>
    </>
  );
}

DetailOnline.layout = (page) => (
	<DashboardLayout title={page.props.course.data.name} children={page} />
);

export default DetailOnline;