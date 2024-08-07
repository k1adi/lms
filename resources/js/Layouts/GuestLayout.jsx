import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-primary-lighter dark:bg-sky-400">
            <div>
                <Link href="/">
                    <GraduationCap className='text-center mx-auto text-primary dark:text-white w-28 h-28 sm:w-36 sm:h-36' />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
