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
    const [privacyAccepted, setPrivacyAccepted] = useState(false);

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

    const [parsing, setParsing] = useState(false);

    useEffect(() => {
        console.log("Steuart AI PDFJS Integration Status:", !!window.pdfjsLib);
    }, []);

    const extractTextFromPdf = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const typedarray = new Uint8Array(e.target.result);
                    const pdfjsLib = window.pdfjsLib;
                    if (!pdfjsLib) {
                        reject(new Error("PDFJS library not loaded yet. Please wait."));
                        return;
                    }
                    const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
                    let fullText = "";
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(" ");
                        fullText += pageText + "\n";
                    }
                    resolve(fullText);
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = (err) => reject(err);
            reader.readAsArrayBuffer(file);
        });
    };

    const parseResumeWithAI = async (file) => {
        setParsing(true);
        const toastId = toast.info("✨ Steuart AI is analyzing your CV...", { autoClose: false });
        try {
            const text = await extractTextFromPdf(file);
            if (!text || text.trim().length === 0) {
                throw new Error("Unable to extract text content from PDF resume.");
            }

            const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
            if (!GEMINI_API_KEY) {
                throw new Error("Gemini API key is not configured. Please define VITE_GEMINI_API_KEY in your .env file.");
            }
            const models = [
                "gemini-2.5-flash",
                "gemini-2.0-flash",
                "gemini-1.5-flash",
                "gemini-1.5-pro"
            ];

            let response = null;
            let lastError = null;
            let successfulModel = null;

            for (const model of models) {
                try {
                    console.log(`Attempting AI resume parsing with model: ${model}`);
                    const res = await fetch(
                        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                contents: [
                                    {
                                        parts: [
                                            {
                                                text: `You are an expert resume parser for George Steuart & Company Ltd. 
Parse the following candidate resume text and extract the details strictly matching the requested JSON schema.
Ensure phone numbers are extracted correctly (usually starting with +94 or 07), first/last names are clean and correctly separated, and qualifications & experience are mapped EXACTLY to the allowed enum options.

Resume Text:
${text}`
                                            }
                                        ]
                                    }
                                ],
                                generationConfig: {
                                    responseMimeType: "application/json",
                                    responseSchema: {
                                        type: "OBJECT",
                                        properties: {
                                            first_name: { type: "STRING" },
                                            last_name: { type: "STRING" },
                                            email: { type: "STRING" },
                                            contact_number: { type: "STRING" },
                                            qualification: { 
                                                type: "STRING", 
                                                enum: ['O/L', 'A/L', 'Diploma', 'Bachelors Degree', 'Masters Degree', 'PhD', 'Professional Certification']
                                            },
                                            overall_experience: { 
                                                type: "STRING", 
                                                enum: ['0 years', '0-1 years', '1-2 years', '3-4 years', '5-7 years', '8-10 years', '10+ years']
                                            },
                                            relevant_experience: { 
                                                type: "STRING", 
                                                enum: ['0 years', '0-1 years', '1-2 years', '3-4 years', '5-7 years', '8-10 years', '10+ years']
                                            },
                                            salary_expectation: { type: "STRING" }
                                        },
                                        required: ["first_name", "last_name", "email", "contact_number", "qualification", "overall_experience", "relevant_experience"]
                                    }
                                }
                            })
                        }
                    );

                    if (res.ok) {
                        response = res;
                        successfulModel = model;
                        console.log(`Successfully parsed resume using model: ${model}`);
                        break;
                    } else {
                        let errorMsg = `API returned status ${res.status}`;
                        try {
                            const errorJson = await res.json();
                            if (errorJson?.error?.message) {
                                errorMsg += `: ${errorJson.error.message}`;
                            }
                        } catch (_) {}
                        console.warn(`Model ${model} failed: ${errorMsg}`);
                        lastError = new Error(errorMsg);
                    }
                } catch (fetchErr) {
                    console.warn(`Network/fetch error for model ${model}:`, fetchErr);
                    lastError = fetchErr;
                }
            }

            if (!response) {
                throw lastError || new Error("All Gemini models failed to parse the resume.");
            }

            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!textResponse) {
                throw new Error("No structured text response from AI.");
            }

            const parsed = JSON.parse(textResponse);

            // Populate form
            setForm(prev => ({
                ...prev,
                first_name: parsed.first_name || prev.first_name || '',
                last_name: parsed.last_name || prev.last_name || '',
                email: parsed.email || prev.email || '',
                contact_number: parsed.contact_number || prev.contact_number || '',
                qualification: parsed.qualification || prev.qualification || '',
                overall_experience: parsed.overall_experience || prev.overall_experience || '',
                relevant_experience: parsed.relevant_experience || prev.relevant_experience || '',
                salary_expectation: parsed.salary_expectation || prev.salary_expectation || ''
            }));

            toast.update(toastId, {
                render: "🎉 Steuart AI successfully parsed your CV and auto-filled the form!",
                type: "success",
                autoClose: 4000,
                isLoading: false
            });
        } catch (err) {
            console.error("CV parsing error:", err);
            toast.update(toastId, {
                render: `⚠️ AI auto-fill failed: ${err.message || 'Please enter details manually.'}`,
                type: "warning",
                autoClose: 7000,
                isLoading: false
            });
        } finally {
            setParsing(false);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { toast.error('File too large (max 5MB).'); return; }
        
        setForm(prev => ({ ...prev, cv: file }));

        if (file.type === 'application/pdf') {
            await parseResumeWithAI(file);
        } else {
            toast.info('AI auto-fill is optimized for PDF resumes. Forms can still be filled manually.');
        }
    };

    const handleReview = (e) => {
        e.preventDefault();
        if (!form.cv) { toast.error('Please upload your CV.'); return; }
        
        // Validate Salary Expectation (LKR)
        const salary = form.salary_expectation?.toString().trim();
        if (!salary) {
            toast.error('Salary Expectation (LKR) is required.');
            return;
        }

        // Clean formatting commas and check numeric validity
        const cleanSalary = salary.replace(/,/g, '');
        if (!/^\d+(\.\d+)?$/.test(cleanSalary) || parseFloat(cleanSalary) <= 0) {
            toast.error('Salary Expectation must be a valid positive numeric amount (digits only, e.g. 150000 or 150,000).');
            return;
        }

        if (!privacyAccepted) {
            toast.error('You must agree to the Privacy Policy to proceed.');
            return;
        }

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
                                    <style>{`
                                        .spinner-small {
                                            width: 22px;
                                            height: 22px;
                                            border: 2px solid rgba(200, 169, 81, 0.15);
                                            border-top-color: var(--gold-accent, #c8a951);
                                            border-radius: 50%;
                                            animation: spin-cv 0.8s linear infinite;
                                        }
                                        @keyframes spin-cv {
                                            to { transform: rotate(360deg); }
                                        }
                                    `}</style>

                                    {/* CV Upload at the TOP */}
                                    <div className="apb-fieldset-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                                        <span>Quick Apply: Upload Your CV</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--gold-accent)', fontWeight: 'bold', background: 'rgba(200, 169, 81, 0.08)', padding: '3px 10px', borderRadius: '100px', border: '1px solid rgba(200,169,81,0.15)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                                            ✨ Gemini AI Auto-Fill Enabled
                                        </span>
                                    </div>
                                    <div className="apb-upload" style={{ position: 'relative', border: parsing ? '2px dashed var(--gold-accent)' : '2px dashed var(--border-light)', cursor: parsing ? 'not-allowed' : 'pointer' }} onClick={() => !parsing && document.getElementById('cv-file').click()}>
                                        <input id="cv-file" type="file" accept=".pdf"
                                            style={{ display: 'none' }} onChange={handleFileChange} disabled={parsing} />
                                        
                                        {parsing ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', padding: '4px 0' }}>
                                                <div className="spinner-small" style={{ flexShrink: 0 }}></div>
                                                <div style={{ textAlign: 'left' }}>
                                                    <div className="apb-upload-text" style={{ color: 'var(--gold-accent)', fontWeight: 800 }}>Steuart AI is parsing your resume...</div>
                                                    <div className="apb-upload-hint">Extracting contact details, qualifications, and experience. Please wait.</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className={`apb-upload-icon ${form.cv ? 'has-file' : ''}`}>
                                                    {form.cv ? <FiCheck size={22} /> : <FiUpload size={22} />}
                                                </div>
                                                <div style={{ textAlign: 'left' }}>
                                                    <div className="apb-upload-text">{form.cv ? form.cv.name : 'Click here to upload your PDF CV'}</div>
                                                    <div className="apb-upload-hint">Upload a PDF resume to instantly pre-fill all form details in a single click!</div>
                                                </div>
                                            </>
                                        )}
                                    </div>

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
                                            <label>Salary Expectation (LKR) <span className="req">*</span></label>
                                            <div className="apb-iw"><FiDollarSign className="apb-ico" />
                                                <input
                                                    type="text"
                                                    name="salary_expectation"
                                                    className="apb-input"
                                                    value={form.salary_expectation}
                                                    onChange={handleChange}
                                                    placeholder="e.g. 150,000"
                                                    required
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

                                    {/* CV is now uploaded and parsed at the top */}

                                    {/* Privacy Consent */}
                                    <div className="apb-consent">
                                        <input
                                            type="checkbox"
                                            id="priv"
                                            checked={privacyAccepted}
                                            onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                            required
                                        />
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

                                    <button
                                        type="submit"
                                        className="apb-submit"
                                        disabled={!privacyAccepted}
                                        style={{
                                            opacity: !privacyAccepted ? 0.6 : 1,
                                            cursor: !privacyAccepted ? 'not-allowed' : 'pointer'
                                        }}
                                    >
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
