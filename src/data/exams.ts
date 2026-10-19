// VEZEI Competitive Examination Directory & Wave Expansion Taxonomy
// Guided by Vezei Booklet (Page 5) and Project Overview (Page 3)

export interface ExamSection {
  name: string;
  questions: number;
  durationMinutes: number;
  weightage?: string;
}

export interface SyllabusSubject {
  subject: string;
  topicCount: number;
  topics: string[];
}

export type LaunchWave = "wave_1" | "wave_2" | "wave_3" | "wave_4";
export type ReadinessStatus = "available" | "in_preparation" | "planned";

export interface Exam {
  id: string;
  slug: string;
  name: string;
  fullName: string;
  category:
    | "Management"
    | "Engineering"
    | "Graduate Admissions"
    | "Undergraduate Admissions"
    | "Language Proficiency"
    | "Medical & Healthcare"
    | "Law"
    | "Research & Postgraduate";
  region: string;
  launchWave: LaunchWave;
  waveLabel: "Wave 1 — Launch" | "Wave 2 — Next" | "Wave 3 — Then" | "Wave 4 — Later";
  readinessStatus: ReadinessStatus;
  contentAvailability: string;
  reviewStatus: "verified" | "under_review" | "planned";
  verifiedRights: boolean;
  status: "published" | "verified" | "draft" | "upcoming";
  shortDescription: string;
  overview: string;
  annualAspirants: string;
  durationMinutes: number;
  totalQuestions: number;
  markingScheme: string;
  eligibility: string;
  targetRole: string;
  keyDateLabel: string;
  keyDateValue: string;
  sections: ExamSection[];
  syllabus: SyllabusSubject[];
  highlights: string[];
}

export const EXAM_CATEGORIES = [
  "All Categories",
  "Management",
  "Engineering",
  "Graduate Admissions",
  "Undergraduate Admissions",
  "Language Proficiency",
  "Medical & Healthcare",
  "Law",
  "Research & Postgraduate",
] as const;

export const EXAMS_DATA: Exam[] = [
  // ==========================================
  // WAVE 1 — LAUNCH (Indian B-School Prep)
  // CAT, XAT, SNAP, NMAT, MAT
  // ==========================================
  {
    id: "cat",
    slug: "cat",
    name: "CAT",
    fullName: "Common Admission Test",
    category: "Management",
    region: "India / Top B-Schools",
    launchWave: "wave_1",
    waveLabel: "Wave 1 — Launch",
    readinessStatus: "available",
    contentAvailability: "Full Practice & Proctored Mocks Live",
    reviewStatus: "verified",
    verifiedRights: true,
    status: "published",
    shortDescription: "Premier national exam for admission into 21 Indian Institutes of Management (IIMs) and top business schools.",
    overview: "The Common Admission Test (CAT) is a computer-based test conducted for admission to postgraduate business management programs. It evaluates Quantitative Aptitude, Data Interpretation & Logical Reasoning, and Verbal Ability & Reading Comprehension with rigorous percentile benchmarks.",
    annualAspirants: "~330,000 Aspirants",
    durationMinutes: 120,
    totalQuestions: 66,
    markingScheme: "+3 for correct answer, -1 for incorrect MCQ, 0 for Non-MCQ (TITA)",
    eligibility: "Bachelor's degree with at least 50% marks or equivalent CGPA (45% for reserved categories). Final year students are eligible.",
    targetRole: "MBA / PGDM at IIMs, FMS, SPJIMR, MDI, IIT DoMS",
    keyDateLabel: "Release Status",
    keyDateValue: "Available Now",
    sections: [
      { name: "Verbal Ability & Reading Comprehension (VARC)", questions: 24, durationMinutes: 40, weightage: "36%" },
      { name: "Data Interpretation & Logical Reasoning (DILR)", questions: 20, durationMinutes: 40, weightage: "30%" },
      { name: "Quantitative Aptitude (QA)", questions: 22, durationMinutes: 40, weightage: "34%" },
    ],
    syllabus: [
      {
        subject: "Quantitative Aptitude",
        topicCount: 5,
        topics: [
          "Arithmetic (Percentages, Profit & Loss, Ratio, Time & Work)",
          "Algebra (Quadratic Equations, Logs, Sequences & Series)",
          "Geometry & Mensuration (Triangles, Circles, Coordinate)",
          "Modern Math (Permutations & Combinations, Probability)",
          "Number Systems (Remainders, Base Systems, Divisibility)",
        ],
      },
      {
        subject: "DILR",
        topicCount: 4,
        topics: [
          "Arrangements & Puzzles",
          "Matrix & Grid Analysis",
          "Tables, Bar Charts & Data Caselets",
          "Games & Tournaments / Network Flow",
        ],
      },
      {
        subject: "VARC",
        topicCount: 3,
        topics: [
          "Reading Comprehension (Philosophy, Economics, Science, Culture)",
          "Para Jumbles & Odd One Out",
          "Para Summary & Sentence Insertion",
        ],
      },
    ],
    highlights: [
      "Official sectional 40-minute locked timers",
      "Non-MCQ / TITA questions with zero negative deduction",
      "Full question bank with verified explanations",
    ],
  },
  {
    id: "xat",
    slug: "xat",
    name: "XAT",
    fullName: "Xavier Aptitude Test",
    category: "Management",
    region: "India / XLRI & Top Institutes",
    launchWave: "wave_1",
    waveLabel: "Wave 1 — Launch",
    readinessStatus: "in_preparation",
    contentAvailability: "Decision Making & QA Content in Expert Review",
    reviewStatus: "under_review",
    verifiedRights: true,
    status: "draft",
    shortDescription: "Prestigious management entrance exam conducted by XLRI Jamshedpur for over 160 participating institutes.",
    overview: "XAT is known for its distinctive Decision Making section, Verbal and Logical Ability, Quantitative Ability & Data Interpretation, and General Knowledge.",
    annualAspirants: "~135,000 Aspirants",
    durationMinutes: 210,
    totalQuestions: 95,
    markingScheme: "+1 for correct, -0.25 for incorrect, -0.10 for unattempted questions beyond 8",
    eligibility: "Recognized Bachelor's degree in any discipline. Final year students eligible.",
    targetRole: "PGDM (BM & HRM) at XLRI Jamshedpur, XIMB, IMT, TAPMI",
    keyDateLabel: "Release Status",
    keyDateValue: "In Preparation (Wave 1)",
    sections: [
      { name: "Verbal & Logical Ability (VALR)", questions: 26, durationMinutes: 55, weightage: "27%" },
      { name: "Decision Making (DM)", questions: 22, durationMinutes: 50, weightage: "23%" },
      { name: "Quantitative Ability & DI (QA-DI)", questions: 28, durationMinutes: 65, weightage: "30%" },
      { name: "General Knowledge & Essay", questions: 25, durationMinutes: 40, weightage: "20%" },
    ],
    syllabus: [
      {
        subject: "Decision Making",
        topicCount: 3,
        topics: ["Ethical Dilemmas & Management Cases", "Business Scenarios & Trade-offs", "Analytical Reasoning Decision Cases"],
      },
      {
        subject: "Quantitative Ability",
        topicCount: 4,
        topics: ["Advanced Geometry & Trigonometry", "Arithmetic & Commercial Math", "Functions & Inequalities", "Data Interpretation Sets"],
      },
      {
        subject: "Verbal Ability",
        topicCount: 3,
        topics: ["Poetry & Critical Reading Passages", "Vocabulary & Contextual Grammar", "Paragraph Completion"],
      },
    ],
    highlights: [
      "Signature Decision Making module",
      "Unattempted question penalty calibration",
      "Content rights and expert checks in progress",
    ],
  },
  {
    id: "snap",
    slug: "snap",
    name: "SNAP",
    fullName: "Symbiosis National Aptitude Test",
    category: "Management",
    region: "India / Symbiosis International",
    launchWave: "wave_1",
    waveLabel: "Wave 1 — Launch",
    readinessStatus: "in_preparation",
    contentAvailability: "Speed-drill Question Bank Under Verification",
    reviewStatus: "under_review",
    verifiedRights: true,
    status: "draft",
    shortDescription: "Speed-based entrance examination for MBA programs across 16 Symbiosis institutes including SIBM Pune.",
    overview: "SNAP is a 60-minute rapid-fire test evaluating General English, Analytical & Logical Reasoning, and Quantitative, Data Interpretation & Data Sufficiency.",
    annualAspirants: "~140,000 Aspirants",
    durationMinutes: 60,
    totalQuestions: 60,
    markingScheme: "+1 for correct answer, -0.25 for incorrect answer",
    eligibility: "Graduate with minimum 50% marks (45% for SC/ST).",
    targetRole: "MBA at SIBM Pune, SCMHRD, SIIB, SIBM Bengaluru",
    keyDateLabel: "Release Status",
    keyDateValue: "In Preparation (Wave 1)",
    sections: [
      { name: "General English (Reading & Verbal)", questions: 15, durationMinutes: 15, weightage: "25%" },
      { name: "Analytical & Logical Reasoning (A-LR)", questions: 25, durationMinutes: 25, weightage: "42%" },
      { name: "Quantitative, DI & DS", questions: 20, durationMinutes: 20, weightage: "33%" },
    ],
    syllabus: [
      {
        subject: "Reasoning & English",
        topicCount: 3,
        topics: ["Series, Coding-Decoding & Puzzles", "Critical Reasoning & Syllogisms", "Grammar & Idioms"],
      },
      {
        subject: "Quant & DI",
        topicCount: 2,
        topics: ["Speed Arithmetic & Percentages", "Data Tables & Pie Charts"],
      },
    ],
    highlights: [
      "Ultra fast 60 questions in 60 minutes",
      "No sectional time constraints",
      "Speed vs Accuracy analytics engine",
    ],
  },
  {
    id: "nmat",
    slug: "nmat",
    name: "NMAT",
    fullName: "NMAT by GMAC",
    category: "Management",
    region: "India & International / NMIMS",
    launchWave: "wave_1",
    waveLabel: "Wave 1 — Launch",
    readinessStatus: "in_preparation",
    contentAvailability: "Sectional Question Bank in Verification",
    reviewStatus: "under_review",
    verifiedRights: true,
    status: "draft",
    shortDescription: "Computer-delivered entrance exam owned by GMAC for admission into NMIMS and leading business schools.",
    overview: "NMAT provides candidates with multiple attempts and features sectional time limits with zero negative marking.",
    annualAspirants: "~90,000 Aspirants",
    durationMinutes: 120,
    totalQuestions: 108,
    markingScheme: "+3 for correct answer, 0 for incorrect answer (No negative marking)",
    eligibility: "Bachelor's degree with minimum 50% aggregate marks.",
    targetRole: "MBA at NMIMS Mumbai, K J Somaiya, XIMB (HR), SDA Bocconi Asia Center",
    keyDateLabel: "Release Status",
    keyDateValue: "In Preparation (Wave 1)",
    sections: [
      { name: "Language Skills", questions: 36, durationMinutes: 28, weightage: "33%" },
      { name: "Quantitative Skills", questions: 36, durationMinutes: 52, weightage: "34%" },
      { name: "Logical Reasoning", questions: 36, durationMinutes: 40, weightage: "33%" },
    ],
    syllabus: [
      {
        subject: "Quantitative Skills",
        topicCount: 3,
        topics: ["Arithmetic & Number Properties", "Algebra & Modern Math", "Data Interpretation & Data Sufficiency"],
      },
      {
        subject: "Logical Reasoning",
        topicCount: 2,
        topics: ["Critical Reasoning (Assumptions & Inferences)", "Deductive & Analytical Reasoning"],
      },
      {
        subject: "Language Skills",
        topicCount: 2,
        topics: ["Reading Comprehension", "Para Jumbles & Sentence Correction"],
      },
    ],
    highlights: [
      "No negative marking structure",
      "Section order choice option",
      "Scaled scoring calibration (12-120 per section)",
    ],
  },
  {
    id: "mat",
    slug: "mat",
    name: "MAT",
    fullName: "Management Aptitude Test",
    category: "Management",
    region: "India (600+ B-Schools)",
    launchWave: "wave_1",
    waveLabel: "Wave 1 — Launch",
    readinessStatus: "in_preparation",
    contentAvailability: "Diagnostic Module in Assembly",
    reviewStatus: "under_review",
    verifiedRights: true,
    status: "draft",
    shortDescription: "National-level entrance test conducted 4 times a year by AIMA for MBA/PGDM programs across India.",
    overview: "Conducted in CBT, PBT, and IBT modes. Assesses 5 diverse areas with equal 40 questions per section.",
    annualAspirants: "~110,000 Aspirants",
    durationMinutes: 150,
    totalQuestions: 200,
    markingScheme: "+1 for correct answer, -0.25 for incorrect answer",
    eligibility: "Graduates in any discipline. Final year students eligible.",
    targetRole: "MBA / PGDM across 600+ business schools",
    keyDateLabel: "Release Status",
    keyDateValue: "In Preparation (Wave 1)",
    sections: [
      { name: "Language Comprehension", questions: 40, durationMinutes: 30, weightage: "20%" },
      { name: "Mathematical Skills", questions: 40, durationMinutes: 40, weightage: "20%" },
      { name: "Data Analysis & Sufficiency", questions: 40, durationMinutes: 35, weightage: "20%" },
      { name: "Intelligence & Critical Reasoning", questions: 40, durationMinutes: 30, weightage: "20%" },
      { name: "Indian & Global Environment", questions: 40, durationMinutes: 15, weightage: "20%" },
    ],
    syllabus: [
      {
        subject: "Mathematical & Data Skills",
        topicCount: 2,
        topics: ["Arithmetic & Commercial Algebra", "Data Analysis & Charts"],
      },
      {
        subject: "Reasoning & Language",
        topicCount: 2,
        topics: ["Critical & Analogical Reasoning", "Grammar & Comprehension"],
      },
    ],
    highlights: [
      "Quarterly test frequency (Feb, May, Sep, Dec)",
      "Scores valid across hundreds of approved institutions",
      "Content validation in progress",
    ],
  },

  // ==========================================
  // WAVE 2 — NEXT (Global Management & Graduate)
  // GMAT, GRE, Executive Assessment
  // ==========================================
  {
    id: "gmat",
    slug: "gmat",
    name: "GMAT Focus",
    fullName: "Graduate Management Admission Test (Focus Edition)",
    category: "Graduate Admissions",
    region: "Global (110+ Countries)",
    launchWave: "wave_2",
    waveLabel: "Wave 2 — Next",
    readinessStatus: "in_preparation",
    contentAvailability: "Question Blueprinting & Psychometric Model Under Review",
    reviewStatus: "under_review",
    verifiedRights: true,
    status: "upcoming",
    shortDescription: "Tailored specifically for graduate business programs. Tests advanced reasoning and business analytics.",
    overview: "The GMAT Focus Edition is optimized for graduate business school admissions. It contains 3 equal sections: Quantitative Reasoning, Verbal Reasoning, and Data Insights, with Question Review & Edit capability.",
    annualAspirants: "~150,000 Test-Takers",
    durationMinutes: 135,
    totalQuestions: 64,
    markingScheme: "Item-level computer-adaptive (Total Score 205-805)",
    eligibility: "Minimum 18 years of age. Undergraduate degree recommended for admission.",
    targetRole: "Global MBA, Master in Finance, MiM programs (Stanford, Harvard, INSEAD, LBS)",
    keyDateLabel: "Release Status",
    keyDateValue: "Wave 2 (Next)",
    sections: [
      { name: "Quantitative Reasoning", questions: 21, durationMinutes: 45, weightage: "33%" },
      { name: "Verbal Reasoning", questions: 23, durationMinutes: 45, weightage: "33%" },
      { name: "Data Insights", questions: 20, durationMinutes: 45, weightage: "34%" },
    ],
    syllabus: [
      {
        subject: "Data Insights",
        topicCount: 3,
        topics: ["Data Sufficiency", "Multi-Source Reasoning & Table Analysis", "Two-Part Analysis & Graphics Interpretation"],
      },
      {
        subject: "Quantitative Reasoning",
        topicCount: 2,
        topics: ["Arithmetic & Number Properties", "Applied Algebra & Word Problems"],
      },
      {
        subject: "Verbal Reasoning",
        topicCount: 2,
        topics: ["Reading Comprehension", "Critical Reasoning (Strengthen, Weaken, Assumption)"],
      },
    ],
    highlights: [
      "Modern Focus Edition format with Data Insights",
      "Question Review and Edit option for up to 3 answers per section",
      "Rights-cleared original problem bank under development",
    ],
  },
  {
    id: "gre",
    slug: "gre",
    name: "GRE General",
    fullName: "Graduate Record Examination",
    category: "Graduate Admissions",
    region: "Global (160+ Countries)",
    launchWave: "wave_2",
    waveLabel: "Wave 2 — Next",
    readinessStatus: "in_preparation",
    contentAvailability: "Vocabulary & Quantitative Ladders in Development",
    reviewStatus: "under_review",
    verifiedRights: true,
    status: "upcoming",
    shortDescription: "The world's most widely accepted graduate admissions test for Master's, MBA, and PhD programs.",
    overview: "Conducted by ETS, the GRE General Test measures verbal reasoning, quantitative reasoning, critical thinking, and analytical writing skills.",
    annualAspirants: "~340,000 Global Test-Takers",
    durationMinutes: 118,
    totalQuestions: 54,
    markingScheme: "Section-adaptive scoring (Quant: 130-170, Verbal: 130-170, AWA: 0-6.0)",
    eligibility: "No minimum educational requirement; generally requires undergraduate degree for university admission.",
    targetRole: "MS, MBA, PhD across US, Canada, Europe, Singapore, UK",
    keyDateLabel: "Release Status",
    keyDateValue: "Wave 2 (Next)",
    sections: [
      { name: "Analytical Writing (Issue Task)", questions: 1, durationMinutes: 30, weightage: "0-6 Score" },
      { name: "Verbal Reasoning (2 Sections)", questions: 27, durationMinutes: 41, weightage: "130-170 Score" },
      { name: "Quantitative Reasoning (2 Sections)", questions: 27, durationMinutes: 47, weightage: "130-170 Score" },
    ],
    syllabus: [
      {
        subject: "Quantitative Reasoning",
        topicCount: 4,
        topics: ["Arithmetic & Number Theory", "Algebra & Functions", "Geometry & Coordinate Geometry", "Data Analysis (Statistics & Probability)"],
      },
      {
        subject: "Verbal Reasoning",
        topicCount: 3,
        topics: ["Reading Comprehension (Multi-paragraph analysis)", "Text Completion (1, 2 & 3 blanks)", "Sentence Equivalence"],
      },
    ],
    highlights: [
      "Shorter 1 hour 58 minute modern format",
      "Section-level adaptability",
      "Scheduled for Wave 2 release upon expert review completion",
    ],
  },
  {
    id: "executive-assessment",
    slug: "executive-assessment",
    name: "Executive Assessment",
    fullName: "Executive Assessment (EA by GMAC)",
    category: "Graduate Admissions",
    region: "Global / EMBA Programs",
    launchWave: "wave_2",
    waveLabel: "Wave 2 — Next",
    readinessStatus: "planned",
    contentAvailability: "Curriculum Mapping Scheduled",
    reviewStatus: "planned",
    verifiedRights: false,
    status: "upcoming",
    shortDescription: "Tailored assessment for seasoned professionals applying to Executive MBA and specialized master's programs.",
    overview: "Designed by GMAC to evaluate real-world workplace readiness with minimal prep time overhead. Contains Integrated Reasoning, Verbal, and Quantitative sections.",
    annualAspirants: "~25,000 Global Candidates",
    durationMinutes: 90,
    totalQuestions: 40,
    markingScheme: "Scaled score between 100 and 200",
    eligibility: "Typically 5+ years of professional work experience.",
    targetRole: "Executive MBA (Wharton, Columbia, Chicago Booth, INSEAD)",
    keyDateLabel: "Release Status",
    keyDateValue: "Wave 2 (Next)",
    sections: [
      { name: "Integrated Reasoning", questions: 12, durationMinutes: 30, weightage: "33%" },
      { name: "Verbal Reasoning", questions: 14, durationMinutes: 30, weightage: "33%" },
      { name: "Quantitative Reasoning", questions: 14, durationMinutes: 30, weightage: "34%" },
    ],
    syllabus: [
      {
        subject: "Core Modules",
        topicCount: 3,
        topics: ["Executive Data Interpretation", "Critical Reasoning Scenarios", "Practical Quantitative Logic"],
      },
    ],
    highlights: ["Compact 90-minute testing experience", "Designed for busy working executives", "Wave 2 roadmap milestone"],
  },

  // ==========================================
  // WAVE 3 — THEN (Undergraduate & Language)
  // SAT, IELTS, TOEFL, PTE
  // ==========================================
  {
    id: "sat",
    slug: "sat",
    name: "Digital SAT",
    fullName: "Scholastic Assessment Test",
    category: "Undergraduate Admissions",
    region: "Global (USA, Europe, Asia)",
    launchWave: "wave_3",
    waveLabel: "Wave 3 — Then",
    readinessStatus: "planned",
    contentAvailability: "Digital Adaptive Architecture Scheduled",
    reviewStatus: "planned",
    verifiedRights: false,
    status: "upcoming",
    shortDescription: "Standardized undergraduate admissions test used by universities in the United States and worldwide.",
    overview: "Administered digitally via College Board. Features two modules each of Reading and Writing, and Math.",
    annualAspirants: "~1,900,000 High School Seniors",
    durationMinutes: 134,
    totalQuestions: 98,
    markingScheme: "Scored 400 to 1600; rights-only scoring (no penalty for wrong answers)",
    eligibility: "High school students seeking undergraduate university admission.",
    targetRole: "Undergraduate (BSc, BA, BEng) admissions globally",
    keyDateLabel: "Release Status",
    keyDateValue: "Wave 3 (Then)",
    sections: [
      { name: "Reading and Writing (2 Modules)", questions: 54, durationMinutes: 64, weightage: "200-800 Score" },
      { name: "Math (2 Modules)", questions: 44, durationMinutes: 70, weightage: "200-800 Score" },
    ],
    syllabus: [
      {
        subject: "Reading & Writing",
        topicCount: 2,
        topics: ["Craft and Structure & Information and Ideas", "Standard English Conventions & Expression of Ideas"],
      },
      {
        subject: "Math",
        topicCount: 2,
        topics: ["Algebra & Advanced Math", "Problem-Solving & Data Analysis / Geometry"],
      },
    ],
    highlights: ["Stage-adaptive multi-stage testing", "Built-in Desmos graphing calculator support", "Wave 3 roadmap milestone"],
  },
  {
    id: "ielts",
    slug: "ielts",
    name: "IELTS",
    fullName: "International English Language Testing System",
    category: "Language Proficiency",
    region: "Global (140+ Countries)",
    launchWave: "wave_3",
    waveLabel: "Wave 3 — Then",
    readinessStatus: "planned",
    contentAvailability: "Reading & Listening Audio Bank Scheduled",
    reviewStatus: "planned",
    verifiedRights: false,
    status: "upcoming",
    shortDescription: "Premier English proficiency assessment for study, migration, and employment in English-speaking countries.",
    overview: "Assesses four skills: Listening, Reading, Writing, and Speaking with Academic and General Training formats.",
    annualAspirants: "~3,500,000 Global Test-Takers",
    durationMinutes: 165,
    totalQuestions: 80,
    markingScheme: "Band scores from 1.0 (Non-user) to 9.0 (Expert user)",
    eligibility: "Recommended minimum 16 years of age.",
    targetRole: "International university matriculation, visa, and professional license",
    keyDateLabel: "Release Status",
    keyDateValue: "Wave 3 (Then)",
    sections: [
      { name: "Listening", questions: 40, durationMinutes: 30, weightage: "Band 1-9" },
      { name: "Academic Reading", questions: 40, durationMinutes: 60, weightage: "Band 1-9" },
      { name: "Academic Writing", questions: 2, durationMinutes: 60, weightage: "Band 1-9" },
      { name: "Speaking Interview", questions: 3, durationMinutes: 14, weightage: "Band 1-9" },
    ],
    syllabus: [
      {
        subject: "English Language Skills",
        topicCount: 4,
        topics: ["Academic Reading Comprehension", "Listening for Specific Information", "Data Graph & Argumentative Essays", "Interactive Conversational Fluency"],
      },
    ],
    highlights: ["Accepted by over 12,000 organizations globally", "Standardized CEFR benchmark alignment", "Wave 3 roadmap milestone"],
  },
  {
    id: "toefl",
    slug: "toefl",
    name: "TOEFL iBT",
    fullName: "Test of English as a Foreign Language",
    category: "Language Proficiency",
    region: "Global (160+ Countries)",
    launchWave: "wave_3",
    waveLabel: "Wave 3 — Then",
    readinessStatus: "planned",
    contentAvailability: "Audio Analysis & Rubric Framework Scheduled",
    reviewStatus: "planned",
    verifiedRights: false,
    status: "upcoming",
    shortDescription: "Premier English test measuring university-level English communication skills across academic contexts.",
    overview: "Administered by ETS. Evaluates Reading, Listening, Speaking, and Writing in a streamlined 2-hour computer test.",
    annualAspirants: "~2,000,000 Test-Takers",
    durationMinutes: 120,
    totalQuestions: 56,
    markingScheme: "Scored 0 to 120 (0-30 per skill section)",
    eligibility: "Non-native English speakers applying for academic programs.",
    targetRole: "Admissions across US, UK, Australia, Canada, New Zealand",
    keyDateLabel: "Release Status",
    keyDateValue: "Wave 3 (Then)",
    sections: [
      { name: "Reading", questions: 20, durationMinutes: 35, weightage: "30 Marks" },
      { name: "Listening", questions: 28, durationMinutes: 36, weightage: "30 Marks" },
      { name: "Speaking", questions: 4, durationMinutes: 16, weightage: "30 Marks" },
      { name: "Writing for an Academic Discussion", questions: 2, durationMinutes: 29, weightage: "30 Marks" },
    ],
    syllabus: [
      {
        subject: "Academic English",
        topicCount: 2,
        topics: ["Lecture & Discussion Comprehension", "Academic Synthesis & Opinion Writing"],
      },
    ],
    highlights: ["Modern streamlined 2-hour format", "Independent and integrated task scoring", "Wave 3 roadmap milestone"],
  },
  {
    id: "pte",
    slug: "pte",
    name: "PTE Academic",
    fullName: "Pearson Test of English Academic",
    category: "Language Proficiency",
    region: "Global (Australia, UK, NZ, Canada)",
    launchWave: "wave_3",
    waveLabel: "Wave 3 — Then",
    readinessStatus: "planned",
    contentAvailability: "Computer Scored Item Bank Scheduled",
    reviewStatus: "planned",
    verifiedRights: false,
    status: "upcoming",
    shortDescription: "Fast, AI-scored English language proficiency test recognized globally for study and immigration.",
    overview: "Single 2-hour computer session covering Speaking & Writing, Reading, and Listening.",
    annualAspirants: "~1,200,000 Test-Takers",
    durationMinutes: 120,
    totalQuestions: 70,
    markingScheme: "Global Scale of English (Score 10 to 90)",
    eligibility: "Minimum 16 years of age.",
    targetRole: "Australian, Canadian, and UK visas and university applications",
    keyDateLabel: "Release Status",
    keyDateValue: "Wave 3 (Then)",
    sections: [
      { name: "Speaking & Writing", questions: 28, durationMinutes: 54, weightage: "Integrated" },
      { name: "Reading", questions: 18, durationMinutes: 30, weightage: "Integrated" },
      { name: "Listening", questions: 24, durationMinutes: 30, weightage: "Integrated" },
    ],
    syllabus: [
      {
        subject: "Integrated Communication",
        topicCount: 2,
        topics: ["Read Aloud, Repeat Sentence & Re-tell Lecture", "Summarize Written Text & Write Essay"],
      },
    ],
    highlights: ["Fast 48-hour typical result turnaround", "100% automated scoring framework", "Wave 3 roadmap milestone"],
  },

  // ==========================================
  // WAVE 4 — LATER (Specialized, PG & Technical)
  // GATE, JAM, CSIR-NET, NEET-PG, CLAT-PG, UGC NET
  // ==========================================
  {
    id: "gate-cs",
    slug: "gate-cs",
    name: "GATE CS",
    fullName: "Graduate Aptitude Test in Engineering (Computer Science)",
    category: "Engineering",
    region: "India (IITs & PSUs)",
    launchWave: "wave_4",
    waveLabel: "Wave 4 — Later",
    readinessStatus: "planned",
    contentAvailability: "Technical Syllabus Scoping in Progress",
    reviewStatus: "planned",
    verifiedRights: false,
    status: "draft",
    shortDescription: "National gateway exam for master’s degrees (M.Tech/MS) and PSU recruitment in computer science.",
    overview: "Conducted jointly by IISc and IITs. Covers discrete mathematics, algorithms, computer architecture, systems, and networks.",
    annualAspirants: "~140,000 Engineering Graduates",
    durationMinutes: 180,
    totalQuestions: 65,
    markingScheme: "+1 or +2 for correct; 1/3 negative marking for MCQs; no negative for MSQ and NAT",
    eligibility: "Undergraduate degree in Engineering/Technology or Master's in Science/Computer Applications.",
    targetRole: "M.Tech / PhD at IITs, IISc; Direct recruitment at IOCL, ONGC, NTPC, ISRO",
    keyDateLabel: "Release Status",
    keyDateValue: "Wave 4 (Later)",
    sections: [
      { name: "General Aptitude", questions: 10, durationMinutes: 30, weightage: "15 Marks" },
      { name: "Engineering Mathematics", questions: 10, durationMinutes: 30, weightage: "13 Marks" },
      { name: "Computer Science Core", questions: 45, durationMinutes: 120, weightage: "72 Marks" },
    ],
    syllabus: [
      {
        subject: "Core Computer Science",
        topicCount: 4,
        topics: ["Data Structures & Algorithms", "Operating Systems & Computer Networks", "Database Management Systems", "Theory of Computation & Compiler Design"],
      },
    ],
    highlights: ["Multiple Select Questions (MSQ) support", "Numerical Answer Type (NAT) input", "Wave 4 roadmap milestone"],
  },
  {
    id: "jam",
    slug: "jam",
    name: "IIT JAM",
    fullName: "Joint Admission Test for Masters",
    category: "Research & Postgraduate",
    region: "India (IITs & IISc)",
    launchWave: "wave_4",
    waveLabel: "Wave 4 — Later",
    readinessStatus: "planned",
    contentAvailability: "Syllabus Indexing Scheduled",
    reviewStatus: "planned",
    verifiedRights: false,
    status: "upcoming",
    shortDescription: "Gateway examination for admission to M.Sc., Joint M.Sc.-Ph.D. programs at IITs and IISc.",
    overview: "Conducted for science graduates in Biotechnology, Chemistry, Economics, Geology, Mathematics, Mathematical Statistics, and Physics.",
    annualAspirants: "~80,000 Science Graduates",
    durationMinutes: 180,
    totalQuestions: 60,
    markingScheme: "Section A: MCQs with negative marking; Section B: MSQs; Section C: NAT without negative",
    eligibility: "Undergraduate degree in Science or equivalent.",
    targetRole: "M.Sc. and Integrated Ph.D. at premier research institutions",
    keyDateLabel: "Release Status",
    keyDateValue: "Wave 4 (Later)",
    sections: [
      { name: "Section A (MCQ)", questions: 30, durationMinutes: 90, weightage: "50 Marks" },
      { name: "Section B (MSQ)", questions: 10, durationMinutes: 45, weightage: "20 Marks" },
      { name: "Section C (NAT)", questions: 20, durationMinutes: 45, weightage: "30 Marks" },
    ],
    syllabus: [
      {
        subject: "Pure & Applied Mathematics",
        topicCount: 2,
        topics: ["Real Analysis & Linear Algebra", "Differential Equations & Vector Calculus"],
      },
    ],
    highlights: ["Rigorous fundamental science evaluation", "Three question formats (MCQ, MSQ, NAT)", "Wave 4 roadmap milestone"],
  },
  {
    id: "csir-net",
    slug: "csir-net",
    name: "CSIR-NET",
    fullName: "Council of Scientific and Industrial Research National Eligibility Test",
    category: "Research & Postgraduate",
    region: "India (Science Faculties)",
    launchWave: "wave_4",
    waveLabel: "Wave 4 — Later",
    readinessStatus: "planned",
    contentAvailability: "Curriculum Indexing Scheduled",
    reviewStatus: "planned",
    verifiedRights: false,
    status: "upcoming",
    shortDescription: "Eligibility exam for Junior Research Fellowship (JRF) and Assistant Professorship across Indian universities.",
    overview: "Conducted by NTA in Chemical, Earth, Life, Mathematical, and Physical Sciences.",
    annualAspirants: "~180,000 Postgraduates",
    durationMinutes: 180,
    totalQuestions: 120,
    markingScheme: "Section-specific scoring (+2 or +4 with 25% negative marking)",
    eligibility: "M.Sc. or equivalent degree with minimum 55% marks.",
    targetRole: "Junior Research Fellow / Assistant Professor",
    keyDateLabel: "Release Status",
    keyDateValue: "Wave 4 (Later)",
    sections: [
      { name: "Part A (General Science & Quantitative)", questions: 20, durationMinutes: 30, weightage: "30 Marks" },
      { name: "Part B (Subject Concept MCQs)", questions: 40, durationMinutes: 60, weightage: "70 Marks" },
      { name: "Part C (Higher Scientific Analytical)", questions: 60, durationMinutes: 90, weightage: "100 Marks" },
    ],
    syllabus: [
      {
        subject: "Mathematical Sciences",
        topicCount: 2,
        topics: ["Real Analysis & Complex Variables", "Linear Algebra & Probability Theory"],
      },
    ],
    highlights: ["Choice-based answering (e.g. attempt 20 of 30)", "Academic JRF certification standard", "Wave 4 roadmap milestone"],
  },
  {
    id: "neet-pg",
    slug: "neet-pg",
    name: "NEET-PG",
    fullName: "National Eligibility cum Entrance Test for Postgraduates",
    category: "Medical & Healthcare",
    region: "India (Medical Colleges)",
    launchWave: "wave_4",
    waveLabel: "Wave 4 — Later",
    readinessStatus: "planned",
    contentAvailability: "Clinical Item Review Framework Scheduled",
    reviewStatus: "planned",
    verifiedRights: false,
    status: "upcoming",
    shortDescription: "National entrance exam for admission to MD, MS, and PG Diploma medical courses across India.",
    overview: "Conducted by the National Board of Examinations (NBE). Tests clinical, pre-clinical, and para-clinical knowledge.",
    annualAspirants: "~210,000 MBBS Doctors",
    durationMinutes: 210,
    totalQuestions: 200,
    markingScheme: "+4 for correct answer, -1 for incorrect answer",
    eligibility: "MBBS degree or provisional MBBS pass certificate with 1-year completed internship.",
    targetRole: "MD / MS Residency programs nationwide",
    keyDateLabel: "Release Status",
    keyDateValue: "Wave 4 (Later)",
    sections: [
      { name: "Clinical & Pre-Clinical Medicine", questions: 200, durationMinutes: 210, weightage: "800 Marks" },
    ],
    syllabus: [
      {
        subject: "Medical Sciences",
        topicCount: 3,
        topics: ["General Medicine & Surgery", "Obstetrics & Gynaecology / Paediatrics", "Pathology, Pharmacology & Microbiology"],
      },
    ],
    highlights: ["Clinical vignette problem orientation", "Single window PG medical entrance", "Wave 4 roadmap milestone"],
  },
  {
    id: "clat-pg",
    slug: "clat-pg",
    name: "CLAT-PG",
    fullName: "Common Law Admission Test for Postgraduates",
    category: "Law",
    region: "India (NLUs)",
    launchWave: "wave_4",
    waveLabel: "Wave 4 — Later",
    readinessStatus: "planned",
    contentAvailability: "Constitutional Extraction Scheduled",
    reviewStatus: "planned",
    verifiedRights: false,
    status: "draft",
    shortDescription: "National entrance test for admission to LL.M. degree programmes at 24 National Law Universities.",
    overview: "Organized by the Consortium of National Law Universities. Evaluates deep comprehension of mandatory undergraduate law subjects with emphasis on constitutional law and jurisprudence.",
    annualAspirants: "~75,000 Law Graduates",
    durationMinutes: 120,
    totalQuestions: 120,
    markingScheme: "+1 for correct, -0.25 for incorrect",
    eligibility: "LL.B. Degree or equivalent with minimum 50% marks (45% for SC/ST).",
    targetRole: "LL.M. at NLSIU Bangalore, NALSAR Hyderabad, WBNUJS Kolkata",
    keyDateLabel: "Release Status",
    keyDateValue: "Wave 4 (Later)",
    sections: [
      { name: "Constitutional Law & Jurisprudence", questions: 60, durationMinutes: 60, weightage: "50%" },
      { name: "Other Law Subjects (Torts, Contracts, Crimes, IPR)", questions: 60, durationMinutes: 60, weightage: "50%" },
    ],
    syllabus: [
      {
        subject: "Core Law",
        topicCount: 2,
        topics: ["Constitutional Law & Landmark Judgments", "Jurisprudence & Legal Theory"],
      },
    ],
    highlights: ["Passage-based objective extract format", "Reading-intensive judicial reasoning", "Wave 4 roadmap milestone"],
  },
  {
    id: "ugc-net",
    slug: "ugc-net",
    name: "UGC NET",
    fullName: "University Grants Commission National Eligibility Test",
    category: "Research & Postgraduate",
    region: "India (Humanities & Commerce)",
    launchWave: "wave_4",
    waveLabel: "Wave 4 — Later",
    readinessStatus: "planned",
    contentAvailability: "Teaching Aptitude Module Scheduled",
    reviewStatus: "planned",
    verifiedRights: false,
    status: "upcoming",
    shortDescription: "Determines eligibility of Indian nationals for 'Assistant Professor' and 'Junior Research Fellowship' in universities.",
    overview: "Conducted in 83 subjects across humanities, commerce, and social sciences.",
    annualAspirants: "~900,000 Postgraduates",
    durationMinutes: 180,
    totalQuestions: 150,
    markingScheme: "+2 for correct answer, 0 for incorrect (No negative marking)",
    eligibility: "Master's degree with minimum 55% marks (50% for reserved categories).",
    targetRole: "Assistant Professor / JRF across Indian Universities",
    keyDateLabel: "Release Status",
    keyDateValue: "Wave 4 (Later)",
    sections: [
      { name: "Paper I (Teaching & Research Aptitude)", questions: 50, durationMinutes: 60, weightage: "100 Marks" },
      { name: "Paper II (Subject Domain Specialization)", questions: 100, durationMinutes: 120, weightage: "200 Marks" },
    ],
    syllabus: [
      {
        subject: "Paper I Core",
        topicCount: 2,
        topics: ["Teaching & Research Aptitude", "Higher Education System & Governance"],
      },
    ],
    highlights: ["Zero negative marking structure", "National benchmark for university faculty", "Wave 4 roadmap milestone"],
  },
];

export const EXAMS = EXAMS_DATA;
