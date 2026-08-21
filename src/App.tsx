import { useEffect, useMemo, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { ContactUsPage } from './pages/ContactUsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';

function CVBuilderPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
        >
            <div>
                <h1 style={{ color: "#5B61C3" }}>CV Builder</h1>

                <p style={{ color: "#667085", fontSize: "18px" }}>
                    This page is under construction..
                </p>
            </div>
        </div>
    );
}

const appRoutes = [
    { path: '/', element: <HomePage navigate={(path) => { window.location.hash = path; }} /> },
    { path: '/about-cv', element: <HomePage page="about" navigate={(path) => { window.location.hash = path; }} /> },
    { path: '/faq', element: <HomePage page="faq" navigate={(path) => { window.location.hash = path; }} /> },
    { path: '/contactus', element: <ContactUsPage navigate={(path) => { window.location.hash = path; }} /> },
    { path: '/login', element: <LoginPage navigate={(path) => { window.location.hash = path; }} /> },
    { path: '/register', element: <RegisterPage navigate={(path) => { window.location.hash = path; }} /> },
    {
        path: '/dashboard',
        element: <DashboardPage
            userName={sessionStorage.getItem('vitacraft_user_name') || 'VitaCraft User'}
            navigate={(path) => { window.location.hash = path; }}
        />,
    },
    { path: '/generatecv', element: <CVBuilderPage /> },
    { path: '/template1home', element: <CVBuilderPage /> },
    { path: '/template3home', element: <CVBuilderPage /> },
    { path: '/template4home', element: <CVBuilderPage /> },
    { path: '/template6home', element: <CVBuilderPage /> },
    { path: '/cover-letter', element: <CVBuilderPage /> },
];

const getPath = () => {
    const hashPath = window.location.hash.replace('#', '') || '/';
    return hashPath.startsWith('/') ? hashPath : `/${hashPath}`;
};

export default function App() {
    const [currentPath, setCurrentPath] = useState<string>(getPath());

    const route = useMemo(() => {
        const match = appRoutes.find((entry) => entry.path === currentPath);
        return match ?? appRoutes[0];
    }, [currentPath]);

    useEffect(() => {
        const handleHashChange = () => setCurrentPath(getPath());
        window.addEventListener('hashchange', handleHashChange);

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        route.element
    );
}
