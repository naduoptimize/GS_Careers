import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { getTalentPool, getCompanies, updateCandidateTags, API_BASE, deleteApplication, blockCandidate, unblockCandidate } from '../../services/api';
import { OVERALL_EXPERIENCE_OPTIONS, QUALIFICATION_OPTIONS, formatDate } from '../../utils/constants';
import { FiSearch, FiMail, FiPhone, FiFileText, FiUser, FiBriefcase, FiCalendar, FiExternalLink, FiX, FiHome, FiUserCheck, FiChevronRight, FiChevronLeft, FiTag, FiPlus, FiAlertCircle, FiBarChart, FiBookOpen, FiDownload, FiTrash2, FiSlash, FiShield } from 'react-icons/fi';
import './TalentPool.css';
import { renderAsync } from 'docx-preview';
import axios from 'axios';

const BACKEND_ROOT = API_BASE.replace('/api', '');
const DocxViewer = ({ url }) => {
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const renderDocx = async () => {
            if (!url || !containerRef.current) return;
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get(url, { 
                    responseType: 'blob',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('gs_admin_token')}`
                    }
                });
                
                containerRef.current.innerHTML = '';
                await renderAsync(response.data, containerRef.current, null, {
                    className: "docx",
                    inWrapper: true,
                    ignoreWidth: false,
                    ignoreHeight: false,
                    ignoreFonts: false,
                    breakPageToSections: true,
                    trimXmlDeclaration: true,
                });
            } catch (err) {
                console.error("Docx render error:", err);
                setError("Failed to render document. Please download to view.");
            } finally {
                setLoading(false);
            }
        };

        renderDocx();
    }, [url]);

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'auto', background: '#fff', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {loading && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', padding: '50px' }}>
                    <div className="spinner-p"></div>
                    <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Rendering Document...</p>
                </div>
            )}
            {error && <div style={{ color: 'var(--crimson)', padding: '20px' }}>{error}</div>}
            <div ref={containerRef} style={{ width: '100%', maxWidth: '800px' }}></div>
        </div>
    );
};

function TalentPool({ admin }) {
    const isReadOnly = ['super_admin', 'sub_admin', 'sub_admin2'].includes(admin.role);
    const [candidates, setCandidates] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetail, setShowDetail] = useState(null);
    const [newTag, setNewTag] = useState('');
    const [isUpdatingTags, setIsUpdatingTags] = useState(false);
    const [viewingCV, setViewingCV] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [selectedCandidateForDelete, setSelectedCandidateForDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [activeCount, setActiveCount] = useState(0);
    const [blockedCount, setBlockedCount] = useState(0);

    const [filters, setFilters] = useState({
        company_id: '',
        search: '',
        overall_experience: '',
        qualification: '',
        tag: '',
        status: '',
        show_blocked: ''
    });

    const [showBlockModal, setShowBlockModal] = useState(null);
    const [blockReason, setBlockReason] = useState('');
    const [blocking, setBlocking] = useState(false);
    const [unblocking, setUnblocking] = useState(false);

    useEffect(() => {
        loadMeta();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        loadTalentPool();
    }, [filters.company_id, filters.search, filters.overall_experience, filters.qualification, filters.tag, filters.status, filters.show_blocked]);

    const loadMeta = async () => {
        try {
            const compRes = await getCompanies();
            setCompanies(compRes.data.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const loadTalentPool = async () => {
        try {
            setLoading(true);
            const params = {};
            Object.entries(filters).forEach(([k, v]) => {
                if (v) params[k] = v;
            });

            const res = await getTalentPool(params);
            const data = res.data.data || {};
            setCandidates(data.candidates || []);
            setActiveCount(data.active_count || 0);
            setBlockedCount(data.blocked_count || 0);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load talent pool');
        } finally {
            setLoading(false);
        }
    };

    const handleAddTag = async () => {
        if (!newTag.trim() || !showDetail) return;
        
        try {
            setIsUpdatingTags(true);
            const currentTags = showDetail.tags ? showDetail.tags.split(',').map(t => t.trim()) : [];
            const tagToAdd = newTag.trim();
            
            if (currentTags.includes(tagToAdd)) {
                toast.warning('Tag already exists');
                return;
            }
            
            const updatedTags = [...currentTags, tagToAdd].join(',');
            await updateCandidateTags({ id: showDetail.id, tags: updatedTags });
            
            const updatedCand = { ...showDetail, tags: updatedTags };
            setShowDetail(updatedCand);
            setCandidates(candidates.map(c => c.id === showDetail.id ? updatedCand : c));
            setNewTag('');
            toast.success('Tag added successfully');
        } catch (err) {
            toast.error('Failed to update tags');
        } finally {
            setIsUpdatingTags(false);
        }
    };

    const removeTag = async (tagToRemove) => {
        try {
            setIsUpdatingTags(true);
            const currentTags = showDetail.tags.split(',').map(t => t.trim());
            const updatedTags = currentTags.filter(t => t !== tagToRemove).join(',');
            
            await updateCandidateTags({ id: showDetail.id, tags: updatedTags });
            
            const updatedCand = { ...showDetail, tags: updatedTags };
            setShowDetail(updatedCand);
            setCandidates(candidates.map(c => c.id === showDetail.id ? updatedCand : c));
            toast.success('Tag removed');
        } catch (err) {
            toast.error('Failed to remove tag');
        } finally {
            setIsUpdatingTags(false);
        }
    };
    
    const handleDeleteCandidate = async () => {
        if (!selectedCandidateForDelete) return;
        
        try {
            setDeleting(true);
            await deleteApplication({ id: selectedCandidateForDelete.id });
            setCandidates(candidates.filter(c => c.id !== selectedCandidateForDelete.id));
            toast.success('Candidate removed from talent pool');
            setSelectedCandidateForDelete(null);
        } catch (err) {
            toast.error('Failed to delete candidate');
        } finally {
            setDeleting(false);
        }
    };

    const clearFilters = () => {
        setFilters({
            company_id: '',
            search: '',
            overall_experience: '',
            qualification: '',
            tag: '',
            status: '',
            show_blocked: ''
        });
    };

    const handleBlockCandidate = async () => {
        if (!showBlockModal || !blockReason.trim()) return;
        try {
            setBlocking(true);
            await blockCandidate({ email: showBlockModal.email, block_reason: blockReason.trim() });
            toast.success(`${showBlockModal.first_name} ${showBlockModal.last_name} has been blocked`);
            setShowBlockModal(null);
            setBlockReason('');
            setShowDetail(null);
            loadTalentPool();
        } catch (err) {
            toast.error('Failed to block candidate');
        } finally {
            setBlocking(false);
        }
    };

    const handleUnblockCandidate = async (cand) => {
        try {
            setUnblocking(true);
            await unblockCandidate({ email: cand.email });
            toast.success(`${cand.first_name} ${cand.last_name} has been unblocked`);
            setShowDetail(null);
            loadTalentPool();
        } catch (err) {
            toast.error('Failed to unblock candidate');
        } finally {
            setUnblocking(false);
        }
    };

    // Creative: Extract unique tags from all candidates for the filter
    const uniqueTags = [...new Set(candidates.flatMap(c => c.tags ? c.tags.split(',').map(t => t.trim()) : []))].sort();

    const totalPages = Math.ceil(candidates.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCandidates = candidates.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="manage-vacancies-console">
            {/* ... same header and toolbar ... */}
            <div className="vacancies-orchestration-header">
                <div className="header-content-p">
                    <div className="badge-p">
                        <span className="dot pulse"></span>
                        TALENT POOL ORCHESTRATOR
                    </div>
                    <h1 className="hero-title-p">Talent Pool</h1>
                    <p className="hero-subtitle-p">Intelligent Candidate Management & Heritage Talent Acquisition</p>
                </div>

                <div className="hero-stats-glass">
                    <div className="h-stat-item">
                        <span className="h-label">TOTAL TALENT</span>
                        <span className="h-value">{activeCount + blockedCount}</span>
                    </div>
                    <div className="h-divider"></div>
                    <div className="h-stat-item">
                        <span className="h-label">HIGHLY QUALIFIED</span>
                        <span className="h-value">
                            {candidates.filter(c => c.qualification === 'Masters Degree' || c.qualification === 'PhD').length}
                        </span>
                    </div>
                </div>
            </div>

            {/* PROFESSIONAL CONSOLE TOOLBAR */}
            <div className="console-toolbar-p">
                <div className="toolbar-search-row">
                    <div className="search-orchestrator">
                        <FiSearch className="s-icon" />
                        <input
                            id="talent_search"
                            name="talent_search"
                            type="text"
                            placeholder="Discover by name, email, expertise or tags..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>
                    <button className="btn-reset-p" onClick={clearFilters}>
                        <FiX /> <span>Reset Discovery</span>
                    </button>
                </div>

                {/* Pool Mode Toggle */}
                <div style={{ display: 'flex', gap: 0, borderRadius: 12, overflow: 'hidden', border: '1.5px solid #e2e8f0', alignSelf: 'flex-start' }}>
                    <button
                        onClick={() => setFilters({ ...filters, show_blocked: '' })}
                        style={{
                            padding: '10px 20px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                            background: filters.show_blocked !== '1' ? 'linear-gradient(135deg, #1a1a2e, #2a050b)' : '#fff',
                            color: filters.show_blocked !== '1' ? '#c8a951' : '#94a3b8',
                            transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8
                        }}
                    >
                        <FiUserCheck size={14} /> Active Pool ({activeCount})
                    </button>
                    <button
                        onClick={() => setFilters({ ...filters, show_blocked: '1' })}
                        style={{
                            padding: '10px 20px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                            borderLeft: '1.5px solid #e2e8f0',
                            background: filters.show_blocked === '1' ? '#fef2f2' : '#fff',
                            color: filters.show_blocked === '1' ? '#dc2626' : '#94a3b8',
                            transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8
                        }}
                    >
                        <FiSlash size={14} /> Blocked ({blockedCount})
                    </button>
                </div>

                <div className="toolbar-filters-row">
                    {(admin.role === 'super_admin' || admin.role === 'admin') && (
                        <div className="filter-group">
                            <label>Business Unit</label>
                            <div className="select-orchestrator">
                                <FiHome className="f-icon" />
                                <select 
                                    id="company_filter" 
                                    name="company_id" 
                                    value={filters.company_id} 
                                    onChange={(e) => setFilters({ ...filters, company_id: e.target.value })}
                                    className="select-lg"
                                >
                                    <option value="">All Business Units</option>
                                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="filter-group">
                        <label>Min. Experience</label>
                        <div className="select-orchestrator">
                            <FiBriefcase className="f-icon" />
                            <select 
                                id="experience_filter" 
                                name="overall_experience" 
                                value={filters.overall_experience} 
                                onChange={(e) => setFilters({ ...filters, overall_experience: e.target.value })}
                            >
                                <option value="">All Experience</option>
                                <option value="0 years">0 years (Freshers)</option>
                                <option value="0-1 years">0–1 years</option>
                                <option value="1-2 years">1–2 years</option>
                                <option value="3-4 years">3–4 years</option>
                                <option value="5-7 years">5–7 years</option>
                                <option value="8-10 years">8–10 years</option>
                                <option value="10+ years">10+ years</option>
                            </select>
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Talent Tag</label>
                        <div className="select-orchestrator">
                            <FiTag className="f-icon" />
                            <select 
                                id="tag_filter" 
                                name="tag" 
                                value={filters.tag} 
                                onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                            >
                                <option value="">Filter by Tag</option>
                                {uniqueTags.map(tag => (
                                    <option key={tag} value={tag}>{tag}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Academic Status</label>
                        <div className="select-orchestrator">
                            <FiFileText className="f-icon" />
                            <select 
                                id="qualification_filter" 
                                name="qualification" 
                                value={filters.qualification} 
                                onChange={(e) => setFilters({ ...filters, qualification: e.target.value })}
                            >
                                <option value="">Academic Status</option>
                                {QUALIFICATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Search Outcome</label>
                        <div className="select-orchestrator">
                            <FiUserCheck className="f-icon" />
                            <select 
                                id="status_filter" 
                                name="status" 
                                value={filters.status} 
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            >
                                <option value="">All Outcomes</option>
                                <option value="pending">Pending Review</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Orchestration Table */}
            <div className="premium-table-container">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th>Candidate Identity</th>
                            <th>Credentials & Tags</th>
                            <th>Prior Submission</th>
                            <th>Timeline & Seniority</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '40px', textAlign: 'center' }}>
                                    <div className="loading-state-p">
                                        <div className="spinner-p"></div>
                                        <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Synchronizing talent pool...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : candidates.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '60px', textAlign: 'center' }}>
                                    <div className="empty-state-p">
                                        <div className="empty-icon" style={{ fontSize: '3rem', color: 'var(--border-light)', marginBottom: '16px' }}><FiUserCheck /></div>
                                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No Talent Found</h3>
                                        <p style={{ color: 'var(--text-muted)' }}>Adjust your discovery filters to find candidates.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedCandidates.map((cand, idx) => (
                            <tr key={idx} onClick={() => setShowDetail(cand)} style={{ cursor: 'pointer' }}>
                                <td>
                                    <div className="candidate-cell">
                                        <div className="avatar-p"><FiUser /></div>
                                        <div className="info-p">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <span className="name-p">{cand.first_name} {cand.last_name}</span>
                                            {cand.last_status === 'shortlisted' && <span className="status-badge-p badge-shortlisted">Favored</span>}
                                                {cand.last_status === 'rejected' && <span className="status-badge-p badge-rejected">Refused</span>}
                                                {cand.is_blocked == 1 && <span style={{ background: '#fef2f2', color: '#dc2626', padding: '2px 8px', borderRadius: 100, fontSize: '0.6rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 3 }}><FiSlash size={9} /> Blocked</span>}
                                            </div>
                                            <span className="email-p"><FiMail size={11} /> {cand.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="classification-cell">
                                        <span className="class-badge" style={{ background: 'rgba(200, 169, 81, 0.1)', color: 'var(--gold-accent)' }}>{cand.qualification}</span>
                                        {cand.is_blocked == 1 && (
                                            <span style={{ background: '#fef2f2', color: '#dc2626', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content' }}>
                                                <FiSlash size={10} /> BLOCKED
                                            </span>
                                        )}
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                                            {cand.tags ? cand.tags.split(',').slice(0, 2).map((t, i) => (
                                                <span key={i} style={{ background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700 }}>#{t.trim()}</span>
                                            )) : null}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="pos-entity-cell">
                                        <span className="pos-name">{cand.last_applied_vacancy}</span>
                                        <span className="entity-name">{cand.last_applied_company}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="timeline-cell">
                                        <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{cand.overall_experience}</span>
                                        <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', marginTop: '4px' }}><FiCalendar size={12} /> {formatDate(cand.applied_at)}</span>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                        {!isReadOnly && (
                                            <button 
                                                className="action-btn-p danger"
                                                style={{ 
                                                    background: 'rgba(239, 68, 68, 0.1)', 
                                                    color: '#ef4444', 
                                                    border: 'none',
                                                    padding: '8px',
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedCandidateForDelete(cand);
                                                }}
                                                title="Remove from Pool"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        )}
                                        <button 
                                            className="page-btn"
                                            style={{ padding: '6px 12px', minWidth: 'auto' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowDetail(cand);
                                            }}
                                        >
                                            <FiChevronRight />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination-footer">
                        <div className="page-info">
                            Showing <strong>{startIndex + 1}-{Math.min(startIndex + itemsPerPage, candidates.length)}</strong> of <strong>{candidates.length}</strong> candidates
                        </div>
                        <div className="pagination-controls">
                            <button 
                                className="page-btn"
                                onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.max(prev - 1, 1)); }}
                                disabled={currentPage === 1}
                            >
                                <FiChevronLeft /> Previous
                            </button>
                            <button 
                                className="page-btn"
                                onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.min(prev + 1, totalPages)); }}
                                disabled={currentPage === totalPages || totalPages === 0}
                            >
                            Next <FiChevronRight />
                        </button>
                    </div>
                </div>
            </div>

            {/* Detail Modal - Fixing the Top/Bottom cut-off issue */}
            {showDetail && (
                <div className="confirm-overlay" onClick={() => setShowDetail(null)}>
                    <div className="confirm-modal card-p animated-zoom" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', width: '90%', textAlign: 'left', overflow: 'hidden' }}>
                        {/* Header stays at the top */}
                        <div className="modal-header-p" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', padding: '24px 32px' }}>
                            <div className="header-info-p" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div className="modal-avatar" style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--ivory-dark)', color: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid rgba(200, 169, 81, 0.3)', flexShrink: 0 }}><FiUser /></div>
                                <div>
                                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', letterSpacing: '-0.5px', margin: 0, color: 'var(--text-primary)' }}>{showDetail.first_name} {showDetail.last_name}</h2>
                                    <p style={{ color: 'var(--gold-accent)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '1px', margin: '2px 0 0 0' }}>Talent Pool candidate</p>
                                </div>
                            </div>
                            <button className="o-btn delete" onClick={() => setShowDetail(null)}><FiX /></button>
                        </div>

                        {/* Body can scroll if content is too long */}
                        <div className="modal-body-p" style={{ overflowY: 'auto', maxHeight: '70vh', padding: '32px' }}>
                            <div className="detail-grid-p admin-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                                <div className="detail-section-p">
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--crimson)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px', paddingBottom: '10px', borderBottom: '2px solid var(--ivory-dark)', position: 'relative' }}>Contact Information</label>
                                    <div className="contact-list-p" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div className="contact-item-p" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                            <FiMail style={{ marginTop: '4px', color: 'var(--gold-accent)', fontSize: '1.2rem', flexShrink: 0 }} />
                                            <div>
                                                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Email Dispatch</span>
                                                <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem', lineHeight: '1.4' }}>{showDetail.email}</p>
                                            </div>
                                        </div>
                                        <div className="contact-item-p" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                            <FiPhone style={{ marginTop: '4px', color: 'var(--gold-accent)', fontSize: '1.2rem', flexShrink: 0 }} />
                                            <div>
                                                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Direct Line</span>
                                                <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem', lineHeight: '1.4' }}>{showDetail.contact_number}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-section-p">
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--crimson)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px', paddingBottom: '10px', borderBottom: '2px solid var(--ivory-dark)', position: 'relative' }}>Professional Profile</label>
                                    <div className="professional-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                                        <div className="stat-pill-item" style={{ padding: '12px' }}>
                                            <FiBriefcase className="stat-i" />
                                            <div className="stat-content">
                                                <span style={{ fontSize: '0.65rem' }}>Overall Experience</span>
                                                <strong style={{ fontSize: '0.9rem' }}>{showDetail.overall_experience}</strong>
                                            </div>
                                        </div>
                                        <div className="stat-pill-item" style={{ padding: '12px' }}>
                                            <FiBarChart className="stat-i" />
                                            <div className="stat-content">
                                                <span style={{ fontSize: '0.65rem' }}>Relevant Experience</span>
                                                <strong style={{ fontSize: '0.9rem' }}>{showDetail.relevant_experience || 'Not Specified'}</strong>
                                            </div>
                                        </div>
                                        <div className="stat-pill-item full-w" style={{ padding: '12px', gridColumn: 'span 1' }}>
                                            <FiBookOpen className="stat-i" />
                                            <div className="stat-content">
                                                <span style={{ fontSize: '0.65rem' }}>Highest Qualification</span>
                                                <strong style={{ fontSize: '0.9rem' }}>{showDetail.qualification}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-section-p">
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--crimson)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px', paddingBottom: '10px', borderBottom: '2px solid var(--ivory-dark)', position: 'relative' }}>Candidate Talent Tags</label>
                                    <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', minHeight: '120px' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                                            {showDetail.tags ? showDetail.tags.split(',').map((t, i) => (
                                                <span key={i} style={{ background: '#c8a951', color: '#fff', fontSize: '0.7rem', padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                                                    {t.trim()}
                                                    {!isReadOnly && <FiX onClick={() => removeTag(t.trim())} style={{ cursor: 'pointer' }} />}
                                                </span>
                                            )) : <span style={{ fontStyle: 'italic', fontSize: '0.8rem', color: '#94a3b8' }}>No tags yet.</span>}
                                        </div>
                                        {!isReadOnly && (
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <input 
                                                    type="text" 
                                                    placeholder="Add skill..." 
                                                    value={newTag}
                                                    onChange={(e) => setNewTag(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                                    style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none' }}
                                                />
                                                <button 
                                                    onClick={handleAddTag} 
                                                    disabled={isUpdatingTags}
                                                    style={{ background: '#1a1a2e', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                                                >
                                                    <FiPlus />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="detail-section-p">
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--crimson)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px', paddingBottom: '10px', borderBottom: '2px solid var(--ivory-dark)', position: 'relative' }}>Submission History</label>
                                    <div className="submission-box-p" style={{ gridTemplateColumns: '1fr', padding: '15px' }}>
                                        <div className="sm-item" style={{ marginBottom: '10px' }}>
                                            <span>Previously Applied to</span>
                                            <p style={{fontSize: '0.85rem'}}>{showDetail.last_applied_vacancy}</p>
                                        </div>
                                        <div className="sm-item">
                                            <span>Company</span>
                                            <p style={{fontSize: '0.85rem'}}>{showDetail.last_applied_company}</p>
                                        </div>
                                        {showDetail.last_status && (
                                            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #e2e8f0' }}>
                                                <span style={{fontSize: '0.7rem', color: '#94a3b8'}}>Last Outcome</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: showDetail.last_status === 'shortlisted' ? '#10b981' : (showDetail.last_status === 'under_review' ? '#3b82f6' : '#ef4444'), fontWeight: 'bold', fontSize: '0.8rem' }}>
                                                    <FiAlertCircle /> <span style={{textTransform: 'uppercase'}}>{showDetail.last_status.replace('_', ' ')}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="detail-section-p full-width">
                                    <div className="cv-banner-p">
                                        <div className="cb-icon"><FiFileText /></div>
                                        <div className="cb-text">
                                            <span>Curriculum Vitae</span>
                                            <p>{showDetail.first_name}_CV_Pool.{(showDetail.cv_path || '').split('.').pop() || 'pdf'}</p>
                                        </div>
                                        <button
                                            className="btn btn-gold"
                                            onClick={() => setViewingCV(showDetail)}
                                        >
                                            <FiExternalLink /> View Document
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Footer inside scrollable area to ensure visibility */}
                            <div className="modal-actions-footer-p" style={{ borderTop: '1px solid #e2e8f0', background: '#fcfcfd' }}>
                                {showDetail.is_blocked == 1 ? (
                                    <>
                                        <button className="btn btn-outline" onClick={() => setShowDetail(null)}>Close Window</button>
                                        <div style={{ background: '#fef2f2', padding: '10px 16px', borderRadius: 12, border: '1px solid #fecaca', flex: 1, display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#dc2626', fontWeight: 600 }}>
                                            <FiSlash size={14} /> Blocked: {showDetail.block_reason}
                                        </div>
                                        {!isReadOnly && (
                                            <button
                                                className="btn btn-gold"
                                                style={{ background: '#10b981', color: '#fff' }}
                                                onClick={() => handleUnblockCandidate(showDetail)}
                                                disabled={unblocking}
                                            >
                                                <FiShield /> {unblocking ? 'Unblocking...' : 'Unblock Candidate'}
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-outline" onClick={() => setShowDetail(null)}>Close Window</button>
                                        {!isReadOnly && (
                                            <button
                                                style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '10px 18px', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit' }}
                                                onClick={() => { setShowBlockModal(showDetail); }}
                                            >
                                                <FiSlash size={14} /> Block Candidate
                                            </button>
                                        )}
                                        <a
                                            href={`mailto:${showDetail.email}?subject=Career Opportunity: George Steuart`}
                                            className="btn btn-gold"
                                            style={{ background: 'var(--gold-accent)', color: '#fff', textDecoration: 'none' }}
                                        >
                                            <FiMail /> Send Outreach Email
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CV Viewer Modal */}
            {viewingCV && (() => {
                const cvUrl = `${API_BASE}/applications.php?action=view_cv&file=${encodeURIComponent(viewingCV.cv_path)}`;
                const ext = (viewingCV.cv_path || '').split('.').pop().toLowerCase();
                const isPdf = ext === 'pdf';
                const isDocx = ext === 'docx' || ext === 'doc';
                return (
                    <div className="confirm-overlay" style={{ zIndex: 1200 }} onClick={() => setViewingCV(null)}>
                        <div className="confirm-modal card-p animated-zoom" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '950px', width: '95%', height: '90vh', padding: 0, textAlign: 'left', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            {/* Header */}
                            <div style={{ background: 'linear-gradient(135deg, #2a050b 0%, var(--crimson-dark) 100%)', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(200,169,81,0.15)', border: '1px solid rgba(200,169,81,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-accent)', fontSize: '1.2rem' }}>
                                        <FiFileText />
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 700 }}>{viewingCV.first_name} {viewingCV.last_name} — CV</h3>
                                        <p style={{ margin: '2px 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{ext.toUpperCase()} Document</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <a
                                        href={cvUrl}
                                        download
                                        className="btn"
                                        style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <FiDownload size={14} /> Download
                                    </a>
                                    <button
                                        onClick={() => setViewingCV(null)}
                                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.1rem' }}
                                    >
                                        <FiX />
                                    </button>
                                </div>
                            </div>
                            {/* Content */}
                            <div style={{ flex: 1, overflow: 'hidden', background: '#f1f5f9' }}>
                                {isPdf && (
                                    <iframe
                                        src={cvUrl}
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                        title="CV Preview"
                                    />
                                )}
                                {isDocx && (
                                    <DocxViewer url={cvUrl} />
                                )}
                                {!isPdf && !isDocx && (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', color: 'var(--text-muted)' }}>
                                        <FiAlertCircle size={48} />
                                        <p style={{ fontWeight: 600 }}>Unsupported file format (.{ext})</p>
                                        <a href={cvUrl} download className="btn btn-gold" style={{ textDecoration: 'none' }}>
                                            <FiDownload /> Download to View
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Delete Confirmation Modal */}
            {selectedCandidateForDelete && (
                <div className="confirm-overlay animated-fade-in" style={{ zIndex: 1210 }} onClick={() => setSelectedCandidateForDelete(null)}>
                    <div className="confirm-modal card-p animated-zoom" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '40px' }}>
                        <div className="warning-visual" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: '1.5rem' }}>
                            <FiTrash2 />
                        </div>
                        <h2 style={{ fontSize: '1.4rem', marginBottom: '10px', color: 'var(--text-primary)' }}>Remove Candidate?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '0.9rem', lineHeight: '1.5' }}>
                            Are you sure you want to remove <strong>{selectedCandidateForDelete.first_name}</strong> from the talent pool? This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button 
                                className="btn btn-outline" 
                                onClick={() => setSelectedCandidateForDelete(null)}
                                style={{ flex: 1, padding: '12px' }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn" 
                                onClick={handleDeleteCandidate}
                                disabled={deleting}
                                style={{ flex: 1, background: '#ef4444', color: '#fff', border: 'none', padding: '12px' }}
                            >
                                {deleting ? 'Removing...' : 'Confirm Remove'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Block Confirmation Modal */}
            {showBlockModal && (
                <div className="confirm-overlay animated-fade-in" style={{ zIndex: 1210 }} onClick={() => { setShowBlockModal(null); setBlockReason(''); }}>
                    <div className="confirm-modal card-p animated-zoom" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px', textAlign: 'center', padding: '40px' }}>
                        <div style={{ color: '#dc2626', background: 'rgba(220, 38, 38, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: '1.6rem' }}>
                            <FiSlash />
                        </div>
                        <h2 style={{ fontSize: '1.4rem', marginBottom: '10px', color: 'var(--text-primary)' }}>Block Candidate?</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '8px', lineHeight: 1.6, fontSize: '0.9rem' }}>
                            You are about to block <strong style={{ color: 'var(--text-primary)' }}>{showBlockModal.first_name} {showBlockModal.last_name}</strong> ({showBlockModal.email}).
                        </p>
                        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '10px 14px', marginBottom: 20, fontSize: '0.8rem', color: '#92400e', textAlign: 'left' }}>
                            ⚠️ This will remove them from:<br/>
                            • All future vacancy suggestions<br/>
                            • The Talent Pool active listing<br/>
                            • New applications will show a warning badge
                        </div>
                        <textarea
                            placeholder="Reason for blocking (required)... e.g. Provided false experience details"
                            value={blockReason}
                            onChange={(e) => setBlockReason(e.target.value)}
                            rows={3}
                            style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: '0.85rem', resize: 'none', marginBottom: 20, fontFamily: 'inherit' }}
                        />
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button
                                className="btn btn-outline"
                                onClick={() => { setShowBlockModal(null); setBlockReason(''); }}
                                style={{ flex: 1, padding: '12px' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBlockCandidate}
                                disabled={blocking || !blockReason.trim()}
                                style={{ flex: 1, background: '#dc2626', color: '#fff', border: 'none', padding: '12px', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'inherit', opacity: (!blockReason.trim() || blocking) ? 0.5 : 1 }}
                            >
                                {blocking ? 'Blocking...' : '🚫 Confirm Block'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx="true">{`
                .manage-vacancies-console {
                    animation: fadeIn 0.4s ease-out;
                }

                /* HEREO / HEADER SECTION */
                .vacancies-orchestration-header {
                    position: relative;
                    padding: 24px;
                    border-radius: 24px;
                    overflow: hidden;
                    margin-bottom: 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                    background: linear-gradient(135deg, #2a050b 0%, var(--crimson-dark) 100%);
                    box-shadow: 0 10px 30px rgba(139, 26, 43, 0.15);
                }

                .vacancies-orchestration-header::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 20px 20px;
                    pointer-events: none;
                }

                .header-content-p { position: relative; z-index: 2; }

                .badge-p {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(200, 169, 81, 0.15);
                    color: var(--gold-accent);
                    padding: 5px 12px;
                    border-radius: 100px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 12px;
                }

                .dot { width: 6px; height: 6px; border-radius: 50%; }
                .dot.pulse { background: #10b981; animation: pulse 2s infinite; }

                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }

                .hero-title-p {
                    font-family: var(--font-heading);
                    font-size: 1.8rem;
                    color: #fff;
                    margin: 0;
                }

                .hero-subtitle-p {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.9rem;
                    margin-top: 6px;
                }

                .hero-stats-glass {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 12px 24px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    z-index: 2;
                }

                .h-stat-item {
                    display: flex;
                    flex-direction: column;
                }

                .h-label {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: rgba(255,255,255,0.5);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .h-value {
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: var(--gold-accent);
                }

                .h-divider {
                    width: 1px;
                    height: 30px;
                    background: rgba(255,255,255,0.1);
                }

                .btn-establish-p {
                    background: linear-gradient(135deg, var(--gold-accent) 0%, #d4b86a 100%);
                    color: #1a1a2e;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 12px;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 10px 30px rgba(200, 169, 81, 0.3);
                    z-index: 10;
                    font-size: 0.95rem;
                }

                .btn-establish-p:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(200, 169, 81, 0.4);
                    background: #d4b86a;
                }

                /* REFINED TOOLBAR */
                .console-toolbar-p {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-bottom: 24px;
                    background: #fff;
                    padding: 24px;
                    border-radius: 24px;
                    border: 1px solid var(--border-light);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                }

                .toolbar-search-row {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .search-orchestrator {
                    position: relative;
                    flex: 1;
                }

                .search-orchestrator .s-icon {
                    position: absolute;
                    left: 18px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    font-size: 1.1rem;
                    z-index: 10;
                }

                .search-orchestrator input {
                    width: 100%;
                    padding: 12px 20px 12px 52px;
                    border-radius: 14px;
                    border: 1.5px solid #f1f5f9;
                    background: #f8fafc;
                    font-size: 0.95rem;
                    transition: all 0.3s;
                }

                .search-orchestrator input:focus {
                    outline: none;
                    background: #fff;
                    border-color: var(--crimson);
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .btn-reset-p {
                    background: #fff;
                    color: var(--text-muted);
                    border: 1.5px solid #f1f5f9;
                    padding: 0 20px;
                    height: 48px;
                    border-radius: 12px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.85rem;
                    flex-shrink: 0;
                }

                .btn-reset-p:hover {
                    background: #fef2f2;
                    color: var(--crimson);
                    border-color: #fee2e2;
                }

                .toolbar-filters-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                    padding-top: 16px;
                    border-top: 1px solid #f1f5f9;
                }

                .filter-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex: 1;
                    min-width: 160px;
                }

                .filter-group label {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    padding-left: 4px;
                }

                .select-orchestrator {
                    position: relative;
                }

                .f-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--crimson);
                    pointer-events: none;
                    z-index: 10;
                }

                .select-orchestrator select {
                    width: 100%;
                    padding: 0 32px 0 38px;
                    height: 46px;
                    border-radius: 12px;
                    border: 1.5px solid #f1f5f9;
                    background: #f8fafc;
                    font-size: 0.8rem;
                    font-weight: 700;
                    appearance: none;
                    cursor: pointer;
                    color: var(--text-primary);
                    transition: all 0.2s;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 10px center;
                    background-size: 14px;
                }

                .select-orchestrator select:focus {
                    outline: none;
                    border-color: var(--crimson);
                    background: #fff;
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .select-lg { min-width: 200px; }

                /* TABLE */
                .orchestration-table-wrapper {
                    background: #fff;
                    border-radius: 20px;
                    border: 1px solid var(--border-light);
                    overflow-x: auto;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                }

                .orchestrated-table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 800px;
                }

                .orchestrated-table th {
                    background: #fcfcfd;
                    padding: 12px 16px;
                    text-align: left;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 1.2px;
                    border-bottom: 1px solid #f0f2f5;
                }

                .orchestrated-table td {
                    padding: 16px;
                    border-bottom: 1px solid #f8fafc;
                    vertical-align: middle;
                }

                .orchestrated-table tr {
                    transition: all 0.2s;
                    cursor: pointer;
                }

                .orchestrated-table tr:hover { background: #fcfcfd; }
                .orchestrated-table tr:hover td { background: #fcfcfd; }

                .ref-cell span {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    background: #f1f5f9;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-weight: 600;
                }

                .pos-entity-cell { display: flex; flex-direction: column; gap: 4px; }
                .pos-name { font-weight: 800; color: var(--text-primary); font-size: 0.95rem; }
                .entity-name { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }

                .classification-cell { display: flex; flex-direction: column; gap: 6px; }
                .class-badge {
                    background: #eff6ff;
                    color: #2563eb;
                    padding: 3px 12px;
                    border-radius: 100px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    width: fit-content;
                    text-transform: uppercase;
                }
                .designation-sub { font-size: 0.85rem; color: var(--text-secondary); }
                
                .timeline-cell { display: flex; flex-direction: column; gap: 4px; font-size: 0.85rem; color: var(--text-muted); }
                .timeline-cell svg { font-size: 0.9rem; margin-right: 4px; }

                .orchestration-actions { display: flex; gap: 8px; justify-content: flex-end; }
                .o-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    border: 1px solid #f1f5f9;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 1.1rem;
                }
                .o-btn:hover { transform: translateY(-3px); box-shadow: 0 6px 15px rgba(0,0,0,0.06); border-color: #e2e8f0; }
                .o-btn.applicants { color: var(--gold-accent); }
                .o-btn.delete { color: var(--crimson); }
                .o-btn.delete:hover { background: var(--crimson); color: #fff; }

                /* MODALS */
                .confirm-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 20px;
                    animation: fadeIn 0.3s ease-out;
                }

                .confirm-modal {
                    background: #fff;
                    border-radius: 32px;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
                }

                /* Candidate Specific Modal styling */
                .cv-banner-p {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    background: #1a1a2e;
                    padding: 20px;
                    border-radius: 20px;
                    color: #fff;
                    margin-top: 32px;
                }

                .cb-icon { 
                    width: 50px; height: 50px; 
                    background: rgba(255, 255, 255, 0.1); 
                    border-radius: 12px; display: flex; 
                    align-items: center; justify-content: center; 
                    font-size: 1.5rem; color: var(--gold-accent);
                }

                .cb-text { flex: 1; }
                .cb-text span { display: block; font-weight: 700; font-size: 1rem; margin-bottom: 4px;}
                .cb-text p { margin: 0; font-size: 0.8rem; color: rgba(255, 255, 255, 0.6); }

                .modal-actions-footer-p {
                    padding: 24px 48px;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: flex-end;
                    gap: 16px;
                    background: #fcfcfd;
                }

                .submission-box-p {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    padding: 16px;
                    background: #fdfdfd;
                    border: 1px solid #f1f5f9;
                    border-radius: 16px;
                    gap: 20px;
                }

                .sm-item span { display: block; font-size: 0.7rem; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; font-weight: 700; }
                .sm-item p { margin: 0; font-weight: 700; color: var(--text-primary); font-size: 0.95rem; }

                .rejection-reason-box {
                    margin-top: 20px; padding: 20px; background: #fef2f2; 
                    border-radius: 12px; border-left: 4px solid #ef4444;
                }
                .rejection-reason-box span { fontSize: 0.75rem; fontWeight: bold; color: #ef4444; textTransform: uppercase; }
                .rejection-reason-box p { margin: 8px 0 0; fontSize: 0.95rem; color: #ef4444; font-weight: 600; line-height: 1.5; }

                /* Professional Stats specific to Talent Pool */
                .professional-stats-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
                .stat-pill-item { 
                    background: var(--bg-primary); 
                    padding: 16px; 
                    border-radius: 16px; 
                    display: flex; 
                    gap: 16px; 
                    align-items: center;
                    border: 1px solid var(--border-light);
                }
                .stat-pill-item.full-w { grid-column: 1 / -1; }
                .stat-pill-item .stat-i { font-size: 1.2rem; color: var(--crimson-muted); flex-shrink: 0; }
                .stat-pill-item .stat-content span { display: block; font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }
                .stat-pill-item .stat-content strong { display: block; font-size: 0.95rem; color: var(--text-primary); font-weight: 800; }

                .loading-state-p { padding: 100px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }
                .empty-state-p { padding: 80px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
                .empty-icon { font-size: 3rem; color: var(--text-muted); opacity: 0.5; margin-bottom: 8px; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
                .pulse { animation: pulse 2s infinite; }
                .spinner-p { width: 50px; height: 50px; border: 4px solid #f1f5f9; border-top-color: var(--crimson); border-radius: 50%; animation: spin 0.8s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* RESPONSIVENESS */
                @media (max-width: 1024px) {
                    .vacancies-orchestration-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 32px;
                        padding: 40px;
                        border-radius: 24px;
                    }
                    
                    .header-actions-p {
                        width: 100%;
                    }
                    
                    .stats-mosaic-p {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .hero-title-p { font-size: 1.8rem; }
                    
                    .toolbar-top {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                    }
                    
                    .btn-establish-p {
                        width: 100%;
                        justify-content: center;
                    }
                    
                    .toolbar-filters {
                        flex-direction: column;
                    }
                    
                    .select-orchestrator {
                        width: 100%;
                        min-width: 100%;
                    }
                }

                @media (max-width: 768px) {
                    .orchestrated-table thead { display: none; }
                    
                    .orchestrated-table tr {
                        display: block;
                        padding: 20px;
                        border-bottom: 8px solid #f8fafc;
                    }
                    
                    .orchestrated-table td {
                        display: block;
                        padding: 12px 0;
                        border: none;
                        width: 100%;
                    }
                    
                    .orchestrated-table td::before {
                        content: attr(data-label);
                        display: block;
                        font-size: 0.7rem;
                        font-weight: 800;
                        color: #94a3b8;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 6px;
                    }
                    
                    .orchestration-actions {
                        justify-content: flex-start;
                    }
                    
                    .modal-header-p {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 20px;
                        padding: 32px 24px !important;
                    }
                    
                    .modal-avatar {
                        width: 60px !important;
                        height: 60px !important;
                        font-size: 1.5rem !important;
                    }
                    
                    .detail-modal-p h2 { font-size: 1.8rem !important; }
                    
                    .modal-body-p {
                        padding: 24px !important;
                    }
                    
                    .modal-actions-footer-p {
                        flex-direction: column;
                        padding: 24px !important;
                    }
                    
                    .modal-actions-footer-p .btn {
                        width: 100%;
                        justify-content: center;
                    }
                }

                @media (max-width: 480px) {
                    .stats-mosaic-p {
                        grid-template-columns: 1fr;
                    }
                    
                    .serif-title-p { font-size: 1.8rem; }
                }
            `}</style>

        </div>
    );
}

export default TalentPool;
