import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, depts }) {
	console.log(depts, 'test depts');
	function onDelete(id) {
    if (confirm('Are you sure you want to delete this department?')) {
      router.delete(route('depts.destroy', id));
    }
  }

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Department</h2>}
		>
			<Head title="Department" />

			<div className="py-12">
				<Link className="text-gray-800 dark:text-gray-200 px-6" href={route('depts.create')}>Create</Link>
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div className="table-wrapper">
							<table className="table">
								<thead>
									<tr>
										<th className="table__column--number">No.</th>
										<th>Code</th>
										<th>Name</th>
										<th>BU</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{depts.data.length !== 0 ?
									 depts.data.map((key, index) => (
											<tr key={index}>
												<td>{index + 1}</td>
												<td>{key.code}</td>
												<td>{key.name}</td>
												<td>
													<Link href={route('depts.edit', key.id)}>Edit</Link>
													<button className="text-red-600 focus:outline-none hover:underline" type="button" tabIndex={-1} onClick={() => onDelete(key.id)}>
														Delete
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
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
