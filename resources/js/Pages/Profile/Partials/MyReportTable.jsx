import React from 'react';
import CapitalizeWord from '@/Utils/CapitalizeWord';
import { BadgeCheck, LoaderIcon } from 'lucide-react';

export default function MyReportTable({graduated, reports}) {
  return <div className='overflow-x-auto'>
    <table className='table'>
      <thead>
        <tr>
          <th>Code</th>
          <th>Course</th>
          <th className='text-center'>Type</th>
          <th className='text-center'>Attemps</th>
          <th className='text-center'>Score</th>
          <th className='text-center'>Test</th>
          <th className='text-center'>Status</th>
        </tr>
      </thead>
      <tbody>
        {reports.data.length !== 0 ? 
          reports.data.map((key, index) => (
            <tr key={index}>
              <td>{key.code}</td>
              <td>{key.course}</td>
              <td className='text-center'>{CapitalizeWord(key.type)}</td>
              <td className='text-center'>{key.attemps}</td>
              <td className='text-center'>{key.score}</td>
              <td className='text-center'>{key.test}</td>
              <td className='text-center'>
                {graduated.includes(key.id.toString()) ? (
                  <BadgeCheck className='inline-block mr-2' />
                ) : (
                  <LoaderIcon className='inline-block mr-2' />
                )}
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
}