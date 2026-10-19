# VEZEI — One App. Every Exam. Your Path to Success.

> **Production-Ready Gamified AI EdTech Platform** for Indian and International Competitive Examination Preparation (CAT, GATE CS, GMAT Focus, GRE, JEE Advanced, NEET-PG, SAT, IELTS, and more).

---

## 🎨 Brand Identity & Tokens

The platform follows the official VEZEI brand visual system:

- **Lime (`#C8FF3D`)**: Primary calls to action, active navigation tabs, progress indicators, selected states, and milestone celebrations.
- **Hot Pink (`#FF4FA3`)**: Streaks, mistake notebooks, XP rewards, badges, and expressive accents.
- **Electric Purple (`#5B3DF5`)**: Socratic AI Tutor, advanced mastery indicators, and algorithm insights.
- **Black (`#111111`)**: Primary dark theme background, pill containers, wordmark, and tactile borders (`border-2 border-[#111111] shadow-[4px_4px_0px_#111111]`).

Typography: **Outfit** (Geometric Sans-serif) with clear contrast and reduced-motion compliance.

---

## 🚀 Key Platform Subsystems

### 1. 14-Section Marketing Homepage
1. **Header & Navigation**: Brand logo, exam search, features, pricing, login, and tactile CTAs.
2. **Hero**: Headline *"Your exams. Your rules. Your victory."*, dual CTAs, and live preview.
3. **Daily Quest & XP Preview**: Interactive level progression and daily learning goals.
4. **Interactive Exam Explorer**: Filter by Indian & International entrance categories (Management, Engineering, Study Abroad, Medical, Law).
5. **Gamification Showcase**: Streaks, levels, badge achievements, and tactile cards.
6. **Socratic AI Tutor**: Guided step-by-step problem solving without spoiling the answer.
7. **Mock Tests & Analytics**: Percentile benchmarks, subject accuracy radar, and time tracking.
8. **Personalized Learning Journey**: Adaptive roadmap from Day 1 diagnostics to Exam Day.
9. **Community & Battle Arena**: Live peer challenges and weekly study leagues.
10. **Transparent Pricing**: Free vs. Pro comparison with verified feature flags.
11. **Authentic Testimonials**: Aspirant stories and target score milestones.
12. **Final Conversion CTA**: High-contrast registration gateway.
13. **Comprehensive Footer**: Legal, syllabus directories, resources, and social links.

### 2. Student Application (`/app`)
- **Dashboard (`/app`)**: Realtime overview with XP balance, current streak, daily quests, continue learning, and weak-topic revision recommendations.
- **Target Exams (`/app/exams`)**: Manage multiple target exams, exam dates, target percentiles, and preparation levels.
- **Interactive Learning Map (`/app/learn`)**: Syllabus nodes, topic mastery, and lesson player (`/app/learn/[lessonId]`).
- **Adaptive Practice Engine (`/app/practice`)**: Configure drills by subject, topic, difficulty, question count, and timed mode.
- **Active Practice Session (`/app/practice/session`)**: Countdown timer, question navigation palette, instant bookmarking, flag for review, and tiered Socratic AI hints.
- **Detailed Test Results (`/app/results/[testId]`)**: Server-authoritative score (+3 / -1 / 0), accuracy percentage, detailed step-by-step solutions, and mistake tagging.
- **Mistake Notebook (`/app/mistakes`)**: Automatically aggregates all incorrect attempts with review flashcards and re-practice triggers.
- **Bookmarks (`/app/bookmarks`)**: Starred challenging questions for quick revision before exams.
- **Socratic AI Tutor (`/app/ai-tutor`)**: 24/7 interactive chat for doubt resolution with preset high-yield topics.
- **Analytics & Readiness (`/app/analytics`)**: Accuracy trends, topic strengths/weaknesses, and study time distribution.
- **Study Planner (`/app/planner`)**: Daily schedule, target milestones, and task checklists.
- **Battle Arena (`/app/battle`)**: Live 1v1 quick quiz challenges against fellow aspirants.
- **Leaderboards (`/app/leaderboards`)**: Weekly league rankings (Bronze, Silver, Gold, Diamond) with promotion/demotion lines.
- **Achievements (`/app/achievements`)**: Unlockable milestone badges with XP rewards.
- **Profile & Settings (`/app/profile`, `/app/settings`, `/app/billing`)**: Avatar customization, theme toggle, notification preferences, and subscription tier.

### 3. Role-Protected Admin Console (`/admin`)
- **Overview (`/admin`)**: Key metrics, user growth, active sessions, and question bank stats.
- **Exam Management (`/admin/exams`)**: Add and configure exams, syllabus structures, and marking schemes.
- **Question Bank CMS (`/admin/questions`)**: Filter, edit, and verify solutions with difficulty and topic tags.
- **Mock Test Builder (`/admin/mock-tests`)**: Create timed full-length and sectional mocks.
- **User Management (`/admin/users`)**: Inspect student profiles, target exams, and roles.
- **Audit Logs (`/admin/audit-logs`)**: Realtime security log of privileged actions.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 15 (App Router, Server Components + Client interactivity)
- **Language**: TypeScript (Strict type safety)
- **Styling**: Tailwind CSS + Custom Tactile Neo-Brutalist utility classes
- **Icons**: Lucide Icons
- **Animation**: Motion for React + Canvas Confetti
- **Backend & Auth**: Supabase Auth, PostgreSQL with Row-Level Security (RLS)
- **Database Client**: `@supabase/ssr` (cookie-aware session persistence) & `@supabase/supabase-js`
- **Validation**: Zod & React Hook Form

---

## 🗄️ Database Migrations

Located in `supabase/migrations/`:
- `001_initial_schema.sql`: 18 normalized tables with comprehensive RLS policies, foreign keys, and indexes:
  - `profiles`, `exams`, `student_exams`, `subjects`, `topics`, `lessons`, `questions`, `question_options`, `question_solutions`, `practice_sessions`, `question_attempts`, `learning_progress`, `xp_events`, `study_quests`, `quest_progress`, `study_streaks`, `achievements`, `student_achievements`, `study_plans`, `study_tasks`, `mistake_bookmarks`, `bookmarks`, `notifications`, `ai_sessions`, `mock_tests`, `admin_audit_logs`.
- `002_seed_data.sql`: Seed data for CAT, GATE CS, GMAT Focus, GRE, JEE Advanced, NEET-PG, daily quests, and badges.
- `003_rbac_roles.sql`: Role-based access control policies and permission matrices for Super Admin, Main Admin, and Tech Developers 1-3.
- `004_campus_and_review_workflow.sql`: `campus_inquiries` table with public RLS submission policies, `content_reviews` audit logging, and 4-wave launch taxonomy columns (`launch_wave`, `readiness_status`, `verified_rights`, `expert_reviewer`).

---

## ⚙️ Environment Variables

Create `.env.local` using the structure in `.env.example`:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# AI Provider (Server-side only)
AI_API_KEY=your-gemini-or-openai-key
```

---

## 🚦 Getting Started

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Launch
```bash
npm run build
npm run start
```

### Running Automated Tests
```bash
# Unit tests for scoring, XP progression, and streak calculations
npm test

# Comprehensive HTTP endpoint verification (all 43 routes)
npm run test:routes
```

---

## 🔐 Security & Integrity Highlights

1. **Server-Authoritative Scoring**: Practice scores (+3, -1, 0) and XP rewards are validated server-side. The client cannot send arbitrary XP amounts.
2. **Idempotent Rewards**: XP ledger prevents duplicate reward claims.
3. **Protected Answer Keys**: Question solutions and correct options remain server-side during active drills until submission.
4. **Row-Level Security (RLS)**: Enforced across all student tables so students can only read and mutate their own records.
5. **No Secret Leaks**: All provider API keys and service roles are strictly server-only.
