"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRICING_TIERS } from "@/data/pricing";
import { Check, X, Sparkles, Shield, ArrowRight } from "lucide-react";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  return (
    <section className="py-24 bg-[#141418] border-t border-[#2A2A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/40 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
            Clear &amp; Transparent
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Plans Designed for Serious Preparation.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Start for free to explore syllabi and diagnostic tests. Upgrade to Pro when you're ready for unlimited AI hints, proctored mocks, and time-trap analytics.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#1C1C22] border border-[#2E2E36] mt-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-[#C8FF3D] text-[#111111] shadow-[2px_2px_0px_#111111]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-[#C8FF3D] text-[#111111] shadow-[2px_2px_0px_#111111]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#FF4FA3] text-white">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier) => {
            const isPro = tier.id === "pro";
            const price = billingCycle === "annual" ? tier.priceAnnual : tier.priceMonthly;

            return (
              <div
                key={tier.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                  isPro
                    ? "bg-[#1C1C24] border-3 border-[#C8FF3D] shadow-[0_15px_40px_rgba(200,255,61,0.2)] md:-translate-y-2"
                    : "bg-[#18181D] border-2 border-[#2E2E36]"
                }`}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C8FF3D] text-[#111111] text-xs font-black uppercase tracking-wider border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">{tier.name}</h3>
                    <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">{tier.tagline}</p>
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-white">{price}</span>
                    <span className="text-xs text-neutral-400 font-medium">/{tier.period}</span>
                  </div>

                  <div className="pt-4 border-t border-[#2A2A2E] space-y-3">
                    <span className="text-xs font-black text-neutral-300 uppercase tracking-wider block">
                      Included Capabilities:
                    </span>
                    <ul className="space-y-2.5 text-xs">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          {feat.included ? (
                            <Check
                              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                feat.highlight ? "text-[#C8FF3D]" : "text-neutral-400"
                              }`}
                            />
                          ) : (
                            <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-neutral-600" />
                          )}
                          <span
                            className={
                              feat.included
                                ? feat.highlight
                                  ? "text-white font-bold"
                                  : "text-neutral-300"
                                : "text-neutral-600 line-through"
                            }
                          >
                            {feat.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={tier.ctaHref}
                    className={`w-full py-3.5 rounded-2xl text-center text-sm font-black flex items-center justify-center gap-2 ${
                      isPro
                        ? "btn-tactile-lime"
                        : "bg-[#25252A] hover:bg-[#2E2E34] text-white border-2 border-[#2E2E36]"
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Guarantee Trust Note */}
        <div className="mt-12 text-center text-xs text-neutral-500 max-w-xl mx-auto flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-[#C8FF3D]" />
          <span>7-Day Risk-Free Guarantee • Cancel anytime with 1-click in account settings</span>
        </div>

      </div>
    </section>
  );
}
