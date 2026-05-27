import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiUser, FiLock, FiMail, FiShield, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import api from '../../services/api';

function SignupPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ full_name: '', username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.full_name || !form.username || !form.email || !form.password) {
            toast.error('All fields are required');
            return;
        }

        if (form.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth.php?action=register_superadmin', form);
            toast.success('Credential established. Redirecting to access panel...');
            setTimeout(() => navigate('/admin/login'), 1500);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
            setLoading(false);
        }
    };

    return (
        <div className="login-split-page">
            {/* Left: Branding & Heritage */}
            <div className="login-branding-panel">
                <div className="branding-overlay"></div>
                <img src="/admin-branding.png" alt="Branding" className="branding-bg" />
                <div className="branding-content">
                    <img src="/gs-logo.png" alt="GS Logo" className="branding-logo" />
                    <div className="branding-text">
                        <span className="est-badge">STRATEGIC ENROLLMENT</span>
                        <h1 className="serif-title">Elevate. <br/>Empower. <br/>Execute.</h1>
                        <p>George Steuart Recruitment System | Master Account Setup</p>
                    </div>
                    <div className="branding-footer">
                        <div className="secure-badge">
                            <FiShield /> ROOT AUTHORITY PROVISIONING
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Registration Interface */}
            <div className="login-form-panel">
                <button className="back-home-minimal" onClick={() => navigate('/')}>
                    <FiArrowLeft /> Return to Portals
                </button>

                <div className="login-glass-container animated-fade-in">
                    <div className="login-header-p">
                        <div className="access-icon"><FiShield /></div>
                        <h2>Master Provisioning</h2>
                        <p>Establish a high-authority Super Administrator account.</p>
                    </div>

                    <form className="premium-login-form" onSubmit={handleSubmit}>
                        <div className="form-grid-signup">
                            <div className="form-group-p">
                                <label htmlFor="full_name"><FiUser /> FULL NAME</label>
                                <input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    placeholder="e.g. Alexander Steuart"
                                    autoComplete="name"
                                    value={form.full_name}
                                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group-p">
                                <label htmlFor="username"><FiUser /> USERNAME (ID)</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="operational_handle"
                                    autoComplete="username"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group-p">
                            <label htmlFor="email"><FiMail /> OFFICIAL EMAIL</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@georgesteuart.com"
                                autoComplete="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group-p">
                            <label htmlFor="password"><FiLock /> SECURE PASSPHRASE</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Min. 6 high-entropy characters"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="login-btn-premium" disabled={loading}>
                            {loading ? (
                                <div className="spinner-small"></div>
                            ) : (
                                <>PROVISION MASTER ACCOUNT <FiCheckCircle style={{ marginLeft: 8 }} /></>
                            )}
                        </button>
                    </form>

                    <div className="signup-redirect">
                        Already have an established profile? <Link to="/admin/login">Authorize Access</Link>
                    </div>
                </div>

                <div className="login-footer-p">
                    &copy; 2026 George Steuart & Company Limited. Global Identity System.
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

                .form-grid-signup { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }

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

                .signup-redirect { text-align: center; margin-top: 32px; font-size: 0.9rem; color: #64748b; }
                .signup-redirect a { color: var(--gold-accent); font-weight: 700; text-decoration: none; }
                .signup-redirect a:hover { text-decoration: underline; }

                .login-footer-p {
                    position: absolute; bottom: 40px; font-size: 0.75rem; color: #94a3b8;
                    letter-spacing: 0.5px;
                }

                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                /* Mobile Optimization */
                @media (max-width: 992px) {
                    .login-split-page { grid-template-columns: 1fr; }
                    .login-branding-panel { display: none; }
                }

                @media (max-width: 768px) {
                    .login-form-panel { padding: 40px 24px; }
                    .back-home-minimal { top: 20px; right: 24px; font-size: 0.8rem; }
                    .login-header-p h2 { font-size: 1.8rem; }
                    .form-grid-signup { grid-template-columns: 1fr; gap: 0; }
                    .serif-title { font-size: 3.5rem; }
                }

                .spinner-small {
                    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.2);
                    border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}

export default SignupPage;
