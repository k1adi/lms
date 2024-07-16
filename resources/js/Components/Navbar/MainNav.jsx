import React from 'react';
import { Link } from '@inertiajs/react';
import ToggleTheme from './ToggleTheme';
import { Menu, GraduationCap } from 'lucide-react';

export default function MainNav() {
  return (
    <nav className='nav'>
      <div className='nav__logo'>
        <Link href='/'>
          <GraduationCap className='inline-block mb-1 me-1' size={40} /> 
          PRISMA LMS
        </Link>
      </div>
      <div className='nav__section'>
        <div>asd</div>
        <ToggleTheme />
      </div>
    </nav>
  );
}