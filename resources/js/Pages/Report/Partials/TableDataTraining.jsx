import React, { useState } from 'react';

export default function TableDataTraining({ courses }) {
  const [activeTab, setActiveTab] = useState(courses[0]?.id);
  return (
    <>
    <div className='content-box mt-3'>
      <h2 className='text--title'>Data Course</h2>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th className='table--number'>No. </th>
              <th>Type</th>
              <th>Course</th>
              <th>Code</th>
              <th>Test</th>
              <th className='text-center'>Minimum</th>
              <th className='text-center'>Graduated</th>
              <th className='text-center'>Progress</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((key, index) => (
              <tr key={index} onClick={() => setActiveTab(key.id)}
              className={`cursor-pointer ${activeTab === key.id ? 'text-sky-400' : ''}`}>
                <td className='table--number'>{index+1}</td>
                <td>{key.type}</td>
                <td>{key.title}</td>
                <td>{key.code}</td>
                <td>{key.test}</td>
                <td className='text-center'>{key.minimum}</td>
                <td className='text-center'>{key.graduated}</td>
                <td className='text-center'>{key.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  <div className='content-box mt-3'>
    <h2 className='text--title'>Data Trainee</h2>
    <div className='overflow-x-auto'>
      <table className='table'>
        <thead>
          <tr>
            <th className='table--number'>No. </th>
            <th>Trainee</th>
            <th>Code</th>
            <th className='text-center'>Attempts</th>
            <th className='text-center'>Score</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            if (activeTab === course.id) {
              return (
                <>
                  {Object.values(course.assignment).map((key, index) => (
                    <tr key={index}>
                      <td className="table--number">{index + 1}</td>
                      <td>{key.user}</td>
                      <td>{key.code}</td>
                      <td className="text-center">{key.attempt}</td>
                      <td className="text-center">{key.score}</td>
                      <td>{key.type}</td>
                    </tr>
                  ))}
                </>
              );
            } else {
              return null; // Ensures that nothing is rendered for courses not matching activeTab
            }
          })}
        </tbody>
      </table>
    </div>
  </div>
  </>
  );
}