import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiLock, FiShield, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import api from '../../services/api';

function ChangePasswordPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.current_password || !form.new_password || !form.confirm_password) {
            toast.error('All fields are required');
            return;
        }

        if (form.new_password !== form.confirm_password) {
            toast.error('New passwords do not match');
            return;
        }

        if (form.new_password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth.php?action=change-password', {
                current_password: form.current_password,
                new_password: form.new_password
            });

            toast.success('Security Profile Updated. Re-Authorizing...');

            // Clear session to force a fresh login
            localStorage.removeItem('gs_admin_token');
            localStorage.removeItem('gs_admin_data');

            setTimeout(() => {
                navigate('/admin/login');
            }, 1500);

        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to change password');
            setLoading(false);
        }
    };

    return (
        <div className="login-split-page">
            {/* Left: Branding & Security Vibe */}
            <div className="login-branding-panel">
                <div className="branding-overlay"></div>
                <img src="/admin-branding.png" alt="Branding" className="branding-bg" />
                <div className="branding-content">
                    <img src="/gs-logo.png" alt="GS Logo" className="branding-logo" />
                    <div className="branding-text">
                        <span className="est-badge">SECURITY PROTOCOL</span>
                        <h1 className="serif-title">Protect. <br/>Validate. <br/>Secure.</h1>
                        <p>Credentials Update | George Steuart Recruitment Orchestration</p>
                    </div>
                    <div className="branding-footer">
                        <div className="secure-badge">
                            <FiShield /> ADVANCED ENCRYPTION ACTIVE
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Security Interface */}
            <div className="login-form-panel">
                <button className="back-home-minimal" onClick={() => navigate('/admin/login')}>
                    <FiArrowLeft /> Return to Login
                </button>

                <div className="login-glass-container animated-fade-in">
                    <div className="login-header-p">
                        <div className="access-icon"><FiLock /></div>
                        <h2>Update Credentials</h2>
                        <p>You are using a temporary password. Please establish a permanent secure passphrase.</p>
                    </div>

                    <form className="premium-login-form" onSubmit={handleSubmit}>
                        <div className="form-group-p">
                            <label htmlFor="current_password"><FiLock /> TEMPORARY PASSWORD</label>
                            <input
                                id="current_password"
                                name="current_password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Enter current/temp password"
                                value={form.current_password}
                                onChange={(e) => setForm({ ...form, current_password: e.target.value })}
                                required
                            />
                        </div>
                        
                        <div style={{ padding: '10px 0', borderBottom: '1px solid #f1f5f9', marginBottom: '20px' }}></div>

                        <div className="form-group-p">
                            <label htmlFor="new_password"><FiShield /> NEW SECURE PASSWORD</label>
                            <input
                                id="new_password"
                                name="new_password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Min 6 characters"
                                value={form.new_password}
                                onChange={(e) => setForm({ ...form, new_password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group-p">
                            <label htmlFor="confirm_password"><FiShield /> CONFIRM PASSWORD</label>
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Repeat new password"
                                value={form.confirm_password}
                                onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="login-btn-premium" disabled={loading}>
                            {loading ? (
                                <div className="spinner-small"></div>
                            ) : (
                                <>ACTIVATE NEW CREDENTIALS <FiCheckCircle style={{ marginLeft: 8 }} /></>
                            )}
                        </button>
                    </form>
                </div>

                <div className="login-footer-p">
                    &copy; 2026 George Steuart & Company Limited. Security Governance.
                </div>
            </div>

            <style jsx="true">{`
                /* REUSING THE CORE LOGIN STYLES FOR CONSISTENCY */
                .login-split-page {
                    display: grid;
                    grid-template-columns: 1.1fr 0.9fr;
                    min-height: 100vh;
                    background: #fcfcfd;
                    overflow: hidden;
                }

                @media (max-width: 992px) {
                    .login-split-page { grid-template-columns: 1fr; }
                    .login-branding-panel { display: none; }
                }

                .login-branding-panel {
                    position: relative;
                    height: 100vh;
                    overflow: hidden;
                    background: #2a050b;
                }

                .branding-bg {
                    width: 100%; height: 100%; object-fit: cover; opacity: 0.6;
                    filter: saturate(0.8) contrast(1.1);
                }

                .branding-overlay {
                    position: absolute; inset: 0;
                    background: linear-gradient(to right, #2a050b 0%, transparent 60%, rgba(0,0,0,0.6) 100%);
                    z-index: 1;
                }

                .branding-content {
                    position: absolute; inset: 0; z-index: 2; padding: 40px;
                    display: flex; flex-direction: column; justify-content: space-between;
                }

                .branding-logo { width: 140px; filter: brightness(0) invert(1); }

                .est-badge {
                    display: inline-block; padding: 4px 12px;
                    background: rgba(200, 169, 81, 0.2); border: 1px solid rgba(200, 169, 81, 0.3);
                    color: var(--gold-accent); font-size: 0.7rem; font-weight: 800;
                    letter-spacing: 2px; border-radius: 4px; margin-bottom: 24px;
                }

                .serif-title {
                    font-family: var(--font-heading); font-size: 3.5rem; color: #fff;
                    line-height: 0.95; margin: 0; letter-spacing: -2px;
                }

                .branding-text p {
                    color: rgba(255,255,255,0.6); font-size: 1.1rem; margin-top: 24px;
                    letter-spacing: 0.5px;
                }

                .secure-badge {
                    display: flex; align-items: center; gap: 10px;
                    color: rgba(255,255,255,0.4); font-size: 0.75rem; font-weight: 700;
                    letter-spacing: 1px;
                }

                .login-form-panel {
                    padding: 40px; display: flex; flex-direction: column;
                    justify-content: center; align-items: center; position: relative;
                    background: radial-gradient(circle at 10% 20%, #f1f5f9 0%, #ffffff 100%);
                }

                .back-home-minimal {
                    position: absolute; top: 40px; right: 40px; background: none; border: none;
                    color: #94a3b8; font-size: 0.9rem; font-weight: 600; display: flex;
                    align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s;
                }
                .back-home-minimal:hover { color: var(--crimson); transform: translateX(-5px); }

                .login-glass-container { width: 100%; max-width: 440px; }

                .login-header-p { text-align: center; margin-bottom: 40px; }
                .access-icon {
                    width: 64px; height: 64px; background: #f8fafc; border: 1px solid #e2e8f0;
                    border-radius: 20px; display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 20px; font-size: 1.6rem; color: var(--crimson);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.02);
                }

                .login-header-p h2 { font-family: var(--font-heading); font-size: 1.8rem; margin: 0; color: #1e293b; }
                .login-header-p p { color: #64748b; margin-top: 8px; font-size: 0.9rem; }

                .form-group-p { margin-bottom: 20px; }
                .form-group-p label {
                    display: flex; align-items: center; gap: 6px; font-size: 0.65rem;
                    font-weight: 800; color: #94a3b8; margin-bottom: 10px;
                    letter-spacing: 1.5px;
                }

                .form-group-p input {
                    width: 100%; padding: 14px 18px; background: #fff; border: 1px solid #e2e8f0;
                    border-radius: 14px; font-size: 1rem; color: #1e293b; transition: all 0.2s;
                    box-shadow: var(--shadow-sm);
                }
                .form-group-p input:focus {
                    border-color: var(--gold-accent); box-shadow: 0 0 0 4px rgba(200, 169, 81, 0.1);
                    transform: translateY(-2px); outline: none;
                }

                .login-btn-premium {
                    width: 100%; padding: 18px; background: #2a050b; color: #fff; border: none;
                    border-radius: 18px; font-weight: 800; font-size: 1rem; letter-spacing: 1px;
                    cursor: pointer; transition: all 0.3s; display: flex; align-items: center;
                    justify-content: center; box-shadow: 0 15px 30px rgba(42, 5, 11, 0.2);
                    margin-top: 10px;
                }
                .login-btn-premium:hover {
                    background: #4a0914; transform: translateY(-4px);
                    box-shadow: 0 20px 40px rgba(42, 5, 11, 0.3);
                }

                .login-footer-p {
                    position: absolute; bottom: 40px; font-size: 0.75rem; color: #94a3b8;
                    letter-spacing: 0.5px;
                }

                .animated-fade-in { animation: fadeIn 0.6s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .spinner-small {
                    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.2);
                    border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}

export default ChangePasswordPage;
