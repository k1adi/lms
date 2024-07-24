import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

function NewDashboardPage() {
  return (
    <div className='content-box'>
      <h1 className='text--title'>Dashboard</h1>
    </div>
  );
}

NewDashboardPage.layout = (page) => (
  <DashboardLayout title="Dashboard" children={page} />
);

export default NewDashboardPage;