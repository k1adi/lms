import { Link, Head } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            
            <div className="flex justify-center items-center min-h-screen bg-dots-darker bg-center bg-primary-lighter dark:bg-dots-lighter dark:bg-boxdark">
                <div className="fixed top-0 right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="btn btn--primary"
                            tabindex="0" role="button"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="btn btn--primary"
                            tabindex="0" role="button"
                        >
                            Log in
                        </Link>
                    )}
                </div>

                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="flex flex-col text-center justify-center">
                        <GraduationCap className='text-center mx-auto text-primary dark:text-sky-400 w-28 h-28 sm:w-36 sm:h-36' />

                        <span className='italic text-gray-600 dark:text-gray-400 font-medium'>Welcome to</span>
                        <h1 className='text-primary dark:text-sky-400 text-title-xxl'><b>PRISMA</b>LMS</h1>
                    </div>

                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
