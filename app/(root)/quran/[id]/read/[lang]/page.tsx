"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Search,
  Bookmark,
  Play,
  Volume2,
  Plus,
  Minus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [currentAyah] = useState(1);
  const [fontSize, setFontSize] = useState(18);
  const [showTranslation, setShowTranslation] = useState(true);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<Set<number>>(
    new Set(),
  );

  // Sample data - replace with real API data
  const surah = {
    id: 1,
    name: "Al-Faatiha",
    arabicName: "الفاتحة",
    totalAyahs: 7,
    ayahs: [
      {
        number: 1,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation:
          "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        transliteration: "Bismillah ir-Rahman ir-Raheem",
      },
      {
        number: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        translation: "All praise is due to Allah, Lord of the worlds.",
        transliteration: "Al-hamdu lillahi rabbi l-alameen",
      },
      {
        number: 3,
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "The Entirely Merciful, the Especially Merciful.",
        transliteration: "Ar-Rahman ir-Raheem",
      },
      {
        number: 4,
        arabic: "مَالِكِ يَوْمِ الدِّينِ",
        translation: "Sovereign of the Day of Recompense.",
        transliteration: "Maliki yawm id-deen",
      },
      {
        number: 5,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translation: "It is You we worship and You we ask for help.",
        transliteration: "Iyyaka na'budu wa iyyaka nasta'een",
      },
      {
        number: 6,
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        translation: "Guide us to the straight path.",
        transliteration: "Ihdina s-sirata l-mustaqeem",
      },
      {
        number: 7,
        arabic:
          "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        translation:
          "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
        transliteration:
          "Sirata l-ladhina an'amta 'alayhim ghayri l-maghdubi 'alayhim wa la d-dalleen",
      },
    ],
  };

  const toggleBookmark = (ayahNumber: number) => {
    const newBookmarks = new Set(bookmarkedAyahs);
    if (newBookmarks.has(ayahNumber)) {
      newBookmarks.delete(ayahNumber);
    } else {
      newBookmarks.add(ayahNumber);
    }
    setBookmarkedAyahs(newBookmarks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-2"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-bold text-xl text-white">{surah.name}</h1>
                <p className="text-sm text-green-400 font-medium">
                  {surah.arabicName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-2"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-2"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="container mx-auto px-4 py-6">
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-6 items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-300">
                    Font Size:
                  </label>
                  <div className="flex items-center gap-3 bg-gray-700/50 rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                      className="text-white hover:bg-white/10 h-8 w-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-sm min-w-[3rem] text-center text-green-400 font-medium">
                      {fontSize}px
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFontSize(Math.min(28, fontSize + 2))}
                      className="text-white hover:bg-white/10 h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  variant={showTranslation ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowTranslation(!showTranslation)}
                  className={
                    showTranslation
                      ? "bg-green-600 hover:bg-green-700 text-white border-0"
                      : "border-gray-600 text-gray-300 hover:bg-white/10"
                  }
                >
                  Translation
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Button className="bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg">
                  <Play className="w-4 h-4 mr-2" />
                  Play Audio
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {surah.ayahs.map((ayah) => (
            <Card
              key={ayah.number}
              className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.01] group"
            >
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Enhanced Ayah Number and Controls */}
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {ayah.number}
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </div>

                    <div className="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(ayah.number)}
                        className={`text-white hover:bg-white/10 p-2 transition-colors duration-200 ${
                          bookmarkedAyahs.has(ayah.number)
                            ? "text-yellow-400 hover:text-yellow-300"
                            : ""
                        }`}
                      >
                        <Bookmark
                          className="w-5 h-5"
                          fill={
                            bookmarkedAyahs.has(ayah.number)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/10 p-2"
                      >
                        <Volume2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Enhanced Arabic Text */}
                  <div className="text-right bg-gray-900/30 rounded-2xl p-8 border border-gray-700/30">
                    <p
                      className="leading-relaxed text-white font-arabic drop-shadow-lg"
                      style={{
                        fontSize: `${fontSize + 6}px`,
                        fontFamily: "Amiri, serif",
                        lineHeight: "2.2",
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      {ayah.arabic}
                    </p>
                  </div>

                  {/* Enhanced Translation and Transliteration */}
                  {showTranslation && (
                    <div className="space-y-4 pt-2">
                      <div className="bg-green-900/20 rounded-xl p-6 border border-green-700/20">
                        <p
                          className="text-green-300 leading-relaxed italic font-medium mb-4"
                          style={{ fontSize: `${fontSize - 1}px` }}
                        >
                          {ayah.transliteration}
                        </p>
                        <p
                          className="leading-relaxed text-gray-100"
                          style={{ fontSize: `${fontSize}px` }}
                        >
                          {ayah.translation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Enhanced Bottom Navigation */}
      <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button className="bg-gray-800/50 hover:bg-gray-700/50 text-white border-gray-700 shadow-lg">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Surah
            </Button>

            <div className="text-center bg-gray-800/30 rounded-lg px-4 py-2">
              <p className="text-sm text-gray-300">
                Ayah{" "}
                <span className="text-green-400 font-bold">{currentAyah}</span>{" "}
                of{" "}
                <span className="text-green-400 font-bold">
                  {surah.totalAyahs}
                </span>
              </p>
            </div>

            <Button className="bg-gray-800/50 hover:bg-gray-700/50 text-white border-gray-700 shadow-lg">
              Next Surah
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
