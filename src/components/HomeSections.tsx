import { useEffect, useState } from 'react';
import chooseTemplateImage from '../assets/images/Choose_A_Template_Home.png';
import fillInformationImage from '../assets/images/Fill_in_the_information_home.png';
import heroImage from '../assets/images/Fullscreen2.jpeg';
import template1Image from '../assets/images/Template1Home.png';
import template2Image from '../assets/images/Template2home.png';
import template3Image from '../assets/images/Template3home.png';
import template4Image from '../assets/images/Template4home.png';
import template5Image from '../assets/images/Template5home.png';
import template6Image from '../assets/images/Template6home.png';

type HomeSectionsProps = { navigate: (path: string) => void };
type Template = { title: string; image: string; path: string };
type UserStatProps = { target: number; suffix: string; label: string; delay: number };

const templates: Template[] = [
    { title: 'Template 1', image: template1Image, path: '/template1home' },
    { title: 'Template 2', image: template2Image, path: '/template3home' },
    { title: 'Template 3', image: template3Image, path: '/template4home' },
    { title: 'Template 4', image: template4Image, path: '/template6home' },
    { title: 'Template 5', image: template5Image, path: '/template1home' },
    { title: 'Template 6', image: template6Image, path: '/template3home' },
];

const testimonialImages = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/75.jpg',
];

function UserStat({ target, suffix, label, delay }: UserStatProps) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let animationFrame = 0;
        let startTime = 0;
        const duration = 1400;

        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * easedProgress));

            if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };

        const timeout = window.setTimeout(() => {
            animationFrame = requestAnimationFrame(animate);
        }, delay);

        return () => {
            window.clearTimeout(timeout);
            cancelAnimationFrame(animationFrame);
        };
    }, [delay, target]);

    return <article className="user-stat"><strong>{value}{suffix}</strong><span>{label}</span></article>;
}

export function HomeSections({ navigate }: HomeSectionsProps) {
    const [templateStart, setTemplateStart] = useState(0);
    const [profileImages] = useState(() => [...testimonialImages].sort(() => Math.random() - 0.5));
    const visibleTemplates = Array.from({ length: 3 }, (_, index) => templates[(templateStart + index) % templates.length]);

    const moveTemplates = (direction: number) => {
        setTemplateStart((current) => (current + direction + templates.length) % templates.length);
    };

    return (
        <main id="top">
            <section className="hero-section--professional">
                <div className="hero-section--professional__copy">
                    <p className="hero-kicker">VitaCraft CV builder</p>
                    <h1>Create a CV that gets you noticed.</h1>
                    <p className="hero-section--professional__intro">Build a clear, professional CV in minutes with guided sections and polished templates made for your next opportunity.</p>
                    <div className="hero-actions">
                        <button type="button" className="hero-action hero-action--primary" onClick={() => navigate('/generatecv')}>Create my CV</button>
                        <button type="button" className="hero-action hero-action--secondary" onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}>Explore templates</button>
                    </div>
                    <div className="hero-proof"><span>✓</span> Free to start <span>✓</span> Professional templates <span>✓</span> PDF ready</div>
                </div>
                <div className="hero-section--professional__visual"><img src={heroImage} alt="Professional CV workspace" /></div>
            </section>

            <section className="powerful-features-section">
                <div className="features-heading">
                    <h2>Powerful Features</h2>
                    <p>Everything you need to build a professional CV with confidence.</p>
                    <span aria-hidden="true" />
                </div>
                <div className="features-grid">
                    {[
                        ['◔', 'Guided CV Builder', 'Complete each CV section with a clear, focused workflow that keeps your information organized.', 'Builder'],
                        ['⌘', 'Professional Templates', 'Choose polished layouts designed to present your experience clearly and professionally.', 'Templates'],
                        ['✓', 'Smart Section Editing', 'Add, update, and refine education, experience, skills, languages, and references with ease.', 'Editor'],
                        ['▤', 'PDF-Ready Export', 'Review your finished CV and export a clean document ready for applications and sharing.', 'Export'],
                        ['✦', 'Personalized Design', 'Adjust your content and choose a visual style that reflects your professional identity.', 'Design'],
                        ['▣', 'Secure CV Workspace', 'Keep your CV information structured in one place while you prepare for your next opportunity.', 'Workspace'],
                    ].map(([icon, title, description, tag]) => <article className="feature-card" key={title}><div className="feature-card__icon" aria-hidden="true">{icon}</div><h3>{title}</h3><p>{description}</p><span>{tag}</span></article>)}
                </div>
            </section>

            <section className="four-steps-section">
                <div className="section-heading"><h2>Create your CV in 4 steps</h2></div>
                <div className="four-steps-grid">
                    {[
                        ['Start your way', 'Import an existing CV or start from scratch.', chooseTemplateImage],
                        ['Write it with AI', 'Get tailored phrasing for each section as you type.', fillInformationImage],
                        ['Make it yours', 'Adjust colors, fonts, and spacing in one click.', template1Image],
                        ['Download and apply', 'Export to PDF or Word and start applying.', template3Image],
                    ].map(([title, description, image]) => <article className="four-step-card" key={title}><div className="four-step-card__visual"><img src={image} alt="" /></div><h3>{title}</h3><p>{description}</p></article>)}
                </div>
                <button type="button" className="four-steps-action" onClick={() => navigate('/generatecv')}>Create my CV</button>
            </section>

            <section className="legacy-templates-section" id="templates">
                <div className="section-heading"><p className="section-kicker">Find your fit</p><h2>Choose your CV template</h2><p>Start with a strong structure, then make it yours.</p></div>
                <div className="legacy-carousel">
                    <button type="button" className="legacy-carousel-arrow" onClick={() => moveTemplates(-1)} aria-label="Previous templates">‹</button>
                    <div className="legacy-template-grid">{visibleTemplates.map((template) => <article className="legacy-template-card" key={template.title}><img src={template.image} alt={template.title} /><button type="button" onClick={() => navigate(template.path)}>Use Template</button></article>)}</div>
                    <button type="button" className="legacy-carousel-arrow" onClick={() => moveTemplates(1)} aria-label="Next templates">›</button>
                </div>
            </section>

            <section className="user-stats-section" aria-label="VitaCraft statistics">
                <div className="user-stats-grid">
                    <UserStat target={25} suffix="K+" label="CVs downloaded" delay={0} />
                    <UserStat target={18} suffix="K+" label="People using VitaCraft" delay={120} />
                    <UserStat target={96} suffix="%" label="Happy users" delay={240} />
                    <UserStat target={24} suffix="/7" label="Support available" delay={360} />
                </div>
            </section>

            <section className="testimonials-section">
                <div className="section-heading"><p className="section-kicker">Real stories</p><h2>What do our users say about CVmaker?</h2><p>They all found their dream job, thanks to CVmaker:</p></div>
                <div className="testimonials-grid">
                    {[
                        ['Dylan', 'Function Management', 'Undoubtedly, CVmaker was a great success for me. Within 15 minutes, I had created my resume and sent it with the email program.'],
                        ['Sarah', 'Marketing Specialist', 'The guided builder helped me turn years of experience into a CV that finally felt confident and focused.'],
                        ['David', 'Software Engineer', 'I created a polished CV in one evening and received interview invitations the same week.'],
                    ].map(([name, role, quote], index) => <article className="testimonial-card" key={name}><div className="testimonial-card__header"><img src={profileImages[index]} alt={`${name} testimonial`} /><div><strong>{name}</strong><div className="testimonial-card__stars" aria-label="5 out of 5 stars">★★★★★</div></div></div><p>{quote}</p><div className="testimonial-card__role"><strong>{role.split(' ')[0]}</strong>{role.includes(' ') ? ` ${role.substring(role.indexOf(' ') + 1)}` : ''}</div></article>)}
                </div>
            </section>
        </main>
    );
}
