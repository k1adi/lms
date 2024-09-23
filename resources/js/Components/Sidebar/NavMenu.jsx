import { usePage } from '@inertiajs/react';
import NavGroup from './NavGroup';
import NavLink from './NavLink';
import TrainingMenu from './TrainingMenu';
import DashboardMenu from './DashboardMenu';
import { Bug, ChevronDown, LayoutGrid, MessageSquareText, Rows3 } from 'lucide-react';

export default function NavMenu({ sidebarExpand, setSidebarExpand}) {
  const { url: inertiaUrl } = usePage();
  const urlPath = inertiaUrl.split('/');
  const course = usePage().props?.course;

  return (
    <nav className='nav'>
      {/* Sidebar for just dashboard menu */}
      {(urlPath[1] != 'training' || !urlPath[3] || urlPath[2] == 'offline') && (
        <ul className='nav__list top'>
          <DashboardMenu sidebarExpand={sidebarExpand} setSidebarExpand={setSidebarExpand} />                    
        </ul>
      )}

      {/* Sidebar for dashbaord and training menu */}
      {urlPath[1] == 'training' &&  (urlPath[2] == 'online' || urlPath[2] == 'test' || urlPath[2] == 'detail') && urlPath[3] && (
        <ul className='nav__list top'>
          <NavGroup>
            {(handleClick, open) => {
              return (
                <>
                  <NavLink
                    icon={<LayoutGrid />}
                    text='Menu'
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpand ? handleClick() : setSidebarExpand(true); 
                    }}
                  >
                    <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                  </NavLink>
                  <div className={`translate transform overflow-hidden ${!open && 'hidden'}`} >
                    <ul className='mt-1 mb-5.5 flex flex-col gap-2.5 pl-6'>
                      <DashboardMenu sidebarExpand={sidebarExpand} setSidebarExpand={setSidebarExpand} />                    
                    </ul>
                  </div>
                </>
              );
            }}
          </NavGroup>

          <NavGroup isActive={true}>
            {(handleClick, open) => {
              return (
                <>
                  <NavLink
                    icon={<Rows3 />}
                    text='Training'
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpand ? handleClick() : setSidebarExpand(true); 
                    }}
                    active={open || urlPath[2] == 'online'}
                  >
                    <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                  </NavLink>
                  <div className={`translate transform overflow-hidden ${!open && 'hidden'}`} >
                    <ul className='mt-1 mb-5.5 flex flex-col gap-0.5'>
                      <TrainingMenu sidebarExpand={sidebarExpand} setSidebarExpand={setSidebarExpand} />
                    </ul>
                  </div>
                </>
              );
            }}
          </NavGroup>
        </ul>
      )}
  
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