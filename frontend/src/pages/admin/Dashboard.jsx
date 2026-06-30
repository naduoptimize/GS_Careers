import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStats, getAllVacancies, API_BASE } from "../../services/api";
const BACKEND_ROOT = API_BASE.replace('/api', '');
import {
    FiBriefcase, FiUsers, FiCheckCircle, FiClock,
    FiPlus, FiArrowRight, FiFileText, FiTrendingUp,
    FiTarget, FiActivity, FiLayers, FiZap, FiCalendar,
    FiBarChart2, FiStar, FiAward, FiUserPlus
} from "react-icons/fi";
import { formatDate, daysLeft } from "../../utils/constants";

// Animated counter hook
function useAnimatedCounter(end, duration = 1200, start = true) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start || !end) { setCount(end || 0); return; }
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [end, start]);
    return count;
}

function Dashboard({ admin }) {
    const [stats, setStats] = useState(null);
    const [recentVacancies, setRecentVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animReady, setAnimReady] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [statsRes, vacRes] = await Promise.all([getStats(), getAllVacancies()]);
            setStats(statsRes?.data?.data || null);
            setRecentVacancies((vacRes?.data?.data || []).slice(0, 5));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setTimeout(() => setAnimReady(true), 100);
        }
    };

    const totalVac = useAnimatedCounter(stats?.total_vacancies || 0, 1000, animReady);
    const activeVac = useAnimatedCounter(stats?.active_vacancies || 0, 1000, animReady);
    const totalApps = useAnimatedCounter(stats?.total_applications || 0, 1200, animReady);
    const talentPool = useAnimatedCounter(stats?.talent_pool_count || 0, 1000, animReady);

    if (loading) {
        return (
            <div className="dashboard-loading-screen">
                <div className="loading-orb"></div>
            </div>
        );
    }

    const firstName = (admin?.full_name || admin?.username || "Admin").split(" ")[0];
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    const conversionRate = stats?.total_vacancies > 0 
        ? Math.round((stats?.active_vacancies / stats?.total_vacancies) * 100) 
        : 0;

    return (
        <div className="premium-dashboard-container">
            {/* ── CINEMATIC HERO ── */}
            <div className="dashboard-hero-premium">
                <div className="hero-content-p">
                    <div className="hero-badge-p"><FiActivity /> System Executive Suite</div>
                    <h1 className="hero-title-p">{greeting}, {firstName}</h1>
                    <p className="hero-subtitle-p">George Steuart Recruitment Orchestration Console · Established 1835</p>
                </div>
                <div className="hero-actions-p">
                    {admin.role !== 'super_admin' && (
                        <button className="btn-hero-p primary" onClick={() => navigate("/admin/vacancies/create")}>
                            <FiPlus /> New Vacancy
                        </button>
                    )}
                    <button className="btn-hero-p secondary" onClick={() => navigate("/admin/applicants")}>
                        <FiUsers /> Review Pipeline
                    </button>
                </div>
                <div className="hero-bg-accent"></div>
                <div className="hero-grid-pattern"></div>
            </div>

            {/* ── ANIMATED STAT CARDS ── */}
            <div className="stats-mosaic-grid admin-grid-4">
                <div className="db-stat-card gold" style={{ animationDelay: '0.1s' }}>
                    <div className="db-s-header">
                        <span className="db-s-label">Total Listings</span>
                        <div className="db-s-icon"><FiBriefcase /></div>
                    </div>
                    <span className="db-s-value">{totalVac}</span>
                    <div className="db-s-trend"><FiTrendingUp /> Global Overview</div>
                </div>
                <div className="db-stat-card green" style={{ animationDelay: '0.2s' }}>
                    <div className="db-s-header">
                        <span className="db-s-label">Live Channels</span>
                        <div className="db-s-icon"><FiCheckCircle /></div>
                    </div>
                    <span className="db-s-value">{activeVac}</span>
                    <div className="db-s-trend positive"><FiBarChart2 /> {conversionRate}% Active Rate</div>
                </div>
                <div className="db-stat-card blue" style={{ animationDelay: '0.3s' }}>
                    <div className="db-s-header">
                        <span className="db-s-label">Engagement</span>
                        <div className="db-s-icon"><FiUsers /></div>
                    </div>
                    <span className="db-s-value">{totalApps}</span>
                    <div className="db-s-trend"><FiTrendingUp /> Total Submissions</div>
                </div>
                <div className="db-stat-card purple" style={{ animationDelay: '0.4s' }}>
                    <div className="db-s-header">
                        <span className="db-s-label">Talent Reserve</span>
                        <div className="db-s-icon"><FiTarget /></div>
                    </div>
                    <span className="db-s-value">{talentPool}</span>
                    <div className="db-s-trend"><FiTrendingUp /> Future Insights</div>
                </div>
            </div>

            <div className="dashboard-main-flow">
                {/* ── LEFT: ACTIVITY FEEDS ── */}
                <div className="main-activity-content">
                    {/* RECENT VACANCIES */}
                    <div className="activity-card-p">
                        <div className="card-header-p">
                            <div className="ch-title">
                                <FiLayers />
                                <h3>Active Recruitment Channels</h3>
                            </div>
                            <button className="ch-link" onClick={() => navigate("/admin/vacancies")}>
                                All Channels <FiArrowRight />
                            </button>
                        </div>
                        <div className="activity-list-p">
                            {recentVacancies.length === 0 ? (
                                <div className="empty-state-p">No active channels found.</div>
                            ) : (
                                recentVacancies.map((v, i) => (
                                    <div className="vacancy-item-mini" key={v.id} 
                                        style={{ animationDelay: `${i * 0.08}s` }}
                                        onClick={() => navigate("/admin/applicants?vacancy_id=" + v.id)}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                                            <img 
                                                src={v.company_logo ? `${BACKEND_ROOT}/uploads/logos/${v.company_logo}` : '/gs-logo.png'} 
                                                alt={v.company_name}
                                                onError={(e) => e.target.src = '/gs-logo.png'}
                                                style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '8px', background: '#fff', border: '1px solid #e2e8f0', padding: '3px' }}
                                            />
                                            <div className="v-info">
                                                <strong>{v.title}</strong>
                                                <span>{v.company_name}</span>
                                            </div>
                                        </div>
                                        <div className="v-metric">
                                            <span className="count">{v.application_count || 0}</span>
                                            <span className="lbl">Applicants</span>
                                        </div>
                                        <div className="v-status">
                                            <span className={`pill ${daysLeft(v.expire_date) > 0 ? 'live' : 'ending'}`}>
                                                {daysLeft(v.expire_date) > 0 ? '● LIVE' : '○ ENDED'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* RECENT APPLICANTS FEED */}
                    <div className="activity-card-p">
                        <div className="card-header-p">
                            <div className="ch-title">
                                <FiZap />
                                <h3>Latest Applicant Pulse</h3>
                            </div>
                            <button className="ch-link" onClick={() => navigate("/admin/applicants")}>
                                View Pipeline <FiArrowRight />
                            </button>
                        </div>
                        <div className="applicant-pulse-list">
                            {stats?.recent_applications?.length > 0 ? (
                                stats.recent_applications.map((app, i) => (
                                    <div className="pulse-item" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
                                        <div className="p-avatar" style={{ background: `hsl(${(i * 47 + 20) % 360}, 60%, 92%)`, color: `hsl(${(i * 47 + 20) % 360}, 60%, 30%)` }}>
                                            {app.first_name[0]}{app.last_name[0]}
                                        </div>
                                        <div className="p-text">
                                            <p><strong>{app.first_name} {app.last_name}</strong> applied for <span>{app.vacancy_title}</span></p>
                                            <span className="p-time"><FiClock /> {formatDate(app.applied_at)}</span>
                                        </div>
                                        <div className="pulse-dot"></div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state-p">No recent pulses detected.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: COMMAND SIDEBAR ── */}
                <div className="command-sidebar-p">
                    {/* UPCOMING INTERVIEWS */}
                    <div className="upcoming-interviews-card">
                        <div className="ui-header">
                            <FiCalendar />
                            <h3>Upcoming Interviews</h3>
                            {stats?.upcoming_interviews?.length > 0 && (
                                <span className="ui-count-badge">{stats.upcoming_interviews.length}</span>
                            )}
                        </div>
                        <div className="ui-list">
                            {stats?.upcoming_interviews?.length > 0 ? (
                                stats.upcoming_interviews.map((iv, i) => (
                                    <div className="ui-item" key={iv.id || i} onClick={() => navigate("/admin/applicants?search=" + encodeURIComponent(iv.first_name + " " + iv.last_name))}>
                                        <div className="ui-date-box">
                                            <span className="ui-day">{new Date(iv.interview_date).getDate()}</span>
                                            <span className="ui-month">{new Date(iv.interview_date).toLocaleString('default', { month: 'short' })}</span>
                                        </div>
                                        <div className="ui-details">
                                            <strong>{iv.first_name} {iv.last_name}</strong>
                                            <span>{iv.vacancy_title}</span>
                                            <div className="ui-meta">
                                                <FiClock size={10} /> {iv.interview_time} · {iv.interview_type}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state-p" style={{ padding: '0px', textAlign: 'left', background: 'transparent', border: 'none' }}>
                                    No upcoming interviews scheduled.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="shortcut-mosaic-card">
                        <label>Command Shortcuts</label>
                        <div className="shortcut-grid-p admin-grid-2">
                            <div className="shortcut-tile" onClick={() => navigate("/admin/applicants")}>
                                <div className="shortcut-icon blue"><FiUsers /></div>
                                <span>Applicants</span>
                            </div>
                            <div className="shortcut-tile" onClick={() => navigate("/admin/talent-pool")}>
                                <div className="shortcut-icon purple"><FiTarget /></div>
                                <span>Pool</span>
                            </div>
                            <div className="shortcut-tile" onClick={() => navigate("/admin/vacancies")}>
                                <div className="shortcut-icon gold"><FiFileText /></div>
                                <span>Posts</span>
                            </div>
                            {admin.role === 'super_admin' ? (
                                <div className="shortcut-tile" onClick={() => navigate("/admin/admins")}>
                                    <div className="shortcut-icon green"><FiUserPlus /></div>
                                    <span>Admins</span>
                                </div>
                            ) : (
                                <div className="shortcut-tile" onClick={() => navigate("/admin/vacancies/create")}>
                                    <div className="shortcut-icon green"><FiPlus /></div>
                                    <span>Post Job</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SYSTEM STATUS */}
                    <div className="status-console-card">
                        <div className="console-header">
                            <div className="live-dot pulse"></div>
                            <span>System Status: Healthy</span>
                        </div>
                        <div className="status-metrics">
                            <div className="status-metric">
                                <span>Uptime</span>
                                <div className="metric-bar"><div className="metric-fill" style={{ width: '99%' }}></div></div>
                                <span className="metric-val">99%</span>
                            </div>
                            <div className="status-metric">
                                <span>Database</span>
                                <div className="metric-bar"><div className="metric-fill" style={{ width: '95%' }}></div></div>
                                <span className="metric-val">Sync</span>
                            </div>
                        </div>
                        <p>All recruitment services are operational. GS legacy cloud is synchronized.</p>
                        <div className="console-footer">
                            <span>V 2.5.0 · Premium Edition</span>
                        </div>
                    </div>

                    <div className="heritage-footer-p">
                        <img src="/gs-logo.png" alt="GS" />
                        <p>George Steuart & Company<br/>Trusted since 1835</p>
                    </div>
                </div>
            </div>

            <style jsx="true">{`
                .premium-dashboard-container {
                    padding: 0;
                    animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* LOADING */
                .dashboard-loading-screen {
                    min-height: 60vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .loading-orb {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    border: 3px solid rgba(139,26,43,0.1);
                    border-top-color: var(--crimson);
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* HERO */
                .dashboard-hero-premium {
                    background: linear-gradient(135deg, var(--crimson-dark) 0%, var(--crimson) 100%);
                    border-radius: 24px;
                    padding: 36px 40px;
                    margin-bottom: 24px;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid rgba(255,255,255,0.05);
                    box-shadow: 0 24px 60px rgba(139, 26, 43, 0.25);
                }

                .hero-grid-pattern {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
                    background-size: 28px 28px;
                    pointer-events: none;
                }

                .hero-bg-accent {
                    position: absolute;
                    top: -80px;
                    right: -80px;
                    width: 380px;
                    height: 380px;
                    background: radial-gradient(circle, rgba(200, 169, 81, 0.2) 0%, transparent 65%);
                    pointer-events: none;
                    z-index: 1;
                }

                .hero-content-p { position: relative; z-index: 2; }

                .hero-badge-p {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(200, 169, 81, 0.15);
                    border: 1px solid rgba(200, 169, 81, 0.25);
                    color: #C8A951;
                    padding: 5px 14px;
                    border-radius: 100px;
                    font-size: 0.68rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 14px;
                }

                .hero-title-p {
                    font-family: var(--font-heading);
                    font-size: 2rem;
                    color: #fff;
                    margin: 0 0 8px 0;
                    letter-spacing: -0.5px;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.3);
                }

                .hero-subtitle-p {
                    color: rgba(255,255,255,0.55);
                    font-size: 0.85rem;
                    max-width: 500px;
                }

                .hero-actions-p {
                    display: flex;
                    gap: 12px;
                    z-index: 2;
                    position: relative;
                }

                .btn-hero-p {
                    padding: 11px 22px;
                    border-radius: 14px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: none;
                    font-size: 0.88rem;
                    font-family: var(--font-body);
                }
                .btn-hero-p.primary { background: #C8A951; color: #1a1a2e; box-shadow: 0 8px 24px rgba(200,169,81,0.3); }
                .btn-hero-p.primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 14px 30px rgba(200,169,81,0.4); }
                .btn-hero-p.secondary { background: rgba(255,255,255,0.08); color: #fff; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.15); }
                .btn-hero-p.secondary:hover { background: rgba(255,255,255,0.14); transform: translateY(-3px); }

                /* STAT MOSAIC */
                .stats-mosaic-grid { display: grid; gap: 20px; margin-bottom: 24px; }

                .db-stat-card {
                    background: #fff;
                    padding: 24px;
                    border-radius: 20px;
                    border: 1px solid rgba(0,0,0,0.05);
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    animation: slideUpFade 0.5s both;
                    box-shadow: 0 2px 16px rgba(0,0,0,0.04);
                    position: relative;
                    overflow: hidden;
                }

                .db-stat-card.gold { background: linear-gradient(180deg, #fff 0%, #fffdf4 100%); }
                .db-stat-card.green { background: linear-gradient(180deg, #fff 0%, #f4fcf9 100%); }
                .db-stat-card.blue { background: linear-gradient(180deg, #fff 0%, #f4f8ff 100%); }
                .db-stat-card.purple { background: linear-gradient(180deg, #fff 0%, #f8f4ff 100%); }

                @keyframes slideUpFade {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .db-stat-card:hover {
                    transform: translateY(-6px);
                }
                .db-stat-card.gold:hover { box-shadow: 0 20px 35px rgba(200, 169, 81, 0.12); border-color: rgba(200, 169, 81, 0.35); }
                .db-stat-card.green:hover { box-shadow: 0 20px 35px rgba(16, 185, 129, 0.12); border-color: rgba(16, 185, 129, 0.35); }
                .db-stat-card.blue:hover { box-shadow: 0 20px 35px rgba(59, 130, 246, 0.12); border-color: rgba(59, 130, 246, 0.35); }
                .db-stat-card.purple:hover { box-shadow: 0 20px 35px rgba(139, 92, 246, 0.12); border-color: rgba(139, 92, 246, 0.35); }

                /* Subtle glowing top border for card hover accent */
                .db-stat-card::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 4px;
                    transition: all 0.3s;
                    opacity: 0.85;
                }
                .db-stat-card.gold::after { background: #C8A951; }
                .db-stat-card.green::after { background: #10b981; }
                .db-stat-card.blue::after { background: #3b82f6; }
                .db-stat-card.purple::after { background: #8b5cf6; }

                .db-s-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .db-s-label {
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .db-s-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.15rem;
                    transition: all 0.3s ease;
                }

                .db-stat-card.gold .db-s-icon { background: rgba(200, 169, 81, 0.1); color: #C8A951; }
                .db-stat-card.green .db-s-icon { background: rgba(16, 185, 129, 0.08); color: #10b981; }
                .db-stat-card.blue .db-s-icon { background: rgba(59, 130, 246, 0.08); color: #3b82f6; }
                .db-stat-card.purple .db-s-icon { background: rgba(139, 92, 246, 0.08); color: #8b5cf6; }

                .db-s-value {
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: #1e293b;
                    line-height: 1.1;
                    font-variant-numeric: tabular-nums;
                    margin-top: 4px;
                }

                .db-s-trend {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #94a3b8;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .db-s-trend.positive { color: #10b981; }

                .db-s-progress-bar {
                    height: 4px;
                    background: #f1f5f9;
                    border-radius: 100px;
                    overflow: hidden;
                    margin-top: 2px;
                }
                .db-s-progress-fill {
                    height: 100%;
                    border-radius: 100px;
                    transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .gold-fill { background: linear-gradient(90deg, #C8A951, #E5C366); }
                .green-fill { background: linear-gradient(90deg, #10b981, #34d399); }
                .blue-fill { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
                .purple-fill { background: linear-gradient(90deg, #8b5cf6, #a78bfa); }

                /* MAIN FLOW */
                .dashboard-main-flow {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: 24px;
                }

                .activity-card-p {
                    background: #fff;
                    border-radius: 20px;
                    border: 1px solid rgba(0,0,0,0.05);
                    padding: 22px;
                    margin-bottom: 24px;
                    box-shadow: 0 2px 16px rgba(0,0,0,0.03);
                }

                .card-header-p {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 18px;
                    padding-bottom: 14px;
                    border-bottom: 1px solid #f1f5f9;
                }

                .ch-title { display: flex; align-items: center; gap: 10px; color: var(--crimson); }
                .ch-title h3 { font-size: 1rem; font-weight: 800; margin: 0; color: #1e293b; }
                .ch-link { background: none; border: none; color: #C8A951; font-weight: 700; font-size: 0.82rem; display: flex; align-items: center; gap: 6px; cursor: pointer; transition: gap 0.2s; }
                .ch-link:hover { gap: 10px; }

                /* VACANCY LIST */
                .activity-list-p { display: flex; flex-direction: column; gap: 10px; }
                .vacancy-item-mini {
                    padding: 14px 18px;
                    border-radius: 16px;
                    border: 1px solid transparent;
                    background: #f8fafc;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    transition: all 0.25s;
                    animation: slideUpFade 0.4s both;
                }
                .vacancy-item-mini:hover { border-color: rgba(0,0,0,0.06); background: #fff; transform: translateX(6px); box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
                .v-info { display: flex; flex-direction: column; flex: 1; }
                .v-info strong { font-size: 0.9rem; color: #1e293b; font-weight: 700; }
                .v-info span { font-size: 0.78rem; color: #94a3b8; margin-top: 2px; }
                .v-metric { text-align: center; padding: 0 20px; }
                .v-metric .count { display: block; font-size: 1.1rem; font-weight: 800; color: var(--crimson); }
                .v-metric .lbl { font-size: 0.62rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
                .pill { padding: 4px 12px; border-radius: 100px; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.5px; }
                .pill.live { background: rgba(16, 185, 129, 0.1); color: #10b981; }
                .pill.ending { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

                /* APPLICANT PULSE */
                .applicant-pulse-list { display: flex; flex-direction: column; gap: 16px; }
                .pulse-item {
                    display: flex;
                    gap: 14px;
                    align-items: center;
                    animation: slideUpFade 0.4s both;
                    position: relative;
                }
                .p-avatar { width: 42px; height: 42px; border-radius: 12px; font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .p-text p { margin: 0; font-size: 0.88rem; color: #1e293b; line-height: 1.4; }
                .p-text p span { color: var(--crimson); font-weight: 700; }
                .p-time { font-size: 0.73rem; color: #94a3b8; display: flex; align-items: center; gap: 4px; margin-top: 3px; }
                .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; flex-shrink: 0; box-shadow: 0 0 6px rgba(16,185,129,0.5); margin-left: auto; }

                /* COMMAND SIDEBAR */
                .command-sidebar-p { display: flex; flex-direction: column; gap: 20px; }

                .upcoming-interviews-card {
                    background: #fff;
                    border-radius: 20px;
                    border: 1px solid rgba(0,0,0,0.05);
                    padding: 20px;
                    box-shadow: 0 2px 16px rgba(0,0,0,0.03);
                }
                .ui-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
                .ui-header svg { color: var(--crimson); font-size: 1.1rem; }
                .ui-header h3 { font-size: 1rem; font-weight: 800; margin: 0; color: #1e293b; flex: 1; }
                .ui-count-badge { background: var(--crimson); color: #fff; font-size: 0.65rem; font-weight: 800; padding: 2px 8px; border-radius: 100px; }
                .ui-list { display: flex; flex-direction: column; gap: 10px; }
                .ui-item {
                    display: flex;
                    gap: 14px;
                    padding: 14px;
                    background: #f8fafc;
                    border-radius: 14px;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }
                .ui-item:hover { background: #fff; border-color: rgba(200,169,81,0.2); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.05); }
                .ui-date-box { 
                    background: linear-gradient(135deg, #fff1f2, #fff);
                    border: 1px solid #fee2e2; 
                    border-radius: 10px; 
                    min-width: 50px; height: 50px; 
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center; 
                    color: var(--crimson); flex-shrink: 0;
                }
                .ui-day { font-size: 1.1rem; font-weight: 800; line-height: 1.1; }
                .ui-month { font-size: 0.6rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
                .ui-details { display: flex; flex-direction: column; justify-content: center; flex: 1; }
                .ui-details strong { font-size: 0.88rem; color: #1e293b; font-weight: 800; margin-bottom: 2px; }
                .ui-details span { font-size: 0.75rem; color: #64748b; margin-bottom: 4px; }
                .ui-meta { font-size: 0.7rem; color: #C8A951; font-weight: 700; display: flex; align-items: center; gap: 4px; }

                /* SHORTCUT */
                .shortcut-mosaic-card { background: #fff; border-radius: 20px; border: 1px solid rgba(0,0,0,0.05); padding: 20px; box-shadow: 0 2px 16px rgba(0,0,0,0.03); }
                .shortcut-mosaic-card label { display: block; font-size: 0.65rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; }
                .shortcut-grid-p { display: grid; gap: 12px; }
                .shortcut-tile {
                    background: #f8fafc;
                    padding: 16px 12px;
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: 1px solid transparent;
                }
                .shortcut-tile:hover { background: #fff; border-color: rgba(0,0,0,0.06); transform: translateY(-4px) scale(1.03); box-shadow: 0 8px 20px rgba(0,0,0,0.06); }
                .shortcut-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
                .shortcut-icon.blue { background: rgba(59,130,246,0.1); color: #3b82f6; }
                .shortcut-icon.purple { background: rgba(139,92,246,0.1); color: #8b5cf6; }
                .shortcut-icon.gold { background: rgba(200,169,81,0.1); color: #C8A951; }
                .shortcut-icon.green { background: rgba(16,185,129,0.1); color: #10b981; }
                .shortcut-tile span { font-size: 0.82rem; font-weight: 700; color: #475569; }

                /* STATUS */
                .status-console-card {
                    background: linear-gradient(135deg, #1a0208, #2a050b);
                    border-radius: 20px;
                    padding: 20px;
                    color: rgba(255,255,255,0.75);
                    border: 1px solid rgba(200,169,81,0.12);
                }
                .console-header { display: flex; align-items: center; gap: 10px; color: #fff; font-weight: 700; font-size: 0.88rem; margin-bottom: 14px; }
                .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; flex-shrink: 0; }
                .pulse { animation: pulseAnim 2s infinite; }
                @keyframes pulseAnim { 0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.7); } 70% { box-shadow: 0 0 0 8px rgba(16,185,129,0); } 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); } }

                .status-metrics { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }
                .status-metric { display: flex; align-items: center; gap: 10px; font-size: 0.72rem; }
                .status-metric > span:first-child { flex: 0 0 56px; color: rgba(255,255,255,0.5); font-weight: 600; }
                .metric-bar { flex: 1; height: 3px; background: rgba(255,255,255,0.1); border-radius: 100px; overflow: hidden; }
                .metric-fill { height: 100%; background: linear-gradient(90deg, #10b981, #34d399); border-radius: 100px; }
                .metric-val { flex: 0 0 32px; text-align: right; color: rgba(255,255,255,0.6); font-size: 0.68rem; font-weight: 700; }

                .status-console-card p { font-size: 0.78rem; line-height: 1.55; margin-bottom: 14px; }
                .console-footer { font-size: 0.62rem; opacity: 0.4; text-transform: uppercase; letter-spacing: 1.5px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px; }

                .heritage-footer-p { text-align: center; padding: 16px 0; }
                .heritage-footer-p img { width: 36px; filter: grayscale(1); opacity: 0.25; margin-bottom: 8px; }
                .heritage-footer-p p { font-size: 0.7rem; color: #94a3b8; font-weight: 600; line-height: 1.6; }

                /* EMPTY */
                .empty-state-p {
                    text-align: center;
                    padding: 32px;
                    color: #94a3b8;
                    font-size: 0.88rem;
                    background: #fafafa;
                    border-radius: 12px;
                    border: 1px dashed #e2e8f0;
                }

                /* RESPONSIVENESS */
                @media (max-width: 1200px) {
                    .dashboard-main-flow { display: flex; flex-direction: column; gap: 24px; }
                    .command-sidebar-p { display: contents; }
                    .upcoming-interviews-card { order: 1; }
                    .main-activity-content { order: 2; }
                    .shortcut-mosaic-card { order: 3; }
                    .status-console-card { order: 4; }
                    .heritage-footer-p { order: 5; }
                }

                @media (max-width: 1024px) {
                    .dashboard-hero-premium { flex-direction: column; align-items: flex-start; gap: 24px; }
                    .hero-title-p { font-size: 1.7rem; }
                }

                @media (max-width: 768px) {
                    .dashboard-hero-premium { padding: 28px 24px; border-radius: 20px; }
                    .hero-actions-p { flex-direction: column; width: 100%; }
                    .btn-hero-p { width: 100%; justify-content: center; }
                }

                @media (max-width: 480px) {
                    .stats-mosaic-grid { grid-template-columns: 1fr; }
                    .shortcut-grid-p { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}

export default Dashboard;