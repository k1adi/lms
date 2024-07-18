import { Link } from "@inertiajs/react";
import ToggleTheme from "./ToggleTheme";
import { User, LogOut } from "lucide-react";

export default function DropdownProfile() {
  return (
    <div className='dropdown__wrapper'>
      <ul className='dropdown__content'>
        <ToggleTheme />
        <Link
          href='#'
          className='dropdown__list'
        >
          <User /> My Account
        </Link>
      </ul>
      <button className='dropdown__log-out'>
        <LogOut /> Log Out
      </button>
    </div>
  );
}