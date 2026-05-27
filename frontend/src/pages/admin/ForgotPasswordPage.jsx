import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMail, FiArrowLeft, FiShield, FiInfo, FiSend, FiCheckCircle } from 'react-icons/fi';
import { identifyAdmin, sendRecoveryInfo, verifyResetToken, resetPasswordWithToken } from '../../services/api';

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [recoveryStep, setRecoveryStep] = useState(1); // 1: Email, 2: Method, 3: Success
    const [loading, setLoading] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [isAutoIdentifying, setIsAutoIdentifying] = useState(false);
    const [recoveryCode, setRecoveryCode] = useState('');
    const [newPasswords, setNewPasswords] = useState({ password: '', confirm: '' });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const username = params.get('username');
        if (username && recoveryStep === 1) {
            handleAutoIdentify(username);
        }
    }, [location]);

    const handleAutoIdentify = async (username) => {
        setIsAutoIdentifying(true);
        setLoading(true);
        try {
            const res = await identifyAdmin({ username });
            setEmail(res.data.data.email);
            setRecoveryStep(2);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Identity verification failed');
        } finally {
            setLoading(false);
            setIsAutoIdentifying(false);
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your administrative email');
            return;
        }
        setLoading(true);
        try {
            // Check if email belongs to an admin
            await identifyAdmin({ username: email.split('@')[0] }); // Best effort check
            setRecoveryStep(2);
        } catch (err) {
            toast.error('Identity verification failed. Please check the email.');
        } finally {
            setLoading(false);
        }
    };

    const handleMethodSelect = async (method) => {
        setSelectedMethod(method);
        setLoading(true);
        try {
            await sendRecoveryInfo({ email, type: method });
            if (method === 'code') {
                setRecoveryStep(4); // Enter Code
            } else {
                setRecoveryStep(3); // Link Sent
            }
            toast.success(`Recovery ${method === 'link' ? 'link' : 'code'} dispatched.`);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to dispatch recovery info');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        if (recoveryCode.length !== 6) {
            toast.error('Please enter the 6-digit code');
            return;
        }
        setLoading(true);
        try {
            await verifyResetToken(recoveryCode);
            setRecoveryStep(5); // Set New Password
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid or expired code');
        } finally {
            setLoading(false);
        }
    };

    const handleResetWithCode = async (e) => {
        e.preventDefault();
        if (newPasswords.password !== newPasswords.confirm) {
            toast.error('Passwords do not match');
            return;
        }
        if (newPasswords.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        try {
            await resetPasswordWithToken({ code: recoveryCode, password: newPasswords.password });
            setRecoveryStep(6); // Success
            toast.success('System credentials synchronized. Access restored.');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update credentials');
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
                        <p>Recruitment Platform v4.0</p>
                    </div>
                    <div className="branding-footer">
                        <div className="secure-badge">
                            <FiShield /> SECURED END-TO-END
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Recovery Interface */}
            <div className="login-form-panel">
                <button className="back-home-minimal" onClick={() => navigate('/admin/login')}>
                    <FiArrowLeft /> Back to Login
                </button>

                <div className="login-glass-container animated-fade-in">
                    {/* Visual Progress Stepper */}
                    <div className="recovery-stepper">
                        <div className={`step ${recoveryStep >= 1 ? 'active' : ''} ${recoveryStep > 1 ? 'completed' : ''}`}>
                            <div className="step-number">1</div>
                            <span className="step-label">Identify</span>
                        </div>
                        <div className="step-line"></div>
                        <div className={`step ${recoveryStep >= 2 ? 'active' : ''} ${recoveryStep > 2 ? 'completed' : ''}`}>
                            <div className="step-number">2</div>
                            <span className="step-label">Method</span>
                        </div>
                        <div className="step-line"></div>
                        <div className={`step ${recoveryStep >= 3 ? 'active' : ''}`}>
                            <div className="step-number">3</div>
                            <span className="step-label">Finish</span>
                        </div>
                    </div>

                    {recoveryStep === 1 && (
                        <>
                            <div className="login-header-p">
                                <div className="access-icon">
                                    {isAutoIdentifying ? <div className="spinner-small" style={{ borderTopColor: 'var(--crimson)' }}></div> : <FiInfo />}
                                </div>
                                <h2>{isAutoIdentifying ? 'Orchestrating Identity' : 'Reset Password'}</h2>
                                <p>{isAutoIdentifying ? 'Verifying your administrative handle and locating recovery channels...' : 'Enter your email address and we\'ll help you get back into your account.'}</p>
                            </div>

                            {!isAutoIdentifying && (
                                <form className="premium-login-form" onSubmit={handleEmailSubmit}>
                                    <div className="form-group-p">
                                        <label htmlFor="recovery_email"><FiMail /> ADMINISTRATIVE EMAIL</label>
                                        <input
                                            id="recovery_email"
                                            name="recovery_email"
                                            type="email"
                                            placeholder="name@georgesteuart.com"
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="recovery-note-p">
                                        <FiShield size={14} /> 
                                        <span>For security, all password reset requests are monitored by system administrators.</span>
                                    </div>

                                    <button type="submit" className="login-btn-premium" disabled={loading}>
                                        {loading ? (
                                            <div className="spinner-small"></div>
                                        ) : (
                                            <>CONTINUE TO OPTIONS <FiSend style={{ marginLeft: 8 }} /></>
                                        )}
                                    </button>
                                </form>
                            )}
                        </>
                    )}

                    {recoveryStep === 2 && (
                        <>
                            <div className="login-header-p">
                                <div className="access-icon"><FiShield /></div>
                                <h2>Choose a Method</h2>
                                <p>How would you like to receive your password reset information?</p>
                            </div>

                            <div className="recovery-methods-grid">
                                <div className="method-card-p" onClick={() => handleMethodSelect('link')}>
                                    <div className="m-icon"><FiSend /></div>
                                    <div className="m-info">
                                        <h3>Send Email Link</h3>
                                        <p>We'll send a secure button to your inbox that you can click to reset instantly.</p>
                                    </div>
                                    <div className="m-arrow">→</div>
                                </div>

                                <div className="method-card-p" onClick={() => handleMethodSelect('code')}>
                                    <div className="m-icon"><FiShield /></div>
                                    <div className="m-info">
                                        <h3>Get Reset Code</h3>
                                        <p>We'll send a 6-digit security code that you can enter manually to verify.</p>
                                    </div>
                                    <div className="m-arrow">→</div>
                                </div>
                            </div>
                            
                            <button className="btn-text-only" onClick={() => setRecoveryStep(1)}>
                                ← Use a different email address
                            </button>
                        </>
                    )}

                    {recoveryStep === 3 && (
                        <div className="success-state-p">
                            <div className="success-icon-p"><FiSend /></div>
                            <h2>Check Your Email</h2>
                            <p>
                                We've sent a <strong>Reset Link</strong> to your email. 
                                Please check your inbox (and spam folder) and follow the instructions to reset your password.
                            </p>
                            <button className="login-btn-premium" onClick={() => navigate('/admin/login')}>
                                RETURN TO LOGIN
                            </button>
                        </div>
                    )}

                    {recoveryStep === 4 && (
                        <>
                            <div className="login-header-p">
                                <div className="access-icon"><FiShield /></div>
                                <h2>Verify Identity</h2>
                                <p>Enter the 6-digit security code sent to <strong>{email}</strong></p>
                            </div>

                            <form className="premium-login-form" onSubmit={handleVerifyCode}>
                                <div className="form-group-p">
                                    <label htmlFor="recovery_code">SECURITY CODE</label>
                                    <input
                                        id="recovery_code"
                                        name="recovery_code"
                                        type="text"
                                        placeholder="0 0 0 0 0 0"
                                        maxLength="6"
                                        className="code-input-p"
                                        autoComplete="one-time-code"
                                        value={recoveryCode}
                                        onChange={(e) => setRecoveryCode(e.target.value.replace(/\D/g, ''))}
                                        required
                                    />
                                </div>
                                
                                <button type="submit" className="login-btn-premium" disabled={loading}>
                                    {loading ? <div className="spinner-small"></div> : 'VERIFY CODE'}
                                </button>

                                <div className="resend-container-p">
                                    <p>Didn't receive a code?</p>
                                    <button type="button" className="btn-text-only" onClick={() => handleMethodSelect('code')} disabled={loading}>
                                        Resend Code
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {recoveryStep === 5 && (
                        <>
                            <div className="login-header-p">
                                <div className="access-icon"><FiShield /></div>
                                <h2>New Credentials</h2>
                                <p>Create a strong password for your administrative account.</p>
                            </div>

                            <form className="premium-login-form" onSubmit={handleResetWithCode}>
                                <div className="form-group-p">
                                    <label htmlFor="new_password">NEW PASSWORD</label>
                                    <input
                                        id="new_password"
                                        name="new_password"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Min. 6 characters"
                                        value={newPasswords.password}
                                        onChange={(e) => setNewPasswords({ ...newPasswords, password: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group-p">
                                    <label htmlFor="confirm_password">CONFIRM PASSWORD</label>
                                    <input
                                        id="confirm_password"
                                        name="confirm_password"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Repeat your password"
                                        value={newPasswords.confirm}
                                        onChange={(e) => setNewPasswords({ ...newPasswords, confirm: e.target.value })}
                                        required
                                    />
                                </div>
                                
                                <button type="submit" className="login-btn-premium" disabled={loading}>
                                    {loading ? <div className="spinner-small"></div> : 'SYNCHRONIZE CREDENTIALS'}
                                </button>
                            </form>
                        </>
                    )}

                    {recoveryStep === 6 && (
                        <div className="success-state-p">
                            <div className="success-icon-p" style={{ background: '#f0fdf4', color: '#16a34a' }}><FiCheckCircle /></div>
                            <h2>Success!</h2>
                            <p>
                                Your password has been updated and synchronized across all George Steuart security nodes. 
                                Use your new credentials to access the console.
                            </p>
                            <button className="login-btn-premium" onClick={() => navigate('/admin/login')}>
                                RETURN TO LOGIN
                            </button>
                        </div>
                    )}

                    <div className="signup-redirect">
                        Need immediate assistance? <a href="mailto:admin-support@georgesteuart.com">Contact Strategic Support</a>
                    </div>
                </div>

                <div className="login-footer-p">
                    &copy; 2026 George Steuart & Company Limited. All Rights Reserved.
                </div>
            </div>

            <style jsx="true">{`
                /* Reuse Login Styles */
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
                    width: 100%; height: 100%; object-fit: cover; opacity: 0.6; filter: saturate(0.8) contrast(1.1);
                }

                .branding-overlay {
                    position: absolute; inset: 0; background: linear-gradient(to right, #2a050b 0%, transparent 60%, rgba(0,0,0,0.6) 100%); z-index: 1;
                }

                .branding-content {
                    position: absolute; inset: 0; z-index: 2; padding: 40px; display: flex; flex-direction: column; justify-content: space-between;
                }

                .branding-logo { width: 140px; filter: brightness(0) invert(1); }

                .est-badge {
                    display: inline-block; padding: 4px 12px; background: rgba(200, 169, 81, 0.2); border: 1px solid rgba(200, 169, 81, 0.3); color: var(--gold-accent); font-size: 0.7rem; font-weight: 800; letter-spacing: 2px; border-radius: 4px; margin-bottom: 24px;
                }

                .serif-title {
                    font-family: var(--font-heading); font-size: 3.5rem; color: #fff; line-height: 0.95; margin: 0; letter-spacing: -2px;
                }

                .branding-text p { color: rgba(255,255,255,0.6); font-size: 1.1rem; margin-top: 24px; letter-spacing: 0.5px; }

                .secure-badge { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.4); font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; }

                .login-form-panel {
                    padding: 40px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; background: radial-gradient(circle at 10% 20%, #f1f5f9 0%, #ffffff 100%);
                }

                .back-home-minimal {
                    position: absolute; top: 40px; right: 40px; background: none; border: none; color: #94a3b8; font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s;
                }
                .back-home-minimal:hover { color: var(--crimson); transform: translateX(-5px); }

                .login-glass-container { width: 100%; max-width: 440px; }

                .recovery-stepper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 40px;
                }

                .step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    position: relative;
                    z-index: 2;
                }

                .step-number {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #f1f5f9;
                    border: 2px solid #e2e8f0;
                    color: #94a3b8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.85rem;
                    font-weight: 800;
                    transition: all 0.3s;
                }

                .step-label {
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: #94a3b8;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }

                .step.active .step-number {
                    background: #fff;
                    border-color: var(--gold-accent);
                    color: var(--gold-accent);
                    box-shadow: 0 0 0 4px rgba(200, 169, 81, 0.1);
                }

                .step.active .step-label {
                    color: #1e293b;
                }

                .step.completed .step-number {
                    background: var(--gold-accent);
                    border-color: var(--gold-accent);
                    color: #fff;
                }

                .step-line {
                    width: 30px;
                    height: 2px;
                    background: #e2e8f0;
                    margin-bottom: 24px; /* Align with step number center */
                }

                .login-header-p { text-align: center; margin-bottom: 40px; }
                .access-icon {
                    width: 64px; height: 64px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 1.6rem; color: var(--crimson); box-shadow: 0 10px 20px rgba(0,0,0,0.02);
                }

                .login-header-p h2 { font-family: var(--font-heading); font-size: 1.8rem; margin: 0; color: #1e293b; }
                .login-header-p p { color: #64748b; margin-top: 8px; font-size: 0.9rem; }

                .form-group-p { margin-bottom: 24px; }
                .form-group-p label {
                    display: block; font-size: 0.65rem; font-weight: 800; color: #94a3b8; margin-bottom: 10px; letter-spacing: 1.5px; display: flex; align-items: center; gap: 6px;
                }

                .form-group-p input {
                    width: 100%; padding: 16px 20px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; font-size: 1rem; color: #1e293b; transition: all 0.2s; box-shadow: var(--shadow-sm);
                }
                .form-group-p input:focus {
                    border-color: var(--gold-accent); box-shadow: 0 0 0 4px rgba(200, 169, 81, 0.1); transform: translateY(-2px); outline: none;
                }

                .recovery-note-p {
                    display: flex; gap: 10px; padding: 16px; background: rgba(148, 163, 184, 0.05); border-radius: 12px; margin-bottom: 32px; color: #64748b; font-size: 0.8rem; line-height: 1.4;
                }

                .recovery-methods-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    width: 100%;
                    margin-bottom: 24px;
                }

                .method-card-p {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 20px;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
                    text-align: left;
                }

                .method-card-p:hover {
                    border-color: var(--gold-accent);
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.05);
                }

                .method-card-p .m-icon {
                    width: 48px;
                    height: 48px;
                    background: #f8fafc;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.4rem;
                    color: var(--crimson);
                    transition: all 0.3s;
                }

                .method-card-p:hover .m-icon {
                    background: var(--crimson);
                    color: #fff;
                }

                .method-card-p .m-info {
                    flex: 1;
                }

                .method-card-p .m-info h3 {
                    font-size: 1rem;
                    font-weight: 800;
                    color: #1e293b;
                    margin: 0;
                }

                .method-card-p .m-info p {
                    font-size: 0.8rem;
                    color: #64748b;
                    margin: 4px 0 0;
                    line-height: 1.4;
                }

                .method-card-p .m-arrow {
                    font-size: 1.2rem;
                    color: #cbd5e1;
                    transition: transform 0.3s;
                }

                .method-card-p:hover .m-arrow {
                    transform: translateX(5px);
                    color: var(--gold-accent);
                }

                .btn-text-only {
                    background: none;
                    border: none;
                    color: #94a3b8;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 10px;
                    transition: color 0.2s;
                }

                .btn-text-only:hover {
                    color: var(--crimson);
                    text-decoration: underline;
                }

                .login-btn-premium {
                    width: 100%; padding: 18px; background: #2a050b; color: #fff; border: none; border-radius: 18px; font-weight: 800; font-size: 1rem; letter-spacing: 1px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; box-shadow: 0 15px 30px rgba(42, 5, 11, 0.2);
                }

                .login-btn-premium:hover { background: #4a0914; transform: translateY(-4px); box-shadow: 0 20px 40px rgba(42, 5, 11, 0.3); }

                .signup-redirect { text-align: center; margin-top: 32px; font-size: 0.9rem; color: #64748b; }
                .signup-redirect a { color: var(--gold-accent); font-weight: 700; text-decoration: none; }

                .login-footer-p { position: absolute; bottom: 40px; font-size: 0.75rem; color: #94a3b8; letter-spacing: 0.5px; }

                .success-state-p { text-align: center; }
                .success-icon-p {
                    width: 80px; height: 80px; background: #f0fdf4; color: #166534; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 2rem;
                }
                .success-state-p h2 { font-family: var(--font-heading); font-size: 2rem; color: #1e293b; margin-bottom: 16px; }
                .success-state-p p { color: #64748b; line-height: 1.6; margin-bottom: 32px; }

                .code-input-p {
                    text-align: center;
                    font-size: 2.5rem !important;
                    font-weight: 800;
                    letter-spacing: 12px !important;
                    font-family: monospace;
                    padding: 20px !important;
                    background: #f8fafc !important;
                    border-color: var(--gold-accent) !important;
                    border-radius: 20px;
                    width: 100%;
                    box-shadow: 0 10px 20px rgba(200, 169, 81, 0.1) !important;
                }

                .resend-container-p {
                    margin-top: 32px;
                    text-align: center;
                    padding: 16px;
                    background: #f8fafc;
                    border-radius: 12px;
                }
                .resend-container-p p {
                    font-size: 0.85rem;
                    color: #64748b;
                    margin-bottom: 4px;
                }

                .animated-fade-in { animation: fadeIn 0.6s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                /* Mobile Optimization */
                @media (max-width: 768px) {
                    .login-form-panel { padding: 40px 20px; }
                    .back-home-minimal { top: 20px; right: 20px; font-size: 0.8rem; }
                    .login-header-p h2 { font-size: 1.8rem; }
                    .serif-title { font-size: 3rem; }
                    .login-glass-container { padding: 40px 24px; }
                }

                @media (max-width: 480px) {
                    .serif-title { font-size: 2.2rem; }
                    .code-input-p {
                        font-size: 1.5rem !important;
                        letter-spacing: 3px !important;
                        padding: 12px 4px !important;
                    }
                    .method-card-p { padding: 14px; }
                    .login-header-p h2 { font-size: 1.4rem; }
                    .login-glass-container { padding: 32px 20px; }
                }

                .spinner-small {
                    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}

export default ForgotPasswordPage;
