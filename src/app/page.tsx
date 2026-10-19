import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { TheChallengeSection } from "@/components/home/TheChallengeSection";
import { TheVezeiWaySection } from "@/components/home/TheVezeiWaySection";
import { ExamRoadmapSection } from "@/components/home/ExamRoadmapSection";
import { CampusLaunchSection } from "@/components/home/CampusLaunchSection";
import { TrustQualitySection } from "@/components/home/TrustQualitySection";
import { CampusContactSection } from "@/components/home/CampusContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      {/* 1. Concise Responsive Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Booklet Page 1: Hero Section ("One App. Every Exam. Your Path to Success.") */}
        <HeroSection />

        {/* 3. Booklet Page 2: About Section ("What is Vezei?" - Practice, Mock tests, Analytics, Study plans) */}
        <AboutSection />

        {/* 4. Booklet Page 3: The Challenge ("Exam prep today is scattered") */}
        <TheChallengeSection />

        {/* 5. Booklet Page 4: The VEZEI Way ("One place for everything you need") */}
        <TheVezeiWaySection />

        {/* 6. Booklet Page 5 & Overview Page 3: Exam Roadmap (Waves 1-4 & Interactive Readiness Explorer) */}
        <ExamRoadmapSection />

        {/* 7. Booklet Page 6: Campus Launch ("Coming to your college" - 4 stages) */}
        <CampusLaunchSection />

        {/* 8. Booklet Page 8: Trust and Quality ("Built on trust" & What's Next) */}
        <TrustQualitySection />

        {/* 9. Booklet Page 9: Campus Inquiry & Contact ("Let's bring Vezei to your campus.") */}
        <CampusContactSection />
      </main>

      {/* Comprehensive Footer */}
      <Footer />
    </div>
  );
}
