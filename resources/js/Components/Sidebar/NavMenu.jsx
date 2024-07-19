import NavGroup from './NavGroup';
import NavLink from './NavLink';
import { LayoutDashboard, CalendarClock, ClipboardList, UserPen, Settings, UserCog, LibraryBig, ChevronDown } from 'lucide-react';

export default function NavMenu({ sidebarExpand, setSidebarExpand}) {
  return (
    <nav className='nav'>
      <ul className='nav__list'>
        <NavLink
          link='new-dashboard'
          icon={<LayoutDashboard />}
          text='Dashboard'
        />

        <NavGroup isActive={false} >
          {(handleClick, open) => {
            return (
              <>
                <NavLink
                  icon={<LibraryBig />}
                  text='Training'
                  onClick={(e) => {
                    e.preventDefault();
                    sidebarExpand ? handleClick() : setSidebarExpand(true); 
                }}>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                </NavLink>
                <div
                  className={`translate transform overflow-hidden ${!open && 'hidden'}`}
                >
                  <ul className='mt-1 mb-5.5 flex flex-col gap-2.5 pl-6'>
                    <NavLink
                      link={route('courses.index')}
                      icon={<CalendarClock />}
                      text='Online'
                    />
                    <NavLink
                      link={route('courses.index')}
                      icon={<CalendarClock />}
                      text='Offline'
                    />
                  </ul>
                </div>
              </>
            );
          }}
        </NavGroup>
        
        <NavLink
          link={route('courses.index')}
          icon={<CalendarClock />}
          text='Schedule'
        />
        <NavLink
          link={route('bus.index')}
          icon={<ClipboardList />}
          text='Reports'
        />
        <NavLink
          link={route('depts.index')}
          icon={<UserPen />}
          text='Profile'
        />
        <NavGroup isActive={false} >
          {(handleClick, open) => {
            return (
              <>
                <NavLink
                  icon={<Settings />}
                  text='Setting'
                  onClick={(e) => {
                    e.preventDefault();
                    sidebarExpand ? handleClick() : setSidebarExpand(true); 
                }}>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                </NavLink>
                <div
                  className={`translate transform overflow-hidden ${!open && 'hidden'}`}
                >
                  <ul className='mt-1 mb-5.5 flex flex-col gap-2.5 pl-6'>
                    <NavLink
                      link={route('courses.index')}
                      icon={<CalendarClock />}
                      text='Business Unit'
                    />
                    <NavLink
                      link={route('courses.index')}
                      icon={<CalendarClock />}
                      text='Department'
                    />
                    <NavLink
                      link={route('courses.index')}
                      icon={<CalendarClock />}
                      text='Position'
                    />
                    <NavLink
                      link={route('courses.index')}
                      icon={<CalendarClock />}
                      text='Courses'
                    />
                    <NavLink
                      link={route('courses.index')}
                      icon={<CalendarClock />}
                      text='Access'
                    />
                  </ul>
                </div>
              </>
            );
          }}
        </NavGroup>
        <NavLink
          link={route('depts.index')}
          icon={<UserCog />}
          text='Authorization'
        />
      </ul>
    </nav>
  );
}