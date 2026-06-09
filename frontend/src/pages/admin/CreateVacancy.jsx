import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createVacancy, updateVacancy, getVacancy, getCompanies, getCandidateCount, getMatchingCandidates, getNextReferenceNumber, API_BASE } from '../../services/api';
import { EMPLOYMENT_TYPES, OVERALL_EXPERIENCE_OPTIONS, RELEVANT_EXPERIENCE_OPTIONS } from '../../utils/constants';

const BACKEND_ROOT = API_BASE.replace('/api', '');
import { toast } from 'react-toastify';
import { FiArrowLeft, FiSave, FiCheckCircle, FiInfo, FiBriefcase, FiMapPin, FiClock, FiCalendar, FiTarget, FiUsers, FiX, FiUser, FiFileText, FiMail, FiExternalLink } from 'react-icons/fi';

function CreateVacancy({ admin }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditing);
    const [companies, setCompanies] = useState([]);
    const [matchCount, setMatchCount] = useState(0);
    const [matchingCandidates, setMatchingCandidates] = useState([]);
    const [showMatchModal, setShowMatchModal] = useState(false);
    const [searchingMatches, setSearchingMatches] = useState(false);
    const [loadingMatches, setLoadingMatches] = useState(false);
    const [form, setForm] = useState({
        company_id: (admin.role !== 'super_admin' && admin.role !== 'admin') ? admin.company_id : '',
        reference_number: '',
        title: '',
        designation: '',
        description: '',
        requirements: '',
        location: '',
        employment_type: 'Full-Time',
        min_experience: '0 years',
        min_relevant_experience: '0 years',
        publish_date: new Date().toISOString().split('T')[0],
        expire_date: '',
        is_active: 1
    });

    useEffect(() => {
        loadData();
    }, [id]);

    useEffect(() => {
        if (form.designation || form.title || form.company_id) {
            const delayDebounceFn = setTimeout(() => {
                fetchMatchCount();
            }, 500);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [form.designation, form.title, form.company_id]);

    const fetchMatchCount = async () => {
        try {
            setSearchingMatches(true);
            const res = await getCandidateCount({
                designation: form.designation,
                title: form.title,
                company_id: form.company_id
            });
            setMatchCount(res.data?.data?.count || 0);
        } catch (err) {
            console.error('Match count error:', err);
        } finally {
            setSearchingMatches(false);
        }
    };

    const handleViewMatches = async () => {
        try {
            setLoadingMatches(true);
            setShowMatchModal(true);
            const res = await getMatchingCandidates({
                designation: form.designation,
                title: form.title,
                company_id: form.company_id
            });
            setMatchingCandidates(res.data?.data || []);
        } catch (err) {
            toast.error('Failed to load matching candidates');
            setShowMatchModal(false);
        } finally {
            setLoadingMatches(false);
        }
    };

    const fetchRefNumber = async (companyId) => {
        if (!companyId) return;
        try {
            const refRes = await getNextReferenceNumber(companyId);
            const generatedRef = refRes.data?.data?.reference_number;
            if (generatedRef) {
                setForm(prev => ({
                    ...prev,
                    reference_number: generatedRef
                }));
            }
        } catch (err) {
            console.error('Failed to auto-generate reference number:', err);
        }
    };

    const loadData = async () => {
        try {
            setLoading(true);
            const compRes = await getCompanies();
            const fetchedCompanies = compRes.data.data || [];
            setCompanies(fetchedCompanies);

            if (isEditing) {
                // If we're editing, we might need a specific getVacancyById api call
                // For now, let's fetch all and filter or assume there's an API
                // Looking at api.js might be helpful later
                const vacRes = await getVacancy(id);
                const vacancy = vacRes.data.data;
                if (vacancy) {
                    setForm({
                        company_id: vacancy.company_id,
                        reference_number: vacancy.reference_number || '',
                        title: vacancy.title,
                        designation: vacancy.designation,
                        description: vacancy.description || '',
                        requirements: vacancy.requirements || '',
                        location: vacancy.location || '',
                        employment_type: vacancy.employment_type,
                        min_experience: vacancy.min_experience || '0 years',
                        min_relevant_experience: vacancy.min_relevant_experience || '0 years',
                        publish_date: vacancy.publish_date,
                        expire_date: vacancy.expire_date,
                        is_active: vacancy.is_active
                    });
                }
            } else {
                // If not editing, and company_id is pre-selected (e.g. for company-level admin/sub-admin)
                const preselectedCompanyId = (admin.role !== 'super_admin' && admin.role !== 'admin') ? admin.company_id : '';
                let updatedLocation = '';
                if (preselectedCompanyId) {
                    const selectedComp = fetchedCompanies.find(c => c.id == preselectedCompanyId);
                    if (selectedComp && selectedComp.location) {
                        updatedLocation = selectedComp.location;
                    }
                }
                
                // Fetch next reference number
                let generatedRef = '';
                if (preselectedCompanyId) {
                    try {
                        const refRes = await getNextReferenceNumber(preselectedCompanyId);
                        generatedRef = refRes.data?.data?.reference_number || '';
                    } catch (err) {
                        console.error('Failed to auto-generate reference number:', err);
                    }
                }

                setForm(prev => ({
                    ...prev,
                    location: updatedLocation || prev.location,
                    reference_number: generatedRef || prev.reference_number
                }));
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to load dependency data');
        } finally {
            setLoading(false);
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'company_id') {
            const selectedComp = companies.find(c => c.id == value);
            setForm(prev => ({ 
                ...prev, 
                company_id: value,
                location: selectedComp && selectedComp.location ? selectedComp.location : ''
            }));
            if (value) {
                fetchRefNumber(value);
            } else {
                setForm(prev => ({ ...prev, reference_number: '' }));
            }
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!form.company_id || !form.title || !form.designation || !form.description || !form.publish_date || !form.expire_date) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            if (isEditing) {
                await updateVacancy({ ...form, id });
                toast.success('Vacancy updated successfully');
            } else {
                await createVacancy(form);
                toast.success('Vacancy created successfully');
            }
            navigate('/admin/vacancies');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return (
        <div className="loading-spinner">
            <div className="spinner"></div>
        </div>
    );

    return (
        <div className="create-vacancy-page">
            <div className="vacancies-orchestration-header">
                <div className="header-content-p">
                    <div className="badge-p">
                        <span className="dot pulse"></span>
                        {isEditing ? 'REVISION CONSOLE' : 'POSTING ORCHESTRATOR'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button className="back-btn-minimal" onClick={() => navigate('/admin/vacancies')}>
                            <FiArrowLeft />
                        </button>
                        <h1 className="hero-title-p">{isEditing ? 'Edit Vacancy' : 'Create New Vacancy'}</h1>
                    </div>
                    <p className="hero-subtitle-p">Provide details for the job opening to attract the best talent.</p>
                </div>
                
                {matchCount > 0 && (
                    <div className="hero-stats-glass animate-bounce-in" onClick={handleViewMatches}>
                        <div className="h-stat-item">
                            <span className="h-label">AUTO-MATCH</span>
                            <span className="h-value">{matchCount}</span>
                        </div>
                        <FiExternalLink className="h-stat-icon" />
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="premium-form-layout">
                <fieldset disabled={admin.role === 'super_admin'} style={{ border: 'none', padding: 0, margin: 0, minWidth: 0, display: 'contents' }}>
                    <div className="form-sections-container">
                    {/* Section 1: Basic Information */}
                    <section className="form-section-card">
                        <div className="section-header" style={{ marginBottom: '16px', paddingBottom: '12px' }}>
                            <div className="section-icon" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}><FiBriefcase /></div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem' }}>Basic Information</h3>
                                <p style={{ fontSize: '0.8rem' }}>Essential details about the job role.</p>
                            </div>
                        </div>

                        <div className="admin-grid-2">
                            <div className="form-group-p">
                                <label htmlFor="company_id">Company <span className="required">*</span></label>
                                <div className="input-with-preview" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div className="input-wrapper" style={{ flex: 1 }}>
                                        <select
                                            id="company_id"
                                            name="company_id"
                                            value={form.company_id}
                                            onChange={handleChange}
                                            disabled={admin.role !== 'admin'}
                                            className="premium-input"
                                        >
                                            <option value="">Select company</option>
                                            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    {form.company_id && (
                                        <div className="company-logo-preview animate-fade-in" style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                            <img 
                                                src={companies.find(c => c.id == form.company_id)?.logo ? `${BACKEND_ROOT}/uploads/logos/${companies.find(c => c.id == form.company_id).logo}` : "/gs-logo.png"} 
                                                alt="Preview" 
                                                onError={(e) => e.target.src = "/gs-logo.png"}
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-group-p">
                                <label htmlFor="reference_number">Reference Number</label>
                                <div className="input-wrapper">
                                    <input
                                        id="reference_number"
                                        type="text"
                                        name="reference_number"
                                        value={form.reference_number}
                                        onChange={handleChange}
                                        placeholder="e.g. GS/ENG/2026/001"
                                        className="premium-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group-p">
                                <label htmlFor="employment_type">Employment Type</label>
                                <div className="input-wrapper">
                                    <select
                                        id="employment_type"
                                        name="employment_type"
                                        value={form.employment_type}
                                        onChange={handleChange}
                                        className="premium-input"
                                    >
                                        {EMPLOYMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group-p">
                                <label htmlFor="min_experience">Min. Overall Experience</label>
                                <div className="input-wrapper">
                                    <select
                                        id="min_experience"
                                        name="min_experience"
                                        value={form.min_experience}
                                        onChange={handleChange}
                                        className="premium-input"
                                    >
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

                            <div className="form-group-p">
                                <label htmlFor="min_relevant_experience">Min. Relevant Experience</label>
                                <div className="input-wrapper">
                                    <select
                                        id="min_relevant_experience"
                                        name="min_relevant_experience"
                                        value={form.min_relevant_experience}
                                        onChange={handleChange}
                                        className="premium-input"
                                    >
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

                            <div className="form-group-p full-width">
                                <label htmlFor="title">Job Title <span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <input
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Senior Software Engineer"
                                        className="premium-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group-p">
                                <label htmlFor="designation">Designation <span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <input
                                        id="designation"
                                        type="text"
                                        name="designation"
                                        value={form.designation}
                                        onChange={handleChange}
                                        placeholder="e.g. Engineering"
                                        className="premium-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group-p">
                                <label htmlFor="location">Location</label>
                                <div className="input-wrapper">
                                    <FiMapPin className="input-icon" />
                                    <input
                                        id="location"
                                        type="text"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Colombo, Sri Lanka"
                                        className="premium-input with-icon"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Dates and Status */}
                    <section className="form-section-card">
                        <div className="section-header" style={{ marginBottom: '16px', paddingBottom: '12px' }}>
                            <div className="section-icon" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}><FiCalendar /></div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem' }}>Dates & Visibility</h3>
                                <p style={{ fontSize: '0.8rem' }}>Control when the vacancy is visible to applicants.</p>
                            </div>
                        </div>

                        <div className="admin-grid-3">
                            <div className="form-group-p">
                                <label htmlFor="publish_date">Publish Date <span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <FiClock className="input-icon" />
                                    <input
                                        id="publish_date"
                                        type="date"
                                        name="publish_date"
                                        value={form.publish_date}
                                        onChange={handleChange}
                                        className="premium-input with-icon"
                                    />
                                </div>
                            </div>

                            <div className="form-group-p">
                                <label htmlFor="expire_date">Expiration Date <span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <FiClock className="input-icon" />
                                    <input
                                        id="expire_date"
                                        type="date"
                                        name="expire_date"
                                        value={form.expire_date}
                                        onChange={handleChange}
                                        className="premium-input with-icon"
                                    />
                                </div>
                            </div>

                            <div className="form-group-p">
                                <label htmlFor="is_active">Status</label>
                                <div className="input-wrapper">
                                    <select
                                        id="is_active"
                                        name="is_active"
                                        value={form.is_active}
                                        onChange={(e) => setForm(prev => ({ ...prev, is_active: parseInt(e.target.value) }))}
                                        className="premium-input"
                                    >
                                        <option value={1}>Active</option>
                                        <option value={0}>Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Content */}
                    <section className="form-section-card">
                        <div className="section-header" style={{ marginBottom: '16px', paddingBottom: '12px' }}>
                            <div className="section-icon" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}><FiInfo /></div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem' }}>Job Description & Requirements</h3>
                                <p style={{ fontSize: '0.8rem' }}>Provide a detailed overview of the role and what's expected.</p>
                            </div>
                        </div>

                        <div className="form-vertical">
                            <div className="form-group-p">
                                <label htmlFor="description">Job Description <span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows="8"
                                        placeholder="Describe the role, responsibilities, and day-to-day activities..."
                                        className="premium-textarea"
                                    />
                                </div>
                            </div>

                            <div className="form-group-p">
                                <label htmlFor="requirements">Requirements & Qualifications</label>
                                <div className="input-wrapper">
                                    <textarea
                                        id="requirements"
                                        name="requirements"
                                        value={form.requirements}
                                        onChange={handleChange}
                                        rows="6"
                                        placeholder="List the required skills, experience, and academic qualifications..."
                                        className="premium-textarea"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                </fieldset>

                {/* Sidebar / Info Column */}
                <div className="form-sidebar-container">
                    <div className="sticky-sidebar">
                        <div className="status-preview-card" style={{ padding: '20px' }}>
                            <h4 style={{ fontSize: '1rem', marginBottom: '16px' }}>Post Summary</h4>
                            <div className="preview-stat" style={{ marginBottom: '10px' }}>
                                <span className="label">Title:</span>
                                <span className="value" style={{ fontSize: '0.9rem' }}>{form.title || 'Untitled Role'}</span>
                            </div>
                             <div className="preview-stat" style={{ marginBottom: '10px' }}>
                                <span className="label">Ref. No:</span>
                                <span className="value" style={{ fontSize: '0.9rem' }}>{form.reference_number || 'N/A'}</span>
                            </div>
                            <div className="preview-stat" style={{ marginBottom: '10px' }}>
                                <span className="label">Type:</span>
                                <span className="value" style={{ fontSize: '0.9rem' }}>{form.employment_type}</span>
                            </div>
                            <div className="preview-stat" style={{ marginBottom: '10px' }}>
                                <span className="label">Status:</span>
                                <span className={`status-badge ${form.is_active ? 'active' : 'inactive'}`} style={{ padding: '4px 10px', fontSize: '0.7rem' }}>
                                    {form.is_active ? 'Active' : 'Draft'}
                                </span>
                            </div>
                            <div className="preview-stat" style={{ marginBottom: '16px' }}>
                                <span className="label">Exp:</span>
                                <span className="value" style={{ fontSize: '0.9rem' }}>{form.min_experience}</span>
                            </div>

                            {matchCount > 0 && (
                                <div className="auto-match-alert animate-bounce-in" style={{ padding: '12px', marginTop: '16px' }}>
                                    <div className="alert-badge" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>🔥 Auto-Match</div>
                                    <p style={{ fontSize: '0.8rem', margin: '8px 0' }}><strong>{matchCount}</strong> candidates already available!</p>
                                    <button 
                                        type="button" 
                                        className="view-matches-btn"
                                        onClick={handleViewMatches}
                                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                                    >
                                        <FiExternalLink /> View Candidates
                                    </button>
                                </div>
                            )}

                            <hr style={{ margin: '20px 0' }} />

                            <div className="form-actions-p" style={{ gap: '10px' }}>
                                {admin.role !== 'super_admin' && (
                                    <button
                                        type="submit"
                                        className="btn btn-gold full-width"
                                        disabled={loading}
                                        style={{ padding: '12px 20px', fontSize: '0.9rem' }}
                                    >
                                        {loading ? (
                                            <div className="spinner-small"></div>
                                        ) : (
                                            <><FiSave /> {isEditing ? 'Update Vacancy' : 'Create Vacancy'}</>
                                        )}
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-outline full-width"
                                    onClick={() => navigate('/admin/vacancies')}
                                    style={{ padding: '12px 20px', fontSize: '0.9rem' }}
                                >
                                    {admin.role === 'super_admin' ? 'Back to Vacancies' : 'Cancel'}
                                </button>
                            </div>
                        </div>

                        <div className="tips-card" style={{ padding: '20px' }}>
                            <div className="tips-header" style={{ marginBottom: '12px' }}>
                                <FiTarget />
                                <h5 style={{ fontSize: '0.9rem' }}>Pro-Tips</h5>
                            </div>
                            <ul style={{ fontSize: '0.8rem' }}>
                                <li style={{ marginBottom: '8px' }}>Use a clear, descriptive job title.</li>
                                <li style={{ marginBottom: '8px' }}>Be specific about the location.</li>
                                <li style={{ marginBottom: '8px' }}>Highlight the most important requirements in the first few lines.</li>
                                <li>Ensure the expiration date gives enough time for applications.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>

            {/* Match Modal */}
            {showMatchModal && (
                <div className="modal-overlay-p" onClick={() => setShowMatchModal(false)}>
                    <div className="match-modal-p" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header-p">
                            <div className="header-info-p">
                                <FiUsers className="modal-icon" />
                                <div>
                                    <h2>Matching Candidates</h2>
                                    <p>Showing candidates matching "{form.designation}" or company requirements.</p>
                                </div>
                            </div>
                            <button className="close-btn-p" onClick={() => setShowMatchModal(false)}>
                                <FiX />
                            </button>
                        </div>

                        <div className="modal-body-p">
                            {loadingMatches ? (
                                <div className="loading-state">
                                    <div className="spinner-p"></div>
                                    <p>Searching talent pool...</p>
                                </div>
                            ) : matchingCandidates.length === 0 ? (
                                <div className="empty-state">
                                    <FiUsers size={48} />
                                    <p>No candidates found matching these criteria.</p>
                                </div>
                            ) : (
                                <div className="match-list">
                                    {matchingCandidates.map((cand, idx) => (
                                        <div key={idx} className="match-item-card">
                                            <div className="cand-main-info">
                                                <div className="cand-avatar">
                                                    <FiUser />
                                                </div>
                                                <div className="cand-details-p">
                                                    <h3>{cand.first_name} {cand.last_name}</h3>
                                                    <p className="last-applied">
                                                        Last applied for: <strong>{cand.last_applied_vacancy}</strong> (<i>{cand.last_applied_company}</i>)
                                                    </p>
                                                    <div className="cand-tags">
                                                        <span className="tag-p">{cand.overall_experience} Exp</span>
                                                        <span className="tag-p">{cand.qualification}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cand-actions-p">
                                                <a
                                                    href={`${API_BASE}/applications.php?action=view_cv&file=${encodeURIComponent(cand.cv_path)}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-gold btn-sm"
                                                >
                                                    <FiFileText /> View CV
                                                </a>
                                                <a 
                                                    href={`mailto:${cand.email}?subject=Exciting Opportunity: ${form.title} at George Steuart`} 
                                                    className="btn btn-outline btn-sm"
                                                >
                                                    <FiMail /> Contact
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}


            <style jsx="true">{`
                .create-vacancy-page {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .back-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: none;
                    border: none;
                    color: var(--crimson);
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    padding: 0;
                    margin-bottom: 12px;
                    transition: var(--transition-fast);
                }

                .back-btn:hover {
                    transform: translateX(-5px);
                }

                /* NORMAL SIZING HEADER */
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

                .back-btn-minimal {
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .back-btn-minimal:hover {
                    background: rgba(255,255,255,0.2);
                    transform: translateX(-3px);
                }

                .hero-stats-glass {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 12px 20px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    cursor: pointer;
                    transition: all 0.3s;
                    z-index: 2;
                }

                .hero-stats-glass:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-3px);
                    border-color: var(--gold-accent);
                }

                .h-stat-item {
                    display: flex;
                    flex-direction: column;
                }

                .h-label {
                    font-size: 0.6rem;
                    font-weight: 800;
                    color: rgba(255,255,255,0.5);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .h-value {
                    font-size: 1.2rem;
                    font-weight: 800;
                    color: var(--gold-accent);
                }

                .h-stat-icon {
                    color: #fff;
                    font-size: 1.2rem;
                    opacity: 0.3;
                }

                .premium-form-layout {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    gap: 24px;
                    align-items: start;
                    margin-top: 2rem;
                }

                @media (max-width: 992px) {
                    .premium-form-layout {
                        grid-template-columns: 1fr;
                    }
                }

                /* Modal Styles */
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
                    z-index: 1000;
                    padding: 20px;
                }

                .match-modal-p {
                    background: #fff;
                    width: 100%;
                    max-width: 700px;
                    max-height: 90vh;
                    border-radius: var(--radius-lg);
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
                    animation: slideUp 0.3s ease-out;
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .modal-header-p {
                    padding: 20px 24px;
                    border-bottom: 1px solid var(--border-light);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .header-info-p {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .modal-icon {
                    font-size: 1.8rem;
                    color: var(--gold-accent);
                }

                .modal-header-p h2 {
                    margin: 0;
                    font-family: var(--font-heading);
                    font-size: 1.5rem;
                    color: #333;
                }

                .modal-header-p p {
                    margin: 2px 0 0;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }

                .close-btn-p {
                    background: #f1f5f9;
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: var(--text-secondary);
                    transition: all 0.2s;
                }

                .close-btn-p:hover { background: #e2e8f0; color: var(--text-primary); }

                .modal-body-p {
                    padding: 24px;
                    overflow-y: auto;
                    flex: 1;
                }

                .loading-state, .empty-state {
                    text-align: center;
                    padding: 60px 20px;
                    color: var(--text-muted);
                }

                .spinner-p {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(200, 169, 81, 0.1);
                    border-top-color: var(--gold-accent);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 15px;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .match-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .match-item-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: var(--radius-md);
                    transition: all 0.2s;
                }

                .match-item-card:hover {
                    border-color: var(--gold-accent);
                    background: #fff;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .cand-main-info {
                    display: flex;
                    gap: 15px;
                    align-items: flex-start;
                }

                .cand-avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--gold-accent);
                    font-size: 1.2rem;
                }

                .cand-details-p h3 {
                    margin: 0;
                    font-size: 1rem;
                    color: var(--text-primary);
                }

                .last-applied {
                    margin: 4px 0 8px;
                    font-size: 0.8rem;
                    color: var(--text-muted);
                }

                .cand-tags {
                    display: flex;
                    gap: 8px;
                }

                .tag-p {
                    font-size: 0.7rem;
                    padding: 2px 8px;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 4px;
                    font-weight: 600;
                    color: var(--text-secondary);
                }

                .cand-actions-p {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .btn-sm {
                   padding: 6px 14px;
                   font-size: 0.75rem;
                }

                .form-sections-container {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .form-section-card {
                    background: #fff;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-light);
                    padding: 24px;
                    box-shadow: var(--shadow-sm);
                }

                .section-header {
                    display: flex;
                    gap: 16px;
                    margin-bottom: 24px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid var(--border-light);
                }

                .section-icon {
                    width: 48px;
                    height: 48px;
                    background: rgba(139, 26, 43, 0.05);
                    color: var(--crimson);
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.4rem;
                }

                .section-header h3 {
                    font-size: 1.15rem;
                    font-weight: 700;
                    margin-bottom: 2px;
                    color: var(--text-primary);
                }

                .section-header p {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }

                .form-grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }

                .form-grid-3 {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 20px;
                }

                .full-width {
                    grid-column: 1 / -1;
                }

                .form-group-p {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .form-group-p label {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--text-secondary);
                }

                .required {
                    color: var(--danger);
                }

                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-icon {
                    position: absolute;
                    left: 14px;
                    color: var(--text-muted);
                    font-size: 1rem;
                }

                .premium-input {
                    width: 100%;
                    padding: 12px 16px;
                    background: #fff;
                    border: 1px solid #eef0f2;
                    border-radius: var(--radius-md);
                    font-size: 0.95rem;
                    transition: all 0.2s ease;
                    color: var(--text-primary);
                }

                .premium-input:focus {
                    outline: none;
                    border-color: var(--crimson);
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .premium-input.with-icon {
                    padding-left: 42px;
                }

                .premium-textarea {
                    width: 100%;
                    padding: 14px 16px;
                    background: #fff;
                    border: 1px solid #eef0f2;
                    border-radius: var(--radius-md);
                    font-size: 0.95rem;
                    resize: vertical;
                    min-height: 120px;
                    font-family: inherit;
                    transition: all 0.2s ease;
                }

                .premium-textarea:focus {
                    outline: none;
                    border-color: var(--crimson);
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .sticky-sidebar {
                    position: sticky;
                    top: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .status-preview-card {
                    background: #fff;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-light);
                    padding: 24px;
                    box-shadow: var(--shadow-sm);
                }

                .status-preview-card h4 {
                    font-size: 1rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    color: var(--text-primary);
                }

                .preview-stat {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 12px;
                    font-size: 0.9rem;
                }

                .preview-stat .label {
                    color: var(--text-muted);
                }

                .preview-stat .value {
                    font-weight: 600;
                    color: var(--text-primary);
                    text-align: right;
                    max-width: 160px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .status-badge {
                    padding: 4px 10px;
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .status-badge.active {
                    background: rgba(22, 163, 74, 0.1);
                    color: var(--success);
                }

                .status-badge.inactive {
                    background: #f0f2f5;
                    color: var(--text-muted);
                }

                .form-actions-p {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-top: 20px;
                }

                .full-width {
                    width: 100%;
                    justify-content: center;
                }

                .tips-card {
                    background: #1f1f2e;
                    color: #fff;
                    border-radius: var(--radius-lg);
                    padding: 24px;
                    box-shadow: var(--shadow-md);
                }

                .tips-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 16px;
                    color: var(--gold-accent);
                }

                .tips-header h5 {
                    margin: 0;
                    font-size: 0.95rem;
                    font-weight: 700;
                }

                .tips-card ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .tips-card li {
                    font-size: 0.85rem;
                    margin-bottom: 12px;
                    color: rgba(255, 255, 255, 0.7);
                    position: relative;
                    padding-left: 18px;
                }

                .tips-card li::before {
                    content: '•';
                    position: absolute;
                    left: 0;
                    color: var(--gold-accent);
                    font-weight: bold;
                }

                .spinner-small {
                    width: 18px;
                    height: 18px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.6s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                hr {
                    border: none;
                    border-top: 1px solid var(--border-light);
                    margin: 20px 0;
                }

                .auto-match-alert {
                    margin-top: 20px;
                    padding: 16px;
                    background: rgba(200, 169, 81, 0.08);
                    border: 1px solid rgba(200, 169, 81, 0.2);
                    border-radius: var(--radius-md);
                    text-align: center;
                }

                .alert-badge {
                    display: inline-block;
                    padding: 3px 10px;
                    background: var(--gold-accent);
                    color: #fff;
                    font-size: 0.7rem;
                    font-weight: 800;
                    border-radius: 100px;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .auto-match-alert p {
                    margin: 0;
                    font-size: 0.85rem;
                    color: var(--text-primary);
                }

                .view-matches-btn {
                    margin-top: 10px;
                    background: transparent;
                    border: 1px solid var(--gold-accent);
                    color: var(--gold-accent);
                    padding: 6px 12px;
                    border-radius: var(--radius-sm);
                    font-size: 0.8rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: all 0.2s;
                }

                .view-matches-btn:hover {
                    background: var(--gold-accent);
                    color: #fff;
                }

                /* Modal Styles */
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
                    z-index: 1000;
                    padding: 20px;
                }

                .match-modal-p {
                    background: #fff;
                    width: 100%;
                    max-width: 700px;
                    max-height: 90vh;
                    border-radius: var(--radius-lg);
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
                    animation: slideUp 0.3s ease-out;
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .modal-header-p {
                    padding: 20px 24px;
                    border-bottom: 1px solid var(--border-light);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .header-info-p {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .modal-icon {
                    font-size: 1.8rem;
                    color: var(--gold-accent);
                }

                .modal-header-p h2 {
                    margin: 0;
                    font-family: var(--font-heading);
                    font-size: 1.5rem;
                }

                .modal-header-p p {
                    margin: 2px 0 0;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }

                .close-btn-p {
                    background: #f1f5f9;
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: var(--text-secondary);
                    transition: all 0.2s;
                }

                .close-btn-p:hover { background: #e2e8f0; color: var(--text-primary); }

                .modal-body-p {
                    padding: 24px;
                    overflow-y: auto;
                    flex: 1;
                }

                .loading-state, .empty-state {
                    text-align: center;
                    padding: 60px 20px;
                    color: var(--text-muted);
                }

                .spinner-p {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(200, 169, 81, 0.1);
                    border-top-color: var(--gold-accent);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 15px;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .match-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .match-item-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: var(--radius-md);
                    transition: all 0.2s;
                }

                .match-item-card:hover {
                    border-color: var(--gold-accent);
                    background: #fff;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .cand-main-info {
                    display: flex;
                    gap: 15px;
                    align-items: flex-start;
                }

                .cand-avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--gold-accent);
                    font-size: 1.2rem;
                }

                .cand-details-p h3 {
                    margin: 0;
                    font-size: 1rem;
                    color: var(--text-primary);
                }

                .last-applied {
                    margin: 4px 0 8px;
                    font-size: 0.8rem;
                    color: var(--text-muted);
                }

                .cand-tags {
                    display: flex;
                    gap: 8px;
                }

                .tag-p {
                    font-size: 0.7rem;
                    padding: 2px 8px;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 4px;
                    font-weight: 600;
                    color: var(--text-secondary);
                }

                .cand-actions-p {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .btn-sm {
                   padding: 6px 14px;
                   font-size: 0.75rem;
                }

                .animate-bounce-in {
                    animation: bounceIn 0.5s ease-out;
                }

                @keyframes bounceIn {
                    0% { transform: scale(0.8); opacity: 0; }
                    70% { transform: scale(1.05); }
                    100% { transform: scale(1); opacity: 1; }
                }

                /* RESPONSIVENESS */
                @media (max-width: 1024px) {
                    .create-vacancy-page {
                        padding: 20px;
                    }
                    
                    .vacancies-orchestration-header {
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 32px 24px;
                    }
                    
                    .hero-title-p { font-size: 1.8rem; }
                }

                @media (max-width: 992px) {
                    .premium-form-layout {
                        grid-template-columns: 1fr;
                    }
                    
                    .sticky-sidebar {
                        position: static;
                        margin-top: 24px;
                    }
                }

                @media (max-width: 768px) {
                    /* Grid stacking handled by global utilities */
                    
                    .form-section-card {
                        padding: 24px;
                    }
                    
                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    .match-item-card {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                    }
                    
                    .cand-actions-p {
                        flex-direction: row;
                        width: 100%;
                    }
                    
                    .cand-actions-p .btn {
                        flex: 1;
                        justify-content: center;
                    }
                    
                    .modal-header-p {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 16px;
                    }
                    
                    .header-info-p {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }

                @media (max-width: 480px) {
                    .hero-title-p { font-size: 1.6rem; }
                    
                    .cand-actions-p {
                        flex-direction: column;
                    }
                    
                    .match-modal-p {
                        height: 100%;
                        max-height: 100%;
                        border-radius: 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default CreateVacancy;
