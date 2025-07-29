"use client";
import { createContext } from "react";
import type { Language, TranslationKey } from "../lib/translations";
interface TranslationContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
    isRTL: boolean;
}
export const translationContext = createContext<
    TranslationContextType | undefined
>(undefined);
