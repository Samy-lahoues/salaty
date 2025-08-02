import { Card, CardContent } from "@/components/ui/card";
import type { Surah } from "@/constants";
interface surahCardProps {
  surah: Surah;
  onClick?: () => void;
}

const SurahCard = ({ surah, onClick }: surahCardProps) => {
  if (!surah) return null;
  return (
    <Card
      className="rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 hover:border-accent/30 overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center min-w-0">
          {/* Left Column */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            {/* Surah ID Circle */}
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-accent font-semibold text-sm">
                {surah.id}
              </span>
            </div>

            {/* Surah Info */}
            <div className="flex flex-col min-w-0 flex-1">
              <h3 className="font-medium text-foreground truncate">
                {surah.surahName}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {surah.surahNameTranslation}
                </span>
                <span className="text-sm">
                  {surah.revelationPlace === "Mecca" ? "🕋" : "🕌"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {surah.totalAyah} verses
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Arabic Name */}
          <div className="text-right flex-shrink-0">
            <span className="font-arabic text-accent text-xl whitespace-nowrap">
              {surah.surahNameArabic}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurahCard;
