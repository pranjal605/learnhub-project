
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, User, LogOut, Sparkles } from 'lucide-react';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = false;

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar-glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '1rem 0',
            background: 'rgba(10, 10, 15, 0.7)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <div className="container flex justify-between items-center">
                <Link to="/" className="logo-container flex items-center gap-2">
                    <div style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                        padding: '8px',
                        borderRadius: '12px',
                        display: 'flex'
                    }}>
                        <BookOpen size={24} color="white" />
                    </div>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '-0.5px'
                    }}>
                        LearnHub
                    </span>
                </Link>

                <div className="nav-links flex items-center gap-1">
                    <NavLink to="/subjects" active={isActive('/subjects')}>Subjects</NavLink>
                    <NavLink to="/career-navigator" active={isActive('/career-navigator')} badge="New">
                        <Sparkles size={16} />
                        Navigator
                    </NavLink>

                    <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)', margin: '0 1rem' }}></div>

                    <Link to="/profile" className={`nav-icon-btn ${isActive('/profile') ? 'active' : ''}`} style={{
                        padding: '10px',
                        borderRadius: '50%',
                        color: 'var(--text-muted)',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <User size={20} />
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <button className="btn-icon">
                                <LogOut size={20} />
                            </button>
                        </>
                    ) : (
                        <Link to="/auth" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

const NavLink = ({ to, children, active, badge }) => (
    <Link to={to} style={{
        padding: '0.6rem 1rem',
        borderRadius: '12px',
        color: active ? 'white' : 'var(--text-muted)',
        background: active ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        fontWeight: '500',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        position: 'relative'
    }}
        onMouseEnter={(e) => {
            if (!active) e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
            if (!active) e.currentTarget.style.color = 'var(--text-muted)';
        }}
    >
        {children}
        {badge && (
            <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: 'var(--accent)',
                color: 'white',
                fontSize: '0.6rem',
                padding: '2px 6px',
                borderRadius: '10px',
                fontWeight: 'bold'
            }}>{badge}</span>
        )}
    </Link>
);

export default Navbar;
