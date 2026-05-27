import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiLock, FiShield, FiCheckCircle, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { verifyResetToken, resetPasswordWithToken } from '../../services/api';

function ResetPasswordPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [form, setForm] = useState({ password: '', confirmPassword: '' });
    const [status, setStatus] = useState('verifying'); // 'verifying', 'form', 'success', 'error'
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const t = params.get('token');
        if (!t) {
            setStatus('error');
            return;
        }
        setToken(t);
        handleVerify(t);
    }, [location]);

    const handleVerify = async (t) => {
        try {
            const res = await verifyResetToken(t);
            setEmail(res.data.data.email);
            setStatus('form');
        } catch (err) {
            setStatus('error');
            toast.error(err.response?.data?.message || 'Invalid or expired reset link');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (form.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await resetPasswordWithToken({ token, password: form.password });
            setStatus('success');
            toast.success('System credentials synchronized. Access restored.');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-split-page">
            {/* Left: Branding */}
            <div className="login-branding-panel">
                <div className="branding-overlay"></div>
                <img src="/admin-branding.png" alt="Branding" className="branding-bg" />
                <div className="branding-content">
                    <img src="/gs-logo.png" alt="GS Logo" className="branding-logo" />
                    <div className="branding-text">
                        <span className="est-badge">SECURITY PROTOCOL</span>
                        <h1 className="serif-title">Credential <br/>Renewal <br/>Gateway.</h1>
                        <p>Recruitment Orchestration Console v4.0</p>
                    </div>
                </div>
            </div>

            {/* Right: Form */}
            <div className="login-form-panel">
                <div className="login-glass-container animated-fade-in">
                    {status === 'verifying' && (
                        <div className="recovery-centering">
                            <div className="spinner-large"></div>
                            <h2 style={{ marginTop: '32px', fontFamily: 'var(--font-heading)' }}>Authenticating Token</h2>
                            <p style={{ color: '#64748b' }}>Verifying secure handshake with heritage servers...</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="recovery-centering">
                            <div className="access-icon" style={{ borderColor: 'var(--crimson)' }}><FiAlertCircle /></div>
                            <h2 style={{ fontFamily: 'var(--font-heading)' }}>Link Expired</h2>
                            <p style={{ color: '#64748b', marginBottom: '32px' }}>This reset link is no longer valid or has already been used.</p>
                            <Link to="/admin/forgot-password" style={{ color: 'var(--gold-accent)', fontWeight: 700, textDecoration: 'none' }}>
                                <FiArrowLeft /> Request a new link
                            </Link>
                        </div>
                    )}

                    {status === 'form' && (
                        <>
                            <div className="login-header-p">
                                <div className="access-icon"><FiShield /></div>
                                <h2>New Credentials</h2>
                                <p>Securing account access for <strong>{email}</strong></p>
                            </div>

                            <form className="premium-login-form" onSubmit={handleSubmit}>
                                <div className="form-group-p">
                                    <label htmlFor="password"><FiLock /> NEW SECURITY PASSWORD</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Min. 6 characters"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group-p">
                                    <label htmlFor="confirmPassword"><FiCheckCircle /> CONFIRM PASSWORD</label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Repeat your password"
                                        value={form.confirmPassword}
                                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                        required
                                    />
                                </div>

                                <button type="submit" className="login-btn-premium" disabled={loading}>
                                    {loading ? <div className="spinner-small"></div> : 'SYNCHRONIZE CREDENTIALS'}
                                </button>
                            </form>
                        </>
                    )}

                    {status === 'success' && (
                        <div className="success-state-p">
                            <div className="success-icon-p" style={{ background: '#f0fdf4', color: '#16a34a' }}><FiCheckCircle /></div>
                            <h2>Success!</h2>
                            <p>Your password has been updated. You can now use your new credentials to access the Recruitment Console.</p>
                            <button className="login-btn-premium" onClick={() => navigate('/admin/login')}>
                                RETURN TO LOGIN
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx="true">{`
                .login-split-page { display: grid; grid-template-columns: 1.1fr 0.9fr; min-height: 100vh; background: #fcfcfd; }
                .login-branding-panel { position: relative; height: 100vh; background: #2a050b; }
                .branding-bg { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
                .branding-overlay { position: absolute; inset: 0; background: linear-gradient(to right, #2a050b 0%, transparent 60%); }
                .branding-content { position: absolute; inset: 0; padding: 60px; display: flex; flex-direction: column; justify-content: space-between; color: #fff; z-index: 2; }
                .branding-logo { width: 140px; filter: brightness(0) invert(1); }
                .est-badge { display: inline-block; padding: 4px 12px; background: rgba(200,169,81,0.2); color: var(--gold-accent); font-size: 0.7rem; font-weight: 800; border-radius: 4px; margin-bottom: 24px; letter-spacing: 2px; }
                .serif-title { font-family: var(--font-heading); font-size: 3.5rem; line-height: 0.95; margin: 0; }
                .login-form-panel { padding: 40px; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 10% 20%, #f1f5f9 0%, #ffffff 100%); }
                .login-glass-container { width: 100%; max-width: 440px; text-align: center; }
                .access-icon { width: 64px; height: 64px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 1.6rem; color: var(--crimson); }
                .form-group-p { margin-bottom: 24px; text-align: left; }
                .form-group-p label { display: flex; align-items: center; gap: 6px; font-size: 0.65rem; font-weight: 800; color: #94a3b8; margin-bottom: 10px; letter-spacing: 1.5px; }
                .form-group-p input { width: 100%; padding: 16px 20px; border: 1px solid #e2e8f0; border-radius: 16px; font-size: 1rem; }
                .login-btn-premium { width: 100%; padding: 18px; background: #2a050b; color: #fff; border: none; border-radius: 18px; font-weight: 800; cursor: pointer; transition: all 0.3s; }
                .login-btn-premium:hover { transform: translateY(-4px); box-shadow: 0 15px 30px rgba(42,5,11,0.2); }
                .recovery-centering { display: flex; flex-direction: column; align-items: center; }
                .spinner-large { width: 48px; height: 48px; border: 3px solid #e2e8f0; border-top-color: var(--gold-accent); border-radius: 50%; animation: spin 1s linear infinite; }
                .spinner-small { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }
                .animated-fade-in { animation: fadeIn 0.6s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @media (max-width: 992px) { .login-branding-panel { display: none; } .login-split-page { grid-template-columns: 1fr; } }
                @media (max-width: 768px) {
                    .login-form-panel { padding: 40px 20px; }
                    .serif-title { font-size: 2.8rem; }
                    .login-glass-container { padding: 40px 24px; }
                    .branding-content { padding: 30px; }
                }
                @media (max-width: 480px) {
                    .serif-title { font-size: 2.2rem; }
                    .login-header-p h2 { font-size: 1.5rem; }
                    .form-group-p input { padding: 12px 16px; }
                }
            `}</style>
        </div>
    );
}

export default ResetPasswordPage;
