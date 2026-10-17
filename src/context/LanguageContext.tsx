"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  SUPPORTED_LANGUAGES,
  TRANSLATIONS,
  Language,
  TranslationKey,
} from "@/lib/i18n/languages";

interface LanguageContextType {
  currentLanguage: Language;
  setLanguageCode: (code: string) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [langCode, setLangCode] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vezei_lang");
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
    }
    return "en";
  });

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((l) => l.code === langCode) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vezei_lang", langCode);
      const root = document.documentElement;
      if (currentLanguage.isRtl) {
        root.setAttribute("dir", "rtl");
      } else {
        root.setAttribute("dir", "ltr");
      }
    }
  }, [langCode, currentLanguage]);

  const t = (key: TranslationKey): string => {
    const langDict = TRANSLATIONS[langCode];
    if (langDict && langDict[key]) {
      return langDict[key]!;
    }
    // Fallback to English
    return TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguageCode: setLangCode,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback if invoked outside provider
    return {
      currentLanguage: SUPPORTED_LANGUAGES[0],
      setLanguageCode: () => {},
      t: (key: TranslationKey) => TRANSLATIONS.en[key] || key,
    };
  }
  return context;
}
