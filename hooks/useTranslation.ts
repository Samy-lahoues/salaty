import { useContext } from "react";
import { translationContext } from "@/contexts/translationContext";

export const useTranslation = () => {
    const context = useContext(translationContext);
    if (!context) {
        throw new Error(
            "useTranslation must be used within a TranslationProvider"
        );
    }
    return context;
};
export default useTranslation;
