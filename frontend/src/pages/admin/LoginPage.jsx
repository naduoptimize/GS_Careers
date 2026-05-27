import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/api';
import { toast } from 'react-toastify';
import { FiUser, FiLock, FiArrowLeft, FiShield, FiCheckCircle } from 'react-icons/fi';

function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.username || !form.password) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const res = await login(form);
            localStorage.setItem('gs_admin_token', res.data.data.token);
            localStorage.setItem('gs_admin_data', JSON.stringify(res.data.data.admin));
            toast.success('Access Granted. Orchestrating Console...');
            navigate('/admin');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-split-page">
            {/* Left: Branding & Imagineering */}
            <div className="login-branding-panel">
                <div className="branding-overlay"></div>
                <img src="/admin-branding.png" alt="Branding" className="branding-bg" />
                <div className="branding-content">
                    <img src="/gs-logo.png" alt="GS Logo" className="branding-logo" />
                    <div className="branding-text">
                        <span className="est-badge">ESTD 1835</span>
                        <h1 className="serif-title">Heritage. <br/>Trust. <br/>Excellence.</h1>
                        <p>Recruitment Orchestration Console v4.0</p>
                    </div>
                    <div className="branding-footer">
                        <div className="secure-badge">
                            <FiShield /> SECURED END-TO-END
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Login Interface */}
            <div className="login-form-panel">
                <button className="back-home-minimal" onClick={() => navigate('/')}>
                    <FiArrowLeft /> Return to Portals
                </button>

                <div className="login-glass-container animated-fade-in">
                    <div className="login-header-p">
                        <div className="access-icon"><FiLock /></div>
                        <h2>System Access</h2>
                        <p>Please provide your administrative credentials to continue.</p>
                    </div>

                    <form className="premium-login-form" onSubmit={handleSubmit}>
                        <div className="form-group-p">
                            <label htmlFor="username"><FiUser /> USERNAME</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter operational handle"
                                autoComplete="username"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group-p">
                            <label htmlFor="password"><FiLock /> SECURITY PASSWORD</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                            />
                        </div>
                        
                        <div className="auth-actions">
                            <label className="remember-me">
                                <input type="checkbox" /> Keep me signed in
                            </label>
                            <button 
                                type="button" 
                                onClick={() => {
                                    if (!form.username) {
                                        toast.warning('Please enter your username first');
                                        return;
                                    }
                                    navigate(`/admin/forgot-password?username=${encodeURIComponent(form.username)}`);
                                }}
                                className="forgot-pass-btn"
                                style={{ background: 'none', border: 'none', color: 'var(--crimson)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                            >
                                Forgot?
                            </button>
                        </div>

                        <button type="submit" className="login-btn-premium" disabled={loading}>
                            {loading ? (
                                <div className="spinner-small"></div>
                            ) : (
                                <>AUTHORIZE SESSION <FiCheckCircle style={{ marginLeft: 8 }} /></>
                            )}
                        </button>
                    </form>

                    <div className="signup-redirect">
                        Don't have a tactical account? <Link to="/admin/signup">Register Super Admin</Link>
                    </div>
                </div>

                <div className="login-footer-p">
                    &copy; 2026 George Steuart & Company Limited. All Rights Reserved.
                </div>
            </div>

            <style jsx="true">{`
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

                /* Branding Panel */
                .login-branding-panel {
                    position: relative;
                    height: 100vh;
                    overflow: hidden;
                    background: #2a050b;
                }

                .branding-bg {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.6;
                    filter: saturate(0.8) contrast(1.1);
                }

                .branding-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to right, #2a050b 0%, transparent 60%, rgba(0,0,0,0.6) 100%);
                    z-index: 1;
                }

                .branding-content {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    padding: 60px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .branding-logo { width: 140px; filter: brightness(0) invert(1); }

                .est-badge {
                    display: inline-block;
                    padding: 4px 12px;
                    background: rgba(200, 169, 81, 0.2);
                    border: 1px solid rgba(200, 169, 81, 0.3);
                    color: var(--gold-accent);
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    border-radius: 4px;
                    margin-bottom: 24px;
                }

                .serif-title {
                    font-family: var(--font-heading);
                    font-size: 3.5rem;
                    color: #fff;
                    line-height: 0.95;
                    margin: 0;
                    letter-spacing: -2px;
                }

                .branding-text p {
                    color: rgba(255,255,255,0.6);
                    font-size: 1.1rem;
                    margin-top: 24px;
                    letter-spacing: 0.5px;
                }

                .secure-badge {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: rgba(255,255,255,0.4);
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 1px;
                }

                /* Form Panel */
                .login-form-panel {
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    background: radial-gradient(circle at 10% 20%, #f1f5f9 0%, #ffffff 100%);
                }

                .back-home-minimal {
                    position: absolute;
                    top: 40px;
                    right: 40px;
                    background: none;
                    border: none;
                    color: #94a3b8;
                    font-size: 0.9rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .back-home-minimal:hover { color: var(--crimson); transform: translateX(-5px); }

                .login-glass-container {
                    width: 100%;
                    max-width: 440px;
                }

                .login-header-p { text-align: center; margin-bottom: 40px; }
                .access-icon {
                    width: 64px; height: 64px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    display: flex;
                    align-items: center; justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 1.6rem;
                    color: var(--crimson);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.02);
                }

                .login-header-p h2 { font-family: var(--font-heading); font-size: 1.8rem; margin: 0; color: #1e293b; }
                .login-header-p p { color: #64748b; margin-top: 8px; font-size: 0.9rem; }

                .form-group-p { margin-bottom: 24px; }
                .form-group-p label {
                    display: block;
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #94a3b8;
                    margin-bottom: 10px;
                    letter-spacing: 1.5px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .form-group-p input {
                    width: 100%;
                    padding: 16px 20px;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    font-size: 1rem;
                    color: #1e293b;
                    transition: all 0.2s;
                    box-shadow: var(--shadow-sm);
                }

                .form-group-p input:focus {
                    border-color: var(--gold-accent);
                    box-shadow: 0 0 0 4px rgba(200, 169, 81, 0.1);
                    transform: translateY(-2px);
                    outline: none;
                }

                .auth-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                    font-size: 0.85rem;
                }

                .remember-me { color: #64748b; display: flex; align-items: center; gap: 8px; cursor: pointer; }
                .forgot-pass { color: var(--crimson); font-weight: 700; cursor: pointer; }

                .login-btn-premium {
                    width: 100%;
                    padding: 18px;
                    background: #2a050b;
                    color: #fff;
                    border: none;
                    border-radius: 18px;
                    font-weight: 800;
                    font-size: 1rem;
                    letter-spacing: 1px;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 15px 30px rgba(42, 5, 11, 0.2);
                }

                .login-btn-premium:hover {
                    background: #4a0914;
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px rgba(42, 5, 11, 0.3);
                }

                .signup-redirect {
                    text-align: center;
                    margin-top: 32px;
                    font-size: 0.9rem;
                    color: #64748b;
                }

                .signup-redirect a { color: var(--gold-accent); font-weight: 700; text-decoration: none; }
                .signup-redirect a:hover { text-decoration: underline; }

                .login-footer-p {
                    position: absolute;
                    bottom: 40px;
                    font-size: 0.75rem;
                    color: #94a3b8;
                    letter-spacing: 0.5px;
                }

                .animated-fade-in { animation: fadeIn 0.6s ease-out; }
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
                    .serif-title { font-size: 3.5rem; }
                }

                .spinner-small {
                    width: 20px; height: 20px;
                    border: 2px solid rgba(255,255,255,0.2);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}

export default LoginPage;
