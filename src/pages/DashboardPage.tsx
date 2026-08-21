import { useEffect, useState } from 'react';
import type { CvTemplate } from '../components/dashboard/TemplateCard';
import { TemplateCard } from '../components/dashboard/TemplateCard';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import templateClassic from '../assets/images/Template1Home.png';
import templateModern from '../assets/images/Template2home.png';
import templateExecutive from '../assets/images/Template3home.png';
import templateMinimal from '../assets/images/Template4home.png';
import templateCreative from '../assets/images/Template5home.png';
import templateEditorial from '../assets/images/Template6home.png';
import { api, postWithCsrf } from '../lib/api';
import './DashboardPage.css';

type DashboardPageProps = {
    navigate: (path: string) => void;
};

type UserProfile = {
    userId: string;
    username: string;
    email: string;
};

type ApiResponse<T> = {
    success: boolean;
    data: T;
};

const templates: CvTemplate[] = [
    { id: 'classic', name: 'Classic Professional', description: 'A refined choice for clear, traditional applications.', preview: templateClassic },
    { id: 'modern', name: 'Modern Edge', description: 'A balanced contemporary layout with a confident look.', preview: templateModern },
    { id: 'executive', name: 'Executive', description: 'Structured and polished for experienced professionals.', preview: templateExecutive },
    { id: 'minimal', name: 'Minimal', description: 'Simple typography that keeps your experience in focus.', preview: templateMinimal },
    { id: 'creative', name: 'Creative', description: 'A distinctive style for design-forward careers.', preview: templateCreative },
    { id: 'editorial', name: 'Editorial', description: 'An elegant, content-led layout with visual character.', preview: templateEditorial },
];

export function DashboardPage({ navigate }: DashboardPageProps) {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadProtectedPage = async () => {
            try {
                const response = await api.get<ApiResponse<UserProfile>>('/v1/page/protected');
                if (!response.data.success || !response.data.data) {
                    throw new Error('The user profile was not returned.');
                }

                if (isMounted) {
                    setUser(response.data.data);
                }
            } catch {
                if (isMounted) {
                    navigate('/login');
                }
            }
        };

        void loadProtectedPage();

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await postWithCsrf('/v1/auth/logout', {});
        } finally {
            navigate('/login');
        }
    };

    const handleUseTemplate = () => {
        navigate('/generatecv');
    };

    if (!user) {
        return (
            <div className="dashboard-page-modern min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center text-secondary">
                    <div className="spinner-border dashboard-spinner mb-3" role="status" />
                    <p className="mb-0">Checking your session...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page-modern min-vh-100">
            <DashboardHeader userName={user.username} email={user.email} onLogout={handleLogout} />

            <main className="container py-5">
                <section className="dashboard-welcome p-4 p-md-5 mb-5 rounded-4">
                    <p className="dashboard-eyebrow mb-2">YOUR WORKSPACE</p>
                    <h1 className="display-6 fw-bold mb-3">Welcome back, {user.username}.</h1>
                    <p className="mb-0 text-secondary">Select a template to start shaping a CV that makes your experience stand out.</p>
                </section>

                <section aria-labelledby="template-heading">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-2 mb-4">
                        <div>
                            <p className="dashboard-eyebrow mb-1">START CREATING</p>
                            <h2 id="template-heading" className="h2 fw-bold mb-0">Choose your CV template</h2>
                        </div>
                        <p className="text-secondary mb-0">Pick a design, then make it yours.</p>
                    </div>

                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                        {templates.map((template) => (
                            <div className="col" key={template.id}>
                                <TemplateCard template={template} onUseTemplate={handleUseTemplate} />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
