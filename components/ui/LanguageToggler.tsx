import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "./button";
import { Languages } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
const LanguageToggler = () => {
    const { t, language, setLanguage } = useTranslation();
    const isRTL = language === "ar";
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Languages className="h-4 w-4" />
                    <span className="sr-only">{t("language")}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRTL ? "start" : "end"}>
                <DropdownMenuItem
                    className={`cursor-pointer`}
                    onClick={() => setLanguage("en")}
                >
                    English
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setLanguage("ar")}
                >
                    العربية
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default LanguageToggler;
