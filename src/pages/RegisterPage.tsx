import { useState } from 'react';
import type { FormEvent } from 'react';
import logoImage from '../assets/logo/vitacraft-logo.svg';

type RegisterPageProps = { navigate: (path: string) => void };

export function RegisterPage({ navigate }: RegisterPageProps) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage('');

        if (username.trim().length < 3) { setMessage('Username must be at least 3 characters long.'); return; }
        if (password.length < 6) { setMessage('Password must be at least 6 characters long.'); return; }
        if (password !== confirmPassword) { setMessage('Passwords do not match.'); return; }

        setLoading(true);
        try {
            const response = await fetch('/cv/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username.trim(), email: email.trim(), password }),
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                setMessage(typeof data === 'string' ? data : data.message || data.error || 'Registration failed. Please try again.');
                return;
            }

            setMessage('Registration successful. Redirecting to login...');
            window.setTimeout(() => navigate('/login'), 700);
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
                    <aside className="auth-aside"><img src={logoImage} alt="VitaCraft" /><p className="auth-aside__eyebrow">START WITH CONFIDENCE</p><h1>Make your first impression count.</h1><p>Create a professional CV with a structured editor designed to keep your strengths front and center.</p><div className="auth-aside__points"><span>✓ Simple guided workflow</span><span>✓ Flexible CV templates</span><span>✓ Ready to download and share</span></div></aside>
                    <div className="auth-card auth-card--wide">
                        <div className="auth-card__heading"><div className="auth-logo">VC</div><div><p className="auth-eyebrow">GET STARTED</p><h2>Create your account</h2></div></div>
                        <p className="auth-subtitle">Start creating professional CVs with VitaCraft.</p>
                        {message && <p className="auth-message">{message}</p>}
                        <form className="auth-form auth-form--grid" onSubmit={handleSubmit}>
                            <label>Username<input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Choose a username" required /></label>
                            <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" required /></label>
                            <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create a password" required /></label>
                            <label>Confirm Password<input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm your password" required /></label>
                            <button type="submit" className="primary-button auth-submit" disabled={loading}>{loading ? 'Creating account...' : 'Create Account'}</button>
                        </form>
                        <div className="auth-links"><span>Already have an account? <button type="button" className="auth-inline-link" onClick={() => navigate('/login')}>Login</button></span></div>
                    </div>
                </div>
            </main>
        </div>
    );
}
