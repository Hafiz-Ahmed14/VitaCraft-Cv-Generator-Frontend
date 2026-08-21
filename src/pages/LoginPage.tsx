import { useState } from 'react';
import type { FormEvent } from 'react';
import logoImage from '../assets/logo/vitacraft-logo.svg';
import { getApiErrorMessage, postWithCsrf } from '../lib/api';

type LoginPageProps = { navigate: (path: string) => void };

export function LoginPage({ navigate }: LoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const data = await postWithCsrf<{ success: boolean; message: string; data?: { url?: string } }, { email: string; password: string }>(
                '/v1/auth/login',
                { email: email.trim(), password },
            );

            if (!data.success) {
                setMessage(data.message || 'Login failed. Please try again.');
                return;
            }

            sessionStorage.setItem('vitacraft_user_name', email.trim().split('@')[0]);
            setMessage(data.message || 'Login successful.');
            window.setTimeout(() => navigate(data.data?.url || '/dashboard'), 500);
        } catch (error) {
            setMessage(getApiErrorMessage(error, 'Unable to connect to the server. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-shell">
            <main className="auth-main">
                <div className="auth-layout">
                    <aside className="auth-aside"><img src={logoImage} alt="VitaCraft" /><p className="auth-aside__eyebrow">YOUR CAREER, CLEARLY PRESENTED</p><h1>Build the next version of your story.</h1><p>Keep your experience organized, choose a polished template, and create a CV ready for your next opportunity.</p><div className="auth-aside__points"><span>✓ Guided CV sections</span><span>✓ Professional templates</span><span>✓ PDF-ready documents</span></div></aside>
                    <div className="auth-card">
                        <div className="auth-card__heading"><div className="auth-logo">VC</div><div><p className="auth-eyebrow">WELCOME BACK</p><h2>Log in to VitaCraft</h2></div></div>
                        <p className="auth-subtitle">Continue building your professional CV.</p>
                        {message && <p className="auth-message">{message}</p>}
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" required /></label>
                            <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required /></label>
                            <button type="submit" className="primary-button" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                        </form>
                        <div className="auth-links"><a href="#/forgotpassword">Forgot Password?</a><span>Not have an account? <button type="button" className="auth-inline-link" onClick={() => navigate('/register')}>Sign Up</button></span></div>
                    </div>
                </div>
            </main>
        </div>
    );
}
