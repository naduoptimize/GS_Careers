import { useState, useEffect } from 'react';
import { getAllVacancyAuditLogs } from '../../services/api';
import { formatDate, formatDateTime } from '../../utils/constants';
import { FiActivity, FiSearch, FiClock, FiUser, FiBriefcase, FiAlertCircle, FiCheckCircle, FiXCircle, FiCalendar, FiUsers, FiTag, FiBook } from 'react-icons/fi';

function AuditLog({ admin }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [actionFilter, setActionFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');

    useEffect(() => {
        loadAuditLogs();
    }, []);

    const loadAuditLogs = async () => {
        try {
            setLoading(true);
            const res = await getAllVacancyAuditLogs();
            setLogs(res.data.data || []);
        } catch (err) {
            console.error('Failed to retrieve audit logs:', err);
        } finally {
            setLoading(false);
        }
    };

    // Get unique companies list for filter dropdown (only relevant for GS admin/super admin)
    const uniqueCompanies = Array.from(new Set(logs.map(log => log.company_name).filter(Boolean)));
    const uniqueActions = Array.from(new Set(logs.map(log => log.action).filter(Boolean)));

    // Filter logs based on search and selected options
    const filteredLogs = logs.filter(log => {
        const query = searchTerm.toLowerCase();
        const matchesSearch = 
            (log.vacancy_title && log.vacancy_title.toLowerCase().includes(query)) ||
            (log.vacancy_ref && log.vacancy_ref.toLowerCase().includes(query)) ||
            (log.admin_name && log.admin_name.toLowerCase().includes(query)) ||
            (log.reason && log.reason.toLowerCase().includes(query));

        const matchesAction = actionFilter === '' || log.action === actionFilter;
        const matchesCompany = companyFilter === '' || log.company_name === companyFilter;

        return matchesSearch && matchesAction && matchesCompany;
    });

    const getActionBadge = (action) => {
        const config = {
            initiated: { bg: '#eff6ff', color: '#1d4ed8', border: '#dbeafe', label: 'Draft Initiated' },
            submitted: { bg: '#faf5ff', color: '#6b21a8', border: '#f3e8ff', label: 'Submitted Approval' },
            edited: { bg: '#f8fafc', color: '#475569', border: '#e2e8f0', label: 'Vacancy Edited' },
            sub1_approved: { bg: '#fffbeb', color: '#b45309', border: '#fef3c7', label: 'Sub1 Approved' },
            global_approved: { bg: '#ecfdf5', color: '#047857', border: '#d1fae5', label: 'Published & Live' },
            approved: { bg: '#ecfdf5', color: '#047857', border: '#d1fae5', label: 'Approved' },
            rejected: { bg: '#fff1f2', color: '#be123c', border: '#ffe4e6', label: 'Requisition Rejected' },
            candidate_shortlisted: { bg: '#e0f2fe', color: '#0369a1', border: '#bae6fd', label: 'Candidate Shortlisted' },
            candidate_under_review: { bg: '#f0fdfa', color: '#0f766e', border: '#ccfbf1', label: 'Candidate Under Review' },
            candidate_rejected: { bg: '#fff1f2', color: '#be123c', border: '#ffe4e6', label: 'Candidate Rejected' },
            interview_scheduled: { bg: '#fff7ed', color: '#c2410c', border: '#ffedd5', label: 'Interview Scheduled' },
            interview_confirmed_yes: { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0', label: 'Interview Confirmed' },
            interview_confirmed_no: { bg: '#fff1f2', color: '#be123c', border: '#ffe4e6', label: 'Interview Declined' },
            candidate_hired: { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0', label: 'Candidate Hired' },
            candidate_unassigned: { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0', label: 'Hired Unassigned' },
        };

        const c = config[action] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0', label: action };
        return (
            <span style={{
                background: c.bg,
                color: c.color,
                border: `1px solid ${c.border}`,
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'inline-block'
            }}>
                {c.label}
            </span>
        );
    };

    const getRoleBadge = (role) => {
        const mapping = {
            super_admin: { label: 'Super Admin', color: '#be123c', bg: '#fff1f2' },
            admin: { label: 'GS Admin', color: '#1d4ed8', bg: '#eff6ff' },
            sub_admin1: { label: 'Sub Admin 1', color: '#b45309', bg: '#fffbeb' },
            sub_admin2: { label: 'Sub Admin 2', color: '#6d28d9', bg: '#f5f3ff' }
        };
        const r = mapping[role] || { label: role, color: '#475569', bg: '#f1f5f9' };
        return (
            <span style={{
                background: r.bg,
                color: r.color,
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.68rem',
                fontWeight: '700'
            }}>
                {r.label}
            </span>
        );
    };

    return (
        <div className="audit-log-page" style={{ animation: 'fadeIn 0.5s ease-out' }}>
            {/* ── HERO BANNER ── */}
            <div className="dashboard-hero-premium" style={{
                background: 'linear-gradient(135deg, var(--crimson-dark) 0%, var(--crimson) 100%)',
                borderRadius: '24px',
                padding: '36px 40px',
                marginBottom: '28px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)'
            }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(200, 169, 81, 0.15)',
                        border: '1px solid rgba(200, 169, 81, 0.25)',
                        color: '#C8A951',
                        padding: '5px 14px',
                        borderRadius: '100px',
                        fontSize: '0.68rem',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        marginBottom: '14px'
                    }}>
                        <FiActivity /> System Audit Trail
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2rem',
                        color: '#fff',
                        margin: '0 0 8px 0',
                        letterSpacing: '-0.5px'
                    }}>Activity Audit Logs</h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.55)',
                        fontSize: '0.85rem',
                        margin: 0
                    }}>
                        {admin.role === 'super_admin' || admin.role === 'admin'
                            ? 'Monitor, track, and audit recruitment processes globally across all subsidiary establishments.'
                            : `Audit trail history for ${admin.company_name} recruitment operations.`
                        }
                    </p>
                </div>
                <div style={{
                    position: 'absolute',
                    top: '-100px', right: '-100px',
                    width: '450px', height: '450px',
                    background: 'radial-gradient(circle, rgba(200, 169, 81, 0.1) 0%, transparent 70%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}></div>
            </div>

            {/* ── FILTER BAR ── */}
            <div className="card-p audit-filters-card" style={{ padding: '20px', borderRadius: '20px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', marginBottom: '24px' }}>
                <div className="audit-filters-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
                        <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
                        <input
                            type="text"
                            placeholder="Search by position, ref number, actor, or details..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px 12px 42px',
                                border: '1.5px solid #f1f5f9',
                                background: '#f8fafc',
                                borderRadius: '12px',
                                fontSize: '0.85rem',
                                color: 'var(--text-primary)',
                                fontWeight: '600',
                                outline: 'none',
                                transition: 'all 0.2s'
                            }}
                            onFocus={(e) => { e.target.style.borderColor = 'var(--crimson)'; e.target.style.backgroundColor = '#fff'; }}
                            onBlur={(e) => { e.target.style.borderColor = '#f1f5f9'; e.target.style.backgroundColor = '#f8fafc'; }}
                        />
                    </div>

                    {/* Action Filter */}
                    <div style={{ minWidth: '200px' }}>
                        <select
                            value={actionFilter}
                            onChange={(e) => setActionFilter(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1.5px solid #f1f5f9',
                                background: '#f8fafc',
                                borderRadius: '12px',
                                fontSize: '0.85rem',
                                color: 'var(--text-primary)',
                                fontWeight: '700',
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            <option value="">All Actions</option>
                            {uniqueActions.map(action => (
                                <option key={action} value={action}>{action.replace(/_/g, ' ').toUpperCase()}</option>
                            ))}
                        </select>
                    </div>

                    {/* Subsidiary Filter (Only for GS Admins) */}
                    {(admin.role === 'super_admin' || admin.role === 'admin') && (
                        <div style={{ minWidth: '200px' }}>
                            <select
                                value={companyFilter}
                                onChange={(e) => setCompanyFilter(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1.5px solid #f1f5f9',
                                    background: '#f8fafc',
                                    borderRadius: '12px',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-primary)',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                <option value="">All Subsidiaries</option>
                                {uniqueCompanies.map(company => (
                                    <option key={company} value={company}>{company}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>

            {/* ── LOGS TABLE ── */}
            <div className="card-p audit-table-card" style={{ padding: '0px', overflow: 'hidden', borderRadius: '20px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <div className="loading-orb" style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '3px solid rgba(139,26,43,0.1)',
                            borderTopColor: 'var(--crimson)',
                            animation: 'spin 0.8s linear infinite'
                        }}></div>
                    </div>
                ) : filteredLogs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                        <FiBook size={48} style={{ marginBottom: '14px', opacity: 0.6 }} />
                        <h3 style={{ margin: '0 0 6px 0', color: '#475569', fontSize: '1.1rem' }}>No Audit Logs Found</h3>
                        <p style={{ margin: 0, fontSize: '0.85rem' }}>No activity records match your search or filter criteria.</p>
                    </div>
                ) : (
                    <div className="premium-table-container" style={{ margin: 0, border: 'none', boxShadow: 'none', borderRadius: 0 }}>
                        <table className="premium-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '950px' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                                    <th style={{ padding: '16px 20px', fontSize: '0.68rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px', width: '160px', minWidth: '160px' }}>Timestamp</th>
                                    <th style={{ padding: '16px 20px', fontSize: '0.68rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px', width: '220px', minWidth: '220px' }}>Vacancy / Job Requisition</th>
                                    {(admin.role === 'super_admin' || admin.role === 'admin') && (
                                        <th style={{ padding: '16px 20px', fontSize: '0.68rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px', width: '160px', minWidth: '160px' }}>Subsidiary</th>
                                    )}
                                    <th style={{ padding: '16px 20px', fontSize: '0.68rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px', width: '160px', minWidth: '160px' }}>Action Logged</th>
                                    <th style={{ padding: '16px 20px', fontSize: '0.68rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px', width: '180px', minWidth: '180px' }}>Actor</th>
                                    <th style={{ padding: '16px 20px', fontSize: '0.68rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px', width: '320px', minWidth: '320px' }}>Log Detail / Metadata</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map((log) => (
                                    <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafbfc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                        <td style={{ padding: '16px 20px', fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <FiClock size={12} style={{ color: '#94a3b8' }} />
                                                <span>{formatDateTime(log.created_at)}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 20px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '700' }}>{log.vacancy_title}</strong>
                                                <span style={{ fontSize: '0.72rem', color: '#C8A951', fontFamily: 'monospace', marginTop: '2px', fontWeight: '700' }}>{log.vacancy_ref}</span>
                                            </div>
                                        </td>
                                        {(admin.role === 'super_admin' || admin.role === 'admin') && (
                                            <td style={{ padding: '16px 20px', fontSize: '0.82rem', color: '#475569', fontWeight: '700' }}>
                                                {log.company_name}
                                            </td>
                                        )}
                                        <td style={{ padding: '16px 20px' }}>
                                            {getActionBadge(log.action)}
                                        </td>
                                        <td style={{ padding: '16px 20px' }}>
                                            {log.admin_name ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                    <span style={{ fontSize: '0.85rem', color: '#334155', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <FiUser size={12} style={{ color: '#94a3b8' }} /> {log.admin_name}
                                                    </span>
                                                    <div>{getRoleBadge(log.admin_role)}</div>
                                                </div>
                                            ) : (
                                                <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic', fontWeight: '600' }}>System / Candidate</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '16px 20px', fontSize: '0.82rem', color: '#334155', lineHeight: '1.4' }}>
                                            {log.reason ? (
                                                <div style={{ 
                                                    background: '#f8fafc',
                                                    padding: '8px 12px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #f1f5f9',
                                                    fontWeight: '600',
                                                    fontSize: '0.78rem',
                                                    color: '#334155',
                                                    maxWidth: '350px',
                                                    wordBreak: 'break-word'
                                                }}>
                                                    {log.reason}
                                                </div>
                                            ) : (
                                                <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No additional details</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
            <style>{`
                .premium-table-container {
                    width: 100%;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    background: #fff;
                    border-radius: 12px;
                }
                .audit-table-card .premium-table {
                    table-layout: auto !important;
                    min-width: 1100px !important;
                    width: 100% !important;
                }
                .premium-table-container::-webkit-scrollbar {
                    height: 6px;
                }
                .premium-table-container::-webkit-scrollbar-track {
                    background: #f8fafc;
                    border-radius: 3px;
                }
                .premium-table-container::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 3px;
                }
                .premium-table-container::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }

                @media (max-width: 768px) {
                    .dashboard-hero-premium {
                        padding: 24px 20px !important;
                        margin-bottom: 20px !important;
                        border-radius: 16px !important;
                    }
                    .dashboard-hero-premium h1 {
                        font-size: 1.4rem !important;
                    }
                    .dashboard-hero-premium p {
                        font-size: 0.78rem !important;
                    }
                    .audit-filters-card {
                        padding: 14px 16px !important;
                        border-radius: 16px !important;
                        margin-bottom: 16px !important;
                    }
                    .audit-table-card {
                        border-radius: 16px !important;
                    }
                    .audit-filters-row {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        gap: 10px !important;
                    }
                    .audit-filters-row > div {
                        width: 100% !important;
                        min-width: 0 !important;
                    }
                    .premium-table th, .premium-table td {
                        padding: 12px 14px !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default AuditLog;
