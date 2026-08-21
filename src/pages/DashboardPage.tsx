import type { CvTemplate } from '../components/dashboard/TemplateCard';
import { TemplateCard } from '../components/dashboard/TemplateCard';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import templateClassic from '../assets/images/Template1Home.png';
import templateModern from '../assets/images/Template2home.png';
import templateExecutive from '../assets/images/Template3home.png';
import templateMinimal from '../assets/images/Template4home.png';
import templateCreative from '../assets/images/Template5home.png';
import templateEditorial from '../assets/images/Template6home.png';
import './DashboardPage.css';

type DashboardPageProps = {
    userName: string;
    navigate: (path: string) => void;
};

const templates: CvTemplate[] = [
    { id: 'classic', name: 'Classic Professional', description: 'A refined choice for clear, traditional applications.', preview: templateClassic },
    { id: 'modern', name: 'Modern Edge', description: 'A balanced contemporary layout with a confident look.', preview: templateModern },
    { id: 'executive', name: 'Executive', description: 'Structured and polished for experienced professionals.', preview: templateExecutive },
    { id: 'minimal', name: 'Minimal', description: 'Simple typography that keeps your experience in focus.', preview: templateMinimal },
    { id: 'creative', name: 'Creative', description: 'A distinctive style for design-forward careers.', preview: templateCreative },
    { id: 'editorial', name: 'Editorial', description: 'An elegant, content-led layout with visual character.', preview: templateEditorial },
];

export function DashboardPage({ userName, navigate }: DashboardPageProps) {
    const handleLogout = () => {
        sessionStorage.removeItem('vitacraft_user_name');
        navigate('/login');
    };

    const handleUseTemplate = () => {
        navigate('/generatecv');
    };

    return (
        <div className="dashboard-page-modern min-vh-100">
            <DashboardHeader userName={userName} onLogout={handleLogout} />

            <main className="container py-5">
                <section className="dashboard-welcome p-4 p-md-5 mb-5 rounded-4">
                    <p className="dashboard-eyebrow mb-2">YOUR WORKSPACE</p>
                    <h1 className="display-6 fw-bold mb-3">Welcome back, {userName}.</h1>
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
