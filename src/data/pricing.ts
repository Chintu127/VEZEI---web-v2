export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceMonthly: string;
  priceAnnual: string;
  period: string;
  popular?: boolean;
  ctaText: string;
  ctaHref: string;
  features: {
    name: string;
    included: boolean;
    highlight?: boolean;
  }[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Starter Learner",
    tagline: "Essential tools to discover exams, view syllabi, and establish your baseline.",
    priceMonthly: "$0",
    priceAnnual: "$0",
    period: "forever free",
    popular: false,
    ctaText: "Start Learning Free",
    ctaHref: "/signup",
    features: [
      { name: "Full global exam catalog & syllabus blueprints", included: true },
      { name: "50 diagnostic practice questions per month", included: true },
      { name: "1 verified full-length proctored mock test", included: true },
      { name: "Basic mistake journal (last 20 mistakes)", included: true },
      { name: "5 AI Tutor concept hints per day", included: true },
      { name: "Personalized adaptive daily study schedule", included: false },
      { name: "Advanced percentile & sectional speed analytics", included: false },
      { name: "Unlimited mock tests & simulated testing engine", included: false },
      { name: "Full 3-stage Socratic AI hint ladder", included: false },
    ],
  },
  {
    id: "pro",
    name: "Vezei Pro",
    badge: "Most Popular",
    tagline: "The complete AI-powered preparation ecosystem for serious exam contenders.",
    priceMonthly: "$19",
    priceAnnual: "$14",
    period: "per month, billed annually",
    popular: true,
    ctaText: "Unlock Complete Prep",
    ctaHref: "/signup?plan=pro",
    features: [
      { name: "Full global exam catalog & syllabus blueprints", included: true },
      { name: "Unlimited practice across 40,000+ verified questions", included: true, highlight: true },
      { name: "Full-length proctored mock tests with strict exam timers", included: true, highlight: true },
      { name: "Deep percentile, speed & time-loss analytics", included: true, highlight: true },
      { name: "Unlimited 24/7 AI Tutor with 3-stage Socratic hint ladders", included: true, highlight: true },
      { name: "Dynamic adaptive daily study planner that adjusts to your pace", included: true, highlight: true },
      { name: "Intelligent error logbook (categorizes conceptual vs calculation slips)", included: true, highlight: true },
      { name: "Topic mastery heatmaps across all sections", included: true },
      { name: "Multi-device progress sync (Web & upcoming mobile)", included: true },
    ],
  },
  {
    id: "campus",
    name: "Institutions & Cohorts",
    tagline: "For coaching academies, universities, and student preparation cohorts.",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    period: "tailored per institution",
    popular: false,
    ctaText: "Contact Institutional Team",
    ctaHref: "/contact?intent=institutional",
    features: [
      { name: "Everything in Vezei Pro for all enrolled students", included: true },
      { name: "Faculty dashboard with aggregate cohort performance tracking", included: true },
      { name: "Custom institutional mock test creation & scheduling", included: true },
      { name: "Cohort weak-area diagnostic reports for instructors", included: true },
      { name: "SSO (Single Sign-On) & institutional LMS integration", included: true },
      { name: "Dedicated pedagogical account manager & onboarding", included: true },
    ],
  },
];
