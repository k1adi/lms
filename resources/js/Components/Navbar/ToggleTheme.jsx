import React, { useEffect, useState } from 'react';

export default function ToggleTheme() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}