import { useState } from 'react';
import type { FormEvent } from 'react';

type ContactUsPageProps = { navigate: (path: string) => void };

export function ContactUsPage({ navigate }: ContactUsPageProps) {
    const [form, setForm] = useState({ name: '', email: '', subject: '', question: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch('/cv/sendemail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                setMessage('Failed to send your message. Please try again.');
                return;
            }

            setMessage('Your message has been sent successfully.');
            setForm({ name: '', email: '', subject: '', question: '' });
        } catch {
            setMessage('Unable to connect to the server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (

        <main className="standalone-contact-page">
            <section className="standalone-contact-intro"><p className="legacy-info-eyebrow">CONTACT US</p><h1>How can we help?</h1><p>Have a question about VitaCraft, your account, or creating a CV? Send us a message and our team will get back to you.</p></section>
            <section className="legacy-contact-panel standalone-contact-panel">
                <form onSubmit={handleSubmit}>
                    <label>Name<input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Your name" required /></label>
                    <label>Email<input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="you@example.com" required /></label>
                    <label>Subject<input value={form.subject} onChange={(event) => updateField('subject', event.target.value)} placeholder="How can we help?" required /></label>
                    <label>Message<textarea value={form.question} onChange={(event) => updateField('question', event.target.value)} rows={6} placeholder="Write your message" required /></label>
                    {message && <p className="auth-message">{message}</p>}
                    <button type="submit" className="legacy-primary-action" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
                </form>
                <div><h2>Contact VitaCraft</h2><p>We are here to help you make your CV feel clear, confident, and ready to send.</p><p><strong>Email:</strong> support@vitacraft.com</p><button type="button" className="auth-inline-link" onClick={() => navigate('/')}>Back to home</button></div>
            </section>
        </main>
    );
}
