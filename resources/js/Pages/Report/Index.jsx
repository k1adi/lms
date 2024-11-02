import React from 'react';
import { router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';

const Index = ({ report }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
	];

  const handleRowClicked = (id) => {
    router.visit(route('report.detail', id));
  }
  
  return (
    <div className='content-box'>
      <Breadcrumb pageName='Reports' prevPage={prevPage} />

      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th className="table--number">No.</th>
              <th>Title</th>
              <th>Goal</th>
              <th className='text-center'>Passed</th>
              <th className='text-center'>Progress</th>
            </tr>
          </thead>
          <tbody>
            {report.data.length !== 0 ? 
              report.data.map((key, index) => (
                <tr key={index} className='group cursor-pointer' onClick={(e) => handleRowClicked(key.id)} >
                  <td className='group-hover:text-sky-400'>{index + 1}</td>
                  <td className='group-hover:text-sky-400'>{key.title}</td>
                  <td className='group-hover:text-sky-400'>{key.goal}</td>
                  <td className='group-hover:text-sky-400 text-center'>{key.graduated}</td>
                  <td className='group-hover:text-sky-400 text-center'>{key.progress}</td>
                </tr>
              )) :
              <tr className='text-center'>
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
  <DashboardLayout title='Reports' children={page} />
);

export default Index;