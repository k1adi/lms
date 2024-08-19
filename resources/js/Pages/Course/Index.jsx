import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';

const Index = ({ courses, auth }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Setting' },
	];

	const onDelete = (id) => {
		if (confirm('Are you sure you want to delete this course?')) {
			router.delete(route('courses.destroy', id));
		}
	}

	return (
		<div className='content-box'>
			<Breadcrumb pageName='Courses' prevPage={prevPage} />
			{auth.permissions.includes('course_create') && 
				<Link className='btn btn--primary' href={route('courses.create')}> Create </Link>
			}
			
			<div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr>
							<th className="table__column--number">No.</th>
							<th>Name</th>
							<th>Type</th>
							<th>Trainer</th>
							{(auth.permissions.includes('course_edit') || auth.permissions.includes('course_delete')) && 
								<th className='table--action'>Action</th>
							}
						</tr>
					</thead>
					<tbody>
						{courses.data.length !== 0 ?
							courses.data.map((key, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{key.name}</td>
									<td>{key.type}</td>
									<td>{key.trainer}</td>
									{(auth.permissions.includes('course_edit') || auth.permissions.includes('course_delete')) && 
										<td className='table--action'>
											{auth.permissions.includes('course_edit') &&
												<Link href={route('courses.edit', key.id)} className='text-warning'> 
													<Pencil className='inline-block mb-1' size={14} /> Edit
												</Link>
											}
											{auth.permissions.includes('course_delete') &&
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
	<DashboardLayout title='Courses' children={page} />
);

export default Index;