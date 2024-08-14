import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';

const Index = ({ positions, auth }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Setting' },
	];

	const onDelete = (id) => {
    if (confirm('Are you sure you want to delete this position?')) {
      router.delete(route('positions.destroy', id));
    }
  }

	return (
		<div className='content-box'>
			<Breadcrumb pageName='Positions' prevPage={prevPage} />
			{auth.permissions.includes('position_create') && 
				<Link className="btn btn--primary" href={route('positions.create')}> Create </Link>
			}

			<div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr>
							<th className="table--number">No.</th>
							<th>Name</th>
							{(auth.permissions.includes('position_edit') || auth.permissions.includes('position_delete')) && 
								<th className='table--action'>Action</th>
							}
						</tr>
					</thead>
					<tbody>
						{positions.data.length !== 0 ?
							positions.data.map((key, index) => (
								<tr key={index} className='py-2'>
									<td>{index + 1}</td>
									<td>{key.name}</td>
									{(auth.permissions.includes('position_edit') || auth.permissions.includes('position_delete')) && 
										<td className='table--action'>
											{auth.permissions.includes('position_edit') &&
												<Link href={route('positions.edit', key.id)} className='text-warning'> 
													<Pencil className='inline-block mb-1' size={14} /> Edit
												</Link>
											}
											{auth.permissions.includes('position_delete') &&
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
	<DashboardLayout title='Positions' children={page} />
);

export default Index;