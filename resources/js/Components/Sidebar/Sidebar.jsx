import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const trigger = useRef();
  const sidebar = useRef();

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = () => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = () => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside ref={sidebar} className={`app__sidebar ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className='sidebar__header'>
        <Link href='/new-dashboard' className='sidebar__logo'>
          <GraduationCap className='inline-block mb-2 me-2' size={44} /> 
          <span className='font-bold'>PRISMA</span>
          <span className='font-thin text-sky-300'>LMS</span>
        </Link>
      </div>

      <div className='sidebar__menu'>

      </div>
    </aside>
  );
}