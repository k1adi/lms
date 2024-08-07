import NavGroup from './NavGroup';
import NavLink from './NavLink';
import { LayoutDashboard, CalendarClock, ClipboardList, Settings, UserCog, LibraryBig, ChevronDown, Building2, BriefcaseBusiness, SquareUser, BookCopy, BookLock, MonitorSmartphone, ScrollText, Bug, MessageSquareText, Users, KeyRound, Settings2, TextSearch, PencilLine, FileText } from 'lucide-react';

export default function NavMenu({ sidebarExpand, setSidebarExpand}) {
  return (
    <nav className='nav'>
      <ul className='nav__list top'>
        {/* Dashboard */}
        <NavLink
          link={route('dashboard')}
          icon={<LayoutDashboard />}
          name='dashboard'
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
                      link='#'
                      icon={<MonitorSmartphone />}
                      text='Online'
                    />
                    <NavLink
                      link='#'
                      icon={<ScrollText />}
                      text='Offline'
                    />
                  </ul>
                </div>
              </>
            );
          }}
        </NavGroup>

        {/* Assignment */}
        <NavGroup isActive={false} >
          {(handleClick, open) => {
            return (
              <>
                <NavLink
                  icon={<FileText />}
                  text='Assignment'
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
                      link='#'
                      icon={<PencilLine />}
                      text='Test'
                    />
                    <NavLink
                      link='#'
                      icon={<TextSearch />}
                      text='TNA'
                    />
                  </ul>
                </div>
              </>
            );
          }}
        </NavGroup>
        
        {/* Schedule */}
        <NavLink
          link={route('schedules.index')}
          icon={<CalendarClock />}
          name='schedules'
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
                      name='bus'
                      text='Business Unit'
                    />
                    <NavLink
                      link={route('depts.index')}
                      icon={<BriefcaseBusiness />}
                      name='depts'
                      text='Department'
                    />
                    <NavLink
                      link={route('positions.index')}
                      icon={<SquareUser />}
                      name='positions'
                      text='Positions'
                    />
                    <NavLink
                      link={route('courses.index')}
                      icon={<BookCopy />}
                      name='courses'
                      text='Courses'
                    />
                    <NavLink
                      link={route('access.index')}
                      icon={<BookLock />}
                      name='access'
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
                      name='users'
                      text='Users'
                    />
                    <NavLink
                      link={route('roles.index')}
                      icon={<Settings2 />}
                      name='roles'
                      text='Roles'
                    />
                    <NavLink
                      link={route('permissions.index')}
                      icon={<KeyRound />}
                      name='permissions'
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
          name='feedback'
          text='Feedback'
        />
        <NavLink
          link='#'
          icon={<Bug />}
          name='bug-issues'
          text='Report Bug/Issue'
        />
      </ul>
    </nav>
  );
}