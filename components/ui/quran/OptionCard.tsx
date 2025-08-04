import { LucideProps } from "lucide-react";
import React from "react";

type OptionCardProps = {
  Icon?: React.ComponentType<LucideProps>; // Accepts a Lucide icon component
  className?: string;
  title: string;
  subtitle?: string;
  col?: boolean;
};

const OptionCard = ({
  Icon,
  className = "",
  title,
  subtitle,
  col = true,
}: OptionCardProps) => {
  return (
    <div
      className={`space-y-1.5 bg-gradient-to-br ${className} border border-green-400/60
      rounded-3xl p-6 h-full overflow-hidden  transition-all duration-500`}
    >
      {Icon && <Icon className="w-5 h-5 text-accent flex-shrink-0" />}
      <div className={`flex gap-0.5 ${col ? "flex-col" : "flex-row"}`}>
        <h3 className="text-lg">{title}</h3>
        {subtitle && <p className="text-sm text-gray-300">{subtitle}</p>}
      </div>
    </div>
  );
};

export default OptionCard;
