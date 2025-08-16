"use client";
import { useState, useEffect } from "react";
import { translationContext } from "../translationContext";
import type { Language, TranslationKey } from "@/lib/translations";
import { translations } from "@/lib/translations";
import type { ReactNode } from "react";
interface translationProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}
const TranslationProvider = ({
  children,
  defaultLanguage = "en",
}: translationProviderProps) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const t = (key: TranslationKey) => {
    const languageTranslations = translations[language] as Record<
      string,
      string
    >;
    const englishTranslations = translations.en as Record<string, string>;
    return languageTranslations[key] || englishTranslations[key] || key;
  };
  const isRTL = language === "ar";
  useEffect(() => {
    if (language === "ar") {
      document.documentElement.lang = "ar";
      document.documentElement.style.direction = "rtl";
    } else {
      document.documentElement.lang = "en";
      document.documentElement.style.direction = "ltr";
    }
  }, [language]);
  return (
    <translationContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </translationContext.Provider>
  );
};
export default TranslationProvider;
