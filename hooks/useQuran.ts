import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import surahsData from "@/constants/data.json";
import { Surah } from "@/constants";
interface surahTypes {
  arabicName: string;
  englishName: string;
  totalAyah: number;
  surahNo: number;
  englishAyahs: string[];
  arabicAyahs: string[];
  audio: string;
}
type reciterTypes = "1" | "2" | "3" | "4" | "5";
const alIkhlas: surahTypes = {
  arabicName: "سورة الإخلاص",
  englishName: "Al-Ikhlaas",
  totalAyah: 4,
  surahNo: 112,
  englishAyahs: [
    "Say, ˹O Prophet,˺ “He is Allah—One ˹and Indivisible˺;",
    "Allah—the Sustainer ˹needed by all˺.",
    "He has never had offspring, nor was He born.",
    "And there is none comparable to Him.”",
  ],
  arabicAyahs: [
    "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
    "ٱللَّهُ ٱلصَّمَدُ",
    "لَمْ يَلِدْ وَلَمْ يُولَدْ",
    "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
  ],
  audio: "/audio/Data_5_112.mp3",
};
export const useQuran = () => {
  const path = usePathname();
  const isQuran = path === "/quran";
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [surah, setSurah] = useState<surahTypes>(alIkhlas);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reciter] = useState<reciterTypes>("1");

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        setLoading(true);
        // Add IDs to each surah from JSON
        const surahsWithId = surahsData.map((surah, index) => ({
          ...surah,
          id: index + 1,
        }));
        setSurahs(surahsWithId);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };

    if (isQuran) {
      loadSurahs();
    }
  }, [isQuran]);

  const fetchSurah = async (surahNumber: number) => {
    if (surahNumber <= 0 || surahNumber > 114) return;
    const url = `https://quranapi.pages.dev/api/${surahNumber}.json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          "failed to fetch surah number " + surahNumber.toString(),
        );
      }
      const data = await response.json();
      setSurah({
        arabicName: data.surahNameArabicLong,
        englishName: data.surahName,
        totalAyah: data.totalAyah,
        surahNo: data.surahNo,
        englishAyahs: data.english,
        arabicAyahs: data.arabic1,
        audio: data.audio[reciter].url,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return {
    fetchSurah,
    reciter,
    surahs,
    surah,
    loading,
    error,
  };
};
