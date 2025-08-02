import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Surah } from "@/constants";
export const useQuran = () => {
  const path = usePathname();
  const isQuran = path === "/quran";
  const [surahs, setSurahs] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // const [reciter, setReciter] = useState("1")
  const fetchSurahs = async () => {
    const url = "https://quranapi.pages.dev/api/surah.json";
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch surahs");
      }
      const data = await response.json();
      const surahsWithId = data.map((surah: Surah, index: number) => ({
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
  useEffect(() => {
    fetchSurahs();
  }, [isQuran]);
  // const fetchSurah = async (id : number) => {
  //   try {

  //   }catch (e) {
  //     setError(e)
  //   }
  // }
  // const handleReciter = (reciter : number) => {
  //   setReciter(String(reciter))
  // }
  // const playSurah = () => {
  //   return
  // }
  // const playAya = () => {
  //   return;
  // }
  return {
    surahs,
    loading,
    error,
  };
};
