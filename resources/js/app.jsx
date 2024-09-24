import './bootstrap';
import '../css/app.css';
import '../css/figtree.css';

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Inertia } from '@inertiajs/inertia';
import LoaderScreen from './Components/LoaderScreen';

const appName = import.meta.env.VITE_APP_NAME || 'Prisma LMS';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        function AppWrapper() {
            const [loading, setLoading] = useState(false);

            useEffect(() => {
                const handleStart = () => setLoading(true);
                const handleFinish = () => setLoading(false);

                Inertia.on('start', handleStart);
                Inertia.on('finish', handleFinish);

                return () => {
                    Inertia.off('start', handleStart);
                    Inertia.off('finish', handleFinish);
                };
            }, []);

            return (
                <>
                    {loading && <LoaderScreen />}
                    <App {...props} />
                </>
            );
        }

        root.render(<AppWrapper />);
    },
    progress: {
        color: '#fbbf24',
    },
});
