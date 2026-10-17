"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, MessageSquare, Send, CheckCircle2, Clock, MapPin } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Student Support & Inquiries",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#C8FF3D] bg-[#1C1C1E] border border-[#C8FF3D]/30 px-3 py-1 rounded-full">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              We're Here to Accelerate Your Prep.
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg">
              Have questions about an exam curriculum, institutional pilot, or technical feedback? Our team responds within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
            
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C8FF3D] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center text-black">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white">Support Channels</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Direct email support for active students, coaching academies, and curriculum contributors.
                </p>
                <div className="pt-2 text-sm font-bold text-[#C8FF3D]">
                  support@vezei.com
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF4FA3] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center text-white">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white">Advisory Hours</h3>
                <p className="text-xs text-neutral-300">
                  Monday – Saturday: 9:00 AM – 9:00 PM IST
                </p>
                <p className="text-xs text-neutral-500">
                  24/7 Socratic AI Tutor is always active in the student application.
                </p>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#1C2818] border-2 border-[#C8FF3D] mx-auto flex items-center justify-center text-[#C8FF3D]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Message Delivered</h3>
                  <p className="text-sm text-neutral-300 max-w-sm mx-auto">
                    Thank you, {formData.name}. Our student support team has received your message and will reply to {formData.email} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "Student Support & Inquiries", message: "" });
                    }}
                    className="btn-tactile-lime px-6 py-2.5 rounded-xl text-xs font-black"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Revanth"
                      className="w-full px-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                      Topic / Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                    >
                      <option value="Student Support & Inquiries">Student Support &amp; Inquiries</option>
                      <option value="Curriculum Verification / Question Feedback">Curriculum Verification / Question Feedback</option>
                      <option value="Institutional Cohorts & Academy Licensing">Institutional Cohorts &amp; Academy Licensing</option>
                      <option value="Bug Report / Technical Feedback">Bug Report / Technical Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help your exam journey?..."
                      className="w-full px-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-tactile-lime w-full py-4 rounded-xl text-sm font-black flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
