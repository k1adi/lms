import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil } from 'lucide-react';

const Index = ({ bus }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Setting' },
	];

	return (
    <>
      <div className='content-box mb-3'>
        <Breadcrumb pageName='Access' prevPage={prevPage} className='mb-0' />
      </div>
      <div className='content-box mb-3'>
        <h1 className='text--title'>Course Access</h1>
      </div>

      <div className='content-box'>
        <h1 className='text--title'>Schedule Access</h1>
      </div>
    </>
	);
}

Index.layout = (page) => (
	<DashboardLayout title='Business Unit' children={page} />
);

export default Index;