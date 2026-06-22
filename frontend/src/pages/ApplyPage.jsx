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
import { getVacancy, applyForJob, API_BASE } from '../services/api';

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
        ["kubernetes", "k8s"]
    ];

    // Find if the current skill is part of a synonym group
    const matchGroup = synonyms.find(group => group.some(term => s === term || term.includes(s) || s.includes(term)));
    const searchTerms = matchGroup ? matchGroup : [s];

    return searchTerms.some(term => {
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

    useEffect(() => {
        console.log("Steuart AI PDFJS Integration Status:", !!window.pdfjsLib);
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
        const toastId = toast.info("✨ Steuart AI is analyzing your CV...", { autoClose: false });
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

Step 1: Extract all CV skills
Extract all skills from the CV including:
- Technical skills (programming languages, frameworks, tools)
- Soft skills
- Academic or learning skills
Also identify where each skill is mentioned (projects, experience, education).

Step 2: Analyze Job Description
Extract and analyze:
- Mandatory (Must-have) skills
- Required skills
- Nice-to-have skills
- Tools, frameworks, and domain knowledge

Step 3: Create Job Skill Matrix
Create a structured Job Skill Matrix from the job description.
Group skills into:
- Core Required Skills
- Supporting Skills
- Optional Skills

Step 4: Skill Classification (STRICT RULES)
For EACH extracted CV skill, compare it with the Job Skill Matrix and classify as follows:

🟢 RELEVANT SKILLS
IF:
Skill is directly related to Job Skill Matrix
AND
There is clear usage evidence in CV (project/work/internship)
→ Classify as "Relevant Skills" and output under skills_analysis with category "Relevant Skills".

🟡 RELATED SKILLS
IF:
Skill is supporting or adjacent to Job Skill Matrix
OR
Skill has partial/basic usage
→ Classify as "Related Skills" and output under skills_analysis with category "Related Skills".

🔵 ADDITIONAL SKILLS
IF:
Skill is NOT related to Job Skill Matrix
OR
Skill is only mentioned with no usage evidence
OR
Skill is irrelevant to the job role
→ Classify as "Additional Skills" and output in the additional_skills array matching the structured object format.

UPDATED CRITICAL RULES (FINAL VERSION)
- Do NOT extract random extra skills
- 👉 Only include skills found in CV OR required by job context, FINAL RULES
- Never hallucinate data
- Never assume missing skills
- Always stay CV-grounded
- Always stay job-relevant
- Always prioritize accuracy over completeness
- Never mix skill categories incorrectly
- NEVER mix Additional Skills with Relevant Skills
- ALWAYS treat CV-mentioned skills as valid input signals (skills listed in any section: skills, projects, experience, education)
- DO NOT assume deep expertise unless CV clearly indicates level of usage
- ALWAYS follow job relevance strictly when categorizing skills
- NEVER exaggerate candidate experience beyond what is described in CV
- ALWAYS base classification on job relevance + CV presence + context clarity, not assumptions
- **usage_context rule**: The 'usage_context' field for each skill MUST be a concise, single-sentence summary (max 20 words) detailing exactly where or how the skill was utilized (e.g. 'Built the frontend of a job portal with React'). NEVER concatenate multiple project descriptions or copy/paste large paragraphs.
- **certifications exclusion**: Do NOT extract names of certifications, online courses, training courses, or credentials (such as 'Python for Beginners', 'Web Design for Beginners', 'Introduction to Android Studio', etc.) as skills. These MUST be extracted strictly under the 'certifications_found' array. Only extract the underlying skill (e.g., 'Python', 'Web Design', 'Android Studio') if it matches the job relevance criteria.
- **evidence_source rule**: Classify the 'evidence_source' field strictly based on these guidelines:
  * 'Professional Experience': Only if the skill is used within permanent full-time/part-time job history.
  * 'Internship': Only if used in designated student or graduate internships.
  * 'Project': Only if used in specific individual, personal, or freelance projects.
  * 'Freelance Work': Only if used in contract or freelance gigs.
  * 'Academic Work': Only if used during university/school courses or academic degree projects.
  * 'Certification': Only if verified by professional certification credentials.
  * 'Training': Only if used during short training programs, workshops, or bootcamps.
  * 'Skills Section Only': Only if the skill is strictly mentioned in a flat listing of skills without any context, projects, or work history explanation.

==================================================
PHASE 4 - REQUIREMENT VALIDATION
================================
For each mandatory job requirement (if any are specified in Mandatory Skills or requirements), determine if they are:
- "Fully Demonstrated" (Evidence must exist in work experience, projects, certifications, etc.)
- "Partially Demonstrated"
- "No Evidence Found"
Compare and list their names under the matching demonstration lists.

==================================================
PHASE 5 - RECRUITER INSIGHTS
============================
Generate practical recruiter observations/insights.

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
                        } catch (_) {}
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

            // Extract skills_metadata for local display mapping
            let parsedMetadata = [];
            if (Array.isArray(parsed.skills_analysis)) {
                parsedMetadata = parsed.skills_analysis.map(item => ({
                    skill: item.skill,
                    experience: item.estimated_duration,
                    context: item.usage_context,
                    category: item.category,
                    evidence_source: item.evidence_source || 'Skills Section Only',
                    evidence_strength: item.evidence_strength || 'Mentioned Only',
                    experience_level: item.experience_level || 'Basic',
                    is_mandatory: parsed.fully_demonstrated_skills?.some(s => isRobustMatch(item.skill, s)) || 
                                  parsed.partially_demonstrated_skills?.some(s => isRobustMatch(item.skill, s)) ||
                                  requiredSkillsList.some(rs => isRobustMatch(item.skill, rs))
                }));
            }
            if (Array.isArray(parsed.additional_skills)) {
                parsed.additional_skills.forEach(item => {
                    const isObj = typeof item === 'object' && item !== null;
                    const skillName = isObj ? item.skill : item;
                    if (skillName && !parsedMetadata.some(x => x.skill.toLowerCase() === skillName.toLowerCase())) {
                        parsedMetadata.push({
                            skill: skillName,
                            experience: isObj ? (item.estimated_duration || "Mentioned Only") : "Mentioned Only",
                            context: isObj ? (item.usage_context || "Mentioned in CV with no specific project/experience context.") : "Mentioned in CV with no specific project/experience context.",
                            category: "Additional Skills",
                            evidence_source: isObj ? (item.evidence_source || "Skills Section Only") : "Skills Section Only",
                            evidence_strength: isObj ? (item.evidence_strength || "Mentioned Only") : "Mentioned Only",
                            experience_level: isObj ? (item.experience_level || "Basic") : "Basic",
                            is_mandatory: false
                        });
                    }
                });
            }
            const normalized = normalizeSkills(parsedMetadata);
            setSkillsMetadata(normalized);
            setAiAnalysis(parsed);
            setSkillsPanelExpanded(false);

            // Auto-detect matched mandatory skills
            const detected = normalized.filter(item => item.is_mandatory).map(item => item.skill);
            setMatchedSkills(detected);

            // Pre-fill all general skills from CV
            const cleanedSkills = [...new Set(normalized.map(item => item.skill))];
            setUserSkills(cleanedSkills);

            toast.update(toastId, {
                render: requiredSkillsList.length > 0
                    ? `🎉 AI parsed your CV! ${detected.length} of ${requiredSkillsList.length} required skills detected.`
                    : "🎉 Steuart AI successfully parsed your CV and auto-filled the form!",
                type: "success",
                autoClose: 5000,
                isLoading: false
            });
        } catch (err) {
            console.error("CV parsing error:", err);
            let userFriendlyMessage = err.message || 'Please enter details manually.';
            if (err.message && (err.message.includes('429') || err.message.toLowerCase().includes('quota'))) {
                userFriendlyMessage = "Gemini API key quota exceeded (status 429). Please update your VITE_GEMINI_API_KEY in the frontend/.env file, or wait for the quota to reset. You can still fill out the form manually.";
            }
            toast.update(toastId, {
                render: `⚠️ AI auto-fill failed: ${userFriendlyMessage}`,
                type: "warning",
                autoClose: 10000,
                isLoading: false
            });
        } finally {
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
                    is_mandatory: requiredSkillsList.some(rs => isRobustMatch(trimmed, rs))
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
            is_mandatory: isMandatory
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

        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                            usage_context: item.context || 'Manually added by candidate'
                        })),
                    fully_demonstrated_skills: skillsMetadata.filter(item => item.is_mandatory).map(item => item.skill),
                    partially_demonstrated_skills: [],
                    requirements_without_evidence: [],
                    additional_skills: skillsMetadata
                        .filter(item => item.category === 'Additional Skills')
                        .map(item => item.skill),
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
                            usage_context: item.context || 'Manually added by candidate'
                        };
                    });
                
                finalAnalysis.additional_skills = skillsMetadata
                    .filter(item => item.category === 'Additional Skills')
                    .map(item => item.skill);

                finalAnalysis.fully_demonstrated_skills = skillsMetadata.filter(item => item.is_mandatory).map(item => item.skill);
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
                @keyframes spin-cv {
                    to { transform: rotate(360deg); }
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

                                <form onSubmit={handleReview}>


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
                                                    <div className="apb-upload-text" style={{ color: 'var(--gold-accent)', fontWeight: 800 }}>Steuart AI is parsing your resume...</div>
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
                                                    Steuart AI Skills Profile Analysis
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
                                                                <strong>Human-like Verification:</strong> Steuart AI filtered out list-only skills that lacked supporting work history or project context in your CV.
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
                                                                    const isMatched = skillsMetadata.some(item => isRobustMatch(item.skill, skillName));
                                                                    
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
                                                                            <span>{emoji} {tabName}</span>
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
                                                                <p>Steuart AI could not find any skills with sufficient project context in your resume. You can add skills manually below.</p>
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

                                    {/* Talent Pool */}
                                    <div className="apb-talent-pool">
                                        <div className="apb-tp-header">
                                            <span className="apb-tp-emoji">📂</span>
                                            <div>
                                                <strong>Keep my CV for future opportunities?</strong>
                                                <p>HR can reach out for future roles — no need to apply again.</p>
                                            </div>
                                        </div>
                                        <div className="apb-tp-btns">
                                            <button type="button"
                                                className={`apb-tp-btn yes ${form.future_consent === true ? 'sel' : ''}`}
                                                onClick={() => setForm({ ...form, future_consent: true })}>
                                                ✅ Yes, keep my CV
                                            </button>
                                            <button type="button"
                                                className={`apb-tp-btn no ${form.future_consent === false && form.future_consent !== null ? 'sel' : ''}`}
                                                onClick={() => setForm({ ...form, future_consent: false })}>
                                                🚫 This role only
                                            </button>
                                        </div>
                                        {form.future_consent === true && <div className="apb-tp-note yes">🎉 Your CV will be kept in our Talent Pool.</div>}
                                        {form.future_consent === false && <div className="apb-tp-note no">Only used for this application.</div>}
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
                                                                <span>{emoji} {tabName}</span>
                                                                <span style={{
                                                                    fontSize: '0.68rem',
                                                                    background: activeReviewReviewTab === tabName ? 'rgba(139,26,43,0.1)' : '#f1f5f9',
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
                                                                {activeSkills.map((item, idx) => (
                                                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '3px', borderBottom: idx < activeSkills.length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: idx < activeSkills.length - 1 ? '10px' : '0', paddingTop: idx > 0 ? '10px' : '0' }}>
                                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                                                                                    {item.skill}
                                                                                </span>
                                                                                {rawCvText && (
                                                                                    <span className={`skill-match-status-badge ${checkSkillInCvText(item.skill, rawCvText) ? (item.category === 'Additional Skills' ? 'unrelated' : 'matched') : 'unmatched'}`}>
                                                                                        {checkSkillInCvText(item.skill, rawCvText) ? (item.category === 'Additional Skills' ? '✓ In CV (Unrelated)' : '✓ Verified in CV') : '⚠ Not found in CV'}
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
                                                                ))}
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
        </div>
    );
}

export default ApplyPage;
