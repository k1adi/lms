import { usePage } from '@inertiajs/react';
import NavGroup from './NavGroup';
import NavLink from './NavLink';
import { LayoutDashboard, CalendarClock, ClipboardList, Settings, UserCog, LibraryBig, ChevronDown, Building2, BriefcaseBusiness, SquareUser, BookCopy, BookLock, MonitorSmartphone, ScrollText, Bug, MessageSquareText, Users, KeyRound, Settings2, TextSearch, PencilLine, Microscope } from 'lucide-react';

export default function NavMenu({ sidebarExpand, setSidebarExpand}) {
  const permissions = usePage().props.auth.permissions;
  const { url: inertiaUrl } = usePage();
  const currentPage = inertiaUrl.split('/')[1];

  const trainingChild = ['online', 'offline'];
  const assignmentChild = ['test', 'tnas'];
  const settingChild = ['bus', 'depts', 'positions', 'courses', 'access'];
  const authorizationChild = ['users', 'roles', 'permissions'];
  
  const testMenu = ['test_access', 'tna_access'];
  const userMenu = ['user_access', 'role_access', 'permission_access'];
  const settingMenu = ['bu_access', 'dept_access', 'position_access', 'course_access', 'accessible_access'];

  return (
    <nav className='nav'>
      <ul className='nav__list top'>
        {/* Dashboard */}
        {permissions.includes('dashboard_access') &&
          <NavLink
            link={route('dashboard')}
            icon={<LayoutDashboard />}
            name='dashboard'
            text='Dashboard'
          />
        }

        {/* Training */}
        <NavGroup isActive={trainingChild.includes(currentPage)}>
          {(handleClick, open) => {
            return (
              <>
                <NavLink
                  icon={<LibraryBig />}
                  text='Training'
                  onClick={(e) => {
                    e.preventDefault();
                    sidebarExpand ? handleClick() : setSidebarExpand(true); 
                  }}
                  active={trainingChild.includes(currentPage)}
                >
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                </NavLink>
                <div className={`translate transform overflow-hidden ${!open && 'hidden'}`} >
                  <ul className='mt-1 mb-5.5 flex flex-col gap-2.5 pl-6'>
                    {permissions.includes('online_course_access') &&
                      <NavLink
                        link='#'
                        icon={<MonitorSmartphone />}
                        name='online'
                        text='Online'
                      />
                    }
                    {permissions.includes('offline_course_access') &&
                      <NavLink
                        link='#'
                        icon={<ScrollText />}
                        name='offline'
                        text='Offline'
                      />
                    }
                  </ul>
                </div>
              </>
            );
          }}
        </NavGroup>

        {/* Assignment */}
        { testMenu.some(value => permissions.includes(value)) &&
          <NavGroup isActive={assignmentChild.includes(currentPage)}>
            {(handleClick, open) => {
              return (
                <>
                  <NavLink
                    icon={<Microscope />}
                    text='Analyze'
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpand ? handleClick() : setSidebarExpand(true); 
                    }}
                    active={assignmentChild.includes(currentPage)}
                  >
                    <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                  </NavLink>
                  <div
                    className={`translate transform overflow-hidden ${!open && 'hidden'}`}
                  >
                    <ul className='mt-1 mb-5.5 flex flex-col gap-2.5 pl-6'>
                      {permissions.includes('test_access') && 
                        <NavLink
                          link='#'
                          icon={<PencilLine />}
                          text='Test'
                        />
                      }
                      {permissions.includes('tna_access') && 
                        <NavLink
                          link={route('tnas.index')}
                          icon={<TextSearch />}
                          name='tnas'
                          text='TNA'
                        />
                      }
                    </ul>
                  </div>
                </>
              );
            }}
          </NavGroup>
        }
        
        {/* Schedule */}
        {permissions.includes('schedule_access') && 
          <NavLink
            link={route('schedules.index')}
            icon={<CalendarClock />}
            name='schedules'
            text='Schedule'
          />
        }

        {/* Reports */}
        {permissions.includes('report_access') && 
          <NavLink
            link='#'
            icon={<ClipboardList />}
            text='Reports'
          />
        }

        {/* Setting */}
        { settingMenu.some(value => permissions.includes(value)) &&
          <NavGroup isActive={settingChild.includes(currentPage)}>
            {(handleClick, open) => {
              return (
                <>
                  <NavLink
                    icon={<Settings />}
                    text='Setting'
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpand ? handleClick() : setSidebarExpand(true); 
                    }}
                    active={settingChild.includes(currentPage)}
                  >
                    <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                  </NavLink>
                  <div
                    className={`translate transform overflow-hidden ${!open && 'hidden'}`}
                  >
                    <ul className='mt-1 mb-5.5 flex flex-col gap-2.5 pl-6'>
                      {permissions.includes('bu_access') && 
                        <NavLink
                          link={route('bus.index')}
                          icon={<Building2 />}
                          name='bus'
                          text='Business Unit'
                        />
                      }
                      {permissions.includes('dept_access') && 
                        <NavLink
                          link={route('depts.index')}
                          icon={<BriefcaseBusiness />}
                          name='depts'
                          text='Department'
                        />
                      }
                      {permissions.includes('position_access') && 
                        <NavLink
                          link={route('positions.index')}
                          icon={<SquareUser />}
                          name='positions'
                          text='Positions'
                        />
                      }
                      {permissions.includes('course_access') && 
                        <NavLink
                          link={route('courses.index')}
                          icon={<BookCopy />}
                          name='courses'
                          text='Courses'
                        />
                      }
                      {permissions.includes('accessible_access') && 
                        <NavLink
                          link={route('access.index')}
                          icon={<BookLock />}
                          name='access'
                          text='Access'
                        />
                      }
                    </ul>
                  </div>
                </>
              );
            }}
          </NavGroup>
        }

        {/* Authorization */}
        { userMenu.some(value => permissions.includes(value)) &&
          <NavGroup isActive={authorizationChild.includes(currentPage)}>
            {(handleClick, open) => {
              return (
                <>
                  <NavLink
                    icon={<UserCog />}
                    text='Authorization'
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpand ? handleClick() : setSidebarExpand(true); 
                    }}
                    active={authorizationChild.includes(currentPage)}
                  >
                    <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                  </NavLink>
                  <div
                    className={`translate transform overflow-hidden ${!open && 'hidden'}`}
                  >
                    <ul className='mt-1 mb-5.5 flex flex-col gap-2.5 pl-6'>
                      {permissions.includes('user_access') && 
                        <NavLink
                          link={route('users.index')}
                          icon={<Users />}
                          name='users'
                          text='Users'
                          />
                      }
                      {permissions.includes('role_access') && 
                        <NavLink
                          link={route('roles.index')}
                          icon={<Settings2 />}
                          name='roles'
                          text='Roles'
                        />
                      }
                      {permissions.includes('permission_access') && 
                        <NavLink
                          link={route('permissions.index')}
                          icon={<KeyRound />}
                          name='permissions'
                          text='Permission'
                        />
                      }
                    </ul>
                  </div>
                </>
              );
            }}
          </NavGroup>
        }
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