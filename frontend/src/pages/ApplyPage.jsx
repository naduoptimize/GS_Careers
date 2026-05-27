import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    FiArrowLeft, FiMapPin, FiBriefcase, FiCalendar, FiUpload,
    FiCheck, FiMenu, FiX, FiUser, FiMail, FiPhone, FiBookOpen,
    FiDollarSign, FiClock, FiFileText, FiFacebook, FiLinkedin,
    FiGlobe, FiHash, FiChevronRight, FiAlertCircle
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { getVacancy, applyForJob, API_BASE } from '../services/api';

const BACKEND_ROOT = API_BASE.replace('/api', '');

const OVERALL_EXPERIENCE_OPTIONS = [
    '0 years', '0-1 years', '1-2 years',
    '3-4 years', '5-7 years', '8-10 years', '10+ years'
];
const RELEVANT_EXPERIENCE_OPTIONS = OVERALL_EXPERIENCE_OPTIONS;
const QUALIFICATION_OPTIONS = ['O/L', 'A/L', 'Diploma', 'Bachelors Degree', 'Masters Degree', 'PhD', 'Professional Certification'];

function ApplyPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vacancy, setVacancy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        first_name: '', last_name: '', email: '', contact_number: '',
        overall_experience: '', relevant_experience: '', qualification: '',
        salary_expectation: '', cv: null, future_consent: null
    });

    useEffect(() => {
        const fetchVacancy = async () => {
            try {
                const response = await getVacancy(id);
                const vacancyData = response.data?.data || response.data;
                if (vacancyData) { setVacancy(vacancyData); }
                else { toast.error('Vacancy not found.'); navigate('/vacancies'); }
            } catch { toast.error('Failed to load vacancy.'); navigate('/vacancies'); }
            finally { setLoading(false); }
        };
        fetchVacancy();
    }, [id, navigate]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) { toast.error('File too large (max 5MB).'); return; }
        setForm({ ...form, cv: file });
    };

    const handleReview = (e) => {
        e.preventDefault();
        if (!form.cv) { toast.error('Please upload your CV.'); return; }
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const submitToBackend = async () => {
        setSubmitting(true);
        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                if (key === 'future_consent') formData.append(key, form[key] === true ? 'true' : 'false');
                else formData.append(key, form[key]);
            });
            formData.append('vacancy_id', id);
            await applyForJob(formData);
            toast.success('Application submitted!');
            navigate('/success', { state: { vacancy } });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit.');
        } finally { setSubmitting(false); }
    };

    const formatDate = (d) => {
        if (!d) return 'N/A';
        const dt = new Date(d);
        return isNaN(dt) ? 'N/A' : dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner"></div>
        </div>
    );

    return (
        <div className="apb-page">

            {/* ── Navbar ── */}
            <nav className="navbar">
                <Link to="/" className="navbar-brand">
                    <img src="/gs-logo.png" alt="George Steuart" className="navbar-logo" />
                    <div>
                        <div className="navbar-title">George Steuart</div>
                        <div className="navbar-subtitle">Careers</div>
                    </div>
                </Link>
                <div className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
                    <Link to="/" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                    <Link to="/vacancies" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>Vacancies</Link>
                    <Link to="/admin/login" className="navbar-link btn-primary" onClick={() => setMobileMenuOpen(false)}>Admin Portal</Link>
                </div>
                <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(v => !v)}>
                    {mobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </nav>

            {/* ── HERO BANNER ── */}
            <div className="apb-banner">
                <div className="apb-banner-img">
                    <img src="/apply.png" alt="Apply" />
                </div>
                <div className="apb-banner-overlay" />
                <div className="apb-banner-content container">
                    <Link to="/vacancies" className="apb-back">
                        <FiArrowLeft /> Back to Vacancies
                    </Link>
                    <div className="apb-banner-company">
                        <div className="apb-banner-logo">
                            <img
                                src={vacancy?.company_logo
                                    ? `${BACKEND_ROOT}/uploads/logos/${vacancy.company_logo}`
                                    : '/gs-logo.png'}
                                alt={vacancy?.company_name || 'George Steuart'}
                                onError={(e) => e.target.src = '/gs-logo.png'}
                            />
                        </div>
                        <span>{vacancy?.company_name || 'George Steuart & Company'}</span>
                    </div>
                    <h1 className="apb-banner-title">{vacancy?.title || 'Open Position'}</h1>
                    <div className="apb-banner-tags">
                        {vacancy?.reference_number && <span className="apb-tag apb-tag-gold"><FiHash />{vacancy.reference_number}</span>}
                        {vacancy?.employment_type && <span className="apb-tag"><FiBriefcase />{vacancy.employment_type}</span>}
                        {vacancy?.location && <span className="apb-tag"><FiMapPin />{vacancy.location}</span>}
                        <span className="apb-tag apb-tag-deadline"><FiCalendar />Closes {formatDate(vacancy?.expire_date)}</span>
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <main className="apb-main">
                <div className="container apb-container">

                    {/* LEFT — Job details */}
                    <aside className="apb-sidebar">
                        <div className="apb-info-card">
                            <h3 className="apb-info-title">Position Details</h3>
                            {vacancy?.description && (
                                <div className="apb-info-block">
                                    <h4>About This Role</h4>
                                    <p>{vacancy.description}</p>
                                </div>
                            )}
                            {vacancy?.requirements && (
                                <div className="apb-info-block">
                                    <h4>Requirements</h4>
                                    <p>{vacancy.requirements}</p>
                                </div>
                            )}
                            <div className="apb-info-meta">
                                {vacancy?.location && <div className="apb-meta-row"><FiMapPin /><span>{vacancy.location}</span></div>}
                                {vacancy?.employment_type && <div className="apb-meta-row"><FiBriefcase /><span>{vacancy.employment_type}</span></div>}
                                <div className="apb-meta-row"><FiCalendar /><span>Closes {formatDate(vacancy?.expire_date)}</span></div>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT — Application form */}
                    <div className="apb-form-area">

                        {/* Step indicator */}
                        <div className="apb-steps">
                            <div className={`apb-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
                                <div className="apb-step-dot">{step > 1 ? <FiCheck /> : '1'}</div>
                                <span>Your Details</span>
                            </div>
                            <div className="apb-step-line" />
                            <div className={`apb-step ${step === 2 ? 'active' : ''}`}>
                                <div className="apb-step-dot">2</div>
                                <span>Review & Submit</span>
                            </div>
                        </div>

                        {/* ─── STEP 1 ─── */}
                        {step === 1 && (
                            <div className="apb-card">
                                <h2 className="apb-card-title">Your Application</h2>

                                <form onSubmit={handleReview}>
                                    {/* Personal Info */}
                                    <div className="apb-fieldset-label">Personal Information</div>
                                    <div className="apb-grid2">
                                        <div className="apb-field">
                                            <label>First Name <span className="req">*</span></label>
                                            <div className="apb-iw"><FiUser className="apb-ico" />
                                                <input type="text" name="first_name" className="apb-input"
                                                    value={form.first_name} onChange={handleChange}
                                                    placeholder="First name" required />
                                            </div>
                                        </div>
                                        <div className="apb-field">
                                            <label>Last Name <span className="req">*</span></label>
                                            <div className="apb-iw"><FiUser className="apb-ico" />
                                                <input type="text" name="last_name" className="apb-input"
                                                    value={form.last_name} onChange={handleChange}
                                                    placeholder="Last name" required />
                                            </div>
                                        </div>
                                        <div className="apb-field">
                                            <label>Email <span className="req">*</span></label>
                                            <div className="apb-iw"><FiMail className="apb-ico" />
                                                <input type="email" name="email" className="apb-input"
                                                    value={form.email} onChange={handleChange}
                                                    placeholder="you@example.com" required />
                                            </div>
                                        </div>
                                        <div className="apb-field">
                                            <label>Contact Number <span className="req">*</span></label>
                                            <div className="apb-iw"><FiPhone className="apb-ico" />
                                                <input type="tel" name="contact_number" className="apb-input"
                                                    value={form.contact_number} onChange={handleChange}
                                                    placeholder="+94 77 123 4567" required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Professional Profile */}
                                    <div className="apb-fieldset-label">Professional Profile</div>
                                    <div className="apb-grid2">
                                        <div className="apb-field">
                                            <label>Highest Qualification <span className="req">*</span></label>
                                            <div className="apb-iw"><FiBookOpen className="apb-ico" />
                                                <select name="qualification" className="apb-input apb-sel"
                                                    value={form.qualification} onChange={handleChange} required>
                                                    <option value="">Select</option>
                                                    {QUALIFICATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="apb-field">
                                            <label>Salary Expectation (LKR)</label>
                                            <div className="apb-iw">

                                                <input
                                                    type="text"
                                                    name="salary_expectation"
                                                    className="apb-input"
                                                    value={form.salary_expectation}
                                                    onChange={handleChange}
                                                    placeholder="e.g. 150,000"
                                                />
                                            </div>
                                        </div>
                                        <div className="apb-field">
                                            <label>Total Experience <span className="req">*</span></label>
                                            <div className="apb-iw"><FiClock className="apb-ico" />
                                                <select name="overall_experience" className="apb-input apb-sel"
                                                    value={form.overall_experience} onChange={handleChange} required>
                                                    <option value="">Select</option>
                                                    <option value="0 years">0 years (Fresher)</option>
                                                    <option value="0-1 years">0–1 years</option>
                                                    <option value="1-2 years">1–2 years</option>
                                                    <option value="3-4 years">3–4 years</option>
                                                    <option value="5-7 years">5–7 years</option>
                                                    <option value="8-10 years">8–10 years</option>
                                                    <option value="10+ years">10+ years</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="apb-field">
                                            <label>Relevant Experience <span className="req">*</span></label>
                                            <div className="apb-iw"><FiClock className="apb-ico" />
                                                <select name="relevant_experience" className="apb-input apb-sel"
                                                    value={form.relevant_experience} onChange={handleChange} required>
                                                    <option value="">Select</option>
                                                    <option value="0 years">0 years (Fresher)</option>
                                                    <option value="0-1 years">0–1 years</option>
                                                    <option value="1-2 years">1–2 years</option>
                                                    <option value="3-4 years">3–4 years</option>
                                                    <option value="5-7 years">5–7 years</option>
                                                    <option value="8-10 years">8–10 years</option>
                                                    <option value="10+ years">10+ years</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CV Upload */}
                                    <div className="apb-fieldset-label">Upload Your CV</div>
                                    <div className="apb-upload" onClick={() => document.getElementById('cv-file').click()}>
                                        <input id="cv-file" type="file" accept=".pdf,.doc,.docx"
                                            style={{ display: 'none' }} onChange={handleFileChange} />
                                        <div className={`apb-upload-icon ${form.cv ? 'has-file' : ''}`}>
                                            {form.cv ? <FiCheck size={22} /> : <FiUpload size={22} />}
                                        </div>
                                        <div>
                                            <div className="apb-upload-text">{form.cv ? form.cv.name : 'Click to upload your CV'}</div>
                                            <div className="apb-upload-hint">PDF, DOC, DOCX · Max 5MB</div>
                                        </div>
                                    </div>

                                    {/* Privacy Consent */}
                                    <div className="apb-consent">
                                        <input type="checkbox" id="priv" required />
                                        <label htmlFor="priv">
                                            I agree my personal information may be processed for recruitment purposes per the <a href="#">Privacy Policy</a>.
                                        </label>
                                    </div>

                                    {/* Talent Pool */}
                                    <div className="apb-talent-pool">
                                        <div className="apb-tp-header">
                                            <span className="apb-tp-emoji">📂</span>
                                            <div>
                                                <strong>Keep my CV for future opportunities?</strong>
                                                <p>HR can reach out for future roles — no need to apply again.</p>
                                            </div>
                                        </div>
                                        <div className="apb-tp-btns">
                                            <button type="button"
                                                className={`apb-tp-btn yes ${form.future_consent === true ? 'sel' : ''}`}
                                                onClick={() => setForm({ ...form, future_consent: true })}>
                                                ✅ Yes, keep my CV
                                            </button>
                                            <button type="button"
                                                className={`apb-tp-btn no ${form.future_consent === false && form.future_consent !== null ? 'sel' : ''}`}
                                                onClick={() => setForm({ ...form, future_consent: false })}>
                                                🚫 This role only
                                            </button>
                                        </div>
                                        {form.future_consent === true && <div className="apb-tp-note yes">🎉 Your CV will be kept in our Talent Pool.</div>}
                                        {form.future_consent === false && <div className="apb-tp-note no">Only used for this application.</div>}
                                    </div>

                                    <button type="submit" className="apb-submit">
                                        Review Application <FiChevronRight />
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* ─── STEP 2 — REVIEW ─── */}
                        {step === 2 && (
                            <div className="apb-card">
                                <h2 className="apb-card-title">Review Your Application</h2>

                                <div className="apb-review-block">
                                    <div className="apb-rev-section">Personal Information</div>
                                    <div className="apb-grid2">
                                        {[['First Name', form.first_name], ['Last Name', form.last_name],
                                        ['Email', form.email], ['Phone', form.contact_number]].map(([l, v]) => (
                                            <div key={l} className="apb-rv-item">
                                                <span className="apb-rv-lbl">{l}</span>
                                                <span className="apb-rv-val">{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="apb-review-block">
                                    <div className="apb-rev-section">Professional Profile</div>
                                    <div className="apb-grid2">
                                        {[['Qualification', form.qualification],
                                        ['Salary', form.salary_expectation || '—'],
                                        ['Total Exp.', form.overall_experience],
                                        ['Relevant Exp.', form.relevant_experience]].map(([l, v]) => (
                                            <div key={l} className="apb-rv-item">
                                                <span className="apb-rv-lbl">{l}</span>
                                                <span className="apb-rv-val">{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="apb-review-block">
                                    <div className="apb-rev-section">Documents & Preferences</div>
                                    <div className="apb-rv-doc"><FiFileText /><span>{form.cv?.name}</span></div>
                                    <div className="apb-rv-item" style={{ marginTop: 12 }}>
                                        <span className="apb-rv-lbl">Future Opportunities</span>
                                        <span className="apb-rv-val" style={{ color: form.future_consent ? 'var(--success)' : 'var(--text-muted)' }}>
                                            {form.future_consent ? 'Yes — keep my CV on file' : 'No — this role only'}
                                        </span>
                                    </div>
                                </div>

                                <div className="apb-disclosure" style={{ fontWeight: 700, color: '#b8860b', background: 'rgba(184,134,11,0.08)', border: '1px solid rgba(184,134,11,0.3)', borderRadius: '8px', padding: '10px 14px' }}>
                                    <FiAlertCircle size={14} style={{ marginRight: 6, verticalAlign: 'middle', color: '#b8860b' }} />
                                    <strong>By submitting, you confirm all information is accurate and complete. </strong>
                                </div>

                                <div className="apb-review-actions">
                                    <button className="apb-edit-btn" onClick={() => setStep(1)} disabled={submitting}>
                                        <FiArrowLeft /> Edit
                                    </button>
                                    <button className="apb-submit apb-submit-final" onClick={submitToBackend} disabled={submitting}>
                                        {submitting ? 'Submitting…' : <><FiCheck /> Confirm & Submit</>}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className="footer-premium">
                <div className="container">
                    <div className="footer-top-grid">
                        <div className="footer-col brand-col">
                            <img src="/gs-logo.png" alt="George Steuart" className="footer-logo-premium" />
                            <h3 className="footer-brand-name">George Steuart <br /><span>& Company Ltd</span></h3>
                            <p className="footer-about-text">Established in 1835, Sri Lanka's oldest mercantile firm.</p>
                            <div className="footer-socials">
                                <a href="https://www.facebook.com/GeorgeSteuarts" target="_blank" rel="noopener noreferrer" className="social-link"><FiFacebook /></a>
                                <a href="https://www.linkedin.com/company/george-steuart-&-company-limited" target="_blank" rel="noopener noreferrer" className="social-link"><FiLinkedin /></a>
                            </div>
                        </div>
                        <div className="footer-col links-col">
                            <h4 className="footer-col-title">Quick Links</h4>
                            <ul className="footer-links-list">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/vacancies">All Vacancies</Link></li>
                                <li><Link to="/admin/login">Admin Portal</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col contact-col">
                            <h4 className="footer-col-title">Get In Touch</h4>
                            <div className="footer-contact-info">
                                <p><FiMapPin className="c-icon" /> No. 439, Galle Road, Colombo 03.</p>
                                <p><FiGlobe className="c-icon" /> www.georgesteuart.lk</p>
                                <div className="contact-numbers">
                                    <p><span>T:</span> +94 117 792 400</p>
                                    <p><span>E:</span> info@georgesteuart.lk</p>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bottom-bar">
                            <div className="copyright-area">© {new Date().getFullYear()} George Steuart & Company Ltd. All Rights Reserved.</div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default ApplyPage;
