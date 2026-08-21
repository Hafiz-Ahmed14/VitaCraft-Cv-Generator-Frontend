type DashboardHeaderProps = {
    userName: string;
    onLogout: () => void;
};

export function DashboardHeader({ userName, onLogout }: DashboardHeaderProps) {
    return (
        <header className="dashboard-header border-bottom bg-white sticky-top">
            <div className="container py-3 d-flex align-items-center justify-content-between gap-3">
                <a className="dashboard-brand text-decoration-none" href="#/dashboard">VitaCraft</a>
                <div className="d-flex align-items-center gap-3">
                    <span className="dashboard-user d-none d-sm-inline">{userName}</span>
                    <button type="button" className="btn btn-outline-primary dashboard-logout" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
