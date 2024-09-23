import React from 'react';
import { Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';

const DetailOffline = ({ course }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Training' },
		{ link: route('training.offline.index'), text: 'Offline' },
	];

  const { name, code, trainer, description, url_attachment, assignment } = course.data;

  return (
    <>
      <div className='content-box mb-2'>
        <Breadcrumb title={name} pageName={code} prevPage={prevPage} className='mb-0'/>
        <span>Trainer: {trainer}</span>

        <p className='mt-8 mb-4'>
          {description}
        </p>

        <div className='flex flex-wrap items-end justify-between'>
          {url_attachment && (
            <div>
              <p className='font-bold mb-1'>Lampiran Pendukung</p>
              <a href={url_attachment} target='_blank' className='btn btn--primary'>
                Lihat lampiran
              </a>
            </div>
          )}

          {assignment.length !== 0 && 
            <Link href={route('training.test', assignment?.code)} className='btn btn--danger'>
              Mulai Ujian
            </Link>
          }
        </div>
      </div>
    </>
  );
}

DetailOffline.layout = (page) => (
  <DashboardLayout title={page.props.name} children={page} />
);

export default DetailOffline;