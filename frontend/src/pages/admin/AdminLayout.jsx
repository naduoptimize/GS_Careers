import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FiGrid, FiBriefcase, FiUsers, FiUserPlus, FiLogOut, FiMenu, FiX, FiTarget, FiChevronRight, FiSettings, FiCheckCircle, FiActivity } from 'react-icons/fi';
import { API_BASE, getPendingApprovals } from '../../services/api';

const BACKEND_ROOT = API_BASE.replace('/api', '');

function AdminLayout({ admin, children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [vacanciesExpanded, setVacanciesExpanded] = useState(location.pathname.startsWith('/admin/vacancies') || location.pathname.startsWith('/admin/companies'));
    const [approvalsExpanded, setApprovalsExpanded] = useState(location.pathname.startsWith('/admin/approvals'));
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        const fetchPendingCount = async () => {
            try {
                const res = await getPendingApprovals();
                const list = res.data.data || [];
                let count = 0;
                if (admin.role === 'sub_admin1') {
                    count = list.filter(v => v.approval_status === 'pending_subadmin1').length;
                } else if (admin.role === 'super_admin' || admin.role === 'admin') {
                    count = list.filter(v => v.approval_status === 'pending_global' || v.approval_status === 'pending_subadmin1').length;
                }
                setPendingCount(count);
            } catch (err) {
                console.error('Failed to fetch pending approvals count:', err);
            }
        };

        if (admin && admin.role !== 'sub_admin2') {
            fetchPendingCount();
            
            // Sync count every 30 seconds for live indicators
            const interval = setInterval(fetchPendingCount, 30000);
            return () => clearInterval(interval);
        }
    }, [admin]);

    const handleLogout = () => {
        localStorage.removeItem('gs_admin_token');
        localStorage.removeItem('gs_admin_data');
        navigate('/admin/login');
    };

    const getRoleDisplayName = (role) => {
        const mapping = {
            super_admin: 'Super Admin',
            admin: 'GS Admin',
            sub_admin1: 'Sub Admin 1',
            sub_admin2: 'Sub Admin 2',
            sub_admin: 'Sub Admin 2'
        };
        return mapping[role] || 'Sub Admin';
    };

    const initials = (admin.full_name || 'Admin')
        .split(' ')
        .filter(Boolean)
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    const navItems = [
        { to: '/admin', icon: <FiGrid />, label: 'Dashboard', end: true, badge: null },
        { to: '/admin/vacancies', icon: <FiBriefcase />, label: 'Vacancies', badge: null },
        { to: '/admin/approvals', icon: <FiCheckCircle />, label: 'Approvals', badge: pendingCount > 0 ? pendingCount : null },
        { to: '/admin/applicants', icon: <FiUsers />, label: 'Applicants', badge: null },
        { to: '/admin/talent-pool', icon: <FiTarget />, label: 'Talent Pool', badge: null },
        { to: '/admin/audit-log', icon: <FiActivity />, label: 'Audit Log', badge: null },
    ];

    if (admin.role === 'super_admin' || admin.role === 'admin') {
        navItems.push({ to: '/admin/admins', icon: <FiUserPlus />, label: 'Manage Admins', badge: null });
    }

    if (admin.role === 'super_admin') {
        navItems.push({ to: '/admin/settings', icon: <FiSettings />, label: 'Settings', badge: null });
    }

    const currentPage = navItems.find(item => {
        if (item.end) return location.pathname === '/admin';
        return location.pathname.startsWith(item.to);
    })?.label || 'Dashboard';

    return (
        <div className={`admin-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            {/* Mobile header */}
            <div className="admin-mobile-header">
                <button className="hamburger-btn" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle Sidebar">
                    {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
                <div className="mobile-brand" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img 
                        src={admin.role !== 'super_admin' && admin.role !== 'admin' && admin.company_logo ? `${BACKEND_ROOT}/uploads/logos/${admin.company_logo}` : "/gs-logo.png"} 
                        alt="George Steuart & Co" 
                        className="sidebar-logo" 
                        onError={(e) => e.target.src = "/gs-logo.png"}
                        style={{ height: 32, width: 'auto', objectFit: 'contain', background: admin.role !== 'super_admin' && admin.role !== 'admin' && admin.company_logo ? '#fff' : 'transparent', padding: admin.role !== 'super_admin' && admin.role !== 'admin' && admin.company_logo ? '2px' : '0', borderRadius: '4px' }} 
                    />
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--crimson)' }}>Admin</span>
                </div>
                <div style={{ width: 44 }}></div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

            {/* Enhanced Sidebar */}
            <aside className={`admin-sidebar enhanced-sidebar ${sidebarOpen ? 'open' : ''}`}>
                {/* Sidebar decorative top bar */}
                <div className="sidebar-top-accent"></div>

                <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                        <div className="sidebar-logo-wrapper">
                            <img 
                                src={admin.role !== 'super_admin' && admin.role !== 'admin' && admin.company_logo ? `${BACKEND_ROOT}/uploads/logos/${admin.company_logo}` : "/gs-logo.png"} 
                                alt="George Steuart & Co" 
                                className="sidebar-logo" 
                                onError={(e) => e.target.src = "/gs-logo.png"}
                                style={{ background: admin.role !== 'super_admin' && admin.role !== 'admin' && admin.company_logo ? '#fff' : 'transparent', padding: admin.role !== 'super_admin' && admin.role !== 'admin' && admin.company_logo ? '4px' : '0', borderRadius: '8px', objectFit: 'contain' }}
                            />
                        </div>
                        <div className="sidebar-brand-text" style={{ flex: 1, minWidth: 0 }}>
                            <div className="sidebar-title" style={{ whiteSpace: 'normal', lineHeight: '1.3' }}>{admin.role !== 'super_admin' && admin.role !== 'admin' && admin.company_name ? admin.company_name : 'George Steuart'}</div>
                            {admin.role !== 'sub_admin1' && admin.role !== 'sub_admin2' && admin.role !== 'sub_admin' && (
                                <div className="sidebar-role">
                                    <span className="role-dot"></span>
                                    {getRoleDisplayName(admin.role)}
                                </div>
                            )}
                        </div>
                    </div>
                    <button 
                        className="sidebar-collapse-toggle" 
                        onClick={() => {
                            if (window.innerWidth <= 1024) {
                                setSidebarOpen(false);
                            } else {
                                setSidebarCollapsed(!sidebarCollapsed);
                            }
                        }}
                        aria-label="Toggle Sidebar" 
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: 'var(--crimson)', 
                            cursor: 'pointer', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            padding: '8px', 
                            borderRadius: '8px', 
                            transition: 'all 0.2s',
                            flexShrink: 0
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 26, 43, 0.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <FiMenu size={20} />
                    </button>
                </div>

                {/* Navigation label */}
                <div className="sidebar-nav-label">NAVIGATION</div>

                <nav className="sidebar-nav">
                    {navItems.map(item => {
                        if (item.label === 'Vacancies') {
                            const isVacanciesActive = location.pathname.startsWith('/admin/vacancies') || location.pathname.startsWith('/admin/companies');
                            return (
                                <div key={item.to} className="sidebar-dropdown-container">
                                    <div
                                        className={`sidebar-link ${isVacanciesActive ? 'active' : ''}`}
                                        onClick={() => {
                                            setVacanciesExpanded(!vacanciesExpanded);
                                            navigate('/admin/vacancies');
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <span className="sidebar-link-icon">{item.icon}</span>
                                        <span className="sidebar-link-text">{item.label}</span>
                                        <FiChevronRight 
                                            className="sidebar-link-arrow" 
                                            size={14} 
                                            style={{ 
                                                transform: vacanciesExpanded ? 'rotate(90deg)' : 'translateX(-4px)',
                                                opacity: 1,
                                                transition: 'transform 0.2s ease'
                                            }} 
                                        />
                                    </div>
                                    
                                    {vacanciesExpanded && (
                                        <div className="sidebar-submenu animate-slide-down">
                                              <NavLink
                                                  to="/admin/vacancies"
                                                  end
                                                  className={({ isActive }) => `sidebar-sublink ${isActive ? 'active' : ''}`}
                                                  onClick={() => setSidebarOpen(false)}
                                              >
                                                  <span className="sidebar-sublink-bullet"></span>
                                                  <span>Add Vacancies</span>
                                              </NavLink>
                                              {(admin.role === 'super_admin' || admin.role === 'admin') && (
                                                  <>
                                                      <NavLink
                                                          to="/admin/vacancies/reports"
                                                          className={({ isActive }) => `sidebar-sublink ${isActive ? 'active' : ''}`}
                                                          onClick={() => setSidebarOpen(false)}
                                                      >
                                                          <span className="sidebar-sublink-bullet"></span>
                                                          <span>Manage Vacancies</span>
                                                      </NavLink>
                                                      <NavLink
                                                          to="/admin/companies"
                                                          className={({ isActive }) => `sidebar-sublink ${isActive ? 'active' : ''}`}
                                                          onClick={() => setSidebarOpen(false)}
                                                      >
                                                          <span className="sidebar-sublink-bullet"></span>
                                                          <span>Manage Company</span>
                                                      </NavLink>
                                                  </>
                                              )}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        if (item.label === 'Approvals') {
                            const isApprovalsActive = location.pathname.startsWith('/admin/approvals');
                            return (
                                <div key={item.to} className="sidebar-dropdown-container">
                                    <div
                                        className={`sidebar-link ${isApprovalsActive ? 'active' : ''}`}
                                        onClick={() => {
                                            setApprovalsExpanded(!approvalsExpanded);
                                            navigate('/admin/approvals');
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <span className="sidebar-link-icon">{item.icon}</span>
                                        <span className="sidebar-link-text">{item.label}</span>
                                        {item.badge && <span className="sidebar-badge" style={{ marginRight: '8px' }}>{item.badge}</span>}
                                        <FiChevronRight 
                                            className="sidebar-link-arrow" 
                                            size={14} 
                                            style={{ 
                                                transform: approvalsExpanded ? 'rotate(90deg)' : 'translateX(-4px)',
                                                opacity: 1,
                                                transition: 'transform 0.2s ease'
                                            }} 
                                        />
                                    </div>
                                    
                                    {approvalsExpanded && (
                                        <div className="sidebar-submenu animate-slide-down">
                                            <NavLink
                                                to="/admin/approvals"
                                                end
                                                className={({ isActive }) => `sidebar-sublink ${isActive ? 'active' : ''}`}
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sidebar-sublink-bullet"></span>
                                                <span>Pending Approvals</span>
                                            </NavLink>
                                            <NavLink
                                                to="/admin/approvals/tracker"
                                                className={({ isActive }) => `sidebar-sublink ${isActive ? 'active' : ''}`}
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sidebar-sublink-bullet"></span>
                                                <span>Approval Tracker</span>
                                            </NavLink>
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="sidebar-link-icon">{item.icon}</span>
                                <span className="sidebar-link-text">{item.label}</span>
                                {item.badge && <span className="sidebar-badge">{item.badge}</span>}
                                <FiChevronRight className="sidebar-link-arrow" size={14} />
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    {/* User profile card */}
                    <div className="sidebar-user-card">
                        <div className="sidebar-avatar-enhanced">
                            <span>{initials}</span>
                            <div className="avatar-online-dot"></div>
                        </div>
                        <div className="sidebar-user-info">
                            <div className="sidebar-user-name">{admin.full_name}</div>
                            <div className="sidebar-user-role">
                                {admin.role === 'super_admin' ? 'Super Admin' : (admin.role === 'admin' ? 'GS Admin' : `${getRoleDisplayName(admin.role)} · ${admin.company_name || ''}`)}
                            </div>
                        </div>
                    </div>
                    <button className="sidebar-logout-btn" onClick={handleLogout}>
                        <FiLogOut size={15} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="admin-content">
                {children}
            </main>

            <style jsx="true">{`
                /* ── ENHANCED SIDEBAR STYLES ── */
                .enhanced-sidebar {
                    background: #fff;
                    border-right: 1px solid rgba(0,0,0,0.05);
                    box-shadow: 4px 0 24px rgba(139, 26, 43, 0.06);
                }

                .sidebar-top-accent {
                    height: 3px;
                    background: linear-gradient(90deg, var(--crimson), var(--gold-accent, #C8A951), var(--crimson));
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                }

                .sidebar-logo-wrapper {
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid rgba(0,0,0,0.06);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fafafa;
                    flex-shrink: 0;
                }

                .sidebar-role {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .role-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #10b981;
                    box-shadow: 0 0 6px rgba(16,185,129,0.5);
                    animation: pulsate 2s infinite;
                }

                @keyframes pulsate {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(0.85); }
                }

                .sidebar-nav-label {
                    font-size: 0.6rem;
                    font-weight: 800;
                    color: #cbd5e1;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    padding: 16px 20px 6px;
                }

                .sidebar-link {
                    position: relative;
                    overflow: hidden;
                }

                .sidebar-link-icon {
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                    width: 20px;
                }

                .sidebar-link-text {
                    flex: 1;
                    font-weight: 600;
                    font-size: 0.88rem;
                    transition: all 0.3s ease;
                }

                .sidebar-link-arrow {
                    opacity: 0;
                    transform: translateX(-4px);
                    transition: all 0.3s ease;
                    color: var(--gold-accent, #C8A951);
                }

                .sidebar-link:hover .sidebar-link-arrow,
                .sidebar-link.active .sidebar-link-arrow {
                    opacity: 1;
                    transform: translateX(0);
                }

                .sidebar-badge {
                    background: var(--crimson);
                    color: #fff;
                    font-size: 0.65rem;
                    font-weight: 800;
                    padding: 2px 7px;
                    border-radius: 100px;
                    min-width: 20px;
                    text-align: center;
                }

                .sidebar-link.active {
                    background: linear-gradient(135deg, rgba(139, 26, 43, 0.08), rgba(139, 26, 43, 0.04));
                    color: var(--crimson);
                    border-right: 3px solid var(--crimson);
                    font-weight: 700;
                }

                .sidebar-link.active .sidebar-link-icon {
                    color: var(--crimson);
                    transform: scale(1.1);
                }

                .sidebar-link:hover:not(.active) {
                    background: rgba(0,0,0,0.025);
                    padding-left: 26px;
                }

                /* Submenu / Dropdown Styles */
                .sidebar-submenu {
                    padding-left: 24px;
                    margin-top: 4px;
                    margin-bottom: 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .sidebar-sublink {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 16px;
                    color: #64748b;
                    font-size: 0.82rem;
                    font-weight: 600;
                    text-decoration: none;
                    border-radius: 10px;
                    transition: all 0.25s ease;
                }

                .sidebar-sublink-bullet {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #cbd5e1;
                    transition: all 0.25s ease;
                }

                .sidebar-sublink:hover {
                    color: var(--crimson);
                    background: rgba(139, 26, 43, 0.03);
                    padding-left: 20px;
                }

                .sidebar-sublink:hover .sidebar-sublink-bullet {
                    background: var(--crimson);
                    transform: scale(1.3);
                }

                .sidebar-sublink.active {
                    color: var(--crimson);
                    background: linear-gradient(135deg, rgba(139, 26, 43, 0.05), rgba(139, 26, 43, 0.02));
                    font-weight: 700;
                }

                .sidebar-sublink.active .sidebar-sublink-bullet {
                    background: var(--crimson);
                    transform: scale(1.4);
                    box-shadow: 0 0 6px rgba(139, 26, 43, 0.4);
                }

                .animate-slide-down {
                    animation: slideDown 0.25s ease-out;
                }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* User Card */
                .sidebar-user-card {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    background: linear-gradient(135deg, #fafafa, #f1f5f9);
                    border-radius: 14px;
                    border: 1px solid #f1f5f9;
                    margin-bottom: 12px;
                    cursor: default;
                }

                .sidebar-avatar-enhanced {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, var(--crimson), #6B1420);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: #fff;
                    flex-shrink: 0;
                    position: relative;
                    box-shadow: 0 4px 12px rgba(139, 26, 43, 0.25);
                }

                .avatar-online-dot {
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 10px;
                    height: 10px;
                    background: #10b981;
                    border: 2px solid #fff;
                    border-radius: 50%;
                }

                .sidebar-user-info {
                    flex: 1;
                    min-width: 0;
                }

                .sidebar-user-name {
                    font-size: 0.82rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .sidebar-user-role {
                    font-size: 0.7rem;
                    color: var(--text-muted);
                    white-space: normal;
                    line-height: 1.3;
                }

                .sidebar-logout-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    width: 100%;
                    padding: 10px 14px;
                    background: rgba(220, 38, 38, 0.06);
                    border: 1px solid rgba(220, 38, 38, 0.1);
                    color: #dc2626;
                    border-radius: 12px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: var(--font-body);
                    justify-content: center;
                }

                .sidebar-logout-btn:hover {
                    background: rgba(220, 38, 38, 0.1);
                    border-color: rgba(220, 38, 38, 0.2);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
                }

                /* ── COLLAPSED STATE STYLES ── */
                @media (min-width: 1025px) {
                    .admin-layout.sidebar-collapsed .enhanced-sidebar {
                        width: 76px;
                    }
                    
                    .admin-layout.sidebar-collapsed .admin-content {
                        margin-left: 76px;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-brand-text,
                    .admin-layout.sidebar-collapsed .sidebar-link-text,
                    .admin-layout.sidebar-collapsed .sidebar-link-arrow,
                    .admin-layout.sidebar-collapsed .sidebar-nav-label,
                    .admin-layout.sidebar-collapsed .sidebar-user-info,
                    .admin-layout.sidebar-collapsed .sidebar-logout-btn span,
                    .admin-layout.sidebar-collapsed .sidebar-submenu {
                        display: none !important;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-logo-wrapper {
                        width: 36px;
                        height: 36px;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-brand {
                        justify-content: center;
                        gap: 0;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-header {
                        padding: 0 10px 20px;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-link {
                        justify-content: center;
                        padding: 12px;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-link-icon {
                        margin: 0;
                        width: auto;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-user-card {
                        padding: 6px;
                        justify-content: center;
                        background: none;
                        border: none;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-avatar-enhanced {
                        margin: 0;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-logout-btn {
                        padding: 10px;
                        background: none;
                        border: none;
                        color: #dc2626;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-logout-btn:hover {
                        background: rgba(220, 38, 38, 0.08);
                        box-shadow: none;
                    }
                }
            `}</style>
        </div>
    );
}

export default AdminLayout;
