import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';

const Index = ({ tes }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Assignment' },
	];

	const onDelete = (id) => {
		if (confirm('Are you sure you want to delete this Tes?')) {
			router.delete(route('tets.destroy', id));
		}
	}

  return (
    <div className='content-box'>
      <Breadcrumb pageName='Test' prevPage={prevPage} />
			<Link className="btn btn--primary me-2" href={route('tests.create')}> Create </Link>
			<Link className="btn btn--primary" href={route('tests.observation')}> Observation </Link>

    </div>
  );
}

Index.layout = (page) => (
  <DashboardLayout title='Tes' children={page} />
)

export default Index;