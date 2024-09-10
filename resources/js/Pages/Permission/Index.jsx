import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import { Pencil, Trash2 } from 'lucide-react';
import Loader from '@/Components/Loader';
import Pagination from '@/Components/Pagination';

const Index = () => {	
	const { auth } = usePage().props;
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [permissions, setPermission] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [lastRow, setLastRow] = useState(0);
	const [firstRow, setFirstRow] = useState(0);

	const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Setting' },
	];

	useEffect(() => {
		fetchPermissions(currentPage);
	}, [currentPage]);

	const fetchPermissions = async (currentPage) => {
		setLoading(true);

		try {
			const response = await axios.get(route('permissions.list'), {
				params: {page: currentPage}
			});

			setPermission(response.data.data);
			setCurrentPage(response.data.current_page);
			setLastPage(response.data.last_page);
			setTotal(response.data.total);
			setLastRow(response.data.to);
			setFirstRow(response.data.from);
			
		} catch (err) {
			console.error('Error fetching permissions: ', err);
		} finally {
			setLoading(false);
		}
	}

	const onDelete = (id) => {
    if (confirm('Are you sure you want to delete this permission?')) {
      router.delete(route('permissions.destroy', id));
    }
  }

	const handlePageChange = (page) => {
		setCurrentPage(page);
	}

	if(loading) {
		return <Loader />
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
						{permissions.length !== 0 ?
							permissions.map((key, index) => (
								<tr key={index} className='py-2'>
									<td>{firstRow + index}</td>
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

			<Pagination
				total={total}
				lastIndex={lastRow}
				currentPage={currentPage}
				lastPage={lastPage}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}

Index.layout = (page) => (
	<DashboardLayout title='Permissions' children={page} />
);

export default Index;