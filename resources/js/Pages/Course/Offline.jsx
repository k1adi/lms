import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';

const Offline = ({ courses }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Training' },
	];

  const handleRowClicked = (code) => {
    router.visit(route('training.offline.detail', code));
  }

  return (
    <>
      <div className='content-box mb-2'>
        <Breadcrumb pageName='Offline Training' prevPage={prevPage} className='mb-0'/>
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

Offline.layout = (page) => (
	<DashboardLayout title='Offline Training' children={page} />
);

export default Offline;