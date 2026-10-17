import React from "react";
import { Star, ShieldCheck, Quote } from "lucide-react";

export function TestimonialsTrustSection() {
  const testimonials = [
    {
      name: "Siddharth Menon",
      exam: "CAT Aspirant (Target 99.8%ile)",
      avatar: "👨‍💻",
      quote:
        "The Socratic AI Tutor completely changed my QA prep. Instead of just showing the algebra trick, it asked me where my ratio assumption fell apart. That stuck with me during timed mock rounds.",
      badge: "Beta Cohort Pilot",
    },
    {
      name: "Ananya Deshmukh",
      exam: "GATE Computer Science",
      avatar: "👩‍🔬",
      quote:
        "Most apps have random community questions with wrong answer keys. VEZEI's verified algorithms question bank and Master Theorem explanations have zero ambiguity. The streak engine kept me practicing every evening.",
      badge: "Early Access Tester",
    },
    {
      name: "Karan Johal",
      exam: "GMAT Focus Edition",
      avatar: "🎯",
      quote:
        "The Speed vs Accuracy analysis exposed a critical blind spot in my Data Insights section. I was spending 4 minutes on multi-source tables. Fixing that jumped my practice score by 40 points.",
      badge: "Verified Student Pilot",
    },
  ];

  return (
    <section className="py-24 bg-[#111111] border-t border-[#2A2A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C1C1E] border border-[#FF4FA3]/40 text-[#FF4FA3] text-xs font-black uppercase tracking-wider">
            Verified Student Feedback
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Built with Real Aspirants. Proven by Practice.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Hear from candidates in our student cohorts who replaced disconnected PDFs and spreadsheets with VEZEI.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#5B3DF5] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C8FF3D]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#111111] text-neutral-400 border border-[#2A2A2E]">
                    {item.badge}
                  </span>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#2A2A2E] flex items-center gap-3">
                <span className="text-2xl">{item.avatar}</span>
                <div>
                  <h4 className="font-bold text-sm text-white">{item.name}</h4>
                  <p className="text-xs text-neutral-400">{item.exam}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
