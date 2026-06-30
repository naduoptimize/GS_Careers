import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    FiCheckCircle, FiXCircle, FiClock, FiAlertCircle, FiSearch, FiFilter,
    FiEye, FiArrowLeft, FiCheck, FiX, FiCalendar, FiBriefcase, FiMapPin,
    FiInfo, FiChevronLeft, FiChevronRight, FiUsers, FiActivity, FiUser, FiEdit2,
    FiTarget, FiTrendingUp, FiMail, FiPhone
} from 'react-icons/fi';
import { getPendingApprovals, approveVacancy, rejectVacancy, getVacancyAuditLog, API_BASE } from '../../services/api';
import { formatDate, daysLeft } from '../../utils/constants';
import './VacancyApprovals.css';

const BACKEND_ROOT = API_BASE.replace('/api', '');

const decodeHTMLEntities = (text) => {
    if (!text) return '';
    let decoded = text;
    try {
        const parser = new DOMParser();
        let lastDecoded = '';
        while (decoded.includes('&') && decoded !== lastDecoded) {
            lastDecoded = decoded;
            const dom = parser.parseFromString(decoded, 'text/html');
            decoded = dom.body.textContent || '';
        }
    } catch (e) {
        const txt = document.createElement('textarea');
        let lastDecoded = '';
        while (decoded.includes('&') && decoded !== lastDecoded) {
            lastDecoded = decoded;
            txt.innerHTML = decoded;
            decoded = txt.value;
        }
    }
    return decoded;
};

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

    // Step 3: GS Admin Approval
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
        step3Detail = 'Awaiting review by GS Admin';
        step3Color = '#2563eb';
    } else if (v.approval_status === 'rejected' && v.rejected_by_name && (v.global_approved_by_name || !requiresSub1 || v.sub1_approved_by_name)) {
        step3Status = 'rejected';
        step3Detail = `Rejected by ${v.rejected_by_name}`;
        step3Time = formatDate(v.rejected_at);
        step3Color = '#dc2626';
    } else if (isSub1Done && v.approval_status !== 'draft') {
        step3Status = 'pending';
        step3Detail = 'Pending review by GS Admin';
    }

    steps.push({
        label: 'GS Admin Approval',
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
        <div className="approval-stepper-timeline" style={{
            marginTop: '0px',
            marginBottom: '0px',
            padding: '24px',
            background: '#f8fafc',
            borderRadius: '16px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.025)'
        }}>
            <h4 style={{
                fontSize: '0.9rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#0f172a',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '1.5px solid #e2e8f0',
                paddingBottom: '10px'
            }}>
                <FiClock size={16} style={{ color: '#0f172a' }} /> Requisition Approval Timeline
            </h4>
            <div className="stepper-track" style={{ display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative' }}>
                {steps.map((step, idx) => {
                    const isLast = idx === steps.length - 1;
                    
                    // Determine custom icon or number inside step node
                    let stepIcon = idx + 1;
                    if (step.status === 'completed') stepIcon = <FiCheck size={16} />;
                    else if (step.status === 'active') stepIcon = <FiClock size={16} />;
                    else if (step.status === 'rejected') stepIcon = <FiX size={16} />;

                    // Enhanced Node Colors for high-contrast and visual appeal
                    const nodeBg = step.status === 'completed' ? '#22c55e' :
                                   step.status === 'active' ? '#3b82f6' :
                                   step.status === 'rejected' ? '#ef4444' :
                                   step.status === 'skipped' ? '#f8fafc' : '#f1f5f9';
                    const nodeBorder = step.status === 'completed' ? '#22c55e' :
                                       step.status === 'active' ? '#3b82f6' :
                                       step.status === 'rejected' ? '#ef4444' :
                                       step.status === 'skipped' ? '#94a3b8' : '#cbd5e1';
                    const nodeColor = (step.status === 'completed' || step.status === 'active' || step.status === 'rejected') ? '#ffffff' :
                                      step.status === 'skipped' ? '#94a3b8' : '#475569';

                    return (
                        <div key={idx} className={`stepper-item ${step.status}`} style={{ display: 'flex', gap: '16px', position: 'relative', paddingBottom: isLast ? '0' : '20px' }}>
                            {!isLast && (
                                <div className="stepper-line" style={{
                                    position: 'absolute',
                                    left: '14px',
                                    top: '28px',
                                    bottom: '0',
                                    width: '2px',
                                    background: step.status === 'completed' ? '#22c55e' : '#cbd5e1',
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
                                background: nodeBg,
                                border: `2px solid ${nodeBorder}`,
                                color: nodeColor,
                                zIndex: 2,
                                flexShrink: 0,
                                fontSize: '0.85rem',
                                fontWeight: 'bold'
                            }}>
                                {stepIcon}
                            </div>
                            
                            <div className="stepper-content" style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingTop: '4px' }}>
                                <span className="stepper-label" style={{
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    color: (step.status === 'active' || step.status === 'completed') ? '#0f172a' : '#475569',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    {step.label}
                                    {step.status === 'skipped' && <span style={{ fontSize: '0.7rem', color: '#64748b', padding: '2px 8px', background: '#e2e8f0', borderRadius: '4px', fontWeight: 600 }}>Skipped</span>}
                                    {step.status === 'active' && <span style={{ fontSize: '0.7rem', color: '#b45309', padding: '2px 8px', background: '#fef3c7', borderRadius: '4px', fontWeight: 600 }}>Awaiting Action</span>}
                                </span>
                                <span className="stepper-detail" style={{ fontSize: '0.8rem', color: '#334155', fontWeight: 500, marginTop: '2px' }}>
                                    {step.detail}
                                </span>
                                {step.time && (
                                    <span className="stepper-time" style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: 500 }}>
                                        <FiCalendar size={12} /> {step.time}
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
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const highlightId = searchParams.get('highlight');
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(admin.role === 'sub_admin2' || highlightId ? 'pipeline' : 'action_required'); // 'action_required', 'pipeline'
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [viewDetail, setViewDetail] = useState(null);
    const [modalTab, setModalTab] = useState('details'); // 'details', 'history'
    const [showRejectModal, setShowRejectModal] = useState(null); // stores vacancy object being rejected
    const [rejectionReason, setRejectionReason] = useState('');
    const [submittingReject, setSubmittingReject] = useState(false);
    const [submittingApprove, setSubmittingApprove] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [auditLogs, setAuditLogs] = useState([]);
    const [loadingLogs, setLoadingLogs] = useState(false);
    const [actionSuccessModal, setActionSuccessModal] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (viewDetail && viewDetail.id) {
            fetchAuditLogs(viewDetail.id);
        } else {
            setAuditLogs([]);
        }
    }, [viewDetail]);

    const fetchAuditLogs = async (vacancyId) => {
        try {
            setLoadingLogs(true);
            const res = await getVacancyAuditLog(vacancyId);
            setAuditLogs(res.data.data || []);
        } catch (err) {
            console.error('Failed to load audit logs:', err);
        } finally {
            setLoadingLogs(false);
        }
    };

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
        const vacancy = vacancies.find(v => v.id === id) || viewDetail || {};
        try {
            setSubmittingApprove(true);
            await approveVacancy({ id });
            
            setActionSuccessModal({
                type: admin.role === 'sub_admin1' ? 'sub1_approved' : 'global_approved',
                title: vacancy.title,
                reference_number: vacancy.reference_number,
                company_name: vacancy.company_name,
                id: id
            });

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

        const vacancy = showRejectModal || {};
        try {
            setSubmittingReject(true);
            await rejectVacancy({ id: vacancy.id, rejection_reason: rejectionReason });
            
            setActionSuccessModal({
                type: 'rejected',
                title: vacancy.title,
                reference_number: vacancy.reference_number,
                company_name: vacancy.company_name,
                rejection_reason: rejectionReason,
                role: admin.role,
                id: vacancy.id
            });

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
            const targetVac = vacancies.find(v => v.id == highlightId);
            if (targetVac) {
                setViewDetail(targetVac);
                setModalTab('details');
            }
            // Wait slightly for rendering to complete on the target page
            setTimeout(() => {
                const el = document.getElementById(`vacancy-card-${highlightId}`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.classList.add('highlighted-card-active');
                }
            }, 300);
        }
    }, [loading, vacancies, highlightId]);

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
            pending_global: 'Pending GS Admin',
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
                            <span className="av-card-label">Pending GS Admin</span>
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
                                        <option value="pending_global">Pending GS Admin</option>
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
                                                    alt={decodeHTMLEntities(v.company_name)} 
                                                    onError={(e) => e.target.src = '/gs-logo.png'}
                                                    className="mini-company-logo"
                                                />
                                                <span className="company-name">{decodeHTMLEntities(v.company_name)}</span>
                                            </div>
                                            <span className={`status-pill ${v.approval_status}`}>
                                                {getStatusLabel(v.approval_status)}
                                            </span>
                                        </div>

                                        <div className="card-body-section">
                                            <h3 className="vacancy-title">{decodeHTMLEntities(v.title)}</h3>
                                            <span className="ref-number">#{v.reference_number || 'No Ref Number'}</span>
                                            
                                            <div className="card-details-row">
                                                <span><FiCalendar /> Created: {v.created_at.split(' ')[0]}</span>
                                                <span><FiUser /> Creator: {v.creator_name || `@${v.creator_username || 'unknown'}`}</span>
                                            </div>

                                            {v.approval_status === 'rejected' && (
                                                <div className="rejected-reason-box">
                                                    <strong>Rejection Note:</strong> {decodeHTMLEntities(v.rejection_reason) || 'No reason provided.'}
                                                </div>
                                            )}
                                        </div>

                                        <div className="card-actions-row">
                                             <button className="btn-action view" onClick={() => { setViewDetail(v); setModalTab('details'); }}>
                                                 <FiEye /> Review Details
                                             </button>
                                             {v.approval_status === 'rejected' && admin.role !== 'super_admin' && (
                                                 <button 
                                                     className="btn-action approve" 
                                                     onClick={() => navigate(`/admin/vacancies/edit/${v.id}`)}
                                                     style={{ background: 'var(--gold-accent, #C8A951)', color: '#fff', borderColor: 'var(--gold-accent, #C8A951)' }}
                                                 >
                                                     <FiEdit2 /> Edit Requisition
                                                 </button>
                                             )}
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
                    <div className="vd-modal" onClick={(e) => e.stopPropagation()}>
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
                            <h2 className="vd-title">{decodeHTMLEntities(viewDetail.title)}</h2>
                            <div className="vd-company-row">
                                <img 
                                    src={viewDetail.company_logo ? `${BACKEND_ROOT}/uploads/logos/${viewDetail.company_logo}` : '/gs-logo.png'} 
                                    alt={decodeHTMLEntities(viewDetail.company_name)} 
                                    onError={(e) => e.target.src = '/gs-logo.png'}
                                    className="vd-company-logo"
                                />
                                <span className="vd-company-name">{decodeHTMLEntities(viewDetail.company_name)}</span>
                            </div>
                            <div className="vd-pills">
                                {viewDetail.reference_number && <span className="vd-pill ref">#{viewDetail.reference_number}</span>}
                                <span className="vd-pill"><FiBriefcase /> {viewDetail.employment_type}</span>
                                {viewDetail.location && <span className="vd-pill"><FiMapPin /> {decodeHTMLEntities(viewDetail.location)}</span>}
                            </div>
                        </div>

                        {/* Modal Tab Switcher */}
                        <div className="vd-tabs-header">
                            <button 
                                className={`vd-tab-btn ${modalTab === 'details' ? 'active' : ''}`}
                                onClick={() => setModalTab('details')}
                            >
                                <FiInfo /> Requisition Details
                            </button>
                            <button 
                                className={`vd-tab-btn ${modalTab === 'history' ? 'active' : ''}`}
                                onClick={() => setModalTab('history')}
                            >
                                <FiActivity /> Timeline & Audit Trail
                            </button>
                        </div>

                        <div className="vd-body">
                            {modalTab === 'details' ? (
                                <div className="vd-details-layout">
                                    <div className="vd-details-left">
                                        {viewDetail.approval_status === 'rejected' && (
                                            <div className="vd-rejection-banner" style={{ background: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.2)', padding: '16px 20px', borderRadius: '12px', marginBottom: '20px' }}>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rejection Reason</span>
                                                <p style={{ fontSize: '0.9rem', color: '#dc2626', margin: '4px 0 0', fontWeight: 600 }}>{decodeHTMLEntities(viewDetail.rejection_reason) || 'No reason specified'}</p>
                                            </div>
                                        )}

                                        <div className="vd-form-section">
                                            <h3 className="vd-form-section-title">General Information</h3>
                                            <div className="vd-form-grid">
                                                <div className="vd-form-field">
                                                    <div className="vd-field-icon"><FiBriefcase /></div>
                                                    <div className="vd-field-content">
                                                        <span className="vd-form-label">Position / Job Title</span>
                                                        <div className="vd-form-value">{decodeHTMLEntities(viewDetail.title)}</div>
                                                    </div>
                                                </div>
                                                <div className="vd-form-field">
                                                    <div className="vd-field-icon"><FiInfo /></div>
                                                    <div className="vd-field-content">
                                                        <span className="vd-form-label">Reference Number</span>
                                                        <div className="vd-form-value">{viewDetail.reference_number || 'N/A'}</div>
                                                    </div>
                                                </div>
                                                <div className="vd-form-field">
                                                    <div className="vd-field-icon"><FiUsers /></div>
                                                    <div className="vd-field-content">
                                                        <span className="vd-form-label">Establishment Entity</span>
                                                        <div className="vd-form-value">{decodeHTMLEntities(viewDetail.company_name)}</div>
                                                    </div>
                                                </div>
                                                <div className="vd-form-field">
                                                    <div className="vd-field-icon"><FiTarget /></div>
                                                    <div className="vd-field-content">
                                                        <span className="vd-form-label">Designation Class</span>
                                                        <div className="vd-form-value">{decodeHTMLEntities(viewDetail.designation) || 'N/A'}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="vd-form-section">
                                            <h3 className="vd-form-section-title">Operational Details</h3>
                                            <div className="vd-form-grid">
                                                <div className="vd-form-field">
                                                    <div className="vd-field-icon"><FiClock /></div>
                                                    <div className="vd-field-content">
                                                        <span className="vd-form-label">Employment Classification</span>
                                                        <div className="vd-form-value">{viewDetail.employment_type}</div>
                                                    </div>
                                                </div>
                                                <div className="vd-form-field">
                                                    <div className="vd-field-icon"><FiMapPin /></div>
                                                    <div className="vd-field-content">
                                                        <span className="vd-form-label">Work Location</span>
                                                        <div className="vd-form-value">{viewDetail.location || 'N/A'}</div>
                                                    </div>
                                                </div>
                                                <div className="vd-form-field">
                                                    <div className="vd-field-icon"><FiTrendingUp /></div>
                                                    <div className="vd-field-content">
                                                        <span className="vd-form-label">Experience Tier Required</span>
                                                        <div className="vd-form-value">{viewDetail.min_experience || 'Not specified'}</div>
                                                    </div>
                                                </div>
                                                <div className="vd-form-field col-span-2">
                                                    <div className="vd-field-icon"><FiCalendar /></div>
                                                    <div className="vd-field-content">
                                                        <span className="vd-form-label">Active Listing Period</span>
                                                        <div className="vd-form-value">
                                                            <span className="vd-period-date"><FiCalendar className="inline-icon" /> {viewDetail.publish_date}</span>
                                                            <span className="vd-period-arrow">&rarr;</span>
                                                            <span className="vd-period-date"><FiClock className="inline-icon" /> {viewDetail.expire_date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="vd-details-right">
                                        <div className="vd-form-section">
                                            <h3 className="vd-form-section-title">Position Specification Sheets</h3>
                                            <div className="vd-form-grid">
                                                <div className="vd-form-field full-width" style={{ marginBottom: '16px' }}>
                                                    <span className="vd-form-label">Roles & Responsibilities (Job Description)</span>
                                                    <div className="vd-form-value-textarea">
                                                        {renderFormattedText(decodeHTMLEntities(viewDetail.description))}
                                                    </div>
                                                </div>
                                                {viewDetail.requirements && (
                                                    <div className="vd-form-field full-width requirements-card">
                                                        <span className="vd-form-label" style={{ color: 'var(--gold-accent)' }}>Candidate Profile & Qualifications (Requirements)</span>
                                                        <div className="vd-form-value-textarea">
                                                            {renderFormattedText(decodeHTMLEntities(viewDetail.requirements))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="vd-details-layout">
                                    <div className="vd-details-left">
                                        {/* Approval Timeline */}
                                        {renderApprovalTimeline(viewDetail)}
                                    </div>

                                    <div className="vd-details-right">
                                        {/* Audit History Log */}
                                        <div className="vd-section" style={{ marginTop: '0px' }}>
                                            <h3 className="vd-section-title" style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                color: '#0f172a',
                                                fontSize: '0.95rem',
                                                fontWeight: 800,
                                                borderBottom: '1.5px solid #e2e8f0',
                                                paddingBottom: '10px',
                                                marginBottom: '16px'
                                            }}>
                                                <FiActivity size={16} /> Requisition History Audit Trail
                                            </h3>
                                            <div className="vd-section-body-enhanced" style={{
                                                padding: '24px',
                                                background: '#f8fafc',
                                                borderRadius: '16px',
                                                border: '1.5px solid #e2e8f0',
                                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.025)'
                                            }}>
                                                {loadingLogs ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: 500 }}>
                                                        <div className="spinner-small" style={{ borderTopColor: '#475569' }}></div>
                                                        Retrieving log entries...
                                                    </div>
                                                ) : auditLogs.length === 0 ? (
                                                    <p style={{ margin: 0, fontStyle: 'italic', color: '#64748b', fontSize: '0.85rem' }}>No audit logs recorded for this vacancy.</p>
                                                ) : (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                                        {auditLogs.map((log) => {
                                                            const actionLabels = {
                                                                initiated: 'Draft Initiated',
                                                                submitted: 'Requisition Submitted',
                                                                edited: 'Details Revised',
                                                                sub1_approved: 'Approved by Tier-1 Reviewer',
                                                                global_approved: 'Authorized by GS Admin',
                                                                rejected: 'Requisition Rejected'
                                                            };
                                                            const actionColors = {
                                                                initiated: '#64748b',
                                                                submitted: '#d97706',
                                                                edited: '#6b21a8',
                                                                sub1_approved: '#16a34a',
                                                                global_approved: '#16a34a',
                                                                rejected: '#dc2626'
                                                            };
                                                            return (
                                                                <div key={log.id} style={{ display: 'flex', gap: '14px', borderLeft: `3px solid ${actionColors[log.action] || '#cbd5e1'}`, paddingLeft: '14px' }}>
                                                                    <div style={{ flex: 1 }}>
                                                                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                                                                            <strong style={{ fontSize: '0.85rem', color: actionColors[log.action] || '#1e293b', fontWeight: 700 }}>
                                                                                {actionLabels[log.action] || log.action.toUpperCase()}
                                                                            </strong>
                                                                            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
                                                                                {log.created_at}
                                                                            </span>
                                                                        </div>
                                                                        <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>
                                                                            By: <strong style={{ color: '#0f172a' }}>{log.admin_name}</strong> ({log.admin_role === 'super_admin' ? 'Super Admin' : log.admin_role === 'admin' ? 'GS Admin' : log.admin_role === 'sub_admin1' ? 'Sub Admin 1' : 'Sub Admin 2'})
                                                                        </div>
                                                                        {log.old_status && log.new_status && (
                                                                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                                                                                Transition: <code style={{ background: '#e2e8f0', color: '#0f172a', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.7rem' }}>{log.old_status}</code> &rarr; <code style={{ background: '#e2e8f0', color: '#0f172a', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.7rem' }}>{log.new_status}</code>
                                                                            </div>
                                                                        )}
                                                                        {log.reason && (
                                                                            <div style={{
                                                                                marginTop: '8px',
                                                                                padding: '10px 14px',
                                                                                background: '#fff3f2',
                                                                                borderLeft: '4px solid #dc2626',
                                                                                borderRadius: '6px',
                                                                                fontSize: '0.8rem',
                                                                                fontStyle: 'italic',
                                                                                color: '#dc2626',
                                                                                fontWeight: 500,
                                                                                boxShadow: '0 1px 3px rgba(220,38,38,0.05)'
                                                                            }}>
                                                                                "{log.reason}"
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="vd-footer">
                            <button className="vd-btn cancel" onClick={() => setViewDetail(null)}>Close</button>
                            {viewDetail.approval_status === 'rejected' && admin.role !== 'super_admin' && (
                                <button className="vd-btn gold" onClick={() => { setViewDetail(null); navigate(`/admin/vacancies/edit/${viewDetail.id}`); }}>
                                    <FiEdit2 size={14} style={{ marginRight: 6 }} /> Edit Requisition
                                </button>
                            )}
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

            {/* ACTION SUCCESS PIPELINE ROUTING DIALOG */}
            {actionSuccessModal && (
                <div className="modal-overlay-p" style={{ zIndex: 1200 }}>
                    <div className="match-modal-p success-modal animated-zoom" style={{ maxWidth: '450px', textAlign: 'center', padding: '36px', background: '#fff' }}>
                        {actionSuccessModal.type === 'rejected' ? (
                            <div className="success-visual animate-bounce-in" style={{
                                width: '76px',
                                height: '76px',
                                background: 'rgba(220, 38, 38, 0.08)',
                                color: '#dc2626',
                                borderRadius: '22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2.5rem',
                                margin: '0 auto 24px',
                                border: '1px solid rgba(220, 38, 38, 0.15)'
                            }}>
                                <FiXCircle />
                            </div>
                        ) : (
                            <div className="success-visual animate-bounce-in" style={{
                                width: '76px',
                                height: '76px',
                                background: 'rgba(22, 163, 74, 0.08)',
                                color: '#16a34a',
                                borderRadius: '22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2.5rem',
                                margin: '0 auto 24px',
                                border: '1px solid rgba(22, 163, 74, 0.15)'
                            }}>
                                <FiCheckCircle />
                            </div>
                        )}
                        
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#1e293b', marginBottom: '8px', fontWeight: 800 }}>
                                    {actionSuccessModal.type === 'sub1_approved' && 'Requisition Approved'}
                                    {actionSuccessModal.type === 'global_approved' && 'Vacancy Published'}
                                    {actionSuccessModal.type === 'rejected' && 'Requisition Rejected'}
                                </h2>
                                
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '24px', lineHeight: '1.5' }}>
                                    {actionSuccessModal.type === 'sub1_approved' && (
                                        <>You have approved the requisition for <strong>{decodeHTMLEntities(actionSuccessModal.title)}</strong> {actionSuccessModal.reference_number && `(Ref: #${actionSuccessModal.reference_number})`}. It has been forwarded for Global approval.</>
                                    )}
                                    {actionSuccessModal.type === 'global_approved' && (
                                        <>The vacancy for <strong>{decodeHTMLEntities(actionSuccessModal.title)}</strong> {actionSuccessModal.reference_number && `(Ref: #${actionSuccessModal.reference_number})`} has been successfully approved and published to the careers portal.</>
                                    )}
                                    {actionSuccessModal.type === 'rejected' && (
                                        <>The requisition for <strong>{decodeHTMLEntities(actionSuccessModal.title)}</strong> {actionSuccessModal.reference_number && `(Ref: #${actionSuccessModal.reference_number})`} has been rejected.</>
                                    )}
                                </p>
                        
                        {/* Approval Target / Info Box */}
                        <div style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '16px',
                            padding: '18px',
                            marginBottom: '28px',
                            textAlign: 'left'
                        }}>
                            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <FiUser /> 
                                {actionSuccessModal.type === 'rejected' ? 'Rejection Status' : 
                                 actionSuccessModal.type === 'global_approved' ? 'Vacancy Posting' : 'Approval Routing'}
                            </h4>
                            
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <div style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: actionSuccessModal.type === 'rejected' ? '#ef4444' :
                                                actionSuccessModal.type === 'global_approved' ? '#16a34a' : '#d97706',
                                    flexShrink: 0,
                                    marginTop: '4px'
                                }} className="dot pulse"></div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
                                        {actionSuccessModal.type === 'sub1_approved' && 'Awaiting Action: GS Admin'}
                                        {actionSuccessModal.type === 'global_approved' && 'Status: LIVE & Publishable'}
                                        {actionSuccessModal.type === 'rejected' && `Rejected by: ${actionSuccessModal.role === 'sub_admin1' ? 'Sub Admin 1' : 'GS Admin'}`}
                                    </p>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', marginTop: '2px', lineHeight: '1.4' }}>
                                        {actionSuccessModal.type === 'sub1_approved' && 'Email notification sent to GS approval reviewers.'}
                                        {actionSuccessModal.type === 'global_approved' && 'Notification email sent to the requisition creator.'}
                                        {actionSuccessModal.type === 'rejected' && `Reason: "${decodeHTMLEntities(actionSuccessModal.rejection_reason)}"`}
                                    </p>
                                    {actionSuccessModal.type === 'rejected' && (
                                        <p style={{ margin: '4px 0 0 0', fontSize: '0.72rem', color: '#94a3b8', fontStyle: 'italic' }}>
                                            Email notification sent to creator{actionSuccessModal.role !== 'sub_admin1' ? ' and Sub Admin 1.' : '.'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button 
                                type="button" 
                                className="btn btn-gold" 
                                style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                                onClick={() => {
                                    const targetId = actionSuccessModal.id;
                                    setActionSuccessModal(null);
                                    navigate(`/admin/approvals?highlight=${targetId}`);
                                }}
                            >
                                Track in Approval Pipeline
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-outline" 
                                style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', color: 'var(--text-secondary)', cursor: 'pointer' }}
                                onClick={() => {
                                    setActionSuccessModal(null);
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx="true">{`
                .modal-overlay-p {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1200;
                    padding: 20px;
                }

                .match-modal-p.success-modal {
                    background: #fff;
                    width: 100%;
                    max-width: 450px;
                    border-radius: 20px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
                    animation: zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                @keyframes zoomIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                .dot { width: 6px; height: 6px; border-radius: 50%; }
                .dot.pulse { background: #d97706; animation: pulse 2s infinite; }

                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(217, 119, 6, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0); }
                }
            `}</style>
        </div>
    );
}

export default VacancyApprovals;
