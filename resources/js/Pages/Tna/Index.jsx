import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';

const Index = ({ tnas, auth }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Assignment' },
	];

	const onDelete = (id) => {
		if (confirm('Are you sure you want to delete this TNA?')) {
			router.delete(route('tnas.destroy', id));
		}
	}

  return (
    <div className='content-box'>
      <Breadcrumb pageName='TNA' prevPage={prevPage} />
			<Link className="btn btn--primary" href={route('tnas.create')}> Create </Link>

      <div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr>
							<th className="table__column--number">No.</th>
							<th>BU</th>
							<th>User</th>
							<th>Title</th>
							<th>Goal</th>
							<th>Start Time</th>
              {(auth.permissions.includes('tna_edit') || auth.permissions.includes('tna_delete')) && 
								<th className='table--action'>Action</th>
							}
						</tr>
					</thead>
          <tbody>
            {tnas.data.length !== 0 ?
							tnas.data.map((key, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{key.bu}</td>
									<td>{key.user}</td>
									<td>{key.title}</td>
									<td>{key.goal}</td>
									<td>{key.start_time}</td>
									{(auth.permissions.includes('tna_edit') || auth.permissions.includes('tna_delete')) && 
										<td className='table--action'>
											{auth.permissions.includes('tna_edit') &&
												<Link href={route('tnas.edit', key.id)} className='text-warning'> 
													<Pencil className='inline-block mb-1' size={14} /> Edit
												</Link>
											}
											{auth.permissions.includes('tna_delete') &&
												<button className="text-red-600 ml-2" type='button' onClick={() => onDelete(key.id)}>
													<Trash2 className='inline-block mb-1' size={14} /> Delete
												</button>
											}
										</td>
									}
								</tr>
							)) :
							<tr className='text-center'>
								<td colSpan={7}>Empty data</td>
							</tr>
						}
          </tbody>
				</table>
			</div>
    </div>
  );
}

Index.layout = (page) => (
  <DashboardLayout title='TNA' children={page} />
);

export default Index;