import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';

const Index = ({ auth, assignments }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Assignment' },
	];

	const onDelete = (id) => {
		if (confirm('Are you sure you want to delete this Tes?')) {
			router.delete(route('tests.destroy', id));
		}
	}

  return (
    <div className='content-box'>
      <Breadcrumb pageName='Test' prevPage={prevPage} />
			{auth.permissions.includes('assignment_create') && 
				<Link className="btn btn--primary me-2" href={route('tests.create')}> Create </Link>
			}
			{auth.permissions.includes('observation_create') && 
				<Link className="btn btn--primary" href={route('observation.create')}> Observation </Link>
			}
			<div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr>
							<th className="table--number">No.</th>
							<th>Code</th>
							<th>Course</th>
							<th>Type</th>
							{(auth.permissions.includes('assignment_edit') || auth.permissions.includes('assignment_delete')) && 
								<th className='table--action'>Action</th>
							}
						</tr>
					</thead>
					<tbody>
						{assignments.data.length !== 0 ? 
							assignments.data.map((key, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{key.code}</td>
									<td>{key.course.name}</td>
									<td>{key.type}</td>
									{(auth.permissions.includes('assignment_edit') || auth.permissions.includes('assignment_delete')) && 
										<td className='table--action'>
											{auth.permissions.includes('assignment_edit') &&
												<Link href={route('tests.edit', key.id)} className='text-warning'> 
													<Pencil className='inline-block mb-1' size={14} /> Edit
												</Link>
											}
											{auth.permissions.includes('assignment_delete') &&
												<button className="text-red-600 ml-2" type='button' onClick={() => onDelete(key.id)}>
													<Trash2 className='inline-block mb-1' size={14} /> Delete
												</button>
											}
										</td>
									}
								</tr>
							)) : 
							<tr className='text-center'>
								<td colSpan={5}>Empty data</td>
							</tr>	
						}
					</tbody>
				</table>
			</div>
    </div>
  );
}

Index.layout = (page) => (
  <DashboardLayout title='Tes' children={page} />
)

export default Index;