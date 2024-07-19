import { useState } from 'react';

export default function NavGroup({ isActive, children }) {
  const [open, setOpen] = useState(isActive);
  
  function handleClick() {
    setOpen(!open);
  }

  return children(handleClick, open);
}