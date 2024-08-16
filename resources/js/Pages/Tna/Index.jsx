import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';

const Index = ({ tnas }) => {

  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Analyze' },
	];

	const onDelete = (id) => {
		if (confirm('Are you sure you want to delete this course?')) {
			router.delete(route('courses.destroy', id));
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
							<th>Dept</th>
							<th>Course</th>
							<th>Goal</th>
							<th>Start Time</th>
              <th>Action</th>
						</tr>
					</thead>
          <tbody>
            {tnas.data.length !== 0 ?
							tnas.data.map((key, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{key.dept.bu.name}</td>
									<td>{key.dept.name}</td>
									<td>{key.course.name}</td>
									<td>{key.objective}</td>
									<td>{key.training_time}</td>
									<td>
										<Link href={route('tnas.edit', key.id)} className='text-warning mr-2'> 
											<Pencil className='inline-block mb-1' size={14} /> Edit
										</Link>
										<button className="text-red-600" type="button" onClick={() => onDelete(key.id)}>
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
  <DashboardLayout title='TNA' children={page} />
);

export default Index;