"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, Send, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    collegeInstitution: "",
    roleType: "student" as const,
    inquiryType: "general" as const,
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
        setErrorMessage(data.error || "Submission failed. Please verify your details.");
      } else {
        setSubmittedMessage(data.message);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          collegeInstitution: "",
          roleType: "student",
          inquiryType: "general",
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
              Have questions about an exam curriculum, campus diagnostic test, or technical feedback? Our team responds within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
            
            {/* Left Contact Info from Booklet Page 9 */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Official Leadership Card */}
              <div className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF4FA3] block">
                  Official Contact
                </span>
                <h3 className="text-2xl font-black text-white">
                  Tanush Gampawar
                </h3>
                <p className="text-xs font-bold text-[#C8FF3D]">
                  Founder &amp; CEO, Vezei
                </p>
                <div className="pt-2 border-t border-[#2A2A2E]">
                  <span className="text-[10px] font-black text-neutral-400 uppercase block">
                    Phone
                  </span>
                  <a
                    href="tel:+917207863251"
                    className="text-base font-black text-white hover:text-[#C8FF3D] transition-colors flex items-center gap-2 pt-1"
                  >
                    <Phone className="w-4 h-4 text-[#C8FF3D]" />
                    <span>+91 7207863251</span>
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#5B3DF5] border border-[#111111] flex items-center justify-center text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-black text-white">Support Inquiries</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  For exam questions, student accounts, or campus ambassadors:
                </p>
                <div className="text-xs font-bold text-[#C8FF3D]">
                  support@vezei.com
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] space-y-2 text-xs text-neutral-400">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Clock className="w-4 h-4 text-[#FF4FA3]" />
                  <span>Advisory Hours</span>
                </div>
                <p>Monday – Saturday: 9:00 AM – 9:00 PM IST</p>
              </div>

            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {submittedMessage ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#1C2818] border-2 border-[#C8FF3D] mx-auto flex items-center justify-center text-[#C8FF3D]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Message Delivered</h3>
                  <p className="text-xs font-semibold text-neutral-300 max-w-sm mx-auto leading-relaxed">
                    {submittedMessage}
                  </p>
                  <button
                    onClick={() => setSubmittedMessage(null)}
                    className="btn-tactile-lime px-6 py-2.5 rounded-xl text-xs font-black mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-[#29171E] border border-[#FF4FA3]/50 text-[#FF4FA3] text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-1">
                        College or Institution *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.collegeInstitution}
                        onChange={(e) => setFormData({ ...formData, collegeInstitution: e.target.value })}
                        placeholder="e.g. BITS Pilani / IIT Delhi"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can our curriculum or campus team assist you?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] text-xs text-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-tactile-lime w-full py-3.5 rounded-xl text-xs font-black flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Validating and sending...</span>
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
