import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVacancies, deleteVacancy, getCompanies, getStats, API_BASE } from '../../services/api';

const BACKEND_ROOT = API_BASE.replace('/api', '');
import { formatDate, daysLeft } from '../../utils/constants';
import { toast } from 'react-toastify';
import {
    FiPlus, FiEdit2, FiTrash2, FiClock, FiUsers, FiSearch,
    FiFilter, FiTrendingUp, FiCheckCircle, FiAlertCircle, FiArrowRight, FiBriefcase, FiTarget,
    FiEye, FiMapPin, FiX, FiFileText, FiCalendar, FiChevronLeft, FiChevronRight, FiInfo
} from 'react-icons/fi';
import './ManageVacancies.css';

// Helper to render job description/requirements with better formatting
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

function ManageVacancies({ admin }) {
    const navigate = useNavigate();
    const [vacancies, setVacancies] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [stats, setStats] = useState({ total_vacancies: 0, active_vacancies: 0, total_applications: 0 });
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [companyFilter, setCompanyFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewDetail, setViewDetail] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        loadData();
    }, [companyFilter]);

    const loadData = async () => {
        try {
            setLoading(true);
            const params = {};
            if (companyFilter) params.company_id = companyFilter;

            const [vacRes, compRes, statsRes] = await Promise.all([
                getAllVacancies(params),
                getCompanies(),
                getStats()
            ]);

            setVacancies(vacRes.data.data || []);
            setCompanies(compRes.data.data || []);
            setStats(statsRes.data.data || { total_vacancies: 0, active_vacancies: 0, total_applications: 0 });
        } catch (err) {
            console.error(err);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteVacancy({ id });
            toast.success('Vacancy deleted successfully');
            setConfirmDelete(null);
            loadData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Delete failed');
        }
    };

    const filteredVacancies = vacancies.filter(v =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (v.reference_number && v.reference_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
        v.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredVacancies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedVacancies = filteredVacancies.slice(startIndex, startIndex + itemsPerPage);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, companyFilter]);

    return (
        <div className="manage-vacancies-console">
            {/* HEREO / HEADER SECTION */}
            <div className="vacancies-orchestration-header">
                <div className="hero-bg-accent"></div>
                <div className="header-content-p">
                    <div className="console-badge">
                        <span className="live-dot pulse"></span>
                        RECRUITMENT ORCHESTRATION CONSOLE
                    </div>
                    <h1 className="serif-title-p">Manage Vacancies</h1>
                    <p className="hero-subline">Track and publish job opportunities across George Steuart & Company establishments.</p>
                </div>
                <button className="btn-establish-p" onClick={() => navigate('/admin/vacancies/create')}>
                    <FiPlus /> <span>Establish New Vacancy</span>
                </button>
            </div>

            {/* STATS MOSAIC */}
            <div className="stats-mosaic-p">
                <div className="mosaic-card-p glass-card-p">
                    <div className="m-icon blue"><FiBriefcase /></div>
                    <div className="m-info">
                        <span className="m-label">Total Listings</span>
                        <span className="m-value">{stats.total_vacancies}</span>
                    </div>
                    <div className="m-footer">Global Overview</div>
                </div>
                <div className="mosaic-card-p glass-card-p">
                    <div className="m-icon green"><FiCheckCircle /></div>
                    <div className="m-info">
                        <span className="m-label">Live Channels</span>
                        <span className="m-value">{stats.active_vacancies}</span>
                    </div>
                    <div className="m-footer active">Active & Viral</div>
                </div>
                <div className="mosaic-card-p glass-card-p">
                    <div className="m-icon gold"><FiUsers /></div>
                    <div className="m-info">
                        <span className="m-label">Engagement</span>
                        <span className="m-value">{stats.total_applications}</span>
                    </div>
                    <div className="m-footer">Total Submissions</div>
                </div>
                <div className="mosaic-card-p glass-card-p">
                    <div className="m-icon crimson"><FiAlertCircle /></div>
                    <div className="m-info">
                        <span className="m-label">Expiring Soon</span>
                        <span className="m-value">
                            {vacancies.filter(v => daysLeft(v.expire_date) > 0 && daysLeft(v.expire_date) <= 7).length}
                        </span>
                    </div>
                    <div className="m-footer urgent">Urgent Action</div>
                </div>
            </div>

            {/* CONTROL BAR */}
            {/* REFINED CONSOLE TOOLBAR */}
            <div className="console-toolbar-p">
                <div className="toolbar-search-row">
                    <div className="search-orchestrator">
                        <FiSearch className="s-icon" />
                        <input
                            id="vacancy_search"
                            name="vacancy_search"
                            type="text"
                            placeholder="Search position, reference or establishment..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-reset-p" onClick={() => { setSearchTerm(''); setCompanyFilter(''); }}>
                        <FiX /> <span>Reset Console</span>
                    </button>
                </div>

                <div className="toolbar-filters-row">
                    {admin.role === 'super_admin' && (
                        <div className="filter-group">
                            <label>Establishment</label>
                            <div className="select-orchestrator">
                                <FiFilter className="f-icon" />
                                <select 
                                    id="company_filter" 
                                    name="company_id" 
                                    value={companyFilter} 
                                    onChange={(e) => setCompanyFilter(e.target.value)}
                                    className="select-lg"
                                >
                                    <option value="">All GS Entities</option>
                                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* DATA ORCHESTRATION TABLE */}
            <div className="orchestration-table-wrapper card-p">
                {loading ? (
                    <div className="loading-state-p">
                        <div className="spinner-p"></div>
                        <p>Synchronizing vacancy data...</p>
                    </div>
                ) : filteredVacancies.length === 0 ? (
                    <div className="empty-state-p">
                        <div className="empty-icon"><FiBriefcase /></div>
                        <h3>No matches found</h3>
                        <p>We couldn't find any vacancies matching your current filters.</p>
                        <button className="btn btn-outline" onClick={() => { setSearchTerm(''); setCompanyFilter(''); }}>Reset Console</button>
                    </div>
                ) : (
                    <div className="premium-table-container">
                        <table className="premium-table">
                            <thead>
                                <tr>
                                    <th>Position & Establishment</th>
                                    <th>Classification</th>
                                    <th>Engagement Pulse</th>
                                    <th>Registry Timeline</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right' }}>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedVacancies.map(v => {
                                    const active = v.is_active && daysLeft(v.expire_date) > 0;
                                    return (
                                        <tr key={v.id}>
                                            <td>
                                                <div className="pos-entity-cell">
                                                    {v.reference_number && <span className="ref-badge-inline">#{v.reference_number}</span>}
                                                    <span className="pos-name">{v.title}</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                                        <img
                                                            src={v.company_logo ? `${BACKEND_ROOT}/uploads/logos/${v.company_logo}` : '/gs-logo.png'}
                                                            alt={v.company_name}
                                                            onError={(e) => e.target.src = '/gs-logo.png'}
                                                            style={{ width: '22px', height: '22px', objectFit: 'contain', borderRadius: '4px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '2px', flexShrink: 0 }}
                                                        />
                                                        <span className="entity-name" style={{ margin: 0 }}>{v.company_name}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="classification-cell">
                                                    <span className="class-badge">{v.employment_type}</span>
                                                    {v.designation && v.designation.toLowerCase() !== v.title.toLowerCase() && (
                                                        <span className="designation-sub">{v.designation}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="pulse-cell">
                                                    <div className="pulse-info">
                                                        <strong>{v.application_count || 0}</strong>
                                                        <span>Applicants</span>
                                                    </div>
                                                    <div className="mini-bar">
                                                        <div className="bar-fill" style={{ width: `${Math.min((v.application_count || 0) * 5, 100)}%` }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="timeline-cell">
                                                    <span><FiCalendar size={12} /> {formatDate(v.publish_date)}</span>
                                                    <span className={`${daysLeft(v.expire_date) <= 7 ? 'critical' : ''}`}>
                                                        <FiClock size={12} /> Exp: {formatDate(v.expire_date)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={`status-orb-p ${active ? 'live' : 'expired'}`}>
                                                    <span className="orb"></span>
                                                    <span className="orb-text">{active ? 'Live' : 'Ended'}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="orchestration-actions">
                                                    <button className="o-btn view" onClick={() => setViewDetail(v)} title="View Job Description">
                                                        <FiEye />
                                                    </button>
                                                    <button className="o-btn edit" onClick={() => navigate(`/admin/vacancies/edit/${v.id}`)} title="Edit Configuration">
                                                        <FiEdit2 />
                                                    </button>
                                                    <button className="o-btn applicants" onClick={() => navigate(`/admin/applicants?vacancy_id=${v.id}`)} title="View Pipeline">
                                                        <FiArrowRight />
                                                    </button>
                                                    <button className="o-btn delete" onClick={() => setConfirmDelete(v.id)} title="Decommission">
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        
                        <div className="pagination-footer">
                            <div className="page-info">
                                Showing <strong>{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredVacancies.length)}</strong> of <strong>{filteredVacancies.length}</strong> vacancies
                            </div>
                            <div className="pagination-controls">
                                <button 
                                    className="page-btn"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    title="Previous Page"
                                >
                                    <FiChevronLeft /> Previous
                                </button>
                                <button 
                                    className="page-btn"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    title="Next Page"
                                >
                                    Next <FiChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal remains same but styled */}
            {confirmDelete && (
                <div className="confirm-overlay" onClick={() => setConfirmDelete(null)}>
                    <div className="confirm-modal card-p animated-zoom" onClick={e => e.stopPropagation()}>
                        <div className="warning-visual"><FiAlertCircle /></div>
                        <h3>Decommission Position?</h3>
                        <p>This action will permanently remove this vacancy and all associated records from the orchestration console. This cannot be undone.</p>
                        <div className="modal-actions-p">
                            <button className="btn-secondary-p" onClick={() => setConfirmDelete(null)}>Abort</button>
                            <button className="btn-danger-p" onClick={() => handleDelete(confirmDelete)}>Confirm Decommission</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Job Description Detail Modal */}
            {viewDetail && (
                <div className="vd-overlay" onClick={() => setViewDetail(null)}>
                    <div className="vd-modal" onClick={(e) => e.stopPropagation()}>

                        {/* ── MODAL HEADER ── */}
                        <div className="vd-header">
                            <div className="vd-header-glow"></div>

                            <div className="vd-header-top">
                                <div className="vd-status-badge">
                                    <span className={`vd-status-dot ${viewDetail.is_active && daysLeft(viewDetail.expire_date) > 0 ? 'live' : 'ended'}`}></span>
                                    {viewDetail.is_active && daysLeft(viewDetail.expire_date) > 0 ? 'LIVE POSTING' : 'ENDED'}
                                </div>
                                <button className="vd-close-btn" onClick={() => setViewDetail(null)} title="Close">
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
                                {viewDetail.reference_number && (
                                    <span className="vd-pill ref">{viewDetail.reference_number}</span>
                                )}
                                <span className="vd-pill">
                                    <FiBriefcase size={11} /> {viewDetail.employment_type}
                                </span>
                                {viewDetail.location && (
                                    <span className="vd-pill">
                                        <FiMapPin size={11} /> {viewDetail.location}
                                    </span>
                                )}
                                <span className="vd-pill">
                                    <FiUsers size={11} /> {viewDetail.application_count || 0} Applicants
                                </span>
                            </div>
                        </div>

                        {/* ── MODAL BODY ── */}
                        <div className="vd-body">

                            {/* Meta grid */}
                            <div className="vd-meta-grid">
                                <div className="vd-meta-item">
                                    <span className="vd-meta-label">Designation</span>
                                    <p className="vd-meta-value">{viewDetail.designation}</p>
                                </div>
                                <div className="vd-meta-item">
                                    <span className="vd-meta-label">Min. Experience</span>
                                    <p className="vd-meta-value">{viewDetail.min_experience || 'Not specified'}</p>
                                </div>
                                <div className="vd-meta-item">
                                    <span className="vd-meta-label">Published</span>
                                    <p className="vd-meta-value"><FiCalendar size={13} /> {formatDate(viewDetail.publish_date)}</p>
                                </div>
                                <div className="vd-meta-item">
                                    <span className="vd-meta-label">Expires</span>
                                    <p className={`vd-meta-value ${daysLeft(viewDetail.expire_date) <= 7 ? 'urgent' : ''}`}>
                                        <FiClock size={13} /> {formatDate(viewDetail.expire_date)}
                                    </p>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="vd-section">
                                <h3 className="vd-section-title">
                                    <FiInfo /> Job Description
                                </h3>
                                <div className="vd-section-body-enhanced">
                                    {viewDetail.description
                                        ? renderFormattedText(viewDetail.description)
                                        : <em className="vd-empty-note">No description provided.</em>}
                                </div>
                            </div>

                            {/* Requirements */}
                            {viewDetail.requirements && (
                                <div className="vd-section">
                                    <h3 className="vd-section-title gold">
                                        <FiCheckCircle /> Requirements &amp; Qualifications
                                    </h3>
                                    <div className="vd-section-body-enhanced green">
                                        {renderFormattedText(viewDetail.requirements)}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── MODAL FOOTER ── */}
                        <div className="vd-footer">
                            <button className="vd-btn cancel" onClick={() => setViewDetail(null)}>Close</button>
                            <button className="vd-btn primary" onClick={() => { setViewDetail(null); navigate(`/admin/applicants?vacancy_id=${viewDetail.id}`); }}>
                                <FiUsers size={14} /> View Applicants
                            </button>
                            <button className="vd-btn gold" onClick={() => { setViewDetail(null); navigate(`/admin/vacancies/edit/${viewDetail.id}`); }}>
                                <FiEdit2 size={14} /> Edit Vacancy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx="true">{`
                .manage-vacancies-console {
                    padding: 8px 0;
                    animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* ORCHESTRATION HEADER */
                .vacancies-orchestration-header {
                    background: linear-gradient(135deg, #2a050b 0%, var(--crimson-dark) 100%);
                    border-radius: 20px;
                    padding: 24px;
                    margin-bottom: 24px;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 24px;
                    border: 1px solid rgba(255,255,255,0.05);
                    box-shadow: 0 10px 30px rgba(139, 26, 43, 0.15);
                }

                .vacancies-orchestration-header::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 30px 30px;
                    pointer-events: none;
                }

                .hero-bg-accent {
                    position: absolute;
                    top: -50px;
                    right: -50px;
                    width: 300px;
                    height: 300px;
                    background: var(--gold-accent);
                    filter: blur(150px);
                    opacity: 0.15;
                    border-radius: 50%;
                }

                .console-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.05);
                    padding: 5px 12px;
                    border-radius: 100px;
                    font-size: 0.60rem;
                    font-weight: 800;
                    letter-spacing: 1px;
                    color: rgba(255,255,255,0.8);
                    border: 1px solid rgba(255,255,255,0.1);
                    margin-bottom: 12px;
                }

                .serif-title-p {
                    font-family: var(--font-heading);
                    font-size: 1.8rem;
                    color: #fff;
                    font-weight: 800;
                    letter-spacing: -0.5px;
                    margin-bottom: 8px;
                    line-height: 1.1;
                }

                .hero-subline {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.9rem;
                    max-width: 500px;
                }

                .btn-establish-p {
                    background: var(--gold-accent);
                    color: #fff;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 12px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 10px 20px rgba(200, 169, 81, 0.2);
                    z-index: 10;
                    font-size: 0.9rem;
                }

                .btn-establish-p:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(200, 169, 81, 0.4);
                    background: #d4b86a;
                }

                /* STATS MOSAIC */
                .stats-mosaic-p {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 16px;
                    margin-bottom: 24px;
                }

                .mosaic-card-p {
                    padding: 20px;
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    transition: all 0.3s;
                    background: #fff;
                    border: 1px solid var(--border-light);
                }

                .mosaic-card-p:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.03);
                }

                .m-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                }

                .m-icon.blue { background: #eff6ff; color: #3b82f6; }
                .m-icon.green { background: #ecfdf5; color: #10b981; }
                .m-icon.gold { background: #fffbeb; color: var(--gold-accent); }
                .m-icon.crimson { background: #fff1f2; color: var(--crimson); }

                .m-info { display: flex; flex-direction: column; }
                .m-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
                .m-value { font-size: 1.6rem; font-weight: 800; color: var(--text-primary); }
                .m-footer { font-size: 0.65rem; font-weight: 700; color: var(--text-muted); opacity: 0.6; }
                .m-footer.active { color: #10b981; opacity: 1; }
                .m-footer.urgent { color: var(--crimson); opacity: 1; }

                /* REFINED TOOLBAR */
                .console-toolbar-p {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-bottom: 24px;
                    background: #fff;
                    padding: 20px;
                    border-radius: 20px;
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

                .s-icon {
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
                    padding: 12px 20px 12px 48px;
                    border-radius: 12px;
                    border: 1.5px solid #f1f5f9;
                    background: #f8fafc;
                    font-size: 0.9rem;
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
                    padding: 0 40px 0 38px;
                    height: 46px;
                    border-radius: 12px;
                    border: 1.5px solid #f1f5f9;
                    background: #f8fafc;
                    font-size: 0.85rem;
                    font-weight: 700;
                    appearance: none;
                    cursor: pointer;
                    color: var(--text-primary);
                    transition: all 0.2s;
                }

                .select-orchestrator select:focus {
                    outline: none;
                    border-color: var(--crimson);
                    background: #fff;
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .select-lg { min-width: 200px; }

                /* ── CONFIRM / DELETE MODAL ── */
                .confirm-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.45);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 20px;
                    animation: fadeIn 0.25s ease-out;
                }

                .confirm-modal {
                    background: #fff;
                    padding: 40px 36px;
                    border-radius: 28px;
                    width: 100%;
                    max-width: 450px;
                    text-align: center;
                    box-shadow: 0 32px 80px rgba(0,0,0,0.12);
                    animation: zoomInSpring 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: 1px solid rgba(0,0,0,0.04);
                }

                @keyframes zoomInSpring {
                    from { opacity: 0; transform: scale(0.88); }
                    to   { opacity: 1; transform: scale(1); }
                }

                .warning-visual {
                    width: 76px;
                    height: 76px;
                    background: rgba(139,26,43,0.07);
                    color: var(--crimson);
                    border-radius: 22px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.2rem;
                    margin: 0 auto 28px;
                    border: 1px solid rgba(139,26,43,0.1);
                }

                .confirm-modal h3 {
                    font-family: var(--font-heading);
                    font-size: 1.7rem;
                    margin-bottom: 12px;
                    font-weight: 800;
                    color: #1e293b;
                }
                .confirm-modal p {
                    color: #94a3b8;
                    line-height: 1.65;
                    margin-bottom: 36px;
                    font-size: 0.9rem;
                }

                .modal-actions-p { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
                .btn-secondary-p {
                    padding: 14px;
                    border-radius: 14px;
                    border: 1.5px solid #e2e8f0;
                    background: #fff;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: var(--font-body);
                    color: #475569;
                    font-size: 0.9rem;
                }
                .btn-secondary-p:hover { background: #f8fafc; border-color: #94a3b8; }
                .btn-danger-p {
                    padding: 14px;
                    border-radius: 14px;
                    border: none;
                    background: var(--crimson);
                    color: #fff;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: var(--font-body);
                    font-size: 0.9rem;
                }
                .btn-danger-p:hover { background: #6B1420; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(139,26,43,0.3); }

                /* ── VACANCY DETAIL MODAL ── */
                .vd-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.5);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 20px;
                    animation: fadeIn 0.25s ease-out;
                }

                .vd-modal {
                    background: #fff;
                    border-radius: 28px;
                    width: 95%;
                    max-width: 860px;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.18);
                    animation: zoomInSpring 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: 1px solid rgba(0,0,0,0.04);
                }

                /* HEADER */
                .vd-header {
                    background: linear-gradient(135deg, #1a0208 0%, #2a050b 45%, #3d0813 100%);
                    padding: 28px 32px 24px;
                    position: relative;
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .vd-header-glow {
                    position: absolute;
                    top: -60px;
                    right: -60px;
                    width: 260px;
                    height: 260px;
                    background: radial-gradient(circle, rgba(200,169,81,0.25) 0%, transparent 70%);
                    pointer-events: none;
                }

                .vd-header-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 14px;
                    position: relative;
                    z-index: 2;
                }

                .vd-status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.08);
                    border: 1px solid rgba(255,255,255,0.14);
                    padding: 5px 14px;
                    border-radius: 100px;
                    font-size: 0.62rem;
                    font-weight: 800;
                    color: rgba(255,255,255,0.8);
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                }

                .vd-status-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }
                .vd-status-dot.live  { background: #10b981; box-shadow: 0 0 8px rgba(16,185,129,0.6); animation: orbPulse 2s infinite; }
                .vd-status-dot.ended { background: #94a3b8; }

                .vd-close-btn {
                    width: 38px;
                    height: 38px;
                    border-radius: 12px;
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.18);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 1.05rem;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }
                .vd-close-btn:hover { background: rgba(255,255,255,0.18); transform: scale(1.05); }

                .vd-title {
                    font-family: var(--font-heading);
                    font-size: 1.9rem;
                    font-weight: 800;
                    color: #fff;
                    margin: 0 0 12px 0;
                    letter-spacing: -0.5px;
                    line-height: 1.15;
                    position: relative;
                    z-index: 2;
                }

                .vd-company-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                    position: relative;
                    z-index: 2;
                }

                .vd-company-logo {
                    width: 36px;
                    height: 36px;
                    object-fit: contain;
                    border-radius: 8px;
                    background: #fff;
                    border: 2px solid rgba(255,255,255,0.2);
                    padding: 3px;
                    flex-shrink: 0;
                }

                .vd-company-name {
                    color: rgba(255,255,255,0.7);
                    font-size: 0.88rem;
                    font-weight: 600;
                }

                .vd-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    position: relative;
                    z-index: 2;
                }

                .vd-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(255,255,255,0.08);
                    color: rgba(255,255,255,0.82);
                    padding: 5px 13px;
                    border-radius: 100px;
                    font-size: 0.72rem;
                    font-weight: 700;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .vd-pill.ref {
                    background: rgba(200,169,81,0.15);
                    color: #C8A951;
                    border-color: rgba(200,169,81,0.3);
                    font-family: 'JetBrains Mono', monospace;
                    letter-spacing: 0.5px;
                }

                /* BODY */
                .vd-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 28px 32px;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(0,0,0,0.1) transparent;
                }

                .vd-meta-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 14px;
                    margin-bottom: 28px;
                }

                .vd-meta-item {
                    background: #f8fafc;
                    border: 1px solid #f1f5f9;
                    border-radius: 16px;
                    padding: 16px 18px;
                    transition: all 0.2s;
                }
                .vd-meta-item:hover {
                    background: #fff;
                    border-color: #e2e8f0;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.04);
                }

                .vd-meta-label {
                    display: block;
                    font-size: 0.62rem;
                    font-weight: 800;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 1.2px;
                    margin-bottom: 7px;
                }

                .vd-meta-value {
                    margin: 0;
                    font-weight: 700;
                    color: #1e293b;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .vd-meta-value.urgent { color: var(--crimson); }

                .vd-section { margin-bottom: 24px; }

                .vd-section-title {
                    font-family: var(--font-heading);
                    font-size: 1.05rem;
                    font-weight: 800;
                    color: #1e293b;
                    margin: 0 0 14px 0;
                    display: flex;
                    align-items: center;
                    gap: 9px;
                }
                .vd-section-title svg { color: var(--crimson); }
                .vd-section-title.gold svg { color: var(--gold-accent, #C8A951); }

                .vd-section-body-enhanced {
                    background: #fff;
                    border: 1px solid #e9eef5;
                    border-radius: 20px;
                    padding: 24px 28px;
                    line-height: 1.8;
                    color: #475569;
                    font-size: 0.92rem;
                    transition: all 0.2s;
                }
                .vd-section-body-enhanced:hover {
                    border-color: #d1d9e6;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.02);
                }
                .vd-section-body-enhanced.green {
                    background: rgba(16, 185, 129, 0.01);
                }

                .formatted-list {
                    margin: 14px 0;
                    padding-left: 0;
                    list-style: none;
                }
                .formatted-list li {
                    position: relative;
                    margin-bottom: 10px;
                    padding-left: 24px;
                    line-height: 1.6;
                }
                .formatted-list li::before {
                    content: "•";
                    position: absolute;
                    left: 4px;
                    color: var(--crimson);
                    font-weight: 800;
                    font-size: 1.2rem;
                    line-height: 1;
                }
                .vd-section-body-enhanced.green .formatted-list li::before {
                    color: #10b981;
                }

                .formatted-heading {
                    font-weight: 800;
                    color: #1e293b;
                    margin: 20px 0 10px 0;
                    font-size: 0.95rem;
                    letter-spacing: -0.2px;
                    text-transform: uppercase;
                }
                .formatted-paragraph {
                    margin-bottom: 14px;
                }
                .formatted-spacer {
                    height: 14px;
                }

                .vd-empty-note {
                    color: #94a3b8;
                    font-style: italic;
                    font-size: 0.88rem;
                }

                /* FOOTER */
                .vd-footer {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 12px;
                    padding: 18px 28px;
                    border-top: 1px solid #f1f5f9;
                    background: #fcfcfd;
                    flex-shrink: 0;
                }

                .vd-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 22px;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 0.88rem;
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
                    font-family: var(--font-body);
                    border: none;
                }
                .vd-btn:hover { transform: translateY(-2px); }

                .vd-btn.cancel {
                    background: transparent;
                    border: 1.5px solid #e2e8f0;
                    color: #64748b;
                }
                .vd-btn.cancel:hover { background: #f8fafc; border-color: #94a3b8; transform: none; }

                .vd-btn.primary {
                    background: var(--crimson);
                    color: #fff;
                    box-shadow: 0 4px 16px rgba(139,26,43,0.25);
                }
                .vd-btn.primary:hover { background: #6B1420; box-shadow: 0 8px 24px rgba(139,26,43,0.35); }

                .vd-btn.gold {
                    background: linear-gradient(135deg, #C8A951, #d4b86a);
                    color: #1a1a2e;
                    box-shadow: 0 4px 16px rgba(200,169,81,0.3);
                }
                .vd-btn.gold:hover { box-shadow: 0 8px 24px rgba(200,169,81,0.4); }

                @media (max-width: 640px) {
                    .vd-meta-grid { grid-template-columns: repeat(2, 1fr); }
                    .vd-title { font-size: 1.5rem; }
                    .vd-header { padding: 24px 20px 20px; }
                    .vd-body { padding: 20px; }
                    .vd-footer { flex-direction: column; align-items: stretch; }
                    .vd-btn { justify-content: center; }
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                /* RESPONSIVENESS */
                @media (max-width: 1024px) {
                    .vacancies-orchestration-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 20px;
                        padding: 24px;
                        border-radius: 16px;
                    }
                    
                    .serif-title-p { font-size: 2rem; }
                    
                    .stats-mosaic-p {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .console-toolbar-p {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                    }
                    
                    .search-orchestrator {
                        max-width: 100%;
                        width: 100%;
                    }
                    
                    .toolbar-actions-p {
                        width: 100%;
                    }
                    
                    .select-orchestrator select {
                        width: 100%;
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

export default ManageVacancies;
