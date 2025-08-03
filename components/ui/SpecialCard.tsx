"use client";
import { ReactNode, forwardRef } from "react";
import { ForwardRefExoticComponent } from "react";
import { RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import { Card, CardContent } from "./card";
import useTranslation from "@/hooks/useTranslation";
interface SpecialCardProps {
  title?: "calculationMethod" | "location" | "prayerTracker" | "hidjriCalendar";
  isRTL: boolean;
  children: ReactNode;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const SpecialCard = forwardRef<HTMLDivElement, SpecialCardProps>(
  ({ children, title, isRTL, Icon }, ref) => {
    const { t } = useTranslation();
    return (
      <Card
        ref={ref}
        className={`bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.4)]  rounded-2xl`}
      >
        <CardContent className="px-4 sm:px-6 py-2 sm:py-4">
          {title && (
            <h3
              className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 ${
                !isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {Icon && (
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
              )}
              <span className="truncate">{t(title)}</span>
            </h3>
          )}
          {children}
        </CardContent>
      </Card>
    );
  },
);

SpecialCard.displayName = "SpecialCard";

export default SpecialCard;
