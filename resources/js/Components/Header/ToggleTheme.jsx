import React, { useEffect, useState } from 'react';
import { SunMedium, Moon } from "lucide-react"

export default function ToggleTheme() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));

  return (
    <button onClick={toggleTheme} className='dropdown__list'>
      {theme === 'dark' ? (
        <>
          <Moon className='inline-flex' /> Dark
        </>
      ) : (
        <>
          <SunMedium className='inline-flex' /> Light
        </>
      )}
    </button>
  )
}