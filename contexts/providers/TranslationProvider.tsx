"use client";
import { useState } from "react";
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
        return translations[language][key] || translations.en[key] || key;
    };
    return (
        <translationContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </translationContext.Provider>
    );
};
export default TranslationProvider;
