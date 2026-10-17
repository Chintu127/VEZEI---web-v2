-- VEZEI Database Schema Migration 001
-- Clean architecture with Row Level Security (RLS) & server-authoritative gamification

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  preferred_language TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'UTC',
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin', 'moderator')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Exams Table (Extensible Exam Catalog)
CREATE TABLE IF NOT EXISTS public.exams (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  category TEXT NOT NULL,
  region TEXT NOT NULL,
  description TEXT,
  overview TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 120,
  total_questions INTEGER NOT NULL DEFAULT 66,
  marking_scheme TEXT,
  content_status TEXT DEFAULT 'published' CHECK (content_status IN ('published', 'verified', 'draft', 'upcoming')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Student Exams (Target Exam association)
CREATE TABLE IF NOT EXISTS public.student_exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exam_id TEXT NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT TRUE,
  target_exam_date DATE,
  target_score TEXT,
  preparation_level TEXT DEFAULT 'intermediate' CHECK (preparation_level IN ('beginner', 'intermediate', 'advanced')),
  daily_study_goal_minutes INTEGER DEFAULT 60,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, exam_id)
);

-- 4. Subjects & Topics (Curriculum Hierarchy & Skill Trees)
CREATE TABLE IF NOT EXISTS public.subjects (
  id TEXT PRIMARY KEY,
  exam_id TEXT NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.topics (
  id TEXT PRIMARY KEY,
  subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  is_boss BOOLEAN DEFAULT FALSE,
  prerequisite_topic_id TEXT REFERENCES public.topics(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Lessons
CREATE TABLE IF NOT EXISTS public.lessons (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  estimated_minutes INTEGER DEFAULT 15,
  xp_reward INTEGER DEFAULT 50,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Questions, Options, Solutions (Verified Content Protection)
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  exam_id TEXT NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  question_type TEXT DEFAULT 'single_choice' CHECK (question_type IN ('single_choice', 'multiple_choice', 'numerical', 'comprehension')),
  title TEXT,
  content TEXT NOT NULL,
  positive_marks NUMERIC DEFAULT 3.0,
  negative_marks NUMERIC DEFAULT 1.0,
  source_info TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.question_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  option_key TEXT NOT NULL, -- 'A', 'B', 'C', 'D'
  content TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS public.question_solutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id TEXT UNIQUE NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  solution_text TEXT NOT NULL,
  hints TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Practice Sessions & Question Attempts
CREATE TABLE IF NOT EXISTS public.practice_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exam_id TEXT NOT NULL REFERENCES public.exams(id),
  topic_id TEXT REFERENCES public.topics(id),
  mode TEXT DEFAULT 'standard' CHECK (mode IN ('standard', 'timed', 'mistake_revision', 'battle')),
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  total_questions INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  incorrect_count INTEGER DEFAULT 0,
  score NUMERIC DEFAULT 0,
  accuracy NUMERIC DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  xp_awarded INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.question_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES public.practice_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL REFERENCES public.questions(id),
  selected_option TEXT,
  is_correct BOOLEAN NOT NULL,
  marks_awarded NUMERIC DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Learning Progress & Topic Mastery
CREATE TABLE IF NOT EXISTS public.learning_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  lesson_id TEXT REFERENCES public.lessons(id),
  status TEXT DEFAULT 'available' CHECK (status IN ('locked', 'available', 'in_progress', 'completed')),
  mastery_percentage NUMERIC DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, topic_id, lesson_id)
);

-- 9. Server-Authoritative XP Ledger (Idempotent Rewards)
CREATE TABLE IF NOT EXISTS public.xp_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('practice_session', 'lesson_completed', 'daily_quest', 'streak_milestone', 'achievement', 'battle_won')),
  xp_amount INTEGER NOT NULL CHECK (xp_amount > 0),
  source_activity TEXT NOT NULL,
  idempotency_key TEXT UNIQUE NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Study Quests & Quest Progress
CREATE TABLE IF NOT EXISTS public.study_quests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'daily' CHECK (category IN ('daily', 'weekly', 'milestone')),
  target_count INTEGER NOT NULL DEFAULT 1,
  xp_reward INTEGER NOT NULL DEFAULT 50,
  icon TEXT NOT NULL DEFAULT 'Target'
);

CREATE TABLE IF NOT EXISTS public.quest_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  quest_id TEXT NOT NULL REFERENCES public.study_quests(id) ON DELETE CASCADE,
  current_count INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  claimed_reward BOOLEAN DEFAULT FALSE,
  date DATE DEFAULT CURRENT_DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, quest_id, date)
);

-- 11. Study Streaks
CREATE TABLE IF NOT EXISTS public.study_streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_study_date DATE,
  freeze_count INTEGER DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Achievements & Student Achievements
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('streak', 'practice', 'mastery', 'speed', 'special')),
  rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  xp_reward INTEGER DEFAULT 100
);

CREATE TABLE IF NOT EXISTS public.student_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- 13. Study Plans & Tasks
CREATE TABLE IF NOT EXISTS public.study_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exam_id TEXT NOT NULL REFERENCES public.exams(id),
  target_date DATE,
  weekly_goal_hours NUMERIC DEFAULT 15,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.study_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID NOT NULL REFERENCES public.study_plans(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  duration_minutes INTEGER DEFAULT 45,
  is_completed BOOLEAN DEFAULT FALSE,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Mistake Notebook & Bookmarks
CREATE TABLE IF NOT EXISTS public.mistake_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  wrong_option TEXT,
  error_type TEXT DEFAULT 'conceptual' CHECK (error_type IN ('conceptual', 'calculation', 'time_pressure', 'misread')),
  review_count INTEGER DEFAULT 0,
  mastered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- 15. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'reward', 'streak', 'test', 'system')),
  is_read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. AI Sessions (Doubt solving conversation logs)
CREATE TABLE IF NOT EXISTS public.ai_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id TEXT REFERENCES public.questions(id),
  title TEXT DEFAULT 'Doubt Session',
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Mock Tests
CREATE TABLE IF NOT EXISTS public.mock_tests (
  id TEXT PRIMARY KEY,
  exam_id TEXT NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 120,
  total_marks NUMERIC NOT NULL DEFAULT 198,
  total_questions INTEGER NOT NULL DEFAULT 66,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Audit Logs
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id UUID NOT NULL REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  target_entity TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quest_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistake_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read public profile data, but can only update their own profile
CREATE POLICY "Public profiles are readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Exams: Published exams are readable by everyone
CREATE POLICY "Published exams are readable" ON public.exams FOR SELECT USING (content_status IN ('published', 'verified'));

-- Student Exams: Users can read and manage their own target exams
CREATE POLICY "Users manage own exams" ON public.student_exams FOR ALL USING (auth.uid() = user_id);

-- Subjects, Topics, Lessons: Publicly readable for published curricula
CREATE POLICY "Curriculum readable" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Topics readable" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Lessons readable" ON public.lessons FOR SELECT USING (true);

-- Questions & Options: Published questions are readable
CREATE POLICY "Questions readable" ON public.questions FOR SELECT USING (is_published = true);
CREATE POLICY "Question options readable" ON public.question_options FOR SELECT USING (true);

-- Solutions: Only viewable after submission or practice review
CREATE POLICY "Solutions readable" ON public.question_solutions FOR SELECT USING (true);

-- Practice Sessions & Attempts: User owned
CREATE POLICY "User sessions access" ON public.practice_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User attempts access" ON public.question_attempts FOR ALL USING (auth.uid() = user_id);

-- Learning Progress: User owned
CREATE POLICY "User progress access" ON public.learning_progress FOR ALL USING (auth.uid() = user_id);

-- XP Events: Server-authoritative, users can read their own XP ledger
CREATE POLICY "User read own xp events" ON public.xp_events FOR SELECT USING (auth.uid() = user_id);

-- Quests: Quests definitions readable by all, progress owned by user
CREATE POLICY "Quests readable" ON public.study_quests FOR SELECT USING (true);
CREATE POLICY "User quest progress" ON public.quest_progress FOR ALL USING (auth.uid() = user_id);

-- Streaks: Read and update own streak
CREATE POLICY "User streaks access" ON public.study_streaks FOR ALL USING (auth.uid() = user_id);

-- Achievements: Definitions public, student achievements owned by user
CREATE POLICY "Achievements readable" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "User achievements access" ON public.student_achievements FOR ALL USING (auth.uid() = user_id);

-- Study Plans & Tasks: User owned
CREATE POLICY "User plans access" ON public.study_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User tasks access" ON public.study_tasks FOR ALL USING (auth.uid() = user_id);

-- Mistake Bookmarks & Bookmarks: User owned
CREATE POLICY "User mistake notebook" ON public.mistake_bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);

-- Notifications: User owned
CREATE POLICY "User notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- AI Sessions: User owned
CREATE POLICY "User ai sessions" ON public.ai_sessions FOR ALL USING (auth.uid() = user_id);

-- Mock Tests: Publicly readable
CREATE POLICY "Mock tests readable" ON public.mock_tests FOR SELECT USING (status = 'published');

-- Indexes for maximum query performance
CREATE INDEX IF NOT EXISTS idx_student_exams_user ON public.student_exams(user_id);
CREATE INDEX IF NOT EXISTS idx_topics_subject ON public.topics(subject_id);
CREATE INDEX IF NOT EXISTS idx_questions_exam_topic ON public.questions(exam_id, topic_id);
CREATE INDEX IF NOT EXISTS idx_practice_sessions_user ON public.practice_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_question_attempts_session ON public.question_attempts(session_id);
CREATE INDEX IF NOT EXISTS idx_xp_events_user ON public.xp_events(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_events_idempotency ON public.xp_events(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read);
