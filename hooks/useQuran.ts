import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import surahsData from "@/constants/data.json";
import { Surah } from "@/constants";

export const useQuran = () => {
  const path = usePathname();
  const isQuran = path === "/quran";
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  return {
    surahs,
    loading,
    error,
  };
};
