"use client";

import React, { useState } from "react";
import { Phone, Mail, Building, User, Send, CheckCircle2, AlertCircle } from "lucide-react";

export function CampusContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    collegeInstitution: "",
    roleType: "student",
    inquiryType: "campus_launch",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSubmittedMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Submission could not be completed. Please check all fields.");
      } else {
        setSubmittedMessage(data.message);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          collegeInstitution: "",
          roleType: "student",
          inquiryType: "campus_launch",
          message: "",
        });
      }
    } catch (err: any) {
      setErrorMessage("Network error connecting to the submission service. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#C8FF3D] text-[#111111] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Brand Squircle from Booklet Page 9 */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-3xl bg-[#111111] border-3 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center p-2.5">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="18"
                y="20"
                width="24"
                height="64"
                rx="12"
                transform="rotate(-21 30 52)"
                fill="#FF4FA3"
                stroke="#111111"
                strokeWidth="3.5"
              />
              <rect
                x="48"
                y="18"
                width="24"
                height="66"
                rx="12"
                transform="rotate(22 60 51)"
                fill="#5B3DF5"
                stroke="#111111"
                strokeWidth="3.5"
              />
            </svg>
          </div>
        </div>

        {/* Section Heading & Tagline */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight leading-tight">
            Let's bring Vezei <br />
            to your campus.
          </h2>
          <p className="text-lg sm:text-xl font-bold text-[#111111]">
            One App. Every Exam. Your Path to Success.
          </p>
        </div>

        {/* Two-Column Layout: Official Leadership Contact Card + Functional Inquiry Form */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Booklet Page 9 Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111111] text-white border-3 border-[#111111] rounded-3xl p-8 shadow-[6px_6px_0px_#000000] space-y-6">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400 block mb-2">
                  GET IN TOUCH
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Tanush Gampawar
                </h3>
                <p className="text-sm font-bold text-[#C8FF3D] mt-0.5">
                  Founder &amp; CEO, Vezei
                </p>
              </div>

              <div className="pt-4 border-t border-[#2A2A2E] space-y-1">
                <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400 block">
                  PHONE
                </span>
                <a
                  href="tel:+917207863251"
                  className="text-lg sm:text-xl font-black text-white hover:text-[#C8FF3D] transition-colors flex items-center gap-2 pt-1"
                >
                  <Phone className="w-5 h-5 text-[#C8FF3D]" />
                  <span>+91 7207863251</span>
                </a>
              </div>

              <div className="pt-2 text-xs text-neutral-400 leading-relaxed font-medium">
                For college partnerships, student club introductions, free diagnostic tests, and campus ambassador onboarding.
              </div>
            </div>

            <div className="bg-white border-3 border-[#111111] rounded-3xl p-6 shadow-[5px_5px_0px_#111111] space-y-2">
              <h4 className="text-base font-black text-[#111111]">
                Campus Partnership Process
              </h4>
              <p className="text-xs font-semibold text-neutral-700 leading-relaxed">
                1. Submit your college details &bull; 2. Coordinate diagnostic test session &bull; 3. Setup student ambassador club &bull; 4. Full campus enablement.
              </p>
            </div>
          </div>

          {/* Right Column: Server-Validated Campus Inquiry Form */}
          <div className="lg:col-span-7 bg-white border-3 border-[#111111] rounded-3xl p-7 sm:p-9 shadow-[6px_6px_0px_#111111]">
            <h3 className="text-2xl font-black text-[#111111] mb-1">
              Campus Inquiry &amp; Launch Request
            </h3>
            <p className="text-xs text-neutral-600 mb-6 font-semibold">
              Fill out this form to schedule a campus demo or start student club enablement.
            </p>

            {submittedMessage ? (
              <div className="p-6 rounded-2xl bg-[#F4FDE5] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#C8FF3D] border-2 border-[#111111] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-[#111111]" />
                </div>
                <h4 className="text-lg font-black text-[#111111]">Inquiry Received</h4>
                <p className="text-xs font-semibold text-neutral-800 leading-relaxed">
                  {submittedMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedMessage(null)}
                  className="btn-tactile-lime px-5 py-2 rounded-xl text-xs font-black mt-2"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-[#FFF1F7] border-2 border-[#FF4FA3] text-[#FF4FA3] text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#111111] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border-2 border-[#111111] text-xs font-semibold text-[#111111] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#111111] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border-2 border-[#111111] text-xs font-semibold text-[#111111] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#111111] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border-2 border-[#111111] text-xs font-semibold text-[#111111] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#111111] mb-1">
                      College / Institution *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. BITS Pilani / IIT Delhi"
                      value={formData.collegeInstitution}
                      onChange={(e) => setFormData({ ...formData, collegeInstitution: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border-2 border-[#111111] text-xs font-semibold text-[#111111] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#111111] mb-1">
                      Your Role
                    </label>
                    <select
                      value={formData.roleType}
                      onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border-2 border-[#111111] text-xs font-bold text-[#111111] focus:bg-white focus:outline-none"
                    >
                      <option value="student">Student / Aspirant</option>
                      <option value="club_lead">Student Club / Society Lead</option>
                      <option value="faculty">Faculty / Professor</option>
                      <option value="administrator">College Administrator / Dean</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#111111] mb-1">
                      Inquiry Focus
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border-2 border-[#111111] text-xs font-bold text-[#111111] focus:bg-white focus:outline-none"
                    >
                      <option value="campus_launch">Campus Launch Session</option>
                      <option value="ambassador">Campus Ambassador Program</option>
                      <option value="diagnostic_test">Free Diagnostic Test for Students</option>
                      <option value="institutional_access">Institutional Access &amp; LMS</option>
                      <option value="general">General Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#111111] mb-1">
                    Message / Batch Size Details *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about the exams your students are preparing for, target timeline, or estimated cohort size..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border-2 border-[#111111] text-xs font-semibold text-[#111111] focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-tactile-lime w-full py-3.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Submitting to campus team...</span>
                  ) : (
                    <>
                      <span>Send Campus Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Booklet footer indicator */}
        <div className="mt-12 pt-6 border-t-2 border-[#111111]/20 flex items-center justify-between text-xs font-black text-[#111111]">
          <span>vezei · 09</span>
          <span>One App. Every Exam.</span>
        </div>

      </div>
    </section>
  );
}
