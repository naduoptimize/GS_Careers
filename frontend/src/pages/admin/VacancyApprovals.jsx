import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    FiCheckCircle, FiXCircle, FiClock, FiAlertCircle, FiSearch, FiFilter,
    FiEye, FiArrowLeft, FiCheck, FiX, FiCalendar, FiBriefcase, FiMapPin,
    FiInfo, FiChevronLeft, FiChevronRight, FiUsers, FiActivity, FiUser
} from 'react-icons/fi';
import { getPendingApprovals, approveVacancy, rejectVacancy, API_BASE } from '../../services/api';
import { formatDate, daysLeft } from '../../utils/constants';
import './VacancyApprovals.css';

const BACKEND_ROOT = API_BASE.replace('/api', '');

const renderApprovalTimeline = (v) => {
    if (!v) return null;

    const steps = [];

    // Step 1: Requisition Initiated
    steps.push({
        label: 'Requisition Initiated',
        status: 'completed',
        icon: 'FiPlus',
        color: '#16a34a',
        detail: `Created by ${v.creator_name || 'System'}`,
        time: v.created_at ? formatDate(v.created_at) : formatDate(v.publish_date)
    });

    // Step 2: Sub Admin 1 Approval
    const requiresSub1 = v.creator_role === 'sub_admin2' || (!v.creator_role && (v.sub1_approved_by || v.approval_status === 'pending_subadmin1' || (v.approval_status === 'rejected' && v.rejected_by_name && !v.sub1_approved_by && !v.global_approved_by)));
    
    if (requiresSub1) {
        let stepStatus = 'pending';
        let detail = 'Pending review by Sub Admin 1';
        let time = '';
        let color = '#94a3b8';

        if (v.sub1_approved_by) {
            stepStatus = 'completed';
            detail = `Approved by ${v.sub1_approved_by_name}`;
            time = formatDate(v.sub1_approved_at);
            color = '#16a34a';
        } else if (v.approval_status === 'pending_subadmin1') {
            stepStatus = 'active';
            detail = 'Awaiting review by Sub Admin 1';
            color = '#d97706';
        } else if (v.approval_status === 'rejected' && v.rejected_by_name && !v.global_approved_by_name) {
            stepStatus = 'rejected';
            detail = `Rejected by ${v.rejected_by_name}`;
            time = formatDate(v.rejected_at);
            color = '#dc2626';
        } else if (v.approval_status === 'draft') {
            stepStatus = 'pending';
            detail = 'Awaiting submission';
            color = '#94a3b8';
        }

        steps.push({
            label: 'Sub Admin 1 Approval',
            status: stepStatus,
            icon: 'FiCheckCircle',
            color: color,
            detail: detail,
            time: time
        });
    } else {
        steps.push({
            label: 'Sub Admin 1 Approval',
            status: 'skipped',
            icon: 'FiCheckCircle',
            color: '#64748b',
            detail: 'Bypassed (Direct submission by ' + (v.creator_role === 'sub_admin1' ? 'Sub Admin 1' : 'Admin') + ')',
            time: ''
        });
    }

    // Step 3: Global Admin Approval
    let step3Status = 'pending';
    let step3Detail = 'Awaiting previous step';
    let step3Time = '';
    let step3Color = '#94a3b8';

    const isSub1Done = !requiresSub1 || v.sub1_approved_by;
    
    if (v.global_approved_by) {
        step3Status = 'completed';
        step3Detail = `Approved by ${v.global_approved_by_name}`;
        step3Time = formatDate(v.global_approved_at);
        step3Color = '#16a34a';
    } else if (v.approval_status === 'pending_global') {
        step3Status = 'active';
        step3Detail = 'Awaiting review by Global Admin';
        step3Color = '#2563eb';
    } else if (v.approval_status === 'rejected' && v.rejected_by_name && (v.global_approved_by_name || !requiresSub1 || v.sub1_approved_by_name)) {
        step3Status = 'rejected';
        step3Detail = `Rejected by ${v.rejected_by_name}`;
        step3Time = formatDate(v.rejected_at);
        step3Color = '#dc2626';
    } else if (isSub1Done && v.approval_status !== 'draft') {
        step3Status = 'pending';
        step3Detail = 'Pending review by Global Admin';
    }

    steps.push({
        label: 'Global Admin Approval',
        status: step3Status,
        icon: 'FiCheckCircle',
        color: step3Color,
        detail: step3Detail,
        time: step3Time
    });

    // Step 4: Publication
    let step4Status = 'pending';
    let step4Detail = 'Awaiting final approval';
    let step4Color = '#94a3b8';
    
    if (v.approval_status === 'approved') {
        const isLive = v.is_active && daysLeft(v.expire_date) > 0;
        step4Status = 'completed';
        step4Detail = isLive ? 'Vacancy is LIVE and publishable' : 'Vacancy posting has ended';
        step4Color = isLive ? '#16a34a' : '#64748b';
    }

    steps.push({
        label: 'Vacancy Activation',
        status: step4Status,
        icon: 'FiBriefcase',
        color: step4Color,
        detail: step4Detail,
        time: v.approval_status === 'approved' && v.global_approved_at ? formatDate(v.global_approved_at) : ''
    });

    return (
        <div className="approval-stepper-timeline" style={{ marginTop: '24px', marginBottom: '24px', padding: '20px', background: 'rgba(255,255,255,0.4)', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                <FiClock /> Requisition Approval Timeline
            </h4>
            <div className="stepper-track" style={{ display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative' }}>
                {steps.map((step, idx) => {
                    const isLast = idx === steps.length - 1;
                    return (
                        <div key={idx} className={`stepper-item ${step.status}`} style={{ display: 'flex', gap: '16px', position: 'relative', paddingBottom: isLast ? '0' : '20px' }}>
                            {!isLast && (
                                <div className="stepper-line" style={{
                                    position: 'absolute',
                                    left: '14px',
                                    top: '28px',
                                    bottom: '0',
                                    width: '2px',
                                    background: step.status === 'completed' ? '#16a34a' : '#cbd5e1',
                                    zIndex: 1
                                }}></div>
                            )}
                            
                            <div className="stepper-node" style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: step.status === 'completed' ? 'rgba(22, 163, 74, 0.1)' : 
                                            step.status === 'active' ? 'rgba(37, 99, 235, 0.1)' :
                                            step.status === 'rejected' ? 'rgba(220, 38, 38, 0.1)' :
                                            step.status === 'skipped' ? 'rgba(100, 116, 139, 0.1)' : '#f1f5f9',
                                border: `2px solid ${
                                    step.status === 'completed' ? '#16a34a' :
                                    step.status === 'active' ? '#2563eb' :
                                    step.status === 'rejected' ? '#dc2626' :
                                    step.status === 'skipped' ? '#64748b' : '#cbd5e1'
                                }`,
                                color: step.status === 'completed' ? '#16a34a' :
                                       step.status === 'active' ? '#2563eb' :
                                       step.status === 'rejected' ? '#dc2626' :
                                       step.status === 'skipped' ? '#64748b' : '#64748b',
                                zIndex: 2,
                                flexShrink: 0,
                                fontSize: '0.85rem',
                                fontWeight: 'bold'
                            }}>
                                {idx + 1}
                            </div>
                            
                            <div className="stepper-content" style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingTop: '4px' }}>
                                <span className="stepper-label" style={{
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    color: step.status === 'active' ? '#1e293b' : 'var(--text-secondary)'
                                }}>
                                    {step.label}
                                    {step.status === 'skipped' && <span style={{ marginLeft: '8px', fontSize: '0.7rem', color: '#64748b', padding: '1px 6px', background: '#e2e8f0', borderRadius: '4px' }}>Skipped</span>}
                                    {step.status === 'active' && <span style={{ marginLeft: '8px', fontSize: '0.7rem', color: '#b45309', padding: '1px 6px', background: '#fef3c7', borderRadius: '4px' }}>Awaiting Action</span>}
                                </span>
                                <span className="stepper-detail" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    {step.detail}
                                </span>
                                {step.time && (
                                    <span className="stepper-time" style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                        <FiCalendar size={10} /> {step.time}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

function VacancyApprovals({ admin }) {
    const searchParams = new URLSearchParams(window.location.search);
    const highlightId = searchParams.get('highlight');
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(admin.role === 'sub_admin2' || highlightId ? 'pipeline' : 'action_required'); // 'action_required', 'pipeline'
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [viewDetail, setViewDetail] = useState(null);
    const [showRejectModal, setShowRejectModal] = useState(null); // stores vacancy object being rejected
    const [rejectionReason, setRejectionReason] = useState('');
    const [submittingReject, setSubmittingReject] = useState(false);
    const [submittingApprove, setSubmittingApprove] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await getPendingApprovals();
            const loadedVacancies = res.data.data || [];
            setVacancies(loadedVacancies);

            // Handle initial highlight page calculation
            if (highlightId && loadedVacancies.length > 0) {
                const defaultActiveTab = admin.role === 'sub_admin2' || highlightId ? 'pipeline' : 'action_required';
                const requiresActionLocal = (v) => {
                    if (admin.role === 'sub_admin1') return v.approval_status === 'pending_subadmin1';
                    if (admin.role === 'super_admin' || admin.role === 'admin') return v.approval_status === 'pending_global';
                    return false;
                };
                const filtered = loadedVacancies.filter(v => {
                    if (defaultActiveTab === 'action_required' && !requiresActionLocal(v)) return false;
                    return true;
                });
                const targetIndex = filtered.findIndex(v => v.id == highlightId);
                if (targetIndex !== -1) {
                    const targetPage = Math.floor(targetIndex / itemsPerPage) + 1;
                    setCurrentPage(targetPage);
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to load approval pipeline data');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            setSubmittingApprove(true);
            await approveVacancy({ id });
            toast.success('Vacancy approved successfully!');
            setViewDetail(null);
            loadData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to approve vacancy');
        } finally {
            setSubmittingApprove(false);
        }
    };

    const handleRejectSubmit = async (e) => {
        e.preventDefault();
        if (!rejectionReason.trim()) {
            toast.error('Please enter a rejection reason');
            return;
        }

        try {
            setSubmittingReject(true);
            await rejectVacancy({ id: showRejectModal.id, rejection_reason: rejectionReason });
            toast.success('Vacancy rejected successfully');
            setShowRejectModal(null);
            setRejectionReason('');
            setViewDetail(null);
            loadData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to reject vacancy');
        } finally {
            setSubmittingReject(false);
        }
    };

    // Filter logic
    const requiresAction = (v) => {
        if (admin.role === 'sub_admin1') {
            return v.approval_status === 'pending_subadmin1';
        }
        if (admin.role === 'super_admin' || admin.role === 'admin') {
            return v.approval_status === 'pending_global';
        }
        return false; // sub_admin2 has no actions
    };

    const filteredVacancies = vacancies.filter(v => {
        // Tab filtering
        if (activeTab === 'action_required' && !requiresAction(v)) {
            return false;
        }

        // Search filtering
        const matchesSearch = 
            v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (v.reference_number && v.reference_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
            v.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.designation.toLowerCase().includes(searchTerm.toLowerCase());

        // Status Filter (Only applicable in All Pipeline tab)
        const matchesStatus = !statusFilter || v.approval_status === statusFilter;

        // Company Filter
        const matchesCompany = !companyFilter || v.company_id == companyFilter;

        return matchesSearch && matchesStatus && matchesCompany;
    });

    // Pagination
    const totalPages = Math.ceil(filteredVacancies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedVacancies = filteredVacancies.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, companyFilter, activeTab]);

    useEffect(() => {
        if (highlightId && !loading && vacancies.length > 0) {
            // Wait slightly for rendering to complete on the target page
            setTimeout(() => {
                const el = document.getElementById(`vacancy-card-${highlightId}`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.classList.add('highlighted-card-active');
                }
            }, 300);
        }
    }, [loading, vacancies]);

    // Metrics calculations
    const stats = {
        actionRequired: vacancies.filter(v => requiresAction(v)).length,
        pendingSub1: vacancies.filter(v => v.approval_status === 'pending_subadmin1').length,
        pendingGlobal: vacancies.filter(v => v.approval_status === 'pending_global').length,
        rejected: vacancies.filter(v => v.approval_status === 'rejected').length,
        approved: vacancies.filter(v => v.approval_status === 'approved').length,
    };

    // Helper: render job description formatted
    const renderFormattedText = (text) => {
        if (!text) return null;
        const lines = text.split('\n');
        const result = [];
        let currentList = [];

        lines.forEach((line, index) => {
            const trimmed = line.trim();
            const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed);

            if (isBullet) {
                const content = trimmed.replace(/^[•\-*\d.]+\s*/, '').trim();
                if (content) {
                    currentList.push(<li key={`li-${index}`}>{content}</li>);
                }
            } else {
                if (currentList.length > 0) {
                    result.push(<ul key={`ul-${index}`} className="formatted-list">{currentList}</ul>);
                    currentList = [];
                }
                
                if (trimmed) {
                    const isHeading = (trimmed.length < 40 && (trimmed === trimmed.toUpperCase() || trimmed.endsWith(':')));
                    result.push(
                        <p key={`p-${index}`} className={isHeading ? "formatted-heading" : "formatted-paragraph"}>
                            {trimmed}
                        </p>
                    );
                } else {
                    result.push(<div key={`br-${index}`} className="formatted-spacer" />);
                }
            }
        });

        if (currentList.length > 0) {
            result.push(<ul key="ul-final" className="formatted-list">{currentList}</ul>);
        }
        return result;
    };

    // Helper: format status labels
    const getStatusLabel = (status) => {
        const mapping = {
            pending_subadmin1: 'Pending Sub Admin 1',
            pending_global: 'Pending Global Admin',
            approved: 'Approved',
            rejected: 'Rejected'
        };
        return mapping[status] || status;
    };

    // Unique companies list for filtering
    const uniqueCompanies = Array.from(new Set(vacancies.map(v => JSON.stringify({ id: v.company_id, name: v.company_name })))).map(s => JSON.parse(s));

    return (
        <div className="vacancy-approvals-page">
            {/* HERO SECTION */}
            <div className="dashboard-hero-premium">
                <div className="hero-content-p">
                    <div className="hero-badge-p"><FiActivity /> Integrity Suite</div>
                    <h1 className="hero-title-p">Vacancy Approvals</h1>
                    <p className="hero-subtitle-p">Review and validate job requisitions across George Steuart establishments.</p>
                </div>
                <div className="hero-bg-accent"></div>
            </div>

            {/* METRICS MOSAIC */}
            <div className="av-stats-grid">
                {admin.role !== 'sub_admin2' && (
                    <div className="av-stat-card av-crimson clickable-stat" onClick={() => { setActiveTab('action_required'); setStatusFilter(''); }}>
                        <div className="av-card-body">
                            <div className="av-card-meta">
                                <span className="av-card-label">Your Action Required</span>
                                <span className="av-card-value">{stats.actionRequired}</span>
                                <span className="av-card-sub">Requisitions Pending Review</span>
                            </div>
                            <div className="av-card-icon"><FiAlertCircle /></div>
                        </div>
                        <div className="av-card-footer">
                            <span className="av-footer-dot"></span>
                            <span>Needs Attention</span>
                        </div>
                    </div>
                )}
                <div className="av-stat-card av-amber clickable-stat" onClick={() => { setActiveTab('pipeline'); setStatusFilter('pending_subadmin1'); }}>
                    <div className="av-card-body">
                        <div className="av-card-meta">
                            <span className="av-card-label">Pending Sub Admin 1</span>
                            <span className="av-card-value">{stats.pendingSub1}</span>
                            <span className="av-card-sub">1st Tier Evaluation</span>
                        </div>
                        <div className="av-card-icon"><FiClock /></div>
                    </div>
                    <div className="av-card-footer">
                        <span className="av-footer-dot"></span>
                        <span>Awaiting Review</span>
                    </div>
                </div>
                <div className="av-stat-card av-blue clickable-stat" onClick={() => { setActiveTab('pipeline'); setStatusFilter('pending_global'); }}>
                    <div className="av-card-body">
                        <div className="av-card-meta">
                            <span className="av-card-label">Pending Global Admin</span>
                            <span className="av-card-value">{stats.pendingGlobal}</span>
                            <span className="av-card-sub">Final Tier Authorization</span>
                        </div>
                        <div className="av-card-icon"><FiClock /></div>
                    </div>
                    <div className="av-card-footer">
                        <span className="av-footer-dot"></span>
                        <span>In Final Review</span>
                    </div>
                </div>
                <div className="av-stat-card av-purple clickable-stat" onClick={() => { setActiveTab('pipeline'); setStatusFilter('approved'); }}>
                    <div className="av-card-body">
                        <div className="av-card-meta">
                            <span className="av-card-label">Approved Requisitions</span>
                            <span className="av-card-value">{stats.approved}</span>
                            <span className="av-card-sub">Published &amp; Live</span>
                        </div>
                        <div className="av-card-icon"><FiCheckCircle /></div>
                    </div>
                    <div className="av-card-footer">
                        <span className="av-footer-dot"></span>
                        <span>Active &amp; Visible</span>
                    </div>
                </div>
                <div className="av-stat-card av-rose clickable-stat" onClick={() => { setActiveTab('pipeline'); setStatusFilter('rejected'); }}>
                    <div className="av-card-body">
                        <div className="av-card-meta">
                            <span className="av-card-label">Rejected Requisitions</span>
                            <span className="av-card-value">{stats.rejected}</span>
                            <span className="av-card-sub">Correction Required</span>
                        </div>
                        <div className="av-card-icon"><FiXCircle /></div>
                    </div>
                    <div className="av-card-footer">
                        <span className="av-footer-dot"></span>
                        <span>Needs Correction</span>
                    </div>
                </div>
            </div>

            {/* PIPELINE CONSOLE */}
            <div className="pipeline-console card-p">
                {admin.role !== 'sub_admin2' && (
                    <div className="console-tabs">
                        <button 
                            className={`tab-btn ${activeTab === 'action_required' ? 'active' : ''}`}
                            onClick={() => setActiveTab('action_required')}
                        >
                            <FiAlertCircle /> Action Required ({stats.actionRequired})
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
                            onClick={() => setActiveTab('pipeline')}
                        >
                            <FiActivity /> All Requisitions ({vacancies.length})
                        </button>
                    </div>
                )}

                {/* FILTERS */}
                <div className="console-toolbar-p">
                    <div className="toolbar-search-row">
                        <div className="search-orchestrator">
                            <FiSearch className="s-icon" />
                            <input 
                                id="pipeline_search"
                                name="pipeline_search"
                                type="text" 
                                placeholder="Search by position name, reference number or entity..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="btn-reset-p" onClick={() => { setSearchTerm(''); setStatusFilter(''); setCompanyFilter(''); }}>
                            <FiX /> <span>Reset Filter</span>
                        </button>
                    </div>

                    <div className="toolbar-filters-row">
                        {activeTab === 'pipeline' && (
                            <div className="filter-group">
                                <label>Approval Status</label>
                                <div className="select-orchestrator">
                                    <FiFilter className="f-icon" />
                                    <select 
                                        id="status_filter" 
                                        name="status_filter" 
                                        value={statusFilter} 
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="select-lg"
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="pending_subadmin1">Pending Sub Admin 1</option>
                                        <option value="pending_global">Pending Global Admin</option>
                                        <option value="approved">Approved & Published</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {(admin.role === 'super_admin' || admin.role === 'admin') && (
                            <div className="filter-group">
                                <label>Establishment</label>
                                <div className="select-orchestrator">
                                    <FiFilter className="f-icon" />
                                    <select 
                                        id="company_filter" 
                                        name="company_filter" 
                                        value={companyFilter} 
                                        onChange={(e) => setCompanyFilter(e.target.value)}
                                        className="select-lg"
                                    >
                                        <option value="">All GS Entities</option>
                                        {uniqueCompanies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* PIPELINE LIST */}
                <div className="pipeline-list">
                    {loading ? (
                        <div className="loading-state-p" style={{ padding: '60px', textAlign: 'center' }}>
                            <div className="spinner-p"></div>
                            <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>Synchronizing approval pipeline...</p>
                        </div>
                    ) : paginatedVacancies.length === 0 ? (
                        <div className="empty-state-p" style={{ padding: '60px', textAlign: 'center' }}>
                            <FiCheckCircle size={48} style={{ color: '#cbd5e1', marginBottom: '16px' }} />
                            <h3>Clear Horizon</h3>
                            <p style={{ color: 'var(--text-muted)' }}>No requisitions match your criteria.</p>
                        </div>
                    ) : (
                        <div className="pipeline-grid">
                            {paginatedVacancies.map(v => {
                                const needsAction = requiresAction(v);
                                return (
                                    <div 
                                        key={v.id} 
                                        id={`vacancy-card-${v.id}`} 
                                        className={`pipeline-item-card ${needsAction ? 'actionable-card' : ''}`}
                                    >
                                        <div className="card-top">
                                            <div className="company-meta">
                                                <img 
                                                    src={v.company_logo ? `${BACKEND_ROOT}/uploads/logos/${v.company_logo}` : '/gs-logo.png'} 
                                                    alt={v.company_name} 
                                                    onError={(e) => e.target.src = '/gs-logo.png'}
                                                    className="mini-company-logo"
                                                />
                                                <span className="company-name">{v.company_name}</span>
                                            </div>
                                            <span className={`status-pill ${v.approval_status}`}>
                                                {getStatusLabel(v.approval_status)}
                                            </span>
                                        </div>

                                        <div className="card-body-section">
                                            <h3 className="vacancy-title">{v.title}</h3>
                                            <span className="ref-number">#{v.reference_number || 'No Ref Number'}</span>
                                            
                                            <div className="card-details-row">
                                                <span><FiCalendar /> Created: {v.created_at.split(' ')[0]}</span>
                                                <span><FiUser /> Creator: {v.creator_name || `@${v.creator_username || 'unknown'}`}</span>
                                            </div>

                                            {v.approval_status === 'rejected' && (
                                                <div className="rejected-reason-box">
                                                    <strong>Rejection Note:</strong> {v.rejection_reason || 'No reason provided.'}
                                                </div>
                                            )}
                                        </div>

                                        <div className="card-actions-row">
                                            <button className="btn-action view" onClick={() => setViewDetail(v)}>
                                                <FiEye /> Review Details
                                            </button>
                                            {needsAction && (
                                                <div className="auth-actions">
                                                    <button 
                                                        className="btn-action approve" 
                                                        onClick={() => handleApprove(v.id)} 
                                                        disabled={submittingApprove || submittingReject}
                                                        title="Approve and forward"
                                                    >
                                                        {submittingApprove ? <div className="spinner-small"></div> : <><FiCheck /> Approve</>}
                                                    </button>
                                                    <button 
                                                        className="btn-action reject" 
                                                        onClick={() => setShowRejectModal(v)} 
                                                        disabled={submittingApprove || submittingReject}
                                                        title="Reject Requisition"
                                                    >
                                                        <FiX /> Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="pagination-footer">
                        <div className="page-info">
                            Showing <strong>{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredVacancies.length)}</strong> of <strong>{filteredVacancies.length}</strong> requisitions
                        </div>
                        <div className="pagination-controls" style={{ display: 'flex', gap: '12px' }}>
                            <button 
                                className="page-btn"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <FiChevronLeft /> Previous
                            </button>
                            <button 
                                className="page-btn"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next <FiChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* DETAIL MODAL */}
            {viewDetail && (
                <div className="vd-overlay" onClick={() => setViewDetail(null)}>
                    <div className="vd-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
                        <div className="vd-header">
                            <div className="vd-header-glow"></div>
                            <div className="vd-header-top">
                                <div className="vd-status-badge">
                                    <span className={`vd-status-dot ${viewDetail.approval_status}`}></span>
                                    {getStatusLabel(viewDetail.approval_status).toUpperCase()}
                                </div>
                                <button className="vd-close-btn" onClick={() => setViewDetail(null)}>
                                    <FiX />
                                </button>
                            </div>
                            <h2 className="vd-title">{viewDetail.title}</h2>
                            <div className="vd-company-row">
                                <img 
                                    src={viewDetail.company_logo ? `${BACKEND_ROOT}/uploads/logos/${viewDetail.company_logo}` : '/gs-logo.png'} 
                                    alt={viewDetail.company_name} 
                                    onError={(e) => e.target.src = '/gs-logo.png'}
                                    className="vd-company-logo"
                                />
                                <span className="vd-company-name">{viewDetail.company_name}</span>
                            </div>
                            <div className="vd-pills">
                                {viewDetail.reference_number && <span className="vd-pill ref">#{viewDetail.reference_number}</span>}
                                <span className="vd-pill"><FiBriefcase /> {viewDetail.employment_type}</span>
                                {viewDetail.location && <span className="vd-pill"><FiMapPin /> {viewDetail.location}</span>}
                            </div>
                        </div>

                        <div className="vd-body">
                            {viewDetail.approval_status === 'rejected' && (
                                <div className="vd-rejection-banner" style={{ background: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.2)', padding: '16px 20px', borderRadius: '12px', marginBottom: '20px' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rejection Reason</span>
                                    <p style={{ fontSize: '0.9rem', color: '#dc2626', margin: '4px 0 0', fontWeight: 600 }}>{viewDetail.rejection_reason || 'No reason specified'}</p>
                                </div>
                            )}

                            {/* Approval Timeline */}
                            {renderApprovalTimeline(viewDetail)}

                            <div className="vd-meta-grid">
                                <div className="vd-meta-item">
                                    <span className="vd-meta-label">Designation</span>
                                    <p className="vd-meta-value">{viewDetail.designation}</p>
                                </div>
                                <div className="vd-meta-item">
                                    <span className="vd-meta-label">Min. Experience</span>
                                    <p className="vd-meta-value">{viewDetail.min_experience}</p>
                                </div>
                                <div className="vd-meta-item">
                                    <span className="vd-meta-label">Publish Date</span>
                                    <p className="vd-meta-value"><FiCalendar /> {viewDetail.publish_date}</p>
                                </div>
                                <div className="vd-meta-item">
                                    <span className="vd-meta-label">Expire Date</span>
                                    <p className="vd-meta-value"><FiClock /> {viewDetail.expire_date}</p>
                                </div>
                            </div>

                            <div className="vd-section">
                                <h3 className="vd-section-title"><FiInfo /> Description</h3>
                                <div className="vd-section-body-enhanced">
                                    {renderFormattedText(viewDetail.description)}
                                </div>
                            </div>

                            {viewDetail.requirements && (
                                <div className="vd-section">
                                    <h3 className="vd-section-title gold"><FiCheckCircle /> Requirements</h3>
                                    <div className="vd-section-body-enhanced green">
                                        {renderFormattedText(viewDetail.requirements)}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="vd-footer">
                            <button className="vd-btn cancel" onClick={() => setViewDetail(null)}>Close</button>
                            {requiresAction(viewDetail) && (
                                <div className="actions-cluster" style={{ display: 'flex', gap: '10px' }}>
                                    <button 
                                        className="vd-btn gold" 
                                        onClick={() => handleApprove(viewDetail.id)}
                                        disabled={submittingApprove}
                                    >
                                        {submittingApprove ? <div className="spinner-small"></div> : <><FiCheck /> Approve Requisition</>}
                                    </button>
                                    <button 
                                        className="vd-btn danger" 
                                        onClick={() => setShowRejectModal(viewDetail)}
                                    >
                                        <FiX /> Reject Requisition
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* REJECTION REASON DIALOG */}
            {showRejectModal && (
                <div className="confirm-overlay" style={{ zIndex: 1100 }} onClick={() => { setShowRejectModal(null); setRejectionReason(''); }}>
                    <div className="confirm-modal card-p animated-zoom" style={{ maxWidth: '500px', width: '90%', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                        <div className="warning-visual" style={{ background: 'rgba(220,38,38,0.07)', color: '#dc2626' }}><FiAlertCircle /></div>
                        <h3>Reject Vacancy Requisition</h3>
                        <p style={{ marginBottom: '24px' }}>Please enter a rejection reason. This reason will be visible to the creators so they can correct the details.</p>
                        
                        <form onSubmit={handleRejectSubmit}>
                            <div className="form-group-p" style={{ width: '100%', marginBottom: '20px' }}>
                                <textarea
                                    id="rejection_reason_field"
                                    name="rejection_reason"
                                    className="premium-textarea"
                                    rows="4"
                                    placeholder="Enter reason here (e.g. Please update job descriptions to match formatting criteria)..."
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    required
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="modal-actions-p">
                                <button type="button" className="btn-secondary-p" onClick={() => { setShowRejectModal(null); setRejectionReason(''); }}>Cancel</button>
                                <button type="submit" className="btn-danger-p" disabled={submittingReject}>
                                    {submittingReject ? <div className="spinner-small"></div> : 'Confirm Reject'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VacancyApprovals;
