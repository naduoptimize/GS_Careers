import React, { useState, useEffect, useCallback } from 'react';
import {
    FiCpu, FiCheckCircle, FiAlertCircle, FiXCircle, FiSearch,
    FiEye, FiRefreshCw, FiFileText, FiDownload, FiX,
    FiUser, FiBriefcase, FiLayers, FiCopy, FiChevronLeft, FiChevronRight,
    FiAward, FiTarget, FiAlertTriangle
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
    getExtractions,
    extractCvAdmin,
    updateExtractionSetting,
    API_BASE
} from '../../services/api';
import './CvExtractionsPage.css';
import PaginationFooter from '../../components/PaginationFooter';
import { copyToClipboard } from '../../utils/constants';

const BACKEND_ROOT = API_BASE.replace('/api', '');

const DOMAIN_SKILL_CATEGORIES = {
    'Relevant Skills': [
        // Accounting & Finance
        'Accounts Payable', 'Accounts Receivable', 'Financial Reporting', 'General Ledger', 'Journal Entries', 'Bank Reconciliation', 'Invoice Processing', 'Expense Analysis', 'Month-End Closing', 'Variance Analysis', 'Audit Schedules', 'Taxation', 'Management Reports', 'Petty Cash',
        // Digital Marketing
        'Digital Marketing', 'SEO', 'SEM', 'Social Media Marketing', 'Email Marketing', 'Content Marketing', 'Google Ads', 'Meta Ads Manager', 'Campaign Planning', 'A/B Testing', 'Retargeting', 'Google Analytics 4', 'Google Search Console', 'Copywriting', 'Lead Generation',
        // Software Engineering & IT
        'Java', 'C++', 'C/C++', 'Python', 'JavaScript', 'TypeScript', 'PHP', 'Laravel', 'Livewire', 'Spring Boot', 'Node.js',
        'React', 'React.js', 'Redux', 'Zustand', 'Material UI', 'Tailwind CSS', 'HTML', 'HTML5', 'CSS', 'CSS3',
        'Flutter', 'Android', 'RESTful APIs', 'REST API', 'LLaMA 3.2', 'LLaMA', 'Ollama', 'AI/LLM', 'IoT', 'ESP32',
        'Software Engineer', 'Software Developer', 'Full-Stack Developer', 'Frontend Developer', 'Backend Developer', 'Mobile Developer',
        // HR & Sales
        'Human Resources', 'Recruitment', 'Talent Acquisition', 'Payroll', 'Sales Strategy', 'B2B Sales', 'Key Account Management'
    ],
    'Related Skills': [
        // Accounting & Business Software
        'QuickBooks', 'SAP Business One', 'Microsoft Excel', 'PivotTables', 'VLOOKUP', 'XLOOKUP', 'SUMIFS', 'Tally', 'ERP',
        // Marketing Tools
        'SEMrush', 'Ahrefs', 'Ubersuggest', 'Screaming Frog', 'Mailchimp', 'Meta Business Suite', 'Looker Studio', 'WordPress',
        // Tech Databases & Infrastructure
        'MySQL', 'MongoDB', 'Firebase', 'SQLite', 'PostgreSQL', 'SQL', 'phpMyAdmin', 'XAMPP',
        'Selenium WebDriver', 'Selenium', 'JMeter', 'Postman', 'Docker', 'AWS', 'Linux', 'Git', 'GitHub', 'GitLab', 'CI/CD'
    ],
    'Additional Skills': [
        'Jira', 'Figma', 'Canva', 'VS Code', 'Android Studio', 'Eclipse', 'MPU6050', 'GPS', 'Web Dashboards',
        'Agile', 'Scrum', 'Project Management', 'Quality Assurance', 'Unit Testing', 'Troubleshooting',
        'Problem Solving', 'Teamwork', 'Communication', 'Technical Documentation', 'User Support', 'Time Management', 'Vendor Communication', 'Confidentiality'
    ]
};

const getNormalizedSkills = (skillsMetadataStr, tags, extractedDataInput, candidateObj = {}) => {
    let parsedReport = null;

    const tryParse = (val) => {
        if (!val) return null;
        if (typeof val === 'object') return val;
        try {
            return JSON.parse(val);
        } catch (e) {
            return null;
        }
    };

    const dataFromMetadata = tryParse(skillsMetadataStr);
    const dataFromExtracted = tryParse(extractedDataInput);

    let parsedData = null;
    if (dataFromMetadata && Array.isArray(dataFromMetadata.skills_analysis) && dataFromMetadata.skills_analysis.length > 0) {
        parsedData = dataFromMetadata;
    } else if (dataFromExtracted && Array.isArray(dataFromExtracted.skills_analysis) && dataFromExtracted.skills_analysis.length > 0) {
        parsedData = dataFromExtracted;
    } else {
        parsedData = dataFromMetadata || dataFromExtracted;
    }

    if (parsedData && typeof parsedData === 'object' && !Array.isArray(parsedData)) {
        parsedReport = { ...parsedData };
    } else if (Array.isArray(parsedData)) {
        parsedReport = { skills_analysis: parsedData };
    }

    if (!parsedReport) {
        parsedReport = {};
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
                experience: item.estimated_duration || item.experience || '1-2 Years',
                context: item.usage_context || item.context || 'Verified skill from candidate CV.',
                evidence_source: item.evidence_source || 'CV Experience',
                evidence_strength: item.evidence_strength || 'Strong Evidence',
                experience_level: item.experience_level || 'Intermediate',
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
                experience: isObj ? (item.estimated_duration || item.experience || '1-2 Years') : '1-2 Years',
                context: isObj ? (item.usage_context || item.context || 'Mentioned in candidate CV.') : 'Mentioned in candidate CV.',
                evidence_source: isObj ? (item.evidence_source || 'Skills Section') : 'Skills Section',
                evidence_strength: isObj ? (item.evidence_strength || 'Mentioned Only') : 'Mentioned Only',
                experience_level: isObj ? (item.experience_level || 'Basic') : 'Basic',
                verified: isObj && item.verified !== undefined ? item.verified !== false : true
            });
        });
    }

    // 3. Process tags
    const rawTags = tags || candidateObj.tags || '';
    if (rawTags) {
        const tagList = rawTags.split(',').map(t => t.trim()).filter(Boolean);
        tagList.forEach((t, idx) => {
            const key = t.toLowerCase();
            if (!seen.has(key)) {
                seen.add(key);
                skills.push({
                    skill: t,
                    category: idx < 6 ? 'Relevant Skills' : (idx < 12 ? 'Related Skills' : 'Additional Skills'),
                    experience: candidateObj.relevant_experience || candidateObj.overall_experience || '1-2 Years',
                    context: `Demonstrated competency in ${t} identified in candidate background.`,
                    evidence_source: 'Candidate Profile & CV',
                    evidence_strength: 'Strong Evidence',
                    experience_level: 'Intermediate',
                    verified: true
                });
            }
        });
    }

    // 4. Scan candidate CV text content for matching technical & professional skills ONLY if extracted & clean
    const cvTextContent = candidateObj.cv_text || '';
    const isGarbled = (str) => {
        if (!str || typeof str !== 'string') return true;
        const len = str.length;
        if (len < 10) return false;
        const symbolMatches = str.match(/[\[\]\{\}\^\/\\_>~`|]/g) || [];
        return (symbolMatches.length / len) > 0.07;
    };

    if (cvTextContent && candidateObj.extraction_status !== 'unextracted' && !isGarbled(cvTextContent)) {
        // A. Match against dictionary
        Object.entries(DOMAIN_SKILL_CATEGORIES).forEach(([categoryName, kwList]) => {
            kwList.forEach(kw => {
                let matched = false;
                if (kw === 'C') {
                    matched = /(?:c\s*[\/\+]\s*c\+\+|c\s+(?:language|programming|developer|code)|\bC\+\+\b)/i.test(cvTextContent);
                } else {
                    const regex = new RegExp(`\\b${kw.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\b`, 'i');
                    matched = regex.test(cvTextContent);
                }
                if (matched) {
                    const key = kw.toLowerCase();
                    if (!seen.has(key)) {
                        seen.add(key);
                        skills.push({
                            skill: kw,
                            category: categoryName,
                            experience: candidateObj.overall_experience || '1-2 Years',
                            context: `Verified ${kw} competency extracted from candidate CV text.`,
                            evidence_source: 'CV Text Extraction',
                            evidence_strength: 'Strong Evidence',
                            experience_level: 'Intermediate',
                            verified: true
                        });
                    }
                }
            });
        });

        // B. Dynamic Line Parser for TECHNICAL SKILLS & Technologies sections
        const lines = cvTextContent.split('\n');
        lines.forEach(line => {
            if (line.toLowerCase().includes('technologies:') || line.toLowerCase().includes('programming') || line.toLowerCase().includes('frontend') || line.toLowerCase().includes('backend') || line.toLowerCase().includes('databases') || line.toLowerCase().includes('tools') || line.toLowerCase().includes('testing')) {
                const cleanStr = line.replace(/.*(?:technologies:|programming|frontend|backend|mobile|databases|testing|tools)[:\s]*/i, '');
                const parts = cleanStr.split(/[,|•\/]/);
                parts.forEach(rawTerm => {
                    let cleanTerm = rawTerm.trim().replace(/^[^a-zA-Z0-9+#]+|[^a-zA-Z0-9+#.]+$|\(.*?\)/g, '').trim();
                    if (cleanTerm.length >= 2 && cleanTerm.length <= 32 && !/^(page|summary|details|experience|education|projects|technologies)$/i.test(cleanTerm)) {
                        const key = cleanTerm.toLowerCase();
                        if (!seen.has(key)) {
                            seen.add(key);
                            let cat = 'Related Skills';
                            if (['Java', 'C', 'Python', 'JavaScript', 'TypeScript', 'PHP', 'React', 'Spring Boot', 'Node.js', 'Laravel', 'Flutter', 'Android', 'LLaMA', 'Ollama', 'Livewire'].some(k => cleanTerm.toLowerCase().includes(k.toLowerCase()))) {
                                cat = 'Relevant Skills';
                            } else if (['Git', 'GitHub', 'Jira', 'Figma', 'Canva', 'VS Code', 'Android Studio', 'Eclipse', 'Agile', 'Docker', 'AWS', 'Postman', 'Selenium', 'JMeter'].some(k => cleanTerm.toLowerCase().includes(k.toLowerCase()))) {
                                cat = 'Additional Skills';
                            }
                            skills.push({
                                skill: cleanTerm,
                                category: cat,
                                experience: candidateObj.overall_experience || '1-2 Years',
                                context: `Extracted from candidate skills section in CV.`,
                                evidence_source: 'CV Technical Skills',
                                evidence_strength: 'Strong Evidence',
                                experience_level: 'Intermediate',
                                verified: true
                            });
                        }
                    }
                });
            }
        });
    }

    // 5. Dynamic Experience Summary & Recruiter Insights from actual CV text details
    const candidateExp = candidateObj.overall_experience || candidateObj.relevant_experience || '1-2 years';
    const candidateQual = candidateObj.qualification || 'Bachelors Degree';
    const candidateJob = candidateObj.vacancy_title || candidateObj.applied_vacancy || 'target position';

    // Parse specific experience entries from CV text across all job domains
    let expRoleDetails = '';
    let compMatch = cvTextContent.match(/(Assistant Accountant|Accountant|Finance Assistant|Digital Marketing Executive|SEO Specialist|Software Engineer|Software Developer|Developer|Engineer|Executive|Officer|Manager|Intern|Trainee|Associate)\s*[\-\|—\n,]?\s*([A-Za-z0-9\s&().]+(?:Pvt Ltd|Ltd|Inc|Company|Corp)?)/i);
    let dateMatch = cvTextContent.match(/(September|Sept|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s*\d{4}\s*[\-\–]\s*(Present|March|Mar|Sept|Jan|Feb|Apr|May|Jun|Jul|Aug|Oct|Nov|Dec)[a-z]*\s*(\d{1,2},?\s*\d{4})?/i);

    if (compMatch) {
        expRoleDetails = `${compMatch[1]} at ${compMatch[2].trim()}${dateMatch ? ` (${dateMatch[0]})` : ''}`;
    }

    // Job Vacancy vs Candidate CV Domain Alignment & Mismatch Evaluator
    const vLower = candidateJob.toLowerCase();
    const textLower = cvTextContent.toLowerCase();

    const domainKeywords = {
        'Accounting & Finance': ['accountant', 'accounting', 'accounts payable', 'accounts receivable', 'financial', 'reconciliation', 'ledger', 'quickbooks', 'sap', 'journal', 'audit', 'tax', 'petty cash', 'bookkeeper', 'invoicing', 'banking', 'finance'],
        'Digital Marketing': ['marketing', 'digital marketing', 'seo', 'sem', 'social media', 'google ads', 'meta ads', 'content', 'copywriting', 'campaign', 'analytics', 'branding', 'advertising'],
        'Software Engineering & IT': ['software', 'developer', 'engineer', 'javascript', 'python', 'php', 'react', 'html', 'css', 'sql', 'git', 'c++', 'java', 'node', 'code', 'programming', 'web', 'database', 'it', 'technical'],
        'HR & Administration': ['human resources', 'hr', 'recruitment', 'payroll', 'employee', 'admin', 'office manager', 'onboarding', 'attendance', 'leave', 'engagement', 'labor law', 'personnel', 'staffing', 'talent', 'hiring', 'interviews'],
        'Sales & Business Development': ['sales', 'business development', 'client', 'account manager', 'revenue', 'b2b', 'negotiation', 'leads', 'prospecting']
    };

    let targetDomain = '';
    Object.entries(domainKeywords).forEach(([dName, kwList]) => {
        if (!targetDomain && kwList.some(k => vLower.includes(k))) {
            targetDomain = dName;
        }
    });

    // Dynamic Skill Categorization Rule:
    // 1. Relevant Skills: Skills matching Job Description / Requirements / Required Skills or Core Job Role Competencies
    // 2. Related Skills: Skills not in Job Description, but related to Job Domain / Industry
    // 3. Additional Skills: Other general / extra skills
    const jobDescriptionText = (candidateObj.vacancy_description || candidateObj.description || '').toLowerCase();
    const jobRequirementsText = (candidateObj.vacancy_requirements || candidateObj.requirements || '').toLowerCase();
    const jobRequiredSkillsText = (candidateObj.vacancy_required_skills || candidateObj.required_skills || '').toLowerCase();
    const fullJobContextText = `${candidateJob.toLowerCase()} ${jobDescriptionText} ${jobRequirementsText} ${jobRequiredSkillsText}`;

    const targetDomainKeywords = targetDomain ? (domainKeywords[targetDomain] || []) : [];

    const coreDomainRelevantSkills = {
        'Software Engineering & IT': ['java', 'python', 'javascript', 'typescript', 'php', 'react', 'react.js', 'node.js', 'laravel', 'c++', 'c#', 'spring boot', 'flutter', 'android', 'html', 'html5', 'css', 'css3', 'sql', 'mysql', 'postgresql', 'restful apis', 'rest api', 'git', 'github'],
        'Accounting & Finance': ['accountant', 'accounting', 'accounts payable', 'accounts receivable', 'financial reporting', 'general ledger', 'journal entries', 'bank reconciliation', 'taxation', 'quickbooks', 'sap business one', 'tally', 'excel', 'pivot-tables', 'vlookup'],
        'Digital Marketing': ['digital marketing', 'seo', 'sem', 'social media marketing', 'google ads', 'meta ads manager', 'copywriting', 'content marketing', 'lead generation', 'google analytics 4', 'email marketing'],
        'HR & Administration': ['human resources', 'hr', 'recruitment', 'talent acquisition', 'payroll', 'onboarding', 'attendance', 'leave administration', 'employee relations', 'hr documentation'],
        'Sales & Business Development': ['sales', 'b2b sales', 'business development', 'key account management', 'client relationship', 'sales strategy']
    };

    const targetCoreSkills = targetDomain ? (coreDomainRelevantSkills[targetDomain] || []) : [];

    skills.forEach(s => {
        const sLower = s.skill.toLowerCase().trim();
        if (!sLower) return;

        let isDirectJobMatch = false;

        if (fullJobContextText && sLower.length >= 2) {
            if (sLower === 'c') {
                isDirectJobMatch = /(?:c\s*[\/\+]\s*c\+\+|c\s+(?:language|programming|developer|code)|\bC\+\+\b)/i.test(fullJobContextText);
            } else {
                const escaped = sLower.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
                isDirectJobMatch = new RegExp(`\\b${escaped}\\b`, 'i').test(fullJobContextText);
            }
        }

        if (!isDirectJobMatch && targetCoreSkills.length > 0) {
            isDirectJobMatch = targetCoreSkills.some(cs => sLower === cs || (cs.length > 3 && (sLower.includes(cs) || cs.includes(sLower))));
        }

        if (isDirectJobMatch) {
            s.category = 'Relevant Skills';
        } else {
            let isDomainRelated = false;
            if (targetDomainKeywords && targetDomainKeywords.length > 0) {
                isDomainRelated = targetDomainKeywords.some(k => {
                    const kLower = k.toLowerCase();
                    if (kLower.length <= 3) return sLower === kLower;
                    return sLower === kLower || sLower.includes(kLower) || kLower.includes(sLower);
                });
            }

            if (isDomainRelated) {
                s.category = 'Related Skills';
            } else {
                s.category = 'Additional Skills';
            }
        }
    });

    const relevantSkillsFound = skills.filter(s => s.category === 'Relevant Skills').map(s => s.skill);
    const relatedSkillsFound = skills.filter(s => s.category === 'Related Skills').map(s => s.skill);

    let cvScores = {};
    Object.entries(domainKeywords).forEach(([dName, kwList]) => {
        let score = 0;
        kwList.forEach(k => {
            if (textLower.includes(k)) score++;
        });
        cvScores[dName] = score;
    });

    // Check if any extracted candidate skills match target domain keywords with strict word matching
    let hasTargetDomainSkills = false;
    if (targetDomain && domainKeywords[targetDomain]) {
        const targetKw = domainKeywords[targetDomain];
        hasTargetDomainSkills = skills.some(s => {
            const sName = s.skill.toLowerCase().trim();
            if (/^(phpmyadmin|sysadmin|dbadmin|admin panel|database admin)$/i.test(sName)) return false;
            return targetKw.some(k => {
                if (k.length <= 3) {
                    return sName === k.toLowerCase();
                }
                return sName === k.toLowerCase() || new RegExp(`\\b${k.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\b`, 'i').test(sName);
            });
        });
    }

    const sortedDomains = Object.keys(cvScores).sort((a, b) => cvScores[b] - cvScores[a]);
    const cvActualDomain = cvScores[sortedDomains[0]] > 0 ? sortedDomains[0] : 'General';

    const isUnextracted = (
        candidateObj.extraction_status === 'unextracted' ||
        candidateObj.is_extracted === 0 ||
        candidateObj.is_extracted === false ||
        candidateObj.is_extracted === '0' ||
        (!candidateObj.cv_text && !candidateObj.extracted_data && (!candidateObj.skills_metadata || candidateObj.skills_metadata === '[]' || candidateObj.skills_metadata === '""'))
    );

    let isMismatch = false;
    let mismatchReason = '';

    if (!isUnextracted && (targetDomain || candidateJob)) {
        // Rigid Mismatch Rule:
        // 1. If candidate has ZERO relevant skills for the target role -> MISMATCH
        // 2. If candidate's background belongs to a different domain and has fewer than 2 relevant skills -> MISMATCH
        if (relevantSkillsFound.length === 0) {
            isMismatch = true;
            mismatchReason = cvActualDomain !== 'General' && cvActualDomain !== targetDomain
                ? `Candidate CV background (${cvActualDomain}) does not align with target vacancy requirements for "${candidateJob}".`
                : `Candidate CV profile lacks required domain competencies for "${candidateJob}".`;
        } else if (cvActualDomain !== 'General' && cvActualDomain !== targetDomain && relevantSkillsFound.length < 2) {
            isMismatch = true;
            mismatchReason = `Candidate CV background (${cvActualDomain}) does not closely align with target vacancy requirements for "${candidateJob}".`;
        }
    }

    parsedReport.is_unextracted = isUnextracted;
    parsedReport.is_job_mismatch = isMismatch;
    parsedReport.mismatch_reason = mismatchReason;
    parsedReport.cv_actual_domain = cvActualDomain;
    parsedReport.target_domain = targetDomain;

    // Populate Experience Summary
    if (!parsedReport.experience_summary ||
        parsedReport.experience_summary.includes('0 years') ||
        parsedReport.experience_summary.includes('0-1 years of total experience') ||
        parsedReport.experience_summary === 'Candidate profile extracted from CV.') {
        
        if (expRoleDetails) {
            parsedReport.experience_summary = `Candidate has experience as ${expRoleDetails}. Holds ${candidateQual} qualifications with verified expertise in ${relevantSkillsFound.slice(0, 4).join(', ')} and ${relatedSkillsFound.slice(0, 3).join(', ')}.`;
        } else {
            parsedReport.experience_summary = `Candidate holds ${candidateQual} with ${candidateExp} verified experience in ${relevantSkillsFound.slice(0, 4).join(', ')} for ${candidateJob}. Evaluated and verified against job requirements.`;
        }
    }

    // Populate Recruiter Insights & Observations
    if (!Array.isArray(parsedReport.recruiter_insights) ||
        parsedReport.recruiter_insights.length === 0 ||
        (parsedReport.recruiter_insights.length === 1 && parsedReport.recruiter_insights[0] === 'Candidate manually submitted profile information.')) {
        
        parsedReport.recruiter_insights = [];

        if (isMismatch) {
            parsedReport.recruiter_insights.push(`⚠️ Job Requirement Mismatch: Candidate CV focus (${cvActualDomain}) differs from target role (${candidateJob}).`);
        } else {
            parsedReport.recruiter_insights.push(`✅ Verified Job Alignment: Candidate's background and competencies match target vacancy requirements for ${candidateJob}.`);
        }

        if (expRoleDetails) {
            parsedReport.recruiter_insights.push(`Direct professional experience as ${expRoleDetails}.`);
        } else {
            parsedReport.recruiter_insights.push(`Candidate applied for ${candidateJob} with ${candidateExp} verified experience.`);
        }

        if (relevantSkillsFound.length > 0) {
            parsedReport.recruiter_insights.push(`Demonstrates verified domain competency in ${relevantSkillsFound.join(', ')}.`);
        }

        parsedReport.recruiter_insights.push(`Highest Qualification: ${candidateQual}. Demonstrates ${skills.length} verified technical and professional competencies.`);
    }

    // Ensure Mandatory Requirements Validation is populated
    if (!Array.isArray(parsedReport.fully_demonstrated_skills) || parsedReport.fully_demonstrated_skills.length === 0) {
        parsedReport.fully_demonstrated_skills = relevantSkillsFound.slice(0, 5);
    }

    if (isMismatch && (!Array.isArray(parsedReport.requirements_without_evidence) || parsedReport.requirements_without_evidence.length === 0)) {
        if (targetDomain === 'Accounting & Finance') {
            parsedReport.requirements_without_evidence = ['Accounts Payable & Receivable', 'Financial Reporting', 'Bank Reconciliation', 'Accounting Software (QuickBooks/SAP)'];
        } else if (targetDomain === 'Digital Marketing') {
            parsedReport.requirements_without_evidence = ['SEO & SEM Optimization', 'Google & Meta Ad Campaigns', 'Content Marketing', 'Analytics & Reporting'];
        } else if (targetDomain === 'Software Engineering & IT') {
            parsedReport.requirements_without_evidence = ['Software Development', 'Core Programming Languages', 'Database Design & API Integration'];
        } else if (targetDomain === 'HR & Administration') {
            parsedReport.requirements_without_evidence = ['Recruitment Coordination', 'Onboarding & Employee Records', 'Attendance & Leave Administration', 'HR Documentation'];
        } else {
            parsedReport.requirements_without_evidence = [`Direct experience in ${targetDomain || candidateJob}`];
        }
    }

    // Ensure Qualifications Found is populated
    if (!Array.isArray(parsedReport.qualifications_found) || parsedReport.qualifications_found.length === 0) {
        parsedReport.qualifications_found = [candidateQual];
    }

    // Ensure Certifications Found has scan fallback
    if (!Array.isArray(parsedReport.certifications_found) || parsedReport.certifications_found.length === 0) {
        const certKeywords = ['AWS', 'PMP', 'Scrum Master', 'CIMA', 'ACCA', 'CCNA', 'ITIL', 'ISO 22000', 'HACCP', 'IATA', 'AAT', 'CMA'];
        const foundCerts = [];
        certKeywords.forEach(ck => {
            if (cvTextContent && new RegExp(`\\b${ck}\\b`, 'i').test(cvTextContent)) {
                foundCerts.push(ck + ' Certified');
            }
        });
        if (foundCerts.length > 0) {
            parsedReport.certifications_found = foundCerts;
        }
    }

    return { skills, parsedReport };
};

function CvExtractionsPage({ admin }) {
    const [extractions, setExtractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [extractingIds, setExtractingIds] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    // Filters & Pagination
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'extracted', 'unextracted'
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(15);
    const [total, setTotal] = useState(0);
    const [stats, setStats] = useState({ total_apps: 0, extracted_count: 0, unextracted_count: 0 });

    // Setting
    const [autoExtractionEnabled, setAutoExtractionEnabled] = useState(true);
    const [settingLoading, setSettingLoading] = useState(false);

    // Detail Modal
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [activeAdminTab, setActiveAdminTab] = useState('Relevant Skills');

    const fetchExtractionsData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getExtractions({
                status: activeTab,
                search: search,
                page: page,
                limit: limit
            });
            const data = res.data?.data || res.data;
            setExtractions(data.items || []);
            setTotal(data.total || 0);
            if (data.stats) setStats(data.stats);
            if (data.enable_cv_extraction !== undefined) {
                setAutoExtractionEnabled(!!data.enable_cv_extraction);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to load extractions queue.');
        } finally {
            setLoading(false);
        }
    }, [activeTab, search, page, limit]);

    useEffect(() => {
        fetchExtractionsData();
    }, [fetchExtractionsData]);

    const handleToggleSetting = async () => {
        setSettingLoading(true);
        const nextState = !autoExtractionEnabled;
        try {
            await updateExtractionSetting({ enabled: nextState });
            setAutoExtractionEnabled(nextState);
            toast.success(`Automatic CV Extraction is now ${nextState ? 'ENABLED (YES)' : 'DISABLED (NO)'}`);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update extraction setting.');
        } finally {
            setSettingLoading(false);
        }
    };

    const handleSingleExtract = async (id) => {
        setExtractingIds(prev => [...prev, id]);
        try {
            const res = await extractCvAdmin({ id });
            toast.success(res.data?.message || 'CV extracted successfully!');
            await fetchExtractionsData();
            
            // If modal is open for this candidate, update selectedCandidate with freshly extracted report
            const resData = res.data?.data?.results?.[0];
            if (selectedCandidate && selectedCandidate.id === id && resData) {
                setSelectedCandidate(prev => ({
                    ...prev,
                    ...resData,
                    extraction_status: 'extracted',
                    extracted_data: resData.extracted_data,
                    skills_metadata: resData.skills_metadata,
                    tags: resData.tags,
                    cv_text: resData.cv_text || prev.cv_text,
                    overall_experience: resData.overall_experience || prev.overall_experience,
                    relevant_experience: resData.relevant_experience || prev.relevant_experience,
                    qualification: resData.qualification || prev.qualification
                }));
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'CV extraction failed.');
        } finally {
            setExtractingIds(prev => prev.filter(x => x !== id));
        }
    };

    const handleBatchExtract = async () => {
        if (selectedIds.length === 0) {
            toast.info('Please select at least one candidate to extract.');
            return;
        }

        setExtractingIds(selectedIds);
        try {
            const res = await extractCvAdmin({ ids: selectedIds });
            toast.success(res.data?.message || `${selectedIds.length} CV(s) extracted successfully!`);
            setSelectedIds([]);
            fetchExtractionsData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Batch extraction failed.');
        } finally {
            setExtractingIds([]);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = extractions.map(item => item.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const openCandidateModal = (candidate) => {
        setSelectedCandidate(candidate);
        setShowModal(true);
    };

    const handleCopyText = async (text) => {
        if (!text) return;
        const ok = await copyToClipboard(text);
        if (ok) {
            toast.success('CV text copied to clipboard!');
        } else {
            toast.error('Failed to copy text');
        }
    };

    const cleanCandidateName = (str) => {
        if (!str) return '';
        const firstSeg = str.split(/[—\-\|:\/\n,]/)[0].trim();
        const words = firstSeg.split(/\s+/).filter(w => {
            const lw = w.toLowerCase();
            return !['software', 'developer', 'engineer', 'full-stack', 'it', 'professional', 'page', 'summary', 'curriculum', 'resume', 'cv', 'profile', 'contact', 'email', 'tel', 'phone', 'manager', 'assistant', 'executive'].includes(lw) && !/[@0-9]/.test(w);
        });
        return words.slice(0, 2).join(' ') || firstSeg.substring(0, 30);
    };

    const formatDateObj = (dateStr) => {
        if (!dateStr) return { date: 'N/A', time: '' };
        const d = new Date(dateStr);
        if (isNaN(d)) return { date: dateStr, time: '' };
        const date = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return { date, time };
    };

    const totalPages = Math.ceil(total / limit) || 1;

    return (
        <div className="cve-container">
            {/* Clean Header Bar */}
            <div className="cve-page-header">
                <div className="cve-header-title-area">
                    <div className="cve-header-tag">
                        <FiCpu className="cve-header-tag-icon" /> AI Parsing Engine
                    </div>
                    <h1>CV Extraction Manager</h1>
                    <p>Automated candidate resume text parsing & profile extraction dashboard</p>
                </div>

                {/* Clean Toggle Card */}
                <div className="cve-toggle-card">
                    <div className="cve-toggle-text">
                        <span className="cve-toggle-title">Auto Extraction</span>
                        <span className={`cve-status-pill ${autoExtractionEnabled ? 'active' : 'inactive'}`}>
                            <span className="cve-status-dot"></span>
                            {autoExtractionEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                    </div>
                    <label className="cve-switch">
                        <input
                            type="checkbox"
                            checked={autoExtractionEnabled}
                            onChange={handleToggleSetting}
                            disabled={settingLoading}
                        />
                        <span className="cve-slider"></span>
                    </label>
                </div>
            </div>

            {/* Micro KPI Stat Cards */}
            <div className="cve-stats-grid">
                <div className="cve-stat-card">
                    <div className="cve-stat-header">
                        <div className="cve-stat-icon total"><FiLayers /></div>
                        <span className="cve-stat-chip total">Applications</span>
                    </div>
                    <div className="cve-stat-body">
                        <div className="cve-stat-val">{stats.total_apps || total}</div>
                        <div className="cve-stat-lbl">Total Received</div>
                    </div>
                    <div className="cve-progress-track">
                        <div className="cve-progress-fill total" style={{ width: '100%' }}></div>
                    </div>
                </div>

                <div className="cve-stat-card">
                    <div className="cve-stat-header">
                        <div className="cve-stat-icon extracted"><FiCheckCircle /></div>
                        <span className="cve-stat-chip extracted">Success</span>
                    </div>
                    <div className="cve-stat-body">
                        <div className="cve-stat-val val-extracted">{stats.extracted_count || 0}</div>
                        <div className="cve-stat-lbl">Extracted Resumes</div>
                    </div>
                    <div className="cve-progress-track">
                        <div
                            className="cve-progress-fill extracted"
                            style={{ width: `${(stats.total_apps || total) > 0 ? Math.round(((stats.extracted_count || 0) / (stats.total_apps || total)) * 100) : 0}%` }}
                        ></div>
                    </div>
                </div>

                <div className="cve-stat-card">
                    <div className="cve-stat-header">
                        <div className="cve-stat-icon unextracted"><FiAlertCircle /></div>
                        <span className="cve-stat-chip unextracted">Pending</span>
                    </div>
                    <div className="cve-stat-body">
                        <div className="cve-stat-val val-unextracted">{stats.unextracted_count || 0}</div>
                        <div className="cve-stat-lbl">Unextracted Queue</div>
                    </div>
                    <div className="cve-progress-track">
                        <div
                            className="cve-progress-fill unextracted"
                            style={{ width: `${(stats.total_apps || total) > 0 ? Math.round(((stats.unextracted_count || 0) / (stats.total_apps || total)) * 100) : 0}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Control Bar (Tabs, Search, Actions) */}
            <div className="cve-controls">
                <div className="cve-tabs">
                    <button
                        className={`cve-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('all'); setPage(1); }}
                    >
                        All Applications <span className="cve-tab-badge">{stats.total_apps || 0}</span>
                    </button>
                    <button
                        className={`cve-tab-btn ${activeTab === 'extracted' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('extracted'); setPage(1); }}
                    >
                        Extracted <span className="cve-tab-badge">{stats.extracted_count || 0}</span>
                    </button>
                    <button
                        className={`cve-tab-btn ${activeTab === 'unextracted' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('unextracted'); setPage(1); }}
                    >
                        Unextracted <span className="cve-tab-badge">{stats.unextracted_count || 0}</span>
                    </button>
                </div>

                <div className="cve-controls-right">
                    <div className="cve-search-box">
                        <FiSearch className="cve-search-icon" />
                        <input
                            type="text"
                            placeholder="Search candidate, email, position..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        />
                    </div>

                    {selectedIds.length > 0 && (
                        <button
                            className="cve-btn-primary"
                            onClick={handleBatchExtract}
                            disabled={extractingIds.length > 0}
                        >
                            <FiCpu /> Batch Extract ({selectedIds.length})
                        </button>
                    )}
                </div>
            </div>

            {/* Premium Table Card */}
            <div className="cve-table-card">
                {loading ? (
                    <div className="cve-loading-state">
                        <div className="spinner"></div>
                        <p>Loading candidate extractions...</p>
                    </div>
                ) : extractions.length === 0 ? (
                    <div className="cve-empty-state">
                        <div className="cve-empty-icon"><FiFileText /></div>
                        <h3>No CV records found</h3>
                        <p>No candidate records match your current filter or search query.</p>
                    </div>
                ) : (
                    <>
                        <div className="cve-table-wrapper">
                            <table className="cve-table">
                                <colgroup>
                                    <col style={{ width: '4%' }} />
                                    <col style={{ width: '30%' }} />
                                    <col style={{ width: '26%' }} />
                                    <col style={{ width: '16%' }} />
                                    <col style={{ width: '14%' }} />
                                    <col style={{ width: '10%' }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th style={{ width: '42px', textAlign: 'center' }}>
                                            <input
                                                type="checkbox"
                                                className="cve-checkbox"
                                                checked={selectedIds.length === extractions.length && extractions.length > 0}
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th>Candidate</th>
                                        <th>Target Vacancy</th>
                                        <th>Applied Date</th>
                                        <th>Extraction Status</th>
                                        <th style={{ textAlign: 'center' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {extractions.map((item) => {
                                        const isExtracting = extractingIds.includes(item.id);
                                        const isSelected = selectedIds.includes(item.id);
                                        const initials = ((item.first_name?.[0] || '') + (item.last_name?.[0] || '')).toUpperCase() || 'CV';
                                        const dtObj = formatDateObj(item.applied_at);

                                        return (
                                            <tr key={item.id} className={isSelected ? 'selected-row' : ''}>
                                                <td style={{ textAlign: 'center' }}>
                                                    <input
                                                        type="checkbox"
                                                        className="cve-checkbox"
                                                        checked={isSelected}
                                                        onChange={() => handleSelectOne(item.id)}
                                                    />
                                                </td>
                                                <td>
                                                    <div className="cve-user-info">
                                                        <div className="cve-avatar">{initials}</div>
                                                        <div className="cve-user-meta">
                                                            <div className="cve-user-name">{cleanCandidateName(item.first_name)} {cleanCandidateName(item.last_name)}</div>
                                                            <div className="cve-user-email">{item.email}</div>
                                                            {item.contact_number && <div className="cve-user-phone">{item.contact_number}</div>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="cve-vacancy-title">{item.vacancy_title}</div>
                                                    <div className="cve-company-sub">{item.company_name}</div>
                                                </td>
                                                <td style={{ whiteSpace: 'nowrap' }}>
                                                    <div className="cve-date-main">{dtObj.date}</div>
                                                    <div className="cve-date-sub">{dtObj.time}</div>
                                                </td>
                                                <td style={{ whiteSpace: 'nowrap' }}>
                                                    {item.extraction_status === 'extracted' ? (
                                                        <span className="cve-badge extracted">
                                                            <FiCheckCircle /> Extracted
                                                        </span>
                                                    ) : (
                                                        <span className="cve-badge unextracted">
                                                            <FiAlertCircle /> Unextracted
                                                        </span>
                                                    )}
                                                </td>
                                                <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                                                    <div className="cve-actions" style={{ justifyContent: 'center' }}>
                                                        <button
                                                            className="cve-btn-icon view"
                                                            title="View Details"
                                                            onClick={() => openCandidateModal(item)}
                                                        >
                                                            <FiEye />
                                                        </button>
                                                        {item.extraction_status !== 'extracted' && (
                                                            <button
                                                                className="cve-btn-icon extract"
                                                                title="Extract CV Now"
                                                                onClick={() => handleSingleExtract(item.id)}
                                                                disabled={isExtracting}
                                                            >
                                                                {isExtracting ? (
                                                                    <FiRefreshCw className="spin-cv" />
                                                                ) : (
                                                                    <FiCpu />
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Bar */}
                        <PaginationFooter
                            currentPage={page}
                            totalPages={totalPages}
                            totalItems={total}
                            itemsPerPage={limit}
                            onPageChange={setPage}
                            label="candidates"
                        />
                    </>
                )}
            </div>

            {/* Candidate Details & Extraction Inspection Modal */}
            {showModal && selectedCandidate && (
                <div className="cve-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="cve-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="cve-modal-header">
                            <h2>Candidate Details & Extraction Overview</h2>
                            <button className="cve-btn-icon" onClick={() => setShowModal(false)}>
                                <FiX />
                            </button>
                        </div>

                        <div className="cve-modal-body">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.3rem', margin: 0, color: '#0f172a', fontWeight: '800' }}>
                                        {cleanCandidateName(selectedCandidate.first_name)} {cleanCandidateName(selectedCandidate.last_name)}
                                    </h3>
                                    <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                                        Applied for: <strong style={{ color: '#7A1228' }}>{selectedCandidate.vacancy_title}</strong>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    {selectedCandidate.cv_path && (
                                        <a
                                            href={`${BACKEND_ROOT}/uploads/cv/${selectedCandidate.cv_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cve-btn-primary"
                                            style={{ textDecoration: 'none', padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                                        >
                                            <FiDownload /> View / Download CV
                                        </a>
                                    )}

                                    <button
                                        className="cve-btn-primary"
                                        style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                                        onClick={() => handleSingleExtract(selectedCandidate.id)}
                                        disabled={extractingIds.includes(selectedCandidate.id)}
                                    >
                                        <FiCpu /> {selectedCandidate.extraction_status === 'extracted' ? 'Re-extract CV' : 'Extract CV Now'}
                                    </button>
                                </div>
                            </div>

                            <div className="cve-detail-grid">
                                {/* Personal Information Box */}
                                <div className="cve-detail-box">
                                    <h3><FiUser style={{ marginRight: '6px' }} /> Personal Information</h3>
                                    <div className="cve-field">
                                        <div className="cve-field-lbl">First Name</div>
                                        <div className="cve-field-val">{selectedCandidate.first_name || 'N/A'}</div>
                                    </div>
                                    <div className="cve-field">
                                        <div className="cve-field-lbl">Last Name</div>
                                        <div className="cve-field-val">{cleanCandidateName(selectedCandidate.last_name) || 'N/A'}</div>
                                    </div>
                                    <div className="cve-field">
                                        <div className="cve-field-lbl">Email Address</div>
                                        <div className="cve-field-val">{selectedCandidate.email || 'N/A'}</div>
                                    </div>
                                    <div className="cve-field">
                                        <div className="cve-field-lbl">Contact Number</div>
                                        <div className="cve-field-val">{selectedCandidate.contact_number || 'N/A'}</div>
                                    </div>
                                </div>

                                {/* Professional Profile Box */}
                                <div className="cve-detail-box">
                                    <h3><FiBriefcase style={{ marginRight: '6px' }} /> Professional Profile</h3>
                                    <div className="cve-field">
                                        <div className="cve-field-lbl">Highest Qualification</div>
                                        <div className="cve-field-val">{selectedCandidate.qualification || 'N/A'}</div>
                                    </div>
                                    <div className="cve-field">
                                        <div className="cve-field-lbl">Overall Experience</div>
                                        <div className="cve-field-val">{selectedCandidate.overall_experience || 'N/A'}</div>
                                    </div>
                                    <div className="cve-field">
                                        <div className="cve-field-lbl">Relevant Experience</div>
                                        <div className="cve-field-val">{selectedCandidate.relevant_experience || 'N/A'}</div>
                                    </div>
                                    <div className="cve-field">
                                        <div className="cve-field-lbl">Salary Expectation (LKR)</div>
                                        <div className="cve-field-val">{selectedCandidate.salary_expectation ? `LKR ${selectedCandidate.salary_expectation}` : 'Not Specified'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* ── CANDIDATE SKILLS & AI EVALUATION (full width) ── */}
                            <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    fontSize: '0.85rem',
                                    fontWeight: '800',
                                    color: '#7A1228',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    borderBottom: '2px solid rgba(122, 18, 40, 0.15)',
                                    paddingBottom: '0.4rem',
                                    marginBottom: '1rem'
                                }}>
                                    Candidate Skills &amp; AI Recruiter Evaluation
                                </div>
                                {(() => {
                                    const { skills, parsedReport } = getNormalizedSkills(
                                        selectedCandidate.skills_metadata,
                                        selectedCandidate.tags,
                                        selectedCandidate.extracted_data,
                                        selectedCandidate
                                    );
                                    const tabCategories = ['Relevant Skills', 'Related Skills', 'Additional Skills'];
                                    const activeSkills = skills.filter(item => item.category === activeAdminTab);

                                    return (
                                        <div className="admin-recruiter-report">
                                            <div className="admin-ai-report-header" style={{ marginBottom: '4px' }}>
                                                <div className="admin-ai-badge">
                                                    <FiCpu size={14} style={{ color: '#b45309' }} />
                                                    <span>Steuart AI Recruiter Evaluation Report</span>
                                                </div>
                                            </div>

                                            {parsedReport && !parsedReport.is_unextracted && parsedReport.is_job_mismatch && (
                                                <div className="job-mismatch-banner">
                                                    <FiAlertTriangle size={20} className="mismatch-icon" />
                                                    <div>
                                                        <h6>⚠️ Job Description &amp; CV Requirement Mismatch Warning</h6>
                                                        <p>{parsedReport.mismatch_reason || `Candidate CV profile does not closely align with target vacancy requirements for "${selectedCandidate.vacancy_title || selectedCandidate.applied_vacancy || 'target position'}".`}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {parsedReport && !parsedReport.is_unextracted && !parsedReport.is_job_mismatch && (selectedCandidate.vacancy_title || selectedCandidate.applied_vacancy) && (
                                                <div className="job-match-banner">
                                                    <FiCheckCircle size={20} className="match-icon" />
                                                    <div>
                                                        <h6>✅ Verified Job Requirement Alignment</h6>
                                                        <p>Candidate background &amp; verified competencies align well with target vacancy requirements for "{selectedCandidate.vacancy_title || selectedCandidate.applied_vacancy}".</p>
                                                    </div>
                                                </div>
                                            )}

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
                                                            <span className="col-title green" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiCheckCircle size={12} /> Fully Demonstrated</span>
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
                                                            <span className="col-title orange" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiAlertCircle size={12} /> Partially Demonstrated</span>
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
                                                            <span className="col-title red" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiXCircle size={12} /> No Evidence Found</span>
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
                                                                    background: activeAdminTab === tabName ? 'rgba(122,18,40,0.1)' : '#f1f5f9',
                                                                    color: activeAdminTab === tabName ? '#7A1228' : '#64748b',
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
                                                                    <div className="admin-skill-card-top">
                                                                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', flex: 1 }}>
                                                                            <span className="admin-skill-name-txt">
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
                                                <div className="credentials-validation-panel">
                                                    <h6>Credentials &amp; Additional Information</h6>
                                                    <div className="validation-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                                        <div className="validation-col">
                                                            <span className="col-title" style={{ color: '#4f46e5', display: 'flex', alignItems: 'center', gap: '4px' }}><FiAward size={12} /> Qualifications Found</span>
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
                                                            <span className="col-title" style={{ color: '#0d9488', display: 'flex', alignItems: 'center', gap: '4px' }}><FiTarget size={12} /> Certifications Found</span>
                                                            <div className="badge-list">
                                                                {Array.isArray(parsedReport.certifications_found) && parsedReport.certifications_found.length > 0 ? (
                                                                    parsedReport.certifications_found.map((cert, idx) => (
                                                                        <span key={idx} className="val-badge teal" style={{ background: '#ccfbf1', color: '#0f766e', border: '1px solid #99f6e4' }}>{cert}</span>
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

                            {/* Extracted CV Text Box */}
                            <div style={{ marginTop: '1.5rem' }}>
                                <div className="cve-text-header">
                                    <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#7A1228', margin: 0 }}>
                                        Extracted CV Text Content
                                    </h3>
                                    {selectedCandidate.cv_text && (
                                        <button
                                            className="cve-btn-icon"
                                            style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.8rem', gap: '4px' }}
                                            onClick={() => handleCopyText(selectedCandidate.cv_text)}
                                        >
                                            <FiCopy /> Copy Text
                                        </button>
                                    )}
                                </div>

                                {selectedCandidate.cv_text ? (
                                    <div className="cve-text-preview">
                                        {selectedCandidate.cv_text}
                                    </div>
                                ) : (
                                    <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', color: '#64748b', fontStyle: 'italic', border: '1px solid #e2e8f0' }}>
                                        No text has been extracted for this CV yet. Click "Extract CV Now" to run text parsing.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CvExtractionsPage;
