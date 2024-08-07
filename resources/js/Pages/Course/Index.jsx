import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';

const Index = ({ courses }) => {
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
			<Link className="btn btn--primary" href={route('courses.create')}> Create </Link>
			
			<div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr>
							<th className="table__column--number">No.</th>
							<th>Name</th>
							<th>Type</th>
							<th>Trainer</th>
							<th>Action</th>
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
									<td>
										<Link href={route('courses.edit', key.id)} className='text-warning'> 
											<Pencil className='inline-block mb-1' size={14} /> Edit
										</Link>
										<button className="text-red-600 ml-2" type="button" tabIndex={-1} onClick={() => onDelete(key.id)}>
											<Trash2 className='inline-block mb-1' size={14} /> Delete
										</button>
									</td>
								</tr>
							)) :
							<tr>
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