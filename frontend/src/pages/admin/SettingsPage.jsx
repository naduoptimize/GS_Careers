import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
    FiSettings, FiMail, FiCheck, FiActivity, FiServer, 
    FiLock, FiUser, FiEye, FiEyeOff, FiPlay, FiInfo, 
    FiCheckCircle, FiXCircle, FiAlertTriangle, FiChevronDown, FiChevronUp,
    FiEdit, FiX, FiFileText, FiCpu, FiTarget, FiRefreshCw, FiShield,
    FiSliders, FiZap, FiLayers, FiCopy, FiToggleLeft, FiToggleRight, FiClock
} from 'react-icons/fi';
import { getSettings, saveSettings, testSmtpSettings, checkGeminiQuota } from '../../services/api';

function SettingsPage({ admin }) {
    const [activeTab, setActiveTab] = useState('score');
    const [activeEmailSubTab, setActiveEmailSubTab] = useState('candidate');
    const [settings, setSettings] = useState({
        system_email: '',
        smtp_host: '',
        smtp_port: '',
        smtp_secure: 'tls',
        smtp_user: '',
        smtp_pass: '',
        smtp_from_name: '',
        enable_candidate_emails: '1',
        
        // Match Score Thresholds
        min_high_match_score: '75',
        min_medium_match_score: '50',
        
        // PDPA Settings
        pdpa_title: '',
        pdpa_description: '',
        pdpa_purpose: '',
        pdpa_retention: '',
        pdpa_security: '',
        pdpa_rights: '',
        
        // Email Template Settings
        email_template_confirmation_subject: '',
        email_template_confirmation_body: '',
        email_template_shortlist_subject: '',
        email_template_shortlist_body: '',
        email_template_rejection_subject: '',
        email_template_rejection_body: '',
        
        // Vacancy Requisition Workflow Templates
        email_template_vacancy_pending_subject: '',
        email_template_vacancy_pending_body: '',
        email_template_vacancy_approved_subject: '',
        email_template_vacancy_approved_body: '',
        email_template_vacancy_rejected_subject: '',
        email_template_vacancy_rejected_body: '',
        
        // AI Settings
        ai_provider: 'ollama',
        gemini_api_key: '',
        gemini_model: 'gemini-2.5-flash',
        ollama_server: 'http://172.16.7.21:11434',
        ollama_model: 'qwen2.5:3b',
        
        // Candidate Score Calculation Weights (%)
        weight_skills: 35,
        weight_experience: 30,
        weight_qualification: 20,
        weight_jd_alignment: 10,
        weight_salary: 5,
        
        // Defaults
        default_email: '',
        default_smtp_host: '',
        default_smtp_port: '',
        default_smtp_secure: '',
        default_smtp_user: '',
        default_smtp_from_name: ''
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [testing, setTesting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [testRecipient, setTestRecipient] = useState('');
    const [testResult, setTestResult] = useState(null); // { success: boolean, message: string, debug: string }
    const [showDebug, setShowDebug] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [backupSettings, setBackupSettings] = useState(null);

    // Role detection (Super Admin gets full access to all 5 tabs including AI & Email Templates)
    const storedAdminData = (() => {
        try {
            return localStorage.getItem('gs_admin_data') ? JSON.parse(localStorage.getItem('gs_admin_data')) : null;
        } catch (e) {
            return null;
        }
    })();
    const currentRole = admin?.role || storedAdminData?.role || '';
    const isSuperAdmin = currentRole === 'super_admin';

    // Gemini Quota Monitor State
    const [quotaData, setQuotaData] = useState(null);
    const [checkingQuota, setCheckingQuota] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    useEffect(() => {
        if (!isSuperAdmin && (activeTab === 'email' || activeTab === 'ai')) {
            setActiveTab('score');
        }
    }, [isSuperAdmin, activeTab]);

    useEffect(() => {
        if (isSuperAdmin && activeTab === 'ai' && !quotaData) {
            handleCheckQuota();
        }
    }, [activeTab, isSuperAdmin]);

    const handleCheckQuota = async () => {
        setCheckingQuota(true);
        try {
            const res = await checkGeminiQuota({ apiKey: settings.gemini_api_key });
            if (res.data?.data) {
                setQuotaData(res.data.data);
                if (res.data.data.status === 'healthy') {
                    toast.success('🟢 Gemini API Key is active & healthy!');
                } else if (res.data.data.is_exhausted) {
                    toast.error(`🔴 ${res.data.data.message}`);
                } else {
                    toast.warning(`⚠️ ${res.data.data.message}`);
                }
            }
        } catch (err) {
            console.error('Failed to check Gemini quota:', err);
            toast.error('Failed to verify Gemini API Key status');
        } finally {
            setCheckingQuota(false);
        }
    };

    const loadSettings = async () => {
        try {
            setLoading(true);
            const res = await getSettings();
            const data = res.data.data || {};
            const loaded = {
                system_email: data.system_email || '',
                smtp_host: data.smtp_host || '',
                smtp_port: data.smtp_port || '',
                smtp_secure: data.smtp_secure || 'tls',
                smtp_user: data.smtp_user || '',
                smtp_pass: data.smtp_pass || '',
                smtp_from_name: data.smtp_from_name || '',
                enable_candidate_emails: data.enable_candidate_emails !== undefined ? data.enable_candidate_emails : '1',
                
                min_high_match_score: data.min_high_match_score || '75',
                min_medium_match_score: data.min_medium_match_score || '50',
                
                pdpa_title: data.pdpa_title || '',
                pdpa_description: data.pdpa_description || '',
                pdpa_purpose: data.pdpa_purpose || '',
                pdpa_retention: data.pdpa_retention || '',
                pdpa_security: data.pdpa_security || '',
                pdpa_rights: data.pdpa_rights || '',
                
                email_template_confirmation_subject: data.email_template_confirmation_subject || '',
                email_template_confirmation_body: data.email_template_confirmation_body || '',
                email_template_shortlist_subject: data.email_template_shortlist_subject || '',
                email_template_shortlist_body: data.email_template_shortlist_body || '',
                email_template_rejection_subject: data.email_template_rejection_subject || '',
                email_template_rejection_body: data.email_template_rejection_body || '',
                
                email_template_vacancy_pending_subject: data.email_template_vacancy_pending_subject || '',
                email_template_vacancy_pending_body: data.email_template_vacancy_pending_body || '',
                email_template_vacancy_approved_subject: data.email_template_vacancy_approved_subject || '',
                email_template_vacancy_approved_body: data.email_template_vacancy_approved_body || '',
                email_template_vacancy_rejected_subject: data.email_template_vacancy_rejected_subject || '',
                email_template_vacancy_rejected_body: data.email_template_vacancy_rejected_body || '',
                
                ai_provider: data.ai_provider || 'ollama',
                gemini_api_key: data.gemini_api_key || '',
                gemini_model: data.gemini_model || 'gemini-2.5-flash',
                ollama_server: data.ollama_server || 'http://172.16.7.21:11434',
                ollama_model: data.ollama_model || 'qwen2.5:3b',
                
                weight_skills: data.weight_skills !== undefined ? parseInt(data.weight_skills, 10) : 35,
                weight_experience: data.weight_experience !== undefined ? parseInt(data.weight_experience, 10) : 30,
                weight_qualification: data.weight_qualification !== undefined ? parseInt(data.weight_qualification, 10) : 20,
                weight_jd_alignment: data.weight_jd_alignment !== undefined ? parseInt(data.weight_jd_alignment, 10) : 10,
                weight_salary: data.weight_salary !== undefined ? parseInt(data.weight_salary, 10) : 5,
                
                default_email: data.default_email || '',
                default_smtp_host: data.default_smtp_host || '',
                default_smtp_port: data.default_smtp_port || '',
                default_smtp_secure: data.default_smtp_secure || '',
                default_smtp_user: data.default_smtp_user || '',
                default_smtp_from_name: data.default_smtp_from_name || ''
            };
            setSettings(loaded);
            setBackupSettings(loaded);

            if (admin?.email) {
                setTestRecipient(admin.email);
            } else if (data.system_email) {
                setTestRecipient(data.system_email);
            } else {
                setTestRecipient(data.default_email || '');
            }
        } catch (err) {
            console.error('Failed to load settings:', err);
            toast.error(err.response?.data?.message || 'Failed to load system settings');
        } finally {
            setLoading(false);
        }
    };

    const handleQuickAiSwitch = async (provider) => {
        if (settings.ai_provider === provider) return;
        try {
            await saveSettings({
                ...settings,
                ai_provider: provider
            });
            
            setSettings(prev => ({
                ...prev,
                ai_provider: provider
            }));
            
            toast.success(`🚀 System AI engine switched to ${provider === 'gemini' ? 'Google Gemini (Cloud)' : 'Local Ollama (Offline)'}!`);
        } catch (err) {
            console.error('Failed to switch AI provider:', err);
            toast.error('Failed to update AI engine selection');
        }
    };

    const handleStartEdit = () => {
        setBackupSettings({ ...settings });
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        if (backupSettings) {
            setSettings({ ...backupSettings });
        }
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!settings.system_email) {
            toast.warning('Sender Email Address is required');
            setActiveTab('mail');
            return;
        }
        if (!settings.pdpa_title || !settings.pdpa_description || !settings.pdpa_purpose || !settings.pdpa_retention || !settings.pdpa_security || !settings.pdpa_rights) {
            toast.warning('All PDPA Consent fields are required');
            setActiveTab('pdpa');
            return;
        }

        const totalWeights = (parseInt(settings.weight_skills, 10) || 0) +
                             (parseInt(settings.weight_experience, 10) || 0) +
                             (parseInt(settings.weight_qualification, 10) || 0) +
                             (parseInt(settings.weight_jd_alignment, 10) || 0) +
                             (parseInt(settings.weight_salary, 10) || 0);
        if (totalWeights !== 100) {
            toast.warning(`Total Candidate Score Calculation Weights must equal exactly 100% (currently ${totalWeights}%). Please adjust your weights.`);
            setActiveTab('score');
            return;
        }
        
        setSaving(true);
        try {
            await saveSettings({
                system_email: settings.system_email,
                smtp_host: settings.smtp_host,
                smtp_port: settings.smtp_port,
                smtp_secure: settings.smtp_secure,
                smtp_user: settings.smtp_user,
                smtp_pass: settings.smtp_pass,
                smtp_from_name: settings.smtp_from_name,
                enable_candidate_emails: settings.enable_candidate_emails,
                min_high_match_score: settings.min_high_match_score,
                min_medium_match_score: settings.min_medium_match_score,
                weight_skills: settings.weight_skills,
                weight_experience: settings.weight_experience,
                weight_qualification: settings.weight_qualification,
                weight_jd_alignment: settings.weight_jd_alignment,
                weight_salary: settings.weight_salary,
                pdpa_title: settings.pdpa_title,
                pdpa_description: settings.pdpa_description,
                pdpa_purpose: settings.pdpa_purpose,
                pdpa_retention: settings.pdpa_retention,
                pdpa_security: settings.pdpa_security,
                pdpa_rights: settings.pdpa_rights,
                email_template_confirmation_subject: settings.email_template_confirmation_subject,
                email_template_confirmation_body: settings.email_template_confirmation_body,
                email_template_shortlist_subject: settings.email_template_shortlist_subject,
                email_template_shortlist_body: settings.email_template_shortlist_body,
                email_template_rejection_subject: settings.email_template_rejection_subject,
                email_template_rejection_body: settings.email_template_rejection_body,
                email_template_vacancy_pending_subject: settings.email_template_vacancy_pending_subject,
                email_template_vacancy_pending_body: settings.email_template_vacancy_pending_body,
                email_template_vacancy_approved_subject: settings.email_template_vacancy_approved_subject,
                email_template_vacancy_approved_body: settings.email_template_vacancy_approved_body,
                email_template_vacancy_rejected_subject: settings.email_template_vacancy_rejected_subject,
                email_template_vacancy_rejected_body: settings.email_template_vacancy_rejected_body,
                ai_provider: settings.ai_provider,
                gemini_api_key: settings.gemini_api_key,
                gemini_model: settings.gemini_model,
                ollama_server: settings.ollama_server,
                ollama_model: settings.ollama_model
            });
            toast.success('System configurations updated successfully');
            setIsEditing(false);
            loadSettings();
        } catch (err) {
            console.error('Failed to save settings:', err);
            toast.error(err.response?.data?.message || 'Failed to save system settings');
        } finally {
            setSaving(false);
        }
    };

    const handleTestSmtp = async () => {
        if (!testRecipient) {
            toast.warning('Please enter a recipient email address to send the test message to.');
            return;
        }

        setTesting(true);
        setTestResult(null);
        setShowDebug(false);

        try {
            const res = await testSmtpSettings({
                system_email: settings.system_email || settings.default_email,
                smtp_host: settings.smtp_host || settings.default_smtp_host,
                smtp_port: settings.smtp_port || settings.default_smtp_port,
                smtp_secure: settings.smtp_secure || settings.default_smtp_secure,
                smtp_user: settings.smtp_user || settings.default_smtp_user,
                smtp_pass: settings.smtp_pass,
                smtp_from_name: settings.smtp_from_name || settings.default_smtp_from_name,
                test_recipient: testRecipient
            });
            setTestResult({
                success: true,
                message: res.data.message || 'SMTP Connection successful! Test email delivered.',
                debug: res.data.data?.debug || 'No log details available.'
            });
            toast.success('SMTP Verification Email Sent Successfully!');
        } catch (err) {
            console.error('SMTP test connection failed:', err);
            setTestResult({
                success: false,
                message: err.response?.data?.message || 'SMTP test connection failed.',
                debug: err.response?.data?.data?.debug || err.message || 'No log details available.'
            });
            toast.error('SMTP Connection Test Failed');
        } finally {
            setTesting(false);
        }
    };

    const insertTag = (fieldName, tag) => {
        setSettings(prev => ({
            ...prev,
            [fieldName]: (prev[fieldName] || '') + ` ${tag} `
        }));
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <div className="spinner-p" style={{ width: '32px', height: '32px', borderWidth: '3px', borderTopColor: '#7A1228' }}></div>
                <p style={{ marginTop: '14px', color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>Loading configurations...</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 8px 60px 8px', animation: 'fadeIn 0.25s ease-out' }}>
            
            {/* 1. EXECUTIVE HERO HEADER CARD BANNER */}
            <div style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                borderTop: '4px solid #7A1228',
                boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.04), 0 4px 12px -2px rgba(122, 18, 40, 0.03)',
                padding: '24px 28px',
                marginBottom: '24px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Decorative Ambient Glow */}
                <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '180px',
                    height: '180px',
                    background: 'radial-gradient(circle, rgba(122, 18, 40, 0.06) 0%, rgba(255, 255, 255, 0) 70%)',
                    pointerEvents: 'none'
                }} />

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    {/* Left Side: Icon + Titles */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: '1 1 450px' }}>
                        {/* Glowing Brand Icon Badge */}
                        <div style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #7A1228 0%, #5c0b1e 100%)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justify: 'center',
                            fontSize: '1.45rem',
                            boxShadow: '0 8px 20px rgba(122, 18, 40, 0.28)',
                            flexShrink: 0
                        }}>
                            <FiSliders />
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                                <span style={{
                                    background: 'rgba(122, 18, 40, 0.08)',
                                    color: '#7A1228',
                                    padding: '3px 10px',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    letterSpacing: '0.04em',
                                    textTransform: 'uppercase',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span>
                                    SYSTEM CONFIGURATIONS • V2.4
                                </span>
                            </div>

                            <h1 style={{ fontSize: '1.55rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 4px 0', letterSpacing: '-0.025em' }}>
                                Portal Settings &amp; Preferences
                            </h1>
                            
                            <p style={{ fontSize: '0.86rem', color: '#64748b', margin: 0, lineHeight: '1.45' }}>
                                Manage candidate match thresholds, SMTP mail servers, notification templates, and AI resume parsing engines.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Action Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                        {!isEditing ? (
                            <button
                                type="button"
                                onClick={handleStartEdit}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '11px 24px',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    fontSize: '0.88rem',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #7A1228 0%, #5c0b1e 100%)',
                                    color: '#ffffff',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: '0 4px 16px rgba(122, 18, 40, 0.28)',
                                    letterSpacing: '0.01em'
                                }}
                            >
                                <FiEdit style={{ fontSize: '0.95rem' }} /> Edit Settings
                            </button>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    style={{
                                        padding: '11px 20px',
                                        borderRadius: '12px',
                                        fontWeight: 600,
                                        fontSize: '0.88rem',
                                        border: '1px solid #cbd5e1',
                                        background: '#ffffff',
                                        color: '#475569',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={saving}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '11px 26px',
                                        borderRadius: '12px',
                                        fontWeight: 800,
                                        fontSize: '0.88rem',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #7A1228 0%, #5c0b1e 100%)',
                                        color: '#ffffff',
                                        cursor: saving ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 4px 16px rgba(122, 18, 40, 0.28)'
                                    }}
                                >
                                    <FiCheck /> {saving ? 'Saving...' : 'Save Settings'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. FLOATING SEGMENTED CONTROL TABS */}
            <div style={{
                background: '#f1f5f9',
                padding: '4px',
                borderRadius: '14px',
                display: 'flex',
                gap: '4px',
                marginBottom: '28px',
                overflowX: 'auto',
                border: '1px solid #e2e8f0'
            }}>
                <button
                    type="button"
                    onClick={() => setActiveTab('score')}
                    style={{
                        flex: 1,
                        padding: '10px 16px',
                        borderRadius: '10px',
                        fontWeight: activeTab === 'score' ? 700 : 600,
                        fontSize: '0.86rem',
                        border: 'none',
                        background: activeTab === 'score' ? '#ffffff' : 'transparent',
                        color: activeTab === 'score' ? '#7A1228' : '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        whiteSpace: 'nowrap',
                        boxShadow: activeTab === 'score' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                    }}
                >
                    <FiTarget style={{ fontSize: '1rem', color: activeTab === 'score' ? '#7A1228' : '#94a3b8' }} />
                    Match Score
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('mail')}
                    style={{
                        flex: 1,
                        padding: '10px 16px',
                        borderRadius: '10px',
                        fontWeight: activeTab === 'mail' ? 700 : 600,
                        fontSize: '0.86rem',
                        border: 'none',
                        background: activeTab === 'mail' ? '#ffffff' : 'transparent',
                        color: activeTab === 'mail' ? '#7A1228' : '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        whiteSpace: 'nowrap',
                        boxShadow: activeTab === 'mail' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                    }}
                >
                    <FiMail style={{ fontSize: '1rem', color: activeTab === 'mail' ? '#7A1228' : '#94a3b8' }} />
                    Mail &amp; SMTP
                </button>
                {isSuperAdmin && (
                    <button
                        type="button"
                        onClick={() => setActiveTab('email')}
                        style={{
                            flex: 1,
                            padding: '10px 16px',
                            borderRadius: '10px',
                            fontWeight: activeTab === 'email' ? 700 : 600,
                            fontSize: '0.86rem',
                            border: 'none',
                            background: activeTab === 'email' ? '#ffffff' : 'transparent',
                            color: activeTab === 'email' ? '#7A1228' : '#64748b',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            whiteSpace: 'nowrap',
                            boxShadow: activeTab === 'email' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                        }}
                    >
                        <FiFileText style={{ fontSize: '1rem', color: activeTab === 'email' ? '#7A1228' : '#94a3b8' }} />
                        Email Templates
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => setActiveTab('pdpa')}
                    style={{
                        flex: 1,
                        padding: '10px 16px',
                        borderRadius: '10px',
                        fontWeight: activeTab === 'pdpa' ? 700 : 600,
                        fontSize: '0.86rem',
                        border: 'none',
                        background: activeTab === 'pdpa' ? '#ffffff' : 'transparent',
                        color: activeTab === 'pdpa' ? '#7A1228' : '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        whiteSpace: 'nowrap',
                        boxShadow: activeTab === 'pdpa' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                    }}
                >
                    <FiShield style={{ fontSize: '1rem', color: activeTab === 'pdpa' ? '#7A1228' : '#94a3b8' }} />
                    PDPA Consent
                </button>
                {isSuperAdmin && (
                    <button
                        type="button"
                        onClick={() => setActiveTab('ai')}
                        style={{
                            flex: 1,
                            padding: '10px 16px',
                            borderRadius: '10px',
                            fontWeight: activeTab === 'ai' ? 700 : 600,
                            fontSize: '0.86rem',
                            border: 'none',
                            background: activeTab === 'ai' ? '#ffffff' : 'transparent',
                            color: activeTab === 'ai' ? '#7A1228' : '#64748b',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            whiteSpace: 'nowrap',
                            boxShadow: activeTab === 'ai' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                        }}
                    >
                        <FiCpu style={{ fontSize: '1rem', color: activeTab === 'ai' ? '#7A1228' : '#94a3b8' }} />
                        AI Resume Parser
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* ========================================================= */}
                    {/* TAB 1: MATCH SCORE THRESHOLDS                             */}
                    {/* ========================================================= */}
                    {activeTab === 'score' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            
                            {/* MAIN THRESHOLD CARDS ROW */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                                
                                {/* High Match Card */}
                                <div style={{
                                    background: '#ffffff',
                                    padding: '22px',
                                    borderRadius: '16px',
                                    border: '1px solid #e2e8f0',
                                    borderTop: '3.5px solid #16a34a',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '14px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
                                            HIGH MATCH
                                        </span>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#15803d' }}>
                                            ≥ {settings.min_high_match_score}%
                                        </span>
                                    </div>

                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>Top Recommended</h4>
                                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px', marginBottom: 0, lineHeight: '1.45' }}>
                                            Candidates meeting or exceeding this threshold receive a green verified match badge.
                                        </p>
                                    </div>

                                    {isEditing && (
                                        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d' }}>Min Score Limit</label>
                                                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d' }}>{settings.min_high_match_score}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="55"
                                                max="95"
                                                value={settings.min_high_match_score}
                                                onChange={(e) => setSettings(prev => ({ ...prev, min_high_match_score: e.target.value }))}
                                                style={{ width: '100%', accentColor: '#16a34a', cursor: 'pointer' }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Medium Match Card */}
                                <div style={{
                                    background: '#ffffff',
                                    padding: '22px',
                                    borderRadius: '16px',
                                    border: '1px solid #e2e8f0',
                                    borderTop: '3.5px solid #d97706',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '14px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ background: '#fef3c7', color: '#b45309', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
                                            MEDIUM MATCH
                                        </span>
                                        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#b45309' }}>
                                            {settings.min_medium_match_score}% – {parseInt(settings.min_high_match_score, 10) - 1}%
                                        </span>
                                    </div>

                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>Potential Review</h4>
                                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px', marginBottom: 0, lineHeight: '1.45' }}>
                                            Candidates meeting primary criteria but lacking optional skills receive an amber review badge.
                                        </p>
                                    </div>

                                    {isEditing && (
                                        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b45309' }}>Min Score Limit</label>
                                                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#b45309' }}>{settings.min_medium_match_score}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="25"
                                                max={parseInt(settings.min_high_match_score, 10) - 5}
                                                value={settings.min_medium_match_score}
                                                onChange={(e) => setSettings(prev => ({ ...prev, min_medium_match_score: e.target.value }))}
                                                style={{ width: '100%', accentColor: '#d97706', cursor: 'pointer' }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Low Match Card */}
                                <div style={{
                                    background: '#ffffff',
                                    padding: '22px',
                                    borderRadius: '16px',
                                    border: '1px solid #e2e8f0',
                                    borderTop: '3.5px solid #e11d48',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '14px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ background: '#ffe4e6', color: '#be123c', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
                                            LOW MATCH
                                        </span>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#be123c' }}>
                                            &lt; {settings.min_medium_match_score}%
                                        </span>
                                    </div>

                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>Unqualified</h4>
                                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px', marginBottom: 0, lineHeight: '1.45' }}>
                                            Applicants failing minimum experience or qualification limits are flagged with a low match badge.
                                        </p>
                                    </div>

                                    <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #f1f5f9', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>
                                        Auto-calculated from Medium threshold.
                                    </div>
                                </div>

                            </div>

                            {/* VISUAL THRESHOLD GAUGE BAR */}
                            <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h5 style={{ margin: 0, fontSize: '0.82rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase' }}>
                                        Match Score Distribution Map
                                    </h5>
                                </div>
                                <div style={{ height: '10px', width: '100%', background: '#e2e8f0', borderRadius: '20px', overflow: 'hidden', display: 'flex' }}>
                                    <div style={{ width: `${settings.min_medium_match_score}%`, background: '#f43f5e', transition: 'all 0.3s' }} title={`Low Match: 0% - ${parseInt(settings.min_medium_match_score) - 1}%`}></div>
                                    <div style={{ width: `${parseInt(settings.min_high_match_score) - parseInt(settings.min_medium_match_score)}%`, background: '#f59e0b', transition: 'all 0.3s' }} title={`Medium Match: ${settings.min_medium_match_score}% - ${parseInt(settings.min_high_match_score) - 1}%`}></div>
                                    <div style={{ width: `${100 - parseInt(settings.min_high_match_score)}%`, background: '#22c55e', transition: 'all 0.3s' }} title={`High Match: ${settings.min_high_match_score}% - 100%`}></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginTop: '6px' }}>
                                    <span>0%</span>
                                    <span>{settings.min_medium_match_score}%</span>
                                    <span>{settings.min_high_match_score}%</span>
                                    <span>100%</span>
                                </div>
                            </div>

                            {/* ALGORITHM WEIGHTING CARD */}
                            {(() => {
                                const totalWeights = (parseInt(settings.weight_skills, 10) || 0) +
                                                     (parseInt(settings.weight_experience, 10) || 0) +
                                                     (parseInt(settings.weight_qualification, 10) || 0) +
                                                     (parseInt(settings.weight_jd_alignment, 10) || 0) +
                                                     (parseInt(settings.weight_salary, 10) || 0);
                                const isWeightValid = totalWeights === 100;

                                return (
                                    <div style={{
                                        background: '#ffffff',
                                        padding: '24px',
                                        borderRadius: '16px',
                                        border: isWeightValid ? '1px solid #e2e8f0' : '1px solid #fca5a5',
                                        boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.03)',
                                        transition: 'border-color 0.2s ease'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
                                            <h4 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <FiSliders style={{ color: '#7A1228' }} /> Candidate Score Calculation Weights
                                            </h4>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {isEditing && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setSettings(prev => ({
                                                            ...prev,
                                                            weight_skills: 35,
                                                            weight_experience: 30,
                                                            weight_qualification: 20,
                                                            weight_jd_alignment: 10,
                                                            weight_salary: 5
                                                        }))}
                                                        style={{
                                                            background: '#f8fafc',
                                                            border: '1px solid #cbd5e1',
                                                            borderRadius: '8px',
                                                            padding: '4px 10px',
                                                            fontSize: '0.72rem',
                                                            fontWeight: 700,
                                                            color: '#475569',
                                                            cursor: 'pointer',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '4px'
                                                        }}
                                                        title="Reset weights to default 35%, 30%, 20%, 10%, 5%"
                                                    >
                                                        <FiRefreshCw style={{ fontSize: '0.72rem' }} /> Reset Defaults
                                                    </button>
                                                )}
                                                <span style={{
                                                    background: isWeightValid ? 'rgba(22, 163, 74, 0.08)' : 'rgba(225, 29, 72, 0.1)',
                                                    color: isWeightValid ? '#15803d' : '#be123c',
                                                    fontSize: '0.74rem',
                                                    fontWeight: 800,
                                                    padding: '3px 12px',
                                                    borderRadius: '12px',
                                                    border: isWeightValid ? '1px solid rgba(22, 163, 74, 0.25)' : '1px solid rgba(225, 29, 72, 0.25)',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px'
                                                }}>
                                                    {isWeightValid ? (
                                                        <>
                                                            <FiCheckCircle style={{ fontSize: '0.8rem' }} /> TOTAL ALLOCATION: 100%
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FiAlertTriangle style={{ fontSize: '0.8rem' }} /> TOTAL ALLOCATION: {totalWeights}% (MUST BE 100%)
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.45' }}>
                                            Composite candidate match scores (0 – 100%) are evaluated dynamically by AI across the following 5 weighted recruitment dimensions:
                                        </p>

                                        {/* Validation Alert when total != 100% in edit mode */}
                                        {isEditing && !isWeightValid && (
                                            <div style={{
                                                background: '#fff1f2',
                                                border: '1px solid #fecdd3',
                                                borderRadius: '10px',
                                                padding: '10px 14px',
                                                marginBottom: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                fontSize: '0.8rem',
                                                color: '#be123c',
                                                fontWeight: 600
                                            }}>
                                                <FiAlertTriangle style={{ fontSize: '1rem', flexShrink: 0 }} />
                                                <span>
                                                    Total weights must equal exactly 100%. Currently allocated: <strong>{totalWeights}%</strong> ({100 - totalWeights > 0 ? `${100 - totalWeights}% remaining to allocate` : `${totalWeights - 100}% over allocated`}).
                                                </span>
                                            </div>
                                        )}

                                        {/* Dynamic Composite Visual Bar */}
                                        <div style={{ height: '8px', width: '100%', background: '#e2e8f0', borderRadius: '20px', overflow: 'hidden', display: 'flex', marginBottom: '20px' }}>
                                            <div style={{ width: `${Math.max(0, settings.weight_skills || 0)}%`, background: '#7A1228', transition: 'width 0.2s ease' }} title={`Skills Match: ${settings.weight_skills}%`}></div>
                                            <div style={{ width: `${Math.max(0, settings.weight_experience || 0)}%`, background: '#0f172a', transition: 'width 0.2s ease' }} title={`Relevant Experience: ${settings.weight_experience}%`}></div>
                                            <div style={{ width: `${Math.max(0, settings.weight_qualification || 0)}%`, background: '#4f46e5', transition: 'width 0.2s ease' }} title={`Qualifications: ${settings.weight_qualification}%`}></div>
                                            <div style={{ width: `${Math.max(0, settings.weight_jd_alignment || 0)}%`, background: '#d97706', transition: 'width 0.2s ease' }} title={`Job Description Alignment: ${settings.weight_jd_alignment}%`}></div>
                                            <div style={{ width: `${Math.max(0, settings.weight_salary || 0)}%`, background: '#16a34a', transition: 'width 0.2s ease' }} title={`Salary Budget Alignment: ${settings.weight_salary}%`}></div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px' }}>
                                            
                                            {/* Metric 1: Skills Overlap */}
                                            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        🎯 Skills Match
                                                    </span>
                                                    <span style={{ background: '#7A1228', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 9px', borderRadius: '10px' }}>
                                                        {settings.weight_skills}%
                                                    </span>
                                                </div>
                                                <div style={{ height: '4px', width: '100%', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, settings.weight_skills || 0))}%`, background: '#7A1228', transition: 'width 0.2s' }}></div>
                                                </div>
                                                <span style={{ fontSize: '0.76rem', color: '#64748b', lineHeight: '1.4' }}>
                                                    Overlap of candidate skills against mandatory &amp; optional vacancy criteria.
                                                </span>
                                                {isEditing && (
                                                    <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                                            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#7A1228' }}>Weight</label>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    max="100"
                                                                    value={settings.weight_skills}
                                                                    onChange={(e) => setSettings(prev => ({ ...prev, weight_skills: Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0)) }))}
                                                                    style={{
                                                                        width: '48px',
                                                                        padding: '2px 4px',
                                                                        fontSize: '0.78rem',
                                                                        fontWeight: 800,
                                                                        textAlign: 'center',
                                                                        borderRadius: '6px',
                                                                        border: '1px solid #cbd5e1',
                                                                        color: '#7A1228'
                                                                    }}
                                                                />
                                                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>%</span>
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            step="1"
                                                            value={settings.weight_skills}
                                                            onChange={(e) => setSettings(prev => ({ ...prev, weight_skills: parseInt(e.target.value, 10) || 0 }))}
                                                            style={{ width: '100%', accentColor: '#7A1228', cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Metric 2: Experience */}
                                            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        💼 Experience
                                                    </span>
                                                    <span style={{ background: '#0f172a', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 9px', borderRadius: '10px' }}>
                                                        {settings.weight_experience}%
                                                    </span>
                                                </div>
                                                <div style={{ height: '4px', width: '100%', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, settings.weight_experience || 0))}%`, background: '#0f172a', transition: 'width 0.2s' }}></div>
                                                </div>
                                                <span style={{ fontSize: '0.76rem', color: '#64748b', lineHeight: '1.4' }}>
                                                    Relevant domain work history years vs minimum position requirements.
                                                </span>
                                                {isEditing && (
                                                    <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                                            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0f172a' }}>Weight</label>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    max="100"
                                                                    value={settings.weight_experience}
                                                                    onChange={(e) => setSettings(prev => ({ ...prev, weight_experience: Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0)) }))}
                                                                    style={{
                                                                        width: '48px',
                                                                        padding: '2px 4px',
                                                                        fontSize: '0.78rem',
                                                                        fontWeight: 800,
                                                                        textAlign: 'center',
                                                                        borderRadius: '6px',
                                                                        border: '1px solid #cbd5e1',
                                                                        color: '#0f172a'
                                                                    }}
                                                                />
                                                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>%</span>
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            step="1"
                                                            value={settings.weight_experience}
                                                            onChange={(e) => setSettings(prev => ({ ...prev, weight_experience: parseInt(e.target.value, 10) || 0 }))}
                                                            style={{ width: '100%', accentColor: '#0f172a', cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Metric 3: Qualifications */}
                                            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        🎓 Qualification
                                                    </span>
                                                    <span style={{ background: '#4f46e5', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 9px', borderRadius: '10px' }}>
                                                        {settings.weight_qualification}%
                                                    </span>
                                                </div>
                                                <div style={{ height: '4px', width: '100%', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, settings.weight_qualification || 0))}%`, background: '#4f46e5', transition: 'width 0.2s' }}></div>
                                                </div>
                                                <span style={{ fontSize: '0.76rem', color: '#64748b', lineHeight: '1.4' }}>
                                                    Degree level (Bachelors/Masters/PhD) &amp; relevant field specialization.
                                                </span>
                                                {isEditing && (
                                                    <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                                            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#4f46e5' }}>Weight</label>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    max="100"
                                                                    value={settings.weight_qualification}
                                                                    onChange={(e) => setSettings(prev => ({ ...prev, weight_qualification: Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0)) }))}
                                                                    style={{
                                                                        width: '48px',
                                                                        padding: '2px 4px',
                                                                        fontSize: '0.78rem',
                                                                        fontWeight: 800,
                                                                        textAlign: 'center',
                                                                        borderRadius: '6px',
                                                                        border: '1px solid #cbd5e1',
                                                                        color: '#4f46e5'
                                                                    }}
                                                                />
                                                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>%</span>
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            step="1"
                                                            value={settings.weight_qualification}
                                                            onChange={(e) => setSettings(prev => ({ ...prev, weight_qualification: parseInt(e.target.value, 10) || 0 }))}
                                                            style={{ width: '100%', accentColor: '#4f46e5', cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Metric 4: Job Description Alignment */}
                                            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        📄 JD Alignment
                                                    </span>
                                                    <span style={{ background: '#d97706', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 9px', borderRadius: '10px' }}>
                                                        {settings.weight_jd_alignment}%
                                                    </span>
                                                </div>
                                                <div style={{ height: '4px', width: '100%', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, settings.weight_jd_alignment || 0))}%`, background: '#d97706', transition: 'width 0.2s' }}></div>
                                                </div>
                                                <span style={{ fontSize: '0.76rem', color: '#64748b', lineHeight: '1.4' }}>
                                                    Alignment of CV responsibilities with core role duties &amp; projects.
                                                </span>
                                                {isEditing && (
                                                    <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                                            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#d97706' }}>Weight</label>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    max="100"
                                                                    value={settings.weight_jd_alignment}
                                                                    onChange={(e) => setSettings(prev => ({ ...prev, weight_jd_alignment: Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0)) }))}
                                                                    style={{
                                                                        width: '48px',
                                                                        padding: '2px 4px',
                                                                        fontSize: '0.78rem',
                                                                        fontWeight: 800,
                                                                        textAlign: 'center',
                                                                        borderRadius: '6px',
                                                                        border: '1px solid #cbd5e1',
                                                                        color: '#d97706'
                                                                    }}
                                                                />
                                                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>%</span>
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            step="1"
                                                            value={settings.weight_jd_alignment}
                                                            onChange={(e) => setSettings(prev => ({ ...prev, weight_jd_alignment: parseInt(e.target.value, 10) || 0 }))}
                                                            style={{ width: '100%', accentColor: '#d97706', cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Metric 5: Salary Budget */}
                                            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        💵 Salary Budget
                                                    </span>
                                                    <span style={{ background: '#16a34a', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 9px', borderRadius: '10px' }}>
                                                        {settings.weight_salary}%
                                                    </span>
                                                </div>
                                                <div style={{ height: '4px', width: '100%', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, settings.weight_salary || 0))}%`, background: '#16a34a', transition: 'width 0.2s' }}></div>
                                                </div>
                                                <span style={{ fontSize: '0.76rem', color: '#64748b', lineHeight: '1.4' }}>
                                                    Candidate salary expectations vs allocated job vacancy budget range.
                                                </span>
                                                {isEditing && (
                                                    <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                                            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#16a34a' }}>Weight</label>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    max="100"
                                                                    value={settings.weight_salary}
                                                                    onChange={(e) => setSettings(prev => ({ ...prev, weight_salary: Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0)) }))}
                                                                    style={{
                                                                        width: '48px',
                                                                        padding: '2px 4px',
                                                                        fontSize: '0.78rem',
                                                                        fontWeight: 800,
                                                                        textAlign: 'center',
                                                                        borderRadius: '6px',
                                                                        border: '1px solid #cbd5e1',
                                                                        color: '#16a34a'
                                                                    }}
                                                                />
                                                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>%</span>
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            step="1"
                                                            value={settings.weight_salary}
                                                            onChange={(e) => setSettings(prev => ({ ...prev, weight_salary: parseInt(e.target.value, 10) || 0 }))}
                                                            style={{ width: '100%', accentColor: '#16a34a', cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                );
                            })()}

                            {/* OVERALL SCORE CALCULATION FORMULA & ENGINE CARD */}
                            <div style={{
                                background: '#ffffff',
                                padding: '24px',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.03)'
                            }}>
                                <h4 style={{ margin: '0 0 6px 0', fontSize: '1.02rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FiZap style={{ color: '#7A1228' }} /> Overall Score Formula &amp; Generation Pipeline
                                </h4>
                                <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.45' }}>
                                    How final candidate match scores (12% – 100%) are synthesized, weighted, and calculated dynamically by the system:
                                </p>

                                {/* MATHEMATICAL FORMULA BANNER */}
                                <div style={{
                                    background: '#0f172a',
                                    color: '#f8fafc',
                                    borderRadius: '14px',
                                    padding: '16px 20px',
                                    marginBottom: '16px',
                                    fontFamily: 'monospace',
                                    fontSize: '0.84rem',
                                    lineHeight: '1.6',
                                    borderLeft: '4px solid #7A1228',
                                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
                                }}>
                                    <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.04em' }}>
                                        🧮 SYSTEM OVERALL SCORE FORMULA (DYNAMIC WEIGHTS)
                                    </div>
                                    <div style={{ color: '#38bdf8', fontWeight: 700, wordBreak: 'break-word' }}>
                                        Overall Score = <span style={{ color: '#f43f5e' }}>(Skills Match × {settings.weight_skills}%)</span> + <span style={{ color: '#fbbf24' }}>(Experience × {settings.weight_experience}%)</span> + <span style={{ color: '#818cf8' }}>(Qualification × {settings.weight_qualification}%)</span> + <span style={{ color: '#fb923c' }}>(JD Alignment × {settings.weight_jd_alignment}%)</span> + <span style={{ color: '#4ade80' }}>(Salary Budget × {settings.weight_salary}%)</span>
                                    </div>
                                </div>

                                {/* DUAL EVALUATION PIPELINES */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                                    
                                    {/* Pipeline 1: Cloud Gemini AI */}
                                    <div style={{ background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                            <span style={{ background: 'rgba(122, 18, 40, 0.1)', color: '#7A1228', padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>
                                                PRIMARY ENGINE
                                            </span>
                                            <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>Cloud Gemini AI Generation</strong>
                                        </div>
                                        <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0, lineHeight: '1.45' }}>
                                            Performs deep semantic LLM analysis across full CV text, comparing candidate domain background against vacancy duties, identifying penalizable domain mismatches, and returning a normalized 0-100% composite score.
                                        </p>
                                    </div>

                                    {/* Pipeline 2: Rule-Based Fallback */}
                                    <div style={{ background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                            <span style={{ background: '#e2e8f0', color: '#475569', padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>
                                                FALLBACK ENGINE
                                            </span>
                                            <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>Algorithmic Rule Calculation</strong>
                                        </div>
                                        <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0, lineHeight: '1.45' }}>
                                            Calculates ratio of extracted mandatory skills, applies a 75% heavy weight on relevant work history, evaluates qualification field alignment factor (0.25 - 1.0), and computes salary expectation fit.
                                        </p>
                                    </div>

                                </div>

                                {/* DOMAIN MISMATCH & CLAMPING RULES */}
                                <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.76rem', color: '#64748b' }}>
                                    <div>
                                        <strong>⚠️ Domain Mismatch Guard:</strong> Candidates applying outside their primary domain (e.g., HR applying for IT) automatically receive a domain conflict penalty.
                                    </div>
                                    <div>
                                        <strong>🔒 Clamping Limits:</strong> All composite scores are normalized between a minimum floor of <strong>12%</strong> and a maximum of <strong>100%</strong>.
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* ========================================================= */}
                    {/* TAB 2: MAIL & SMTP                                       */}
                    {/* ========================================================= */}
                    {activeTab === 'mail' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            
                            {/* ACTIVE SENDER CARD */}
                            <div style={{
                                background: '#ffffff',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                padding: '20px 24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: '16px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <div style={{
                                        width: '42px', height: '42px', borderRadius: '12px',
                                        background: '#fffbeb', color: '#d97706',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.25rem', border: '1px solid #fde68a'
                                    }}>
                                        <FiMail />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
                                            Active System Sender Address
                                        </span>
                                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                                            {settings.system_email || settings.smtp_user || settings.default_email}
                                        </h3>
                                    </div>
                                </div>

                                <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 800, padding: '4px 12px', borderRadius: '20px', border: '1px solid #bbf7d0' }}>
                                    ✓ SMTP Active
                                </span>
                            </div>

                            {/* SMTP CONFIGURATION FORM CARD */}
                            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
                                <h3 style={{ fontSize: '1.05rem', margin: '0 0 4px 0', color: '#0f172a', fontWeight: 800 }}>
                                    SMTP Mail Server Credentials
                                </h3>
                                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 20px 0' }}>
                                    Outbound mail server configuration for automated candidate invitations.
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                                    
                                    <div>
                                        <label htmlFor="system_email" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>
                                            Sender Email Address <span style={{ color: '#dc2626' }}>*</span>
                                        </label>
                                        <input
                                            id="system_email"
                                            name="system_email"
                                            type="email"
                                            value={settings.system_email}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="careers@company.com"
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.9rem' }}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="smtp_from_name" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>
                                            Sender Display Name
                                        </label>
                                        <input
                                            id="smtp_from_name"
                                            name="smtp_from_name"
                                            type="text"
                                            value={settings.smtp_from_name}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="GS Careers HR Team"
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.9rem' }}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="smtp_host" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>
                                            SMTP Host Server
                                        </label>
                                        <input
                                            id="smtp_host"
                                            name="smtp_host"
                                            type="text"
                                            value={settings.smtp_host}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="smtp.office365.com"
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.9rem' }}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="smtp_port" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>
                                            SMTP Port
                                        </label>
                                        <input
                                            id="smtp_port"
                                            name="smtp_port"
                                            type="text"
                                            value={settings.smtp_port}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="587"
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.9rem' }}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="smtp_secure" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>
                                            Security Encryption
                                        </label>
                                        <select
                                            id="smtp_secure"
                                            name="smtp_secure"
                                            value={settings.smtp_secure}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.9rem' }}
                                        >
                                            <option value="tls">TLS (STARTTLS - Recommended)</option>
                                            <option value="ssl">SSL (Implicit SSL)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="smtp_user" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>
                                            SMTP Account Username
                                        </label>
                                        <input
                                            id="smtp_user"
                                            name="smtp_user"
                                            type="text"
                                            value={settings.smtp_user}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="user@domain.com"
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.9rem' }}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="smtp_pass" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>
                                            SMTP Account Password
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                id="smtp_pass"
                                                name="smtp_pass"
                                                type={showPassword ? 'text' : 'password'}
                                                value={settings.smtp_pass}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                placeholder="••••••••"
                                                style={{ width: '100%', padding: '10px 42px 10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.9rem' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={!isEditing}
                                                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}
                                            >
                                                {showPassword ? <FiEyeOff /> : <FiEye />}
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                        <div>
                                            <strong style={{ display: 'block', fontSize: '0.86rem', color: '#0f172a' }}>Automated Candidate Emails</strong>
                                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Send confirmation &amp; invite emails</span>
                                        </div>
                                        <input
                                            type="checkbox"
                                            id="enable_candidate_emails"
                                            name="enable_candidate_emails"
                                            checked={settings.enable_candidate_emails == '1'}
                                            onChange={(e) => setSettings(prev => ({ ...prev, enable_candidate_emails: e.target.checked ? '1' : '0' }))}
                                            disabled={!isEditing}
                                            style={{ width: '18px', height: '18px', accentColor: '#7A1228', cursor: isEditing ? 'pointer' : 'default' }}
                                        />
                                    </div>

                                </div>
                            </div>

                            {/* DIAGNOSTICS TEST DRAWER */}
                            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
                                <h3 style={{ fontSize: '1.05rem', margin: '0 0 4px 0', color: '#0f172a', fontWeight: 800 }}>
                                    Live SMTP Diagnostic Tester
                                </h3>
                                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 16px 0' }}>
                                    Send a live test email to verify server connection and credentials.
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'flex-end' }}>
                                    <div style={{ flex: 1, minWidth: '260px' }}>
                                        <label htmlFor="test_recipient" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>
                                            Recipient Email Address
                                        </label>
                                        <input
                                            id="test_recipient"
                                            name="test_recipient"
                                            type="email"
                                            value={testRecipient}
                                            onChange={(e) => setTestRecipient(e.target.value)}
                                            placeholder="test@example.com"
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '0.9rem' }}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleTestSmtp}
                                        disabled={testing}
                                        style={{
                                            padding: '10px 20px',
                                            borderRadius: '10px',
                                            fontWeight: 700,
                                            fontSize: '0.88rem',
                                            border: 'none',
                                            background: '#7A1228',
                                            color: '#ffffff',
                                            cursor: testing ? 'not-allowed' : 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            height: '42px',
                                            boxShadow: '0 2px 8px rgba(122, 18, 40, 0.2)'
                                        }}
                                    >
                                        {testing ? 'Testing...' : <><FiPlay /> Run Diagnostic Test</>}
                                    </button>
                                </div>

                                {testResult && (
                                    <div style={{
                                        border: `1px solid ${testResult.success ? '#bbf7d0' : '#fecaca'}`,
                                        background: testResult.success ? '#f0fdf4' : '#fef2f2',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        marginTop: '16px'
                                    }}>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            {testResult.success ? (
                                                <FiCheckCircle style={{ color: '#16a34a', fontSize: '1.3rem', flexShrink: 0 }} />
                                            ) : (
                                                <FiAlertTriangle style={{ color: '#dc2626', fontSize: '1.3rem', flexShrink: 0 }} />
                                            )}
                                            <div style={{ flex: 1 }}>
                                                <strong style={{ fontSize: '0.88rem', color: testResult.success ? '#15803d' : '#991b1b' }}>
                                                    {testResult.success ? 'SMTP Connection Successful!' : 'SMTP Connection Failed'}
                                                </strong>
                                                <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: testResult.success ? '#166534' : '#7f1d1d' }}>
                                                    {testResult.message}
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: `1px solid ${testResult.success ? '#dcfce7' : '#fee2e2'}` }}>
                                            <button
                                                type="button"
                                                onClick={() => setShowDebug(!showDebug)}
                                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: testResult.success ? '#166534' : '#7f1d1d', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                                            >
                                                {showDebug ? <><FiChevronUp /> Hide Diagnostic Logs</> : <><FiChevronDown /> Show Diagnostic Logs</>}
                                            </button>

                                            {showDebug && (
                                                <pre style={{ marginTop: '10px', padding: '12px', background: '#0f172a', color: '#38bdf8', borderRadius: '10px', fontSize: '0.75rem', fontFamily: 'monospace', overflowX: 'auto', maxHeight: '240px', overflowY: 'auto' }}>
                                                    {testResult.debug}
                                                </pre>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    )}

                    {/* ========================================================= */}
                    {/* TAB 3: EMAIL TEMPLATES                                    */}
                    {/* ========================================================= */}
                    {isSuperAdmin && activeTab === 'email' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            
                            {/* SUB TAB SELECTOR */}
                            <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '12px', width: 'fit-content', border: '1px solid #e2e8f0' }}>
                                <button
                                    type="button"
                                    onClick={() => setActiveEmailSubTab('candidate')}
                                    style={{
                                        padding: '7px 16px',
                                        borderRadius: '8px',
                                        fontSize: '0.82rem',
                                        fontWeight: activeEmailSubTab === 'candidate' ? 700 : 600,
                                        border: 'none',
                                        background: activeEmailSubTab === 'candidate' ? '#ffffff' : 'transparent',
                                        color: activeEmailSubTab === 'candidate' ? '#7A1228' : '#64748b',
                                        cursor: 'pointer',
                                        boxShadow: activeEmailSubTab === 'candidate' ? '0 2px 6px rgba(0,0,0,0.04)' : 'none'
                                    }}
                                >
                                    Candidate Notifications
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveEmailSubTab('vacancy')}
                                    style={{
                                        padding: '7px 16px',
                                        borderRadius: '8px',
                                        fontSize: '0.82rem',
                                        fontWeight: activeEmailSubTab === 'vacancy' ? 700 : 600,
                                        border: 'none',
                                        background: activeEmailSubTab === 'vacancy' ? '#ffffff' : 'transparent',
                                        color: activeEmailSubTab === 'vacancy' ? '#7A1228' : '#64748b',
                                        cursor: 'pointer',
                                        boxShadow: activeEmailSubTab === 'vacancy' ? '0 2px 6px rgba(0,0,0,0.04)' : 'none'
                                    }}
                                >
                                    Vacancy Requisition Workflow Alerts
                                </button>
                            </div>

                            {/* CANDIDATE NOTIFICATIONS */}
                            {activeEmailSubTab === 'candidate' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    
                                    {/* Application Confirmation */}
                                    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                                            Application Confirmation Template
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Subject Line</label>
                                                <input
                                                    name="email_template_confirmation_subject"
                                                    type="text"
                                                    value={settings.email_template_confirmation_subject}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.88rem' }}
                                                />
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Email Body</label>
                                                    {isEditing && (
                                                        <div style={{ display: 'flex', gap: '4px' }}>
                                                            {['{candidate_name}', '{job_title}', '{company_name}'].map(tag => (
                                                                <button key={tag} type="button" onClick={() => insertTag('email_template_confirmation_body', tag)} style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer' }}>
                                                                    + {tag}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <textarea
                                                    name="email_template_confirmation_body"
                                                    rows="5"
                                                    value={settings.email_template_confirmation_body}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.84rem', fontFamily: 'monospace' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shortlist Template */}
                                    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800, color: '#15803d' }}>
                                            Shortlisted / Interview Invitation Template
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Subject Line</label>
                                                <input
                                                    name="email_template_shortlist_subject"
                                                    type="text"
                                                    value={settings.email_template_shortlist_subject}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.88rem' }}
                                                />
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Email Body</label>
                                                    {isEditing && (
                                                        <div style={{ display: 'flex', gap: '4px' }}>
                                                            {['{candidate_name}', '{job_title}', '{interview_date}', '{interview_time}'].map(tag => (
                                                                <button key={tag} type="button" onClick={() => insertTag('email_template_shortlist_body', tag)} style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer' }}>
                                                                    + {tag}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <textarea
                                                    name="email_template_shortlist_body"
                                                    rows="6"
                                                    value={settings.email_template_shortlist_body}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.84rem', fontFamily: 'monospace' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rejection Template */}
                                    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800, color: '#b91c1c' }}>
                                            Rejection Template
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Subject Line</label>
                                                <input
                                                    name="email_template_rejection_subject"
                                                    type="text"
                                                    value={settings.email_template_rejection_subject}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.88rem' }}
                                                />
                                            </div>
                                            <div>
                                                <textarea
                                                    name="email_template_rejection_body"
                                                    rows="5"
                                                    value={settings.email_template_rejection_body}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.84rem', fontFamily: 'monospace' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}

                            {/* VACANCY WORKFLOW ALERTS */}
                            {activeEmailSubTab === 'vacancy' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    
                                    {/* Vacancy Pending Approval */}
                                    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800, color: '#d97706' }}>
                                            Vacancy Requisition Pending Approval Alert
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <input
                                                name="email_template_vacancy_pending_subject"
                                                type="text"
                                                value={settings.email_template_vacancy_pending_subject}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.88rem' }}
                                            />
                                            <textarea
                                                name="email_template_vacancy_pending_body"
                                                rows="5"
                                                value={settings.email_template_vacancy_pending_body}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.84rem', fontFamily: 'monospace' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Vacancy Approved */}
                                    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800, color: '#16a34a' }}>
                                            Vacancy Requisition Approved &amp; Published Alert
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <input
                                                name="email_template_vacancy_approved_subject"
                                                type="text"
                                                value={settings.email_template_vacancy_approved_subject}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.88rem' }}
                                            />
                                            <textarea
                                                name="email_template_vacancy_approved_body"
                                                rows="5"
                                                value={settings.email_template_vacancy_approved_body}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.84rem', fontFamily: 'monospace' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Vacancy Rejected */}
                                    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800, color: '#dc2626' }}>
                                            Vacancy Requisition Returned for Revision Alert
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <input
                                                name="email_template_vacancy_rejected_subject"
                                                type="text"
                                                value={settings.email_template_vacancy_rejected_subject}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.88rem' }}
                                            />
                                            <textarea
                                                name="email_template_vacancy_rejected_body"
                                                rows="5"
                                                value={settings.email_template_vacancy_rejected_body}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.84rem', fontFamily: 'monospace' }}
                                            />
                                        </div>
                                    </div>

                                </div>
                            )}

                        </div>
                    )}

                    {/* ========================================================= */}
                    {/* TAB 4: PDPA DATA CONSENT                                  */}
                    {/* ========================================================= */}
                    {activeTab === 'pdpa' && (
                        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
                            <h3 style={{ fontSize: '1.05rem', margin: '0 0 4px 0', color: '#0f172a', fontWeight: 800 }}>
                                Personal Data Protection Act (PDPA) Consent Policies
                            </h3>
                            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 20px 0' }}>
                                Candidate data privacy statements and consent policy texts.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                                
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Policy Title</label>
                                    <input
                                        name="pdpa_title"
                                        type="text"
                                        value={settings.pdpa_title}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.9rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Overview Description</label>
                                    <input
                                        name="pdpa_description"
                                        type="text"
                                        value={settings.pdpa_description}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.9rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Purpose of Collection</label>
                                    <textarea
                                        name="pdpa_purpose"
                                        rows="4"
                                        value={settings.pdpa_purpose}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.85rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Data Retention Policy</label>
                                    <textarea
                                        name="pdpa_retention"
                                        rows="4"
                                        value={settings.pdpa_retention}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.85rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Data Security Protocols</label>
                                    <textarea
                                        name="pdpa_security"
                                        rows="4"
                                        value={settings.pdpa_security}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.85rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Candidate Statutory Rights</label>
                                    <textarea
                                        name="pdpa_rights"
                                        rows="4"
                                        value={settings.pdpa_rights}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.85rem' }}
                                    />
                                </div>

                            </div>
                        </div>
                    )}

                    {/* ========================================================= */}
                    {/* TAB 5: AI RESUME PARSER                                   */}
                    {/* ========================================================= */}
                    {isSuperAdmin && activeTab === 'ai' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            
                            {/* QUICK AI ENGINE SWITCHER */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: '#ffffff',
                                padding: '16px 20px',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0'
                            }}>
                                <div>
                                    <strong style={{ display: 'block', fontSize: '0.9rem', color: '#0f172a' }}>Active AI Resume Parser Engine</strong>
                                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                        Current engine: <strong>{settings.ai_provider === 'gemini' ? 'Google Gemini Cloud API' : 'Local Ollama Server'}</strong>
                                    </span>
                                </div>

                                <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '3px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                    <button
                                        type="button"
                                        onClick={() => handleQuickAiSwitch('gemini')}
                                        style={{
                                            padding: '6px 14px',
                                            borderRadius: '8px',
                                            fontSize: '0.8rem',
                                            fontWeight: 700,
                                            border: 'none',
                                            background: settings.ai_provider === 'gemini' ? '#ffffff' : 'transparent',
                                            color: settings.ai_provider === 'gemini' ? '#7A1228' : '#64748b',
                                            boxShadow: settings.ai_provider === 'gemini' ? '0 2px 6px rgba(0,0,0,0.04)' : 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ☁️ Gemini (Cloud)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleQuickAiSwitch('ollama')}
                                        style={{
                                            padding: '6px 14px',
                                            borderRadius: '8px',
                                            fontSize: '0.8rem',
                                            fontWeight: 700,
                                            border: 'none',
                                            background: settings.ai_provider === 'ollama' ? '#ffffff' : 'transparent',
                                            color: settings.ai_provider === 'ollama' ? '#7A1228' : '#64748b',
                                            boxShadow: settings.ai_provider === 'ollama' ? '0 2px 6px rgba(0,0,0,0.04)' : 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        💻 Ollama (Local)
                                    </button>
                                </div>
                            </div>

                            {/* DUAL ENGINE CONFIG CARDS */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                                
                                {/* 1. GOOGLE GEMINI CONFIG CARD */}
                                <div style={{
                                    background: '#ffffff',
                                    borderRadius: '16px',
                                    border: settings.ai_provider === 'gemini' ? '2px solid #7A1228' : '1px solid #e2e8f0',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Google Gemini Cloud Settings</h4>
                                        {settings.ai_provider === 'gemini' && (
                                            <span style={{ background: '#7A1228', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>LIVE ROUTING</span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="gemini_api_key" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>
                                            Google Gemini API Key
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                id="gemini_api_key"
                                                name="gemini_api_key"
                                                type={showPassword ? 'text' : 'password'}
                                                value={settings.gemini_api_key}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                placeholder="••••••••"
                                                style={{ width: '100%', padding: '10px 42px 10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.9rem' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={!isEditing}
                                                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}
                                            >
                                                {showPassword ? <FiEyeOff /> : <FiEye />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="gemini_model" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>
                                            Gemini Model Version
                                        </label>
                                        <select
                                            id="gemini_model"
                                            name="gemini_model"
                                            value={settings.gemini_model}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.9rem' }}
                                        >
                                            <option value="gemini-2.5-flash">gemini-2.5-flash (Recommended - Fast &amp; Accurate)</option>
                                            <option value="gemini-2.5-flash-lite">gemini-2.5-flash-lite (Fast &amp; light)</option>
                                            <option value="gemini-2.5-pro">gemini-2.5-pro (High quality reasoning)</option>
                                            <option value="gemini-2.0-flash">gemini-2.0-flash</option>
                                        </select>
                                    </div>

                                    {/* GEMINI QUOTA & TOKEN HEALTH MONITOR CARD */}
                                    <div style={{
                                        marginTop: '6px',
                                        padding: '16px',
                                        background: quotaData?.is_exhausted ? '#fef2f2' : (quotaData?.is_warning ? '#fffbeb' : '#f0fdf4'),
                                        borderRadius: '14px',
                                        border: `1px solid ${quotaData?.is_exhausted ? '#fecaca' : (quotaData?.is_warning ? '#fde68a' : '#bbf7d0')}`
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <FiActivity style={{ color: quotaData?.is_exhausted ? '#dc2626' : (quotaData?.is_warning ? '#d97706' : '#16a34a') }} />
                                                <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>Gemini Quota &amp; API Monitor</strong>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={handleCheckQuota}
                                                disabled={checkingQuota}
                                                style={{
                                                    padding: '5px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 700,
                                                    border: '1px solid #cbd5e1',
                                                    background: '#ffffff',
                                                    color: '#334155',
                                                    cursor: checkingQuota ? 'not-allowed' : 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}
                                            >
                                                <FiRefreshCw style={{ animation: checkingQuota ? 'spin 1s linear infinite' : 'none' }} />
                                                {checkingQuota ? 'Testing...' : 'Check Quota'}
                                            </button>
                                        </div>

                                        {quotaData ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                                                        <span>Daily Extractions Quota (Free Tier):</span>
                                                        <span style={{ color: quotaData.is_exhausted ? '#dc2626' : (quotaData.is_warning ? '#d97706' : '#16a34a') }}>
                                                            {quotaData.used_today} / {quotaData.daily_limit} Requests ({quotaData.percentage}%)
                                                        </span>
                                                    </div>
                                                    <div style={{ height: '8px', width: '100%', background: '#e2e8f0', borderRadius: '20px', overflow: 'hidden' }}>
                                                        <div style={{
                                                            height: '100%',
                                                            width: `${Math.max(4, quotaData.percentage)}%`,
                                                            background: quotaData.is_exhausted ? '#dc2626' : (quotaData.is_warning ? '#d97706' : '#16a34a'),
                                                            borderRadius: '20px'
                                                        }}></div>
                                                    </div>
                                                </div>

                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                                    <div style={{ background: '#ffffff', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                                                        <span style={{ display: 'block', fontSize: '0.62rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Key Health</span>
                                                        <span style={{ display: 'block', marginTop: '2px', fontSize: '0.75rem', fontWeight: 800, color: quotaData.status === 'healthy' ? '#16a34a' : '#dc2626' }}>
                                                            {quotaData.status === 'healthy' ? '🟢 Active' : '🔴 429 Limit'}
                                                        </span>
                                                    </div>
                                                    <div style={{ background: '#ffffff', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                                                        <span style={{ display: 'block', fontSize: '0.62rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Remaining</span>
                                                        <span style={{ display: 'block', marginTop: '2px', fontSize: '0.78rem', fontWeight: 800, color: '#1e293b' }}>
                                                            {quotaData.remaining_today} reqs
                                                        </span>
                                                    </div>
                                                    <div style={{ background: '#ffffff', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                                                        <span style={{ display: 'block', fontSize: '0.62rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Daily Reset</span>
                                                        <span style={{ display: 'block', marginTop: '2px', fontSize: '0.78rem', fontWeight: 800, color: '#78350f' }}>
                                                            in {quotaData.reset_in}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
                                                Click "Check Quota" to test key health and daily request limits.
                                            </p>
                                        )}
                                    </div>

                                </div>

                                {/* 2. LOCAL OLLAMA CONFIG CARD */}
                                <div style={{
                                    background: '#ffffff',
                                    borderRadius: '16px',
                                    border: settings.ai_provider === 'ollama' ? '2px solid #7A1228' : '1px solid #e2e8f0',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Local Ollama Server Settings</h4>
                                        {settings.ai_provider === 'ollama' && (
                                            <span style={{ background: '#7A1228', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>LIVE ROUTING</span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="ollama_server" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>
                                            Ollama Server Base URL
                                        </label>
                                        <input
                                            id="ollama_server"
                                            name="ollama_server"
                                            type="text"
                                            value={settings.ollama_server}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="http://172.16.7.21:11434"
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.9rem' }}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="ollama_model" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>
                                            Ollama Model Name
                                        </label>
                                        <select
                                            id="ollama_model"
                                            name="ollama_model"
                                            value={settings.ollama_model}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: isEditing ? '#ffffff' : '#f8fafc', fontSize: '0.9rem' }}
                                        >
                                            <option value="qwen2.5:3b">qwen2.5:3b (Recommended - Fast &amp; Offline)</option>
                                            <option value="qwen2.5:7b">qwen2.5:7b (High Accuracy - Slower)</option>
                                        </select>
                                    </div>
                                </div>

                            </div>

                        </div>
                    )}

                </div>
            </form>
        </div>
    );
}

export default SettingsPage;
