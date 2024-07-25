import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';

const Index = ({ users }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Setting' },
	];

	const onDelete = (id) => {
		if (confirm('Are you sure you want to delete this user?')) {
			router.delete(route('users.destroy', id));
		}
	}

	return (
		<div className='content-box'>
			<Breadcrumb pageName='Users' prevPage={prevPage} />
			<Link className="btn btn--primary" href={route('users.create')}> Create </Link>

			<div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr>
							<th className="table__column--number">No.</th>
							<th>Name</th>
							<th>Username</th>
							<th>Email</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{users.data.length !== 0 ?
							users.data.map((key, index) => (
								<tr key={index} className='py-2'>
										<td>{index + 1}</td>
										<td>{key.full_name}</td>
										<td>{key.username}</td>
										<td>{key.email}</td>
									<td>
										<Link href={route('users.edit', key.id)} className='text-warning'> 
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
	<DashboardLayout title='Users' children={page} />
);

export default Index;