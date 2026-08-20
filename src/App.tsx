import { useEffect, useMemo, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { ContactUsPage } from './pages/ContactUsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Generate CV', path: '/generatecv' },
];

function DashboardPage() {
    return (
        <div className="dashboard-page">
            <header className="topbar topbar--dashboard">
                <div className="brand-wrap">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=200&q=80" alt="Brand" />
                </div>
                <nav className="nav-links">
                    {navItems.map((item) => (
                        <button key={item.path} type="button" onClick={() => window.location.hash = item.path}>{item.label}</button>
                    ))}
                </nav>
            </header>

            <main className="dashboard-main">
                <section className="dashboard-intro">
                    <h1>Welcome back</h1>
                    <p>Choose a template and generate your CV in minutes.</p>
                    <button type="button" className="primary-button" onClick={() => window.location.hash = '/generatecv'}>Generate Your CV</button>
                </section>

                <section className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>Saved Templates</h3>
                        <p>Classic, Modern, Cyan Panel, Editorial</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Custom CV</h3>
                        <p>Create a brand new resume from scratch.</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Favourite Templates</h3>
                        <p>Quick access to your most used layouts.</p>
                    </div>
                </section>
            </main>
        </div>
    );
}

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
    { path: '/dashboard', element: <DashboardPage /> },
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
