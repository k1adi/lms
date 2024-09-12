import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import onDeleteData from '@/Utils/DeleteData';
import { Pencil, Trash2 } from 'lucide-react';

const Index = ({ bus, auth }) => {
	console.log('bu use button util canDelete');

	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Setting' },
	];

	// const onDelete = (id, canDelete) => {
	// 	if(!canDelete) {
	// 		alert('Business Unit cannot be deleted!')
	// 		return ;
	// 	}

	// 	if (confirm('Are you sure want to delete this business unit?')) {
	// 		router.delete(route('bus.destroy', id));
	// 	}
	// }

	return (
		<div className='content-box'>
			<Breadcrumb pageName='Business Unit' prevPage={prevPage} />
			{auth.permissions.includes('bu_create') && 
				<Link className='btn btn--primary' href={route('bus.create')}> Create </Link>
			}

			<div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr>
							<th className='table--number'>No.</th>
							<th>Code</th>
							<th>Name</th>
							<th>Position</th>
							{(auth.permissions.includes('bu_edit') || auth.permissions.includes('bu_delete')) && 
								<th className='table--action'>Action</th>
							}
						</tr>
					</thead>
					<tbody>
						{bus.data.length !== 0 ?
							bus.data.map((key, index) => (
								<tr key={index} className='group py-2'>
									<td className='group-hover:text-sky-400'> {index + 1} </td>
									<td className='group-hover:text-sky-400'> {key.code} </td>
									<td className='group-hover:text-sky-400'> {key.name} </td>
									<td className='break-word'>
										{key.positions.map(list => (
											<span className='label label--secondary group-hover:bg-sky-100 group-hover:dark:bg-sky-400' key={list.name}> {list.name} </span>
										))}
									</td>
									{(auth.permissions.includes('bu_edit') || auth.permissions.includes('bu_delete')) && 
										<td className='table--action'>
											{auth.permissions.includes('bu_edit') &&
												<Link href={route('bus.edit', key.id)} className='text-warning'> 
													<Pencil className='inline-block mb-1' size={14} /> Edit
												</Link>
											}
											{auth.permissions.includes('bu_delete') &&
												<button className="text-red-600 ml-2" type='button' onClick={() => onDeleteData({
													route: route('bus.destroy', key.id), 
													data: 'Business Unit', 
													canDelete: key.canDelete
												})}>
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
	<DashboardLayout title='Business Unit' children={page} />
);

export default Index;