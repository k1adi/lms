import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Acessibility/Breadcrumb';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/TextInput';
import TableDataTraining from './Partials/TableDataTraining';

const Detail = ({ report }) => {
  const prevPage = [
		{ link: route('dashboard'), text: 'Dashboard' },
		{ link: route('report.index'), text: 'Report' },
	];

  const {title, objective, bu, dept, courses } = report.data;

  return (
    <>
      <div className='content-box'>
        <Breadcrumb pageName='Report Detail' prevPage={prevPage} />

        <div className='w-full'>
          <div className='flex flex-col md:flex-row gap-2'>
            <FieldGroup label='Business Unit' name='bu' className='flex-1'>
              <TextInput
                name='bu'
                className="mt-1 block w-full"
                value={bu}
                readOnly
                disabled
              />
            </FieldGroup>
            <FieldGroup label='Department' name='dept' className='flex-1'>
              <TextInput
                name='dept'
                className="mt-1 block w-full"
                value={dept}
                readOnly
                disabled
              />
            </FieldGroup>
          </div>
          <FieldGroup label='Title' name='title' >
            <TextInput
              name='title'
              className="mt-1 block w-full"
              value={title}
              readOnly
              disabled
            />
          </FieldGroup>
          <FieldGroup label='Goals Training' name='objective' >
            <TextInput
              name='objective'
              className="mt-1 block w-full"
              value={objective}
              readOnly
              disabled
            />
          </FieldGroup>
        </div>
      </div>

      <TableDataTraining courses={courses} />
    </>
  );
}

Detail.layout = (page) => (
  <DashboardLayout title='Report Detail' children={page} />
);

export default Detail;