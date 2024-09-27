import React from 'react';
import { Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import LocalizationDate from '@/Utils/LocalizationDate';
import { Pencil } from 'lucide-react';

const Index = ({ courses, schedules, auth }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: '#', text: 'Setting' },
	];

	return (
    <>
      <section className='content-box mb-3'>
        <Breadcrumb pageName='Access' prevPage={prevPage} className='mb-0' />
      </section>
      <section className='content-box mb-3'>
        <div className='flex flex-row items-center justify-between mb-3'>
          <h1 className='text--title'>Course Access</h1>
          {auth.permissions.includes('accessible_create') && 
            <Link className='btn btn--primary' href={route('access.create', {page: 'course'})}> Add Access </Link>
          }
        </div>
        <div className='overflow-x-auto'>
          <table className='table'>
            <thead>
              <tr>
                <th className="table--number">No.</th>
                <th>Course</th>
                <th>Type</th>
                <th>Position</th>
                <th className='table--action'>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.data.length !== 0 ?
                courses.data.map((key, index) => (
                  <tr key={index} className='group py-2'>
                    <td className='group-hover:text-sky-400'>{index + 1}</td>
                    <td className='group-hover:text-sky-400'>{key.name}</td>
                    <td className='group-hover:text-sky-400'>{key.type}</td>
                    <td className='break-word'>
                      {key.assign_position.map(list => (
                        <span className='label label--secondary group-hover:bg-sky-100 group-hover:dark:bg-sky-400' key={list.name}> {list.name} </span>
                      ))}
                    </td>
                    <td className='table--action'>
                      <Link href={route('access.course.edit', key.id)} className='text-warning mr-2'> 
                        <Pencil className='inline-block mb-1' size={14} /> Edit
                      </Link>
                    </td>
                  </tr>
                )) :
                <tr className='text-center'>
                  <td colSpan={5}>Empty data</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      {/* <section className='content-box'>
        <div className='flex flex-row items-center justify-between mb-3'>
          <h1 className='text--title'>Schedule Access</h1>
          {auth.permissions.includes('accessible_create') && 
            <Link className='btn btn--primary' href={route('access.create', {page: 'schedule'})}> Add Access </Link>
          }
        </div>
        <div className='overflow-x-auto'>
          <table className='table'>
            <thead>
              <tr>
                <th className="table--number">No.</th>
                <th>Course</th>
                <th>Desc</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>User</th>
                <th className='table--action'>Action</th>
              </tr>
            </thead>
            <tbody>
              {schedules.data.length !== 0 ?
                schedules.data.map((key, index) => (
                  <tr key={index} className='group py-2'>
                    <td className='group-hover:text-sky-400'>{index + 1}</td>
                    <td className='group-hover:text-sky-400'>{key.course}</td>
                    <td className='group-hover:text-sky-400'>{key.desc}</td>
                    <td className='group-hover:text-sky-400'>{LocalizationDate(key.start_time, 'en')}</td>
                    <td className='group-hover:text-sky-400'>{LocalizationDate(key.end_time, 'en')}</td>
                    <td className='break-word'>
                      {key.users.map((name, index) => (
                        <span className='label label--secondary group-hover:bg-sky-100 group-hover:dark:bg-sky-400' key={index}> {name} </span>
                      ))}
                    </td>
                    <td className='table--action'>
                      <Link href={route('access.schedule.edit', key.id)} className='text-warning mr-2'> 
                        <Pencil className='inline-block mb-1' size={14} /> Edit
                      </Link>
                    </td>
                  </tr>
                )) :
                <tr className='text-center'>
                  <td colSpan={7}>Empty data</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section> */}
    </>
	);
}

Index.layout = (page) => (
	<DashboardLayout title='Business Unit' children={page} />
);

export default Index;