import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';

const Index = ({ permissions, auth }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Setting' },
	];

	const onDelete = (id) => {
    if (confirm('Are you sure you want to delete this permission?')) {
      router.delete(route('permissions.destroy', id));
    }
  }
	return (
		<div className='content-box'>
			<Breadcrumb pageName='Permissions' prevPage={prevPage} />
			{auth.permissions.includes('permission_create') && 
				<Link className="btn btn--primary" href={route('permissions.create')}> Create </Link>
			}

			<div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr>
							<th className="table--number">No.</th>
							<th>Name</th>
							{(auth.permissions.includes('permission_edit') || auth.permissions.includes('permission_delete')) && 
								<th className='table--action'>Action</th>
							}
						</tr>
					</thead>
					<tbody>
						{permissions.data.length !== 0 ?
							permissions.data.map((key, index) => (
								<tr key={index} className='py-2'>
									<td>{index + 1}</td>
									<td>{key.name}</td>
									{(auth.permissions.includes('permission_edit') || auth.permissions.includes('permission_delete')) && 
										<td className='table--action'>
											{auth.permissions.includes('permission_edit') &&
												<Link href={route('permissions.edit', key.id)} className='text-warning'> 
													<Pencil className='inline-block mb-1' size={14} /> Edit
												</Link>
											}
											{auth.permissions.includes('permission_delete') &&
												<button className="text-red-600 ml-2" type='button' onClick={() => onDelete(key.id)}>
													<Trash2 className='inline-block mb-1' size={14} /> Delete
												</button>
											}
										</td>
									}
								</tr>
							)) :
							<tr className='text-center'>
								<td colSpan={3}>Empty data</td>
							</tr>
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

Index.layout = (page) => (
	<DashboardLayout title='Permissions' children={page} />
);

export default Index;