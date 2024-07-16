import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

function NewDashboardPage() {
  return (
    <h1>New Dashboard</h1>
  );
}

NewDashboardPage.layout = (page) => (
  <DashboardLayout title="New Dashboard" children={page} />
);

export default NewDashboardPage;