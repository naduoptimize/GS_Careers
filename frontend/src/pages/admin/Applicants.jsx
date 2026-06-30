import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getApplications, exportApplications, getAllVacancies, getCompanies, updateApplicationStatus, sendInterviewInvitation, getSuggestions, API_BASE, deleteApplication, bulkDeleteApplications, getCompanyLocations } from '../../services/api';
import { OVERALL_EXPERIENCE_OPTIONS, RELEVANT_EXPERIENCE_OPTIONS, QUALIFICATION_OPTIONS, formatDate, formatDateTime } from '../../utils/constants';

const BACKEND_ROOT = API_BASE.replace('/api', '');
import { toast } from 'react-toastify';
import { renderAsync } from 'docx-preview';
import axios from 'axios';
import {
    FiDownload, FiFilter, FiSearch, FiMail, FiPhone, FiFileText,
    FiChevronRight, FiChevronLeft, FiArrowRight, FiUser, FiBriefcase, FiCalendar, FiExternalLink, FiX, FiHome, FiCheckCircle,
    FiAward, FiTarget, FiAlertCircle, FiXCircle, FiInfo, FiTag, FiBarChart2, FiCpu, FiHash, FiVideo, FiMapPin, FiTrash2, FiUserCheck, FiSlash
} from 'react-icons/fi';
import './Applicants.css';

// Helper to render job description/requirements with better formatting
const renderFormattedText = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    const result = [];
    let currentList = [];

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        // Detect bullet points or numbered lists
        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed);

        if (isBullet) {
            const content = trimmed.replace(/^[•\-*\d.]+\s*/, '').trim();
            if (content) {
                currentList.push(<li key={`li-${index}`}>{content}</li>);
            }
        } else {
            if (currentList.length > 0) {
                result.push(<ul key={`ul-${index}`} className="formatted-list">{currentList}</ul>);
                currentList = [];
            }

            if (trimmed) {
                // Check if it looks like a sub-heading (short, all caps or ends with colon)
                const isHeading = (trimmed.length < 40 && (trimmed === trimmed.toUpperCase() || trimmed.endsWith(':')));
                result.push(
                    <p key={`p-${index}`} className={isHeading ? "formatted-heading" : "formatted-paragraph"}>
                        {trimmed}
                    </p>
                );
            } else {
                result.push(<div key={`br-${index}`} className="formatted-spacer" />);
            }
        }
    });

    if (currentList.length > 0) {
        result.push(<ul key="ul-final" className="formatted-list">{currentList}</ul>);
    }

    return result;
};

// Comprehensive Domain Keywords for NLP-style matching
// Comprehensive Domain Keywords — George Steuart Group Subsidiaries
// Covers: GS&Co (parent), GS Teas, GS Health, GS Solutions, HVA Foods, GS Consumer,
//         GS Travels, GS Aviation, Citrus Leisure, GS Insurance, GS Investments,
//         GS Asset Management, GS Recruitment, GS Optimize
const DOMAIN_KEYWORDS = {

    // ── George Steuart & Company Ltd (Parent) ── shared corporate functions ──
    finance_accounting: [
        'accountant', 'audit', 'auditor', 'tax', 'ledger', 'invoice', 'payroll', 'finance',
        'reconciliation', 'budget', 'tally', 'quickbooks', 'erp', 'sap', 'oracle financials',
        'casl', 'aat', 'cma', 'acca', 'cpa', 'cfo', 'treasury', 'billing', 'accounts payable',
        'accounts receivable', 'cost accounting', 'financial reporting', 'ifrs', 'cash flow',
        'fixed assets', 'management accounts', 'variance analysis', 'internal audit',
        'external audit', 'statutory', 'chartered accountant', 'ca sri lanka'
    ],

    hr_admin: [
        'hr', 'human resources', 'recruitment', 'talent acquisition', 'hiring', 'onboarding',
        'training', 'learning and development', 'l&d', 'performance management', 'kpi',
        'administrative', 'office', 'receptionist', 'clerk', 'coordinator', 'executive',
        'operations', 'clerical', 'data entry', 'policy', 'employee relations', 'attendance',
        'secretarial', 'compliance', 'payroll', 'hris', 'grievance', 'organizational development',
        'workforce planning', 'compensation', 'benefits', 'job evaluation', 'hr generalist',
        'labour law', 'industrial relations', 'welfare', 'succession planning'
    ],

    legal_compliance: [
        'legal', 'lawyer', 'attorney', 'legal officer', 'compliance', 'regulatory',
        'contract', 'litigation', 'corporate law', 'intellectual property', 'company secretarial',
        'company secretary', 'board', 'governance', 'due diligence', 'legal counsel',
        'statutory compliance', 'data protection', 'gdpr', 'risk', 'risk management'
    ],

    // ── George Steuart Teas (Pvt) Ltd ──
    tea: [
        'tea', 'tea taster', 'tea blending', 'tea processing', 'tea packaging', 'tea export',
        'tea buyer', 'tea grading', 'ctc', 'orthodox', 'green tea', 'black tea', 'white tea',
        'flavoured tea', 'bulk tea', 'tea bags', 'colombo tea auction', 'tea broker',
        'plantation', 'estate', 'garden', 'made tea', 'liquoring', 'tea factory',
        'tea marketing', 'tea industry', 'camellia sinensis', 'agronomy', 'packing'
    ],

    // ── George Steuart Health (Pvt) Ltd ──
    healthcare_pharma: [
        'pharmaceutical', 'pharma', 'healthcare', 'medical', 'medicine', 'diagnostics',
        'medical devices', 'surgical', 'clinical', 'laboratory', 'lab technician',
        'medical representative', 'med rep', 'detail officer', 'drug regulatory',
        'nmra', 'drug registration', 'hospital', 'clinic', 'dispensary', 'pharmacist',
        'pharmacy', 'biotech', 'wellness', 'health products', 'medical marketing',
        'key account manager', 'hospital sales', 'doctor detailing', 'product manager pharma',
        'quality assurance pharma', 'cold chain', 'medical equipment', 'dental', 'ophthalmology'
    ],

    // ── George Steuart Solutions (Pvt) Ltd ── solar / generators / elevators / ACs ──
    solutions_engineering: [
        'solar', 'solar panels', 'photovoltaic', 'pv system', 'solar installation',
        'solar engineer', 'renewable energy', 'net metering', 'inverter', 'battery storage',
        'generator', 'genset', 'ups', 'power solutions', 'elevator', 'lift', 'escalator',
        'stairlift', 'lift technician', 'elevator engineer', 'otis', 'schindler',
        'air conditioning', 'hvac', 'ac technician', 'refrigeration', 'chillers',
        'mechanical engineer', 'electrical engineer', 'electromechanical', 'installation',
        'commissioning', 'maintenance', 'preventive maintenance', 'service technician',
        'autocad', 'project engineer', 'site engineer', 'energy audit', 'building services'
    ],

    // ── HVA Foods (Pvt) Ltd ── food & beverage manufacturing ──
    food_beverage: [
        'food', 'beverage', 'food manufacturing', 'food production', 'food safety',
        'haccp', 'iso 22000', 'food technology', 'food technologist', 'quality control food',
        'fmcg food', 'factory', 'production supervisor', 'plant operator', 'food processing',
        'packaging', 'labelling', 'r&d food', 'product development food', 'spices',
        'condiments', 'bakery', 'confectionery', 'beverages', 'dairy', 'fmcg production',
        'batch production', 'yield', 'shelf life', 'sensory evaluation', 'hygiene',
        'gmp', 'food grade', 'costing food', 'npl', 'new product launch'
    ],

    // ── George Steuart Consumer (Pvt) Ltd ── FMCG distribution / sales ──
    fmcg_sales_distribution: [
        'fmcg', 'consumer goods', 'distribution', 'distributor', 'sales representative',
        'field sales', 'territory manager', 'area sales manager', 'regional sales',
        'van sales', 'key account', 'modern trade', 'general trade', 'trade marketing',
        'merchandiser', 'shelf management', 'planogram', 'brand activation', 'btl', 'atl',
        'channel management', 'retail', 'supermarket', 'spar', 'keells', 'cargills',
        'detergent', 'personal care', 'home care', 'spices', 'teas fmcg',
        'route to market', 'rtm', 'beat plan', 'outlet coverage', 'sell-in', 'sell-out',
        'product listing', 'brand manager', 'trade promotions', 'secondary sales'
    ],

    // ── George Steuart Travels Ltd ──
    travel_tourism: [
        'travel', 'tourism', 'tour operator', 'inbound tourism', 'outbound tourism',
        'corporate travel', 'leisure travel', 'travel consultant', 'travel advisor',
        'ticketing', 'airline ticketing', 'gds', 'amadeus', 'galileo', 'sabre',
        'iata', 'visa', 'passport', 'itinerary', 'tour planning', 'destination management',
        'mice', 'event travel', 'incentive travel', 'group tours', 'fit', 'tailor-made tours',
        'hotel booking', 'transfers', 'guide', 'tour guide', 'travel agency',
        'reservations', 'operations travel', 'travel document', 'niche travel'
    ],

    // ── George Steuart Aviation (Pvt) Ltd ── GSA / airline representation ──
    aviation: [
        'aviation', 'airline', 'gsa', 'general sales agent', 'cargo', 'air cargo',
        'iata', 'airport', 'ground handling', 'check-in', 'ramp', 'passenger handling',
        'flight operations', 'load control', 'dangerous goods', 'dg', 'airside',
        'airline sales', 'corporate airline', 'ticketing', 'reservations', 'crm airline',
        'philippine airlines', 'aircraft', 'airfreight', 'revenue management',
        'interline', 'codeshare', 'maldives', 'travel trade airline'
    ],

    // ── Citrus Leisure PLC ── hotels / resorts / F&B / leisure ──
    hospitality_leisure: [
        'hotel', 'resort', 'hospitality', 'restaurant', 'food and beverage', 'f&b',
        'front office', 'front desk', 'guest relations', 'housekeeping', 'concierge',
        'chef', 'sous chef', 'kitchen', 'banquet', 'events', 'stewarding',
        'food service', 'room service', 'spa', 'recreation', 'leisure',
        'property management', 'pms', 'opera', 'revenue management hotel', 'yield',
        'occ', 'adr', 'revpar', 'hospitality management', 'duty manager', 'night manager',
        'bellboy', 'valet', 'pool', 'bar', 'sommelier', 'barista', 'bartender',
        'catering', 'reservation hotel', 'booking', 'citrus', 'hotel supervisor'
    ],

    // ── George Steuart Insurance Brokers (Pvt) Ltd ──
    insurance: [
        'insurance', 'insurance broker', 'risk management', 'underwriting',
        'claims', 'claims management', 'reinsurance', 'life insurance', 'general insurance',
        'health insurance', 'marine insurance', 'fire insurance', 'motor insurance',
        'liability insurance', 'policy', 'premium', 'actuary', 'loss adjuster',
        'corporate insurance', 'irb sri lanka', 'insurance regulation', 'ibsl',
        'risk assessment', 'sum insured', 'deductible', 'renewal', 'endorsement'
    ],

    // ── George Steuart Investments (Pvt) Ltd ── money market / inter-bank ──
    investments_money_market: [
        'investments', 'investment', 'money market', 'treasury', 'interbank',
        'fixed income', 'bonds', 'repo', 't-bills', 'government securities',
        'forex', 'foreign exchange', 'capital market', 'securities', 'equity',
        'dealing', 'dealer', 'central bank', 'cbsl', 'liquidity', 'interest rate',
        'yield', 'portfolio', 'risk desk', 'market risk', 'credit risk',
        'financial markets', 'sec', 'cse', 'stock exchange', 'broker dealer'
    ],

    // ── George Steuart Asset Management (Pvt) Ltd ── wealth / portfolio mgmt ──
    asset_management_wealth: [
        'asset management', 'wealth management', 'portfolio management', 'fund manager',
        'unit trust', 'mutual fund', 'investment manager', 'investment analyst',
        'client advisor', 'relationship manager wealth', 'high net worth', 'hnwi',
        'financial planning', 'retirement planning', 'investment advisory',
        'cfa', 'sec licensed', 'investment licence', 'aum', 'nav', 'benchmark',
        'equity research', 'fundamental analysis', 'technical analysis', 'allocation'
    ],

    // ── George Steuart Recruitment ── overseas recruitment ──
    overseas_recruitment: [
        'overseas recruitment', 'overseas placement', 'foreign employment',
        'slbfe', 'visa processing', 'work visa', 'demand letter', 'attestation',
        'manpower', 'skilled workers', 'semi-skilled', 'unskilled', 'domestic workers',
        'recruitment consultant', 'placement', 'candidate sourcing', 'mobilization',
        'middle east', 'gulf', 'uae', 'qatar', 'saudi', 'kuwait', 'bahrain',
        'employment agent', 'licensed recruitment', 'recruitment agency', 'foreign jobs'
    ],

    // ── George Steuart Optimize ── IT / project / cybersecurity ──
    it_cybersecurity: [
        'software', 'developer', 'software engineer', 'react', 'javascript', 'node',
        'php', 'mysql', 'python', 'java', 'aws', 'azure', 'gcp', 'cloud', 'frontend',
        'backend', 'fullstack', 'api', 'git', 'mobile', 'ios', 'android', 'laravel',
        'c#', 'dot net', '.net', 'ui', 'ux', 'database', 'linux', 'devops', 'docker',
        'kubernetes', 'ci/cd', 'cybersecurity', 'information security', 'iso 27001',
        'penetration testing', 'ethical hacking', 'soc', 'siem', 'network security',
        'firewall', 'endpoint', 'vulnerability', 'it support', 'helpdesk', 'infrastructure',
        'networks', 'project manager', 'scrum', 'agile', 'business analyst',
        'llm', 'ai', 'machine learning', 'data science', 'openai', 'gemini', 'agents',
        'optimize', 'erp implementation', 'it consulting'
    ],

    // ── Cross-group: Sales & Marketing (general) ──
    sales_marketing: [
        'sales', 'marketing', 'branding', 'advertising', 'digital marketing', 'seo',
        'sem', 'social media', 'content marketing', 'email marketing', 'leads',
        'conversions', 'customer', 'wholesale', 'negotiation', 'promotion', 'crm',
        'market research', 'revenue', 'growth', 'client management', 'brand manager',
        'product manager', 'category management', 'trade', 'b2b', 'b2c', 'e-commerce'
    ],

    // ── Cross-group: Supply Chain & Logistics ──
    logistics_supply_chain: [
        'logistics', 'supply chain', 'warehouse', 'shipping', 'export', 'import',
        'procurement', 'inventory', 'transport', 'delivery', 'fleet', 'stores',
        'purchasing', 'customs', 'clearing', 'forwarding', 'freight', 'lcl', 'fcl',
        'letter of credit', 'lc', 'incoterms', 'supplier management', 'vendor',
        'demand planning', 'mrp', 'stock control', 'distribution centre'
    ]
};

// Clean candidate name and extract location
const cleanCandidateNameAndLocation = (firstName, lastName) => {
    let cleanFirst = (firstName || '').trim();
    let cleanLast = (lastName || '').trim();
    let detectedLocation = '';

    const locationKeywords = [
        'sri lanka', 'srilanka', 'colombo', 'kandy', 'galle', 'malabe', 'negombo', 'gampaha', 
        'jaffna', 'batticaloa', 'trincomalee', 'kurunegala', 'kalutara', 'matara', 'moratuwa',
        'nugegoda', 'maharagama', 'kotte', 'battaramulla', 'mount lavinia', 'dehiwala', 'rajagiriya'
    ];
    
    const fullCombined = `${cleanFirst} ${cleanLast}`.trim();
    
    // Check if there is a comma
    const commaIndex = fullCombined.lastIndexOf(',');
    if (commaIndex !== -1) {
        const beforeComma = fullCombined.substring(0, commaIndex).trim();
        const afterComma = fullCombined.substring(commaIndex + 1).trim();
        
        // Find the last word in beforeComma
        const wordsBefore = beforeComma.split(/\s+/);
        const lastWordBefore = wordsBefore[wordsBefore.length - 1];
        
        if (wordsBefore.length > 1 && (locationKeywords.includes(lastWordBefore.toLowerCase()) || /^[A-Z]/.test(lastWordBefore))) {
            detectedLocation = `${lastWordBefore}, ${afterComma}`;
            wordsBefore.pop();
            const namePart = wordsBefore.join(' ');
            return { name: namePart, location: detectedLocation };
        } else {
            detectedLocation = afterComma;
            return { name: beforeComma, location: detectedLocation };
        }
    }
    
    // Fallback: check if "Sri Lanka" is at the end without a comma
    const sriLankaIndex = fullCombined.toLowerCase().lastIndexOf('sri lanka');
    if (sriLankaIndex !== -1 && sriLankaIndex > 0) {
        const namePart = fullCombined.substring(0, sriLankaIndex).trim();
        const locPart = fullCombined.substring(sriLankaIndex).trim();
        const cleanedName = namePart.replace(/,\s*$/, '').trim();
        return { name: cleanedName, location: locPart };
    }

    return { name: fullCombined, location: '' };
};

const DocxViewer = ({ url }) => {
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const renderDocx = async () => {
            if (!url || !containerRef.current) return;
            try {
                setLoading(true);
                setError(null);

                // Use axios directly to handle blob response
                const response = await axios.get(url, {
                    responseType: 'blob',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('gs_admin_token')}`
                    }
                });

                // Clear container before rendering
                containerRef.current.innerHTML = '';
                await renderAsync(response.data, containerRef.current, null, {
                    className: "docx",
                    inWrapper: true,
                    ignoreWidth: false,
                    ignoreHeight: false,
                    ignoreFonts: false,
                    breakPageToSections: true,
                    trimXmlDeclaration: true,
                });
            } catch (err) {
                console.error("Docx render error:", err);
                setError("Failed to render document. Please download to view.");
            } finally {
                setLoading(false);
            }
        };

        renderDocx();
    }, [url]);

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'auto', background: '#fff', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {loading && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', padding: '50px' }}>
                    <div className="spinner-p"></div>
                    <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Rendering Document...</p>
                </div>
            )}
            {error && <div style={{ color: 'var(--crimson)', padding: '20px' }}>{error}</div>}
            <div ref={containerRef} style={{ width: '100%', maxWidth: '800px' }}></div>
        </div>
    );
};

const getNormalizedSkills = (skillsMetadataStr, tags) => {
    let parsedReport = null;
    let parsedSkills = null;
    try {
        if (skillsMetadataStr) {
            const parsedData = JSON.parse(skillsMetadataStr);
            if (parsedData && typeof parsedData === 'object' && !Array.isArray(parsedData)) {
                parsedReport = parsedData;
                parsedSkills = parsedData.skills_analysis;
            } else if (Array.isArray(parsedData)) {
                parsedSkills = parsedData;
            }
        }
    } catch (e) {
        console.error("Failed to parse skills metadata:", e);
    }

    const skills = [];
    const seen = new Set();

    // 1. Process parsedReport.skills_analysis
    if (parsedReport && Array.isArray(parsedReport.skills_analysis)) {
        parsedReport.skills_analysis.forEach(item => {
            if (!item || !item.skill) return;
            const skillName = item.skill.trim();
            if (!skillName) return;
            const key = skillName.toLowerCase();
            if (seen.has(key)) return;
            seen.add(key);

            let category = item.category;
            if (category !== 'Relevant Skills' && category !== 'Related Skills') {
                category = 'Additional Skills';
            }

            skills.push({
                skill: skillName,
                category: category,
                experience: item.estimated_duration || item.experience || 'Mentioned Only',
                context: item.usage_context || item.context || 'No usage context provided.',
                evidence_source: item.evidence_source || 'Skills Section Only',
                evidence_strength: item.evidence_strength || 'Mentioned Only',
                experience_level: item.experience_level || 'Basic',
                verified: item.verified !== false
            });
        });
    }

    // 2. Process parsedReport.additional_skills
    if (parsedReport && Array.isArray(parsedReport.additional_skills)) {
        parsedReport.additional_skills.forEach(item => {
            if (!item) return;
            const isObj = typeof item === 'object' && item !== null;
            const skillName = (isObj ? item.skill : item).trim();
            if (!skillName) return;
            const key = skillName.toLowerCase();
            if (seen.has(key)) return;
            seen.add(key);

            skills.push({
                skill: skillName,
                category: 'Additional Skills',
                experience: isObj ? (item.estimated_duration || item.experience || 'Mentioned Only') : 'Mentioned Only',
                context: isObj ? (item.usage_context || item.context || 'Mentioned in CV.') : 'Mentioned in CV.',
                evidence_source: isObj ? (item.evidence_source || 'Skills Section Only') : 'Skills Section Only',
                evidence_strength: isObj ? (item.evidence_strength || 'Mentioned Only') : 'Mentioned Only',
                experience_level: isObj ? (item.experience_level || 'Basic') : 'Basic',
                verified: isObj && item.verified !== undefined ? item.verified !== false : true
            });
        });
    }

    // 3. Process parsedSkills (legacy array)
    if (!parsedReport && Array.isArray(parsedSkills)) {
        parsedSkills.forEach(item => {
            if (!item || !item.skill) return;
            const skillName = item.skill.trim();
            if (!skillName) return;
            const key = skillName.toLowerCase();
            if (seen.has(key)) return;
            seen.add(key);

            let category = item.category;
            if (category !== 'Relevant Skills' && category !== 'Related Skills') {
                category = 'Additional Skills';
            }

            skills.push({
                skill: skillName,
                category: category,
                experience: item.estimated_duration || item.experience || 'Mentioned Only',
                context: item.usage_context || item.context || 'No usage context provided.',
                evidence_source: item.evidence_source || 'Skills Section Only',
                evidence_strength: item.evidence_strength || 'Mentioned Only',
                experience_level: item.experience_level || 'Basic',
                verified: item.verified !== false
            });
        });
    }

    // 4. Process tags (for legacy plain strings case)
    if (skills.length === 0 && tags) {
        tags.split(',').map(s => s.trim()).filter(Boolean).forEach(skillName => {
            const key = skillName.toLowerCase();
            if (seen.has(key)) return;
            seen.add(key);

            skills.push({
                skill: skillName,
                category: 'Additional Skills',
                experience: 'Mentioned Only',
                context: 'Candidate declared skill.',
                evidence_source: 'Skills Section Only',
                evidence_strength: 'Mentioned Only',
                experience_level: 'Basic'
            });
        });
    }

    return {
        skills,
        parsedReport
    };
};

function Applicants({ admin }) {
    const [searchParams] = useSearchParams();
    const [applications, setApplications] = useState([]);
    const [vacancies, setVacancies] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetail, setShowDetail] = useState(null);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showShortlistModal, setShowShortlistModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [shortlistData, setShortlistData] = useState({
        interview_type: 'Online',
        interview_date: '',
        interview_time: '',
        interview_location: ''
    });
    const [processingStatus, setProcessingStatus] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [viewingCV, setViewingCV] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [selectedIds, setSelectedIds] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingBulk, setDeletingBulk] = useState(false);
    const [showConfirmShortlist, setShowConfirmShortlist] = useState(false);
    const [showSendInviteModal, setShowSendInviteModal] = useState(false);
    const [inviteTarget, setInviteTarget] = useState(null); // app object for invite modal
    const [sendingInvite, setSendingInvite] = useState(false);
    const [inviteData, setInviteData] = useState({
        interview_type: 'Online',
        interview_date: '',
        interview_time: '',
        interview_location: '',
        interview_location_link: ''
    });
    const [locationPreset, setLocationPreset] = useState('');
    const [filters, setFilters] = useState({
        vacancy_id: searchParams.get('vacancy_id') || '',
        company_id: '',
        overall_experience: '',
        relevant_experience: '',
        qualification: '',
        status: '',
        search: '',
        interview_date: '',
        sortBy: 'highExperience' // newest, oldest, highExperience, lowExperience
    });

    const [showJobDetails, setShowJobDetails] = useState(false);
    const [activeAdminTab, setActiveAdminTab] = useState('Relevant Skills');
    const selVac = vacancies.find(v => String(v.id) === String(filters.vacancy_id)) || {};

    useEffect(() => {
        if (showDetail) {
            setActiveAdminTab('Relevant Skills');
        }
    }, [showDetail]);

    const applyAutoMatch = () => {
        if (!selVac.id) {
            toast.info('Please select a position first');
            return;
        }
        setFilters(prev => ({
            ...prev,
            overall_experience: selVac.min_experience || '',
            relevant_experience: selVac.min_relevant_experience || '',
            sortBy: 'matchScore'
        }));
        toast.success(`Filters synced with ${selVac.title} requirements`);
    };

    useEffect(() => {
        loadMeta();
    }, []);

    useEffect(() => {
        loadApplications();
        if (filters.vacancy_id) {
            loadSuggestions();
            setShowSuggestions(false); // collapse list whenever vacancy changes
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [filters.vacancy_id, filters.company_id, filters.overall_experience, filters.relevant_experience, filters.qualification, filters.status, filters.interview_date]);

    const loadSuggestions = async () => {
        try {
            setLoadingSuggestions(true);
            const res = await getSuggestions({ vacancy_id: filters.vacancy_id });
            setSuggestions(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingSuggestions(false);
        }
    };

    const loadMeta = async () => {
        try {
            const [vacRes, compRes, locRes] = await Promise.all([
                getAllVacancies(),
                getCompanies(),
                getCompanyLocations()
            ]);
            setVacancies(vacRes.data.data || []);
            setCompanies(compRes.data.data || []);
            setLocations(locRes.data.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const loadApplications = async () => {
        try {
            setLoading(true);
            const params = {};
            Object.entries(filters).forEach(([k, v]) => {
                if (v) params[k] = v;
            });
            const res = await getApplications(params);
            setApplications(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        try {
            const params = {};
            Object.entries(filters).forEach(([k, v]) => {
                if (v && k !== 'search') params[k] = v;
            });
            const res = await exportApplications(params);

            const blob = new Blob([res.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `applicants_${new Date().toISOString().slice(0, 10)}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            toast.success('Excel/CSV downloaded successfully');
        } catch (err) {
            toast.error('Export failed');
        }
    };

    const clearFilters = () => {
        setFilters({
            vacancy_id: '',
            company_id: '',
            overall_experience: '',
            relevant_experience: '',
            qualification: '',
            status: '',
            search: '',
            interview_date: '',
            sortBy: 'highExperience'
        });
        setSelectedIds([]);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(paginatedApps.map(app => app.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = async () => {
        try {
            setDeletingBulk(true);
            await bulkDeleteApplications({ ids: selectedIds });
            toast.success(`${selectedIds.length} applications deleted successfully`);
            setSelectedIds([]);
            setShowDeleteModal(false);
            loadApplications();
        } catch (err) {
            toast.error('Failed to delete applications');
        } finally {
            setDeletingBulk(false);
        }
    };

    const handleStatusUpdate = async (id, status, reason = '', extraData = {}) => {
        try {
            setProcessingStatus(true);
            await updateApplicationStatus({ id, status, rejection_reason: reason, ...extraData });
            toast.success(`Application marked as ${status}`);
            setShowRejectModal(false);
            setShowShortlistModal(false);
            setShowConfirmShortlist(false);
            setRejectReason('');
            setShortlistData({ interview_type: 'Online', interview_date: '', interview_time: '', interview_location: '' });
            setShowDetail(null);
            loadApplications();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update status');
        } finally {
            setProcessingStatus(false);
        }
    };

    // Step 1: Mark as shortlisted (no email)
    const handleQuickShortlist = async (app) => {
        try {
            setProcessingStatus(true);
            await updateApplicationStatus({ id: app.id, status: 'shortlisted' });
            toast.success(`${app.first_name} ${app.last_name} shortlisted successfully`);
            setShowConfirmShortlist(false);
            setShowDetail(null);
            loadApplications();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to shortlist');
        } finally {
            setProcessingStatus(false);
        }
    };

    // Step 2: Send interview invitation email
    const handleSendInterview = async () => {
        if (!inviteTarget) return;
        try {
            setSendingInvite(true);
            await sendInterviewInvitation({ id: inviteTarget.id, ...inviteData });
            toast.success(`Interview invitation sent to ${inviteTarget.first_name}!`);
            setShowSendInviteModal(false);
            setInviteTarget(null);
            setInviteData({ interview_type: 'Online', interview_date: '', interview_time: '', interview_location: '', interview_location_link: '' });
            loadApplications();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send invitation');
        } finally {
            setSendingInvite(false);
        }
    };

    // Reset locationPreset whenever the invite modal closes
    const closeInviteModal = () => {
        setShowSendInviteModal(false);
        setInviteTarget(null);
        setLocationPreset('');
        setInviteData({ interview_type: 'Online', interview_date: '', interview_time: '', interview_location: '', interview_location_link: '' });
    };

    // Upgraded 4-Factor Multi-Weighted Scoring Model
    const calculateMatchScore = (app) => {
        const qualWeights = {
            'PhD': 100, 'Masters Degree': 90, 'Bachelors Degree': 80,
            'Professional Certification': 75, 'Diploma': 65,
            'A/L': 45, 'O/L': 25
        };

        const expWeights = {
            '10+ years': 100,
            '8-10 years': 85,
            '5-7 years': 70,
            '3-4 years': 55,
            '1-2 years': 35,
            '0-1 years': 15,
            '0 years': 5,
        };

        const selectedVac = vacancies.find(v => v.id == (filters.vacancy_id || app.vacancy_id));

        let details = {
            factors: {
                skills: 0,
                experience: 0,
                qualification: 0,
                keyword: 0
            },
            matchedKeywords: [],
            isQualified: true
        };

        // If no specific vacancy is selected, we do a general profile strength score
        const targetTitle = selectedVac ? selectedVac.title.toLowerCase() : '';
        const targetReqs = selectedVac ? (selectedVac.requirements || '').toLowerCase() : '';
        const targetDesc = selectedVac ? (selectedVac.description || '').toLowerCase() : '';
        const targetFullText = targetTitle + ' ' + targetReqs + ' ' + targetDesc;

        // 1. SKILLS MATCH (40%)
        let skillsScore = 0;
        const parsedSkillsData = getNormalizedSkills(app.skills_metadata, app.tags);
        const report = parsedSkillsData.parsedReport || {};
        const skillsList = parsedSkillsData.skills || [];

        if (skillsList.length > 0) {
            // Count verified Relevant Skills and Related Skills
            const numRelevant = skillsList.filter(s => s.category === 'Relevant Skills' && s.verified !== false).length;
            const numRelated = skillsList.filter(s => s.category === 'Related Skills' && s.verified !== false).length;
            
            // Check mandatory requirements status
            const numFully = Array.isArray(report.fully_demonstrated_skills) ? report.fully_demonstrated_skills.length : 0;
            const numPartially = Array.isArray(report.partially_demonstrated_skills) ? report.partially_demonstrated_skills.length : 0;
            const numMissing = Array.isArray(report.requirements_without_evidence) ? report.requirements_without_evidence.length : 0;
            const totalMandatory = numFully + numPartially + numMissing;

            let mandatoryRatio = 1.0;
            if (totalMandatory > 0) {
                mandatoryRatio = (numFully * 1.0 + numPartially * 0.5) / totalMandatory;
            }

            // High score for having relevant skills, scaled by mandatory match success
            const rawSkillsScore = (numRelevant * 15) + (numRelated * 5); 
            skillsScore = Math.min(100, rawSkillsScore) * mandatoryRatio;
            
            // Penalty for missing mandatory requirements
            if (numMissing > 0) {
                skillsScore *= Math.max(0.4, 1 - (numMissing * 0.15));
            }

            details.matchedKeywords = skillsList
                .filter(s => s.category === 'Relevant Skills' || s.category === 'Related Skills')
                .map(s => s.skill);
        } else {
            // Fallback for legacy applications: dynamically extract skills from targets and match vs applicant profile
            let possibleSkills = [];
            Object.values(DOMAIN_KEYWORDS).flat().forEach(word => {
                if (targetFullText.includes(word)) possibleSkills.push(word);
            });
            possibleSkills = [...new Set(possibleSkills)];
            const candidateInfo = (app.qualification + ' ' + (app.applied_vacancy || '') + ' ' + (app.last_applied_vacancy || '') + ' ' + app.tags).toLowerCase();

            if (possibleSkills.length > 0) {
                const matches = possibleSkills.filter(s => candidateInfo.includes(s));
                skillsScore = (matches.length / possibleSkills.length) * 100;
                details.matchedKeywords = matches.map(m => m.charAt(0).toUpperCase() + m.slice(1));
            } else {
                skillsScore = 70;
            }
        }
        details.factors.skills = Math.round(skillsScore);

        // 2. EXPERIENCE MATCH (25%)
        let expScore = 0;
        const appOverallWeight = expWeights[app.overall_experience] || 0;
        const appRelevantWeight = expWeights[app.relevant_experience] || 0;

        if (selectedVac) {
            const minOverallWeight = expWeights[selectedVac.min_experience] || 15;
            const minRelWeight = expWeights[selectedVac.min_relevant_experience] || 15;

            const overallRatio = appOverallWeight / minOverallWeight;
            const relRatio = appRelevantWeight / minRelWeight;

            // Average of the two ratios, capped at 1.2 (bonus for over-qualification)
            const combinedRatio = Math.min(1.2, (overallRatio + relRatio) / 2);
            expScore = combinedRatio * 100;

            if (appOverallWeight < minOverallWeight) details.isQualified = false;
        } else {
            expScore = (appOverallWeight + appRelevantWeight) / 2;
        }
        details.factors.experience = Math.round(expScore);

        // 3. QUALIFICATION MATCH (15%)
        let qualScore = 0;
        const appQualWeight = qualWeights[app.qualification] || 0;

        if (selectedVac) {
            // Infer required qualification from target text (heuristic)
            let requiredQualWeight = 80; // Default Bachelors
            if (targetFullText.includes('phd') || targetFullText.includes('doctorate')) requiredQualWeight = 100;
            else if (targetFullText.includes('masters') || targetFullText.includes('msc') || targetFullText.includes('mba')) requiredQualWeight = 90;
            else if (targetFullText.includes('diploma')) requiredQualWeight = 65;
            else if (targetFullText.includes('a/l')) requiredQualWeight = 45;

            qualScore = (appQualWeight / requiredQualWeight) * 100;
            if (appQualWeight < requiredQualWeight) qualScore *= 0.8; // penalty
        } else {
            qualScore = appQualWeight;
        }
        details.factors.qualification = Math.round(Math.min(100, qualScore));

        // 4. KEYWORD / TEXT MATCH (20%)
        let keywordScore = 0;
        let jobDomain = '';

        for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
            const domainMatchCount = keywords.filter(k => targetFullText.includes(k)).length;
            if (domainMatchCount > 2) {
                jobDomain = domain;
                break;
            }
        }

        const candidateInfo = (app.qualification + ' ' + (app.applied_vacancy || '') + ' ' + (app.last_applied_vacancy || '') + ' ' + app.tags).toLowerCase();

        if (jobDomain && DOMAIN_KEYWORDS[jobDomain]) {
            const domainKeywords = DOMAIN_KEYWORDS[jobDomain];
            const candidateDomainMatches = domainKeywords.filter(k => candidateInfo.includes(k)).length;
            keywordScore = Math.min(100, (candidateDomainMatches / Math.min(8, domainKeywords.length)) * 100);
        } else {
            keywordScore = 50; 
        }

        // Bonus for job title similarity
        if (selectedVac && app.vacancy_title && app.vacancy_title.toLowerCase().includes(selectedVac.designation.toLowerCase())) {
            keywordScore += 20;
        }

        details.factors.keyword = Math.round(Math.min(100, keywordScore));

        // FINAL WEIGHTED CALCULATION
        const finalScore = (details.factors.skills * 0.40) +
            (details.factors.experience * 0.25) +
            (details.factors.qualification * 0.15) +
            (details.factors.keyword * 0.20);

        return { score: Math.min(100, Math.round(finalScore)), details };
    };

    const filteredApps = applications
        .filter(app => {
            if (!filters.search) return true;
            const q = filters.search.toLowerCase();
            return (app.first_name + ' ' + app.last_name).toLowerCase().includes(q) ||
                app.email.toLowerCase().includes(q) ||
                app.contact_number.includes(q);
        })
        .sort((a, b) => {
            if (filters.sortBy === 'newest') return new Date(b.applied_at) - new Date(a.applied_at);
            if (filters.sortBy === 'oldest') return new Date(a.applied_at) - new Date(b.applied_at);

            if (filters.sortBy === 'matchScore') {
                const aScore = calculateMatchScore(a).score;
                const bScore = calculateMatchScore(b).score;
                return bScore - aScore;
            }

            if (filters.sortBy === 'highExperience' || filters.sortBy === 'lowExperience') {
                const expMap = {
                    '10+ years': 7, '8-10 years': 6, '5-7 years': 5,
                    '3-4 years': 4, '1-2 years': 3, '0-1 years': 2, '0 years': 1
                };
                const aVal = expMap[a.overall_experience] || 0;
                const bVal = expMap[b.overall_experience] || 0;
                return filters.sortBy === 'highExperience' ? bVal - aVal : aVal - bVal;
            }

            return new Date(b.applied_at) - new Date(a.applied_at);
        });

    // Pagination Logic
    const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedApps = filteredApps.slice(startIndex, startIndex + itemsPerPage);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    return (
        <div className="manage-vacancies-console">
            {/* HEREO / HEADER SECTION */}
            <div className="vacancies-orchestration-header">
                <div className="hero-bg-accent"></div>
                <div className="header-content-p">
                    <div className="console-badge">
                        <span className="live-dot pulse"></span>
                        CANDIDATE ORCHESTRATION PIPELINE
                    </div>
                    <h1 className="serif-title-p">Applications</h1>
                    <p className="hero-subline">Review and manage candidates for all active roles across George Steuart & Company.</p>
                </div>
                <button className="btn-establish-p" onClick={handleExport}>
                    <FiDownload /> <span>Export to CSV</span>
                </button>
            </div>

            {/* CONTROL BAR */}
            <div className="console-toolbar-p">
                {/* Row 1: Search + Reset */}
                <div className="toolbar-search-row">
                    <div className="search-orchestrator">
                        <FiSearch className="s-icon" />
                        <input
                            id="applicant_search"
                            name="applicant_search"
                            type="text"
                            placeholder="Search by applicant name, email, or contact number..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>
                    <button className="btn-reset-console" onClick={clearFilters}>
                        <FiX size={14} /> Reset Filters
                    </button>
                    {filters.vacancy_id && (
                        <button
                            className="btn-match-console animated-fade-in"
                            onClick={applyAutoMatch}
                            title="Auto-filter candidates matching this role's requirements"
                        >
                            <FiCheckCircle size={14} /> Match Reqs
                        </button>
                    )}
                </div>

                {/* Divider */}
                <div className="toolbar-divider" />

                {/* Row 2: Filter dropdowns with labels */}
                <div className="toolbar-filters-row">
                    <div className="filter-group">
                        <label htmlFor="vacancy_filter" className="filter-label">Position</label>
                        <div className="select-orchestrator select-lg">
                            <FiBriefcase className="f-icon" />
                            <select
                                id="vacancy_filter"
                                name="vacancy_id"
                                value={filters.vacancy_id}
                                onChange={(e) => {
                                    const newVacId = e.target.value;
                                    setFilters(prev => ({
                                        ...prev,
                                        vacancy_id: newVacId,
                                        sortBy: newVacId ? 'matchScore' : 'highExperience'
                                    }));
                                }}
                            >
                                <option value="">All Active Roles</option>
                                {vacancies.map(v => <option key={v.id} value={v.id}>{v.title}</option>)}
                            </select>
                        </div>
                    </div>

                    {(admin.role === 'super_admin' || admin.role === 'admin') && (
                        <div className="filter-group">
                            <label htmlFor="company_filter" className="filter-label">Establishment</label>
                            <div className="select-orchestrator select-lg">
                                <FiHome className="f-icon" />
                                <select
                                    id="company_filter"
                                    name="company_id"
                                    value={filters.company_id}
                                    onChange={(e) => setFilters({ ...filters, company_id: e.target.value })}
                                >
                                    <option value="">All Entities</option>
                                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="filter-group">
                        <label htmlFor="experience_filter" className="filter-label">Min. Experience</label>
                        <div className="select-orchestrator">
                            <FiCheckCircle className="f-icon" />
                            <select
                                id="experience_filter"
                                name="overall_experience"
                                value={filters.overall_experience}
                                onChange={(e) => setFilters({ ...filters, overall_experience: e.target.value })}
                            >
                                <option value="">All Experience</option>
                                <option value="0 years">0 years (Freshers)</option>
                                <option value="0-1 years">0–1 years</option>
                                <option value="1-2 years">1–2 years</option>
                                <option value="3-4 years">3–4 years</option>
                                <option value="5-7 years">5–7 years</option>
                                <option value="8-10 years">8–10 years</option>
                                <option value="10+ years">10+ years</option>
                            </select>
                        </div>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="qualification_filter" className="filter-label">Credential</label>
                        <div className="select-orchestrator">
                            <FiFileText className="f-icon" />
                            <select
                                id="qualification_filter"
                                name="qualification"
                                value={filters.qualification}
                                onChange={(e) => setFilters({ ...filters, qualification: e.target.value })}
                            >
                                <option value="">Any Qual.</option>
                                {QUALIFICATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="status_filter" className="filter-label">Status</label>
                        <div className="select-orchestrator">
                            <FiFilter className="f-icon" />
                            <select
                                id="status_filter"
                                name="status"
                                value={filters.status}
                                onChange={(e) => setFilters({
                                    ...filters,
                                    status: e.target.value,
                                    interview_date: e.target.value === 'shortlisted' ? filters.interview_date : ''
                                })}
                            >
                                <option value="">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="under_review">Under Review</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    {filters.status === 'shortlisted' && (
                        <div className="filter-group">
                            <label htmlFor="interview_date_filter" className="filter-label">Date</label>
                            <div className="select-orchestrator">
                                <FiCalendar className="f-icon" />
                                <input
                                    id="interview_date_filter"
                                    name="interview_date"
                                    type="date"
                                    value={filters.interview_date}
                                    onChange={(e) => setFilters({ ...filters, interview_date: e.target.value })}
                                    className="date-orchestrator-input"
                                />
                            </div>
                        </div>
                    )}

                    <div className="filter-group filter-field-sort">
                        <label htmlFor="sort_by" className="filter-label sort-label">Sort</label>
                        <div className="select-orchestrator">
                            <select
                                id="sort_by"
                                name="sortBy"
                                value={filters.sortBy}
                                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                className="sort-select-crimson"
                            >
                                <option value="matchScore">Best Match Score</option>
                                <option value="highExperience">High Experience</option>
                                <option value="lowExperience">Low Experience</option>
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Job Position Info Panel — auto-displays on vacancy select ===== */}
            {filters.vacancy_id && (() => {
                if (!selVac.id) return null;
                return (
                    <div style={{
                        margin: '0 0 24px 0',
                        borderRadius: '16px',
                        border: '1px solid rgba(200,169,81,0.25)',
                        background: 'linear-gradient(135deg, #fffdf5 0%, #fff8e8 100%)',
                        boxShadow: '0 4px 20px rgba(184,134,11,0.08)',
                        overflow: 'hidden'
                    }}>
                        {/* Header bar */}
                        <div style={{
                            background: 'linear-gradient(135deg, #1a0305 0%, #3d0a10 100%)',
                            padding: '14px 24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12
                        }}>
                            <FiBriefcase style={{ color: '#c8a951', flexShrink: 0 }} size={18} />
                            <div style={{ flex: 1 }}>
                                <span style={{ color: '#c8a951', fontWeight: 700, fontSize: '1rem', letterSpacing: 0.3 }}>
                                    {selVac.title}
                                </span>
                                {selVac.company_name && (
                                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginLeft: 10 }}>
                                        — {selVac.company_name}
                                    </span>
                                )}
                            </div>
                            <div
                                onClick={() => setShowJobDetails(!showJobDetails)}
                                style={{
                                    background: showJobDetails ? 'rgba(200,169,81,0.2)' : 'rgba(200,169,81,0.1)',
                                    border: '1px solid rgba(200,169,81,0.35)',
                                    color: '#c8a951',
                                    borderRadius: 8,
                                    padding: '5px 12px',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    letterSpacing: 1,
                                    textTransform: 'uppercase',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                className="job-details-toggle-btn"
                            >
                                {showJobDetails ? 'Hide Details' : 'Job Details'}
                                <FiChevronRight style={{
                                    transform: showJobDetails ? 'rotate(90deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease'
                                }} size={15} />
                            </div>
                        </div>

                        {/* Info pills row — only shown when expanded */}
                        {showJobDetails && (
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 12,
                                padding: '16px 24px',
                                borderBottom: '1px solid rgba(200,169,81,0.15)',
                                animation: 'fadeInDown 0.3s ease-out'
                            }}>
                                {/* Reference Number */}
                                {selVac.reference_number && (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 7,
                                        background: '#fff', border: '1px solid rgba(200,169,81,0.3)',
                                        borderRadius: 10, padding: '7px 14px'
                                    }}>
                                        <FiHash size={13} style={{ color: '#b8860b' }} />
                                        <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Ref No.</span>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#b8860b' }}>{selVac.reference_number}</span>
                                    </div>
                                )}

                                {/* Min Experience */}
                                {selVac.min_experience && (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 7,
                                        background: '#fff', border: '1px solid rgba(99,179,237,0.3)',
                                        borderRadius: 10, padding: '7px 14px'
                                    }}>
                                        <FiAward size={13} style={{ color: '#3182ce' }} />
                                        <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Min. Experience</span>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#3182ce' }}>{selVac.min_experience}</span>
                                    </div>
                                )}

                                {/* Min Relevant Experience */}
                                {selVac.min_relevant_experience && (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 7,
                                        background: '#fff', border: '1px solid rgba(99,179,237,0.3)',
                                        borderRadius: 10, padding: '7px 14px'
                                    }}>
                                        <FiTarget size={13} style={{ color: '#2b6cb0' }} />
                                        <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Relevant Exp.</span>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2b6cb0' }}>{selVac.min_relevant_experience}</span>
                                    </div>
                                )}

                                {/* Required Qualification */}
                                {selVac.min_qualification && (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 7,
                                        background: '#fff', border: '1px solid rgba(72,187,120,0.35)',
                                        borderRadius: 10, padding: '7px 14px'
                                    }}>
                                        <FiCheckCircle size={13} style={{ color: '#38a169' }} />
                                        <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Required Qual.</span>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38a169' }}>{selVac.min_qualification}</span>
                                    </div>
                                )}

                                {/* Employment Type */}
                                {selVac.employment_type && (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 7,
                                        background: '#fff', border: '1px solid rgba(160,118,249,0.3)',
                                        borderRadius: 10, padding: '7px 14px'
                                    }}>
                                        <FiTag size={13} style={{ color: '#805ad5' }} />
                                        <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Type</span>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#805ad5' }}>{selVac.employment_type}</span>
                                    </div>
                                )}

                                {/* Location */}
                                {selVac.location && (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 7,
                                        background: '#fff', border: '1px solid rgba(237,137,54,0.3)',
                                        borderRadius: 10, padding: '7px 14px'
                                    }}>
                                        <FiMapPin size={13} style={{ color: '#dd6b20' }} />
                                        <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Location</span>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#dd6b20' }}>{selVac.location}</span>
                                    </div>
                                )}

                                {/* Deadline */}
                                {selVac.expire_date && (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 7,
                                        background: '#fff', border: '1px solid rgba(252,129,74,0.3)',
                                        borderRadius: 10, padding: '7px 14px'
                                    }}>
                                        <FiCalendar size={13} style={{ color: '#e53e3e' }} />
                                        <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Deadline</span>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e53e3e' }}>
                                            {new Date(selVac.expire_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                )}
                            </div>)}

                        {/* Description & Requirements */}
                        {showJobDetails && (selVac.description || selVac.requirements) && (
                            <div className="vacancy-details-grid animated-fade-in" style={{ animationDuration: '0.4s' }}>
                                {selVac.description && (
                                    <div className="vd-col description-col">
                                        <div className="vd-col-header">
                                            <FiInfo size={14} />
                                            <span>Job Description</span>
                                        </div>
                                        <div className="vd-content-box">
                                            {renderFormattedText(selVac.description)}
                                        </div>
                                    </div>
                                )}
                                {selVac.requirements && (
                                    <div className="vd-col requirements-col">
                                        <div className="vd-col-header green">
                                            <FiAlertCircle size={14} />
                                            <span>Requirements</span>
                                        </div>
                                        <div className="vd-content-box">
                                            {renderFormattedText(selVac.requirements)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })()}

            {/* ===== Suggested Talent Pool — Teaser + Collapsible Section ===== */}
            {filters.vacancy_id && suggestions.length > 0 && (
                <div className="stp-section">
                    {/* Teaser Banner — always visible, click to expand */}
                    <div className="stp-header-banner stp-teaser" onClick={() => setShowSuggestions(s => !s)}>
                        <div className="stp-header-left">
                            <div className="stp-icon-wrap">🔥</div>
                            <div>
                                <h2 className="stp-title">
                                    {suggestions.length} candidate{suggestions.length !== 1 ? 's' : ''} already match this job!
                                </h2>
                                <p className="stp-subtitle">
                                    {showSuggestions
                                        ? 'Click to hide — these candidates opted in for future roles'
                                        : 'From your Talent Pool — click to view & invite them instantly'}
                                </p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div className="stp-match-badge">
                                <span className="stp-count">{suggestions.length}</span>
                                <span className="stp-count-label">Match{suggestions.length !== 1 ? 'es' : ''}</span>
                            </div>
                            <div className="stp-chevron" style={{ transform: showSuggestions ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                <FiChevronRight size={22} style={{ transform: 'rotate(90deg)', color: 'rgba(255,255,255,0.6)' }} />
                            </div>
                        </div>
                    </div>

                    {/* Candidate Cards — only shown when expanded */}
                    {showSuggestions && (
                        <div className="stp-cards-grid">
                            {suggestions.map((sug, idx) => (
                                <div
                                    key={idx}
                                    className="stp-card"
                                    onClick={() => setShowDetail({ ...sug, is_suggestion: true })}
                                >
                                    <div className="stp-card-inner">
                                        <div className="stp-avatar">
                                            {sug.first_name?.[0]}{sug.last_name?.[0]}
                                        </div>
                                        <div className="stp-info">
                                            <div className="stp-name-row">
                                                <span className="stp-name">{sug.first_name} {sug.last_name}</span>
                                                <span className="stp-consented-badge">✓ Consented</span>
                                            </div>
                                            <div className="stp-prev">
                                                Previously applied: <strong>{sug.last_applied_vacancy}</strong>
                                            </div>
                                            <div className="stp-pills-row">
                                                <span className="stp-pill stp-pill-gold">{sug.overall_experience} exp</span>
                                                <span className="stp-pill stp-pill-light">{sug.qualification}</span>
                                                {sug.last_status === 'shortlisted' && (
                                                    <span className="stp-pill stp-pill-green">Favored</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="stp-action">
                                            <a
                                                href={`mailto:${sug.email}?subject=Exciting Opportunity at George Steuart`}
                                                className="stp-invite-btn"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                <FiMail size={14} /> Invite
                                            </a>
                                            <button className="stp-view-btn" onClick={(e) => { e.stopPropagation(); setShowDetail({ ...sug, is_suggestion: true }); }}>
                                                View <FiChevronRight size={13} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <style>{`
                        .stp-section {
                            margin-bottom: 36px;
                            border-radius: 20px;
                            overflow: hidden;
                            border: 1px solid rgba(200,169,81,0.2);
                            box-shadow: 0 8px 30px rgba(0,0,0,0.06);
                        }
                        .stp-header-banner {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            background: linear-gradient(135deg, #2a050b 0%, var(--crimson-dark) 100%);
                            padding: 22px 28px;
                            gap: 20px;
                        }
                        .stp-teaser {
                            cursor: pointer;
                            user-select: none;
                            transition: opacity 0.15s;
                        }
                        .stp-teaser:hover { opacity: 0.92; }
                        .stp-chevron { transition: transform 0.3s ease; }
                        .stp-header-left {
                            display: flex;
                            align-items: center;
                            gap: 16px;
                        }
                        .stp-icon-wrap {
                            font-size: 1.8rem;
                            width: 52px;
                            height: 52px;
                            background: rgba(200,169,81,0.15);
                            border: 1px solid rgba(200,169,81,0.3);
                            border-radius: 14px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-shrink: 0;
                        }
                        .stp-title {
                            color: #fff;
                            font-family: var(--font-heading, serif);
                            font-size: 1.25rem;
                            margin: 0 0 4px 0;
                            font-weight: 700;
                        }
                        .stp-subtitle {
                            color: rgba(255,255,255,0.55);
                            font-size: 0.8rem;
                            margin: 0;
                        }
                        .stp-match-badge {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            background: rgba(200,169,81,0.12);
                            border: 1px solid rgba(200,169,81,0.35);
                            border-radius: 14px;
                            padding: 10px 20px;
                            flex-shrink: 0;
                        }
                        .stp-count {
                            font-size: 1.8rem;
                            font-weight: 800;
                            color: var(--gold-accent, #c8a951);
                            line-height: 1;
                        }
                        .stp-count-label {
                            font-size: 0.65rem;
                            color: rgba(200,169,81,0.7);
                            text-transform: uppercase;
                            letter-spacing: 0.8px;
                            font-weight: 600;
                        }
                        .stp-cards-grid {
                            background: #fafbfc;
                            display: flex;
                            flex-direction: column;
                        }
                        .stp-card {
                            cursor: pointer;
                            border-bottom: 1px solid #f0f1f5;
                            transition: background 0.2s;
                        }
                        .stp-card:last-child { border-bottom: none; }
                        .stp-card:hover { background: #fff; }
                        .stp-card-inner {
                            display: flex;
                            align-items: center;
                            gap: 18px;
                            padding: 18px 28px;
                        }
                        .stp-avatar {
                            width: 48px;
                            height: 48px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, var(--crimson-dark), var(--crimson));
                            color: #fff;
                            font-weight: 800;
                            font-size: 1rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-shrink: 0;
                            letter-spacing: 1px;
                        }
                        .stp-info { flex: 1; min-width: 0; }
                        .stp-name-row {
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            margin-bottom: 4px;
                        }
                        .stp-name {
                            font-weight: 700;
                            color: var(--text-primary, #1a1a2e);
                            font-size: 0.95rem;
                        }
                        .stp-consented-badge {
                            font-size: 0.6rem;
                            background: #ecfdf5;
                            color: #059669;
                            border: 1px solid #a7f3d0;
                            padding: 2px 7px;
                            border-radius: 100px;
                            font-weight: 700;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        }
                        .stp-prev {
                            font-size: 0.78rem;
                            color: var(--text-muted, #94a3b8);
                            margin-bottom: 8px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .stp-prev strong { color: #475569; }
                        .stp-pills-row { display: flex; gap: 6px; flex-wrap: wrap; }
                        .stp-pill {
                            font-size: 0.7rem;
                            font-weight: 700;
                            padding: 2px 9px;
                            border-radius: 100px;
                        }
                        .stp-pill-gold {
                            background: rgba(200,169,81,0.1);
                            color: var(--gold-accent, #c8a951);
                            border: 1px solid rgba(200,169,81,0.25);
                        }
                        .stp-pill-light { background: #f1f5f9; color: #475569; }
                        .stp-pill-green { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
                        .stp-action { display: flex; gap: 8px; flex-shrink: 0; align-items: center; }
                        .stp-invite-btn {
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            background: var(--gold-accent, #c8a951);
                            color: #fff;
                            font-size: 0.8rem;
                            font-weight: 700;
                            padding: 7px 14px;
                            border-radius: 8px;
                            text-decoration: none;
                            transition: opacity 0.2s, transform 0.2s;
                        }
                        .stp-invite-btn:hover { opacity: 0.88; transform: translateY(-1px); }
                        .stp-view-btn {
                            display: flex;
                            align-items: center;
                            gap: 4px;
                            background: none;
                            border: 1.5px solid #e2e8f0;
                            color: #475569;
                            font-size: 0.8rem;
                            font-weight: 600;
                            padding: 7px 12px;
                            border-radius: 8px;
                            cursor: pointer;
                            transition: all 0.2s;
                            font-family: inherit;
                        }
                        .stp-view-btn:hover { border-color: var(--crimson, #8b1a2b); color: var(--crimson, #8b1a2b); }
                        @media (max-width: 640px) {
                            .stp-card-inner { flex-wrap: wrap; }
                            .stp-action { width: 100%; justify-content: flex-end; }
                        }
                    `}</style>
                </div>
            )}

            {/* DATA ORCHESTRATION TABLE */}
            <div className="orchestration-table-wrapper card-p" style={{ marginBottom: '16px' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid #f0f2f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredApps.length}</strong> candidates
                        </span>
                        {selectedIds.length > 0 && (
                            <div className="bulk-selection-badge animated-fade-in">
                                <strong>{selectedIds.length}</strong> Selected
                            </div>
                        )}
                    </div>
                    {selectedIds.length > 0 && !['super_admin', 'sub_admin2', 'sub_admin'].includes(admin.role) && (
                        <button
                            className="btn btn-danger-minimal"
                            onClick={() => setShowDeleteModal(true)}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '12px' }}
                        >
                            <FiXCircle /> Bulk Delete
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="loading-state-p">
                        <div className="spinner-p"></div>
                        <p>Synchronizing pipeline data...</p>
                    </div>
                ) : filteredApps.length === 0 ? (
                    <div className="empty-state-p">
                        <div className="empty-icon"><FiUser /></div>
                        <h3>No prospects found</h3>
                        <p>We couldn't find any candidates matching your current filters.</p>
                        <button className="btn btn-outline" onClick={clearFilters}>Reset Console</button>
                    </div>
                ) : (
                    <div className="premium-table-container">
                        <table className="premium-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}>
                                        <input
                                            type="checkbox"
                                            className="premium-checkbox"
                                            onChange={handleSelectAll}
                                            checked={paginatedApps.length > 0 && selectedIds.length === paginatedApps.length}
                                        />
                                    </th>
                                    <th>Candidate</th>
                                    <th>Target Position</th>
                                    <th>Credentials</th>
                                    <th>Applied Timeline</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedApps.map((app) => (
                                    <tr key={app.id} className={selectedIds.includes(app.id) ? 'row-selected' : ''}>
                                        <td data-label="Select">
                                            <input
                                                type="checkbox"
                                                className="premium-checkbox"
                                                checked={selectedIds.includes(app.id)}
                                                onChange={() => handleSelectOne(app.id)}
                                                onClick={e => e.stopPropagation()}
                                            />
                                        </td>
                                        <td data-label="Candidate">
                                            <div className="candidate-cell">
                                                <div className="candidate-avatar">
                                                    {app.first_name?.[0]}{app.last_name?.[0]}
                                                </div>
                                                <div className="candidate-info">
                                                    <div className="name">
                                                        {app.first_name} {app.last_name}
                                                        <span className={`status-pill status-${(app.status || 'pending').replace('_', '-')}`}>
                                                            {(app.status || 'pending').replace('_', ' ')}
                                                        </span>
                                                        {app.is_email_blocked == 1 && (
                                                            <span title="This email has been blocked in the Talent Pool" style={{ background: '#fef2f2', color: '#dc2626', padding: '2px 7px', borderRadius: 100, fontSize: '0.6rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 3, cursor: 'help' }}>
                                                                <FiSlash size={9} /> Blocked
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="email">
                                                        <FiMail size={12} /> {app.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="Target Position">
                                            <div className="position-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <img
                                                    src={app.company_logo ? `${BACKEND_ROOT}/uploads/logos/${app.company_logo}` : '/gs-logo.png'}
                                                    alt={app.company_name}
                                                    onError={(e) => e.target.src = '/gs-logo.png'}
                                                    style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '6px', background: '#fff', border: '1px solid #e2e8f0', padding: '3px', flexShrink: 0 }}
                                                />
                                                <div>
                                                    {app.job_ref && <span className="ref-badge">#{app.job_ref}</span>}
                                                    <h4 className="position-title" style={{ margin: 0 }}>{app.vacancy_title}</h4>
                                                    <div className="company-name" style={{ margin: 0 }}>{app.company_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="Credentials">
                                            <div className="credentials-cell">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                                                    <span className="exp-badge">{app.overall_experience}</span>
                                                    {(() => {
                                                        const scoreData = calculateMatchScore(app);
                                                        const isQual = scoreData.details.isQualified;
                                                        const score = scoreData.score;
                                                        
                                                        let badgeClass = 'match-pill-low';
                                                        if (score >= 80) badgeClass = 'match-pill-high';
                                                        else if (score >= 50) badgeClass = 'match-pill-medium';
                                                        
                                                        return (
                                                            <>
                                                                <span className={`match-score-pill ${badgeClass}`} title={`Skills: ${scoreData.details.factors.skills}%, Exp: ${scoreData.details.factors.experience}%, Qual: ${scoreData.details.factors.qualification}%, Domain: ${scoreData.details.factors.keyword}%`}>
                                                                    🎯 {score}% Match
                                                                </span>
                                                                {filters.vacancy_id && (
                                                                    isQual ? (
                                                                        <div className="match-indicator qualified" title="Meets/Exceeds Required Experience">
                                                                            <FiCheckCircle />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="match-indicator under" title="Below Required Experience">
                                                                            <FiAlertCircle />
                                                                        </div>
                                                                    )
                                                                )}
                                                            </>
                                                        );
                                                    })()}
                                                </div>
                                                <div className="degree-txt">{app.qualification}</div>
                                            </div>
                                        </td>
                                        <td data-label="Applied Timeline">
                                            <div className="timeline-cell">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                                                    <FiCalendar size={14} style={{ color: 'var(--gold-accent)' }} />
                                                    {formatDateTime(app.applied_at)}
                                                </div>
                                                {app.status === 'shortlisted' && app.interview_date && (
                                                    <div className="schedule-widget">
                                                        <div className="schedule-header">
                                                            <FiCalendar size={12} /> Scheduled
                                                        </div>
                                                        <div className="schedule-time">{formatDate(app.interview_date)}</div>
                                                        <div className="schedule-time" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{app.interview_time}</div>
                                                        <div style={{ marginTop: '6px' }}>
                                                            {app.interview_confirmed === 'yes' ? (
                                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: '700', color: '#16a34a', background: '#ecfdf5', border: '1px solid #b7f4cf', borderRadius: '100px', padding: '2px 8px' }}>
                                                                    ✅ Confirmed
                                                                </span>
                                                            ) : app.interview_confirmed === 'no' ? (
                                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: '700', color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '100px', padding: '2px 8px' }}>
                                                                    ❌ Declined
                                                                </span>
                                                            ) : (
                                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: '700', color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '100px', padding: '2px 8px' }}>
                                                                    📩 Invited (Awaiting)
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td data-label="Actions">
                                            <div className="actions-cell">
                                                {app.status === 'shortlisted' ? (
                                                    app.interview_date ? (
                                                        <span title="Interview already sent" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', fontWeight: 700, color: '#38a169', background: '#f0fff4', border: '1px solid #c6f6d5', borderRadius: 8, padding: '6px 10px' }}>
                                                            ✅ Invited
                                                        </span>
                                                    ) : (
                                                        <button
                                                            className="action-btn success"
                                                            title={['super_admin', 'sub_admin2', 'sub_admin'].includes(admin.role) ? "Action restricted" : "Send Interview Invite"}
                                                            style={{ background: '#ebf8ff', color: '#2b6cb0', border: '1px solid #bee3f8', opacity: ['super_admin', 'sub_admin2', 'sub_admin'].includes(admin.role) ? 0.5 : 1, cursor: ['super_admin', 'sub_admin2', 'sub_admin'].includes(admin.role) ? 'not-allowed' : 'pointer' }}
                                                            onClick={(e) => { e.stopPropagation(); setInviteTarget(app); setShowSendInviteModal(true); }}
                                                            disabled={['super_admin', 'sub_admin2', 'sub_admin'].includes(admin.role)}
                                                        >
                                                            📩
                                                        </button>
                                                    )
                                                ) : (
                                                    <button
                                                        className="action-btn success"
                                                        title={['super_admin', 'sub_admin2', 'sub_admin'].includes(admin.role) ? "Action restricted" : "Shortlist Candidate"}
                                                        style={{ opacity: ['super_admin', 'sub_admin2', 'sub_admin'].includes(admin.role) ? 0.5 : 1, cursor: ['super_admin', 'sub_admin2', 'sub_admin'].includes(admin.role) ? 'not-allowed' : 'pointer' }}
                                                        onClick={(e) => { e.stopPropagation(); setShowDetail(app); setShowConfirmShortlist(true); }}
                                                        disabled={['super_admin', 'sub_admin2', 'sub_admin'].includes(admin.role)}
                                                    >
                                                        <FiCheckCircle size={18} />
                                                    </button>
                                                )}
                                                <button
                                                    className="action-btn details"
                                                    title="View Details"
                                                    onClick={() => setShowDetail(app)}
                                                >
                                                    <FiArrowRight size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="pagination-footer">
                            <div className="page-info">
                                Showing <strong>{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredApps.length)}</strong> of <strong>{filteredApps.length}</strong> candidates
                            </div>
                            <div className="pagination-controls">
                                <button
                                    className="page-btn"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    title="Previous Page"
                                >
                                    <FiChevronLeft /> Previous
                                </button>
                                <button
                                    className="page-btn"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    title="Next Page"
                                >
                                    Next <FiChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {showDetail && (() => {
                const { name: cleanName, location: cleanLocation } = cleanCandidateNameAndLocation(showDetail.first_name, showDetail.last_name);
                const initials = cleanName.split(/\s+/).map(w => w[0]).join('').substring(0, 2).toUpperCase();
                return (
                    <div className="confirm-overlay" onClick={() => setShowDetail(null)}>
                        <div className="confirm-modal candidate-detail-modal card-p animated-zoom" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '1450px', width: '96%', textAlign: 'left', overflow: 'hidden' }}>
                            <div className="modal-header-p candidate-header">
                                <div className="header-info-p">
                                    <div className="modal-avatar-wrapper">
                                        <div className="modal-avatar-ring"></div>
                                        <div className="modal-avatar-p">
                                            {initials}
                                        </div>
                                    </div>
                                    <div className="candidate-name-container">
                                        <h2>
                                            {cleanName}
                                            <span className={`status-badge-p badge-${showDetail.status || 'pending'}`}>
                                                {(showDetail.status || 'pending').replace('_', ' ')}
                                            </span>
                                        </h2>
                                        <div className="modal-subheaders">
                                            <p className="modal-prospect-tag">{showDetail.is_suggestion ? 'Pool Candidate' : `${showDetail.vacancy_title} Prospect`}</p>
                                            {cleanLocation && (
                                                <p className="modal-location-tag">
                                                    <FiMapPin size={12} style={{ color: 'var(--gold-accent)' }} />
                                                    {cleanLocation}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button className="o-btn delete" onClick={() => setShowDetail(null)}><FiX /></button>
                            </div>

                            <div className="modal-body-p" style={{ overflowY: 'auto', maxHeight: '82vh', padding: '24px 32px' }}>
                                {showDetail.is_suggestion && (
                                    <div style={{ background: '#ecfdf5', padding: '10px 16px', borderRadius: '10px', border: '1px solid #a7f3d0', color: '#065f46', fontSize: '0.85rem', marginBottom: '14px' }}>
                                        <p style={{ margin: 0 }}>This prospect matched your criteria from the Talent Pool. They previously applied for "{showDetail.last_applied_vacancy}" and consented to being contacted for future roles.</p>
                                    </div>
                                )}

                                {/* ── TOP INFO ROW: Contact + Profile + Submission in one strip ── */}
                                <div className="modal-info-grid">

                                    {/* Contact */}
                                    <div className="modal-info-card">
                                        <div className="modal-info-card-header">
                                            <FiUser size={13} /> Contact Protocols
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div className="info-item-row">
                                                <div className="info-item-icon">
                                                    <FiMail size={13} />
                                                </div>
                                                <div className="info-item-content">
                                                    <span className="info-item-label">Email</span>
                                                    <p className="info-item-val">{showDetail.email}</p>
                                                </div>
                                            </div>
                                            <div className="info-item-row">
                                                <div className="info-item-icon">
                                                    <FiPhone size={13} />
                                                </div>
                                                <div className="info-item-content">
                                                    <span className="info-item-label">Phone</span>
                                                    <p className="info-item-val">{showDetail.contact_number}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Professional Profile */}
                                    <div className="modal-info-card">
                                        <div className="modal-info-card-header">
                                            <FiBriefcase size={13} /> Professional Profile
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div className="info-item-row">
                                                <div className="info-item-icon">
                                                    <FiAward size={13} />
                                                </div>
                                                <div className="info-item-content">
                                                    <span className="info-item-label">Overall Exp.</span>
                                                    <p className="info-item-val">{showDetail.overall_experience}</p>
                                                </div>
                                            </div>
                                            <div className="info-item-row">
                                                <div className="info-item-icon">
                                                    <FiTarget size={13} />
                                                </div>
                                                <div className="info-item-content">
                                                    <span className="info-item-label">Relevant Exp.</span>
                                                    <p className="info-item-val">{showDetail.relevant_experience}</p>
                                                </div>
                                            </div>
                                            <div className="info-item-row">
                                                <div className="info-item-icon">
                                                    <FiCheckCircle size={13} />
                                                </div>
                                                <div className="info-item-content">
                                                    <span className="info-item-label">Qualification</span>
                                                    <p className="info-item-val">{showDetail.qualification}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submission Details */}
                                    <div className="modal-info-card">
                                        <div className="modal-info-card-header">
                                            <FiHome size={13} /> Submission Details
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div className="info-item-row">
                                                <div className="info-item-icon">
                                                    <FiHome size={13} />
                                                </div>
                                                <div className="info-item-content">
                                                    <span className="info-item-label">{showDetail.is_suggestion ? 'Previously Applied to' : 'Company'}</span>
                                                    <p className="info-item-val">{showDetail.is_suggestion ? showDetail.last_applied_vacancy : showDetail.company_name}</p>
                                                </div>
                                            </div>
                                            <div className="info-item-row">
                                                <div className="info-item-icon">
                                                    <FiTag size={13} />
                                                </div>
                                                <div className="info-item-content">
                                                    <span className="info-item-label">Salary Expectation</span>
                                                    <p className="info-item-val">{showDetail.salary_expectation || 'Not specified'}</p>
                                                </div>
                                            </div>
                                            <div className="info-item-row">
                                                <div className="info-item-icon">
                                                    <FiCalendar size={13} />
                                                </div>
                                                <div className="info-item-content">
                                                    <span className="info-item-label">Applied Date</span>
                                                    <p className="info-item-val">{formatDateTime(showDetail.applied_at)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Rejection / Block notices */}
                                {showDetail.status === 'rejected' && showDetail.rejection_reason && (
                                    <div className="rejection-reason-box" style={{ marginBottom: '12px' }}>
                                        <span>Rejection Reason</span>
                                        <p>{showDetail.rejection_reason}</p>
                                    </div>
                                )}
                                {Boolean(showDetail.is_blocked == 1 || showDetail.is_email_blocked) && (
                                    <div className="rejection-reason-box" style={{ border: '1px solid #fee2e2', background: '#fef2f2', color: '#991b1b', marginBottom: '12px' }}>
                                        <span style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px' }}><FiSlash size={14} /> BLOCK REASON (ADMIN ONLY)</span>
                                        <p style={{ color: '#991b1b', fontWeight: 600 }}>{showDetail.block_reason || 'No reason specified'}</p>
                                    </div>
                                )}

                                {/* ── CANDIDATE SKILLS & AI EVALUATION (full width) ── */}
                                <div style={{ marginBottom: '12px' }}>
                                    <div className="section-divider-p">
                                        Candidate Skills &amp; AI Recruiter Evaluation
                                    </div>
                                    {(() => {
                                        const { skills, parsedReport } = getNormalizedSkills(showDetail.skills_metadata, showDetail.tags);
                                        const tabCategories = ['Relevant Skills', 'Related Skills', 'Additional Skills'];
                                        const activeSkills = skills.filter(item => item.category === activeAdminTab);
                                        
                                        return (
                                            <div className="admin-recruiter-report">
                                                <div className="admin-ai-report-header">
                                                    <div className="admin-ai-badge">
                                                        <FiCpu size={14} style={{ color: 'var(--gold-accent)' }} />
                                                        <span>Steuart AI Recruiter Evaluation Report</span>
                                                    </div>
                                                </div>

                                                {parsedReport && (parsedReport.experience_summary || (Array.isArray(parsedReport.recruiter_insights) && parsedReport.recruiter_insights.length > 0)) && (
                                                    <div className="recruiter-report-summary">
                                                        {parsedReport.experience_summary && (
                                                            <div className="report-summary-block">
                                                                <h6>Experience Summary</h6>
                                                                <p className="summary-text">{parsedReport.experience_summary}</p>
                                                            </div>
                                                        )}
                                                        {Array.isArray(parsedReport.recruiter_insights) && parsedReport.recruiter_insights.length > 0 && (
                                                            <div className="report-insights-block">
                                                                <h6>Recruiter Insights &amp; Observations</h6>
                                                                <ul className="insights-list">
                                                                    {parsedReport.recruiter_insights.map((insight, idx) => (
                                                                        <li key={idx}>{insight}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {parsedReport && (
                                                    (Array.isArray(parsedReport.fully_demonstrated_skills) && parsedReport.fully_demonstrated_skills.length > 0) ||
                                                    (Array.isArray(parsedReport.partially_demonstrated_skills) && parsedReport.partially_demonstrated_skills.length > 0) ||
                                                    (Array.isArray(parsedReport.requirements_without_evidence) && parsedReport.requirements_without_evidence.length > 0)
                                                ) && (
                                                    <div className="requirements-validation-panel">
                                                        <h6>Mandatory Requirements Validation</h6>
                                                        <div className="validation-grid">
                                                            <div className="validation-col fully-supported">
                                                                <span className="col-title green"><FiCheckCircle size={12} /> Fully Demonstrated</span>
                                                                <div className="badge-list">
                                                                    {Array.isArray(parsedReport.fully_demonstrated_skills) && parsedReport.fully_demonstrated_skills.length > 0 ? (
                                                                        parsedReport.fully_demonstrated_skills.map((skill, idx) => (
                                                                            <span key={idx} className="val-badge green">{skill}</span>
                                                                        ))
                                                                    ) : (
                                                                        <span className="no-badge">None identified</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="validation-col partially-supported">
                                                                <span className="col-title orange"><FiAlertCircle size={12} /> Partially Demonstrated</span>
                                                                <div className="badge-list">
                                                                    {Array.isArray(parsedReport.partially_demonstrated_skills) && parsedReport.partially_demonstrated_skills.length > 0 ? (
                                                                        parsedReport.partially_demonstrated_skills.map((skill, idx) => (
                                                                            <span key={idx} className="val-badge orange">{skill}</span>
                                                                        ))
                                                                    ) : (
                                                                        <span className="no-badge">None identified</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="validation-col missing-evidence">
                                                                <span className="col-title red"><FiXCircle size={12} /> No Evidence Found</span>
                                                                <div className="badge-list">
                                                                    {Array.isArray(parsedReport.requirements_without_evidence) && parsedReport.requirements_without_evidence.length > 0 ? (
                                                                        parsedReport.requirements_without_evidence.map((skill, idx) => (
                                                                            <span key={idx} className="val-badge red">{skill}</span>
                                                                        ))
                                                                    ) : (
                                                                        <span className="no-badge">None identified</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="skills-analysis-matrix-block">
                                                    <div className="apb-skills-tabs">
                                                        {tabCategories.map(tabName => {
                                                            const count = skills.filter(item => item.category === tabName).length;
                                                            const emoji = tabName === 'Relevant Skills' ? '🟢' : tabName === 'Related Skills' ? '🟡' : '🔵';
                                                            
                                                            return (
                                                                <button
                                                                    key={tabName}
                                                                    type="button"
                                                                    className={`apb-tab-btn ${activeAdminTab === tabName ? 'active' : ''}`}
                                                                    onClick={() => setActiveAdminTab(tabName)}
                                                                >
                                                                    <span>{emoji} {tabName}</span>
                                                                    <span style={{
                                                                        fontSize: '0.7rem',
                                                                        background: activeAdminTab === tabName ? 'rgba(139,26,43,0.1)' : '#f1f5f9',
                                                                        color: activeAdminTab === tabName ? 'var(--crimson, #8b1a2b)' : '#64748b',
                                                                        padding: '2px 8px',
                                                                        borderRadius: '100px',
                                                                        fontWeight: 800,
                                                                        marginLeft: '6px'
                                                                    }}>
                                                                        {count}
                                                                    </span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>

                                                    {activeSkills.length > 0 ? (
                                                        <div className="admin-skills-list-grid">
                                                            {activeSkills.map((item, idx) => {
                                                                const isMand = parsedReport && (
                                                                    parsedReport.fully_demonstrated_skills?.includes(item.skill) || 
                                                                    parsedReport.partially_demonstrated_skills?.includes(item.skill)
                                                                );
                                                                const isVerified = item.verified !== false;
                                                                return (
                                                                    <div key={idx} className={`admin-skill-card-detailed ${isMand ? 'admin-mandatory-match' : ''}`}>
                                                                        <div className="admin-skill-card-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                                                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', flex: 1 }}>
                                                                                <span className="admin-skill-name-txt" style={{ fontWeight: 800 }}>
                                                                                    {item.skill}
                                                                                </span>
                                                                                {isMand && (
                                                                                    <span className="admin-mand-pill">Mandatory</span>
                                                                                )}
                                                                                <span className={`skill-match-status-badge ${isVerified ? (item.category === 'Additional Skills' ? 'unrelated' : 'matched') : 'unmatched'}`}>
                                                                                    {isVerified ? (item.category === 'Additional Skills' ? '✓ In CV' : '✓ Verified') : '✗ Not found'}
                                                                                </span>
                                                                            </div>
                                                                            <span className="level-badge" style={{ margin: 0, textTransform: 'capitalize' }}>
                                                                                {item.experience_level}
                                                                            </span>
                                                                        </div>
                                                                        <div className="admin-skill-meta-row">
                                                                            <span className="source-txt" style={{ fontStyle: 'normal', fontWeight: 600 }}>
                                                                                via {item.evidence_source}
                                                                            </span>
                                                                        </div>
                                                                        <p className="admin-skill-context-txt">{item.context}</p>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <div style={{ padding: '20px 10px', textAlign: 'center', color: '#94a3b8', fontSize: '0.88rem' }}>
                                                            No skills identified under {activeAdminTab}.
                                                        </div>
                                                    )}
                                                </div>

                                                {parsedReport && (
                                                    (Array.isArray(parsedReport.qualifications_found) && parsedReport.qualifications_found.length > 0) ||
                                                    (Array.isArray(parsedReport.certifications_found) && parsedReport.certifications_found.length > 0)
                                                ) && (
                                                    <div className="credentials-validation-panel" style={{ marginTop: '16px' }}>
                                                        <h6>Credentials &amp; Additional Information</h6>
                                                        <div className="validation-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                                            <div className="validation-col">
                                                                <span className="col-title" style={{ color: '#4f46e5' }}><FiAward size={12} /> Qualifications Found</span>
                                                                <div className="badge-list">
                                                                    {Array.isArray(parsedReport.qualifications_found) && parsedReport.qualifications_found.length > 0 ? (
                                                                        parsedReport.qualifications_found.map((qual, idx) => (
                                                                            <span key={idx} className="val-badge blue" style={{ background: '#e0e7ff', color: '#4338ca', border: '1px solid #c7d2fe' }}>{qual}</span>
                                                                        ))
                                                                    ) : (
                                                                        <span className="no-badge">None identified</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="validation-col">
                                                                <span className="col-title" style={{ color: '#0891b2' }}><FiCheckCircle size={12} /> Certifications Found</span>
                                                                <div className="badge-list">
                                                                    {Array.isArray(parsedReport.certifications_found) && parsedReport.certifications_found.length > 0 ? (
                                                                        parsedReport.certifications_found.map((cert, idx) => (
                                                                            <span key={idx} className="val-badge cyan" style={{ background: '#ecfeff', color: '#0e7490', border: '1px solid #c5f2f7' }}>{cert}</span>
                                                                        ))
                                                                    ) : (
                                                                        <span className="no-badge">None identified</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })()}
                                </div>

                                {/* Interview Schedule (if shortlisted with date) */}
                                {showDetail.status === 'shortlisted' && showDetail.interview_date && (
                                    <div style={{ marginBottom: '12px' }}>
                                        <div className="section-divider-p">
                                            Confirmed Interview Schedule
                                        </div>
                                        <div className="submission-box-p interview-widget-card">
                                            <div className="sm-item">
                                                <span>Medium / Type</span>
                                                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                                                    <FiVideo style={{ color: 'var(--gold-accent)' }} /> {showDetail.interview_type}
                                                </p>
                                            </div>
                                            <div className="sm-item">
                                                <span>Date &amp; Duration</span>
                                                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                                                    <FiCalendar style={{ color: 'var(--gold-accent)' }} /> {formatDate(showDetail.interview_date)} at {showDetail.interview_time}
                                                </p>
                                            </div>
                                            <div className="sm-item">
                                                <span>Location / Resource</span>
                                                <p style={{ fontSize: '0.85rem', wordBreak: 'break-all', display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-primary)' }}>
                                                    <FiMapPin style={{ color: 'var(--gold-accent)', marginTop: '4px' }} /> {showDetail.interview_location}
                                                </p>
                                            </div>
                                            <div className="sm-item">
                                                <span>Attendance Status</span>
                                                <p style={{ marginTop: '4px' }}>
                                                    {showDetail.interview_confirmed === 'yes' ? (
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '700', color: '#16a34a', background: '#ecfdf5', border: '1px solid #b7f4cf', borderRadius: '100px', padding: '2px 10px' }}>
                                                            ✅ Confirmed
                                                        </span>
                                                    ) : showDetail.interview_confirmed === 'no' ? (
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '700', color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '100px', padding: '2px 10px' }}>
                                                            ❌ Declined
                                                        </span>
                                                    ) : (
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '700', color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '100px', padding: '2px 10px' }}>
                                                            📩 Invited (Awaiting RSVP)
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="cv-preview-section-p">
                                    <div className="cv-banner-p">
                                        <div className="cb-icon"><FiFileText /></div>
                                        <div className="cb-text">
                                            <span>Curriculum Vitae</span>
                                            <p style={{ margin: 0 }}>{showDetail.first_name}_CV_{showDetail.is_suggestion ? 'Pool' : (showDetail.vacancy_title || 'Document').replace(/\s+/g, '_')}.{(showDetail.cv_path || '').split('.').pop() || 'pdf'}</p>
                                        </div>
                                        <button
                                            className="btn btn-gold"
                                            onClick={() => setViewingCV(showDetail)}
                                        >
                                            <FiExternalLink /> View Document
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Fixed Actions Footer */}
                            <div className="modal-actions-footer-p">
                                {['super_admin', 'sub_admin2', 'sub_admin'].includes(admin.role) ? (
                                    <button className="btn btn-outline" style={{ borderRadius: '12px', padding: '10px 24px', fontWeight: 600 }} onClick={() => setShowDetail(null)}>
                                        Close
                                    </button>
                                ) : showDetail.status === 'rejected' ? (
                                    <button className="btn btn-outline" style={{ borderRadius: '12px', padding: '10px 24px', fontWeight: 600 }} onClick={() => setShowDetail(null)}>
                                        Close
                                    </button>
                                ) : showDetail.status === 'shortlisted' ? (
                                    <>
                                        <button className="btn btn-outline" style={{ borderRadius: '12px', padding: '10px 24px', fontWeight: 600 }} onClick={() => setShowDetail(null)}>Close</button>
                                        {!showDetail.interview_date && (
                                            <button
                                                className="btn-status-action btn-status-shortlist"
                                                onClick={() => { setInviteTarget(showDetail); setShowDetail(null); setShowSendInviteModal(true); }}
                                            >
                                                📩 Send Interview Invite
                                            </button>
                                        )}
                                        {showDetail.interview_date && (
                                            <button
                                                className="btn-status-action btn-status-shortlist"
                                                onClick={() => { setInviteTarget(showDetail); setShowDetail(null); setShowSendInviteModal(true); }}
                                            >
                                                🔁 Re-send Invite
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-outline" style={{ borderRadius: '12px', padding: '10px 24px', fontWeight: 600 }} onClick={() => setShowDetail(null)}>Cancel</button>
                                        <button className="btn-status-action btn-status-pending" onClick={() => handleStatusUpdate(showDetail.id, 'pending')} disabled={processingStatus || showDetail.status === 'pending'}>Mark Pending</button>
                                        <button className="btn-status-action btn-status-review" onClick={() => handleStatusUpdate(showDetail.id, 'under_review')} disabled={processingStatus || showDetail.status === 'under_review'}>Under Review</button>
                                        <button className="btn-status-action btn-status-reject" onClick={() => setShowRejectModal(true)} disabled={processingStatus}>Reject Candidacy</button>
                                        <button className="btn-status-action btn-status-shortlist" onClick={() => setShowConfirmShortlist(true)} disabled={processingStatus}>✓ Shortlist</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Reject Reason Modal */}
            {showRejectModal && (
                <div className="confirm-overlay" style={{ zIndex: 1100 }} onClick={() => setShowRejectModal(false)}>
                    <div className="confirm-modal card-p animated-zoom" style={{ maxWidth: '500px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header-p" style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <h2>Reject Application</h2>
                            <button className="close-btn-p" onClick={() => { setShowRejectModal(false); setRejectReason(''); }}><FiX /></button>
                        </div>
                        <div className="modal-body-p">
                            <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
                                Please provide a reason for rejecting <strong>{showDetail?.first_name} {showDetail?.last_name}</strong>. This will be sent to the applicant via email.
                            </p>
                            <textarea
                                className="styled-input"
                                rows="4"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', resize: 'none' }}
                                placeholder="E.g., Does not meet the minimum experience requirements..."
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                            ></textarea>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                                <button className="btn btn-outline" style={{ borderRadius: '12px', padding: '12px 24px', fontWeight: 600 }} onClick={() => setShowRejectModal(false)}>Keep Candidate</button>
                                <button
                                    className="btn-status-action btn-status-reject"
                                    onClick={() => handleStatusUpdate(showDetail.id, 'rejected', rejectReason)}
                                    disabled={processingStatus || !rejectReason.trim()}
                                >
                                    {processingStatus ? 'Rejecting...' : 'Confirm Rejection'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Step 1: Confirm Shortlist Modal (no email) ── */}
            {showConfirmShortlist && showDetail && (
                <div className="confirm-overlay" style={{ zIndex: 1100 }} onClick={() => setShowConfirmShortlist(false)}>
                    <div className="confirm-modal card-p animated-zoom" style={{ maxWidth: '460px', width: '90%', textAlign: 'center', padding: '40px' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                        <h2 style={{ fontSize: '1.4rem', marginBottom: '10px', color: 'var(--text-primary)' }}>Shortlist Candidate?</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '8px', lineHeight: 1.6 }}>
                            You are about to shortlist <strong style={{ color: 'var(--text-primary)' }}>{showDetail.first_name} {showDetail.last_name}</strong> for <strong style={{ color: 'var(--text-primary)' }}>{showDetail.vacancy_title}</strong>.
                        </p>
                        <p style={{ color: '#b8860b', fontSize: '0.85rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '10px 14px', marginBottom: 28 }}>
                            📩 No email will be sent yet. Use <strong>"Send Interview Invite"</strong> as the next step.
                        </p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <button className="btn btn-outline" style={{ borderRadius: 12, padding: '12px 24px', fontWeight: 600 }} onClick={() => setShowConfirmShortlist(false)}>Cancel</button>
                            <button
                                className="btn-status-action btn-status-shortlist"
                                onClick={() => handleQuickShortlist(showDetail)}
                                disabled={processingStatus}
                            >
                                {processingStatus ? 'Shortlisting…' : 'Confirm Shortlist'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Step 2: Send Interview Invite Modal ── */}
            {showSendInviteModal && inviteTarget && (
                <div className="confirm-overlay" style={{ zIndex: 1100 }} onClick={closeInviteModal}>
                    <div className="confirm-modal card-p animated-zoom invite-invite-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="invite-modal-header-wrap" style={{ position: 'relative' }}>
                            {/* Close button — pinned top-right inside gradient header */}
                            <button className="invite-modal-close-btn" onClick={closeInviteModal} aria-label="Close">
                                <FiX size={18} />
                            </button>

                            {/* Icon + Title */}
                            <div className="invite-modal-title-row">
                                <div className="invite-modal-icon-lg"><FiMail size={24} /></div>
                                <h2 className="invite-modal-title-text">Send Interview Invitation</h2>
                            </div>

                            {/* Candidate info rows */}
                            <div className="invite-modal-meta">
                                <div className="invite-meta-row invite-meta-row--inline">
                                    <span className="invite-meta-label">Candidate</span>
                                    <strong className="invite-meta-name">{inviteTarget.first_name} {inviteTarget.last_name}</strong>
                                </div>
                                <div className="invite-meta-row invite-meta-row--block">
                                    <span className="invite-meta-label">Position</span>
                                    <span className="invite-meta-position">{inviteTarget.vacancy_title}</span>
                                </div>
                                {inviteTarget.contact_number && (
                                    <div className="invite-meta-row invite-meta-row--inline">
                                        <span className="invite-meta-label">Telephone</span>
                                        <span className="invite-phone-badge">
                                            <FiPhone size={13} strokeWidth={2.5} />
                                            {inviteTarget.contact_number}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-body-p">
                            <div style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
                                <div className="form-group-p">
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>Interview Type</label>
                                    <select className="styled-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        value={inviteData.interview_type} onChange={(e) => {
                                            setInviteData({ ...inviteData, interview_type: e.target.value, interview_location: '', interview_location_link: '' });
                                            setLocationPreset('');
                                        }}>
                                        <option value="Online">Online / Virtual</option>
                                        <option value="On-site">On-site / Physical</option>
                                    </select>
                                </div>
                                <div className="invite-modal-date-grid">
                                    <div className="form-group-p">
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>Interview Date</label>
                                        <input type="date" className="styled-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                            value={inviteData.interview_date} onChange={(e) => setInviteData({ ...inviteData, interview_date: e.target.value })} />
                                    </div>
                                    <div className="form-group-p">
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>Interview Time</label>
                                        <input type="time" className="styled-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                            value={inviteData.interview_time} onChange={(e) => setInviteData({ ...inviteData, interview_time: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group-p">
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                                        {inviteData.interview_type === 'Online' ? 'Meeting Link (Zoom/Teams/Meet)' : 'Interview Location (Address)'}
                                    </label>

                                    {inviteData.interview_type === 'Online' ? (
                                        /* Online — plain text for link */
                                        <input type="text" className="styled-input"
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                            placeholder="Zoom / Teams / Google Meet link…"
                                            value={inviteData.interview_location}
                                            onChange={(e) => setInviteData({ ...inviteData, interview_location: e.target.value })} />
                                    ) : (
                                        /* On-site — preset dropdown + Other textbox */
                                        <>
                                            <select
                                                className="styled-input"
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: locationPreset === 'Other' ? '10px' : 0 }}
                                                value={locationPreset}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setLocationPreset(val);
                                                    if (val && val !== 'Other') {
                                                        const locId = parseInt(val);
                                                        const selectedLoc = locations.find(l => l.id === locId);
                                                        if (selectedLoc) {
                                                            // Find the company to get c.location
                                                            const company = companies.find(c => c.id === selectedLoc.company_id);
                                                            const mainLocation = company ? company.location : '';
                                                            
                                                            setInviteData({ 
                                                                ...inviteData, 
                                                                interview_location: `${selectedLoc.company_name} — ${selectedLoc.location}`, 
                                                                interview_location_link: mainLocation || '' 
                                                            });
                                                        }
                                                    } else {
                                                        setInviteData({ ...inviteData, interview_location: '', interview_location_link: '' });
                                                    }
                                                }}
                                            >
                                                <option value="">— Select a location —</option>
                                                {companies.map(c => {
                                                    const companyLocs = locations.filter(loc => loc.company_id === c.id);
                                                    if (companyLocs.length === 0) return null;
                                                    return (
                                                        <optgroup key={c.id} label={c.name}>
                                                            {companyLocs.map(loc => (
                                                                <option key={loc.id} value={loc.id}>
                                                                    {loc.location}
                                                                </option>
                                                            ))}
                                                        </optgroup>
                                                    );
                                                })}
                                                <option value="Other">✏️ Other (type manually)</option>
                                            </select>

                                            {locationPreset === 'Other' && (
                                                <input
                                                    type="text"
                                                    className="styled-input"
                                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #c8a951', outline: 'none' }}
                                                    placeholder="Enter full address or room name…"
                                                    value={inviteData.interview_location}
                                                    onChange={(e) => setInviteData({ ...inviteData, interview_location: e.target.value })}
                                                    autoFocus
                                                />
                                            )}

                                            <div style={{ marginTop: '12px' }}>
                                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                                                    Location Map Link (Optional)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="styled-input"
                                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}
                                                    placeholder="Paste Google Maps link here..."
                                                    value={inviteData.interview_location_link}
                                                    onChange={(e) => setInviteData({ ...inviteData, interview_location_link: e.target.value })}
                                                />
                                                <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '4px 0 0 4px' }}>
                                                    Provide a map link to help the candidate find the location easily.
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="invite-modal-footer">
                                <button className="btn btn-outline invite-modal-cancel-btn" onClick={closeInviteModal}>Cancel</button>
                                <button
                                    className="btn-status-action btn-status-shortlist"
                                    onClick={handleSendInterview}
                                    disabled={sendingInvite || !inviteData.interview_date || !inviteData.interview_time || !inviteData.interview_location}
                                >
                                    {sendingInvite ? 'Sending…' : '📩 Send Interview Email'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Old Shortlist Modal (kept for backward compat, now unused) ── */}
            {showShortlistModal && (
                <div className="confirm-overlay" style={{ zIndex: 1100 }} onClick={() => setShowShortlistModal(false)}>
                    <div className="confirm-modal card-p animated-zoom" style={{ maxWidth: '550px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header-p" style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: '#ecfdf5', color: '#10b981', padding: '8px', borderRadius: '8px', display: 'flex' }}><FiCheckCircle size={20} /></div>
                                <h2>Shortlist Candidate</h2>
                            </div>
                            <button className="close-btn-p" onClick={() => setShowShortlistModal(false)}><FiX /></button>
                        </div>
                        <div className="modal-body-p">
                            <p style={{ marginBottom: '24px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                You are about to shortlist <strong style={{ color: 'var(--text-primary)' }}>{showDetail?.first_name || ''} {showDetail?.last_name || 'this candidate'}</strong>. Please enter the interview details below to be included in the invitation email.
                            </p>

                            <div className="admin-grid-1" style={{ gap: '16px' }}>
                                <div className="form-group-p">
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>Interview Type</label>
                                    <select
                                        className="styled-input"
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        value={shortlistData.interview_type}
                                        onChange={(e) => setShortlistData({ ...shortlistData, interview_type: e.target.value })}
                                    >
                                        <option value="Online">Online / Virtual</option>
                                        <option value="On-site">On-site / Physical</option>
                                    </select>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div className="form-group-p">
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>Interview Date</label>
                                        <input
                                            type="date"
                                            className="styled-input"
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                            value={shortlistData.interview_date}
                                            onChange={(e) => setShortlistData({ ...shortlistData, interview_date: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group-p">
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>Interview Time</label>
                                        <input
                                            type="time"
                                            className="styled-input"
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                            value={shortlistData.interview_time}
                                            onChange={(e) => setShortlistData({ ...shortlistData, interview_time: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group-p">
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>Location / Meeting Link</label>
                                    <input
                                        type="text"
                                        className="styled-input"
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        placeholder={shortlistData.interview_type === 'Online' ? 'Zoom, Teams link, etc.' : 'Office address, Boardroom name, etc.'}
                                        value={shortlistData.interview_location}
                                        onChange={(e) => setShortlistData({ ...shortlistData, interview_location: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                                <button className="btn btn-outline" style={{ borderRadius: '12px', padding: '12px 24px', fontWeight: 600 }} onClick={() => setShowShortlistModal(false)}>Cancel</button>
                                <button
                                    className="btn-status-action btn-status-shortlist"
                                    onClick={() => handleStatusUpdate(showDetail.id, 'shortlisted', '', shortlistData)}
                                    disabled={processingStatus || !shortlistData.interview_date || !shortlistData.interview_time || !shortlistData.interview_location}
                                >
                                    {processingStatus ? 'Sending...' : 'Confirm & Send Invitation'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Bulk Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="confirm-overlay animated-fade-in" style={{ zIndex: 1210 }} onClick={() => setShowDeleteModal(false)}>
                    <div className="confirm-modal card-p animated-zoom" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px', textAlign: 'center', padding: '40px' }}>
                        <div className="warning-visual">
                            <FiTrash2 />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Confirm Bulk Deletion</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>
                            You are about to permanently delete <strong>{selectedIds.length}</strong> selected applications. This action cannot be undone. Are you sure you want to proceed?
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                className="btn btn-outline"
                                onClick={() => setShowDeleteModal(false)}
                                style={{ flex: 1, padding: '14px', borderRadius: '12px', fontWeight: 600 }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn"
                                onClick={handleBulkDelete}
                                disabled={deletingBulk}
                                style={{ flex: 1, background: 'var(--crimson)', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 700 }}
                            >
                                {deletingBulk ? 'Deleting...' : 'Confirm Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx="true">{`
                .manage-vacancies-console {
                    animation: fadeIn 0.4s ease-out;
                }

                /* HEREO / HEADER SECTION */
                .vacancies-orchestration-header {
                    position: relative;
                    padding: 24px;
                    border-radius: 24px;
                    overflow: hidden;
                    margin-bottom: 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                    background: linear-gradient(135deg, var(--crimson-dark) 0%, var(--crimson) 100%);
                    box-shadow: 0 10px 30px rgba(139, 26, 43, 0.15);
                }

                .hero-bg-accent {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        radial-gradient(circle at 80% 20%, rgba(200, 169, 81, 0.15) 0%, transparent 40%),
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 100% 100%, 40px 40px, 40px 40px;
                    background-position: center;
                    opacity: 0.6;
                    pointer-events: none;
                }

                .header-content-p { position: relative; z-index: 2; }

                .console-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.2);
                    padding: 6px 14px;
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #e2e8f0;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    margin-bottom: 16px;
                    backdrop-filter: blur(4px);
                }

                .live-dot {
                    width: 6px;
                    height: 6px;
                    background: #10b981;
                    border-radius: 50%;
                }

                .serif-title-p {
                    font-family: var(--font-heading);
                    font-size: 1.8rem;
                    color: #fff;
                    margin: 0 0 8px 0;
                    letter-spacing: -0.5px;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.2);
                }

                .hero-subline {
                    color: rgba(255,255,255,0.7);
                    font-size: 0.9rem;
                    margin: 0;
                    max-width: 600px;
                    line-height: 1.5;
                }

                .btn-establish-p {
                    background: linear-gradient(135deg, var(--gold-accent) 0%, #d4b86a 100%);
                    color: #1a1a2e;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 12px;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 10px 30px rgba(200, 169, 81, 0.3);
                    z-index: 10;
                    font-size: 0.95rem;
                }

                .btn-establish-p:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(200, 169, 81, 0.4);
                    background: #d4b86a;
                }

                /* TOOLBAR REFINEMENT */
                .console-toolbar-p {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    margin-bottom: 24px;
                    background: #fff;
                    padding: 24px 28px;
                    border-radius: 20px;
                    border: 1px solid #eef2f6;
                    border-left: 4px solid var(--crimson);
                    box-shadow: 0 4px 24px rgba(0,0,0,0.03);
                }

                .toolbar-search-row {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .search-orchestrator {
                    position: relative;
                    flex: 1;
                }

                .search-orchestrator .s-icon {
                    position: absolute;
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    font-size: 1.15rem;
                    pointer-events: none;
                    z-index: 2;
                }

                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }

                .search-orchestrator input {
                    width: 100%;
                    padding: 14px 20px 14px 52px;
                    border-radius: 12px;
                    border: 1.5px solid #edf2f7;
                    background: #f8fafc;
                    font-size: 0.95rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    color: var(--text-primary);
                    font-family: inherit;
                    box-sizing: border-box;
                }

                .search-orchestrator input:focus {
                    outline: none;
                    background: #fff;
                    border-color: var(--crimson);
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.04);
                }

                .btn-reset-console {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 20px;
                    border-radius: 12px;
                    border: 1.5px solid #edf2f7;
                    background: #f8fafc;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    white-space: nowrap;
                    font-family: inherit;
                }

                .btn-reset-console:hover {
                    background: #fff;
                    border-color: #cbd5e1;
                    color: var(--text-primary);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.04);
                }

                .toolbar-divider {
                    height: 1px;
                    background: #f1f5f9;
                    width: 100%;
                }

                .toolbar-filters-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                }

                .filter-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex: 1;
                    min-width: 120px;
                }

                .filter-label {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    padding-left: 2px;
                }

                .select-orchestrator {
                    position: relative;
                    width: 100%;
                }

                .select-lg {
                    min-width: 200px;
                }

                .select-orchestrator select {
                    width: 100%;
                    padding: 11px 36px 11px 40px;
                    border-radius: 10px;
                    border: 1.5px solid #e8edf4;
                    background: #f8fafc;
                    font-size: 0.85rem;
                    font-weight: 700;
                    appearance: none;
                    cursor: pointer;
                    color: var(--text-primary);
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23cbd5e1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                    background-size: 14px;
                    transition: all 0.2s ease;
                    font-family: inherit;
                    box-sizing: border-box;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.03);
                }

                .select-orchestrator select:focus {
                    outline: none;
                    border-color: var(--crimson);
                    background-color: #fff;
                    box-shadow: 0 0 0 3px rgba(139, 26, 43, 0.06), 0 2px 6px rgba(0,0,0,0.04);
                }

                .select-orchestrator select:hover {
                    border-color: #c0cdd8;
                    background-color: #fff;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.05);
                }

                .f-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--crimson);
                    font-size: 0.9rem;
                    pointer-events: none;
                    z-index: 2;
                }

                .sort-select-crimson {
                    color: var(--crimson) !important;
                }

                .filter-field-sort {
                    flex: 0 0 auto;
                    min-width: 160px;
                    padding-left: 16px;
                    border-left: 1.5px solid #f1f5f9;
                }

                .sort-label {
                    color: var(--crimson);
                    opacity: 0.8;
                }

                .date-orchestrator-input {
                    width: 100%;
                    padding: 12px 14px 12px 40px;
                    border-radius: 10px;
                    border: 1.5px solid #edf2f7;
                    background: #f8fafc;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    font-family: inherit;
                    transition: all 0.2s ease;
                    box-sizing: border-box;
                }

                .date-orchestrator-input:focus {
                    outline: none;
                    border-color: var(--crimson);
                }

                /* TABLE */
                .orchestration-table-wrapper {
                    background: #fff;
                    border-radius: 20px;
                    border: 1px solid var(--border-light);
                    overflow-x: auto;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                }

                .orchestrated-table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 800px;
                }

                .orchestrated-table th {
                    background: #fcfcfd;
                    padding: 12px 16px;
                    text-align: left;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 1.2px;
                    border-bottom: 1px solid #f0f2f5;
                }

                .orchestrated-table td {
                    padding: 16px;
                    border-bottom: 1px solid #f8fafc;
                    vertical-align: middle;
                }

                .orchestrated-table tr {
                    transition: all 0.2s;
                    cursor: pointer;
                }

                .orchestrated-table tr:hover { background: #fcfcfd; }
                .orchestrated-table tr:hover td { background: #fcfcfd; }

                .ref-cell span {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    background: #f1f5f9;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-weight: 600;
                }

                .pos-entity-cell { display: flex; flex-direction: column; gap: 4px; }
                .pos-name { font-weight: 800; color: var(--text-primary); font-size: 0.95rem; }
                .entity-name { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }

                .classification-cell { display: flex; flex-direction: column; gap: 6px; }
                .class-badge {
                    background: #eff6ff;
                    color: #2563eb;
                    padding: 3px 12px;
                    border-radius: 100px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    width: fit-content;
                    text-transform: uppercase;
                }
                .designation-sub { font-size: 0.85rem; color: var(--text-secondary); }
                
                .timeline-cell { display: flex; flex-direction: column; gap: 4px; font-size: 0.85rem; color: var(--text-muted); }
                .timeline-cell svg { font-size: 0.9rem; margin-right: 4px; }

                .orchestration-actions { display: flex; gap: 8px; justify-content: flex-end; }
                .o-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    border: 1px solid #f1f5f9;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 1.1rem;
                }
                .o-btn:hover { transform: translateY(-3px); box-shadow: 0 6px 15px rgba(0,0,0,0.06); border-color: #e2e8f0; }
                .o-btn.applicants { color: var(--gold-accent); }
                .o-btn.delete { color: var(--crimson); }
                .o-btn.delete:hover { background: var(--crimson); color: #fff; }

                /* MODALS */
                .confirm-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 20px;
                    animation: fadeIn 0.3s ease-out;
                }

                .confirm-modal {
                    background: #fff;
                    border-radius: 32px;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
                }

                /* Applicant Modal specifics */
                .cv-banner-p {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    background: #1a1a2e;
                    padding: 16px 20px;
                    border-radius: 16px;
                    color: #fff;
                    margin-top: 16px;
                }

                .cb-icon { 
                    width: 50px; height: 50px; 
                    background: rgba(255, 255, 255, 0.1); 
                    border-radius: 12px; display: flex; 
                    align-items: center; justify-content: center; 
                    font-size: 1.5rem; color: var(--gold-accent);
                }

                .cb-text { flex: 1; }
                .cb-text span { display: block; font-weight: 700; font-size: 1rem; margin-bottom: 4px;}
                .cb-text p { margin: 0; font-size: 0.8rem; color: rgba(255, 255, 255, 0.6); }

                .modal-actions-footer-p {
                    padding: 16px 28px;
                    border-top: 1px solid #e2e8f0;
                    background: #fcfcfd;
                }

                .submission-box-p {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    padding: 14px 16px;
                    background: #fdfdfd;
                    border: 1px solid #f1f5f9;
                    border-radius: 12px;
                    gap: 16px;
                    align-items: start;
                }

                .sm-item span { 
                    display: block; 
                    font-size: 0.65rem; 
                    color: var(--text-muted); 
                    margin-bottom: 4px; 
                    text-transform: uppercase; 
                    font-weight: 800; 
                    letter-spacing: 0.5px;
                }
                .sm-item p { margin: 0; font-weight: 700; color: var(--text-primary); font-size: 0.95rem; }

                .close-btn-p {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    border: 1px solid #e2e8f0;
                    background: #fff;
                    color: #64748b;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    padding: 0;
                }
                .close-btn-p:hover {
                    background: #f8fafc;
                    color: var(--crimson);
                    border-color: #cbd5e1;
                    transform: rotate(90deg);
                }

                .rejection-reason-box {
                    margin-top: 20px; padding: 20px; background: #fef2f2; 
                    border-radius: 12px; border-left: 4px solid #ef4444;
                }
                .rejection-reason-box span { font-size: 0.75rem; font-weight: bold; color: #ef4444; text-transform: uppercase; }
                .rejection-reason-box p { margin: 8px 0 0; font-size: 0.95rem; color: #ef4444; font-weight: 600; line-height: 1.5; }

                .loading-state-p { padding: 100px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }
                .empty-state-p { padding: 80px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
                .empty-icon { font-size: 3rem; color: var(--text-muted); opacity: 0.5; margin-bottom: 8px; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
                .pulse { animation: pulse 2s infinite; }
                .spinner-p { width: 50px; height: 50px; border: 4px solid #f1f5f9; border-top-color: var(--crimson); border-radius: 50%; animation: spin 0.8s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* RESPONSIVENESS */
                @media (max-width: 1024px) {
                    .vacancies-orchestration-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 24px;
                        padding: 40px;
                        border-radius: 24px;
                    }
                    
                    .serif-title-p { font-size: 2.5rem; }
                    
                    .toolbar-search-row {
                        flex-direction: column;
                        align-items: stretch;
                        width: 100%;
                    }
                    
                    .btn-reset-console, .btn-match-console {
                        width: 100%;
                        justify-content: center;
                    }
                    
                    .toolbar-filters-row {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 16px;
                        width: 100%;
                    }
                    
                    .filter-group {
                        min-width: 0;
                        flex: unset;
                    }
                    
                    .filter-field-sort {
                        grid-column: span 3;
                        border-left: none;
                        padding-left: 0;
                        border-top: 1.5px solid #f1f5f9;
                        padding-top: 16px;
                    }
                    
                    .select-orchestrator {
                        width: 100%;
                        min-width: 100%;
                    }

                    .premium-table-container {
                        overflow-x: auto !important;
                        -webkit-overflow-scrolling: touch;
                        padding-bottom: 8px !important;
                    }

                    .premium-table-container::-webkit-scrollbar {
                        height: 5px !important;
                    }
                    .premium-table-container::-webkit-scrollbar-track {
                        background: #f1f5f9 !important;
                        border-radius: 10px !important;
                    }
                    .premium-table-container::-webkit-scrollbar-thumb {
                        background: var(--crimson, #8b1a2b) !important;
                        border-radius: 10px !important;
                    }

                    .premium-table.applicants-table {
                        min-width: 1000px !important;
                    }
                }

                @media (max-width: 768px) {
                    .vacancies-orchestration-header {
                        padding: 24px 20px;
                        border-radius: 16px;
                        gap: 16px;
                    }
                    
                    .serif-title-p { font-size: 1.8rem; }
                    
                    .btn-establish-p {
                        width: 100%;
                        justify-content: center;
                    }
                    
                    .toolbar-filters-row {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 12px;
                    }
                    
                    .filter-field-sort {
                        grid-column: span 2;
                        border-top: 1.5px solid #f1f5f9;
                        padding-top: 12px;
                    }
                    
                    .submission-box-p {
                        grid-template-columns: 1fr;
                    }
                }
                
                @media (max-width: 480px) {
                    .toolbar-filters-row {
                        grid-template-columns: 1fr;
                    }
                    .filter-field-sort {
                        grid-column: span 1;
                    }
                }
`}</style>

            {/* CV Viewer Modal */}
            {viewingCV && (
                <div className="modal-overlay-p" style={{ zIndex: 9999, position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
                    <div className="detail-modal-p" style={{ width: '90%', height: '90vh', maxWidth: '1000px', display: 'flex', flexDirection: 'column' }}>
                        <div className="modal-header-p" style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: 'var(--crimson)', color: 'white', padding: '8px', borderRadius: '8px', display: 'flex' }}><FiFileText size={20} /></div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{viewingCV.first_name} {viewingCV.last_name} - Curriculum Vitae</h3>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{viewingCV.cv_path}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <a
                                    href={`${API_BASE}/applications.php?action=view_cv&file=${encodeURIComponent(viewingCV.cv_path)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                    style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--crimson)' }}
                                >
                                    <FiExternalLink /> Open in New Tab
                                </a>
                                <a
                                    href={`${API_BASE}/applications.php?action=view_cv&file=${encodeURIComponent(viewingCV.cv_path)}`}
                                    download={`${viewingCV.first_name}_CV`}
                                    className="btn btn-outline"
                                    style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <FiDownload /> Download File
                                </a>
                                <button className="close-btn-p" onClick={() => setViewingCV(null)} style={{ background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiX size={20} /></button>
                            </div>
                        </div>
                        <div className="modal-body-p" style={{ flex: 1, padding: 0, overflow: 'hidden', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {viewingCV.cv_path.toLowerCase().endsWith('.pdf') ? (
                                <iframe
                                    src={`${API_BASE}/applications.php?action=view_cv&file=${encodeURIComponent(viewingCV.cv_path)}#toolbar=0`}
                                    style={{ width: '100%', height: '100%', border: 'none' }}
                                    title="CV Viewer"
                                />
                            ) : viewingCV.cv_path.toLowerCase().endsWith('.docx') || viewingCV.cv_path.toLowerCase().endsWith('.doc') ? (
                                <DocxViewer url={`${API_BASE}/applications.php?action=view_cv&file=${encodeURIComponent(viewingCV.cv_path)}`} />
                            ) : (
                                <div style={{ textAlign: 'center', color: '#64748b' }}>
                                    <FiFileText size={48} style={{ marginBottom: '16px', color: '#cbd5e1' }} />
                                    <h3>Document Viewer</h3>
                                    <p style={{ maxWidth: '400px', margin: '0 auto 20px auto' }}>This document type ({viewingCV.cv_path.split('.').pop().toUpperCase()}) cannot be previewed directly in the browser. Please download it to view.</p>
                                    <a
                                        href={`${API_BASE}/applications.php?action=view_cv&file=${encodeURIComponent(viewingCV.cv_path)}`}
                                        download={`${viewingCV.first_name}_CV`}
                                        className="btn btn-gold"
                                    >
                                        <FiDownload /> Download Document
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Applicants;
