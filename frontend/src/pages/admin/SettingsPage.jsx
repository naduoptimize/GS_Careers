import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
    FiSettings, FiMail, FiCheck, FiActivity, FiServer, 
    FiLock, FiUser, FiEye, FiEyeOff, FiPlay, FiInfo, 
    FiCheckCircle, FiAlertTriangle, FiChevronDown, FiChevronUp,
    FiEdit, FiX
} from 'react-icons/fi';
import { getSettings, saveSettings, testSmtpSettings } from '../../services/api';

function SettingsPage({ admin }) {
    const [settings, setSettings] = useState({
        system_email: '',
        smtp_host: '',
        smtp_port: '',
        smtp_secure: 'tls',
        smtp_user: '',
        smtp_pass: '',
        smtp_from_name: '',
        
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
        setSaving(true);
        try {
            await saveSettings({
                system_email: settings.system_email,
                smtp_host: settings.smtp_host,
                smtp_port: settings.smtp_port,
                smtp_secure: settings.smtp_secure,
                smtp_user: settings.smtp_user,
                smtp_pass: settings.smtp_pass,
                smtp_from_name: settings.smtp_from_name
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
        <div className="premium-settings-page" style={{ maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn 0.4s ease-out' }}>
            {/* HERO */}
            <div className="dashboard-hero-premium" style={{ marginBottom: '24px' }}>
                <div className="hero-content-p">
                    <div className="hero-badge-p"><FiActivity /> System Executive Suite</div>
                    <h1 className="hero-title-p">Portal Settings</h1>
                    <p className="hero-subtitle-p">George Steuart Recruitment Orchestration | Global System Configurations</p>
                </div>
                <div className="hero-bg-accent"></div>
            </div>

            {/* Active Mail Status Card */}
            <div className="stat-glass-card gold settings-sender-card" style={{ marginBottom: '24px', flexWrap: 'wrap', gap: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '16px', padding: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '1.4rem', color: '#d97706', flexShrink: 0 }}>
                    <FiMail />
                </div>
                <div style={{ flex: 1 }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active System Sender Address</span>
                    <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 800, color: '#78350f', marginTop: '2px', wordBreak: 'break-all' }}>
                        {settings.system_email || settings.smtp_user || settings.default_email}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#b45309', marginTop: '4px', display: 'block' }}>
                        <strong>Mode:</strong> {
                            settings.smtp_host && settings.smtp_user 
                                ? 'Custom Sender (Alias/Relay)' 
                                : (settings.system_email 
                                    ? `Custom Sender via Default SMTP (${settings.default_email})` 
                                    : `Default SMTP Account Fallback (${settings.default_email})`)
                        }
                    </span>
                </div>
                {!isEditing && (
                    <button
                        type="button"
                        onClick={handleStartEdit}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            border: '1px solid #d97706',
                            background: '#d97706',
                            color: '#fff',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 6px -1px rgba(217, 119, 6, 0.1)'
                        }}
                    >
                        <FiEdit /> Edit Settings
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
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
                                                required
                                            />
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.4' }}>
                                            💡 Target inbox displayed as the sender in incoming emails.
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
                                            <span style={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <FiLock style={{ color: 'var(--crimson)' }} /> {settings.smtp_pass ? '••••••••' : <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>•••••••• (Default)</span>}
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
                                                Secure app password or password. Saved passwords show as <code>••••••••</code>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CARD 3: CONNECTION TEST DIAGNOSTICS */}
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

                    {/* SAVE & CANCEL BUTTON FOOTER */}
                    {isEditing && (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '24px', marginBottom: '40px' }}>
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    border: '1.5px solid #cbd5e1',
                                    cursor: 'pointer',
                                    background: '#fff',
                                    color: '#64748b',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <FiX /> Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-gold" 
                                disabled={saving}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 32px',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    border: 'none',
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    background: 'var(--gold-accent)',
                                    color: '#2a050b',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 4px 14px rgba(217, 119, 6, 0.2)'
                                }}
                            >
                                {saving ? 'Saving Settings...' : <><FiCheck /> Save All Settings</>}
                            </button>
                        </div>
                    )}

                </div>
            </form>
        </div>
    );
}

export default SettingsPage;
