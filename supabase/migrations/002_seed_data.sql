-- VEZEI Seed Data: Exams, Subjects, Topics, Lessons, Questions, Quests, Achievements

-- 1. Exams
INSERT INTO public.exams (id, slug, name, full_name, category, region, description, overview, duration_minutes, total_questions, marking_scheme, content_status)
VALUES
('cat', 'cat', 'CAT', 'Common Admission Test', 'Management', 'India', 'Premier entrance exam for IIMs and top business schools in India.', 'Computer-based test assessing Quantitative Aptitude, Data Interpretation & Logical Reasoning, and Verbal Ability & Reading Comprehension.', 120, 66, '+3 for correct, -1 for incorrect MCQs, 0 for Non-MCQs (TITA)', 'published'),
('gate-cs', 'gate-cs', 'GATE CS', 'Graduate Aptitude Test in Engineering (Computer Science)', 'Engineering', 'India', 'National gateway exam for master’s degrees and PSU recruitment in computer science.', 'Comprehensive examination covering discrete mathematics, programming, algorithms, operating systems, and computer networks.', 180, 65, '+1 or +2 for correct; 1/3 negative marking for MCQs; no negative marking for MSQ and NAT', 'published'),
('gmat', 'gmat', 'GMAT', 'Graduate Management Admission Test (Focus Edition)', 'Graduate Admissions', 'Global', 'Standardized computer-adaptive test required by top global business schools.', 'Consists of three 45-minute sections: Quantitative Reasoning, Verbal Reasoning, and Data Insights.', 135, 64, 'Item-Response Theory based adaptive scoring from 205 to 805', 'published'),
('gre', 'gre', 'GRE', 'Graduate Record Examinations', 'Graduate Admissions', 'Global', 'Global test for admission into graduate and business school programs worldwide.', 'Shorter test format measuring Analytical Writing, Verbal Reasoning, and Quantitative Reasoning.', 118, 54, 'Scaled score between 130–170 per section; no negative marking', 'published'),
('jee-adv', 'jee-adv', 'JEE Advanced', 'Joint Entrance Examination Advanced', 'Engineering', 'India', 'Entrance exam for the prestigious Indian Institutes of Technology (IITs).', 'Two compulsory 3-hour papers covering Physics, Chemistry, and Mathematics with variable multi-marking schemes.', 360, 108, 'Partial marking, single choice, multiple choice, and numerical values', 'published'),
('neet-ug', 'neet-ug', 'NEET UG', 'National Eligibility cum Entrance Test', 'Medical & Healthcare', 'India', 'All-India pre-medical entrance exam for MBBS and BDS admissions.', 'Pen-paper / computer test covering Physics, Chemistry, and Biology (Botany & Zoology).', 200, 200, '+4 for correct, -1 for incorrect', 'published'),
('sat', 'sat', 'Digital SAT', 'Scholastic Assessment Test', 'Undergraduate Admissions', 'Global', 'Standardized test widely used for college admissions in the United States and globally.', 'Digital adaptive test consisting of Reading & Writing and Math modules.', 134, 98, 'Scored 400 to 1600; rights-only scoring (no penalty for wrong answers)', 'published'),
('ielts', 'ielts', 'IELTS', 'International English Language Testing System', 'Language Proficiency', 'Global', 'World’s most popular English language proficiency test for global education and migration.', 'Assesses Listening, Reading, Writing, and Speaking skills.', 165, 80, 'Band scores from 1.0 to 9.0', 'published')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 2. Quests
INSERT INTO public.study_quests (id, title, description, category, target_count, xp_reward, icon)
VALUES
('daily-sprint', 'Daily Practice Sprint', 'Complete 10 practice questions today', 'daily', 10, 50, 'Zap'),
('accuracy-master', 'Sharpshooter Ace', 'Achieve 80% or higher accuracy in a practice session', 'daily', 1, 60, 'Target'),
('deep-focus', 'Deep Study Session', 'Complete at least 30 minutes of focused practice', 'daily', 30, 40, 'Clock'),
('mistake-crusher', 'Mistake Notebook Revision', 'Review and resolve 3 questions in your mistake notebook', 'daily', 3, 50, 'BookOpen'),
('weekly-champion', 'Weekly Powerhouse', 'Complete 5 practice sessions this week', 'weekly', 5, 200, 'Award')
ON CONFLICT (id) DO NOTHING;

-- 3. Achievements
INSERT INTO public.achievements (id, slug, title, description, icon, category, rarity, xp_reward)
VALUES
('first-step', 'first-step', 'First Step Forward', 'Complete your first practice session on VEZEI', 'Footprints', 'practice', 'common', 50),
('streak-3', 'streak-3', 'Momentum Builder', 'Maintain an active study streak of 3 days', 'Flame', 'streak', 'common', 100),
('streak-7', 'streak-7', 'Unstoppable Habit', 'Maintain an active study streak of 7 days', 'Flame', 'streak', 'rare', 250),
('streak-30', 'streak-30', 'Iron Discipline', 'Achieve a legendary 30-day continuous study streak', 'Crown', 'streak', 'legendary', 1000),
('centurion', 'centurion', 'Centurion', 'Solve 100 questions across any exam curriculum', 'ShieldAlert', 'practice', 'rare', 300),
('sniper', 'sniper', 'Perfectionist', 'Score 100% accuracy in a session with at least 10 questions', 'Crosshair', 'speed', 'rare', 200),
('boss-slayer', 'boss-slayer', 'Boss Slayer', 'Conquer your first curriculum Boss Challenge node', 'Swords', 'special', 'epic', 500)
ON CONFLICT (id) DO NOTHING;
