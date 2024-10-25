import React from 'react';
import { router, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { BadgeCheck } from 'lucide-react';
import Alert from '@/Components/Alert/Alert';

const Online = ({ courses, flash }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Training' },
	];

  const{ auth: { user: { finisheds: graduated }}} = usePage().props;

  const handleRowClicked = (code) => {
    router.visit(route('training.online.detail', code));
  }

  return (
    <>
      {flash.success && (
        <Alert type='success' message={flash.success} />
      )}
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
                    <td className='group-hover:text-sky-400'><span>
                      {graduated.includes(key.id.toString()) && (
                        <BadgeCheck className='inline-block mr-2' />
                      )}
                      {key.name}
                    </span></td>
                    <td className='group-hover:text-sky-400'>{key.type}</td>
                    <td className='group-hover:text-sky-400'>{key.trainer}</td>
                    <td className='group-hover:text-sky-400'>{key.percentage}</td>
                  </tr>
                  )) :
                <tr className='text-center'>
                  <td colSpan={6}>Empty data</td>
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