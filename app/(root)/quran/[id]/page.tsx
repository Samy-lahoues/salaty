"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";
import { Mic, BookmarkMinus, Headphones, Play, Pause } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import QuranCard from "@/components/ui/quran/QuranCard";
import OptionCard from "@/components/ui/quran/OptionCard";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQuran } from "@/hooks/useQuran";
import { toast } from "@/hooks/useToast";
import { recitersNames } from "@/lib/translations";

const Page = () => {
  const params = useParams();
  const { id } = params;
  const { t, isRTL } = useTranslation();
  const { fetchSurah, surah, reciter, loading, error } = useQuran();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string>("");
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  // Request notification permission on component mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Fetch surah data
  useEffect(() => {
    const surahId = Number(id);
    if (surahId && surahId > 0 && surahId <= 114) {
      fetchSurah(surahId);
    }
  }, [id, fetchSurah]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const playSurah = useCallback(async () => {
    if (!audioRef.current || !surah?.audio) {
      setAudioError(t("noAudioAvailable") || "No audio available");
      return;
    }

    try {
      setIsLoadingAudio(true);
      setAudioError("");

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Only set src if it's different to avoid reloading
        if (audioRef.current.src !== surah.audio) {
          audioRef.current.src = surah.audio;
        }

        audioRef.current.volume = 1;
        await audioRef.current.play();
        setIsPlaying(true);

        // Show notification if permitted
        if ("Notification" in window && Notification.permission === "granted") {
          const title = isRTL
            ? `تشغيل ${surah.arabicName}`
            : `Playing ${surah.englishName}`;

          const body = isRTL
            ? `القارئ ${recitersNames(isRTL)[Number(reciter) - 1] || ""}`
            : `Reciter ${recitersNames(isRTL)[Number(reciter) - 1] || ""}`;

          new Notification(title, {
            body,
            icon: "/salaty.svg",
          });
        }
      }
    } catch (error) {
      console.error("Error playing surah:", error);
      setAudioError(t("audioPlaybackError") || "Error playing audio");
      setIsPlaying(false);
    } finally {
      setIsLoadingAudio(false);
    }
  }, [isPlaying, surah, isRTL, reciter, t]);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
    toast({
      title: t("surahFinished") || "Surah Finished",
      description:
        t("surahFinishedDescription") || "The surah has finished playing",
      variant: "success",
    });
  }, [t]);

  const handleAudioError = useCallback(() => {
    setIsPlaying(false);
    setIsLoadingAudio(false);
    setAudioError(t("audioLoadError") || "Failed to load audio");
  }, [t]);

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("loading") || "Loading..."}</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !surah) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error || t("surahNotFound") || "Surah not found"}
          </p>
          <Button onClick={() => window.history.back()} variant="outline">
            {t("goBack") || "Go Back"}
          </Button>
        </div>
      </div>
    );
  }
  const handleReadQuran = (lang: "en" | "ar" | "aren") => {
    router.push(`/quran/${id}/read/${lang}`);
  };

  const handleListenQuran = (lang: "en" | "ar") => {
    router.push(`/quran/${id}/listen/${lang}`);
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Hidden audio element with event handlers */}
      <audio
        ref={audioRef}
        preload="metadata"
        onEnded={handleAudioEnded}
        onError={handleAudioError}
        onLoadStart={() => setIsLoadingAudio(true)}
        onCanPlay={() => setIsLoadingAudio(false)}
      />

      <Card className="bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.4)] rounded-2xl md:mt-16">
        <CardContent>
          <div className="h-44 rounded-xl bg-cover bg-[url(/surah-bg.png)] overflow-hidden px-4 py-2 md:px-5 md:py-3 flex">
            <div className="w-full flex-between">
              <div className="space-y-1">
                <p className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-white" />
                  <span>{t("lastRead")}</span>
                </p>
                <div className="space-y-1 mt-2 mb-3">
                  <h2 className="font-bold text-2xl text-white">
                    {isRTL ? surah.arabicName : surah.englishName}
                  </h2>
                  <p className="text-sm text-white font-medium">
                    {t("ayahNumber")}: {surah.totalAyah}
                  </p>
                </div>

                <Button
                  onClick={playSurah}
                  disabled={isLoadingAudio || !surah.audio}
                  className="rounded-xl flex items-center gap-2 font-semibold px-4 py-2 bg-white hover:bg-gray-300 text-black transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingAudio ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-black"></div>
                      {t("loading")}
                    </>
                  ) : (
                    <>
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          {t("pauseSurah") || "Pause"}
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          {t("playSurah")}
                        </>
                      )}
                    </>
                  )}
                </Button>

                {/* Error message */}
                {audioError && (
                  <p className="text-red-400 text-xs mt-1">{audioError}</p>
                )}
              </div>
              <div>
                <Image
                  width={141}
                  height={132}
                  src="/quran-book-open.png"
                  alt="quran-book-img"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <QuranCard
                onClick={() => handleReadQuran("ar")}
                title={t("readQuran")}
                subtitle={t("ar")}
              />
              <QuranCard
                onClick={() => handleReadQuran("en")}
                title={t("readQuran")}
                subtitle={t("en")}
              />
            </div>
            <QuranCard
              onClick={() => handleReadQuran("aren")}
              title={t("readQuran")}
              col={false}
              subtitle={t("aren")}
            />
            <div className="grid grid-cols-2 gap-4">
              <OptionCard
                onClick={() => {
                  router.push(`/quran/${id}/podcast`);
                }}
                title={t("podcast")}
                Icon={Mic}
              />
              <OptionCard
                onClick={() => {
                  router.push(`/quran/${id}/notes`);
                }}
                title={t("notes")}
                Icon={BookmarkMinus}
              />
              <OptionCard
                onClick={() => handleListenQuran("ar")}
                title={t("listenQuran")}
                subtitle={t("ar")}
                Icon={Headphones}
              />
              <OptionCard
                onClick={() => handleListenQuran("en")}
                title={t("listenQuran")}
                subtitle={t("en")}
                Icon={Headphones}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
