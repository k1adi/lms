import React from 'react';
import { Head } from '@inertiajs/react';
import MainNav from '@/Components/Navbar/MainNav';

export default function DashboardLayout({ title, children }){
  return (
    <>
      <Head title={title} />

      <main className='app'>
        <div className='main'>
          {/* Navbar */}
          <header className='main__navbar'>
            <MainNav />
          </header>

          <div className='main__wrapper'>
            {/* Sidebar */}
            <aside className='main__sidebar'>
              <p>sidebar</p>
            </aside>

            {/* Main Content */}
            <section 
              className='main__content'
              scroll-region='true'
            >
              <p>content</p>
              {children}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
