// src/pages/VacanciesPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getVacancies, getCompanies, API_BASE } from "../services/api";
import { formatDate, daysLeft } from "../utils/constants";

const BACKEND_ROOT = API_BASE.replace('/api', '');
import {
    FiSearch,
    FiBriefcase,
    FiMapPin,
    FiCalendar,
    FiMenu,
    FiX,
    FiFilter,
    FiArrowLeft,
    FiArrowRight,
    FiFacebook,
    FiLinkedin,
    FiGlobe,
    FiAward,
    FiUsers
} from "react-icons/fi";

function VacanciesPage() {
    const [vacancies, setVacancies] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [companyFilter, setCompanyFilter] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const loadData = async () => {
        try {
            setLoading(true);
            const params = {};
            if (companyFilter) params.company_id = companyFilter;
            if (search) params.search = search;

            const [vacRes, compRes] = await Promise.all([
                getVacancies(params),
                getCompanies(),
            ]);

            setVacancies(vacRes?.data?.data || []);
            setCompanies(compRes?.data?.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyFilter]);

    const handleSearch = (e) => {
        e.preventDefault();
        loadData();
    };

    const [locationFilter, setLocationFilter] = useState("");

    const locations = useMemo(() => {
        const locs = vacancies.map(v => v.location).filter(Boolean);
        return [...new Set(locs)];
    }, [vacancies]);

    const filteredVacancies = useMemo(() => {
        const q = search.trim().toLowerCase();

        return vacancies.filter((v) => {
            const title = (v.title || "").toLowerCase();
            const designation = (v.designation || "").toLowerCase();
            const company = (v.company_name || "").toLowerCase();
            const location = (v.location || "").toLowerCase();

            const matchesSearch = !q || title.includes(q) || designation.includes(q) || company.includes(q);
            const matchesCompany = !companyFilter || String(v.company_id) === String(companyFilter);
            const matchesLocation = !locationFilter || v.location === locationFilter;

            return matchesSearch && matchesCompany && matchesLocation;
        });
    }, [vacancies, search, companyFilter, locationFilter]);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <div className="public-page vacancy-listing-page">
            {/* Navbar */}
            <nav className="navbar">
                <Link to="/" className="navbar-brand">
                    <img
                        src="/gs-logo.png"
                        alt="George Steuart & Co"
                        className="navbar-logo"
                    />
                    <div>
                        <div className="navbar-title">George Steuart</div>
                        <div className="navbar-subtitle">Careers</div>
                    </div>
                </Link>

                <div className={`navbar-links ${mobileMenuOpen ? "open" : ""}`}>
                    <Link to="/" className="navbar-link" onClick={closeMobileMenu}>Home</Link>
                    <Link to="/vacancies" className="navbar-link active" onClick={closeMobileMenu}>Vacancies</Link>
                    <Link to="/admin/login" className="navbar-link btn-primary" onClick={closeMobileMenu}>Admin Portal</Link>
                </div>

                <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen((s) => !s)}>
                    {mobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </nav>

            {/* Cinematic Hero Header */}
            <header className="vacancies-hero-v2">
                <div className="container">
                    <div className="v2-hero-layout">
                        <div className="v2-hero-info">
                            <div className="v2-badge animate-fade-in">Join Our Legacy</div>
                            <h1 className="v2-hero-title animate-slide-up">
                                Shape Your Future <br />
                                <span>With George Steuart</span>
                            </h1>
                            <p className="v2-hero-subtitle animate-slide-up delay-1">
                                Partner with the oldest mercantile firm in Sri Lanka.
                                We offer more than just a job; we offer a platform to build a career
                                rooted in 190 years of excellence.
                            </p>
                            <div className="v2-hero-actions animate-slide-up delay-2">
                                <Link to="#current-openings" className="v2-btn-scroll" onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('current-openings').scrollIntoView({ behavior: 'smooth' });
                                }}>
                                    View Openings <FiArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="v2-hero-overlay"></div>
            </header>

            {/* Advanced Multi-Filter Section */}
            <div className="v2-filter-section">
                <div className="container">
                    <div className="v2-filter-card-wrapper shadow-premium animate-slide-up">
                        <form className="v2-filter-card" onSubmit={handleSearch}>
                            <div className="v2-search-input">
                                <FiSearch className="v2-icon" />
                                <input
                                    type="text"
                                    placeholder="Search by role or keyword..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <div className="v2-select-group">
                                <div className="v2-select-wrapper">
                                    <FiBriefcase className="v2-icon-small" />
                                    <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
                                        <option value="">All Companies</option>
                                        {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>

                                <div className="v2-select-wrapper">
                                    <FiMapPin className="v2-icon-small" />
                                    <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
                                        <option value="">All Locations</option>
                                        {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="v2-btn-find">
                                <FiSearch /> <span>Find Opportunities</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Vacancies Grid */}
            <main className="v2-listing-section" id="current-openings">
                <div className="container">
                    <div className="v2-section-header">
                        <div className="v2-header-title">
                            <h2>Current Openings</h2>
                            <p>Showing <strong>{filteredVacancies.length}</strong> active positions across our group</p>
                        </div>
                        <div className="v2-view-options">
                            <span className="v2-active-filter">Sort by: Latest First</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading-container">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="skeleton-card" />
                            ))}
                        </div>
                    ) : filteredVacancies.length === 0 ? (
                        <div className="v2-empty-state">
                            <div className="v2-empty-illustration">🔍</div>
                            <h3>No matches found</h3>
                            <p>Try adjusting your search or filters to find what you're looking for.</p>
                            <button onClick={() => { setSearch(""); setCompanyFilter(""); setLocationFilter(""); }} className="v2-btn-reset">Clear All Filters</button>
                        </div>
                    ) : (
                        <div className="v2-vacancy-grid">
                            {filteredVacancies.map((vacancy, idx) => {
                                const isNew = daysLeft(vacancy.created_at) < 7; // Simple logic for "New" tag
                                return (
                                    <div
                                        key={vacancy.id}
                                        className="v2-job-card animate-slide-up"
                                        style={{ animationDelay: `${idx * 0.08}s` }}
                                        onClick={() => navigate(`/apply/${vacancy.id}`)}
                                    >
                                        <div className="v2-card-logo">
                                            <img
                                                src={vacancy.company_logo ? `${BACKEND_ROOT}/uploads/logos/${vacancy.company_logo}` : "/gs-logo.png"}
                                                alt={vacancy.company_name}
                                                onError={(e) => e.target.src = "/gs-logo.png"}
                                            />
                                        </div>
                                        <div className="v2-card-body">
                                            <div className="v2-card-tags">
                                                {isNew && <span className="v2-tag-new">New Opening</span>}
                                                <span className="v2-tag-type">{vacancy.employment_type || "Full Time"}</span>
                                            </div>
                                            <h3 className="v2-job-title" style={{ marginBottom: '2px' }}>{vacancy.title}</h3>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.5px' }}>
                                                REF: {vacancy.reference_number || 'N/A'}
                                            </div>
                                            <span className="v2-company-name">{vacancy.company_name}</span>

                                            {vacancy.description && (
                                                <div className="v2-job-card-description">
                                                    {vacancy.description}
                                                </div>
                                            )}

                                            <div className="v2-job-details">
                                                <div className="v2-detail-item">
                                                    <FiMapPin className="v2-icon-inline" />
                                                    <span>{vacancy.location || "Colombo, LK"}</span>
                                                </div>
                                                <div className="v2-detail-item">
                                                    <FiCalendar className="v2-icon-inline" />
                                                    <span>Closes: {formatDate(vacancy.expire_date)}</span>
                                                </div>
                                                <div className="v2-detail-item">
                                                    <FiBriefcase className="v2-icon-inline" />
                                                    <span>{vacancy.designation || "Executive"}</span>
                                                </div>
                                            </div>

                                            <div className="v2-card-footer">
                                                <div className="v2-job-status-badge">
                                                    <span className="v2-status-dot"></span>
                                                    Actively Hiring
                                                </div>
                                                <Link to={`/apply/${vacancy.id}`} className="v2-btn-apply" onClick={(e) => e.stopPropagation()}>
                                                    View Position <FiArrowRight />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            {/* Premium Heritage Studio - Why Join */}
            <section className="v5-why-join">
                <div className="container">
                    <div className="v5-layout">
                        {/* Left: Decorative Visual & Stats */}
                        <div className="v5-visual">
                            <div className="v5-badge">The GS Advantage</div>
                            <h2 className="v5-main-title">Why Your Career Starts Here</h2>
                            <p className="v5-main-desc">
                                Join a legacy of over 190 years. We don't just offer jobs; we provide a platform for you to build a lasting legacy within Sri Lanka's most prestigious mercantile home.
                            </p>

                            <div className="v5-stats-cluster">
                                <div className="v5-stat-card">
                                    <span className="num">190+</span>
                                    <span className="lbl">Years</span>
                                </div>
                                <div className="v5-stat-card gold">
                                    <span className="num">10+</span>
                                    <span className="lbl">Sectors</span>
                                </div>
                                <div className="v5-stat-card">
                                    <span className="num">5K+</span>
                                    <span className="lbl">Family</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Feature Pillars */}
                        <div className="v5-pillars">
                            <div className="v5-pillar-item">
                                <div className="v5-pillar-icon"><FiAward /></div>
                                <div className="v5-pillar-info">
                                    <h4>Historic Resilience</h4>
                                    <p>Experience the stability of a firm that has led the Sri Lankan economy since 1835.</p>
                                </div>
                            </div>

                            <div className="v5-pillar-item">
                                <div className="v5-pillar-icon"><FiGlobe /></div>
                                <div className="v5-pillar-info">
                                    <h4>Cross-Industry Exposure</h4>
                                    <p>Pivot your career across Tea, Healthcare, Finance, and Travel without leaving the group.</p>
                                </div>
                            </div>

                            <div className="v5-pillar-item featured">
                                <div className="v5-pillar-icon"><FiUsers /></div>
                                <div className="v5-pillar-info">
                                    <h4>Inclusive Leadership</h4>
                                    <p>Our meritocratic culture ensures that talent and integrity are the only paths to the top.</p>
                                </div>
                            </div>

                            <div className="v5-pillar-item">
                                <div className="v5-pillar-icon"><FiBriefcase /></div>
                                <div className="v5-pillar-info">
                                    <h4>Strategic Mentorship</h4>
                                    <p>Access structured growth programs led by industry stalwarts and visionary directors.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer-premium">
                <div className="container">
                    <div className="footer-top-grid">
                        <div className="footer-col brand-col">
                            <img src="/gs-logo.png" alt="George Steuart & Co" className="footer-logo-premium" />
                            <h3 className="footer-brand-name">George Steuart <br /><span>& Company Ltd</span></h3>
                            <p className="footer-about-text">
                                Established in 1835, George Steuart & Company is Sri Lanka's oldest mercantile firm, fostering excellence for nearly two centuries.
                            </p>
                            <div className="footer-socials">
                                <a href="https://www.facebook.com/GeorgeSteuarts" target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook">
                                    <FiFacebook />
                                </a>
                                <a href="https://www.linkedin.com/company/george-steorge-steuart-&-company-limited" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                                    <FiLinkedin />
                                </a>
                            </div>
                        </div>

                        <div className="footer-col links-col">
                            <h4 className="footer-col-title">Quick Links</h4>
                            <ul className="footer-links-list">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/vacancies">All Vacancies</Link></li>
                                <li><a href="/#heritage">Our Heritage</a></li>
                                <li><Link to="/admin/login">Admin Portal</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col contact-col">
                            <h4 className="footer-col-title">Get In Touch</h4>
                            <div className="footer-contact-info">
                                <p><FiMapPin className="c-icon" /> No. 439, Galle Road, Colombo 03, Sri Lanka.</p>
                                <p><FiGlobe className="c-icon" /> www.georgesteuart.lk</p>
                                <div className="contact-numbers">
                                    <p><span>T:</span> +94 117 792 400</p>
                                    <p><span>E:</span> info@georgesteuart.lk</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom-bar">
                        <div className="copyright-area">
                            © {new Date().getFullYear()} George Steuart & Company Ltd. All Rights Reserved.
                        </div>
                        <div className="developer-credit">
                            Developed by <span>GS Optimize pvt ltd</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default VacanciesPage;
