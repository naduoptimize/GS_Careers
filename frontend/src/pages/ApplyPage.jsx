import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    FiArrowLeft, FiMapPin, FiBriefcase, FiCalendar, FiUpload,
    FiCheck, FiMenu, FiX, FiUser, FiMail, FiPhone, FiBookOpen,
    FiClock, FiFileText, FiFacebook, FiLinkedin,
    FiGlobe, FiHash, FiChevronRight, FiAlertCircle, FiTag, FiZap, FiCheckCircle,
    FiChevronDown, FiChevronUp, FiEdit2
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { getVacancy, applyForJob, API_BASE, getPublicPdpa } from '../services/api';

const BACKEND_ROOT = API_BASE.replace('/api', '');

const OVERALL_EXPERIENCE_OPTIONS = [
    '0 years', '0-1 years', '1-2 years',
    '3-4 years', '5-7 years', '8-10 years', '10+ years'
];
const RELEVANT_EXPERIENCE_OPTIONS = OVERALL_EXPERIENCE_OPTIONS;
const QUALIFICATION_OPTIONS = ['O/L', 'A/L', 'Diploma', 'Bachelors Degree', 'Masters Degree', 'PhD', 'Professional Certification'];

const isRobustMatch = (skill, requirement) => {
    if (!skill || !requirement) return false;
    const s = skill.toLowerCase().trim();
    const r = requirement.toLowerCase().trim();

    if (s === r) return true;

    // Boundary check for word matching (avoids false matches like "Java" matching "JavaScript")
    const escapedS = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexS = new RegExp(`\\b${escapedS}\\b`, 'i');
    if (regexS.test(r)) return true;

    const escapedR = r.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexR = new RegExp(`\\b${escapedR}\\b`, 'i');
    if (regexR.test(s)) return true;

    // Synonym mapping
    const synonyms = [
        ["gcp", "google cloud", "google cloud platform"],
        ["aws", "amazon web services"],
        ["azure", "microsoft azure"],
        ["ci/cd", "cicd", "continuous integration", "continuous deployment"],
        ["js", "javascript"],
        ["ts", "typescript"],
        ["kubernetes", "k8s"]
    ];
    for (const group of synonyms) {
        const hasS = group.some(term => s.includes(term) || term.includes(s));
        if (hasS) {
            const matched = group.some(term => {
                const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexTerm = new RegExp(`\\b${escapedTerm}\\b`, 'i');
                return regexTerm.test(r);
            });
            if (matched) return true;
        }
    }

    return false;
};

const checkSkillInCvText = (skillName, cvText) => {
    if (!skillName || !cvText) return false;
    const s = skillName.toLowerCase().trim();
    const cv = cvText.toLowerCase();

    if (!s) return false;

    // Synonym mapping to check if any synonyms match in the CV text
    const synonyms = [
        ["gcp", "google cloud", "google cloud platform"],
        ["aws", "amazon web services"],
        ["azure", "microsoft azure"],
        ["ci/cd", "cicd", "continuous integration", "continuous deployment"],
        ["js", "javascript"],
        ["ts", "typescript"],
        ["kubernetes", "k8s"],
        ["hris", "human resources information system", "hr software", "hr system"],
        ["payroll", "salary processing"],
        ["epf", "etf", "epf/etf"]
    ];

    // Find if the current skill is part of a synonym group
    const matchGroup = synonyms.find(group => group.some(term => s === term || term.includes(s) || s.includes(term)));
    const searchTerms = matchGroup ? matchGroup : [s];

    // 1. Direct search with word boundary (with synonyms)
    const isDirectMatch = searchTerms.some(term => {
        const hasSpecial = /[^a-zA-Z0-9\s]/.test(term);
        if (hasSpecial) {
            const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Custom boundary search: not preceded or followed by alphanumeric chars
            const regex = new RegExp(`(?<![a-zA-Z0-9])${escaped}(?![a-zA-Z0-9])`, 'i');
            return regex.test(cv);
        } else {
            const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escaped}\\b`, 'i');
            return regex.test(cv);
        }
    });

    if (isDirectMatch) return true;

    // 2. Soft matching for multi-word skills (e.g. "HRIS Data Management" matches if "hris" is in CV)
    // Ignore common filler words to check if key phrases are found
    const fillerWords = ['and', 'the', 'for', 'with', 'job', 'vacancy', 'management', 'administration', 'skills', 'system', 'processing', 'claims', 'relations', 'development', 'operations', 'documentation', 'engagement'];
    const words = s.split(/[\s/\-_,]+/).filter(w => w.length > 2 && !fillerWords.includes(w));

    if (words.length > 0) {
        // If all significant words are found in the CV, we consider it a match
        return words.every(word => {
            const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escaped}\\b`, 'i');
            return regex.test(cv);
        });
    }

    return false;
};

const categorizeSkill = (skillName, rawCvText, requiredSkillsList, vacancy) => {
    // First, verify if the skill is actually in the CV
    const inCv = checkSkillInCvText(skillName, rawCvText);
    if (!inCv) return null; // Discard if not in CV!

    const s = skillName.toLowerCase().trim();

    // Check if in required skills list
    const isRequired = requiredSkillsList.some(rs => isRobustMatch(skillName, rs));

    const jdText = (
        (vacancy?.title || '') + ' ' +
        (vacancy?.description || '') + ' ' +
        (vacancy?.requirements || '') + ' ' +
        (vacancy?.required_skills || '')
    ).toLowerCase();

    // Check if the skill name is explicitly mentioned in the Job Description text
    const hasJdMention = jdText.includes(s) || checkSkillInCvText(skillName, jdText);

    if (isRequired || hasJdMention) {
        return 'Relevant Skills';
    }

    // Comprehensive Domain Keywords
    const DOMAIN_KEYWORDS = {
        accounting: ['accountant', 'audit', 'tax', 'ledger', 'invoice', 'payroll', 'finance', 'reconciliation', 'budget', 'tally', 'quickbooks', 'erp', 'casl', 'aat', 'cma', 'acca', 'cfo', 'treasury', 'billing'],
        it_software: ['software', 'developer', 'engineer', 'react', 'javascript', 'node', 'php', 'mysql', 'python', 'java', 'aws', 'cloud', 'frontend', 'backend', 'fullstack', 'api', 'git', 'mobile', 'ios', 'android', 'laravel', 'c#', 'dot net', 'ui', 'ux', 'database', 'linux', 'devops', 'cybersecurity', 'networks', 'it', 'docker', 'kubernetes', 'llm', 'llms', 'ai', 'openai', 'claude', 'gemini', 'agents', 'agent'],
        sales_marketing: ['sales', 'marketing', 'branding', 'advertising', 'digital marketing', 'seo', 'social media', 'leads', 'conversions', 'customer', 'retail', 'wholesale', 'negotiation', 'promotion', 'crm', 'market research', 'revenue', 'growth', 'client', 'representative', 'merchandiser', 'brand manager', 'distribution'],
        hr_admin: ['hr', 'human resources', 'recruitment', 'hiring', 'training', 'development', 'administrative', 'office', 'receptionist', 'clerk', 'ops', 'operations', 'clerical', 'data entry', 'policy', 'employee relations', 'attendance', 'secretarial', 'compliance'],
        engineering: ['mechanical', 'electrical', 'civil', 'production', 'quality', 'qa', 'qc', 'process', 'maintenance', 'structural', 'autocad', 'blueprints', 'manufacturing', 'technician', 'workshop', 'factory', 'project management'],
        healthcare: ['medical', 'pharma', 'healthcare', 'nurse', 'doctor', 'clinic', 'hospital', 'rehab', 'medicine', 'laboratory', 'pharmaceutical', 'biotech', 'clinical'],
        hospitality: ['travel', 'tourism', 'hotel', 'resort', 'front office', 'steward', 'chef', 'guest', 'reservation', 'ticketing', 'guides', 'airline'],
        logistics: ['logistics', 'supply chain', 'warehouse', 'shipping', 'export', 'import', 'procurement', 'inventory', 'transport', 'delivery', 'fleet', 'stores', 'purchasing']
    };

    // Find the domain of the current job post
    let jobDomain = '';
    let maxMatches = 0;
    for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
        const matches = keywords.filter(k => jdText.includes(k)).length;
        if (matches > maxMatches) {
            maxMatches = matches;
            jobDomain = domain;
        }
    }

    // Check if the skill matches the job's domain
    if (jobDomain && DOMAIN_KEYWORDS[jobDomain]) {
        const isRelated = DOMAIN_KEYWORDS[jobDomain].some(keyword => {
            const hasSpecial = /[^a-zA-Z0-9\s]/.test(keyword);
            if (hasSpecial) {
                const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`(?<![a-zA-Z0-9])${escaped}(?![a-zA-Z0-9])`, 'i');
                return regex.test(s);
            } else {
                const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`\\b${escaped}\\b`, 'i');
                return regex.test(s) || s.includes(keyword);
            }
        });
        if (isRelated) {
            return 'Related Skills';
        }
    }

    return 'Additional Skills';
};

const normalizeSkills = (skills) => {
    if (!Array.isArray(skills)) return [];
    const seen = new Set();
    return skills
        .map(item => {
            if (!item || !item.skill) return null;
            const cleanSkill = item.skill.trim();
            if (!cleanSkill) return null;

            let cleanCategory = item.category;
            if (cleanCategory !== 'Relevant Skills' && cleanCategory !== 'Related Skills') {
                cleanCategory = 'Additional Skills';
            }

            return {
                ...item,
                skill: cleanSkill,
                category: cleanCategory,
                context: (item.context || item.usage_context || '').trim() || 'No usage context provided.'
            };
        })
        .filter(item => {
            if (!item) return false;
            const lowerSkill = item.skill.toLowerCase();
            if (seen.has(lowerSkill)) return false;
            seen.add(lowerSkill);
            return true;
        });
};

function ApplyPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vacancy, setVacancy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [showPdpaModal, setShowPdpaModal] = useState(false);
    const [pdpaConfig, setPdpaConfig] = useState({
        pdpa_title: 'Personal Data Protection Act (PDPA) Compliance',
        pdpa_description: 'In accordance with the Personal Data Protection Act (PDPA), we require your explicit consent to store, process, and retain your CV and personal information for future job openings.',
        pdpa_purpose: 'Your details will be accessed by our HR team to match you with suitable future career opportunities.',
        pdpa_retention: 'If consented, your data will be securely stored in our Talent Pool for a maximum duration of 1 year.',
        pdpa_security: 'All personal data is processed under strict confidentiality and industry-standard security measures.',
        pdpa_rights: 'You can withdraw your consent at any time by contacting our HR department.'
    });

    useEffect(() => {
        const fetchPdpa = async () => {
            try {
                const response = await getPublicPdpa();
                const pdpaData = response.data?.data || response.data;
                if (pdpaData) {
                    setPdpaConfig(pdpaData);
                }
            } catch (err) {
                console.error("Failed to fetch PDPA guidelines:", err);
            }
        };
        fetchPdpa();
    }, []);

    const [form, setForm] = useState({
        first_name: '', last_name: '', email: '', contact_number: '',
        overall_experience: '', relevant_experience: '', qualification: '',
        salary_expectation: '', cv: null, future_consent: null
    });
    const [matchedSkills, setMatchedSkills] = useState([]); // skills auto-detected from CV
    const [userSkills, setUserSkills] = useState([]); // candidate general skills (editable/manual)
    const [skillsMetadata, setSkillsMetadata] = useState([]); // structured skills metadata with experience/context/category
    const [aiAnalysis, setAiAnalysis] = useState(null); // full recruiter analysis payload
    const [rawCvText, setRawCvText] = useState('');
    const [editingSkillName, setEditingSkillName] = useState(null);
    const [editingSkillValue, setEditingSkillValue] = useState('');
    const [newSkillName, setNewSkillName] = useState('');
    const [skillsPanelExpanded, setSkillsPanelExpanded] = useState(false);
    const [reviewSkillsExpanded, setReviewSkillsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('Relevant Skills');
    const [activeReviewTab, setActiveReviewTab] = useState('Relevant Skills');

    useEffect(() => {
        const fetchVacancy = async () => {
            try {
                const response = await getVacancy(id);
                const vacancyData = response.data?.data || response.data;
                if (vacancyData) { setVacancy(vacancyData); }
                else { toast.error('Vacancy not found.'); navigate('/vacancies'); }
            } catch { toast.error('Failed to load vacancy.'); navigate('/vacancies'); }
            finally { setLoading(false); }
        };
        fetchVacancy();
    }, [id, navigate]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const requiredSkillsList = vacancy?.required_skills
        ? vacancy.required_skills.split(',').map(s => s.trim()).filter(Boolean)
        : [];

    const [parsing, setParsing] = useState(false);
    const [parsingProgress, setParsingProgress] = useState(0);

    useEffect(() => {
        console.log("George Steuart AI PDFJS Integration Status:", !!window.pdfjsLib);
    }, []);

    const extractTextFromPdf = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const typedarray = new Uint8Array(e.target.result);
                    const pdfjsLib = window.pdfjsLib;
                    if (!pdfjsLib) {
                        reject(new Error("PDFJS library not loaded yet. Please wait."));
                        return;
                    }
                    const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
                    let fullText = "";
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(" ");
                        fullText += pageText + "\n";
                    }
                    resolve(fullText);
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = (err) => reject(err);
            reader.readAsArrayBuffer(file);
        });
    };

    const parseResumeWithAI = async (file) => {
        setParsing(true);
        setParsingProgress(0);
        const progressInterval = setInterval(() => {
            setParsingProgress(prev => {
                if (prev >= 98) {
                    clearInterval(progressInterval);
                    return 98;
                }
                const diff = Math.max(1, Math.floor((100 - prev) * 0.15));
                return Math.min(98, prev + diff);
            });
        }, 300);

        try {
            const text = await extractTextFromPdf(file);
            if (!text || text.trim().length === 0) {
                throw new Error("Unable to extract text content from PDF resume.");
            }
            setRawCvText(text);

            const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
            if (!GEMINI_API_KEY) {
                throw new Error("Gemini API key is not configured. Please define VITE_GEMINI_API_KEY in your .env file.");
            }
            const models = [
                "gemini-2.5-flash-lite",
                "gemini-2.5-flash",
                "gemini-2.5-pro",
                "gemini-2.0-flash",
                "gemini-flash-latest",
                "gemini-pro-latest"
            ];

            const promptText = `You are an advanced AI system for CV Skill Extraction and Job Matching Analysis.

Your task is to analyze a Candidate CV and a Job Description, extract skills, and categorize them strictly based on relevance to the job requirements.

You must behave like a strict technical recruiter. Do not guess or assume anything without evidence.

📥 INPUT

You will receive:

CV TEXT:
${text}

JOB DESCRIPTION:
Job Title: ${vacancy?.title || 'Open Position'}
Description: ${vacancy?.description || 'No description provided'}
Requirements & Qualifications: ${vacancy?.requirements || 'No requirements provided'}
Mandatory Skills: ${vacancy?.required_skills || 'No mandatory skills specified'}

⚙️ PROCESS

You are an expert CV-to-Job Description skill analysis engine.

Your task is to analyze the Candidate CV against the Job Description / Job Requirements and classify skills accurately using strict CV evidence, job relevance, and professional-domain alignment.

You must never hallucinate, assume, exaggerate, or invent skills, experience, certifications, tools, or achievements.

==================================================
PHASE 1 - EXTRACT CV SKILLS
===========================

Extract skills that are explicitly found in the CV from any of the following sections:

* Skills section
* Professional experience
* Internship experience
* Projects
* Freelance work
* Academic work
* Education
* Certifications
* Training
* Profile / Summary
* Achievements

Extract skill types including:

* Technical skills
* Tools and platforms
* Frameworks and libraries
* Programming languages
* Domain-specific skills
* Administrative / operational skills
* Soft skills
* Academic or learning-based skills

For each extracted CV skill, identify:

* skill_name
* where it appears in the CV
* evidence_source
* usage_context
* evidence strength

Do NOT extract random extra skills.

Do NOT invent missing skills.

Do NOT treat certification names, course names, or training titles as skills.

Example:

* "Python for Beginners" = certification/course name, not a skill.
* "Python" = skill only if the CV supports it.
* "Web Design for Beginners" = certification/course name, not a skill.
* "Web Design" = skill only if the CV supports it.

Certifications, courses, training programs, and credentials must be extracted separately under \`certifications_found\`.

==================================================
PHASE 2 - ANALYZE JOB DESCRIPTION
=================================

Analyze the Job Description / Job Requirements and extract:

* Mandatory / must-have skills
* Required skills
* Nice-to-have skills
* Tools, platforms, frameworks, or systems
* Domain knowledge
* Responsibilities
* Professional domain of the job role

Do not assume requirements that are not stated or clearly implied by the job description.

If the job description is vague, infer only broad job-domain expectations that are professionally reasonable, and mark them as inferred from job context.

==================================================
PHASE 3 - CREATE JOB SKILL MATRIX
=================================

Create a structured Job Skill Matrix from the job description.

Group job-related skills into:

1. Core Required Skills

* Skills directly required to perform the main job duties.
* Usually mandatory or strongly emphasized in the job description.

2. Supporting Skills

* Skills that support the role but may not be the primary requirement.
* These may include communication, documentation, reporting, coordination, or domain-adjacent skills.

3. Optional Skills

* Nice-to-have skills, bonus skills, preferred tools, or additional advantages.

Important:
The Job Skill Matrix should be based on the Job Description / Job Requirements, not on the candidate’s CV.

==================================================
PHASE 4 - SKILL CLASSIFICATION
==============================

For EACH extracted CV skill, compare it against:

* Job Description / Job Requirements
* Job Skill Matrix
* Professional domain of the target job role
* CV evidence and usage context

Classify every CV skill into exactly ONE category only:

1. Relevant Skills
2. Related Skills
3. Additional Skills

Never place the same skill in more than one category.

---

## 🟢 RELEVANT SKILLS

Classify a CV skill as "Relevant Skills" only if ALL conditions are satisfied:

1. The skill is directly mentioned in the Job Description / Job Requirements, OR clearly required by the Job Skill Matrix.
2. The skill is directly useful for performing the target job responsibilities.
3. The skill belongs to the same professional domain as the target job role.
4. The CV provides clear usage evidence, learning evidence, work evidence, project evidence, or certification/training evidence.

Examples for an HR / Payroll / Admin role:

* Payroll Administration
* HR Operations
* HRIS
* Employee Records Management
* Attendance Management
* Recruitment Support
* Performance Management
* Talent Development
* EPF / ETF Claims
* MS Excel
* HR Correspondence
* Office Administration
* Documentation
* Employee Onboarding

Output Relevant Skills under \`skills_analysis\` with category \`"Relevant Skills"\`.

---

## 🟡 RELATED SKILLS

Classify a CV skill as "Related Skills" only if ALL conditions are satisfied:

1. The skill is NOT explicitly listed in the Job Description / Job Requirements.
2. The skill is NOT a direct/core requirement in the Job Skill Matrix.
3. The skill belongs to the SAME professional / industry domain as the target job role.
4. The skill can reasonably support performance in the target job.
5. The CV provides evidence or context for the skill.

Examples for an HR / Payroll / Admin role:

* Labor Law Knowledge
* Employee Relations
* Conflict Management
* Document Drafting
* Meeting Scheduling
* Time Management
* Internal Communication
* HR Compliance
* Staff Coordination
* Employee Grievance Handling
* Administrative Coordination

Important:
Related Skills must be from the same professional domain as the target job role.

Do NOT classify unrelated technical, software, programming, engineering, medical, finance, networking, cybersecurity, or other-domain skills as Related Skills unless the target job role itself belongs to that domain.

Output Related Skills under \`skills_analysis\` with category \`"Related Skills"\`.

---

## 🔵 ADDITIONAL SKILLS

Classify a CV skill as "Additional Skills" if ANY condition is true:

1. The skill belongs to a completely different professional domain from the target job role.
2. The skill is unrelated to the Job Description / Job Requirements.
3. The skill is not useful for the target job responsibilities.
4. The skill is only mentioned in the CV without clear usage evidence.
5. The skill is a technical/software/IT skill for a non-technical role.
6. The skill may be valuable generally, but does not support the target role directly or professionally.

For a non-technical HR / Payroll / Admin role, the following must always be Additional Skills:

* Python
* JavaScript
* React
* Laravel
* Flask
* PHP
* HTML
* CSS
* Node.js
* Java
* C#
* MySQL
* MongoDB
* Linux
* AWS
* Azure
* Cloud Infrastructure
* Network Routing
* VAPT
* Cyber Security
* Software Engineering
* Web Development
* Mobile App Development

Output Additional Skills in the \`additional_skills\` array using the required structured object format.

==================================================
STRICT PROFESSIONAL DOMAIN RULE
===============================

The professional domain of the target job must control skill classification.

Examples:

For an HR / Payroll / Admin role:

* HR, payroll, recruitment, employee records, attendance, labor law, office administration, documentation = Relevant or Related
* Programming, web development, networking, cybersecurity, cloud infrastructure = Additional

For a Software Developer role:

* Programming, frameworks, databases, APIs, Git, cloud, software architecture = Relevant or Related
* Payroll, HR operations, employee relations, nursing, bookkeeping = Additional

For an Accounting role:

* Bookkeeping, tax, auditing, payroll finance, Excel, financial reporting = Relevant or Related
* React, Laravel, cybersecurity, nursing, graphic design = Additional

For a Nursing role:

* Patient care, clinical procedures, medication administration, ward management = Relevant or Related
* Laravel, React, payroll, digital marketing, network routing = Additional

Under no circumstances should skills from a completely different professional domain than the target job be classified as Relevant Skills or Related Skills.

They must go to Additional Skills.

==================================================
DECISION PRIORITY
=================

Use this decision order for every CV skill:

Step 1:
Check whether the skill is directly mentioned in the Job Description / Job Requirements or clearly required by the Job Skill Matrix.

* If yes, and CV evidence exists, classify as Relevant Skills.

Step 2:
If not directly listed, check whether the skill belongs to the same professional domain as the target job role.

* If yes, and it supports the role, classify as Related Skills.

Step 3:
If the skill belongs to a different professional domain, is unrelated, or has weak/no evidence:

* Classify as Additional Skills.

Conservative fallback rules:

* If uncertain between Relevant Skills and Related Skills, choose Related Skills.
* If uncertain between Related Skills and Additional Skills, choose Additional Skills.
* If the skill is impressive but unrelated to the role, choose Additional Skills.
* If the skill is only listed without context and not required by the JD, choose Additional Skills.
* If the skill is directly required by the JD but only listed in the CV skills section, it may be Relevant Skills with low/medium confidence, but do not exaggerate proficiency.

==================================================
CRITICAL RULES
==============

* Do NOT extract random extra skills.
* Only include skills found in the CV when classifying candidate skills.
* Job-required skills that are not found in the CV may appear only in requirement validation, not as candidate skills.
* Never hallucinate data.
* Never assume missing skills.
* Always stay CV-grounded.
* Always stay job-relevant.
* Always prioritize accuracy over completeness.
* Never mix skill categories incorrectly.
* Never mix Additional / Unrelated Skills with Relevant Skills or Related Skills.
* Always treat CV-mentioned skills as valid input signals.
* Consider skills from skills, projects, experience, education, certifications, training, and profile sections.
* Do NOT assume deep expertise unless the CV clearly indicates strong usage.
* Never exaggerate candidate experience beyond what is described in the CV.
* Always base classification on job relevance + CV presence + context clarity.
* Never invent years of experience.
* Never invent proficiency levels.
* Never create responsibilities that are not in the CV.
* Never promote a skill to Relevant only because it sounds valuable.
* Never promote a different-domain skill to Related only because it shows general ability.
* All classification must be explainable using CV evidence and job relevance.

==================================================
USAGE_CONTEXT RULE
==================

The \`usage_context\` field for each skill must be:

* A concise single sentence
* Maximum 20 words
* Based only on CV evidence
* Specific to where or how the skill was used

Do NOT concatenate multiple project descriptions.

Do NOT copy/paste large paragraphs from the CV.

Good examples:

* "Built the frontend of a job portal using React."
* "Used Excel to maintain payroll and attendance records."
* "Applied communication skills while coordinating employee documentation."

Bad examples:

* "Worked on many projects including project A, project B, project C, and also used many tools..."
* Full paragraphs copied from the CV.
* Generic statements such as "Has good skills."

==================================================
EVIDENCE_SOURCE RULE
====================

Classify the \`evidence_source\` field strictly using only the following values:

1. Professional Experience
   Use only if the skill is used within permanent full-time or part-time job history.

2. Internship
   Use only if the skill is used in a designated student, graduate, industrial, or professional internship.

3. Project
   Use only if the skill is used in a specific individual, academic, personal, portfolio, or development project.

4. Freelance Work
   Use only if the skill is used in contract, freelance, client, or gig-based work.

5. Academic Work
   Use only if the skill is used during university, school, coursework, assignments, or degree-related academic work.

6. Certification
   Use only if the skill is supported by a certification credential.

7. Training
   Use only if the skill is supported by a short training program, workshop, bootcamp, or practical training.

8. Skills Section Only
   Use only if the skill is mentioned in a flat skills list without project, work, education, training, or certification context.

Do not misuse evidence_source.

If the skill appears in multiple places, choose the strongest evidence source using this priority:

Professional Experience > Internship > Freelance Work > Project > Academic Work > Certification > Training > Skills Section Only

==================================================
CERTIFICATIONS EXCLUSION RULE
=============================

Do NOT extract names of certifications, online courses, training courses, or credentials as skills.

Examples that must NOT be extracted as skills:

* Python for Beginners
* Web Design for Beginners
* Introduction to Android Studio
* Advanced Excel Course
* Cyber Security Fundamentals
* HR Management Certificate

These must be extracted under \`certifications_found\`.

Only extract the underlying skill separately if the CV supports it as a skill.

Examples:

* Certification: "Python for Beginners"

* Skill: "Python", only if CV evidence supports Python knowledge or usage.

* Certification: "Advanced Excel Course"

* Skill: "MS Excel", only if CV evidence supports Excel knowledge or usage.

==================================================
PHASE 5 - REQUIREMENT VALIDATION
================================

For each mandatory job requirement from the Job Description / Job Requirements, determine whether the candidate demonstrates it.

Classify each mandatory requirement as one of:

1. Fully Demonstrated
   Evidence exists in professional experience, internship, projects, freelance work, academic work, certification, training, or strong CV context.

2. Partially Demonstrated
   Some related evidence exists, but it is incomplete, indirect, weak, or not clearly proven.

3. No Evidence Found
   No clear CV evidence supports the requirement.

Important:

* Do not mark a requirement as Fully Demonstrated if it is only weakly implied.
* Do not invent evidence.
* Do not use unrelated skills as evidence.
* Do not count additional skills as evidence for unrelated job requirements.
* If evidence is only from Skills Section Only, classify carefully and usually mark as Partially Demonstrated unless the requirement is simple and directly listed.

Output mandatory requirement validation with:

* fully_demonstrated_requirements
* partially_demonstrated_requirements
* no_evidence_found_requirements

Each item should include:

* requirement_name
* evidence_summary
* evidence_source
* confidence_level

==================================================
PHASE 6 - RECRUITER INSIGHTS
============================

Generate practical recruiter insights based only on the CV and Job Description comparison.

Recruiter insights should include:

1. Overall Match Summary
   A short summary of how well the candidate matches the role.

2. Key Strengths
   Mention the strongest CV-backed skills or experiences relevant to the job.

3. Related Value
   Mention same-domain skills that may support the role even if not directly required.

4. Skill Gaps
   Mention mandatory or important job requirements with partial or no evidence.

5. Additional Skills Observation
   Mention unrelated/different-domain skills only as additional value, not as job-role strengths.

6. Risk Notes
   Mention concerns such as weak evidence, skills only listed without usage, missing mandatory requirements, or domain mismatch.

7. Recruiter Recommendation
   Give a practical recommendation such as:

* Strong Match
* Good Match
* Moderate Match
* Weak Match
* Not Suitable

Recommendation must be based on:

* Mandatory requirement coverage
* Relevant Skills strength
* Related Skills support
* Additional Skills separation
* Evidence quality
* Professional-domain alignment

Do not overpraise the candidate.

Do not penalize unrelated additional skills unless they create a domain mismatch or distract from the target role.

==================================================
FINAL QUALITY CONTROL
=====================

Before returning the final output, verify:

1. Every extracted CV skill is classified into exactly one category.
2. No skill appears in more than one category.
3. Relevant Skills are directly aligned with the JD or Job Skill Matrix.
4. Related Skills belong to the same professional domain but are not directly listed in the JD.
5. Additional Skills contain unrelated, different-domain, weak-evidence, or non-role skills.
6. Software engineering / IT / coding skills are not mixed into Relevant or Related Skills for non-technical roles.
7. Certification names are not extracted as skills.
8. Certifications are listed only under \`certifications_found\`.
9. Usage context is concise and maximum 20 words.
10. Evidence source uses only the approved evidence_source values.
11. No invented data is included.
12. No missing job requirement is falsely marked as demonstrated.
13. No candidate skill is exaggerated beyond CV evidence.
14. The final result is accurate, conservative, CV-grounded, and job-relevant.

==================================================
OUTPUT REQUIREMENTS
===================

Return the result using the existing structured output format.

The output must include:

1. \`cv_skills_extracted\`
   All skills explicitly found in the CV with evidence details.

2. \`job_skill_matrix\`
   Grouped into:

* core_required_skills
* supporting_skills
* optional_skills

3. \`skills_analysis\`
   Only Relevant Skills and Related Skills.

Each item must include:

* skill_name
* category
* evidence_source
* usage_context
* relevance_reason
* confidence_level

4. \`additional_skills\`
   Only Additional Skills.

Each item must include:

* skill_name
* evidence_source
* usage_context
* reason_why_additional
* confidence_level

5. \`certifications_found\`
   Certification, course, training, or credential names found in the CV.

Each item must include:

* certification_name
* provider_or_source if available
* related_underlying_skill if clearly supported
* evidence_summary

6. \`mandatory_requirement_validation\`
   Grouped into:

* fully_demonstrated_requirements
* partially_demonstrated_requirements
* no_evidence_found_requirements

7. \`recruiter_insights\`
   Include:

* overall_match_summary
* key_strengths
* related_value
* skill_gaps
* additional_skills_observation
* risk_notes
* recruiter_recommendation

Final instruction:
Return only the structured analysis.
Do not include unnecessary explanations outside the output structure.
Accuracy, CV evidence, job relevance, and professional-domain alignment are more important than completeness.

==================================================
PERSONAL PROFILE EXTRACTION
===========================
Also extract candidate's personal details to populate the profile fields.
Important constraints:
- first_name / last_name: Carefully split the candidate's full name. The first name part goes into 'first_name' and all remaining surname/middle/last name parts MUST go into 'last_name'. Never leave the 'last_name' empty if a multi-word name is present on the CV.
- qualification: Extract the highest qualification matching the qualifications enum ONLY if it is relevant to the job requirements / target domain.
- overall_experience / relevant_experience: Estimate the years of experience that are relevant and suitable to the job vacancy description. Do not count unrelated/non-professional experience.
- Do not make up or guess any details that are not directly supported by factual evidence in the CV. All data must strictly reflect actual CV facts matching the job vacancy.

Analyze the candidate and return the output matching the requested JSON schema.`;

            let response = null;
            let lastError = null;
            let successfulModel = null;

            for (const model of models) {
                try {
                    console.log(`Attempting AI resume parsing with model: ${model}`);
                    const res = await fetch(
                        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                contents: [
                                    {
                                        parts: [
                                            {
                                                text: promptText
                                            }
                                        ]
                                    }
                                ],
                                generationConfig: {
                                    responseMimeType: "application/json",
                                    responseSchema: {
                                        type: "OBJECT",
                                        properties: {
                                            first_name: { type: "STRING" },
                                            last_name: { type: "STRING" },
                                            email: { type: "STRING" },
                                            contact_number: { type: "STRING" },
                                            qualification: {
                                                type: "STRING",
                                                enum: ['O/L', 'A/L', 'Diploma', 'Bachelors Degree', 'Masters Degree', 'PhD', 'Professional Certification']
                                            },
                                            overall_experience: {
                                                type: "STRING",
                                                enum: ['0 years', '0-1 years', '1-2 years', '3-4 years', '5-7 years', '8-10 years', '10+ years']
                                            },
                                            relevant_experience: {
                                                type: "STRING",
                                                enum: ['0 years', '0-1 years', '1-2 years', '3-4 years', '5-7 years', '8-10 years', '10+ years']
                                            },
                                            salary_expectation: { type: "STRING" },

                                            // Advanced Recruiter Analysis
                                            skills_analysis: {
                                                type: "ARRAY",
                                                description: "Categorized skills classified as Relevant Skills or Related Skills. Include skills present in the CV even if they lack project/work experience context. ONLY extract skills that are explicitly present in the candidate's CV text.",
                                                items: {
                                                    type: "OBJECT",
                                                    properties: {
                                                        skill: { type: "STRING" },
                                                        category: { type: "STRING", description: "Must be exactly 'Relevant Skills' or 'Related Skills'." },
                                                        experience_level: { type: "STRING", enum: ["Expert", "Advanced", "Intermediate", "Basic", "Mentioned Only"] },
                                                        estimated_duration: { type: "STRING", enum: ["Less than 3 Months", "3–6 Months", "6–12 Months", "1–2 Years", "2–3 Years", "3+ Years"] },
                                                        evidence_strength: { type: "STRING", enum: ["Strong Evidence", "Moderate Evidence", "Weak Evidence", "Mentioned Only"] },
                                                        evidence_source: { type: "STRING", description: "Strictly match the origin: 'Professional Experience' for job history, 'Internship' for student/graduate internships, 'Project' for distinct projects, 'Freelance Work' for contract gigs, 'Academic Work' for university/degree studies, 'Certification' for credentials, 'Training' for short workshops/courses, or 'Skills Section Only' for flat listings without context.", enum: ["Professional Experience", "Internship", "Project", "Freelance Work", "Academic Work", "Certification", "Training", "Skills Section Only"] },
                                                        usage_context: { type: "STRING", description: "A concise, single-sentence summary of how/where the candidate used this skill (e.g., 'Built the frontend of a job portal with React'). Max 20 words. Do NOT concatenate multiple projects or copy entire paragraphs." }
                                                    },
                                                    required: ["skill", "category", "experience_level", "estimated_duration", "evidence_strength", "evidence_source", "usage_context"]
                                                }
                                            },
                                            fully_demonstrated_skills: {
                                                type: "ARRAY",
                                                items: { type: "STRING" }
                                            },
                                            partially_demonstrated_skills: {
                                                type: "ARRAY",
                                                items: { type: "STRING" }
                                            },
                                            requirements_without_evidence: {
                                                type: "ARRAY",
                                                items: { type: "STRING" }
                                            },
                                            additional_skills: {
                                                type: "ARRAY",
                                                description: "Extract and list skills from the CV classified under the Additional Skills Category. For each skill, include context and evidence details.",
                                                items: {
                                                    type: "OBJECT",
                                                    properties: {
                                                        skill: { type: "STRING" },
                                                        experience_level: { type: "STRING", enum: ["Expert", "Advanced", "Intermediate", "Basic", "Mentioned Only"] },
                                                        estimated_duration: { type: "STRING", enum: ["Less than 3 Months", "3–6 Months", "6–12 Months", "1–2 Years", "2–3 Years", "3+ Years"] },
                                                        evidence_strength: { type: "STRING", enum: ["Strong Evidence", "Moderate Evidence", "Weak Evidence", "Mentioned Only"] },
                                                        evidence_source: { type: "STRING", description: "Strictly match the origin: 'Professional Experience' for job history, 'Internship' for student/graduate internships, 'Project' for distinct projects, 'Freelance Work' for contract gigs, 'Academic Work' for university/degree studies, 'Certification' for credentials, 'Training' for short workshops/courses, or 'Skills Section Only' for flat listings without context.", enum: ["Professional Experience", "Internship", "Project", "Freelance Work", "Academic Work", "Certification", "Training", "Skills Section Only"] },
                                                        usage_context: { type: "STRING", description: "A concise, single-sentence summary of how/where the candidate used this skill. Max 20 words." }
                                                    },
                                                    required: ["skill", "experience_level", "estimated_duration", "evidence_strength", "evidence_source", "usage_context"]
                                                }
                                            },
                                            qualifications_found: {
                                                type: "ARRAY",
                                                description: "Academic qualifications found in the CV that are relevant or suitable for the job vacancy description.",
                                                items: { type: "STRING" }
                                            },
                                            certifications_found: {
                                                type: "ARRAY",
                                                description: "Professional certifications found in the CV that are relevant or suitable for the job vacancy description.",
                                                items: { type: "STRING" }
                                            },
                                            experience_summary: {
                                                type: "STRING"
                                            },
                                            recruiter_insights: {
                                                type: "ARRAY",
                                                items: { type: "STRING" }
                                            }
                                        },
                                        required: ["first_name", "last_name", "email", "contact_number", "qualification", "overall_experience", "relevant_experience", "skills_analysis"]
                                    }
                                }
                            })
                        }
                    );

                    if (res.ok) {
                        response = res;
                        successfulModel = model;
                        console.log(`Successfully parsed resume using model: ${model}`);
                        break;
                    } else {
                        let errorMsg = `API returned status ${res.status}`;
                        try {
                            const errorJson = await res.json();
                            if (errorJson?.error?.message) {
                                errorMsg += `: ${errorJson.error.message}`;
                            }
                        } catch (_) { }
                        console.warn(`Model ${model} failed: ${errorMsg}`);
                        lastError = new Error(errorMsg);
                    }
                } catch (fetchErr) {
                    console.warn(`Network/fetch error for model ${model}:`, fetchErr);
                    lastError = fetchErr;
                }
            }

            if (!response) {
                throw lastError || new Error("All Gemini models failed to parse the resume.");
            }

            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!textResponse) {
                throw new Error("No structured text response from AI.");
            }

            const parsed = JSON.parse(textResponse);

            // Populate form
            setForm(prev => ({
                ...prev,
                first_name: parsed.first_name || prev.first_name || '',
                last_name: parsed.last_name || prev.last_name || '',
                email: parsed.email || prev.email || '',
                contact_number: parsed.contact_number || prev.contact_number || '',
                qualification: parsed.qualification || prev.qualification || '',
                overall_experience: parsed.overall_experience || prev.overall_experience || '',
                relevant_experience: parsed.relevant_experience || prev.relevant_experience || '',
                salary_expectation: parsed.salary_expectation || prev.salary_expectation || ''
            }));

            // Extract skills_metadata for local display mapping with strict CV grounding and dynamic classification
            let parsedMetadata = [];

            const processParsedSkill = (item) => {
                if (!item) return;
                const isObj = typeof item === 'object' && item !== null;
                const skillName = isObj ? item.skill : item;
                if (!skillName) return;

                const category = categorizeSkill(skillName, text, requiredSkillsList, vacancy);
                if (!category) return; // Discard completely if not found in CV!

                // Skip duplicates
                if (parsedMetadata.some(x => x.skill.toLowerCase() === skillName.toLowerCase())) return;

                parsedMetadata.push({
                    skill: skillName,
                    experience: isObj ? (item.estimated_duration || "Mentioned Only") : "Mentioned Only",
                    context: isObj ? (item.usage_context || "Mentioned in CV.") : "Mentioned in CV.",
                    category: category,
                    evidence_source: isObj ? (item.evidence_source || "Skills Section Only") : "Skills Section Only",
                    evidence_strength: isObj ? (item.evidence_strength || "Mentioned Only") : "Mentioned Only",
                    experience_level: isObj ? (item.experience_level || "Basic") : "Basic",
                    is_mandatory: requiredSkillsList.some(rs => isRobustMatch(skillName, rs)),
                    is_ai_extracted: true
                });
            };

            if (Array.isArray(parsed.skills_analysis)) {
                parsed.skills_analysis.forEach(item => processParsedSkill(item));
            }
            if (Array.isArray(parsed.additional_skills)) {
                parsed.additional_skills.forEach(item => processParsedSkill(item));
            }

            const normalized = normalizeSkills(parsedMetadata);
            setSkillsMetadata(normalized);
            setAiAnalysis(parsed);
            setSkillsPanelExpanded(false);

            // Auto-detect matched mandatory skills (only counts if actually present in CV)
            const detected = normalized.filter(item => item.is_mandatory && checkSkillInCvText(item.skill, text)).map(item => item.skill);
            setMatchedSkills(detected);

            // Pre-fill all general skills from CV
            const cleanedSkills = [...new Set(normalized.map(item => item.skill))];
            setUserSkills(cleanedSkills);

            clearInterval(progressInterval);
            setParsingProgress(100);
            await new Promise(r => setTimeout(r, 450));

            toast.success(requiredSkillsList.length > 0
                ? `🎉 AI parsed your CV! ${detected.length} of ${requiredSkillsList.length} required skills detected.`
                : "🎉 George Steuart AI successfully parsed your CV and auto-filled the form!", { autoClose: 5000 });
        } catch (err) {
            clearInterval(progressInterval);
            console.error("CV parsing error:", err);
            let userFriendlyMessage = err.message || 'Please enter details manually.';
            if (err.message && (err.message.includes('429') || err.message.toLowerCase().includes('quota'))) {
                userFriendlyMessage = "Gemini API key quota exceeded (status 429). Please update your VITE_GEMINI_API_KEY in the frontend/.env file, or wait for the quota to reset. You can still fill out the form manually.";
            }
            toast.warning(`⚠️ AI auto-fill failed: ${userFriendlyMessage}`, { autoClose: 10000 });
        } finally {
            clearInterval(progressInterval);
            setParsing(false);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { toast.error('File too large (max 5MB).'); return; }

        setForm(prev => ({ ...prev, cv: file }));

        // Clear any previous AI parsing results when a new file is uploaded
        setAiAnalysis(null);
        setSkillsMetadata([]);
        setMatchedSkills([]);
        setUserSkills([]);
        setRawCvText('');
        setEditingSkillName(null);
        setEditingSkillValue('');
        setNewSkillName('');

        if (file.type === 'application/pdf') {
            await parseResumeWithAI(file);
        } else {
            toast.info('AI auto-fill is optimized for PDF resumes. Forms can still be filled manually.');
        }
    };

    const handleSaveSkill = (originalName, newName) => {
        const trimmed = newName.trim();
        if (!trimmed) {
            toast.error("Skill name cannot be empty");
            return;
        }
        const exists = skillsMetadata.some(item => item.skill.toLowerCase() === trimmed.toLowerCase() && item.skill.toLowerCase() !== originalName.toLowerCase());
        if (exists) {
            toast.error("This skill already exists");
            return;
        }

        const isMatched = checkSkillInCvText(trimmed, rawCvText);

        setSkillsMetadata(prev => prev.map(item => {
            if (item.skill.toLowerCase() === originalName.toLowerCase()) {
                return {
                    ...item,
                    skill: trimmed,
                    context: isMatched
                        ? (item.context.includes("Manually") || item.context === 'No usage context provided.' ? `Verified in CV.` : item.context)
                        : (item.context.includes("Manually") || item.context === 'No usage context provided.' ? `Not matched in CV.` : item.context),
                    is_mandatory: requiredSkillsList.some(rs => isRobustMatch(trimmed, rs)),
                    is_ai_extracted: isMatched
                };
            }
            return item;
        }));

        setUserSkills(prev => prev.map(s => s.toLowerCase() === originalName.toLowerCase() ? trimmed : s));

        const isMandatory = requiredSkillsList.some(rs => isRobustMatch(trimmed, rs));
        if (isMandatory) {
            setMatchedSkills(prev => {
                const clean = prev.filter(s => s.toLowerCase() !== originalName.toLowerCase());
                if (!clean.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
                    clean.push(trimmed);
                }
                return clean;
            });
        } else {
            setMatchedSkills(prev => prev.filter(s => s.toLowerCase() !== originalName.toLowerCase()));
        }

        setEditingSkillName(null);
        setEditingSkillValue('');
        toast.success(`Skill renamed to "${trimmed}"`);
    };

    const handleAddSkill = (e) => {
        if (e) e.preventDefault();
        const trimmed = newSkillName.trim();
        if (!trimmed) {
            toast.error("Skill name cannot be empty");
            return;
        }
        const exists = skillsMetadata.some(item => item.skill.toLowerCase() === trimmed.toLowerCase());
        if (exists) {
            toast.error("This skill already exists");
            return;
        }

        const isMandatory = requiredSkillsList.some(rs => isRobustMatch(trimmed, rs));
        const isMatched = checkSkillInCvText(trimmed, rawCvText);

        const newSkillObj = {
            skill: trimmed,
            experience: "1-2 Years",
            context: isMatched ? `Manually added: verified in CV.` : `Manually added: not found in CV.`,
            category: activeTab || 'Relevant Skills',
            evidence_source: isMatched ? 'Project' : 'Skills Section Only',
            evidence_strength: isMatched ? 'Moderate Evidence' : 'Mentioned Only',
            experience_level: 'Intermediate',
            is_mandatory: isMandatory,
            is_ai_extracted: isMatched
        };

        setSkillsMetadata(prev => [...prev, newSkillObj]);
        setUserSkills(prev => [...prev, trimmed]);
        if (isMandatory) {
            setMatchedSkills(prev => [...prev, trimmed]);
        }

        setNewSkillName('');
        toast.success(`Skill "${trimmed}" added!`);
    };

    const handleReview = (e) => {
        e.preventDefault();
        if (!form.cv) { toast.error('Please upload your CV.'); return; }

        // Validate Salary Expectation (LKR)
        const salary = form.salary_expectation?.toString().trim();
        if (!salary) {
            toast.error('Salary Expectation (LKR) is required.');
            return;
        }

        // Clean formatting commas and check numeric validity
        const cleanSalary = salary.replace(/,/g, '');
        if (!/^\d+(\.\d+)?$/.test(cleanSalary) || parseFloat(cleanSalary) <= 0) {
            toast.error('Salary Expectation must be a valid positive numeric amount (digits only, e.g. 150000 or 150,000).');
            return;
        }

        if (!privacyAccepted) {
            toast.error('You must agree to the Privacy Policy to proceed.');
            return;
        }

        setShowPdpaModal(true);
    };

    const submitToBackend = async () => {
        setSubmitting(true);
        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                if (key === 'future_consent') formData.append(key, form[key] === true ? 'true' : 'false');
                else formData.append(key, form[key]);
            });
            formData.append('vacancy_id', id);
            formData.append('tags', userSkills.join(', '));

            let finalAnalysis = aiAnalysis;
            if (!finalAnalysis) {
                // Construct a fallback analysis object using the current skillsMetadata state
                finalAnalysis = {
                    skills_analysis: skillsMetadata
                        .filter(item => item.category === 'Relevant Skills' || item.category === 'Related Skills')
                        .map(item => ({
                            skill: item.skill,
                            category: item.category,
                            experience_level: 'Declared',
                            estimated_duration: item.experience || '1-2 Years',
                            evidence_strength: 'Mentioned Only',
                            evidence_source: 'Skills Section Only',
                            usage_context: item.context || 'Manually added by candidate',
                            verified: checkSkillInCvText(item.skill, rawCvText)
                        })),
                    fully_demonstrated_skills: skillsMetadata.filter(item => item.is_mandatory && checkSkillInCvText(item.skill, rawCvText)).map(item => item.skill),
                    partially_demonstrated_skills: [],
                    requirements_without_evidence: skillsMetadata.filter(item => item.is_mandatory && !checkSkillInCvText(item.skill, rawCvText)).map(item => item.skill),
                    additional_skills: skillsMetadata
                        .filter(item => item.category === 'Additional Skills')
                        .map(item => ({
                            skill: item.skill,
                            experience_level: item.experience_level || 'Basic',
                            estimated_duration: item.experience || '1-2 Years',
                            evidence_strength: item.evidence_strength || 'Mentioned Only',
                            evidence_source: item.evidence_source || 'Skills Section Only',
                            usage_context: item.context || 'Mentioned in CV.',
                            verified: checkSkillInCvText(item.skill, rawCvText)
                        })),
                    qualifications_found: [form.qualification].filter(Boolean),
                    certifications_found: [],
                    experience_summary: `Candidate has ${form.overall_experience} of total experience.`,
                    recruiter_insights: ["Candidate manually submitted profile information."]
                };
            } else {
                // Synchronize any manual edits/deletions back into it
                finalAnalysis.skills_analysis = skillsMetadata
                    .filter(item => item.category === 'Relevant Skills' || item.category === 'Related Skills')
                    .map(item => {
                        return {
                            skill: item.skill,
                            category: item.category,
                            experience_level: item.experience_level || 'Declared',
                            estimated_duration: item.experience || '1-2 Years',
                            evidence_strength: item.evidence_strength || 'Mentioned Only',
                            evidence_source: item.evidence_source || 'Skills Section Only',
                            usage_context: item.context || 'Manually added by candidate',
                            verified: checkSkillInCvText(item.skill, rawCvText)
                        };
                    });

                finalAnalysis.additional_skills = skillsMetadata
                    .filter(item => item.category === 'Additional Skills')
                    .map(item => {
                        return {
                            skill: item.skill,
                            experience_level: item.experience_level || 'Basic',
                            estimated_duration: item.experience || '1-2 Years',
                            evidence_strength: item.evidence_strength || 'Mentioned Only',
                            evidence_source: item.evidence_source || 'Skills Section Only',
                            usage_context: item.context || 'Mentioned in CV.',
                            verified: checkSkillInCvText(item.skill, rawCvText)
                        };
                    });

                finalAnalysis.fully_demonstrated_skills = skillsMetadata.filter(item => item.is_mandatory && checkSkillInCvText(item.skill, rawCvText)).map(item => item.skill);
                finalAnalysis.requirements_without_evidence = skillsMetadata.filter(item => item.is_mandatory && !checkSkillInCvText(item.skill, rawCvText)).map(item => item.skill);
            }
            formData.append('skills_metadata', JSON.stringify(finalAnalysis));

            await applyForJob(formData);
            toast.success('Application submitted!');
            navigate('/success', { state: { vacancy } });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit.');
        } finally { setSubmitting(false); }
    };

    const formatDate = (d) => {
        if (!d) return 'N/A';
        const dt = new Date(d);
        return isNaN(dt) ? 'N/A' : dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner"></div>
        </div>
    );

    return (
        <div className="apb-page">
            <style>{`
                .spinner-small {
                    width: 22px;
                    height: 22px;
                    border: 2px solid rgba(200, 169, 81, 0.15);
                    border-top-color: var(--gold-accent, #c8a951);
                    border-radius: 50%;
                    animation: spin-cv 0.8s linear infinite;
                }
                .spinner-large {
                    width: 56px;
                    height: 56px;
                    border: 4px solid rgba(139, 26, 43, 0.1);
                    border-top-color: var(--crimson, #8b1a2b);
                    border-right-color: var(--gold-accent, #c8a951);
                    border-radius: 50%;
                    animation: spin-cv 1s linear infinite;
                    margin: 0 auto 20px;
                }
                .parsing-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(255, 255, 255, 0.75);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 999999;
                    animation: fadeIn-cv 0.3s ease-out;
                }
                .parsing-popup {
                    background: #ffffff;
                    border-radius: 24px;
                    padding: 36px 30px;
                    width: 90%;
                    max-width: 460px;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(139, 26, 43, 0.1);
                    border: 1px solid rgba(200, 169, 81, 0.2);
                    animation: scaleUp-cv 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                @keyframes fadeIn-cv {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleUp-cv {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes spin-cv {
                    to { transform: rotate(360deg); }
                }
                .apb-form-parsing-active .apb-fieldset-label,
                .apb-form-parsing-active .apb-grid2,
                .apb-form-parsing-active .apb-consent,
                .apb-form-parsing-active .apb-talent-pool,
                .apb-form-parsing-active .apb-submit,
                .apb-form-parsing-active .apb-disclosure,
                .apb-form-parsing-active .apb-skill-match-panel,
                .apb-form-parsing-active .premium-skills-container {
                    display: none !important;
                }
                .skill-source-badge {
                    font-size: 0.65rem;
                    background: #f1f5f9;
                    color: #475569;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 700;
                    display: inline-block;
                }
                .skill-match-status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.68rem;
                    font-weight: 700;
                    padding: 2px 6px;
                    border-radius: 4px;
                    line-height: 1;
                }
                .skill-match-status-badge.matched {
                     background-color: #e6fcf5;
                     color: #0ca678;
                     border: 1px solid #c3fae8;
                 }
                 .skill-match-status-badge.unrelated {
                     background-color: #f1f5f9;
                     color: #475569;
                     border: 1px solid #e2e8f0;
                 }
                 .skill-match-status-badge.unmatched {
                     background-color: #fff5f5;
                     color: #fa5252;
                     border: 1px solid #ffe3e3;
                 }
                .skill-edit-btn-trigger {
                    background: none;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                    padding: 4px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    transition: all 0.2s ease;
                }
                .skill-edit-btn-trigger:hover {
                    color: var(--gold-accent, #c8a951);
                    background-color: #f1f5f9;
                }
                .skill-metadata-card {
                    position: relative;
                    transition: all 0.2s ease;
                }
                .skill-metadata-card.editing-card {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                .add-skill-card {
                    border: 1px dashed #cbd5e1;
                    border-radius: 12px;
                    background-color: #f8fafc;
                    transition: all 0.2s ease;
                }
                .add-skill-card:hover {
                    border-color: var(--gold-accent, #c8a951);
                    background-color: #fff;
                }
                .btn-primary-small {
                    background-color: var(--crimson, #8b1a2b);
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .btn-primary-small:hover {
                    background-color: #721422;
                }
                .btn-secondary-small {
                    background-color: #e2e8f0;
                    color: #475569;
                    border: none;
                    border-radius: 4px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .btn-secondary-small:hover {
                    background-color: #cbd5e1;
                }
                .apb-tooltip {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    border: 1.2px solid currentColor;
                    font-size: 9px;
                    font-weight: 800;
                    cursor: help;
                    margin-left: 4px;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                    user-select: none;
                }
                .apb-tooltip:hover {
                    opacity: 1;
                }
                .apb-tooltip-text {
                    visibility: hidden;
                    width: 220px;
                    background-color: #1e293b;
                    color: #ffffff;
                    text-align: center;
                    border-radius: 8px;
                    padding: 8px 12px;
                    position: absolute;
                    z-index: 99999;
                    bottom: 135%;
                    left: 50%;
                    transform: translateX(-50%);
                    opacity: 0;
                    transition: opacity 0.2s, visibility 0.2s;
                    font-size: 11px;
                    font-weight: 500;
                    line-height: 1.4;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    pointer-events: none;
                    text-transform: none;
                    letter-spacing: normal;
                }
                .apb-tooltip-text::after {
                    content: "";
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    margin-left: -5px;
                    border-width: 5px;
                    border-style: solid;
                    border-color: #1e293b transparent transparent transparent;
                }
                .apb-tooltip:hover .apb-tooltip-text {
                    visibility: visible;
                    opacity: 1;
                }

                .pdpa-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.6);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 99999;
                    animation: pdpaFadeIn 0.3s ease-out;
                }

                .pdpa-modal-card {
                    background: #ffffff;
                    border-radius: 20px;
                    width: 90%;
                    max-width: 680px;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 25px 50px -12px rgba(139, 26, 43, 0.25);
                    border: 1px solid rgba(200, 169, 81, 0.3);
                    animation: pdpaSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    overflow: hidden;
                }

                .pdpa-modal-header {
                    padding: 18px 24px;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #fcfcfd;
                }

                .pdpa-modal-header h3 {
                    margin: 0;
                    font-size: 1.2rem;
                    font-weight: 800;
                    color: var(--crimson, #8b1a2b);
                    font-family: var(--font-body);
                }

                .pdpa-modal-close-btn {
                    background: none;
                    border: none;
                    color: #64748b;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 6px;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .pdpa-modal-close-btn:hover {
                    color: var(--crimson, #8b1a2b);
                    background: rgba(139, 26, 43, 0.05);
                }

                .pdpa-modal-body {
                    padding: 20px 24px;
                    overflow-y: auto;
                    flex: 1;
                    text-align: left;
                }

                .pdpa-info-section {
                    background: rgba(139, 26, 43, 0.015);
                    border-left: 4px solid var(--crimson, #8b1a2b);
                    padding: 14px 16px;
                    border-radius: 0 12px 12px 0;
                    margin-bottom: 18px;
                }

                .pdpa-info-section h4 {
                    margin: 0 0 6px 0;
                    font-size: 0.95rem;
                    font-weight: 800;
                    color: var(--crimson, #8b1a2b);
                }

                .pdpa-info-section p {
                    margin: 0 0 10px 0;
                    font-size: 0.85rem;
                    line-height: 1.45;
                    color: #475569;
                }

                .pdpa-bullets {
                    margin: 0;
                    padding-left: 20px;
                    font-size: 0.82rem;
                    color: #475569;
                    line-height: 1.5;
                }

                .pdpa-bullets li {
                    margin-bottom: 4px;
                }

                .pdpa-bullets li strong {
                    color: #1e293b;
                }

                .pdpa-consent-question {
                    margin-bottom: 14px;
                }

                .pdpa-consent-question strong {
                    font-size: 0.95rem;
                    color: #1e293b;
                    display: block;
                    margin-bottom: 2px;
                }

                .pdpa-consent-sub {
                    margin: 0;
                    font-size: 0.8rem;
                    color: #64748b;
                }

                .pdpa-checkbox-group {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    margin-bottom: 4px;
                }

                @media (max-width: 640px) {
                    .pdpa-checkbox-group {
                        grid-template-columns: 1fr;
                        gap: 12px;
                    }
                }

                .pdpa-checkbox-card {
                    border: 1.5px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 16px;
                    display: flex;
                    gap: 14px;
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    background: #ffffff;
                    user-select: none;
                    text-align: left;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
                }

                .pdpa-checkbox-card:hover {
                    border-color: var(--gold-accent, #c8a951);
                    background: rgba(200, 169, 81, 0.015);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                }

                .pdpa-checkbox-card.selected {
                    border-color: var(--crimson, #8b1a2b);
                    background: rgba(139, 26, 43, 0.02);
                    box-shadow: 0 4px 12px rgba(139, 26, 43, 0.06);
                }

                .pdpa-checkbox-indicator {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 2px solid #cbd5e1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    margin-top: 2px;
                    transition: all 0.2s;
                }

                .pdpa-checkbox-card.selected .pdpa-checkbox-indicator {
                    border-color: var(--crimson, #8b1a2b);
                }

                .pdpa-checkbox-checked {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--crimson, #8b1a2b);
                    animation: pdpaScaleIn 0.15s ease-out;
                }

                .pdpa-checkbox-label {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .pdpa-checkbox-label strong {
                    font-size: 0.88rem;
                    color: #1e293b;
                    line-height: 1.3;
                }

                .pdpa-checkbox-card.selected .pdpa-checkbox-label strong {
                    color: var(--crimson, #8b1a2b);
                }

                .pdpa-checkbox-label span {
                    font-size: 0.78rem;
                    color: #64748b;
                    line-height: 1.4;
                }

                .pdpa-modal-footer {
                    padding: 16px 24px;
                    border-top: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                    background: #fcfcfd;
                }

                .pdpa-btn-cancel {
                    padding: 10px 20px;
                    border-radius: 10px;
                    background: #ffffff;
                    border: 1.5px solid #cbd5e1;
                    color: #475569;
                    font-weight: 700;
                    font-size: 0.88rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .pdpa-btn-cancel:hover {
                    background: #f1f5f9;
                    border-color: #94a3b8;
                    color: #1e293b;
                }

                .pdpa-btn-proceed {
                    padding: 10px 24px;
                    border-radius: 10px;
                    background: var(--crimson, #8b1a2b);
                    border: none;
                    color: #ffffff;
                    font-weight: 700;
                    font-size: 0.88rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    box-shadow: 0 4px 12px rgba(139, 26, 43, 0.15);
                }

                .pdpa-btn-proceed:hover:not(:disabled) {
                    background: #721422;
                    box-shadow: 0 6px 16px rgba(139, 26, 43, 0.25);
                }

                .pdpa-btn-proceed:disabled {
                    background: #e2e8f0;
                    color: #94a3b8;
                    cursor: not-allowed;
                    box-shadow: none;
                }

                @keyframes pdpaFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes pdpaSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes pdpaScaleIn {
                    from { transform: scale(0); }
                    to { transform: scale(1); }
                }
            `}</style>

            {/* ── Navbar ── */}
            <nav className="navbar">
                <Link to="/" className="navbar-brand">
                    <img src="/gs-logo.png" alt="George Steuart" className="navbar-logo" />
                    <div>
                        <div className="navbar-title">George Steuart</div>
                        <div className="navbar-subtitle">Careers</div>
                    </div>
                </Link>
                <div className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
                    <Link to="/" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                    <Link to="/vacancies" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>Vacancies</Link>
                    <Link to="/admin/login" className="navbar-link btn-primary" onClick={() => setMobileMenuOpen(false)}>Admin Portal</Link>
                </div>
                <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(v => !v)}>
                    {mobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </nav>

            {/* ── HERO BANNER ── */}
            <div className="apb-banner">
                <div className="apb-banner-img">
                    <img src="/apply.png" alt="Apply" />
                </div>
                <div className="apb-banner-overlay" />
                <div className="apb-banner-content container">
                    <Link to="/vacancies" className="apb-back">
                        <FiArrowLeft /> Back to Vacancies
                    </Link>
                    <div className="apb-banner-company">
                        <div className="apb-banner-logo">
                            <img
                                src={vacancy?.company_logo
                                    ? `${BACKEND_ROOT}/uploads/logos/${vacancy.company_logo}`
                                    : '/gs-logo.png'}
                                alt={vacancy?.company_name || 'George Steuart'}
                                onError={(e) => e.target.src = '/gs-logo.png'}
                            />
                        </div>
                        <span>{vacancy?.company_name || 'George Steuart & Company'}</span>
                    </div>
                    <h1 className="apb-banner-title">{vacancy?.title || 'Open Position'}</h1>
                    <div className="apb-banner-tags">
                        {vacancy?.reference_number && <span className="apb-tag apb-tag-gold"><FiHash />{vacancy.reference_number}</span>}
                        {vacancy?.employment_type && <span className="apb-tag"><FiBriefcase />{vacancy.employment_type}</span>}
                        {vacancy?.location && <span className="apb-tag"><FiMapPin />{vacancy.location}</span>}
                        <span className="apb-tag apb-tag-deadline"><FiCalendar />Closes {formatDate(vacancy?.expire_date)}</span>
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <main className="apb-main">
                <div className="container apb-container">

                    {/* LEFT — Job details */}
                    <aside className="apb-sidebar">
                        <div className="apb-info-card">
                            <h3 className="apb-info-title">Position Details</h3>
                            {vacancy?.description && (
                                <div className="apb-info-block">
                                    <h4>About This Role</h4>
                                    <p>{vacancy.description}</p>
                                </div>
                            )}
                            {vacancy?.requirements && (
                                <div className="apb-info-block">
                                    <h4>Requirements</h4>
                                    <p>{vacancy.requirements}</p>
                                </div>
                            )}

                            {/* ── Mandatory Skills Panel ── */}
                            {vacancy?.required_skills && vacancy.required_skills.split(',').filter(s => s.trim()).length > 0 && (
                                <div className="apb-info-block apb-skills-block">
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FiTag size={13} style={{ color: 'var(--crimson, #8b1a2b)' }} />
                                        Mandatory Skills
                                    </h4>
                                    <div className="apb-skills-list">
                                        {vacancy.required_skills.split(',').filter(s => s.trim()).map((skill, idx) => (
                                            <span key={idx} className="apb-skill-badge">{skill.trim()}</span>
                                        ))}
                                    </div>
                                    <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '10px', marginBottom: 0 }}>
                                        ✨ Upload your PDF CV — AI will auto-detect which skills you have.
                                    </p>
                                </div>
                            )}

                            <div className="apb-info-meta">
                                {vacancy?.location && <div className="apb-meta-row"><FiMapPin /><span>{vacancy.location}</span></div>}
                                {vacancy?.employment_type && <div className="apb-meta-row"><FiBriefcase /><span>{vacancy.employment_type}</span></div>}
                                <div className="apb-meta-row"><FiCalendar /><span>Closes {formatDate(vacancy?.expire_date)}</span></div>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT — Application form */}
                    <div className="apb-form-area">

                        {/* Step indicator */}
                        <div className="apb-steps">
                            <div className={`apb-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
                                <div className="apb-step-dot">{step > 1 ? <FiCheck /> : '1'}</div>
                                <span>Your Details</span>
                            </div>
                            <div className="apb-step-line" />
                            <div className={`apb-step ${step === 2 ? 'active' : ''}`}>
                                <div className="apb-step-dot">2</div>
                                <span>Review & Submit</span>
                            </div>
                        </div>

                        {/* ─── STEP 1 ─── */}
                        {step === 1 && (
                            <div className="apb-card">
                                <h2 className="apb-card-title">Your Application</h2>

                                <form onSubmit={handleReview} className={parsing ? "apb-form-parsing-active" : ""}>


                                    {/* CV Upload at the TOP */}
                                    <div className="apb-fieldset-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                                        <span>Quick Apply: Upload Your CV</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--gold-accent)', fontWeight: 'bold', background: 'rgba(200, 169, 81, 0.08)', padding: '3px 10px', borderRadius: '100px', border: '1px solid rgba(200,169,81,0.15)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                                            ✨ Gemini AI Auto-Fill Enabled
                                        </span>
                                    </div>
                                    <div className="apb-upload" style={{ position: 'relative', border: parsing ? '2px dashed var(--gold-accent)' : '2px dashed var(--border-light)', cursor: parsing ? 'not-allowed' : 'pointer' }} onClick={() => !parsing && document.getElementById('cv-file').click()}>
                                        <input id="cv-file" type="file" accept=".pdf"
                                            style={{ display: 'none' }} onChange={handleFileChange} disabled={parsing} />

                                        {parsing ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', padding: '4px 0' }}>
                                                <div className="spinner-small" style={{ flexShrink: 0 }}></div>
                                                <div style={{ textAlign: 'left' }}>
                                                    <div className="apb-upload-text" style={{ color: 'var(--gold-accent)', fontWeight: 800 }}>George Steuart AI is parsing your resume... ({parsingProgress}%)</div>
                                                    <div className="apb-upload-hint">Extracting contact details, qualifications, experience and skill matches. Please wait.</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className={`apb-upload-icon ${form.cv ? 'has-file' : ''}`}>
                                                    {form.cv ? <FiCheck size={22} /> : <FiUpload size={22} />}
                                                </div>
                                                <div style={{ textAlign: 'left' }}>
                                                    <div className="apb-upload-text">{form.cv ? form.cv.name : 'Click here to upload your PDF CV'}</div>
                                                    <div className="apb-upload-hint">Upload a PDF resume to instantly pre-fill all form details in a single click!</div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div style={{ display: parsing ? 'none' : 'block' }}>
                                        {/* Personal Info */}
                                        <div className="apb-fieldset-label">Personal Information</div>
                                        <div className="apb-grid2">
                                            <div className="apb-field">
                                                <label>First Name <span className="req">*</span></label>
                                                <div className="apb-iw"><FiUser className="apb-ico" />
                                                    <input type="text" name="first_name" className="apb-input"
                                                        value={form.first_name} onChange={handleChange}
                                                        placeholder="First name" required />
                                                </div>
                                            </div>
                                            <div className="apb-field">
                                                <label>Last Name <span className="req">*</span></label>
                                                <div className="apb-iw"><FiUser className="apb-ico" />
                                                    <input type="text" name="last_name" className="apb-input"
                                                        value={form.last_name} onChange={handleChange}
                                                        placeholder="Last name" required />
                                                </div>
                                            </div>
                                            <div className="apb-field">
                                                <label>Email <span className="req">*</span></label>
                                                <div className="apb-iw"><FiMail className="apb-ico" />
                                                    <input type="email" name="email" className="apb-input"
                                                        value={form.email} onChange={handleChange}
                                                        placeholder="you@example.com" required />
                                                </div>
                                            </div>
                                            <div className="apb-field">
                                                <label>Contact Number <span className="req">*</span></label>
                                                <div className="apb-iw"><FiPhone className="apb-ico" />
                                                    <input type="tel" name="contact_number" className="apb-input"
                                                        value={form.contact_number} onChange={handleChange}
                                                        placeholder="+94 77 123 4567" required />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Professional Profile */}
                                        <div className="apb-fieldset-label">Professional Profile</div>
                                        <div className="apb-grid2">
                                            <div className="apb-field">
                                                <label>Highest Qualification <span className="req">*</span></label>
                                                <div className="apb-iw"><FiBookOpen className="apb-ico" />
                                                    <select name="qualification" className="apb-input apb-sel"
                                                        value={form.qualification} onChange={handleChange} required>
                                                        <option value="">Select</option>
                                                        {QUALIFICATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="apb-field">
                                                <label>Salary Expectation (LKR) <span className="req">*</span></label>
                                                <div className="apb-iw"><span className="apb-ico" style={{ fontSize: '0.75rem', fontWeight: 800, userSelect: 'none' }}>LKR</span>
                                                    <input
                                                        type="text"
                                                        name="salary_expectation"
                                                        className="apb-input"
                                                        value={form.salary_expectation}
                                                        onChange={handleChange}
                                                        placeholder="e.g. 150,000"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="apb-field">
                                                <label>Total Experience <span className="req">*</span></label>
                                                <div className="apb-iw"><FiClock className="apb-ico" />
                                                    <select name="overall_experience" className="apb-input apb-sel"
                                                        value={form.overall_experience} onChange={handleChange} required>
                                                        <option value="">Select</option>
                                                        <option value="0 years">0 years (Fresher)</option>
                                                        <option value="0-1 years">0–1 years</option>
                                                        <option value="1-2 years">1–2 years</option>
                                                        <option value="3-4 years">3–4 years</option>
                                                        <option value="5-7 years">5–7 years</option>
                                                        <option value="8-10 years">8–10 years</option>
                                                        <option value="10+ years">10+ years</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="apb-field">
                                                <label>Relevant Experience <span className="req">*</span></label>
                                                <div className="apb-iw"><FiClock className="apb-ico" />
                                                    <select name="relevant_experience" className="apb-input apb-sel"
                                                        value={form.relevant_experience} onChange={handleChange} required>
                                                        <option value="">Select</option>
                                                        <option value="0 years">0 years (Fresher)</option>
                                                        <option value="0-1 years">0–1 years</option>
                                                        <option value="1-2 years">1–2 years</option>
                                                        <option value="3-4 years">3–4 years</option>
                                                        <option value="5-7 years">5–7 years</option>
                                                        <option value="8-10 years">8–10 years</option>
                                                        <option value="10+ years">10+ years</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ── AI Skill Match / Extracted Skills Dashboard ── */}
                                        {aiAnalysis && !parsing && (
                                            <div className={`apb-skill-match-panel premium-skills-container ${!skillsPanelExpanded ? 'collapsed' : ''}`} style={{ marginTop: '24px', marginBottom: '24px' }}>
                                                <div className="apb-smp-header" onClick={() => setSkillsPanelExpanded(v => !v)}>
                                                    <FiZap size={16} className="apb-smp-icon pulse-animation" style={{ color: 'var(--gold-accent)' }} />
                                                    <span className="apb-smp-title">
                                                        George Steuart AI Skills Profile Analysis
                                                    </span>
                                                    {form.cv && !parsing && (
                                                        <span className="apb-smp-badge" style={{ marginRight: '8px' }}>
                                                            {skillsMetadata.length} Verified Skills
                                                        </span>
                                                    )}
                                                    <span className="apb-smp-chevron">
                                                        {skillsPanelExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                                                    </span>
                                                </div>

                                                {skillsPanelExpanded && (
                                                    <>
                                                        {form.cv && !parsing && (
                                                            <div className="ai-verification-notice">
                                                                <span className="ai-notice-icon">🤖</span>
                                                                <div>
                                                                    <strong>Human-like Verification:</strong> George Steuart AI filtered out list-only skills that lacked supporting work history or project context in your CV.
                                                                </div>
                                                            </div>
                                                        )}

                                                        {skillsMetadata.length > 0 && skillsMetadata.filter(item => item.category === 'Relevant Skills' || item.category === 'Related Skills').length === 0 && (
                                                            <div className="ai-verification-notice mismatch-alert" style={{ background: '#fff5f5', border: '1px solid #fa5252', color: '#fa5252', padding: '12px 16px', borderRadius: '12px', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                                                <FiAlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px', color: '#fa5252' }} />
                                                                <div>
                                                                    <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px', fontWeight: 800 }}>Profile Mismatch Warning</strong>
                                                                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#e03131', lineHeight: '1.45' }}>
                                                                        Our AI analysis indicates that your CV experience and skills do not align with the requirements for this <strong>{vacancy?.title}</strong> role. Please review your CV details below.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Case: Mandatory Skills checklist - if vacancy has mandatory skills, show quick checklist of them */}
                                                        {vacancy?.required_skills && vacancy.required_skills.split(',').filter(s => s.trim()).length > 0 && (
                                                            <div className="mandatory-skills-checklist">
                                                                <h4 className="skills-subtitle">
                                                                    <FiCheckCircle size={13} style={{ color: 'var(--gold-accent)', marginRight: '6px' }} />
                                                                    Mandatory Requirements Status
                                                                </h4>
                                                                <div className="apb-smp-skills">
                                                                    {vacancy.required_skills.split(',').filter(s => s.trim()).map((skill, idx) => {
                                                                        const skillName = skill.trim();
                                                                        const isMatched = checkSkillInCvText(skillName, rawCvText);

                                                                        return (
                                                                            <div key={idx} className={`apb-smp-skill ${isMatched ? 'matched' : ''}`}>
                                                                                <span className={`apb-smp-check-icon ${isMatched ? 'on' : 'off'}`}>
                                                                                    {isMatched ? <FiCheck size={10} /> : <FiX size={10} />}
                                                                                </span>
                                                                                <span className="apb-smp-skill-name">{skillName}</span>
                                                                                {isMatched ? (
                                                                                    <span className="apb-smp-ai-tag">
                                                                                        <FiZap size={9} /> Matched
                                                                                    </span>
                                                                                ) : (
                                                                                    <span className="apb-smp-missing-tag">Not found in CV</span>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Detailed categorized skills display */}
                                                        {skillsMetadata.length > 0 ? (
                                                            <div className="categorized-skills-grid">
                                                                {/* Horizontal Tab System */}
                                                                <div className="apb-skills-tabs" style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '16px', gap: '16px', flexWrap: 'wrap' }}>
                                                                    {['Relevant Skills', 'Related Skills', 'Additional Skills'].map(tabName => {
                                                                        const count = skillsMetadata.filter(item => item.category === tabName).length;

                                                                        const emoji = tabName === 'Relevant Skills' ? '🟢' : tabName === 'Related Skills' ? '🟡' : '🔵';

                                                                        return (
                                                                            <button
                                                                                key={tabName}
                                                                                type="button"
                                                                                className={`apb-tab-btn ${activeTab === tabName ? 'active' : ''}`}
                                                                                onClick={() => setActiveTab(tabName)}
                                                                                style={{
                                                                                    padding: '10px 16px',
                                                                                    background: 'none',
                                                                                    border: 'none',
                                                                                    borderBottom: activeTab === tabName ? '3px solid var(--crimson, #8b1a2b)' : '3px solid transparent',
                                                                                    color: activeTab === tabName ? 'var(--crimson, #8b1a2b)' : '#64748b',
                                                                                    fontWeight: 700,
                                                                                    fontSize: '0.88rem',
                                                                                    cursor: 'pointer',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: '6px',
                                                                                    transition: 'all 0.2s ease',
                                                                                    marginBottom: '-2px'
                                                                                }}
                                                                            >
                                                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                                                    {emoji} {tabName}
                                                                                    <span className="apb-tooltip" onClick={(e) => e.stopPropagation()}>
                                                                                        ?
                                                                                        <span className="apb-tooltip-text">
                                                                                            {tabName === 'Relevant Skills' && 'Core skills directly required in the job description or essential for performing this role.'}
                                                                                            {tabName === 'Related Skills' && 'Supporting skills from the same industry/domain that add value to your profile.'}
                                                                                            {tabName === 'Additional Skills' && 'Other skills from different domains or general abilities found in your CV.'}
                                                                                        </span>
                                                                                    </span>
                                                                                </span>
                                                                                <span style={{
                                                                                    fontSize: '0.72rem',
                                                                                    background: activeTab === tabName ? 'rgba(139,26,43,0.1)' : '#f1f5f9',
                                                                                    color: activeTab === tabName ? 'var(--crimson, #8b1a2b)' : '#64748b',
                                                                                    padding: '2px 8px',
                                                                                    borderRadius: '100px',
                                                                                    fontWeight: 800
                                                                                }}>
                                                                                    {count}
                                                                                </span>
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>

                                                                {/* Tab Content */}
                                                                {(() => {
                                                                    const activeSkills = skillsMetadata.filter(item => item.category === activeTab);

                                                                    return (
                                                                        <div className="category-block animate-fade-in" style={{ border: 'none', background: 'transparent', padding: 0 }}>
                                                                            {activeSkills.length === 0 && (
                                                                                <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '16px' }}>
                                                                                    No skills identified under {activeTab} in your CV. You can manually add some below.
                                                                                </p>
                                                                            )}
                                                                            <div className="category-skills-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', width: '100%' }}>
                                                                                {activeSkills.map((item, idx) => {
                                                                                    const isEditing = editingSkillName === item.skill;
                                                                                    const isMatched = checkSkillInCvText(item.skill, rawCvText);

                                                                                    if (isEditing) {
                                                                                        const currentMatch = checkSkillInCvText(editingSkillValue, rawCvText);
                                                                                        return (
                                                                                            <div key={idx} className={`skill-metadata-card editing-card ${item.is_mandatory ? 'is-mandatory-card' : ''}`} style={{ border: '2px solid var(--gold-accent, #c8a951)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                                                                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold-accent)' }}>Edit Skill Name</label>
                                                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                                                        <input
                                                                                                            type="text"
                                                                                                            value={editingSkillValue}
                                                                                                            onChange={(e) => setEditingSkillValue(e.target.value)}
                                                                                                            className="apb-input"
                                                                                                            style={{ flex: 1, padding: '4px 8px', fontSize: '0.85rem', height: '32px' }}
                                                                                                            autoFocus
                                                                                                            onKeyDown={(e) => {
                                                                                                                if (e.key === 'Enter') {
                                                                                                                    handleSaveSkill(item.skill, editingSkillValue);
                                                                                                                } else if (e.key === 'Escape') {
                                                                                                                    setEditingSkillName(null);
                                                                                                                    setEditingSkillValue('');
                                                                                                                }
                                                                                                            }}
                                                                                                        />
                                                                                                        {rawCvText && (
                                                                                                            <span className={`skill-match-status-badge ${currentMatch ? (item.category === 'Additional Skills' ? 'unrelated' : 'matched') : 'unmatched'}`} style={{ whiteSpace: 'nowrap' }}>
                                                                                                                {currentMatch ? (item.category === 'Additional Skills' ? '✓ In CV (Unrelated)' : '✓ Verified in CV') : '⚠ Not found in CV'}
                                                                                                            </span>
                                                                                                        )}
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '4px' }}>
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn-secondary-small"
                                                                                                        onClick={() => {
                                                                                                            setEditingSkillName(null);
                                                                                                            setEditingSkillValue('');
                                                                                                        }}
                                                                                                        style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', height: '26px' }}
                                                                                                    >
                                                                                                        <FiX size={12} /> Cancel
                                                                                                    </button>
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn-primary-small"
                                                                                                        onClick={() => handleSaveSkill(item.skill, editingSkillValue)}
                                                                                                        style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', height: '26px' }}
                                                                                                    >
                                                                                                        <FiCheck size={12} /> Save
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                    }

                                                                                    return (
                                                                                        <div key={idx} className={`skill-metadata-card ${item.is_mandatory ? 'is-mandatory-card' : ''}`}>
                                                                                            <div className="skill-card-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                                                                                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', flex: 1 }}>
                                                                                                    <span className="skill-card-name" style={{ fontWeight: 'bold' }}>
                                                                                                        {item.skill}
                                                                                                    </span>
                                                                                                    {rawCvText && (
                                                                                                        <span className={`skill-match-status-badge ${isMatched ? (item.category === 'Additional Skills' ? 'unrelated' : 'matched') : 'unmatched'}`}>
                                                                                                            {isMatched ? (item.category === 'Additional Skills' ? '✓ In CV (Unrelated)' : '✓ Verified in CV') : '⚠ Not found in CV'}
                                                                                                        </span>
                                                                                                    )}
                                                                                                </div>
                                                                                                <div className="skill-card-actions" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="skill-edit-btn-trigger"
                                                                                                        onClick={() => {
                                                                                                            setEditingSkillName(item.skill);
                                                                                                            setEditingSkillValue(item.skill);
                                                                                                        }}
                                                                                                        title="Edit Skill"
                                                                                                    >
                                                                                                        <FiEdit2 size={12} />
                                                                                                    </button>
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="skill-delete-btn"
                                                                                                        onClick={() => {
                                                                                                            setSkillsMetadata(prev => prev.filter(x => x.skill.toLowerCase() !== item.skill.toLowerCase()));
                                                                                                            setUserSkills(prev => prev.filter(x => x.toLowerCase() !== item.skill.toLowerCase()));
                                                                                                            if (item.is_mandatory) {
                                                                                                                setMatchedSkills(prev => prev.filter(x => x.toLowerCase() !== item.skill.toLowerCase()));
                                                                                                            }
                                                                                                        }}
                                                                                                        title="Remove Skill"
                                                                                                    >
                                                                                                        <FiX size={12} />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                            {item.evidence_source && (
                                                                                                <div className="skill-meta-row-candidate" style={{ display: 'flex', gap: '6px', margin: '4px 0' }}>
                                                                                                    <span className="skill-source-badge">
                                                                                                        via {item.evidence_source}
                                                                                                    </span>
                                                                                                </div>
                                                                                            )}
                                                                                            <p className="skill-card-context">
                                                                                                {item.context}
                                                                                            </p>
                                                                                        </div>
                                                                                    );
                                                                                })}

                                                                                {/* Add Skill card */}
                                                                                <div className="skill-metadata-card add-skill-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                                                                                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                                            ✨ Add New Skill to {activeTab.replace(' Skills', '')}
                                                                                        </span>
                                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                                            <input
                                                                                                type="text"
                                                                                                placeholder="e.g. Docker, Python"
                                                                                                value={newSkillName}
                                                                                                onChange={(e) => setNewSkillName(e.target.value)}
                                                                                                className="apb-input"
                                                                                                style={{ flex: 1, padding: '4px 8px', fontSize: '0.85rem', height: '32px' }}
                                                                                                onKeyDown={(e) => {
                                                                                                    if (e.key === 'Enter') {
                                                                                                        handleAddSkill();
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            {newSkillName.trim() && rawCvText && (
                                                                                                <span className={`skill-match-status-badge ${checkSkillInCvText(newSkillName, rawCvText) ? (activeTab === 'Additional Skills' ? 'unrelated' : 'matched') : 'unmatched'}`} style={{ whiteSpace: 'nowrap' }}>
                                                                                                    {checkSkillInCvText(newSkillName, rawCvText) ? (activeTab === 'Additional Skills' ? '✓ In CV (Unrelated)' : '✓ Verified in CV') : '⚠ Not found in CV'}
                                                                                                </span>
                                                                                            )}
                                                                                        </div>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn-primary-small"
                                                                                            onClick={() => handleAddSkill()}
                                                                                            style={{ padding: '4px 12px', fontSize: '0.78rem', alignSelf: 'flex-end', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                                                                                        >
                                                                                            + Add Skill
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })()}
                                                            </div>
                                                        ) : (
                                                            <div className="no-skills-extracted">
                                                                {form.cv ? (
                                                                    <p>George Steuart AI could not find any skills with sufficient project context in your resume. You can add skills manually below.</p>
                                                                ) : (
                                                                    <p>Upload a PDF CV to automatically extract and verify your skills with project experience details.</p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}

                                        {/* CV is now uploaded and parsed at the top */}

                                        {/* Privacy Consent */}
                                        <div className="apb-consent">
                                            <input
                                                type="checkbox"
                                                id="priv"
                                                checked={privacyAccepted}
                                                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                                required
                                            />
                                            <label htmlFor="priv">
                                                I agree my personal information may be processed for recruitment purposes per the <a href="#">Privacy Policy</a>.
                                            </label>
                                        </div>



                                        <button
                                            type="submit"
                                            className="apb-submit"
                                            disabled={!privacyAccepted}
                                            style={{
                                                opacity: !privacyAccepted ? 0.6 : 1,
                                                cursor: !privacyAccepted ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            Review Application <FiChevronRight />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* ─── STEP 2 — REVIEW ─── */}
                        {step === 2 && (
                            <div className="apb-card">
                                <h2 className="apb-card-title">Review Your Application</h2>

                                <div className="apb-review-block">
                                    <div className="apb-rev-section">Personal Information</div>
                                    <div className="apb-grid2">
                                        {[['First Name', form.first_name], ['Last Name', form.last_name],
                                        ['Email', form.email], ['Phone', form.contact_number]].map(([l, v]) => (
                                            <div key={l} className="apb-rv-item">
                                                <span className="apb-rv-lbl">{l}</span>
                                                <span className="apb-rv-val">{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="apb-review-block">
                                    <div className="apb-rev-section">Professional Profile</div>
                                    <div className="apb-grid2">
                                        {[['Qualification', form.qualification],
                                        ['Salary', form.salary_expectation || '—'],
                                        ['Total Exp.', form.overall_experience],
                                        ['Relevant Exp.', form.relevant_experience]].map(([l, v]) => (
                                            <div key={l} className="apb-rv-item">
                                                <span className="apb-rv-lbl">{l}</span>
                                                <span className="apb-rv-val">{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="apb-review-block">
                                    <div className="apb-rev-section">Documents & Preferences</div>
                                    <div className="apb-rv-doc"><FiFileText /><span>{form.cv?.name}</span></div>
                                    <div className="apb-rv-item" style={{ marginTop: 12 }}>
                                        <span className="apb-rv-lbl">Future Opportunities</span>
                                        <span className="apb-rv-val" style={{ color: form.future_consent ? 'var(--success)' : 'var(--text-muted)' }}>
                                            {form.future_consent ? 'Yes — keep my CV on file' : 'No — this role only'}
                                        </span>
                                    </div>
                                </div>

                                {skillsMetadata.length > 0 && (
                                    <div className="apb-review-block">
                                        <div
                                            className="apb-rev-section"
                                            onClick={() => setReviewSkillsExpanded(v => !v)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                cursor: 'pointer',
                                                userSelect: 'none'
                                            }}
                                        >
                                            <span>AI Skills Analysis Portfolio</span>
                                            <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>
                                                {reviewSkillsExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                                            </span>
                                        </div>
                                        {reviewSkillsExpanded && (
                                            <div className="review-categorized-skills" style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
                                                {/* Step 2 Review Tab System */}
                                                <div className="apb-skills-tabs" style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '8px', gap: '16px', flexWrap: 'wrap' }}>
                                                    {['Relevant Skills', 'Related Skills', 'Additional Skills'].map(tabName => {
                                                        const count = skillsMetadata.filter(item => item.category === tabName).length;

                                                        const emoji = tabName === 'Relevant Skills' ? '🟢' : tabName === 'Related Skills' ? '🟡' : '🔵';

                                                        return (
                                                            <button
                                                                key={tabName}
                                                                type="button"
                                                                className={`apb-tab-btn ${activeReviewTab === tabName ? 'active' : ''}`}
                                                                onClick={(e) => {
                                                                    e.stopPropagation(); // Prevent toggling the collapsible block
                                                                    setActiveReviewTab(tabName);
                                                                }}
                                                                style={{
                                                                    padding: '8px 12px',
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    borderBottom: activeReviewTab === tabName ? '3px solid var(--crimson, #8b1a2b)' : '3px solid transparent',
                                                                    color: activeReviewTab === tabName ? 'var(--crimson, #8b1a2b)' : '#64748b',
                                                                    fontWeight: 700,
                                                                    fontSize: '0.82rem',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '6px',
                                                                    transition: 'all 0.2s ease',
                                                                    marginBottom: '-2px'
                                                                }}
                                                            >
                                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                                    {emoji} {tabName}
                                                                    <span className="apb-tooltip" onClick={(e) => {
                                                                        e.stopPropagation(); // Prevent tab switch
                                                                    }}>
                                                                        ?
                                                                        <span className="apb-tooltip-text">
                                                                            {tabName === 'Relevant Skills' && 'Core skills directly required in the job description or essential for performing this role.'}
                                                                            {tabName === 'Related Skills' && 'Supporting skills from the same industry/domain that add value to your profile.'}
                                                                            {tabName === 'Additional Skills' && 'Other skills from different domains or general abilities found in your CV.'}
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                                <span style={{
                                                                    fontSize: '0.68rem',
                                                                    background: activeReviewTab === tabName ? 'rgba(139,26,43,0.1)' : '#f1f5f9',
                                                                    color: activeReviewTab === tabName ? 'var(--crimson, #8b1a2b)' : '#64748b',
                                                                    padding: '1px 6px',
                                                                    borderRadius: '100px',
                                                                    fontWeight: 800
                                                                }}>
                                                                    {count}
                                                                </span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                {/* Step 2 Tab Content List */}
                                                {(() => {
                                                    const activeSkills = skillsMetadata.filter(item => item.category === activeReviewTab);

                                                    if (activeSkills.length === 0) {
                                                        return (
                                                            <div style={{ padding: '20px 10px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                                                                No skills classified under {activeReviewTab}.
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <div className="review-category-group" style={{ padding: '12px 16px', background: '#fcfcfd', border: '1px solid #f1f5f9', borderRadius: '12px' }}>
                                                            <div style={{ display: 'grid', gap: '10px' }}>
                                                                {activeSkills.map((item, idx) => {
                                                                    const isMatched = checkSkillInCvText(item.skill, rawCvText);
                                                                    return (
                                                                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '3px', borderBottom: idx < activeSkills.length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: idx < activeSkills.length - 1 ? '10px' : '0', paddingTop: idx > 0 ? '10px' : '0' }}>
                                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                                                                                        {item.skill}
                                                                                    </span>
                                                                                    {rawCvText && (
                                                                                        <span className={`skill-match-status-badge ${isMatched ? (item.category === 'Additional Skills' ? 'unrelated' : 'matched') : 'unmatched'}`}>
                                                                                            {isMatched ? (item.category === 'Additional Skills' ? '✓ In CV (Unrelated)' : '✓ Verified in CV') : '⚠ Not found in CV'}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                                {item.evidence_source && (
                                                                                    <span className="skill-source-badge">
                                                                                        via {item.evidence_source}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.45' }}>{item.context}</p>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="apb-disclosure" style={{ fontWeight: 700, color: '#b8860b', background: 'rgba(184,134,11,0.08)', border: '1px solid rgba(184,134,11,0.3)', borderRadius: '8px', padding: '10px 14px' }}>
                                    <FiAlertCircle size={14} style={{ marginRight: 6, verticalAlign: 'middle', color: '#b8860b' }} />
                                    <strong>By submitting, you confirm all information is accurate and complete. </strong>
                                </div>

                                <div className="apb-review-actions">
                                    <button className="apb-edit-btn" onClick={() => setStep(1)} disabled={submitting}>
                                        <FiArrowLeft /> Edit
                                    </button>
                                    <button className="apb-submit apb-submit-final" onClick={submitToBackend} disabled={submitting}>
                                        {submitting ? 'Submitting…' : <><FiCheck /> Confirm & Submit</>}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className="footer-premium">
                <div className="container">
                    <div className="footer-top-grid">
                        <div className="footer-col brand-col">
                            <img src="/gs-logo.png" alt="George Steuart" className="footer-logo-premium" />
                            <h3 className="footer-brand-name">George Steuart <br /><span>& Company Ltd</span></h3>
                            <p className="footer-about-text">Established in 1835, Sri Lanka's oldest mercantile firm.</p>
                            <div className="footer-socials">
                                <a href="https://www.facebook.com/GeorgeSteuarts" target="_blank" rel="noopener noreferrer" className="social-link"><FiFacebook /></a>
                                <a href="https://www.linkedin.com/company/george-steuart-&-company-limited" target="_blank" rel="noopener noreferrer" className="social-link"><FiLinkedin /></a>
                            </div>
                        </div>
                        <div className="footer-col links-col">
                            <h4 className="footer-col-title">Quick Links</h4>
                            <ul className="footer-links-list">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/vacancies">All Vacancies</Link></li>
                                <li><Link to="/admin/login">Admin Portal</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col contact-col">
                            <h4 className="footer-col-title">Get In Touch</h4>
                            <div className="footer-contact-info">
                                <p><FiMapPin className="c-icon" /> No. 439, Galle Road, Colombo 03.</p>
                                <p><FiGlobe className="c-icon" /> www.georgesteuart.lk</p>
                                <div className="contact-numbers">
                                    <p><span>T:</span> +94 117 792 400</p>
                                    <p><span>E:</span> info@georgesteuart.lk</p>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bottom-bar">
                            <div className="copyright-area">© {new Date().getFullYear()} George Steuart & Company Ltd. All Rights Reserved.</div>
                        </div>
                    </div>
                </div>
            </footer>

            {parsing && (
                <div className="parsing-overlay">
                    <div className="parsing-popup">
                        <div className="spinner-wrapper" style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 24px' }}>
                            <div className="spinner-large" style={{ width: '80px', height: '80px', margin: 0, borderWidth: '5px' }}></div>
                            <div className="spinner-percentage" style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                fontWeight: '850',
                                color: 'var(--crimson, #8b1a2b)',
                                fontFamily: 'var(--font-body)'
                            }}>
                                {parsingProgress}%
                            </div>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>George Steuart AI is reading your CV...</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                            Extracting contact details, qualifications, experience, and skill matches. Please wait.
                        </p>
                    </div>
                </div>
            )}

            {/* ── PDPA Consent Modal ── */}
            {showPdpaModal && (
                <div className="pdpa-modal-overlay">
                    <div className="pdpa-modal-card">
                        <div className="pdpa-modal-header">
                            <h3>PDPA Consent & Guidelines</h3>
                            <button type="button" className="pdpa-modal-close-btn" onClick={() => setShowPdpaModal(false)}>
                                <FiX size={20} />
                            </button>
                        </div>
                        <div className="pdpa-modal-body">
                            <div className="pdpa-info-section">
                                <h4>{pdpaConfig.pdpa_title}</h4>
                                <p>
                                    {pdpaConfig.pdpa_description}
                                </p>
                                <ul className="pdpa-bullets">
                                    <li><strong>Purpose:</strong> {pdpaConfig.pdpa_purpose}</li>
                                    <li><strong>Retention:</strong> {pdpaConfig.pdpa_retention}</li>
                                    <li><strong>Security:</strong> {pdpaConfig.pdpa_security}</li>
                                    <li><strong>Your Rights:</strong> {pdpaConfig.pdpa_rights}</li>
                                </ul>
                            </div>

                            <div className="pdpa-consent-question">
                                <strong>Would you like George Steuart & Company to keep your CV for future opportunities? <span className="req">*</span></strong>
                                <p className="pdpa-consent-sub">Please select one option to proceed with your application.</p>
                            </div>

                            <div className="pdpa-checkbox-group">
                                <div
                                    className={`pdpa-checkbox-card ${form.future_consent === true ? 'selected' : ''}`}
                                    onClick={() => setForm({ ...form, future_consent: true })}
                                >
                                    <div className="pdpa-checkbox-indicator">
                                        {form.future_consent === true && <div className="pdpa-checkbox-checked"></div>}
                                    </div>
                                    <div className="pdpa-checkbox-label">
                                        <strong>Yes, keep my CV for future opportunities</strong>
                                        <span>Our HR team can contact you for relevant future roles. You won't need to reapply.</span>
                                    </div>
                                </div>

                                <div
                                    className={`pdpa-checkbox-card ${form.future_consent === false ? 'selected' : ''}`}
                                    onClick={() => setForm({ ...form, future_consent: false })}
                                >
                                    <div className="pdpa-checkbox-indicator">
                                        {form.future_consent === false && <div className="pdpa-checkbox-checked"></div>}
                                    </div>
                                    <div className="pdpa-checkbox-label">
                                        <strong>No, only process for this role</strong>
                                        <span>Your application will be considered for this position only. Your data will not be stored in the Talent Pool.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pdpa-modal-footer">
                            <button
                                type="button"
                                className="pdpa-btn-cancel"
                                onClick={() => setShowPdpaModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="pdpa-btn-proceed"
                                disabled={form.future_consent === null}
                                onClick={() => {
                                    setShowPdpaModal(false);
                                    setStep(2);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >
                                Accept & Proceed <FiChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApplyPage;
