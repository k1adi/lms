import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';

const Online = ({ courses }) => {
  console.log(courses, 'training online');

  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Training' },
	];

  const handleRowClicked = (code) => {
    router.visit(route('training.online.detail', code));
  }

  return (
    <>
      <div className='content-box mb-2'>
        <Breadcrumb pageName='Online Training' prevPage={prevPage} className='mb-0' />
      </div>

      <div className='content-box'>
        <div className='overflow-x-auto'>
          <table className='table'>
            <thead>
              <tr>
                <th className="table--number">No.</th>
                <th>Code</th>
                <th>Name</th>
                <th>Type</th>
                <th>Trainer</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {courses.data.length !== 0 ?
                courses.data.map((key, index) => (
                  <tr key={index} onClick={() => handleRowClicked(key.code)} className='group cursor-pointer'>
                    <td className='group-hover:text-sky-400'>{index + 1}</td>
                    <td className='group-hover:text-sky-400'>{key.code}</td>
                    <td className='group-hover:text-sky-400'>{key.name}</td>
                    <td className='group-hover:text-sky-400'>{key.type}</td>
                    <td className='group-hover:text-sky-400'>{key.trainer}</td>
                    <td className='group-hover:text-sky-400'>{key.progress} / {key.total_sub_section} ({key.percentage})</td>
                  </tr>
                )) :
                <tr className='text-center'>
                  <td colSpan={4}>Empty data</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

Online.layout = (page) => (
	<DashboardLayout title='Online Training' children={page} />
);

export default Online;