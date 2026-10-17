import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ExamExplorerSection } from "@/components/home/ExamExplorerSection";
import { GamificationSection } from "@/components/home/GamificationSection";
import { AiTutorDemoSection } from "@/components/home/AiTutorDemoSection";
import { MockTestAnalyticsSection } from "@/components/home/MockTestAnalyticsSection";
import { LearningJourneySection } from "@/components/home/LearningJourneySection";
import { CommunityChallengesSection } from "@/components/home/CommunityChallengesSection";
import { VisualRoadmapSection } from "@/components/home/VisualRoadmapSection";
import { TestimonialsTrustSection } from "@/components/home/TestimonialsTrustSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      {/* 1. Responsive Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 2, 3, 4, 5: Hero Section with Headline, CTAs, & Animated Product Preview */}
        <HeroSection />

        {/* 6. Interactive Examination-Category Explorer with Search & Filters */}
        <ExamExplorerSection />

        {/* 7. Gamified Learning Showcase with Streaks, Levels, Achievements & Skill Tree */}
        <GamificationSection />

        {/* 8. AI Tutor Demonstration with Socratic Multi-Stage Hints */}
        <AiTutorDemoSection />

        {/* 9. Mock Test and Performance Analytics Showcase */}
        <MockTestAnalyticsSection />

        {/* 10. Personalized Learning Journey */}
        <LearningJourneySection />

        {/* 11. Community and Study Challenges */}
        <CommunityChallengesSection />

        {/* 12. Visual Learning Roadmap with Milestone Nodes */}
        <VisualRoadmapSection />

        {/* 13. Authentic Testimonials from Pilot Cohorts */}
        <TestimonialsTrustSection />

        {/* 14. Final Signup CTA */}
        <FinalCtaSection />
      </main>

      {/* Comprehensive Footer */}
      <Footer />
    </div>
  );
}
