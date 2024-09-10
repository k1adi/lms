import { usePage } from '@inertiajs/react';
import NavGroup from './NavGroup';
import NavLink from './NavLink';

import { Check, ChevronDown } from 'lucide-react';

export default function TrainingMenu({ sidebarExpand, setSidebarExpand }) {
  const { 
    auth: { 
      user: {
        progression: progress 
      }
    }, 
    course 
  } = usePage().props;
  const section = course?.sections;
  
  console.log(progress, 'user training menu');

  return (
    <>
      {section.map((key, index) => (
        <NavGroup key={index}>
          {(handleClick, open) => {
            return (
              <>
                <NavLink
                  text={key.name}
                  onClick={(e) => {
                    e.preventDefault();
                    sidebarExpand ? handleClick() : setSidebarExpand(true); 
                  }}
                >
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                </NavLink>
                <div
                  className={`translate transform overflow-hidden ${!open && 'hidden'}`}
                >
                  <ul className='mt-1 mb-5.5 flex flex-col gap-2.5'>
                    {key.sub_section.map((subKey, subIndex) => (
                      <NavLink
                        key={subIndex}
                        link={route('training-online.section', {
                          code: course.code, 
                          section: key.id, 
                          sub_section: subKey.id
                        })}
                        name={subKey.name}
                        text={subKey.name}
                        className={progress.includes(subKey.id) ? 'text-sky-400' : ''}
                      >
                        {progress.includes(subKey.id) && (
                          <Check className='absolute right-4 top-1/2 -translate-y-1/2 text-sky-400' />
                        )}
                      </NavLink>
                    ))}
                  </ul>
                </div>
              </>
            );
          }}
        </NavGroup>
      ))}
    </>
  )
}