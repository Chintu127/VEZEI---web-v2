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
    | "Research & Postgraduate"
    | "Professional";
  region: string;
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
  {
    id: "cat",
    slug: "cat",
    name: "CAT",
    fullName: "Common Admission Test",
    category: "Management",
    region: "India / Top B-Schools",
    status: "verified",
    shortDescription: "Premier national exam for admission into 21 Indian Institutes of Management (IIMs) and top business schools.",
    overview: "The Common Admission Test (CAT) is a computer-based test conducted for admission to postgraduate business management programs. It evaluates Quantitative Aptitude, Data Interpretation & Logical Reasoning, and Verbal Ability & Reading Comprehension with rigorous percentile benchmarks.",
    annualAspirants: "~330,000 Aspirants",
    durationMinutes: 120,
    totalQuestions: 66,
    markingScheme: "+3 for correct answer, -1 for incorrect MCQ, 0 for Non-MCQ (TITA)",
    eligibility: "Bachelor's degree with at least 50% marks or equivalent CGPA (45% for reserved categories). Final year students are eligible.",
    targetRole: "MBA / PGDM at IIMs, FMS, SPJIMR, MDI, IIT DoMS",
    keyDateLabel: "Exam Date",
    keyDateValue: "Late November (Annual)",
    sections: [
      { name: "Verbal Ability & Reading Comprehension (VARC)", questions: 24, durationMinutes: 40, weightage: "36%" },
      { name: "Data Interpretation & Logical Reasoning (DILR)", questions: 20, durationMinutes: 40, weightage: "30%" },
      { name: "Quantitative Aptitude (QA)", questions: 22, durationMinutes: 40, weightage: "34%" },
    ],
    syllabus: [
      {
        subject: "Quantitative Aptitude",
        topicCount: 5,
        topics: ["Arithmetic (Percentages, Profit & Loss, Ratio)", "Algebra (Quadratic Equations, Logs, Sequences)", "Geometry & Mensuration", "Modern Math (Permutations, Probability)", "Number Systems"],
      },
      {
        subject: "DILR",
        topicCount: 4,
        topics: ["Arrangements & Puzzles", "Matrix & Grids", "Tables & Bar Charts", "Games & Tournaments / Network Diagrams"],
      },
      {
        subject: "VARC",
        topicCount: 3,
        topics: ["Reading Comprehension (Philosophy, Economics, Science)", "Para Jumbles & Out of Context", "Para Summary & Completion"],
      },
    ],
    highlights: ["Official sectional time limits (40 mins each)", "Non-MCQ / TITA type questions without negative marking", "Percentile-based ranking across 3 slots"],
  },
  {
    id: "gre",
    slug: "gre",
    name: "GRE General",
    fullName: "Graduate Record Examination",
    category: "Graduate Admissions",
    region: "Global (160+ Countries)",
    status: "verified",
    shortDescription: "The world's most widely accepted graduate admissions test for Master's, MBA, and PhD programs.",
    overview: "Conducted by ETS, the GRE General Test measures verbal reasoning, quantitative reasoning, critical thinking, and analytical writing skills. Accepted by thousands of graduate and business schools worldwide.",
    annualAspirants: "~340,000 Global Test-Takers",
    durationMinutes: 118,
    totalQuestions: 54,
    markingScheme: "Section-adaptive scoring (Quant: 130-170, Verbal: 130-170, AWA: 0-6.0)",
    eligibility: "No minimum educational requirement; generally requires undergraduate degree for university admission.",
    targetRole: "MS, MBA, PhD across US, Canada, Europe, Singapore, UK",
    keyDateLabel: "Test Window",
    keyDateValue: "Year-round computer-delivered",
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
      {
        subject: "Analytical Writing",
        topicCount: 1,
        topics: ["Analyze an Issue Task (Clarity, Logic, Coherence)"],
      },
    ],
    highlights: ["Shorter 1 hour 58 minute modern format", "Section-level adaptability", "ScoreSelect option to report your best scores"],
  },
  {
    id: "gmat",
    slug: "gmat",
    name: "GMAT Focus",
    fullName: "Graduate Management Admission Test (Focus Edition)",
    category: "Management",
    region: "Global (110+ Countries)",
    status: "verified",
    shortDescription: "Tailored specifically for graduate business programs. Tests advanced reasoning and business analytics.",
    overview: "The GMAT Focus Edition is optimized for graduate business school admissions. It contains 3 equal sections: Quantitative Reasoning, Verbal Reasoning, and Data Insights, with Question Review & Edit capability.",
    annualAspirants: "~150,000 Test-Takers",
    durationMinutes: 135,
    totalQuestions: 64,
    markingScheme: "Item-level computer-adaptive (Total Score 205-805)",
    eligibility: "Minimum 18 years of age (or 13-17 with parental consent). No formal prerequisite degree required to sit for the exam.",
    targetRole: "Global MBA, Master in Finance, MiM programs (Stanford, Harvard, INSEAD, LBS)",
    keyDateLabel: "Test Window",
    keyDateValue: "On-demand throughout the year",
    sections: [
      { name: "Quantitative Reasoning", questions: 21, durationMinutes: 45, weightage: "60-90 Scale" },
      { name: "Verbal Reasoning", questions: 23, durationMinutes: 45, weightage: "60-90 Scale" },
      { name: "Data Insights", questions: 20, durationMinutes: 45, weightage: "60-90 Scale" },
    ],
    syllabus: [
      {
        subject: "Quantitative Reasoning",
        topicCount: 2,
        topics: ["Problem Solving (Arithmetic, Ratios, Rates, Algebra)", "No Geometry in Focus Edition"],
      },
      {
        subject: "Verbal Reasoning",
        topicCount: 2,
        topics: ["Critical Reasoning (Assumptions, Strengthen, Weaken)", "Reading Comprehension"],
      },
      {
        subject: "Data Insights",
        topicCount: 4,
        topics: ["Data Sufficiency", "Multi-Source Reasoning", "Table Analysis", "Graphics Interpretation"],
      },
    ],
    highlights: ["Item-adaptive algorithm", "Select your own section order", "Bookmark and change up to 3 answers per section"],
  },
  {
    id: "gate",
    slug: "gate",
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    category: "Engineering",
    region: "India / International",
    status: "published",
    shortDescription: "Comprehensive test for M.Tech admissions at IISc/IITs and PSU recruitment across 30 engineering disciplines.",
    overview: "GATE tests comprehensive understanding of various undergraduate subjects in engineering, technology, architecture, and science. Jointly administered by IISc and 7 IITs.",
    annualAspirants: "~680,000 Candidates",
    durationMinutes: 180,
    totalQuestions: 65,
    markingScheme: "+1 or +2 for correct. Negative 1/3 or 2/3 for MCQs. No negative marking for MSQ and NAT.",
    eligibility: "Currently studying in 3rd or higher year of undergraduate degree in Engineering/Tech or Master's in Science.",
    targetRole: "M.Tech/PhD at IITs/IISc, PSU Executive Engineer (ONGC, IOCL, NTPC, BHEL)",
    keyDateLabel: "Exam Date",
    keyDateValue: "First two weekends of February",
    sections: [
      { name: "General Aptitude (GA)", questions: 10, durationMinutes: 25, weightage: "15 Marks" },
      { name: "Engineering Mathematics", questions: 10, durationMinutes: 35, weightage: "13 Marks" },
      { name: "Subject Specific Core", questions: 45, durationMinutes: 120, weightage: "72 Marks" },
    ],
    syllabus: [
      {
        subject: "Core Engineering",
        topicCount: 5,
        topics: ["Algorithms & Data Structures", "Computer Networks & OS", "Database Systems", "Theory of Computation", "Compiler Design & Digital Logic"],
      },
      {
        subject: "Engineering Mathematics",
        topicCount: 4,
        topics: ["Discrete Mathematics", "Linear Algebra", "Calculus & Probability", "Differential Equations"],
      },
      {
        subject: "General Aptitude",
        topicCount: 2,
        topics: ["Verbal Ability", "Numerical Reasoning"],
      },
    ],
    highlights: ["Includes NAT (Numerical Answer Type) questions", "MSQ (Multiple Select Questions) with no partial credit", "Scores valid for 3 full academic years"],
  },
  {
    id: "sat",
    slug: "sat",
    name: "Digital SAT",
    fullName: "Scholastic Assessment Test",
    category: "Undergraduate Admissions",
    region: "Global (Undergraduate)",
    status: "verified",
    shortDescription: "Standardized entrance test used by US and global colleges for undergraduate admissions.",
    overview: "Administered by College Board, the Digital SAT measures literacy, numeracy, and writing skills needed for college-level coursework. Delivered via the Bluebook application.",
    annualAspirants: "~1,900,000 Global Students",
    durationMinutes: 134,
    totalQuestions: 98,
    markingScheme: "No negative marking. Scored on a 400-1600 scale.",
    eligibility: "High school students (typically Grade 11 or 12). No age limit.",
    targetRole: "Undergraduate admissions at Ivy League, US universities, top international programs",
    keyDateLabel: "Test Window",
    keyDateValue: "7 global test dates annually",
    sections: [
      { name: "Reading and Writing (2 Modules)", questions: 54, durationMinutes: 64, weightage: "200-800 Scale" },
      { name: "Math (2 Modules)", questions: 44, durationMinutes: 70, weightage: "200-800 Scale" },
    ],
    syllabus: [
      {
        subject: "Reading & Writing",
        topicCount: 4,
        topics: ["Information and Ideas", "Craft and Structure", "Expression of Ideas", "Standard English Conventions"],
      },
      {
        subject: "Math",
        topicCount: 4,
        topics: ["Algebra (Linear equations & systems)", "Advanced Math (Non-linear & polynomials)", "Problem Solving & Data Analysis", "Geometry and Trigonometry"],
      },
    ],
    highlights: ["Multistage adaptive testing per section", "Built-in Desmos graphing calculator permitted for entire Math section", "Short passages with single question focus"],
  },
  {
    id: "ielts",
    slug: "ielts",
    name: "IELTS Academic",
    fullName: "International English Language Testing System",
    category: "Language Proficiency",
    region: "Global (140+ Countries)",
    status: "published",
    shortDescription: "The world's leading high-stakes English proficiency test for higher education and global migration.",
    overview: "Jointly owned by the British Council, IDP, and Cambridge English. Tests four communicative language competencies: Listening, Reading, Writing, and Speaking.",
    annualAspirants: "~3,500,000 Global Candidates",
    durationMinutes: 165,
    totalQuestions: 80,
    markingScheme: "Band score system from 1.0 (Non-user) to 9.0 (Expert user)",
    eligibility: "Open to individuals 16+ years looking to study or relocate to English-speaking regions.",
    targetRole: "University admissions & visas in UK, Canada, Australia, NZ, USA",
    keyDateLabel: "Test Frequency",
    keyDateValue: "Multiple test dates each week",
    sections: [
      { name: "Listening (4 Recordings)", questions: 40, durationMinutes: 30, weightage: "Band 1-9" },
      { name: "Reading (3 Academic Passages)", questions: 40, durationMinutes: 60, weightage: "Band 1-9" },
      { name: "Writing (Task 1 & Task 2)", questions: 2, durationMinutes: 60, weightage: "Band 1-9" },
      { name: "Speaking (Face-to-face / Video)", questions: 3, durationMinutes: 14, weightage: "Band 1-9" },
    ],
    syllabus: [
      {
        subject: "Listening & Reading",
        topicCount: 2,
        topics: ["Academic lectures and conversational comprehension", "Complex argumentation, inference, and vocabulary in context"],
      },
      {
        subject: "Writing & Speaking",
        topicCount: 2,
        topics: ["Data report synthesis & structured essay argumentation", "Fluency, lexical resource, grammatical accuracy & pronunciation"],
      },
    ],
    highlights: ["Human or computer delivery formats", "Band scale universally benchmarked to CEFR", "Speaking component with human examiner"],
  },
  {
    id: "xat",
    slug: "xat",
    name: "XAT",
    fullName: "Xavier Aptitude Test",
    category: "Management",
    region: "India / XLRI & 160+ Institutes",
    status: "published",
    shortDescription: "Prestigious national test by XLRI Jamshedpur known for its distinctive Decision Making section.",
    overview: "XAT is conducted for admission to management programs at XLRI and over 160 top business schools. It tests Decision Making, Verbal & Logical Ability, Quantitative Ability & Data Interpretation, and General Knowledge.",
    annualAspirants: "~135,000 Aspirants",
    durationMinutes: 210,
    totalQuestions: 95,
    markingScheme: "+1 for correct, -0.25 for incorrect, -0.10 for unattempted questions beyond 8.",
    eligibility: "Recognized Bachelor's degree of minimum 3 years duration in any discipline.",
    targetRole: "BM / HRM programs at XLRI Jamshedpur, XIMB, IMT, TAPMI, GIM",
    keyDateLabel: "Exam Date",
    keyDateValue: "First Sunday of January (Annual)",
    sections: [
      { name: "Verbal & Logical Ability (VALA)", questions: 26, durationMinutes: 55, weightage: "Core Percentile" },
      { name: "Decision Making (DM)", questions: 22, durationMinutes: 50, weightage: "Core Percentile" },
      { name: "Quantitative Ability & DI (QADI)", questions: 28, durationMinutes: 65, weightage: "Core Percentile" },
      { name: "General Knowledge & Essay", questions: 25, durationMinutes: 40, weightage: "Non-Percentile" },
    ],
    syllabus: [
      {
        subject: "Decision Making",
        topicCount: 3,
        topics: ["Managerial Ethics & Dilemmas", "Business Situation Analysis", "Analytical Logic Cases"],
      },
      {
        subject: "Quant & DI",
        topicCount: 3,
        topics: ["Higher Arithmetic & Functions", "Geometry & Trigonometry", "Complex DI Caselets"],
      },
      {
        subject: "VALA",
        topicCount: 2,
        topics: ["Poem Comprehension & Critical Reasoning", "Reading Comprehension & Vocabulary"],
      },
    ],
    highlights: ["Unique Decision Making section assessing ethical leadership", "Negative marking for excessive unattempted questions", "Combined objective + essay writing format"],
  },
  {
    id: "neet-pg",
    slug: "neet-pg",
    name: "NEET-PG",
    fullName: "National Eligibility cum Entrance Test for Postgraduate",
    category: "Medical & Healthcare",
    region: "India (MD/MS/Diploma)",
    status: "draft",
    shortDescription: "Single qualifying cum ranking examination for admission into MD, MS, and PG Diploma courses across India.",
    overview: "Conducted by the National Board of Examinations in Medical Sciences (NBEMS). Evaluates candidate competency across Pre-clinical, Para-clinical, and Clinical medical subjects.",
    annualAspirants: "~220,000 Medical Graduates",
    durationMinutes: 210,
    totalQuestions: 200,
    markingScheme: "+4 for correct, -1 for incorrect, 0 for unattempted.",
    eligibility: "MBBS degree or recognized provisional pass certificate and completed compulsory rotating internship.",
    targetRole: "Postgraduate Medical Residency (MD / MS) across AIIMS, PGIMER, State Medical Colleges",
    keyDateLabel: "Status Notice",
    keyDateValue: "Syllabus mapping in review",
    sections: [
      { name: "Pre-Clinical Subjects", questions: 50, durationMinutes: 50, weightage: "25%" },
      { name: "Para-Clinical Subjects", questions: 50, durationMinutes: 50, weightage: "25%" },
      { name: "Clinical Subjects", questions: 100, durationMinutes: 110, weightage: "50%" },
    ],
    syllabus: [
      {
        subject: "Medical Sciences",
        topicCount: 3,
        topics: ["Anatomy, Physiology & Biochemistry", "Pathology, Pharmacology & Microbiology", "General Medicine, Surgery, OBGY & Pediatrics"],
      },
    ],
    highlights: ["High-stakes clinical vignette questions", "Time-bound sectional sub-tests", "Official content verification ongoing"],
  },
  {
    id: "clat-pg",
    slug: "clat-pg",
    name: "CLAT-PG",
    fullName: "Common Law Admission Test for Postgraduates",
    category: "Law",
    region: "India (NLUs)",
    status: "draft",
    shortDescription: "National entrance test for admission to LL.M. degree programmes at 24 National Law Universities.",
    overview: "Organized by the Consortium of National Law Universities. Evaluates deep comprehension of mandatory undergraduate law subjects with emphasis on constitutional law and jurisprudence.",
    annualAspirants: "~75,000 Law Graduates",
    durationMinutes: 120,
    totalQuestions: 120,
    markingScheme: "+1 for correct, -0.25 for incorrect.",
    eligibility: "LL.B. Degree or equivalent with minimum 50% marks (45% for SC/ST).",
    targetRole: "LL.M. at NLSIU Bangalore, NALSAR Hyderabad, WBNUJS Kolkata",
    keyDateLabel: "Status Notice",
    keyDateValue: "Question bank in draft validation",
    sections: [
      { name: "Constitutional Law & Jurisprudence", questions: 60, durationMinutes: 60, weightage: "50%" },
      { name: "Other Law Subjects (Torts, Contracts, Crimes, IPR)", questions: 60, durationMinutes: 60, weightage: "50%" },
    ],
    syllabus: [
      {
        subject: "Core Law",
        topicCount: 3,
        topics: ["Constitutional Law & Landmark Judgments", "Jurisprudence & Legal Theory", "International Law & Law of Contracts"],
      },
    ],
    highlights: ["Passage-based objective format", "Reading-intensive judicial extract analysis", "Verification in progress"],
  },
  {
    id: "csir-net",
    slug: "csir-net",
    name: "CSIR-UGC NET",
    fullName: "Council of Scientific and Industrial Research National Eligibility Test",
    category: "Research & Postgraduate",
    region: "India (Science Faculties)",
    status: "upcoming",
    shortDescription: "Eligibility exam for Junior Research Fellowship (JRF) and Lectureship / Assistant Professorship in Indian Universities.",
    overview: "Conducted by NTA in Chemical Sciences, Earth Sciences, Life Sciences, Mathematical Sciences, and Physical Sciences.",
    annualAspirants: "~180,000 Postgraduates",
    durationMinutes: 180,
    totalQuestions: 120,
    markingScheme: "Section-specific scoring (+2 or +4 with 25% negative marking)",
    eligibility: "M.Sc. or equivalent degree with minimum 55% marks.",
    targetRole: "Junior Research Fellow / Assistant Professor",
    keyDateLabel: "Roadmap Status",
    keyDateValue: "Curriculum indexing scheduled",
    sections: [
      { name: "Part A (General Science & Quantitative)", questions: 20, durationMinutes: 30, weightage: "30 Marks" },
      { name: "Part B (Subject Concept MCQs)", questions: 40, durationMinutes: 60, weightage: "70 Marks" },
      { name: "Part C (Higher Scientific Analytical Questions)", questions: 60, durationMinutes: 90, weightage: "100 Marks" },
    ],
    syllabus: [
      {
        subject: "Mathematical & Physical Sciences",
        topicCount: 2,
        topics: ["Real Analysis, Linear Algebra, Complex Analysis", "Quantum Mechanics, Classical Dynamics, Electrodynamics"],
      },
    ],
    highlights: ["Choice-based answering (e.g. attempt 20 out of 30)", "Rigorous scientific research orientation", "Launching Q3"],
  },
];

export const EXAMS = EXAMS_DATA;
