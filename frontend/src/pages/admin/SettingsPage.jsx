import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
    FiSettings, FiMail, FiCheck, FiActivity, FiServer, 
    FiLock, FiUser, FiEye, FiEyeOff, FiPlay, FiInfo, 
    FiCheckCircle, FiXCircle, FiAlertTriangle, FiChevronDown, FiChevronUp,
    FiEdit, FiX, FiFileText, FiCpu, FiTarget
} from 'react-icons/fi';
import { getSettings, saveSettings, testSmtpSettings } from '../../services/api';

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

    useEffect(() => {
        loadSettings();
    }, []);

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
                
                default_email: data.default_email || '',
                default_smtp_host: data.default_smtp_host || '',
                default_smtp_port: data.default_smtp_port || '',
                default_smtp_secure: data.default_smtp_secure || '',
                default_smtp_user: data.default_smtp_user || '',
                default_smtp_from_name: data.default_smtp_from_name || ''
            };
            setSettings(loaded);
            setBackupSettings(loaded);

            // Pre-populate test recipient
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
                system_email: settings.system_email,
                smtp_host: settings.smtp_host,
                smtp_port: settings.smtp_port,
                smtp_secure: settings.smtp_secure,
                smtp_user: settings.smtp_user,
                smtp_pass: settings.smtp_pass,
                smtp_from_name: settings.smtp_from_name,
                enable_candidate_emails: settings.enable_candidate_emails,
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
                ai_provider: provider,
                gemini_api_key: settings.gemini_api_key,
                gemini_model: settings.gemini_model,
                ollama_server: settings.ollama_server,
                ollama_model: settings.ollama_model
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
        
        // Custom validation to prevent hidden tab validation blocks
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
            loadSettings(); // Reload to refresh the password mask state
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

    if (loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <div className="spinner-p"></div>
                <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>Loading system configurations...</p>
            </div>
        );
    }

    return (
        <div className="premium-settings-page" style={{ maxWidth: '1050px', margin: '0 auto', animation: 'fadeIn 0.3s ease-out' }}>
            {/* MODERN SIMPLE PAGE HEADER */}
            <div style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '16px',
                background: '#fff',
                padding: '24px 28px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{
                            background: 'rgba(122, 18, 40, 0.08)',
                            color: '#7A1228',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            padding: '3px 10px',
                            borderRadius: '20px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            System Configurations
                        </span>
                    </div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0, tracking: '-0.02em' }}>
                        Portal Settings
                    </h1>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '4px 0 0 0' }}>
                        Configure match score thresholds, SMTP mail servers, email templates, and AI resume parser options.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    {!isEditing && (
                        <button
                            type="button"
                            onClick={handleStartEdit}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 20px',
                                borderRadius: '12px',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                border: 'none',
                                background: '#7A1228',
                                color: '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: '0 4px 12px rgba(122, 18, 40, 0.2)'
                            }}
                        >
                            <FiEdit /> Edit Settings
                        </button>
                    )}
                </div>
            </div>

            {/* SINGLE-ROW SEGMENTED PILL TAB NAVIGATION */}
            <div style={{
                background: '#f1f5f9',
                padding: '5px',
                borderRadius: '16px',
                display: 'flex',
                gap: '4px',
                marginBottom: '24px',
                overflowX: 'auto',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
            }}>
                <button
                    type="button"
                    onClick={() => setActiveTab('score')}
                    style={{
                        flex: 1,
                        padding: '10px 16px',
                        borderRadius: '12px',
                        fontWeight: activeTab === 'score' ? 800 : 600,
                        fontSize: '0.88rem',
                        border: 'none',
                        background: activeTab === 'score' ? '#fff' : 'transparent',
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
                        borderRadius: '12px',
                        fontWeight: activeTab === 'mail' ? 800 : 600,
                        fontSize: '0.88rem',
                        border: 'none',
                        background: activeTab === 'mail' ? '#fff' : 'transparent',
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
                <button
                    type="button"
                    onClick={() => setActiveTab('email')}
                    style={{
                        flex: 1,
                        padding: '10px 16px',
                        borderRadius: '12px',
                        fontWeight: activeTab === 'email' ? 800 : 600,
                        fontSize: '0.88rem',
                        border: 'none',
                        background: activeTab === 'email' ? '#fff' : 'transparent',
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
                <button
                    type="button"
                    onClick={() => setActiveTab('pdpa')}
                    style={{
                        flex: 1,
                        padding: '10px 16px',
                        borderRadius: '12px',
                        fontWeight: activeTab === 'pdpa' ? 800 : 600,
                        fontSize: '0.88rem',
                        border: 'none',
                        background: activeTab === 'pdpa' ? '#fff' : 'transparent',
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
                    <FiInfo style={{ fontSize: '1rem', color: activeTab === 'pdpa' ? '#7A1228' : '#94a3b8' }} />
                    PDPA Consent
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('ai')}
                    style={{
                        flex: 1,
                        padding: '10px 16px',
                        borderRadius: '12px',
                        fontWeight: activeTab === 'ai' ? 800 : 600,
                        fontSize: '0.88rem',
                        border: 'none',
                        background: activeTab === 'ai' ? '#fff' : 'transparent',
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
            </div>

            {activeTab === 'mail' && (
                /* Active Mail Status Card */
                <div className="stat-glass-card gold settings-sender-card" style={{
                    marginBottom: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    background: '#fffbeb',
                    border: '1px solid #fef3c7',
                    borderRadius: '16px',
                    padding: '24px 20px',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: '#fef3c7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem',
                        color: '#d97706',
                        flexShrink: 0
                    }}>
                        <FiMail style={{ display: 'block', margin: '0 auto' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active System Sender Address</span>
                        <span style={{ display: 'block', fontSize: '1.3rem', fontWeight: 800, color: '#78350f', marginTop: '4px', wordBreak: 'break-all' }}>
                            {settings.system_email || settings.smtp_user || settings.default_email}
                        </span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {activeTab === 'score' && (
                        <div className="card-p" style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                            <div className="orchestration-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9', background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: '#7A1228', fontWeight: 800 }}>
                                        <FiTarget style={{ color: '#7A1228', fontSize: '1.35rem' }} /> CV Match Score &amp; Extraction Thresholds
                                    </h3>
                                    <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '6px', marginBottom: 0, lineHeight: '1.5' }}>
                                        Configure score percentage boundaries for High, Medium, and Low match badges, as well as automatic vs. manual extraction limits.
                                    </p>
                                </div>
                            </div>

                            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {!isEditing ? (
                                    /* READ-ONLY 3 CARDS VIEW */
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
                                        {/* 1. High Match Read-only Card */}
                                        <div style={{
                                            background: '#f0fdf4',
                                            padding: '24px',
                                            borderRadius: '20px',
                                            border: '1.5px solid #bbf7d0',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '16px',
                                            boxShadow: '0 4px 16px rgba(22, 163, 74, 0.04)',
                                            transition: 'all 0.2s ease'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.98rem', color: '#15803d' }}>
                                                    <span style={{ fontSize: '0.9rem' }}>🟢</span> High Match Badge
                                                </div>
                                                <div style={{
                                                    background: '#ffffff',
                                                    border: '1.5px solid #bbf7d0',
                                                    borderRadius: '14px',
                                                    padding: '6px 16px',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 900,
                                                    color: '#15803d',
                                                    boxShadow: '0 2px 8px rgba(22, 163, 74, 0.08)'
                                                }}>
                                                    ≥ {settings.min_high_match_score || 75}%
                                                </div>
                                            </div>

                                            <div>
                                                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#15803d', marginBottom: '6px' }}>
                                                    Active Range: <span style={{ fontWeight: 900 }}>{settings.min_high_match_score || 75}% – 100%</span>
                                                </div>
                                                <p style={{ fontSize: '0.83rem', color: '#166534', margin: 0, lineHeight: '1.5', opacity: 0.9 }}>
                                                    Candidates scoring {settings.min_high_match_score || 75}% or higher receive top-priority Green High Match badge.
                                                </p>
                                            </div>
                                        </div>

                                        {/* 2. Medium Match Read-only Card */}
                                        <div style={{
                                            background: '#fffbeb',
                                            padding: '24px',
                                            borderRadius: '20px',
                                            border: '1.5px solid #fde68a',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '16px',
                                            boxShadow: '0 4px 16px rgba(217, 119, 6, 0.04)',
                                            transition: 'all 0.2s ease'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.98rem', color: '#b45309' }}>
                                                    <span style={{ fontSize: '0.9rem' }}>🟡</span> Medium Match (Auto Extract)
                                                </div>
                                                <div style={{
                                                    background: '#ffffff',
                                                    border: '1.5px solid #fde68a',
                                                    borderRadius: '14px',
                                                    padding: '6px 16px',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 900,
                                                    color: '#b45309',
                                                    boxShadow: '0 2px 8px rgba(217, 119, 6, 0.08)'
                                                }}>
                                                    ≥ {settings.min_medium_match_score || 50}%
                                                </div>
                                            </div>

                                            <div>
                                                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#b45309', marginBottom: '6px' }}>
                                                    Active Range: <span style={{ fontWeight: 900 }}>{settings.min_medium_match_score || 50}% – {(parseInt(settings.min_high_match_score || 75) - 1)}%</span>
                                                </div>
                                                <p style={{ fontSize: '0.83rem', color: '#92400e', margin: 0, lineHeight: '1.5', opacity: 0.9 }}>
                                                    Resumes scoring in this range are automatically extracted by system.
                                                </p>
                                            </div>
                                        </div>

                                        {/* 3. Low Match Read-only Card */}
                                        <div style={{
                                            background: '#fff1f2',
                                            padding: '24px',
                                            borderRadius: '20px',
                                            border: '1.5px solid #fecdd3',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '16px',
                                            boxShadow: '0 4px 16px rgba(220, 38, 38, 0.04)',
                                            transition: 'all 0.2s ease'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.98rem', color: '#b91c1c' }}>
                                                    <span style={{ fontSize: '0.9rem' }}>🔴</span> Low Match (Manual Extract)
                                                </div>
                                                <div style={{
                                                    background: '#ffffff',
                                                    border: '1.5px solid #fecdd3',
                                                    borderRadius: '14px',
                                                    padding: '6px 16px',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 900,
                                                    color: '#b91c1c',
                                                    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.08)'
                                                }}>
                                                    &lt; {settings.min_medium_match_score || 50}%
                                                </div>
                                            </div>

                                            <div>
                                                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#b91c1c', marginBottom: '6px' }}>
                                                    Active Range: <span style={{ fontWeight: 900 }}>&lt; {settings.min_medium_match_score || 50}%</span>
                                                </div>
                                                <p style={{ fontSize: '0.83rem', color: '#991b1b', margin: 0, lineHeight: '1.5', opacity: 0.9 }}>
                                                    Scores below {settings.min_medium_match_score || 50}% skip auto-extraction. Admins can manually extract them on demand.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* EDITABLE 3 CARDS VIEW WITH SLIDERS AND NUMBER INPUTS */
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
                                        {/* 1. High Match Edit Card */}
                                        <div style={{
                                            background: '#f0fdf4',
                                            padding: '24px',
                                            borderRadius: '20px',
                                            border: '1.5px solid #bbf7d0',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '16px',
                                            boxShadow: '0 4px 16px rgba(22, 163, 74, 0.04)'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label htmlFor="min_high_match_score" style={{ fontWeight: 800, fontSize: '0.98rem', color: '#15803d', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                    <span>🟢</span> High Match Minimum (%)
                                                </label>
                                                <div style={{
                                                    background: '#ffffff',
                                                    border: '1.5px solid #86efac',
                                                    borderRadius: '14px',
                                                    padding: '4px 12px',
                                                    fontSize: '1.15rem',
                                                    fontWeight: 900,
                                                    color: '#15803d',
                                                    boxShadow: '0 2px 8px rgba(22, 163, 74, 0.08)'
                                                }}>
                                                    ≥ {settings.min_high_match_score || 75}%
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                <input
                                                    type="range"
                                                    min="50"
                                                    max="95"
                                                    value={settings.min_high_match_score || 75}
                                                    onChange={(e) => {
                                                        const val = Math.max(parseInt(e.target.value), parseInt(settings.min_medium_match_score || 50) + 1);
                                                        setSettings({ ...settings, min_high_match_score: val.toString() });
                                                    }}
                                                    style={{ flex: 1, accentColor: '#16a34a', cursor: 'pointer', height: '6px' }}
                                                />
                                                <input
                                                    id="min_high_match_score"
                                                    name="min_high_match_score"
                                                    type="number"
                                                    min="1"
                                                    max="100"
                                                    value={settings.min_high_match_score}
                                                    onChange={handleChange}
                                                    style={{
                                                        width: '72px',
                                                        padding: '6px 10px',
                                                        borderRadius: '12px',
                                                        border: '2px solid #16a34a',
                                                        background: '#ffffff',
                                                        fontSize: '1rem',
                                                        fontWeight: '800',
                                                        textAlign: 'center',
                                                        color: '#15803d',
                                                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#15803d', marginBottom: '6px' }}>
                                                    Active Range: <span style={{ fontWeight: 900 }}>{settings.min_high_match_score || 75}% – 100%</span>
                                                </div>
                                                <p style={{ fontSize: '0.83rem', color: '#166534', margin: 0, lineHeight: '1.5', opacity: 0.9 }}>
                                                    Candidates scoring {settings.min_high_match_score || 75}% or higher receive top-priority Green High Match badge.
                                                </p>
                                            </div>
                                        </div>

                                        {/* 2. Medium Match Edit Card */}
                                        <div style={{
                                            background: '#fffbeb',
                                            padding: '24px',
                                            borderRadius: '20px',
                                            border: '1.5px solid #fde68a',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '16px',
                                            boxShadow: '0 4px 16px rgba(217, 119, 6, 0.04)'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label htmlFor="min_medium_match_score" style={{ fontWeight: 800, fontSize: '0.98rem', color: '#b45309', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                    <span>🟡</span> Medium Match Minimum (%)
                                                </label>
                                                <div style={{
                                                    background: '#ffffff',
                                                    border: '1.5px solid #fcd34d',
                                                    borderRadius: '14px',
                                                    padding: '4px 12px',
                                                    fontSize: '1.15rem',
                                                    fontWeight: 900,
                                                    color: '#b45309',
                                                    boxShadow: '0 2px 8px rgba(217, 119, 6, 0.08)'
                                                }}>
                                                    ≥ {settings.min_medium_match_score || 50}%
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                <input
                                                    type="range"
                                                    min="10"
                                                    max="90"
                                                    value={settings.min_medium_match_score || 50}
                                                    onChange={(e) => {
                                                        const val = Math.min(parseInt(e.target.value), parseInt(settings.min_high_match_score || 75) - 1);
                                                        setSettings({ ...settings, min_medium_match_score: val.toString() });
                                                    }}
                                                    style={{ flex: 1, accentColor: '#d97706', cursor: 'pointer', height: '6px' }}
                                                />
                                                <input
                                                    id="min_medium_match_score"
                                                    name="min_medium_match_score"
                                                    type="number"
                                                    min="1"
                                                    max="100"
                                                    value={settings.min_medium_match_score}
                                                    onChange={handleChange}
                                                    style={{
                                                        width: '72px',
                                                        padding: '6px 10px',
                                                        borderRadius: '12px',
                                                        border: '2px solid #d97706',
                                                        background: '#ffffff',
                                                        fontSize: '1rem',
                                                        fontWeight: '800',
                                                        textAlign: 'center',
                                                        color: '#b45309',
                                                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#b45309', marginBottom: '6px' }}>
                                                    Active Range: <span style={{ fontWeight: 900 }}>{settings.min_medium_match_score || 50}% – {(parseInt(settings.min_high_match_score || 75) - 1)}%</span>
                                                </div>
                                                <p style={{ fontSize: '0.83rem', color: '#92400e', margin: 0, lineHeight: '1.5', opacity: 0.9 }}>
                                                    Resumes scoring in this range are automatically extracted by system.
                                                </p>
                                            </div>
                                        </div>

                                        {/* 3. Low Match Edit Card */}
                                        <div style={{
                                            background: '#fff1f2',
                                            padding: '24px',
                                            borderRadius: '20px',
                                            border: '1.5px solid #fecdd3',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '16px',
                                            boxShadow: '0 4px 16px rgba(220, 38, 38, 0.04)'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label htmlFor="low_manual_extract_score" style={{ fontWeight: 800, fontSize: '0.98rem', color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                    <span>🔴</span> Low Match &amp; Manual Limit
                                                </label>
                                                <div style={{
                                                    background: '#ffffff',
                                                    border: '1.5px solid #fca5a5',
                                                    borderRadius: '14px',
                                                    padding: '4px 12px',
                                                    fontSize: '1.15rem',
                                                    fontWeight: 900,
                                                    color: '#b91c1c',
                                                    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.08)'
                                                }}>
                                                    &lt; {settings.min_medium_match_score || 50}%
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                <input
                                                    type="range"
                                                    min="10"
                                                    max="90"
                                                    value={settings.min_medium_match_score || 50}
                                                    onChange={(e) => {
                                                        const val = Math.min(parseInt(e.target.value), parseInt(settings.min_high_match_score || 75) - 1);
                                                        setSettings({ ...settings, min_medium_match_score: val.toString() });
                                                    }}
                                                    style={{ flex: 1, accentColor: '#dc2626', cursor: 'pointer', height: '6px' }}
                                                />
                                                <input
                                                    id="low_manual_extract_score"
                                                    type="number"
                                                    min="1"
                                                    max="100"
                                                    value={settings.min_medium_match_score}
                                                    onChange={(e) => {
                                                        setSettings({ ...settings, min_medium_match_score: e.target.value });
                                                    }}
                                                    style={{
                                                        width: '72px',
                                                        padding: '6px 10px',
                                                        borderRadius: '12px',
                                                        border: '2px solid #dc2626',
                                                        background: '#ffffff',
                                                        fontSize: '1rem',
                                                        fontWeight: '800',
                                                        textAlign: 'center',
                                                        color: '#b91c1c',
                                                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#b91c1c', marginBottom: '6px' }}>
                                                    Active Range: <span style={{ fontWeight: 900 }}>&lt; {settings.min_medium_match_score || 50}%</span>
                                                </div>
                                                <p style={{ fontSize: '0.83rem', color: '#991b1b', margin: 0, lineHeight: '1.5', opacity: 0.9 }}>
                                                    Scores below {settings.min_medium_match_score || 50}% skip auto-extraction. Admins can manually extract them on demand.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SCORING MODEL GUIDE & FORMULA EXPLANATION CARD */}
                                <div style={{
                                    marginTop: '12px',
                                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                    border: '1.5px solid #cbd5e1',
                                    borderRadius: '20px',
                                    padding: '24px',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(122, 18, 40, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7A1228', fontSize: '1.2rem', fontWeight: 800 }}>
                                            📊
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                                                AI Smart Candidate Match Scoring Model (100% Total)
                                            </h4>
                                            <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>
                                                Evaluates candidate CVs against ALL job creation details (Job Title, Designation, Relevant Exp, Salary Range, Description &amp; Skills)
                                            </p>
                                        </div>
                                    </div>

                                    {/* 4 Category Match Factor Cards Grid (100% Total) */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                                        {/* Factor 1: JD & Skills */}
                                        <div style={{ background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '14px', padding: '16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0369a1' }}>🎯 Job Description &amp; Skills</span>
                                                <span style={{ background: '#0284c7', color: '#fff', fontSize: '0.72rem', fontWeight: 900, padding: '2px 8px', borderRadius: '10px' }}>40% Weight</span>
                                            </div>
                                            <p style={{ fontSize: '0.78rem', color: '#0c4a6e', margin: 0, lineHeight: '1.4' }}>
                                                Evaluates Job Description keyphrases, mandatory &amp; preferred skills, and overall title/designation alignment.
                                            </p>
                                        </div>

                                        {/* Factor 2: Relevant Experience */}
                                        <div style={{ background: '#fdf4ff', border: '1.5px solid #f5d0fe', borderRadius: '14px', padding: '16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#7e22ce' }}>💼 Relevant Experience</span>
                                                <span style={{ background: '#a855f7', color: '#fff', fontSize: '0.72rem', fontWeight: 900, padding: '2px 8px', borderRadius: '10px' }}>30% Weight</span>
                                            </div>
                                            <p style={{ fontSize: '0.78rem', color: '#581c87', margin: 0, lineHeight: '1.4' }}>
                                                Compares candidate's relevant years of experience against the required job position experience.
                                            </p>
                                        </div>

                                        {/* Factor 3: Qualifications */}
                                        <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '14px', padding: '16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#15803d' }}>🎓 Field Qualifications</span>
                                                <span style={{ background: '#16a34a', color: '#fff', fontSize: '0.72rem', fontWeight: 900, padding: '2px 8px', borderRadius: '10px' }}>20% Weight</span>
                                            </div>
                                            <p style={{ fontSize: '0.78rem', color: '#14532d', margin: 0, lineHeight: '1.4' }}>
                                                Matches candidate highest education level &amp; field-relevant qualifications against job criteria.
                                            </p>
                                        </div>

                                        {/* Factor 4: Expected Salary */}
                                        <div style={{ background: '#fefce8', border: '1.5px solid #fef08a', borderRadius: '14px', padding: '16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#a16207' }}>💰 Expected Salary</span>
                                                <span style={{ background: '#ca8a04', color: '#fff', fontSize: '0.72rem', fontWeight: 900, padding: '2px 8px', borderRadius: '10px' }}>10% Weight</span>
                                            </div>
                                            <p style={{ fontSize: '0.78rem', color: '#713f12', margin: 0, lineHeight: '1.4' }}>
                                                Compares candidate expected salary against the job min/max salary budget range (100% if within budget).
                                            </p>
                                        </div>
                                    </div>

                                    {/* Job Creation Parameters Evaluated & Advanced Rules */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                                        {/* Evaluated Job Details List */}
                                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '14px' }}>
                                            <span style={{ fontWeight: 800, fontSize: '0.84rem', color: '#334155', display: 'block', marginBottom: '8px' }}>
                                                📋 Evaluated Pre-Extraction Categories
                                            </span>
                                            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.78rem', color: '#475569', lineHeight: '1.5' }}>
                                                <li><strong>Job Description &amp; Skills (40%):</strong> Keyphrase extraction &amp; skills match.</li>
                                                <li><strong>Relevant Experience (30%):</strong> Relevant industry &amp; job role years.</li>
                                                <li><strong>Relevant Field Qualifications (20%):</strong> Educational degree/diploma fit.</li>
                                                <li><strong>Salary Expectation (10%):</strong> Budget range compatibility.</li>
                                            </ul>
                                        </div>

                                        {/* Pre-Extraction Rules */}
                                        <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '14px', padding: '14px' }}>
                                            <span style={{ fontWeight: 800, fontSize: '0.84rem', color: '#9d174d', display: 'block', marginBottom: '8px' }}>
                                                ⚡ Automatic Calculation Pre-Extraction
                                            </span>
                                            <p style={{ margin: 0, fontSize: '0.78rem', color: '#831843', lineHeight: '1.5' }}>
                                                Calculated <strong>prior to full CV extraction</strong> using candidate application notes, resume text, and job posting parameters. If overall match is <strong>≥ 50%</strong>, full extraction is enabled automatically.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Formula Summary Box */}
                                    <div style={{ background: '#0f172a', borderRadius: '12px', padding: '14px 18px', color: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                                        <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                                            🧮 <span style={{ color: '#93c5fd' }}>Unified Overall Formula:</span> Score = (JD &amp; Skills × 0.40) + (Experience × 0.30) + (Qualification × 0.20) + (Salary × 0.10)
                                        </div>
                                        <div style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '8px', color: '#cbd5e1' }}>
                                            100% Pre-Extraction Evaluation
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'mail' && (
                        <>
                            {/* CARD 0: CANDIDATE AUTOMATED EMAIL DISPATCH TOGGLE */}
                            <div className="card-p" style={{
                                background: '#ffffff',
                                borderRadius: '24px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                                overflow: 'hidden',
                                marginBottom: '24px'
                            }}>
                                {/* Header */}
                                <div style={{
                                    padding: '24px 32px',
                                    borderBottom: '1px solid #f1f5f9',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '20px',
                                    background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '16px',
                                            background: (settings.enable_candidate_emails !== '0' && settings.enable_candidate_emails !== false)
                                                ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'
                                                : 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                                            border: (settings.enable_candidate_emails !== '0' && settings.enable_candidate_emails !== false)
                                                ? '1px solid #a7f3d0'
                                                : '1px solid #fecaca',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.35rem',
                                            color: (settings.enable_candidate_emails !== '0' && settings.enable_candidate_emails !== false) ? '#059669' : '#dc2626',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                            flexShrink: 0
                                        }}>
                                            <FiMail />
                                        </div>

                                        <div>
                                            <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#0f172a', fontWeight: 800, letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                Candidate Automated Email Dispatch
                                            </h3>
                                            <p style={{ fontSize: '0.86rem', color: '#64748b', marginTop: '4px', marginBottom: 0, lineHeight: '1.4' }}>
                                                Global master switch for candidate notifications (Application Receipts, Shortlist, Interview Invites &amp; Rejections)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action / Toggle Switch Container */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#f8fafc', padding: '8px 16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>DISPATCH STATUS</span>
                                            <span style={{
                                                fontSize: '0.86rem',
                                                fontWeight: 900,
                                                color: (settings.enable_candidate_emails !== '0' && settings.enable_candidate_emails !== false) ? '#059669' : '#dc2626',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}>
                                                <span style={{
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    background: (settings.enable_candidate_emails !== '0' && settings.enable_candidate_emails !== false) ? '#10b981' : '#ef4444',
                                                    boxShadow: (settings.enable_candidate_emails !== '0' && settings.enable_candidate_emails !== false) ? '0 0 0 3px rgba(16,185,129,0.2)' : '0 0 0 3px rgba(239,68,68,0.2)'
                                                }}></span>
                                                {(settings.enable_candidate_emails !== '0' && settings.enable_candidate_emails !== false) ? 'ENABLED (YES)' : 'DISABLED (NO)'}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            disabled={saving}
                                            onClick={async () => {
                                                const nextVal = (settings.enable_candidate_emails !== '0' && settings.enable_candidate_emails !== false) ? '0' : '1';
                                                try {
                                                    setSaving(true);
                                                    await saveSettings({
                                                        ...settings,
                                                        enable_candidate_emails: nextVal
                                                    });
                                                    setSettings(prev => ({ ...prev, enable_candidate_emails: nextVal }));
                                                    toast.success(`Candidate automated emails are now ${nextVal === '1' ? 'ENABLED (YES)' : 'DISABLED (NO)'}`);
                                                } catch (err) {
                                                    toast.error('Failed to update candidate email setting');
                                                } finally {
                                                    setSaving(false);
                                                }
                                            }}
                                            style={{
                                                background: (settings.enable_candidate_emails !== '0' && settings.enable_candidate_emails !== false)
                                                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                                    : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                                color: '#ffffff',
                                                border: 'none',
                                                padding: '9px 20px',
                                                borderRadius: '12px',
                                                fontWeight: 800,
                                                fontSize: '0.82rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                boxShadow: (settings.enable_candidate_emails !== '0' && settings.enable_candidate_emails !== false)
                                                    ? '0 4px 14px rgba(16, 185, 129, 0.25)'
                                                    : '0 4px 14px rgba(239, 68, 68, 0.25)',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            {(settings.enable_candidate_emails !== '0' && settings.enable_candidate_emails !== false) ? (
                                                <><span>Turn Off</span> <FiXCircle size={15} /></>
                                            ) : (
                                                <><span>Turn On</span> <FiCheckCircle size={15} /></>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Dynamic Status Detail Box */}
                                <div style={{ padding: '24px 32px' }}>
                                    {(settings.enable_candidate_emails !== '0' && settings.enable_candidate_emails !== false) ? (
                                        <div style={{
                                            background: '#f0fdf4',
                                            border: '1.5px solid #bbf7d0',
                                            borderRadius: '16px',
                                            padding: '20px 24px',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '16px'
                                        }}>
                                            <FiCheckCircle size={22} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                                            <div>
                                                <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#15803d' }}>
                                                    Automated Candidate Emails Active
                                                </h5>
                                                <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem', color: '#166534', lineHeight: '1.55' }}>
                                                    Applicants will receive real-time email notifications for:
                                                </p>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                                                    <span style={{ background: '#ffffff', color: '#15803d', border: '1px solid #86efac', padding: '4px 10px', borderRadius: '8px', fontSize: '0.76rem', fontWeight: 700 }}>
                                                        📩 Application Submission Receipts
                                                    </span>
                                                    <span style={{ background: '#ffffff', color: '#15803d', border: '1px solid #86efac', padding: '4px 10px', borderRadius: '8px', fontSize: '0.76rem', fontWeight: 700 }}>
                                                        📅 Interview Invitations &amp; Schedules
                                                    </span>
                                                    <span style={{ background: '#ffffff', color: '#15803d', border: '1px solid #86efac', padding: '4px 10px', borderRadius: '8px', fontSize: '0.76rem', fontWeight: 700 }}>
                                                        ✉️ RSVP Receipt Confirmations
                                                    </span>
                                                    <span style={{ background: '#ffffff', color: '#15803d', border: '1px solid #86efac', padding: '4px 10px', borderRadius: '8px', fontSize: '0.76rem', fontWeight: 700 }}>
                                                        📋 Application Status Updates
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{
                                            background: '#fef2f2',
                                            border: '1.5px solid #fecaca',
                                            borderRadius: '16px',
                                            padding: '20px 24px',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '16px'
                                        }}>
                                            <FiAlertTriangle size={22} style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
                                            <div>
                                                <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#991b1b' }}>
                                                    Automated Candidate Emails Paused (Mails Disabled)
                                                </h5>
                                                <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem', color: '#991b1b', lineHeight: '1.55' }}>
                                                    All outbound emails to applicants are currently suspended. Candidates will <strong>NOT</strong> receive application receipts, interview invites, or status change notifications until re-enabled.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CARD 1: SENDER IDENTITY */}
                    <div className="card-p" style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                        <div className="orchestration-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                            <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--crimson)' }}>
                                <FiMail /> Sender Identity Settings
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: 0 }}>
                                Configure default sender identity details visible to applicants in all notifications.
                            </p>
                        </div>
                        
                        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {!isEditing ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
                                    <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #f1f5f9' }}>
                                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sender Email Address</span>
                                        <span style={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <FiMail style={{ color: 'var(--crimson)' }} /> {settings.system_email || <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>{settings.default_email} (Default)</span>}
                                        </span>
                                    </div>

                                    <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #f1f5f9' }}>
                                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sender Display Name</span>
                                        <span style={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <FiUser style={{ color: 'var(--crimson)' }} /> {settings.smtp_from_name || <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>{settings.default_smtp_from_name || 'George Steuart Careers'} (Default)</span>}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
                                    <div className="form-group-p">
                                        <label htmlFor="system_email" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                            Sender Email Address <span style={{ color: 'var(--crimson)' }}>*</span>
                                        </label>
                                        <div className="input-with-icon" style={{ position: 'relative' }}>
                                            <FiMail className="i" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }} />
                                            <input
                                                id="system_email"
                                                name="system_email"
                                                type="email"
                                                value={settings.system_email}
                                                onChange={handleChange}
                                                placeholder={settings.default_email || "e.g. careers@georgesteuart.com"}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px 12px 48px',
                                                    borderRadius: '12px',
                                                    border: '1.5px solid #e2e8f0',
                                                    background: '#f8fafc',
                                                    fontSize: '0.95rem',
                                                    transition: 'all 0.3s'
                                                }}
                                                
                                            />
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.4' }}>
                                            💡 Target inbox displayed as the sender in incoming emails. <strong>Note:</strong> Changing this address alone is not enough; you must also configure the SMTP Username &amp; App Password in the Custom SMTP section below.
                                        </p>
                                    </div>

                                    <div className="form-group-p">
                                        <label htmlFor="smtp_from_name" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                            Sender Display Name
                                        </label>
                                        <div className="input-with-icon" style={{ position: 'relative' }}>
                                            <FiUser className="i" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }} />
                                            <input
                                                id="smtp_from_name"
                                                name="smtp_from_name"
                                                type="text"
                                                value={settings.smtp_from_name}
                                                onChange={handleChange}
                                                placeholder={settings.default_smtp_from_name || "e.g. George Steuart Careers"}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px 12px 48px',
                                                    borderRadius: '12px',
                                                    border: '1.5px solid #e2e8f0',
                                                    background: '#f8fafc',
                                                    fontSize: '0.95rem',
                                                    transition: 'all 0.3s'
                                                }}
                                            />
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.4' }}>
                                            💡 The human-readable name shown in the recipient's inbox.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CARD 2: SMTP SERVERS */}
                    <div className="card-p" style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                        <div className="orchestration-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                            <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--crimson)' }}>
                                <FiServer /> Custom SMTP Server Relay Settings
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: 0 }}>
                                Configure an external SMTP server (e.g. custom corporate relay or personal/business Google Workspace) to deliver mail securely.
                            </p>
                        </div>
                        
                        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {/* Alert explaining Fallbacks */}
                            <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <FiInfo style={{ color: 'var(--crimson)', fontSize: '1.25rem', flexShrink: 0, marginTop: '2px' }} />
                                <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: '1.5' }}>
                                    <strong>Default Fallback Server Active:</strong> Leave these fields blank to use the pre-configured system-wide SMTP relay credentials on the server backend (<code>{settings.default_smtp_host}</code> on port <code>{settings.default_smtp_port}</code>).
                                </div>
                            </div>

                            {!isEditing ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '20px' }}>
                                        <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #f1f5f9' }}>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>SMTP Server Host</span>
                                            <span style={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <FiServer style={{ color: 'var(--crimson)' }} /> {settings.smtp_host || <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>{settings.default_smtp_host} (Default)</span>}
                                            </span>
                                        </div>

                                        <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #f1f5f9' }}>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>SMTP Port</span>
                                            <span style={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <FiServer style={{ color: 'var(--crimson)' }} /> {settings.smtp_port || <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>{settings.default_smtp_port} (Default)</span>}
                                            </span>
                                        </div>

                                        <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #f1f5f9' }}>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>SMTP Security Protocol</span>
                                            <span style={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <FiServer style={{ color: 'var(--crimson)' }} /> <span style={{ textTransform: 'uppercase' }}>{settings.smtp_secure || settings.default_smtp_secure || 'TLS'}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                                        <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #f1f5f9' }}>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>SMTP Username / Authenticated Email</span>
                                            <span style={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <FiMail style={{ color: 'var(--crimson)' }} /> {settings.smtp_user || <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>{settings.default_smtp_user} (Default)</span>}
                                            </span>
                                        </div>

                                        <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #f1f5f9' }}>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>SMTP Password / App Password</span>
                                            <span style={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    <FiLock style={{ color: 'var(--crimson)', flexShrink: 0 }} /> 
                                                    {showPassword ? (settings.smtp_pass || <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>Not set</span>) : (settings.smtp_pass ? '••••••••' : <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>•••••••• (Default)</span>)}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    title={showPassword ? "Hide Password" : "Show Password"}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1.1rem', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0 }}
                                                >
                                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '20px' }}>
                                        <div className="form-group-p">
                                            <label htmlFor="smtp_host" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                SMTP Server Host
                                            </label>
                                            <div className="input-with-icon" style={{ position: 'relative' }}>
                                                <FiServer className="i" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }} />
                                                <input
                                                    id="smtp_host"
                                                    name="smtp_host"
                                                    type="text"
                                                    value={settings.smtp_host}
                                                    onChange={handleChange}
                                                    placeholder={settings.default_smtp_host}
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px 16px 12px 48px',
                                                        borderRadius: '12px',
                                                        border: '1.5px solid #e2e8f0',
                                                        background: '#f8fafc',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.3s'
                                                    }}
                                                />
                                            </div>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                                                e.g., <code>smtp.gmail.com</code> or mail server domain.
                                            </p>
                                        </div>

                                        <div className="form-group-p">
                                            <label htmlFor="smtp_port" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                SMTP Port
                                            </label>
                                            <div className="input-with-icon" style={{ position: 'relative' }}>
                                                <FiServer className="i" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }} />
                                                <input
                                                    id="smtp_port"
                                                    name="smtp_port"
                                                    type="number"
                                                    value={settings.smtp_port}
                                                    onChange={handleChange}
                                                    placeholder={settings.default_smtp_port}
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px 16px 12px 48px',
                                                        borderRadius: '12px',
                                                        border: '1.5px solid #e2e8f0',
                                                        background: '#f8fafc',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.3s'
                                                    }}
                                                />
                                            </div>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                                                e.g., <code>587</code> (for TLS) or <code>465</code> (for SSL).
                                            </p>
                                        </div>

                                        <div className="form-group-p">
                                            <label htmlFor="smtp_secure" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                SMTP Security Protocol
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    id="smtp_secure"
                                                    name="smtp_secure"
                                                    value={settings.smtp_secure}
                                                    onChange={handleChange}
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px 16px',
                                                        borderRadius: '12px',
                                                        border: '1.5px solid #e2e8f0',
                                                        background: '#f8fafc',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.3s',
                                                        appearance: 'none',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <option value="tls">TLS (STARTTLS - standard port 587)</option>
                                                    <option value="ssl">SSL (SMTPS - standard port 465)</option>
                                                    <option value="none">None (Plaintext - port 25 or 80 - insecure)</option>
                                                </select>
                                                <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }}>
                                                    ▼
                                                </div>
                                            </div>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                                                Default fallback security is <code>{settings.default_smtp_secure}</code>.
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                                        <div className="form-group-p">
                                            <label htmlFor="smtp_user" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                SMTP Username / Authenticated Email
                                            </label>
                                            <div className="input-with-icon" style={{ position: 'relative' }}>
                                                <FiMail className="i" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }} />
                                                <input
                                                    id="smtp_user"
                                                    name="smtp_user"
                                                    type="text"
                                                    value={settings.smtp_user}
                                                    onChange={handleChange}
                                                    placeholder={settings.default_smtp_user}
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px 16px 12px 48px',
                                                        borderRadius: '12px',
                                                        border: '1.5px solid #e2e8f0',
                                                        background: '#f8fafc',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.3s'
                                                    }}
                                                />
                                            </div>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                                                Credential username used for logging into the SMTP host.
                                            </p>
                                        </div>

                                        <div className="form-group-p">
                                            <label htmlFor="smtp_pass" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                SMTP Password / App Password
                                            </label>
                                            <div className="input-with-icon" style={{ position: 'relative' }}>
                                                <FiLock className="i" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }} />
                                                <input
                                                    id="smtp_pass"
                                                    name="smtp_pass"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={settings.smtp_pass}
                                                    onChange={handleChange}
                                                    placeholder="••••••••"
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px 48px 12px 48px',
                                                        borderRadius: '12px',
                                                        border: '1.5px solid #e2e8f0',
                                                        background: '#f8fafc',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.3s'
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    style={{
                                                        position: 'absolute',
                                                        right: '16px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        color: '#94a3b8',
                                                        fontSize: '1.1rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        padding: 0
                                                    }}
                                                >
                                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                                </button>
                                            </div>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                                                Secure app password or password. Click the eye icon to view or hide the password.
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ padding: '16px', background: '#fffbeb', border: '1.5px solid #fef3c7', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start', marginTop: '10px' }}>
                                        <FiAlertTriangle style={{ color: '#d97706', fontSize: '1.25rem', flexShrink: 0, marginTop: '2px' }} />
                                        <div style={{ fontSize: '0.8rem', color: '#78350f', lineHeight: '1.6' }}>
                                            <strong style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>⚠️ SMTP Authentication Guidelines:</strong>
                                            Just changing the email text field is not enough. You must generate/configure the credentials for the mail server:
                                            <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
                                                <li><strong>Gmail / Google Workspace:</strong> Enable 2-Step Verification on the Google account, go to <a href="https://myaccount.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#b45309', textDecoration: 'underline', fontWeight: 600 }}>Google Account Security &rarr; App Passwords</a>, generate a 16-character App Password, and use it in the SMTP Password field above.</li>
                                                <li><strong>Office 365 / Microsoft Exchange:</strong> Ensure SMTP AUTH is enabled for this mailbox in the Microsoft 365 Admin Center, and use the correct password (or an App Password if Multi-Factor Authentication is enabled).</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                        </>
                    )}

                    {activeTab === 'pdpa' && (
                        <>
                            {/* CARD 3: PDPA CONSENT SETTINGS */}
                    <div className="card-p" style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                        <div className="orchestration-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                            <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--crimson)' }}>
                                <FiInfo /> PDPA Consent & Guidelines Settings
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: 0 }}>
                                Customize the compliance guidelines and data protection terms displayed to candidates when they submit their applications.
                            </p>
                        </div>
                        
                        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {!isEditing ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #f1f5f9' }}>
                                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Consent Heading / Title</span>
                                        <span style={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, marginTop: '8px', display: 'block' }}>
                                            {settings.pdpa_title}
                                        </span>
                                    </div>

                                    <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #f1f5f9' }}>
                                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Consent Description Paragraph</span>
                                        <span style={{ fontSize: '0.9rem', color: '#475569', marginTop: '8px', display: 'block', lineHeight: '1.5' }}>
                                            {settings.pdpa_description}
                                        </span>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                                        <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #f1f5f9' }}>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Purpose Statement</span>
                                            <span style={{ fontSize: '0.85rem', color: '#475569', marginTop: '8px', display: 'block', lineHeight: '1.4' }}>
                                                <strong>Purpose:</strong> {settings.pdpa_purpose}
                                            </span>
                                        </div>

                                        <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #f1f5f9' }}>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Retention Policy</span>
                                            <span style={{ fontSize: '0.85rem', color: '#475569', marginTop: '8px', display: 'block', lineHeight: '1.4' }}>
                                                <strong>Retention:</strong> {settings.pdpa_retention}
                                            </span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '20px' }}>
                                        <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #f1f5f9' }}>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Security Standards</span>
                                            <span style={{ fontSize: '0.85rem', color: '#475569', marginTop: '8px', display: 'block', lineHeight: '1.4' }}>
                                                <strong>Security:</strong> {settings.pdpa_security}
                                            </span>
                                        </div>

                                        <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #f1f5f9' }}>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Rights Statement</span>
                                            <span style={{ fontSize: '0.85rem', color: '#475569', marginTop: '8px', display: 'block', lineHeight: '1.4' }}>
                                                <strong>Your Rights:</strong> {settings.pdpa_rights}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div className="form-group-p">
                                        <label htmlFor="pdpa_title" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                            Consent Heading / Title <span style={{ color: 'var(--crimson)' }}>*</span>
                                        </label>
                                        <input
                                            id="pdpa_title"
                                            name="pdpa_title"
                                            type="text"
                                            value={settings.pdpa_title}
                                            onChange={handleChange}
                                            
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                borderRadius: '12px',
                                                border: '1.5px solid #e2e8f0',
                                                background: '#f8fafc',
                                                fontSize: '0.95rem',
                                                transition: 'all 0.3s'
                                            }}
                                        />
                                    </div>

                                    <div className="form-group-p">
                                        <label htmlFor="pdpa_description" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                            Consent Description Paragraph <span style={{ color: 'var(--crimson)' }}>*</span>
                                        </label>
                                        <textarea
                                            id="pdpa_description"
                                            name="pdpa_description"
                                            rows="3"
                                            value={settings.pdpa_description}
                                            onChange={handleChange}
                                            
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                borderRadius: '12px',
                                                border: '1.5px solid #e2e8f0',
                                                background: '#f8fafc',
                                                fontSize: '0.95rem',
                                                transition: 'all 0.3s',
                                                resize: 'vertical',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                                        <div className="form-group-p">
                                            <label htmlFor="pdpa_purpose" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                Purpose Statement <span style={{ color: 'var(--crimson)' }}>*</span>
                                            </label>
                                            <textarea
                                                id="pdpa_purpose"
                                                name="pdpa_purpose"
                                                rows="2"
                                                value={settings.pdpa_purpose}
                                                onChange={handleChange}
                                                
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    borderRadius: '12px',
                                                    border: '1.5px solid #e2e8f0',
                                                    background: '#f8fafc',
                                                    fontSize: '0.95rem',
                                                    transition: 'all 0.3s',
                                                    resize: 'vertical',
                                                    fontFamily: 'inherit'
                                                }}
                                            />
                                        </div>

                                        <div className="form-group-p">
                                            <label htmlFor="pdpa_retention" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                Retention Policy <span style={{ color: 'var(--crimson)' }}>*</span>
                                            </label>
                                            <textarea
                                                id="pdpa_retention"
                                                name="pdpa_retention"
                                                rows="2"
                                                value={settings.pdpa_retention}
                                                onChange={handleChange}
                                                
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    borderRadius: '12px',
                                                    border: '1.5px solid #e2e8f0',
                                                    background: '#f8fafc',
                                                    fontSize: '0.95rem',
                                                    transition: 'all 0.3s',
                                                    resize: 'vertical',
                                                    fontFamily: 'inherit'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
                                        <div className="form-group-p">
                                            <label htmlFor="pdpa_security" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                Security Standards <span style={{ color: 'var(--crimson)' }}>*</span>
                                            </label>
                                            <textarea
                                                id="pdpa_security"
                                                name="pdpa_security"
                                                rows="2"
                                                value={settings.pdpa_security}
                                                onChange={handleChange}
                                                
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    borderRadius: '12px',
                                                    border: '1.5px solid #e2e8f0',
                                                    background: '#f8fafc',
                                                    fontSize: '0.95rem',
                                                    transition: 'all 0.3s',
                                                    resize: 'vertical',
                                                    fontFamily: 'inherit'
                                                }}
                                            />
                                        </div>

                                        <div className="form-group-p">
                                            <label htmlFor="pdpa_rights" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                Your Rights Statement <span style={{ color: 'var(--crimson)' }}>*</span>
                                            </label>
                                            <textarea
                                                id="pdpa_rights"
                                                name="pdpa_rights"
                                                rows="2"
                                                value={settings.pdpa_rights}
                                                onChange={handleChange}
                                                
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    borderRadius: '12px',
                                                    border: '1.5px solid #e2e8f0',
                                                    background: '#f8fafc',
                                                    fontSize: '0.95rem',
                                                    transition: 'all 0.3s',
                                                    resize: 'vertical',
                                                    fontFamily: 'inherit'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                        </>
                    )}

                    {activeTab === 'email' && (
                        <>
                            {/* EMAIL SUB-TABS SELECTOR */}
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', background: '#f1f5f9', padding: '6px', borderRadius: '14px', width: 'fit-content', border: '1px solid #e2e8f0' }}>
                                <button
                                    type="button"
                                    onClick={() => setActiveEmailSubTab('candidate')}
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '10px',
                                        fontSize: '0.85rem',
                                        fontWeight: 800,
                                        border: 'none',
                                        background: activeEmailSubTab === 'candidate' ? '#fff' : 'transparent',
                                        color: activeEmailSubTab === 'candidate' ? 'var(--crimson)' : '#64748b',
                                        boxShadow: activeEmailSubTab === 'candidate' ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.25s ease'
                                    }}
                                >
                                    Candidate Notifications
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveEmailSubTab('vacancy')}
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '10px',
                                        fontSize: '0.85rem',
                                        fontWeight: 800,
                                        border: 'none',
                                        background: activeEmailSubTab === 'vacancy' ? '#fff' : 'transparent',
                                        color: activeEmailSubTab === 'vacancy' ? 'var(--crimson)' : '#64748b',
                                        boxShadow: activeEmailSubTab === 'vacancy' ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.25s ease'
                                    }}
                                >
                                    Vacancy Workflow Requisitions
                                </button>
                            </div>

                            {activeEmailSubTab === 'candidate' && (
                                <>
                                    {/* INFO ALERT ABOUT PLACEHOLDERS */}
                            <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <FiInfo style={{ color: 'var(--crimson)', fontSize: '1.25rem', flexShrink: 0, marginTop: '2px' }} />
                                <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
                                    <strong>Template Variables / Placeholders:</strong> You can use placeholders inside the subject or body of these templates. The system will automatically replace them when sending:
                                    <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                                        <li><code>{`{name}`}</code> - Candidate's first name</li>
                                        <li><code>{`{job_title}`}</code> - Vacancy position title</li>
                                        <li><code>{`{company}`}</code> - Company name (e.g., George Steuart Health)</li>
                                        <li><code>{`{ref_no}`}</code> - Job reference number</li>
                                        <li><code>{`{interview_type}`}</code> - Interview mode (Online, In-Person - Shortlist template only)</li>
                                        <li><code>{`{interview_date}`}</code> - Scheduled date (Shortlist template only)</li>
                                        <li><code>{`{interview_time}`}</code> - Scheduled time (Shortlist template only)</li>
                                        <li><code>{`{interview_location}`}</code> - Location address or meeting link (Shortlist template only)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* CARD: CONFIRMATION EMAIL */}
                            <div className="card-p" style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', overflow: 'hidden', marginBottom: '24px' }}>
                                <div className="orchestration-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                                    <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--crimson)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FiMail /> Application Received Acknowledgment Template
                                    </h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: 0 }}>
                                        Sent automatically to candidates immediately after they successfully submit their job application.
                                    </p>
                                </div>
                                <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {!isEditing ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Email Subject</span>
                                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: 600 }}>{settings.email_template_confirmation_subject}</span>
                                            </div>
                                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Email Body Message</span>
                                                <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: settings.email_template_confirmation_body }}></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div className="form-group-p">
                                                <label htmlFor="email_template_confirmation_subject" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                    Email Subject Line <span style={{ color: 'var(--crimson)' }}>*</span>
                                                </label>
                                                <input
                                                    id="email_template_confirmation_subject"
                                                    name="email_template_confirmation_subject"
                                                    type="text"
                                                    value={settings.email_template_confirmation_subject}
                                                    onChange={handleChange}
                                                    
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '0.9rem' }}
                                                />
                                            </div>
                                            <div className="form-group-p">
                                                <label htmlFor="email_template_confirmation_body" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                    Email Body Message <span style={{ color: 'var(--crimson)' }}>*</span>
                                                </label>
                                                <textarea
                                                    id="email_template_confirmation_body"
                                                    name="email_template_confirmation_body"
                                                    rows="15"
                                                    value={settings.email_template_confirmation_body}
                                                    onChange={handleChange}
                                                    
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '0.85rem', resize: 'vertical', fontFamily: 'Consolas, Monaco, "Courier New", Courier, monospace', lineHeight: '1.4' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CARD: SHORTLIST EMAIL */}
                            <div className="card-p" style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', overflow: 'hidden', marginBottom: '24px' }}>
                                <div className="orchestration-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                                    <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--crimson)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FiMail /> Interview Invitation (Shortlist) Template
                                    </h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: 0 }}>
                                        Sent to candidates when they are moved to the "Shortlisted" status and scheduled for an interview.
                                    </p>
                                </div>
                                <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {!isEditing ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Email Subject</span>
                                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: 600 }}>{settings.email_template_shortlist_subject}</span>
                                            </div>
                                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Email Body Message</span>
                                                <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: settings.email_template_shortlist_body }}></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div className="form-group-p">
                                                <label htmlFor="email_template_shortlist_subject" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                    Email Subject Line <span style={{ color: 'var(--crimson)' }}>*</span>
                                                </label>
                                                <input
                                                    id="email_template_shortlist_subject"
                                                    name="email_template_shortlist_subject"
                                                    type="text"
                                                    value={settings.email_template_shortlist_subject}
                                                    onChange={handleChange}
                                                    
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '0.9rem' }}
                                                />
                                            </div>
                                            <div className="form-group-p">
                                                <label htmlFor="email_template_shortlist_body" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                    Email Body Message <span style={{ color: 'var(--crimson)' }}>*</span>
                                                </label>
                                                <textarea
                                                    id="email_template_shortlist_body"
                                                    name="email_template_shortlist_body"
                                                    rows="15"
                                                    value={settings.email_template_shortlist_body}
                                                    onChange={handleChange}
                                                    
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '0.85rem', resize: 'vertical', fontFamily: 'Consolas, Monaco, "Courier New", Courier, monospace', lineHeight: '1.4' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CARD: REJECTION EMAIL */}
                            <div className="card-p" style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', overflow: 'hidden', marginBottom: '24px' }}>
                                <div className="orchestration-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                                    <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--crimson)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FiMail /> Rejection Email Template
                                    </h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: 0 }}>
                                        Sent to candidates when their application status is changed to "Rejected".
                                    </p>
                                </div>
                                <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {!isEditing ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Email Subject</span>
                                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: 600 }}>{settings.email_template_rejection_subject}</span>
                                            </div>
                                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Email Body Message</span>
                                                <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: settings.email_template_rejection_body }}></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div className="form-group-p">
                                                <label htmlFor="email_template_rejection_subject" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                    Email Subject Line <span style={{ color: 'var(--crimson)' }}>*</span>
                                                </label>
                                                <input
                                                    id="email_template_rejection_subject"
                                                    name="email_template_rejection_subject"
                                                    type="text"
                                                    value={settings.email_template_rejection_subject}
                                                    onChange={handleChange}
                                                    
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '0.9rem' }}
                                                />
                                            </div>
                                            <div className="form-group-p">
                                                <label htmlFor="email_template_rejection_body" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                    Email Body Message <span style={{ color: 'var(--crimson)' }}>*</span>
                                                </label>
                                                <textarea
                                                    id="email_template_rejection_body"
                                                    name="email_template_rejection_body"
                                                    rows="15"
                                                    value={settings.email_template_rejection_body}
                                                    onChange={handleChange}
                                                    
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '0.85rem', resize: 'vertical', fontFamily: 'Consolas, Monaco, "Courier New", Courier, monospace', lineHeight: '1.4' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                                </>
                            )}

                            {activeEmailSubTab === 'vacancy' && (
                                <>
                                    {/* SECTION DIVIDER */}
                                    <div style={{ margin: '0 0 24px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Vacancy Requisition Workflow Email Alerts
                                </h4>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px', marginBottom: 0 }}>
                                    Configure notifications triggered internally when jobs are submitted, approved, or rejected in the approval pipeline.
                                </p>
                            </div>

                            {/* CARD: VACANCY PENDING APPROVAL */}
                            <div className="card-p" style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', overflow: 'hidden', marginBottom: '24px' }}>
                                <div className="orchestration-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                                    <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--crimson)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FiMail /> Vacancy Requisition Pending Approval Template
                                    </h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: 0 }}>
                                        Sent to Sub Admin 1 and Global Admins notifying them that a job requisition is awaiting review and action.
                                    </p>
                                </div>
                                <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {!isEditing ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Email Subject</span>
                                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: 600 }}>{settings.email_template_vacancy_pending_subject}</span>
                                            </div>
                                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Email Body Message</span>
                                                <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: settings.email_template_vacancy_pending_body }}></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div className="form-group-p">
                                                <label htmlFor="email_template_vacancy_pending_subject" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                    Email Subject Line <span style={{ color: 'var(--crimson)' }}>*</span>
                                                </label>
                                                <input
                                                    id="email_template_vacancy_pending_subject"
                                                    name="email_template_vacancy_pending_subject"
                                                    type="text"
                                                    value={settings.email_template_vacancy_pending_subject}
                                                    onChange={handleChange}
                                                    
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '0.9rem' }}
                                                />
                                            </div>
                                            <div className="form-group-p">
                                                <label htmlFor="email_template_vacancy_pending_body" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                    Email Body Message <span style={{ color: 'var(--crimson)' }}>*</span>
                                                </label>
                                                <textarea
                                                    id="email_template_vacancy_pending_body"
                                                    name="email_template_vacancy_pending_body"
                                                    rows="15"
                                                    value={settings.email_template_vacancy_pending_body}
                                                    onChange={handleChange}
                                                    
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '0.85rem', resize: 'vertical', fontFamily: 'Consolas, Monaco, "Courier New", Courier, monospace', lineHeight: '1.4' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CARD: VACANCY APPROVED */}
                            <div className="card-p" style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', overflow: 'hidden', marginBottom: '24px' }}>
                                <div className="orchestration-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                                    <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--crimson)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FiMail /> Vacancy Approved & Published Template
                                    </h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: 0 }}>
                                        Sent to creators and reviewers when a job requisition is approved and published on the careers portal.
                                    </p>
                                </div>
                                <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {!isEditing ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Email Subject</span>
                                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: 600 }}>{settings.email_template_vacancy_approved_subject}</span>
                                            </div>
                                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Email Body Message</span>
                                                <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: settings.email_template_vacancy_approved_body }}></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div className="form-group-p">
                                                <label htmlFor="email_template_vacancy_approved_subject" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                    Email Subject Line <span style={{ color: 'var(--crimson)' }}>*</span>
                                                </label>
                                                <input
                                                    id="email_template_vacancy_approved_subject"
                                                    name="email_template_vacancy_approved_subject"
                                                    type="text"
                                                    value={settings.email_template_vacancy_approved_subject}
                                                    onChange={handleChange}
                                                    
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '0.9rem' }}
                                                />
                                            </div>
                                            <div className="form-group-p">
                                                <label htmlFor="email_template_vacancy_approved_body" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                    Email Body Message <span style={{ color: 'var(--crimson)' }}>*</span>
                                                </label>
                                                <textarea
                                                    id="email_template_vacancy_approved_body"
                                                    name="email_template_vacancy_approved_body"
                                                    rows="15"
                                                    value={settings.email_template_vacancy_approved_body}
                                                    onChange={handleChange}
                                                    
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '0.85rem', resize: 'vertical', fontFamily: 'Consolas, Monaco, "Courier New", Courier, monospace', lineHeight: '1.4' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CARD: VACANCY REJECTED */}
                            <div className="card-p" style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', overflow: 'hidden', marginBottom: '24px' }}>
                                <div className="orchestration-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                                    <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--crimson)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FiMail /> Vacancy Returned for Revision Template
                                    </h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: 0 }}>
                                        Sent to requisition creators and reviewers when a job requisition is rejected with reviewer comments.
                                    </p>
                                </div>
                                <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {!isEditing ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Email Subject</span>
                                                <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: 600 }}>{settings.email_template_vacancy_rejected_subject}</span>
                                            </div>
                                            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Email Body Message</span>
                                                <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: settings.email_template_vacancy_rejected_body }}></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div className="form-group-p">
                                                <label htmlFor="email_template_vacancy_rejected_subject" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                    Email Subject Line <span style={{ color: 'var(--crimson)' }}>*</span>
                                                </label>
                                                <input
                                                    id="email_template_vacancy_rejected_subject"
                                                    name="email_template_vacancy_rejected_subject"
                                                    type="text"
                                                    value={settings.email_template_vacancy_rejected_subject}
                                                    onChange={handleChange}
                                                    
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '0.9rem' }}
                                                />
                                            </div>
                                            <div className="form-group-p">
                                                <label htmlFor="email_template_vacancy_rejected_body" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                    Email Body Message <span style={{ color: 'var(--crimson)' }}>*</span>
                                                </label>
                                                <textarea
                                                    id="email_template_vacancy_rejected_body"
                                                    name="email_template_vacancy_rejected_body"
                                                    rows="15"
                                                    value={settings.email_template_vacancy_rejected_body}
                                                    onChange={handleChange}
                                                    
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '0.85rem', resize: 'vertical', fontFamily: 'Consolas, Monaco, "Courier New", Courier, monospace', lineHeight: '1.4' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}

                    {activeTab === 'mail' && (
                        <>
                            {/* CARD 4: CONNECTION TEST DIAGNOSTICS */}
                    <div className="card-p" style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                        <div className="orchestration-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                            <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--crimson)' }}>
                                <FiActivity /> SMTP Connection Diagnostics
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: 0 }}>
                                Send a live test email directly using the configurations above to check port connection, security certificates, and login credentials.
                            </p>
                        </div>
                        
                        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="smtp-test-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
                                <div style={{ flex: 1, minWidth: '280px' }}>
                                    <label htmlFor="test_recipient" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                        Test Recipient Email Address
                                    </label>
                                    <div className="input-with-icon" style={{ position: 'relative' }}>
                                        <FiMail className="i" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }} />
                                        <input
                                            id="test_recipient"
                                            name="test_recipient"
                                            type="email"
                                            value={testRecipient}
                                            onChange={(e) => setTestRecipient(e.target.value)}
                                            placeholder="test@example.com"
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px 12px 48px',
                                                borderRadius: '12px',
                                                border: '1.5px solid #e2e8f0',
                                                background: '#f8fafc',
                                                fontSize: '0.95rem',
                                                transition: 'all 0.3s'
                                            }}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleTestSmtp}
                                    disabled={testing}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '12px 24px',
                                        borderRadius: '12px',
                                        fontWeight: 700,
                                        fontSize: '0.95rem',
                                        border: '1.5px solid var(--crimson)',
                                        cursor: testing ? 'not-allowed' : 'pointer',
                                        background: 'transparent',
                                        color: 'var(--crimson)',
                                        transition: 'all 0.2s',
                                        height: '48px'
                                    }}
                                >
                                    {testing ? (
                                        <>
                                            <div className="spinner-p" style={{ width: '18px', height: '18px', borderWidth: '2px', borderTopColor: 'var(--crimson)', display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}></div>
                                            Testing...
                                        </>
                                    ) : (
                                        <>
                                            <FiPlay /> Run Diagnostics Test
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* DIAGNOSTIC RESULTS STATUS BOX */}
                            {testResult && (
                                <div style={{ 
                                    border: `1px solid ${testResult.success ? '#bbf7d0' : '#fecaca'}`, 
                                    background: testResult.success ? '#f0fdf4' : '#fef2f2',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    marginTop: '8px',
                                    animation: 'fadeIn 0.3s ease-out'
                                }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        {testResult.success ? (
                                            <FiCheckCircle style={{ color: '#16a34a', fontSize: '1.5rem', flexShrink: 0 }} />
                                        ) : (
                                            <FiAlertTriangle style={{ color: '#dc2626', fontSize: '1.5rem', flexShrink: 0 }} />
                                        )}
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: testResult.success ? '#15803d' : '#991b1b' }}>
                                                {testResult.success ? 'Diagnostics Passed successfully!' : 'SMTP Connection Diagnostics Failed'}
                                            </h4>
                                            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: testResult.success ? '#166534' : '#7f1d1d' }}>
                                                {testResult.message}
                                            </p>
                                        </div>
                                    </div>

                                    {/* COLLAPSIBLE LOGS DRAWER */}
                                    <div style={{ marginTop: '16px', borderTop: `1px solid ${testResult.success ? '#dcfce7' : '#fee2e2'}`, paddingTop: '16px' }}>
                                        <button
                                            type="button"
                                            onClick={() => setShowDebug(!showDebug)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                padding: 0,
                                                cursor: 'pointer',
                                                color: testResult.success ? '#166534' : '#7f1d1d',
                                                fontSize: '0.8rem',
                                                fontWeight: 700,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            {showDebug ? (
                                                <><FiChevronUp /> Hide SMTP Diagnostic Logs</>
                                            ) : (
                                                <><FiChevronDown /> Show SMTP Diagnostic Logs</>
                                            )}
                                        </button>

                                        {showDebug && (
                                            <pre style={{ 
                                                marginTop: '12px', 
                                                padding: '12px', 
                                                background: '#0f172a', 
                                                color: '#38bdf8', 
                                                borderRadius: '8px', 
                                                fontSize: '0.75rem', 
                                                fontFamily: 'Courier New, monospace', 
                                                overflowX: 'auto',
                                                whiteSpace: 'pre-wrap',
                                                maxHeight: '300px',
                                                overflowY: 'auto',
                                                lineHeight: '1.4'
                                            }}>
                                                {testResult.debug}
                                            </pre>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                        </>
                    )}

                    {activeTab === 'ai' && (
                        <>
                            {/* TOP QUICK SWITCHER TOGGLE BAR */}
                            {!isEditing && (
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    background: '#fff', 
                                    padding: '16px 24px', 
                                    borderRadius: '16px', 
                                    border: '1px solid var(--border-light)', 
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.01)', 
                                    marginBottom: '20px' 
                                }}>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#1e293b', fontWeight: 800 }}>Quick AI Engine Switcher</h4>
                                        <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>Instantly switch the system provider</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', padding: '5px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                                        <button
                                            type="button"
                                            onClick={() => handleQuickAiSwitch('gemini')}
                                            title="Switch all system AI operations to Google Gemini Cloud API"
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '10px',
                                                fontSize: '0.85rem',
                                                fontWeight: 800,
                                                border: 'none',
                                                background: settings.ai_provider === 'gemini' ? '#ffffff' : 'transparent',
                                                color: settings.ai_provider === 'gemini' ? 'var(--crimson)' : '#64748b',
                                                boxShadow: settings.ai_provider === 'gemini' ? '0 4px 10px rgba(0,0,0,0.06)' : 'none',
                                                cursor: 'pointer',
                                                transition: 'all 0.25s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            ☁️ Cloud AI (Gemini)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleQuickAiSwitch('ollama')}
                                            title="Switch all system AI operations to Local Ollama Server"
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '10px',
                                                fontSize: '0.85rem',
                                                fontWeight: 800,
                                                border: 'none',
                                                background: settings.ai_provider === 'ollama' ? '#ffffff' : 'transparent',
                                                color: settings.ai_provider === 'ollama' ? 'var(--crimson)' : '#64748b',
                                                boxShadow: settings.ai_provider === 'ollama' ? '0 4px 10px rgba(0,0,0,0.06)' : 'none',
                                                cursor: 'pointer',
                                                transition: 'all 0.25s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            💻 Local AI (Ollama)
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ACTIVE CONFIGURATION SUMMARY CARD */}
                            <div className="stat-glass-card gold settings-sender-card" style={{ 
                                marginBottom: '24px', 
                                display: 'flex', 
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                flexWrap: 'wrap',
                                gap: '20px', 
                                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', 
                                border: '1.5px solid #fde68a', 
                                borderRadius: '20px', 
                                padding: '24px',
                                boxShadow: '0 10px 25px rgba(217, 119, 6, 0.04)'
                            }}>
                                <div style={{ 
                                    width: '56px', 
                                    height: '56px', 
                                    borderRadius: '16px', 
                                    background: '#fef3c7', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    fontSize: '1.8rem', 
                                    color: '#d97706', 
                                    flexShrink: 0,
                                    border: '1px solid #fde68a'
                                }}>
                                    <FiCpu />
                                </div>
                                <div style={{ flex: 1, minWidth: '250px' }}>
                                    <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.75px' }}>Active AI Engine Summary</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                        <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#78350f' }}>
                                            {settings.ai_provider === 'gemini' ? 'Google Gemini API' : 'Local Ollama Server'}
                                        </span>
                                        <span style={{ 
                                            background: '#dcfce7', 
                                            color: '#166534', 
                                            fontSize: '0.75rem', 
                                            fontWeight: 800, 
                                            padding: '4px 10px', 
                                            borderRadius: '20px', 
                                            border: '1px solid #bbf7d0',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            ✓ ONLINE & ACTIVE
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', borderLeft: '1px solid rgba(217,119,6,0.15)', paddingLeft: '24px' }}>
                                    <div>
                                        <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Target Model</span>
                                        <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: '#78350f', marginTop: '2px', fontFamily: 'monospace' }}>
                                            {settings.ai_provider === 'gemini' ? (settings.gemini_model || 'gemini-2.5-flash') : (settings.ollama_model || 'qwen2.5:3b')}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            {settings.ai_provider === 'gemini' ? 'API Credentials' : 'Server Endpoint'}
                                        </span>
                                        <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: '#78350f', marginTop: '2px', fontFamily: 'monospace' }}>
                                            {settings.ai_provider === 'gemini' ? 'Masked (********)' : (settings.ollama_server || 'http://172.16.7.21:11434')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CARD: ACTIVE AI PROVIDER SELECTION */}
                            <div className="card-p" style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', overflow: 'hidden', marginBottom: '24px' }}>
                                <div className="orchestration-header" style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                                    <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--crimson)' }}>
                                        <FiCpu /> AI Engine Selector
                                    </h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: 0 }}>
                                        Choose which AI parser engine the entire career portal should use to read CV files and match candidates.
                                    </p>
                                </div>
                                
                                <div style={{ padding: '32px' }}>
                                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                        <label style={{
                                            flex: 1,
                                            minWidth: '250px',
                                            padding: '24px',
                                            borderRadius: '16px',
                                            border: settings.ai_provider === 'ollama' ? '2.5px solid var(--gold-accent)' : '1.5px solid #e2e8f0',
                                            background: settings.ai_provider === 'ollama' ? 'rgba(200, 169, 81, 0.04)' : '#ffffff',
                                            cursor: isEditing ? 'pointer' : 'default',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
                                        }}>
                                            <input
                                                type="radio"
                                                name="ai_provider"
                                                value="ollama"
                                                checked={settings.ai_provider === 'ollama'}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                style={{ accentColor: 'var(--gold-accent)', width: '20px', height: '20px' }}
                                            />
                                            <div>
                                                <strong style={{ display: 'block', fontSize: '1rem', color: '#1e293b' }}>Local Ollama Server</strong>
                                                <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px', display: 'block' }}>Process documents locally & offline using open-source LLMs</span>
                                            </div>
                                            {settings.ai_provider === 'ollama' && (
                                                <span style={{ marginLeft: 'auto', background: '#dcfce7', color: '#166534', fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', border: '1px solid #bbf7d0' }}>ACTIVE</span>
                                            )}
                                        </label>

                                        <label style={{
                                            flex: 1,
                                            minWidth: '250px',
                                            padding: '24px',
                                            borderRadius: '16px',
                                            border: settings.ai_provider === 'gemini' ? '2.5px solid var(--gold-accent)' : '1.5px solid #e2e8f0',
                                            background: settings.ai_provider === 'gemini' ? 'rgba(200, 169, 81, 0.04)' : '#ffffff',
                                            cursor: isEditing ? 'pointer' : 'default',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
                                        }}>
                                            <input
                                                type="radio"
                                                name="ai_provider"
                                                value="gemini"
                                                checked={settings.ai_provider === 'gemini'}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                style={{ accentColor: 'var(--gold-accent)', width: '20px', height: '20px' }}
                                            />
                                            <div>
                                                <strong style={{ display: 'block', fontSize: '1rem', color: '#1e293b' }}>Google Gemini Cloud API</strong>
                                                <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px', display: 'block' }}>Leverage high-speed, state-of-the-art Google Gemini models</span>
                                            </div>
                                            {settings.ai_provider === 'gemini' && (
                                                <span style={{ marginLeft: 'auto', background: '#dcfce7', color: '#166534', fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', border: '1px solid #bbf7d0' }}>ACTIVE</span>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* DUAL CONFIGURATION PANELS */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: '24px', marginBottom: '24px' }}>
                                
                                {/* CARD: GEMINI CONFIG (Left) */}
                                <div className="card-p" style={{ 
                                    background: '#fff', 
                                    borderRadius: '20px', 
                                    border: '1px solid var(--border-light)', 
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)', 
                                    opacity: settings.ai_provider === 'gemini' ? 1 : 0.65,
                                    transition: 'all 0.3s ease',
                                    borderTop: settings.ai_provider === 'gemini' ? '4px solid var(--gold-accent)' : '1px solid var(--border-light)'
                                }}>
                                    <div className="orchestration-header" style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', margin: 0, color: '#1e293b' }}>Google Gemini Settings</h4>
                                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Configure cloud LLM access</span>
                                        </div>
                                        {settings.ai_provider === 'gemini' && (
                                            <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.65rem', fontWeight: 900, padding: '3px 8px', borderRadius: '12px' }}>ROUTING LIVE</span>
                                        )}
                                    </div>
                                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div className="form-group-p">
                                            <label htmlFor="gemini_api_key" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                Google Gemini API Key
                                            </label>
                                            <div className="input-with-icon" style={{ position: 'relative' }}>
                                                <FiLock className="i" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }} />
                                                <input
                                                    id="gemini_api_key"
                                                    name="gemini_api_key"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={settings.gemini_api_key}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    placeholder="••••••••"
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px 48px 12px 48px',
                                                        borderRadius: '12px',
                                                        border: '1.5px solid #e2e8f0',
                                                        background: isEditing ? '#f8fafc' : '#f1f5f9',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.3s'
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    disabled={!isEditing}
                                                    style={{
                                                        position: 'absolute',
                                                        right: '16px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: isEditing ? 'pointer' : 'default',
                                                        color: '#94a3b8',
                                                        fontSize: '1.1rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        padding: 0
                                                    }}
                                                >
                                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                                </button>
                                            </div>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                                                Masked as <code>••••••••</code> when saved. Uses constant fallback if empty.
                                            </p>
                                        </div>

                                        <div className="form-group-p">
                                            <label htmlFor="gemini_model" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                Gemini Model Version
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    id="gemini_model"
                                                    name="gemini_model"
                                                    value={settings.gemini_model}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px 16px',
                                                        borderRadius: '12px',
                                                        border: '1.5px solid #e2e8f0',
                                                        background: isEditing ? '#f8fafc' : '#f1f5f9',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.3s',
                                                        cursor: isEditing ? 'pointer' : 'default'
                                                    }}
                                                >
                                                    <option value="gemini-2.5-flash">gemini-2.5-flash (Recommended)</option>
                                                    <option value="gemini-2.5-flash-lite">gemini-2.5-flash-lite (Fast & light)</option>
                                                    <option value="gemini-2.5-pro">gemini-2.5-pro (High quality)</option>
                                                    <option value="gemini-2.0-flash">gemini-2.0-flash</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CARD: OLLAMA CONFIG (Right) */}
                                <div className="card-p" style={{ 
                                    background: '#fff', 
                                    borderRadius: '20px', 
                                    border: '1px solid var(--border-light)', 
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)', 
                                    opacity: settings.ai_provider === 'ollama' ? 1 : 0.65,
                                    transition: 'all 0.3s ease',
                                    borderTop: settings.ai_provider === 'ollama' ? '4px solid var(--gold-accent)' : '1px solid var(--border-light)'
                                }}>
                                    <div className="orchestration-header" style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', margin: 0, color: '#1e293b' }}>Local Ollama Settings</h4>
                                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Configure offline local LLM</span>
                                        </div>
                                        {settings.ai_provider === 'ollama' && (
                                            <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.65rem', fontWeight: 900, padding: '3px 8px', borderRadius: '12px' }}>ROUTING LIVE</span>
                                        )}
                                    </div>
                                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div className="form-group-p">
                                            <label htmlFor="ollama_server" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                Ollama Server URL
                                            </label>
                                            <input
                                                id="ollama_server"
                                                name="ollama_server"
                                                type="text"
                                                value={settings.ollama_server}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                placeholder="e.g. http://172.16.7.21:11434"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    borderRadius: '12px',
                                                    border: '1.5px solid #e2e8f0',
                                                    background: isEditing ? '#f8fafc' : '#f1f5f9',
                                                    fontSize: '0.95rem',
                                                    transition: 'all 0.3s'
                                                }}
                                            />
                                        </div>

                                        <div className="form-group-p">
                                            <label htmlFor="ollama_model" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>
                                                Ollama Model Name
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    id="ollama_model"
                                                    name="ollama_model"
                                                    value={settings.ollama_model}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px 16px',
                                                        borderRadius: '12px',
                                                        border: '1.5px solid #e2e8f0',
                                                        background: isEditing ? '#f8fafc' : '#f1f5f9',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.3s',
                                                        cursor: isEditing ? 'pointer' : 'default'
                                                    }}
                                                >
                                                    <option value="qwen2.5:3b">qwen2.5:3b (Recommended - Faster)</option>
                                                    <option value="qwen2.5:7b">qwen2.5:7b (High Accuracy - Slower)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {isEditing && (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', paddingTop: '20px', marginTop: '24px', borderTop: '1px solid #e2e8f0' }}>
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    border: '1.5px solid #cbd5e1',
                                    background: '#fff',
                                    color: '#64748b',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <FiX /> Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 28px',
                                    borderRadius: '12px',
                                    fontWeight: 800,
                                    fontSize: '0.95rem',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #7A1228, #991b1b)',
                                    color: '#fff',
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 4px 14px rgba(122, 18, 40, 0.25)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <FiCheck /> {saving ? 'Saving...' : 'Save All Settings'}
                            </button>
                        </div>
                    )}

                </div>
            </form>
        </div>
    );
}

export default SettingsPage;
