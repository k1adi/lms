import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';
import LocalizationDate from '@/Utils/LocalizationDate';

const Index = ({ schedules, auth }) => {
	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
	];

	const onDelete = (id) => {
		if (confirm('Are you sure you want to delete this schedule?')) {
			router.delete(route('schedules.destroy', id));
		}
	}

  return (
    <div className='content-box'>
      <Breadcrumb pageName='Schedules' prevPage={prevPage} />
			{auth.permissions.includes('schedule_create') && 
				<Link className="btn btn--primary" href={route('schedules.create')}> Create </Link>
			}

      <div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr>
							<th className="table--number">No.</th>
							<th>Course</th>
							<th>Description</th>
							<th>Start Time</th>
							<th>End Time</th>
							{(auth.permissions.includes('schedule_edit') || auth.permissions.includes('schedule_delete')) && 
								<th className='table--action'>Action</th>
							}
						</tr>
					</thead>
					<tbody>
						{schedules.data.length !== 0 ?
							schedules.data.map((key, index) => (
								<tr key={index} className='py-2'>
									<td>{index + 1}</td>
									<td>{key.course.name}</td>
									<td>{key.desc}</td>
									<td>{LocalizationDate(key.start_time, 'en')}</td>
									<td>{LocalizationDate(key.end_time, 'en')}</td>
									{(auth.permissions.includes('schedule_edit') || auth.permissions.includes('schedule_delete')) && 
										<td className='table--action'>
											{auth.permissions.includes('schedule_edit') &&
												<Link href={route('schedules.edit', key.id)} className='text-warning mr-2'> 
													<Pencil className='inline-block mb-1' size={14} /> Edit
												</Link>
											}
											{auth.permissions.includes('schedule_delete') &&
												<button className='text-red-600' type='button' onClick={() => onDelete(key.id)}>
													<Trash2 className='inline-block mb-1' size={14} /> Delete
												</button>
											}
										</td>
									}
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

Index.layout = page => (
  <DashboardLayout title='Schedules' children={page} />
);

export default Index;