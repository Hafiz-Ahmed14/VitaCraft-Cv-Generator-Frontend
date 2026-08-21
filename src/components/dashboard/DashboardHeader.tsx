import { useState } from 'react';
import logoImage from '../../assets/logo/vitacraft-logo.svg';

type DashboardHeaderProps = {
    userName: string;
    email: string;
    onLogout: () => void | Promise<void>;
};

function getInitials(userName: string): string {
    return userName
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

export function DashboardHeader({ userName, email, onLogout }: DashboardHeaderProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const initials = getInitials(userName);

    return (
        <header className="dashboard-header border-bottom bg-white sticky-top">
            <div className="container py-3 d-flex align-items-center justify-content-between gap-3">
                <a className="dashboard-brand" href="#/dashboard" aria-label="VitaCraft dashboard">
                    <img src={logoImage} alt="VitaCraft" />
                </a>
                <div className="d-flex align-items-center gap-2 gap-sm-3">
                    <div className="position-relative">
                        <button
                            type="button"
                            className="dashboard-profile-trigger"
                            onClick={() => setIsProfileOpen((isOpen) => !isOpen)}
                            aria-expanded={isProfileOpen}
                            aria-haspopup="menu"
                        >
                            <span className="dashboard-avatar">{initials}</span>
                            <span className="dashboard-user d-none d-sm-inline">{userName}</span>
                            <svg className="dashboard-chevron" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {isProfileOpen && (
                            <div className="dashboard-profile-menu shadow-lg" role="menu">
                                <div className="dashboard-profile-summary p-4 border-bottom text-center">
                                    <span className="dashboard-avatar dashboard-avatar--large">{initials}</span>
                                    <p className="fw-bold mt-3 mb-1 text-truncate">{userName}</p>
                                    <p className="small text-secondary mb-0 text-truncate">{email}</p>
                                </div>
                                <div className="p-2 d-grid gap-1">
                                    <button type="button" className="btn btn-light text-start" role="menuitem" onClick={() => setIsProfileOpen(false)}>Profile</button>
                                    <button type="button" className="btn btn-light text-start" role="menuitem" onClick={() => setIsProfileOpen(false)}>Settings</button>
                                    <hr className="my-1" />
                                    <button type="button" className="btn dashboard-dropdown-logout text-start" role="menuitem" onClick={() => void onLogout()}>Logout</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
