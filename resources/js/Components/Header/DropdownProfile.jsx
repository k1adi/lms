import { Link } from "@inertiajs/react";
import ToggleTheme from "./ToggleTheme";
import { User, LogOut } from "lucide-react";

export default function DropdownProfile() {
  return (
    <div className='dropdown__wrapper'>
      <ul className='dropdown__content'>
        <ToggleTheme />
        <Link
          href={route('profile.index')}
          className='dropdown__list'
        >
          <User /> Profile
        </Link>
      </ul>
      <Link href={route('logout')} method="post" as="button" className='dropdown__log-out'>
        <LogOut /> Log Out      
      </Link>
    </div>
  );
}