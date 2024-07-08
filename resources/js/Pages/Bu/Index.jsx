import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, bus }) {
	function onDelete(id) {
    if (confirm('Are you sure you want to delete this business unit?')) {
      router.delete(route('bus.destroy', id));
    }
  }

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Business Unit</h2>}
		>
			<Head title="Business Unit" />

			<div className="py-12">
				<Link className="text-gray-800 dark:text-gray-200 px-6" href={route('bus.create')}>Create</Link>
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div className="table-wrapper">
							<table className="table">
								<thead>
									<tr>
										<th className="table__column--number">No.</th>
										<th>Code</th>
										<th>Name</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{bus.data.length !== 0 ?
									 bus.data.map((key, index) => (
											<tr key={index}>
												<td>{index + 1}</td>
												<td>{key.code}</td>
												<td>{key.name}</td>
												<td>
													<Link href={route('bus.edit', key.id)}>Edit</Link>
													<button className="text-red-600 focus:outline-none hover:underline" type="button" tabIndex={-1} onClick={() => onDelete(key.id)}>
														Delete
													</button>
												</td>
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
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
