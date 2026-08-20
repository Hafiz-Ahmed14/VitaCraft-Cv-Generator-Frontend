import { useState } from 'react';
import type { FormEvent } from 'react';
import logoImage from '../assets/logo/vitacraft-logo.svg';

type LoginPageProps = { navigate: (path: string) => void };

export function LoginPage({ navigate }: LoginPageProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch('/cv/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username.trim(), password }),
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                setMessage(data.error || data.message || 'Login failed. Please try again.');
                return;
            }

            setMessage('Login successful.');
            window.setTimeout(() => navigate('/dashboard'), 500);
        } catch {
            setMessage('Unable to connect to the server. Please try again.');
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
                            <label>Email or Username<input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter your email or username" required /></label>
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
