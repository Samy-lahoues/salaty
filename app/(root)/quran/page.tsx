"use client";
import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";
import { BookOpen, Search } from "lucide-react";
import FilterButton from "@/components/ui/quran/FilterButton";
import SurahCard from "@/components/ui/quran/SurahCard";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QUICK_ACCESS_SURAHS, FilterType } from "@/constants";
import { Surah } from "@/constants";
import { useQuran } from "@/hooks/useQuran";
import AnimatedList from "@/components/ui/quran/AnimatedList";

const Page = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("surah");
  const isRTL = false; // Get this from your language context/hook

  // Mock useQuran hook - replace with your actual hook
  const { surahs, loading, error } = useQuran();

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto overflow-hidden">
        <CardContent className="p-8 text-center">
          <div className="text-red-500 mb-2">Error loading Quran data</div>
          <div className="text-muted-foreground">{error}</div>
        </CardContent>
      </Card>
    );
  }

  // Filter translations
  const filterTranslations = {
    surah: { en: "Surah", ar: "سورة" },
    juz: { en: "Juz", ar: "جزء" },
    ayat: { en: "Ayat", ar: "آية" },
  };

  // Filter surahs based on search
  const filteredSurahs =
    surahs?.filter(
      (surah: Surah) =>
        surah.surahName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.surahNameArabic.includes(searchQuery) ||
        surah.surahNameTranslation
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    ) || [];

  const handleSurahClick = (surah: Surah) => {
    // Navigate to surah reading page
    console.log("Navigate to surah:", surah.id);
  };

  const handleQuickAccessClick = (surahId: number) => {
    // Navigate to specific surah
    console.log("Quick access to surah:", surahId);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-accent-bg">
            <BookOpen className="text-accent w-6 h-6" />
          </div>
          <span>{t("quran")}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search surah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Quick Access Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            {t("quickAccess")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {QUICK_ACCESS_SURAHS.map((surah) => (
              <Button
                key={surah.id}
                variant="outline"
                size="sm"
                className="rounded-full border-accent/30 hover:bg-accent hover:text-white transition-colors"
                onClick={() => handleQuickAccessClick(surah.id)}
              >
                {surah.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div
          className={`flex mb-5 md:mb-6 mt-5 mx-auto ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {(["surah", "juz", "ayat"] as const).map((filterType, index) => (
            <FilterButton
              key={index}
              index={index}
              filter={filter}
              filterType={filterType}
              onClick={() => setFilter(filterType)}
              text={filterTranslations[filterType][isRTL ? "ar" : "en"]}
              isRTL={isRTL}
            />
          ))}
        </div>

        {/* Surahs List */}
        <AnimatedList
          items={filteredSurahs}
          renderItem={(surah: Surah) => (
            <SurahCard
              key={surah.id}
              surah={surah}
              onClick={() => handleSurahClick(surah)}
            />
          )}
          onItemSelect={(surah: Surah) => handleSurahClick(surah)}
          itemsClassName="space-y-3"
          maxHeight="500px"
          displayScrollbar={true}
          emptyState={
            <div className="text-center py-8 text-muted-foreground">
              {loading
                ? t("loadingSurahs")
                : searchQuery
                  ? t("noSurahsFound")
                  : t("loadingSurahs")}
            </div>
          }
        />
      </CardContent>
    </Card>
  );
};

export default Page;
