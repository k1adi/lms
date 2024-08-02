import React from 'react';
import { Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil } from 'lucide-react';

const Index = ({ courses, schedules }) => {
  console.log(courses, 'course access')
  console.log(schedules, 'schedule access')

	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Setting' },
	];

	return (
    <>
      <section className='content-box mb-3'>
        <Breadcrumb pageName='Access' prevPage={prevPage} className='mb-0' />
      </section>
      <section className='content-box mb-3'>
        <div className='flex flex-row items-center justify-between mb-3'>
          <h1 className='text--title'>Course Access</h1>
          <Link className='btn btn--primary' href={route('bus.create')}> Add Access </Link>
        </div>
      </section>

      <section className='content-box'>
        <div className='flex flex-row items-center justify-between mb-3'>
          <h1 className='text--title'>Schedule Access</h1>
          <Link className='btn btn--primary' href={route('bus.create')}> Add Access </Link>
        </div>
      </section>
    </>
	);
}

Index.layout = (page) => (
	<DashboardLayout title='Business Unit' children={page} />
);

export default Index;