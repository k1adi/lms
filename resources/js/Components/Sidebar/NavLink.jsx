import { Link } from "@inertiajs/react";

export default function NavLink({ link = '#', icon, text, children = '', ...props }) {
  const isActive = route().current(link + '*');
  const linkClasses = isActive ? 'nav__link active' : 'nav__link';
  return (
    <li>
      <Link href={link} className={linkClasses} {...props}>
        {icon} {text} {children}
      </Link>
    </li>
  );
}