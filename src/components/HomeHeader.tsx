import { useEffect, useState } from 'react';
import logoImage from '../assets/logo/vitacraft-logo.svg';

type HomeHeaderProps = {
    navigate: (path: string) => void;
    onHome: () => void;
};

export function HomeHeader({ navigate, onHome }: HomeHeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('vitacraft-theme') === 'dark');

    useEffect(() => {
        document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
        localStorage.setItem('vitacraft-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const goTo = (path: string) => {
        setMenuOpen(false);
        navigate(path);
    };

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <button type="button" className="site-brand" onClick={onHome} aria-label="VitaCraft home">
                    <img src={logoImage} alt="VitaCraft" />
                </button>

                <button
                    type="button"
                    className="site-menu-toggle"
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((current) => !current)}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <nav className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`} aria-label="Main navigation">
                    <button type="button" onClick={() => goTo('/about-cv')}>About CV</button>
                    <button type="button" onClick={() => goTo('/faq')}>FAQ</button>
                    <button type="button" onClick={() => goTo('/contactus')}>Contact Us</button>
                    <div className="site-nav__dropdown">
                        <button type="button" aria-haspopup="true">Templates <span>⌄</span></button>
                        <div className="site-nav__dropdown-menu">
                            <button type="button" onClick={() => goTo('/cover-letter')}>Cover Letter</button>
                            <button type="button" onClick={() => goTo('/template1home')}>CV (Fixed)</button>
                            <button type="button" onClick={() => goTo('/generatecv')}>CV (Custom)</button>
                            <button type="button" onClick={() => goTo('/template3home')}>Resume (Fixed)</button>
                            <button type="button" onClick={() => goTo('/generatecv')}>Resume (Custom)</button>
                        </div>
                    </div>
                    <button type="button" className="site-nav__login" onClick={() => goTo('/login')}>Login</button>
                    <button
                        type="button"
                        className="site-theme-toggle"
                        onClick={() => setDarkMode((current) => !current)}
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {darkMode ? '☼' : '☾'}
                    </button>
                </nav>
            </div>
        </header>
    );
}
