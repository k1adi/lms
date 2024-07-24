import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';

const Index = ({ auth, positions}) => {
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

		</div>
	);
}

Index.layout = (page) => (
	<DashboardLayout title='Positions' children={page} />
);

export default Index;

// export default function IndexPosition({ auth, positions }) {
// 	function onDelete(id) {
//     if (confirm('Are you sure you want to delete this position?')) {
//       router.delete(route('positions.destroy', id));
//     }
//   }

// 	return (
// 		<AuthenticatedLayout
// 			user={auth.user}
// 			header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Position</h2>}
// 		>
// 			<Head title="Position" />

// 			<div className="py-12">
// 				<Link className="text-gray-800 dark:text-gray-200 px-6" href={route('positions.create')}>Create</Link>
// 				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
// 					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
// 						<div className="table-wrapper">
// 							<table className="table">
// 								<thead>
// 									<tr>
// 										<th className="table__column--number">No.</th>
// 										<th>Name</th>
// 										<th>Action</th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									{positions.data.length !== 0 ?
// 									 positions.data.map((key, index) => (
// 											<tr key={index}>
// 												<td>{index + 1}</td>
// 												<td>{key.name}</td>
// 												<td>
// 													<Link href={route('positions.edit', key.id)}>Edit</Link>
// 													<button className="text-red-600 focus:outline-none hover:underline" type="button" tabIndex={-1} onClick={() => onDelete(key.id)}>
// 														Delete
// 													</button>
// 												</td>
// 											</tr>
// 										)) :
// 										<tr>
// 											<td colSpan={3}>Empty data</td>
// 										</tr>
// 									}
// 								</tbody>
// 							</table>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</AuthenticatedLayout>
// 	);
// }
