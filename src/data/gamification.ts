import { StudyQuest, Achievement } from "@/types/database";

export const INITIAL_QUESTS: StudyQuest[] = [
  {
    id: "daily-sprint",
    title: "Daily Practice Sprint",
    description: "Complete 10 practice questions with high focus",
    category: "daily",
    target_count: 10,
    xp_reward: 50,
    icon: "Zap",
  },
  {
    id: "accuracy-master",
    title: "Sharpshooter Precision",
    description: "Achieve 80% or higher accuracy in a test session",
    category: "daily",
    target_count: 1,
    xp_reward: 60,
    icon: "Target",
  },
  {
    id: "deep-focus",
    title: "Deep Study Sprint",
    description: "Accumulate 30 minutes of dedicated study time",
    category: "daily",
    target_count: 30,
    xp_reward: 40,
    icon: "Clock",
  },
  {
    id: "mistake-crusher",
    title: "Mistake Notebook Revision",
    description: "Review and resolve 3 questions from your error journal",
    category: "daily",
    target_count: 3,
    xp_reward: 50,
    icon: "BookOpen",
  },
  {
    id: "weekly-champion",
    title: "Weekly Titan",
    description: "Complete 5 full practice drills this week",
    category: "weekly",
    target_count: 5,
    xp_reward: 200,
    icon: "Award",
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-step",
    slug: "first-step",
    title: "First Step Forward",
    description: "Completed your first practice session on VEZEI",
    icon: "Footprints",
    category: "practice",
    rarity: "common",
    xp_reward: 50,
    is_unlocked: true,
    unlocked_at: "2026-10-15T10:00:00Z",
  },
  {
    id: "streak-3",
    slug: "streak-3",
    title: "Momentum Builder",
    description: "Maintained an active study streak of 3 consecutive days",
    icon: "Flame",
    category: "streak",
    rarity: "common",
    xp_reward: 100,
    is_unlocked: true,
    unlocked_at: "2026-10-16T18:30:00Z",
  },
  {
    id: "streak-7",
    slug: "streak-7",
    title: "Unstoppable Habit",
    description: "Maintained an active study streak of 7 consecutive days",
    icon: "Flame",
    category: "streak",
    rarity: "rare",
    xp_reward: 250,
    is_unlocked: false,
  },
  {
    id: "centurion",
    slug: "centurion",
    title: "Centurion Solver",
    description: "Solved 100 competitive exam questions",
    icon: "ShieldAlert",
    category: "practice",
    rarity: "rare",
    xp_reward: 300,
    is_unlocked: false,
  },
  {
    id: "sniper",
    slug: "sniper",
    title: "Flawless Execution",
    description: "Score 100% accuracy in a session of at least 10 questions",
    icon: "Crosshair",
    category: "speed",
    rarity: "epic",
    xp_reward: 400,
    is_unlocked: false,
  },
  {
    id: "boss-slayer",
    slug: "boss-slayer",
    title: "Boss Slayer",
    description: "Conquer a comprehensive curriculum Boss Challenge",
    icon: "Swords",
    category: "special",
    rarity: "legendary",
    xp_reward: 600,
    is_unlocked: false,
  },
];

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  exam: string;
  weeklyXp: number;
  streakDays: number;
  tier: "Diamond" | "Platinum" | "Gold" | "Silver" | "Bronze";
  isCurrentUser?: boolean;
}

export const LEADERBOARD_DATA: LeaderboardUser[] = [
  { rank: 1, id: "u-1", name: "Aarav Sharma", avatar: "👨‍🎓", exam: "CAT 2026", weeklyXp: 3450, streakDays: 24, tier: "Diamond" },
  { rank: 2, id: "u-2", name: "Priya Nair", avatar: "👩‍💼", exam: "GMAT Focus", weeklyXp: 3120, streakDays: 19, tier: "Diamond" },
  { rank: 3, id: "u-3", name: "Rohan Verma", avatar: "🚀", exam: "GATE CS", weeklyXp: 2980, streakDays: 31, tier: "Diamond" },
  { rank: 4, id: "u-4", name: "Aditi Rao", avatar: "⚡", exam: "CAT 2026", weeklyXp: 2640, streakDays: 14, tier: "Platinum" },
  { rank: 5, id: "u-current", name: "You (Revanth)", avatar: "🎯", exam: "CAT 2026", weeklyXp: 2450, streakDays: 5, tier: "Platinum", isCurrentUser: true },
  { rank: 6, id: "u-6", name: "Kavya Patel", avatar: "🌟", exam: "Digital SAT", weeklyXp: 2210, streakDays: 12, tier: "Platinum" },
  { rank: 7, id: "u-7", name: "Devansh Iyer", avatar: "🧠", exam: "JEE Adv", weeklyXp: 1980, streakDays: 9, tier: "Gold" },
  { rank: 8, id: "u-8", name: "Sneha Mukherjee", avatar: "📚", exam: "GRE", weeklyXp: 1850, streakDays: 8, tier: "Gold" },
  { rank: 9, id: "u-9", name: "Arjun Reddy", avatar: "🔥", exam: "NEET UG", weeklyXp: 1720, streakDays: 11, tier: "Gold" },
  { rank: 10, id: "u-10", name: "Ananya Sen", avatar: "✨", exam: "IELTS", weeklyXp: 1540, streakDays: 6, tier: "Gold" },
];

export interface SkillNode {
  id: string;
  subject: string;
  title: string;
  description: string;
  status: "completed" | "available" | "locked" | "boss";
  xpReward: number;
  estimatedMinutes: number;
  questionCount: number;
  position: { x: number; y: number };
}

export const SKILL_TREE_NODES: SkillNode[] = [
  {
    id: "node-1",
    subject: "Quantitative Aptitude",
    title: "Percentages & Fractions",
    description: "Core percentage change, successive discounts, and base conversions",
    status: "completed",
    xpReward: 50,
    estimatedMinutes: 15,
    questionCount: 15,
    position: { x: 50, y: 10 },
  },
  {
    id: "node-2",
    subject: "Quantitative Aptitude",
    title: "Profit, Loss & Discount",
    description: "Markup ratios, false weights, and multi-tier discount problems",
    status: "available",
    xpReward: 75,
    estimatedMinutes: 20,
    questionCount: 20,
    position: { x: 50, y: 30 },
  },
  {
    id: "node-3",
    subject: "Quantitative Aptitude",
    title: "Ratios, Proportions & Variations",
    description: "Direct and inverse variation models, cross multiplication techniques",
    status: "locked",
    xpReward: 75,
    estimatedMinutes: 20,
    questionCount: 18,
    position: { x: 25, y: 50 },
  },
  {
    id: "node-4",
    subject: "Quantitative Aptitude",
    title: "Averages, Mixtures & Alligations",
    description: "Weighted average rule, alligation cross diagrams, replacement formulas",
    status: "locked",
    xpReward: 80,
    estimatedMinutes: 25,
    questionCount: 20,
    position: { x: 75, y: 50 },
  },
  {
    id: "node-5",
    subject: "Quantitative Aptitude",
    title: "Time, Speed & Distance",
    description: "Relative speed, circular tracks, boats and streams, escalators",
    status: "locked",
    xpReward: 100,
    estimatedMinutes: 30,
    questionCount: 25,
    position: { x: 50, y: 70 },
  },
  {
    id: "node-boss",
    subject: "Quantitative Aptitude",
    title: "Arithmetic Boss Challenge",
    description: "Timed mixed challenge combining advanced multi-concept Arithmetic CAT level questions",
    status: "boss",
    xpReward: 250,
    estimatedMinutes: 45,
    questionCount: 30,
    position: { x: 50, y: 90 },
  },
];
