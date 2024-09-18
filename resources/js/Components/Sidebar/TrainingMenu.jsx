import { usePage } from '@inertiajs/react';
import NavGroup from './NavGroup';
import NavLink from './NavLink';

import { BookOpen, BookOpenCheck, Check, ChevronDown } from 'lucide-react';

export default function TrainingMenu({ sidebarExpand, setSidebarExpand }) {
  const { url: inertiaUrl } = usePage();
  const urlPath = inertiaUrl.split('/');
  const { 
    auth: { 
      user: {
        progression: progress 
      }
    }, 
    course
  } = usePage().props;
  const section = course?.sections;
  console.log(progress, 'user progress');

  return (
    <>
      <NavLink
        link='#'
        name='introduction'
        text='Introduction'
        active={course.code == urlPath[3] && !urlPath[4]}
      >
        <BookOpenCheck className='absolute right-4 top-1/2 -translate-y-1/2 text-sky-400' />
      </NavLink>
      {section.map((key, index) => (
        <NavGroup key={index}>
          {(handleClick, open) => {
            return (
              <>
                <NavLink
                  text={key.name}
                  active={urlPath[4] == key.id}
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
                        link={route('training.online.section', {
                          code: course.code, 
                          section: key.id, 
                          sub_section: subKey.id
                        })}
                        name={subKey.name}
                        text={subKey.name}
                        active={urlPath[5] == subKey.id}
                        className={progress.includes(subKey.id) ? 'text-sky-400' : ''}
                      >
                        {progress.includes(subKey.id) ? (
                          <BookOpenCheck className='absolute right-4 top-1/2 -translate-y-1/2 text-sky-400' />
                        ): (
                          <BookOpen className='absolute right-4 top-1/2 -translate-y-1/2' />
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