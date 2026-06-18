import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createVacancy, updateVacancy, getVacancy, getCompanies, getCandidateCount, getMatchingCandidates, getNextReferenceNumber, API_BASE } from '../../services/api';
import { EMPLOYMENT_TYPES, OVERALL_EXPERIENCE_OPTIONS, RELEVANT_EXPERIENCE_OPTIONS } from '../../utils/constants';

const BACKEND_ROOT = API_BASE.replace('/api', '');
import { toast } from 'react-toastify';
import { FiArrowLeft, FiSave, FiCheckCircle, FiInfo, FiBriefcase, FiMapPin, FiClock, FiCalendar, FiTarget, FiUsers, FiX, FiUser, FiFileText, FiMail, FiExternalLink, FiTag, FiPlus } from 'react-icons/fi';

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
    const [approvalSubmitModal, setApprovalSubmitModal] = useState(null);
    const [searchingMatches, setSearchingMatches] = useState(false);
    const [loadingMatches, setLoadingMatches] = useState(false);
    const [form, setForm] = useState({
        company_id: (admin.role !== 'super_admin' && admin.role !== 'admin') ? admin.company_id : '',
        reference_number: '',
        title: '',
        designation: '',
        description: '',
        requirements: '',
        required_skills: '',
        location: '',
        employment_type: 'Full-Time',
        min_experience: '0 years',
        min_relevant_experience: '0 years',
        publish_date: new Date().toISOString().split('T')[0],
        expire_date: '',
        is_active: 1,
        approval_status: '',
        rejection_reason: ''
    });
    const [skillInput, setSkillInput] = useState('');
    const skillInputRef = useRef(null);

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
                        required_skills: vacancy.required_skills || '',
                        location: vacancy.location || '',
                        employment_type: vacancy.employment_type,
                        min_experience: vacancy.min_experience || '0 years',
                        min_relevant_experience: vacancy.min_relevant_experience || '0 years',
                        publish_date: vacancy.publish_date,
                        expire_date: vacancy.expire_date,
                        is_active: vacancy.is_active,
                        approval_status: vacancy.approval_status || '',
                        rejection_reason: vacancy.rejection_reason || ''
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

    const handleSave = async (submitForApproval) => {
        // Basic validation
        if (!form.company_id || !form.title || !form.designation || !form.description || !form.publish_date || !form.expire_date) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            
            // Auto-commit any unsaved skill in the input box before saving
            let finalSkills = form.required_skills;
            if (skillInput.trim()) {
                const skillsToAdd = skillInput.split(/[,,;]/).map(s => s.trim()).filter(Boolean);
                if (skillsToAdd.length > 0) {
                    const existing = form.required_skills.split(',').map(s => s.trim()).filter(Boolean);
                    const updated = [...existing];
                    skillsToAdd.forEach(s => {
                        if (!updated.includes(s)) {
                            updated.push(s);
                        }
                    });
                    finalSkills = updated.join(',');
                }
            }

            const payload = { ...form, required_skills: finalSkills, submit_for_approval: submitForApproval };
            let newId = id;
            if (isEditing) {
                await updateVacancy({ ...payload, id });
                toast.success(submitForApproval ? 'Vacancy submitted for approval' : 'Vacancy draft updated');
            } else {
                const res = await createVacancy(payload);
                newId = res.data?.data?.id;
                toast.success(submitForApproval ? 'Vacancy created and submitted for approval' : 'Vacancy draft saved');
            }

            if (submitForApproval && (admin.role === 'sub_admin2' || admin.role === 'sub_admin1' || admin.role === 'admin') && newId) {
                setApprovalSubmitModal({
                    id: newId,
                    title: form.title,
                    reference_number: form.reference_number
                });
            } else {
                navigate('/admin/vacancies');
            }
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

            <form onSubmit={(e) => e.preventDefault()} className="premium-form-layout">
                <fieldset disabled={admin.role === 'super_admin'} style={{ border: 'none', padding: 0, margin: 0, minWidth: 0, display: 'contents' }}>
                    <div className="form-sections-container">
                        {form.approval_status === 'rejected' && (
                            <div className="rejection-banner animate-fade-in" style={{
                                background: 'rgba(220, 38, 38, 0.08)',
                                border: '1px solid rgba(220, 38, 38, 0.2)',
                                borderRadius: '16px',
                                padding: '20px',
                                marginBottom: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.03)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626' }}></span>
                                    Requisition Rejected
                                </div>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#dc2626', fontWeight: 600 }}>
                                    Reason: {form.rejection_reason || 'No specific rejection reason provided.'}
                                </p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#991b1b', opacity: 0.8 }}>
                                    Please make the required changes below and click "Submit for Approval" to restart the validation process.
                                </p>
                            </div>
                        )}
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
                            <div className="form-group-p full-width">
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

                            {/* ── MANDATORY SKILLS TAG INPUT ── */}
                            <div className="form-group-p full-width">
                                <label htmlFor="skill_input" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <FiTag size={14} style={{ color: 'var(--crimson)' }} />
                                    Mandatory Skills <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>(press Enter or comma to add)</span>
                                </label>
                                <div className="skills-tag-box" onClick={() => skillInputRef.current?.focus()}>
                                    {form.required_skills.split(',').filter(s => s.trim()).map((skill, idx) => (
                                        <span key={idx} className="skill-tag">
                                            {skill.trim()}
                                            <button
                                                type="button"
                                                className="skill-tag-remove"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const arr = form.required_skills.split(',').filter(s => s.trim());
                                                    arr.splice(idx, 1);
                                                    setForm(prev => ({ ...prev, required_skills: arr.join(',') }));
                                                }}
                                                aria-label={`Remove ${skill.trim()}`}
                                            ><FiX size={11} /></button>
                                        </span>
                                    ))}
                                    <input
                                        ref={skillInputRef}
                                        id="skill_input"
                                        type="text"
                                        className="skill-tag-input"
                                        placeholder={form.required_skills ? '' : 'e.g. Microsoft Excel, SAP, AutoCAD...'}
                                        value={skillInput}
                                        onChange={e => setSkillInput(e.target.value)}
                                        onBlur={() => {
                                            if (skillInput.trim()) {
                                                const skillsToAdd = skillInput.split(/[,,;]/).map(s => s.trim()).filter(Boolean);
                                                if (skillsToAdd.length > 0) {
                                                    const existing = form.required_skills.split(',').map(s => s.trim()).filter(Boolean);
                                                    const updated = [...existing];
                                                    skillsToAdd.forEach(s => {
                                                        if (!updated.includes(s)) {
                                                            updated.push(s);
                                                        }
                                                    });
                                                    setForm(prev => ({ ...prev, required_skills: updated.join(',') }));
                                                }
                                                setSkillInput('');
                                            }
                                        }}
                                        onKeyDown={e => {
                                            if ((e.key === 'Enter' || e.key === ',' || e.key === ';') && skillInput.trim()) {
                                                e.preventDefault();
                                                const skillsToAdd = skillInput.split(/[,,;]/).map(s => s.trim()).filter(Boolean);
                                                if (skillsToAdd.length === 0) return;
                                                const existing = form.required_skills.split(',').map(s => s.trim()).filter(Boolean);
                                                const updated = [...existing];
                                                skillsToAdd.forEach(s => {
                                                    if (!updated.includes(s)) {
                                                        updated.push(s);
                                                    }
                                                });
                                                setForm(prev => ({ ...prev, required_skills: updated.join(',') }));
                                                setSkillInput('');
                                            } else if (e.key === 'Backspace' && !skillInput) {
                                                const arr = form.required_skills.split(',').filter(s => s.trim());
                                                if (arr.length > 0) {
                                                    arr.pop();
                                                    setForm(prev => ({ ...prev, required_skills: arr.join(',') }));
                                                }
                                            }
                                        }}
                                    />
                                    {skillInput.trim() && (
                                        <button
                                            type="button"
                                            className="skill-tag-add-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const skillsToAdd = skillInput.split(/[,,;]/).map(s => s.trim()).filter(Boolean);
                                                if (skillsToAdd.length > 0) {
                                                    const existing = form.required_skills.split(',').map(s => s.trim()).filter(Boolean);
                                                    const updated = [...existing];
                                                    skillsToAdd.forEach(s => {
                                                        if (!updated.includes(s)) {
                                                            updated.push(s);
                                                        }
                                                    });
                                                    setForm(prev => ({ ...prev, required_skills: updated.join(',') }));
                                                }
                                                setSkillInput('');
                                                skillInputRef.current?.focus();
                                            }}
                                            style={{
                                                background: 'var(--crimson)',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '6px',
                                                padding: '4px 10px',
                                                fontSize: '0.75rem',
                                                cursor: 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                marginLeft: '6px',
                                                transition: 'all 0.2s ease',
                                                boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)'
                                            }}
                                        >
                                            <FiPlus size={12} /> Add
                                        </button>
                                    )}
                                </div>
                                {form.required_skills.split(',').filter(s => s.trim()).length === 0 && (
                                    <p style={{ fontSize: '0.73rem', color: '#94a3b8', marginTop: '6px' }}>No skills added yet. Type a skill and press Enter.</p>
                                )}
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

                            <div className="form-actions-p" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {admin.role !== 'super_admin' && (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-gold full-width"
                                            disabled={loading}
                                            onClick={() => handleSave(true)}
                                            style={{ padding: '12px 20px', fontSize: '0.9rem' }}
                                        >
                                            {loading ? (
                                                <div className="spinner-small"></div>
                                            ) : admin.role === 'admin' ? (
                                                <><FiCheckCircle /> Publish Vacancy</>
                                            ) : (
                                                <><FiCheckCircle /> Submit for Approval</>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline full-width"
                                            disabled={loading}
                                            onClick={() => handleSave(false)}
                                            style={{ padding: '12px 20px', fontSize: '0.9rem', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                                        >
                                            <FiSave /> Save Requisition Draft
                                        </button>
                                    </>
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

            {approvalSubmitModal && (
                <div className="modal-overlay-p" style={{ zIndex: 1100 }}>
                    <div className="match-modal-p success-modal" style={{ maxWidth: '450px', textAlign: 'center', padding: '36px' }}>
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
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#1e293b', marginBottom: '8px', fontWeight: 800 }}>
                            {admin.role === 'admin' ? 'Vacancy Published' : 'Requisition Submitted'}
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '24px', lineHeight: '1.5' }}>
                            {admin.role === 'admin' ? (
                                <>Your vacancy for <strong>{approvalSubmitModal.title}</strong> {approvalSubmitModal.reference_number && `(Ref: #${approvalSubmitModal.reference_number})`} has been successfully published.</>
                            ) : (
                                <>Your requisition for <strong>{approvalSubmitModal.title}</strong> {approvalSubmitModal.reference_number && `(Ref: #${approvalSubmitModal.reference_number})`} has been created.</>
                            )}
                        </p>
                        
                        {/* Approval Target Box */}
                        <div style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '16px',
                            padding: '18px',
                            marginBottom: '28px',
                            textAlign: 'left'
                        }}>
                            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <FiUser /> {admin.role === 'admin' ? 'Vacancy Status' : 'Approval Routing'}
                            </h4>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <div className={`dot ${
                                    admin.role === 'admin' ? 'pulse-green' :
                                    admin.role === 'sub_admin1' ? 'pulse-blue' : 'pulse-amber'
                                }`} style={{ flexShrink: 0, marginTop: '4px' }}></div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
                                        {admin.role === 'admin' && 'Status: LIVE & Published'}
                                        {admin.role === 'sub_admin1' && 'Awaiting Action: Global Admin'}
                                        {admin.role === 'sub_admin2' && 'Awaiting Action: Sub Admin 1'}
                                    </p>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', marginTop: '2px', lineHeight: '1.4' }}>
                                        {admin.role === 'admin' && 'The vacancy is active and visible to applicants.'}
                                        {admin.role === 'sub_admin1' && 'Email notification sent to global approval reviewers.'}
                                        {admin.role === 'sub_admin2' && 'Email notification sent to evaluation reviewers.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {admin.role === 'admin' ? (
                                <button 
                                    type="button" 
                                    className="btn btn-gold" 
                                    style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                                    onClick={() => {
                                        const targetId = approvalSubmitModal.id;
                                        setApprovalSubmitModal(null);
                                        navigate(`/admin/vacancies?highlight=${targetId}`);
                                    }}
                                >
                                    View Published Vacancy
                                </button>
                            ) : (
                                <button 
                                    type="button" 
                                    className="btn btn-gold" 
                                    style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                                    onClick={() => {
                                        const targetId = approvalSubmitModal.id;
                                        setApprovalSubmitModal(null);
                                        navigate(`/admin/approvals?highlight=${targetId}`);
                                    }}
                                >
                                    Track in Approval Pipeline
                                </button>
                            )}
                            <button 
                                type="button" 
                                className="btn btn-outline" 
                                style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', color: 'var(--text-secondary)', cursor: 'pointer' }}
                                onClick={() => {
                                    setApprovalSubmitModal(null);
                                    navigate('/admin/vacancies');
                                }}
                            >
                                Go to Vacancy List
                            </button>
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
                .dot.pulse-green { background: #16a34a; animation: pulseGreen 2s infinite; }
                .dot.pulse-blue { background: #2563eb; animation: pulseBlue 2s infinite; }
                .dot.pulse-amber { background: #d97706; animation: pulseAmber 2s infinite; }

                @keyframes pulseGreen {
                    0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(22, 163, 74, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
                }
                @keyframes pulseBlue {
                    0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
                }
                @keyframes pulseAmber {
                    0% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(217, 119, 6, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0); }
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

                /* ── SKILLS TAG INPUT ── */
                .skills-tag-box {
                    min-height: 52px;
                    padding: 8px 12px;
                    background: #fff;
                    border: 1.5px solid #eef0f2;
                    border-radius: var(--radius-md);
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    align-items: center;
                    cursor: text;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }

                .skills-tag-box:focus-within {
                    border-color: var(--crimson);
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .skill-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    padding: 5px 10px 5px 12px;
                    background: linear-gradient(135deg, rgba(139,26,43,0.08), rgba(139,26,43,0.04));
                    border: 1px solid rgba(139,26,43,0.2);
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--crimson);
                    white-space: nowrap;
                    animation: tag-pop 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                @keyframes tag-pop {
                    from { transform: scale(0.7); opacity: 0; }
                    to   { transform: scale(1);   opacity: 1; }
                }

                .skill-tag-remove {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 1px;
                    color: rgba(139,26,43,0.5);
                    display: flex;
                    align-items: center;
                    border-radius: 50%;
                    transition: color 0.15s, background 0.15s;
                }

                .skill-tag-remove:hover {
                    color: var(--crimson);
                    background: rgba(139,26,43,0.1);
                }

                .skill-tag-input {
                    border: none;
                    outline: none;
                    font-family: inherit;
                    font-size: 0.9rem;
                    color: var(--text-primary);
                    background: transparent;
                    flex: 1;
                    min-width: 160px;
                    padding: 4px 4px;
                }

                .skill-tag-input::placeholder {
                    color: #b0bec5;
                    font-weight: 400;
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

                /* ── RESPONSIVENESS ─────────────────────────── */

                @media (max-width: 1200px) {
                    .premium-form-layout {
                        grid-template-columns: 1fr 300px;
                    }
                }

                @media (max-width: 1024px) {
                    .create-vacancy-page {
                        padding: 20px;
                    }

                    .vacancies-orchestration-header {
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 24px 20px;
                        border-radius: 18px;
                        gap: 16px;
                    }

                    .hero-title-p { font-size: 1.6rem; }

                    .premium-form-layout {
                        grid-template-columns: 1fr;
                        margin-top: 1.5rem;
                    }

                    .sticky-sidebar {
                        position: static;
                        top: auto;
                    }

                    .form-sidebar-container {
                        order: -1;
                    }

                    /* Sidebar becomes a horizontal summary strip on tablet */
                    .status-preview-card {
                        padding: 16px;
                    }
                }

                @media (max-width: 768px) {
                    .create-vacancy-page {
                        padding: 12px;
                    }

                    .vacancies-orchestration-header {
                        padding: 18px 16px;
                        border-radius: 14px;
                        gap: 12px;
                        margin-bottom: 16px;
                    }

                    .hero-title-p { font-size: 1.35rem; }
                    .hero-subtitle-p { font-size: 0.82rem; }

                    .badge-p {
                        font-size: 0.62rem;
                        padding: 4px 10px;
                        margin-bottom: 8px;
                    }

                    .form-section-card {
                        padding: 16px;
                        border-radius: 14px;
                    }

                    .section-header {
                        flex-direction: row;
                        align-items: center;
                        gap: 12px;
                        margin-bottom: 16px;
                        padding-bottom: 12px;
                    }

                    .section-icon {
                        width: 36px;
                        height: 36px;
                        font-size: 1rem;
                        flex-shrink: 0;
                    }

                    /* Force 2-col grids to single column on mobile */
                    .form-grid-2,
                    .form-grid-3 {
                        grid-template-columns: 1fr;
                        gap: 14px;
                    }

                    .full-width {
                        grid-column: 1;
                    }

                    .premium-input,
                    .premium-textarea {
                        font-size: 1rem; /* prevents iOS zoom */
                    }

                    /* Sidebar action buttons full-width on mobile */
                    .form-actions-p .btn {
                        width: 100%;
                        justify-content: center;
                    }

                    /* Tips card compact */
                    .tips-card {
                        padding: 14px;
                    }

                    .status-preview-card {
                        padding: 14px;
                    }

                    /* Match modal */
                    .match-item-card {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 12px;
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
                        padding: 16px 18px;
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 12px;
                    }

                    .header-info-p {
                        flex-direction: row;
                        align-items: flex-start;
                        gap: 10px;
                    }

                    .match-modal-p {
                        max-width: 100%;
                        border-radius: 16px;
                    }

                    .modal-overlay-p {
                        padding: 10px;
                    }
                }

                @media (max-width: 480px) {
                    .hero-title-p { font-size: 1.15rem; }

                    .vacancies-orchestration-header {
                        padding: 14px 12px;
                    }

                    .form-section-card {
                        padding: 12px;
                    }

                    .skills-tag-box {
                        padding: 6px 10px;
                        gap: 6px;
                    }

                    .skill-tag-input {
                        min-width: 100px;
                        font-size: 0.95rem;
                    }

                    .cand-actions-p {
                        flex-direction: column;
                    }

                    .match-modal-p {
                        height: 100%;
                        max-height: 100%;
                        border-radius: 0;
                    }

                    .modal-overlay-p {
                        padding: 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default CreateVacancy;
