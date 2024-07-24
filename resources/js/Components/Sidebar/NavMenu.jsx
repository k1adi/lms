import NavGroup from './NavGroup';
import NavLink from './NavLink';
import { LayoutDashboard, CalendarClock, ClipboardList, Settings, UserCog, LibraryBig, ChevronDown, Building2, BriefcaseBusiness, SquareUser, BookCopy, BookLock, MonitorSmartphone, ScrollText, Bug, MessageSquareText, User, Users, ShieldOff, KeyRound, BadgeCheck, VenetianMask, Bolt, Fingerprint, MonitorCog, Settings2 } from 'lucide-react';

export default function NavMenu({ sidebarExpand, setSidebarExpand}) {
  return (
    <nav className='nav'>
      <ul className='nav__list top'>
        {/* Dashboard */}
        <NavLink
          link='dashboard'
          icon={<LayoutDashboard />}
          text='Dashboard'
        />

        {/* Training */}
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
                      icon={<MonitorSmartphone />}
                      text='Online'
                    />
                    <NavLink
                      link={route('courses.index')}
                      icon={<ScrollText />}
                      text='Offline'
                    />
                  </ul>
                </div>
              </>
            );
          }}
        </NavGroup>
        
        {/* Schedule */}
        <NavLink
          link='#'
          icon={<CalendarClock />}
          text='Schedule'
        />

        {/* Reports */}
        <NavLink
          link='#'
          icon={<ClipboardList />}
          text='Reports'
        />

        {/* Setting */}
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
                      link={route('bus.index')}
                      icon={<Building2 />}
                      text='Business Unit'
                    />
                    <NavLink
                      link={route('depts.index')}
                      icon={<BriefcaseBusiness />}
                      text='Department'
                    />
                    <NavLink
                      link={route('positions.index')}
                      icon={<SquareUser />}
                      text='Positions'
                    />
                    <NavLink
                      link={route('courses.index')}
                      icon={<BookCopy />}
                      text='Courses'
                    />
                    <NavLink
                      link='#'
                      icon={<BookLock />}
                      text='Access'
                    />
                  </ul>
                </div>
              </>
            );
          }}
        </NavGroup>

        {/* Authorization */}
        <NavGroup isActive={false} >
          {(handleClick, open) => {
            return (
              <>
                <NavLink
                  icon={<UserCog />}
                  text='Authorization'
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
                      link={route('users.index')}
                      icon={<Users />}
                      text='Users'
                    />
                    <NavLink
                      link={route('roles.index')}
                      icon={<Settings2 />}
                      text='Roles'
                    />
                    <NavLink
                      link={route('permissions.index')}
                      icon={<KeyRound />}
                      text='Permission'
                    />
                  </ul>
                </div>
              </>
            );
          }}
        </NavGroup>
      </ul>

      <ul className='nav__list'>
        <NavLink
          link='#'
          icon={<MessageSquareText />}
          text='Feedback'
        />
        <NavLink
          link={route('depts.index')}
          icon={<Bug />}
          text='Report Bug/Issue'
        />
      </ul>
    </nav>
  );
}