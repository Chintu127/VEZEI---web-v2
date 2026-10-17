// TypeScript database definitions for VEZEI

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ExamCategory =
  | "Management"
  | "Engineering"
  | "Graduate Admissions"
  | "Undergraduate Admissions"
  | "Language Proficiency"
  | "Medical & Healthcare"
  | "Law"
  | "Research & Postgraduate"
  | "Professional";

export interface Profile {
  id: string;
  full_name: string;
  username?: string | null;
  avatar_url?: string | null;
  preferred_language: string;
  timezone: string;
  role: "student" | "admin" | "moderator";
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Exam {
  id: string;
  slug: string;
  name: string;
  full_name: string;
  category: ExamCategory;
  region: string;
  description: string;
  overview: string;
  duration_minutes: number;
  total_questions: number;
  marking_scheme: string;
  content_status: "published" | "verified" | "draft" | "upcoming";
  created_at?: string;
  updated_at?: string;
}

export interface StudentExam {
  id: string;
  user_id: string;
  exam_id: string;
  is_primary: boolean;
  target_exam_date?: string | null;
  target_score?: string | null;
  preparation_level: "beginner" | "intermediate" | "advanced";
  daily_study_goal_minutes: number;
  created_at?: string;
  updated_at?: string;
}

export interface Subject {
  id: string;
  exam_id: string;
  name: string;
  order_index: number;
  icon?: string;
}

export interface Topic {
  id: string;
  subject_id: string;
  name: string;
  description?: string;
  order_index: number;
  is_boss: boolean;
  prerequisite_topic_id?: string | null;
}

export interface Lesson {
  id: string;
  topic_id: string;
  title: string;
  content: string;
  estimated_minutes: number;
  xp_reward: number;
  order_index: number;
}

export interface QuestionOption {
  id: string;
  question_id: string;
  option_key: "A" | "B" | "C" | "D";
  content: string;
  is_correct?: boolean; // Protected on client before submission
}

export interface QuestionSolution {
  id: string;
  question_id: string;
  solution_text: string;
  hints: string[];
}

export interface Question {
  id: string;
  exam_id: string;
  topic_id: string;
  difficulty: "easy" | "medium" | "hard";
  question_type: "single_choice" | "multiple_choice" | "numerical" | "comprehension";
  title?: string;
  content: string;
  positive_marks: number;
  negative_marks: number;
  source_info?: string;
  options?: QuestionOption[];
  solution?: QuestionSolution;
}

export interface PracticeSession {
  id: string;
  user_id: string;
  exam_id: string;
  topic_id?: string | null;
  mode: "standard" | "timed" | "mistake_revision" | "battle";
  status: "in_progress" | "completed" | "abandoned";
  total_questions: number;
  correct_count: number;
  incorrect_count: number;
  score: number;
  accuracy: number;
  time_spent_seconds: number;
  xp_awarded: number;
  started_at: string;
  completed_at?: string | null;
}

export interface QuestionAttempt {
  id: string;
  session_id: string;
  user_id: string;
  question_id: string;
  selected_option: string;
  is_correct: boolean;
  marks_awarded: number;
  time_spent_seconds: number;
  created_at: string;
}

export interface XpEvent {
  id: string;
  user_id: string;
  event_type: "practice_session" | "lesson_completed" | "daily_quest" | "streak_milestone" | "achievement" | "battle_won";
  xp_amount: number;
  source_activity: string;
  idempotency_key: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface StudyQuest {
  id: string;
  title: string;
  description: string;
  category: "daily" | "weekly" | "milestone";
  target_count: number;
  xp_reward: number;
  icon: string;
}

export interface QuestProgress {
  id: string;
  user_id: string;
  quest_id: string;
  current_count: number;
  is_completed: boolean;
  claimed_reward: boolean;
  date: string;
  quest?: StudyQuest;
}

export interface StudyStreak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_study_date?: string | null;
  freeze_count: number;
}

export interface Achievement {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: "streak" | "practice" | "mastery" | "speed" | "special";
  rarity: "common" | "rare" | "epic" | "legendary";
  xp_reward: number;
  is_unlocked?: boolean;
  unlocked_at?: string | null;
}

export interface MistakeBookmark {
  id: string;
  user_id: string;
  question_id: string;
  wrong_option?: string;
  error_type: "conceptual" | "calculation" | "time_pressure" | "misread";
  review_count: number;
  mastered: boolean;
  created_at: string;
  question?: Question;
}

export interface StudyTask {
  id: string;
  plan_id: string;
  user_id: string;
  title: string;
  description?: string;
  due_date: string;
  duration_minutes: number;
  is_completed: boolean;
  priority: "low" | "medium" | "high";
}
