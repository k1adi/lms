import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';

const Index = ({ users, auth }) => {	
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
			{auth.permissions.includes('user_create') && 
				<Link className="btn btn--primary" href={route('users.create')}> Create </Link>
			}

			<div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr>
							<th className='table--number'>No.</th>
							<th>Full Name</th>
							<th>Username</th>
							<th>Email</th>
							<th>Role</th>
							<th>BU</th>
							<th>Position</th>
							{(auth.permissions.includes('user_edit') || auth.permissions.includes('user_delete')) && 
								<th className='table--action'>Action</th>
							}
						</tr>
					</thead>
					<tbody>
						{users.data.length !== 0 ?
							users.data.map((key, index) => (
								<tr key={index} className='group py-2'>
									<td className='group-hover:text-sky-400'>{index + 1}</td>
									<td className='group-hover:text-sky-400'>{key.full_name}</td>
									<td className='group-hover:text-sky-400'>{key.username}</td>
									<td className='group-hover:text-sky-400'>{key.email}</td>
									<td className='break-word'>
										{key.role.map(list => (
											<span className={`label label--${list.name.toLowerCase()}`} key={list.name}> {list.name} </span>
										))}
									</td>
									<td className='break-word'>
										{key.pivot.bu.map(list => (
											<span className='label label--secondary group-hover:bg-sky-100 group-hover:dark:bg-sky-400' key={list.code}> {list.code} </span>
										))}
									</td>
									<td className='break-word'>
										{key.pivot.positions.map(list => (
											<span className='label label--secondary group-hover:bg-sky-100 group-hover:dark:bg-sky-400' key={list.name}> {list.name} </span>
										))}
									</td>
									{(auth.permissions.includes('user_edit') || auth.permissions.includes('user_delete')) && 
										<td className='table--action'>
											{auth.permissions.includes('user_edit') &&
												<Link href={route('users.edit', key.id)} className='text-warning'> 
													<Pencil className='inline-block mb-1' size={14} /> Edit
												</Link>
											}
											{auth.permissions.includes('user_delete') &&
												<button className="text-red-600 ml-2" type='button' onClick={() => onDelete(key.id)}>
													<Trash2 className='inline-block mb-1' size={14} /> Delete
												</button>
											}
										</td>
									}
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