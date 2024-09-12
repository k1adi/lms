import { usePage } from '@inertiajs/react';
import NavGroup from './NavGroup';
import NavLink from './NavLink';

import { LayoutDashboard, CalendarClock, ClipboardList, Settings, UserCog, LibraryBig, ChevronDown, Building2, BriefcaseBusiness, SquareUser, BookCopy, BookLock, MonitorSmartphone, ScrollText, Users, KeyRound, Settings2, TextSearch, PencilLine, Microscope } from 'lucide-react';

export default function DashboardMenu({ sidebarExpand, setSidebarExpand }) {
  const { url: inertiaUrl } = usePage();
  const urlPath = inertiaUrl.split('/');
  const permissions = usePage().props.auth.permissions;
  
  const trainingMenu = ['online_course_access', 'offline_course_access'];
  const assignmentMenu = ['assignment_access', 'tna_access'];
  const userMenu = ['user_access', 'role_access', 'permission_access'];
  const settingMenu = ['bu_access', 'dept_access', 'position_access', 'course_access', 'accessible_access'];

  return (
    <>
      {/* Dashboard */}
      {permissions.includes('dashboard_access') &&
        <NavLink
          link={route('dashboard')}
          icon={<LayoutDashboard />}
          name='dashboard'
          text='Dashboard'
          active={urlPath[1] == 'dashboard'}
        />
      }

      {/* Training */}
      { trainingMenu.some(value => permissions.includes(value)) &&
        <NavGroup isActive={urlPath[1] == 'training'}>
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
                  active={urlPath[1] == 'training'}
                >
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                </NavLink>
                <div className={`translate transform overflow-hidden ${!open && 'hidden'}`} >
                  <ul className='mt-1 mb-5.5 flex flex-col gap-2.5 pl-6'>
                    {permissions.includes('online_course_access') &&
                      <NavLink
                        link={route('training.online.index')}
                        icon={<MonitorSmartphone />}
                        name='online'
                        text='Online'
                        active={urlPath[2] == 'online'}
                      />
                    }
                    {permissions.includes('offline_course_access') &&
                      <NavLink
                        link={route('training.offline.index')}
                        icon={<ScrollText />}
                        name='offline'
                        text='Offline'
                        active={urlPath[2] == 'offline'}
                      />
                    }
                  </ul>
                </div>
              </>
            );
          }}
        </NavGroup>
      }

      {/* Assignment */}
      { assignmentMenu.some(value => permissions.includes(value)) &&
        <NavGroup isActive={urlPath[1] == 'assignment'}>
          {(handleClick, open) => {
            return (
              <>
                <NavLink
                  icon={<Microscope />}
                  text='Assignment'
                  onClick={(e) => {
                    e.preventDefault();
                    sidebarExpand ? handleClick() : setSidebarExpand(true); 
                  }}
                  active={urlPath[1] == 'assignment'}
                >
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                </NavLink>
                <div
                  className={`translate transform overflow-hidden ${!open && 'hidden'}`}
                >
                  <ul className='mt-1 mb-5.5 flex flex-col gap-2.5 pl-6'>
                    {permissions.includes('assignment_access') && 
                      <NavLink
                        link={route('tests.index')}
                        icon={<PencilLine />}
                        name='tests'
                        text='Test'
                        active={urlPath[2] == 'tests'}
                      />
                    }
                    {permissions.includes('tna_access') && 
                      <NavLink
                        link={route('tnas.index')}
                        icon={<TextSearch />}
                        name='tnas'
                        text='TNA'
                        active={urlPath[2] == 'tnas'}
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
          active={urlPath[1] == 'schedules'}
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
        <NavGroup isActive={urlPath[1] == 'setting'}>
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
                  active={urlPath[1] == 'setting'}
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
                        active={urlPath[2] == 'bus'}
                      />
                    }
                    {permissions.includes('dept_access') && 
                      <NavLink
                        link={route('depts.index')}
                        icon={<BriefcaseBusiness />}
                        name='depts'
                        text='Department'
                        active={urlPath[2] == 'depts'}
                      />
                    }
                    {permissions.includes('position_access') && 
                      <NavLink
                        link={route('positions.index')}
                        icon={<SquareUser />}
                        name='positions'
                        text='Positions'
                        active={urlPath[2] == 'positions'}
                      />
                    }
                    {permissions.includes('course_access') && 
                      <NavLink
                        link={route('courses.index')}
                        icon={<BookCopy />}
                        name='courses'
                        text='Courses'
                        active={urlPath[2] == 'courses'}
                      />
                    }
                    {permissions.includes('accessible_access') && 
                      <NavLink
                        link={route('access.index')}
                        icon={<BookLock />}
                        name='access'
                        text='Access'
                        active={urlPath[2] == 'access'}
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
        <NavGroup isActive={urlPath[1] == 'authorization'}>
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
                  active={urlPath[1] == 'authorization'}
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
                        active={urlPath[2] == 'users'}
                      />
                    }
                    {permissions.includes('role_access') && 
                      <NavLink
                        link={route('roles.index')}
                        icon={<Settings2 />}
                        name='roles'
                        text='Roles'
                        active={urlPath[2] == 'roles'}
                      />
                    }
                    {permissions.includes('permission_access') && 
                      <NavLink
                        link={route('permissions.index')}
                        icon={<KeyRound />}
                        name='permissions'
                        text='Permission'
                        active={urlPath[2] == 'permissions'}
                      />
                    }
                  </ul>
                </div>
              </>
            );
          }}
        </NavGroup>
      }
    </>
  );
}