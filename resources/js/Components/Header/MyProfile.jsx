import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import ClickOutside from '../ClickOutside';
import DropdownProfile from './DropdownProfile';
import { ChevronDown } from 'lucide-react';

export default function MyProfile() {
  const user = usePage().props.auth.user;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className='relative'>
      <button 
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className='flex items-center gap-2 text-gray-600 dark:text-gray-300'
      >
        {user.username} <ChevronDown color='currentColor'/>
      </button>

      {/* Dropdown Open */}
      {dropdownOpen && (
        <DropdownProfile />
      )}
    </ClickOutside>
  );
}