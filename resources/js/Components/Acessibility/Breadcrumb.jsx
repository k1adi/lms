import React from 'react';
import { Link } from "@inertiajs/react";

export default function Breadcrumb({ title = '', pageName, prevPage }) {
  return (
    <div className='breadcrumb'>
      <h1 className='text--title'>{ title ? title : pageName }</h1>

      <nav>
        <ol className='breadcrumb__list'>
          {prevPage.map(item => (
            <li key={item.text}>
              <Link className='breadcrumb__link' href={item.link}>
                {item.text} /
              </Link>
            </li>
          ))}
          <li className='breadcrumb__link active'>{pageName}</li>
        </ol>
      </nav>
    </div>
  );
}