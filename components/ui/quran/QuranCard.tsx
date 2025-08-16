import Image from "next/image";
const QuranCard = ({
  className = "",
  onClick,
  title,
  subtitle,
  col = true,
}: {
  className?: string;
  onClick: () => void;
  title: string;
  subtitle: string;
  col?: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={`space-y-1.5 bg-gradient-to-br ${className} border border-green-400/60
      rounded-3xl p-6 h-full overflow-hidden  transition-all duration-500`}
    >
      <Image width={22} height={22} src="/quran-green.png" alt="quran-icon" />
      <div
        className={`flex gap-0.5 ${col ? "flex-col" : "flex-row items-center gap-2"}`}
      >
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm text-gray-300">{subtitle}</p>
      </div>
    </div>
  );
};
export default QuranCard;
