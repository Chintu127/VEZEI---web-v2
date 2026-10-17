"use client";

import React, { useState } from "react";
import { useI18n } from "@/context/LanguageContext";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n/languages";
import { Globe, Check } from "lucide-react";

interface LanguageSelectorProps {
  variant?: "minimal" | "pill" | "select";
}

export function LanguageSelector({ variant = "pill" }: LanguageSelectorProps) {
  const { currentLanguage, setLanguageCode } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "select") {
    return (
      <div className="relative w-full flex items-center">
        <Globe className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 pointer-events-none absolute left-3 z-10" />
        <select
          value={currentLanguage.code}
          onChange={(e) => setLanguageCode(e.target.value)}
          className="w-full pl-8 pr-3 py-2 rounded-xl bg-white dark:bg-[#17171C] border border-neutral-300 dark:border-[#2E2E36] text-neutral-900 dark:text-white text-xs font-bold focus:border-[#5B3DF5] dark:focus:border-[#C8FF3D] focus:outline-none appearance-none cursor-pointer shadow-sm transition-colors"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-white dark:bg-[#17171C] text-neutral-900 dark:text-white">
              {lang.nativeName} ({lang.name})
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#171717] border border-neutral-300 dark:border-[#2A2A2E] text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white text-xs font-bold shadow-sm transition-all"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#5B3DF5] dark:text-[#C8FF3D]" />
        <span>{currentLanguage.nativeName}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#17171C] border-2 border-neutral-200 dark:border-[#2E2E36] shadow-2xl py-2 z-50 max-h-72 overflow-y-auto space-y-0.5">
            <div className="px-3 py-1 text-[10px] font-black uppercase text-neutral-500 tracking-wider">
              Select Language
            </div>
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLanguage.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguageCode(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between transition-colors ${
                    isSelected
                      ? "bg-[#F4FDE5] dark:bg-[#1C1F16] text-[#2E7D32] dark:text-[#C8FF3D]"
                      : "text-neutral-800 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#1E1E24] hover:text-black dark:hover:text-white"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs">{lang.nativeName}</span>
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-normal">{lang.name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#2E7D32] dark:text-[#C8FF3D]" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
