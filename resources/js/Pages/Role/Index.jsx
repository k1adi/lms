import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';

const Index = ({ roles }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Setting' },
	];

	const onDelete = (id) => {
		if (confirm('Are you sure you want to delete this role?')) {
			router.delete(route('roles.destroy', id));
		}
	}

	return (
		<div className='content-box'>
			<Breadcrumb pageName='Roles' prevPage={prevPage} />
			<Link className="btn btn--primary" href={route('roles.create')}> Create </Link>

			<div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr>
							<th className="table--number">No.</th>
							<th>Name</th>
							<th>Permission</th>
							<th className='table--action'>Action</th>
						</tr>
					</thead>
					<tbody>
						{roles.data.length !== 0 ?
							roles.data.map((key, index) => (
								<tr key={index} className='group py-2'>
									<td className='group-hover:text-sky-400'>{index + 1}</td>
									<td className='group-hover:text-sky-400'>{key.name}</td>
									<td className='break-word'>
										{key.has_permission.map(list => (
											<span className='label label--secondary group-hover:bg-sky-100 group-hover:dark:bg-sky-400' key={list.name}> {list.name} </span>
										))}
									</td>
									<td className='table--action'>
										<Link href={route('roles.edit', key.id)} className='text-warning mr-2'> 
											<Pencil className='inline-block mb-1' size={14} /> Edit
										</Link>
										<button className="text-red-600" type="button" tabIndex={-1} onClick={() => onDelete(key.id)}>
											<Trash2 className='inline-block mb-1' size={14} /> Delete
										</button>
									</td>
								</tr>
							)) :
							<tr>
								<td colSpan={3}>Empty data</td>
							</tr>
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}

Index.layout = (page) => (
	<DashboardLayout title='Roles' children={page} />
);

export default Index;