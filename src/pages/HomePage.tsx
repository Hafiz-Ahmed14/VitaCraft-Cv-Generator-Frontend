import heroImage from '../assets/images/Fullscreen2.jpeg';
import { HomeHeader } from '../components/HomeHeader';
import { HomeSections } from '../components/HomeSections';

type HomePageProps = {
    navigate: (path: string) => void;
    page?: 'home' | 'about' | 'faq' | 'contact';
};

const faqs = [
    ['What is a CV?', 'Writing a CV involves presenting your skills, education, experiences, and achievements in a clear and professional manner to impress potential employers.'],
    ['What to include in a CV?', 'A well-rounded CV includes personal information, a professional summary, education, skills, work experience or projects, and achievements.'],
    ['What is the purpose of a CV?', 'A CV provides a detailed overview of your professional background, skills, and achievements to potential employers.'],
    ['How to write a CV?', 'Start with your personal details, then add a professional summary, education, skills, work experience, projects, and relevant achievements.'],
];

export function HomePage({ navigate, page = 'home' }: HomePageProps) {
    const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <div className="home-page legacy-home-page">
            <HomeHeader navigate={navigate} onHome={() => page === 'home' ? scrollTo('top') : navigate('/')} />
            {page === 'home' ? <HomeSections navigate={navigate} /> : <InfoPage page={page} navigate={navigate} />}
            <footer className="legacy-home-footer">
                <div className="footer-content">
                    <div className="footer-brand"><strong>VitaCraft</strong><p>Create a professional CV that tells your story clearly and helps you move toward your next opportunity.</p></div>
                    <div className="footer-column"><h3>Explore</h3><a href="#top">Home</a><a href="#templates">Templates</a><a href="#custom">How it works</a></div>
                    <div className="footer-column"><h3>Resources</h3><a href="#top">About CV</a><a href="#top">FAQ</a><a href="#top">Contact Us</a></div>
                    <div className="footer-column"><h3>Build your future</h3><p>Make your next application stronger with a CV designed around your strengths.</p><button type="button" onClick={() => navigate('/generatecv')}>Create your CV</button></div>
                </div>
                <div className="footer-bottom"><p>© 2025 VitaCraft. All Rights Reserved.</p><div><a href="#top">Facebook</a><a href="#top">LinkedIn</a><a href="#top">Instagram</a></div></div>
            </footer>
        </div>
    );
}

function InfoPage({ page, navigate }: { page: 'about' | 'faq' | 'contact'; navigate: (path: string) => void }) {
    if (page === 'about') {
        return (
            <main className="legacy-info-page legacy-about-page">
                <article className="legacy-cv-article">
                    <p className="legacy-info-eyebrow">ABOUT CV</p>
                    <h1>CV (Curriculum Vitae)</h1>
                    <p className="legacy-article-lead">Information, Frequently Asked Questions, and Tips on Your resume.</p>
                    <section><h2>What is a CV or resume?</h2><p>CV or resume is an abbreviation of the Latin words 'curriculum vitae', which mean 'life course'. A professional resume provides a summary and a good overview of someone's life.</p><p>Your resume includes your education(s) and qualifications, work experience, skills, and important qualities. By means of your resume, your potential employer will be able to get a good picture of your skills, work experience, and knowledge quickly, to assess whether or not you fit the job, and therefore whether to offer you a job interview.</p></section>
                    <section><h2>What should I include in my curriculum vitae?</h2><p>Your resume should only contain information relevant to your potential employer. So that means, what should be in your resume can differ per application. However, the bare minimum of details on your resume should at least include;</p><h3>Personal details</h3><p>Of course, your new employers should be able to contact you for a job interview. Therefore, you always start by mentioning your full name and email address and (mobile) phone number. Also mention your place of residence and address, as an employer might prefer an employee living nearby. In case a driver's license is required for the role, also mention it. In case you have a representative LinkedIn profile or personal website, you can include a link to it in the personal details section.</p><h3>Work experience</h3><p>In an a-chronological order, list your latest work experience. Start with your latest job and continue with the jobs you worked at before. Per job, give a short clear summary of your tasks, responsibilities and skills. Tip: try and list skills and responsibilities most relevant to the role you’re applying for!</p><h3>Education</h3><p>Just like the previous overview of work experience, start of with your last study or highest level of education. Also name the school or institution where you studied, the starting date and date of graduation.</p><p>The aforementioned parts should be present on any resume, at any application. However, you if you really want to stand out from other applicants, it is strongly advisable to put in a little more effort. You want potential employers to see that you are the best fit for the job. Therefore, consider adding the following sections to your resume;</p><h3>Personal statement or resume profile</h3><p>Most modern resumes include a short introductory paragraph called personal statement or profile. In this paragraph, which is read by most recruiters, you will get the chance to sell yourself in a few sentences; the kind of role you are looking for, your qualities and ambitions.</p><h3>Competencies and skills</h3><p>All jobs are different of course. However, during your career, you gain competencies and skills which are transferable. These strong personal traits are gained through experience and will help you execute any other job more efficiently.</p><h3>Courses and work-related trainings</h3><p>Some employers offer courses or trainings to improve certain skills of their employees. If you have followed any and they’ve improved skills or competencies that are relevant for your new job, make sure to include them. Make sure to mention whether you earned a diploma or certificate!</p><h3>Activities</h3><p>You can also gain certain skills and competencies in a non-professional setting. For instance by doing voluntary work as a coach, trainer or accountant for a club or organization. If you have done these activities during your study, they are referred to as an extracurricular activity. Make sure to list them including the skills you gained.</p></section>
                    <section><h2>What is a chronological resume, and what order should it be in?</h2><p>The most widely used resume is known as the Chronological resume. This means that time-dependent components, such as education and work experience, are represented in a reverse-chronological structure. Your last (most recent) job should be first (top), and your first job should be last (bottom). This also applies to all other experiences that you mention on your resume that took place within a certain period, such as study programs, courses, internships, and ancillary activities.</p><p>The order of your resume is then as follows: personal and contact details, followed by a concise personal profile about yourself. Hereafter, state your training, followed by any work experience, languages, skills, characteristics, and interests.</p></section>
                    <section><h2>How to make your own resume (or application letter)</h2><p>You can create a resume with your own word processing program such as Microsoft Word, and then convert it to PDF format. Search the Internet for a free resume example or resume template and see if you can replicate it. Or, use our <a href="https://app.cvmaker.com/#/personal-details/" target="_blank" rel="noreferrer">CV maker</a> where you can simply enter your data and your perfect resume will be available for download in just 15 minutes. Of course, the same can be done to create an accompanying application letter, too!</p><p>When you have completed your resume and application letter, you will be able to send both - along with an accompanying email - to the vacancy you wish to apply for.</p></section>
                    <section><h2>Tips for creating your perfect resume</h2><p>Within our <a href="https://app.cvmaker.com/#/personal-details/" target="_blank" rel="noreferrer">CV maker</a> page, you will find tips with each section to help make your resume the best it can be. Along with these, here are some general tips:</p><ul><li>Only mention relevant information that will add value to the application for the vacancy you are applying for, or that will be of interest to future employers.</li><li>Do not mention hobbies or interests that will raise awkward questions.</li><li>State the most important information on the first page. Include a concise personal profile about yourself.</li><li>Use bullet points and numbered lists to your advantage by making your resume transparent to recruiters.</li><li>Always choose the chronological resume structure, unless otherwise requested in the vacancy.</li><li>Keep your resume short and powerful. Mention important information concisely.</li><li>Keep an eye on our blog for more resume and job application tips!</li></ul></section>
                </article>
            </main>
        );
    }

    const content = {
        faq: { eyebrow: 'FAQ', title: 'Everything you need to know about creating a CV.', text: 'Find practical answers about CV structure, templates, personal details, and preparing your document for a job application.' },
        contact: { eyebrow: 'CONTACT US', title: 'Let us help you build your next opportunity.', text: 'Have a question about VitaCraft or need help with your CV? Send us a message and our team will get back to you.' },
    }[page];

    return (
        <main className="legacy-info-page">
            <section className="legacy-info-hero"><div><p className="legacy-info-eyebrow">{content.eyebrow}</p><h1>{content.title}</h1><p>{content.text}</p></div><img src={heroImage} alt="Professional CV workspace" /></section>
            {page === 'faq' && <section className="legacy-info-faq">{faqs.map(([question, answer]) => <article key={question}><h2>{question}</h2><p>{answer}</p></article>)}</section>}
            {page === 'contact' && <section className="legacy-contact-panel"><form><label>Name<input placeholder="Your name" /></label><label>Email<input type="email" placeholder="you@example.com" /></label><label>Message<textarea rows={5} placeholder="How can we help?" /></label><button type="button" className="legacy-primary-action">Send Message</button></form><div><h2>Contact VitaCraft</h2><p>We are here to help you make your CV feel clear, confident, and ready to send.</p><p><strong>Email:</strong> support@vitacraft.com</p></div></section>}
            <button type="button" className="legacy-primary-action legacy-info-cta" onClick={() => navigate('/generatecv')}>Create Your CV</button>
        </main>
    );
}
