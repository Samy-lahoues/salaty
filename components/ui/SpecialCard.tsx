"use client";
import { ReactNode, forwardRef } from "react";
import { ForwardRefExoticComponent } from "react";
import { RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import { Card, CardContent } from "./card";
import useTranslation from "@/hooks/useTranslation";
interface SpecialCardProps {
    title: "calculationMethod" | "location" | "prayerCounter";
    isRTL: boolean;
    children: ReactNode;
    Icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
}

const SpecialCard = forwardRef<HTMLDivElement, SpecialCardProps>(
    ({ children, title, isRTL, Icon }, ref) => {
        const { t } = useTranslation();
        return (
            <Card
                ref={ref}
                className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg`}
            >
                <CardContent className="px-4 sm:px-6 py-2 sm:py-4">
                    <h3
                        className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 ${
                            !isRTL ? "flex-row-reverse" : ""
                        }`}
                    >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                        <span className="truncate">{t(title)}</span>
                    </h3>
                    {children}
                </CardContent>
            </Card>
        );
    }
);

SpecialCard.displayName = "SpecialCard";

export default SpecialCard;
