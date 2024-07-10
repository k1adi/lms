import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function IndexUser({ auth, users }) {
	function onDelete(id) {
    if (confirm('Are you sure you want to delete this user?')) {
      router.delete(route('users.destroy', id));
    }
  }

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">User</h2>}
		>
			<Head title="User" />

			<div className="py-12">
				<Link className="text-gray-800 dark:text-gray-200 px-6" href={route('users.create')}>Create</Link>
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
						<div className="table-wrapper">
							<table className="table">
								<thead>
									<tr>
										<th className="table__column--number">No.</th>
										<th>Name</th>
										<th>Username</th>
										<th>Email</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{users.data.length !== 0 ?
									 users.data.map((key, index) => (
											<tr key={index}>
												<td>{index + 1}</td>
												<td>{key.full_name}</td>
												<td>{key.username}</td>
												<td>{key.email}</td>
												<td>
													<Link href={route('users.edit', key.id)}>Edit</Link>
													<button className="text-red-600 focus:outline-none hover:underline" type="button" tabIndex={-1} onClick={() => onDelete(key.id)}>
														Delete
													</button>
												</td>
											</tr>
										)) :
										<tr key={1}>
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
