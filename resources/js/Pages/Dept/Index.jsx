import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';

const Index = ({ depts }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Setting' },
	];

	const onDelete = (id) => {
		if (confirm('Are you sure you want to delete this department?')) {
			router.delete(route('depts.destroy', id));
		}
	}

	return (
		<div className='content-box'>
			<Breadcrumb pageName='Department' prevPage={prevPage} />

			<Link className="btn btn--primary" href={route('depts.create')}> Create </Link>

			<div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr>
							<th className="table--number">No.</th>
							<th>Code</th>
							<th>Name</th>
							<th>BU</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{depts.data.length !== 0 ?
							depts.data.map((key, index) => (
								<tr key={index} className='py-2'>
									<td>{index + 1}</td>
									<td>{key.code}</td>
									<td>{key.name}</td>
									<td>{key.bu.name}</td>
									<td>
										<Link href={route('depts.edit', key.id)} className='text-warning'> 
											<Pencil className='inline-block mb-1' size={14} /> Edit
										</Link>
										<button className="text-red-600 ml-2" type="button" tabIndex={-1} onClick={() => onDelete(key.id)}>
											<Trash2 className='inline-block mb-1' size={14} /> Delete
										</button>
									</td>
								</tr>
							)) :
							<tr>
								<td colSpan={4}>Empty data</td>
							</tr>
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}

Index.layout = (page) => (
	<DashboardLayout title='Department' children={page} />
);

export default Index;