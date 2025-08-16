"use client";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTheme } from "@/hooks/useTheme";
import { RefreshCcw, Volume2, VolumeX } from "lucide-react";
import { Skeleton } from "../skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "../card";
import { Button } from "../button";
import { toast } from "@/hooks/useToast";

import useTranslation from "@/hooks/useTranslation";
import useIsMobile from "@/hooks/useIsMobile";
interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface PrayerTimesCardProps {
  prayerTimes: PrayerTimes | null;
  loading: boolean;
  onRefresh: () => void;
}

const PrayerTimesCard = forwardRef<HTMLDivElement, PrayerTimesCardProps>(
  ({ prayerTimes, loading, onRefresh }, ref) => {
    const isMobile = useIsMobile();
    const { t, isRTL } = useTranslation();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isAdhanEnabled, setIsAdhanEnabled] = useState(true);
    const [lastPlayedPrayer, setLastPlayedPrayer] = useState<string | null>(
      null,
    );
    const { theme } = useTheme();
    const adhanAudioUrls = useMemo(
      () => ({
        fajr: "/audio/adhan-fajr.mp3", // Different adhan for Fajr
        default: "/audio/adhan.mp3", // Default adhan for other prayers
      }),
      [],
    );

    const formatTime = (time: string, isRTL: boolean) => {
      const [hours, minutes] = time.split(":");
      const hour = Number.parseInt(hours);
      const ampm = hour >= 12 ? " PM" : " AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes}${!isRTL ? ampm : ""}`;
    };

    const getCurrentPrayer = () => {
      if (!prayerTimes) return null;
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      const prayers = [
        { name: "fajr", time: prayerTimes.Fajr },
        { name: "dhuhr", time: prayerTimes.Dhuhr },
        { name: "asr", time: prayerTimes.Asr },
        { name: "maghrib", time: prayerTimes.Maghrib },
        { name: "isha", time: prayerTimes.Isha },
      ];
      for (let i = 0; i < prayers.length; i++) {
        const [hours, minutes] = prayers[i].time.split(":");
        const prayerTime = Number(hours) * 60 + Number(minutes);
        if (currentTime < prayerTime) {
          return prayers[i].name;
        }
      }
      return "fajr";
    };

    const playAdhan = useCallback(
      async (prayerName: string) => {
        try {
          if (audioRef.current) {
            // Choose appropriate adhan audio
            const audioUrl =
              prayerName === "fajr"
                ? adhanAudioUrls.fajr
                : adhanAudioUrls.default;

            audioRef.current.src = audioUrl;
            audioRef.current.volume = 0.7; // Adjust volume as needed

            // Request permission for audio playback (required by browsers)
            await audioRef.current.play();

            // Show notification if supported
            if (
              "Notification" in window &&
              Notification.permission === "granted"
            ) {
              new Notification(
                `${t(prayerName as keyof typeof t)} Prayer Time`,
                {
                  body: `It's time for ${t(
                    prayerName as keyof typeof t,
                  )} prayer`,
                  icon: "/salaty.svg", // Add your app icon
                },
              );
            }
          }
        } catch (error) {
          console.error("Error playing adhan:", error);
          // Fallback: show alert if audio fails
          alert(`${t(prayerName as keyof typeof t)} Prayer Time!`);
        }
      },
      [t, adhanAudioUrls],
    );

    const checkPrayerTime = useCallback(() => {
      if (!prayerTimes || !isAdhanEnabled) return;

      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();

      const prayers = [
        { name: "fajr", time: prayerTimes.Fajr },
        { name: "dhuhr", time: prayerTimes.Dhuhr },
        { name: "asr", time: prayerTimes.Asr },
        { name: "maghrib", time: prayerTimes.Maghrib },
        { name: "isha", time: prayerTimes.Isha },
      ];

      prayers.forEach((prayer) => {
        const [hours, minutes] = prayer.time.split(":");
        const prayerHours = Number(hours);
        const prayerMinutes = Number(minutes);

        // Check if it's exactly prayer time (within the same minute and we haven't played it yet)
        if (
          currentHours === prayerHours &&
          currentMinutes === prayerMinutes &&
          currentSeconds < 10 && // Play only in the first 10 seconds of the minute
          lastPlayedPrayer !== `${prayer.name}-${hours}:${minutes}`
        ) {
          playAdhan(prayer.name);
          setLastPlayedPrayer(`${prayer.name}-${hours}:${minutes}`);
        }
      });
    }, [prayerTimes, isAdhanEnabled, lastPlayedPrayer, playAdhan]);

    const stopAdhan = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };

    const toggleAdhan = () => {
      setIsAdhanEnabled(!isAdhanEnabled);
      if (!isAdhanEnabled) {
        stopAdhan();
      }
    };

    // Request notification permission on component mount
    useEffect(() => {
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    }, []);

    // Set up interval to check prayer times every second
    useEffect(() => {
      const interval = setInterval(checkPrayerTime, 1000);
      return () => clearInterval(interval);
    }, [checkPrayerTime]);

    // Reset lastPlayedPrayer daily
    useEffect(() => {
      const resetDaily = () => {
        setLastPlayedPrayer(null);
      };

      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const timeUntilMidnight = tomorrow.getTime() - now.getTime();
      const timeout = setTimeout(() => {
        resetDaily();
        // Set up daily interval
        setInterval(resetDaily, 24 * 60 * 60 * 1000);
      }, timeUntilMidnight);

      return () => clearTimeout(timeout);
    }, []);

    const nextPrayer = getCurrentPrayer();

    return (
      <Card
        ref={ref}
        className="bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.4)]  rounded-2xl"
      >
        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          preload="none"
          onEnded={() => {
            toast({
              title: t("adhanFinished"),
              description: t("adhanFinishedDescription"),
              variant: "success",
            });
          }}
        />

        <CardHeader>
          <div className="flex-between">
            <CardTitle className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                id="Prayer-Times-Fill--Streamline-Outlined-Fill-Material"
                height="24"
                width="24"
              >
                <desc>
                  Prayer Times Fill Streamline Icon: https://streamlinehq.com
                </desc>
                <path
                  fill={theme === "dark" ? "#05df72" : "#05df72"}
                  d="m12.0249 23.2749 -3.375 -3.275h-4.65v-4.65l-3.35 -3.35 3.35 -3.35v-4.65h4.65l3.375 -3.35 3.325 3.35h4.65v4.65l3.35 3.35 -3.35 3.35v4.65h-4.65l-3.325 3.275Zm1 -11.775 1.475 -1.075 1.45 1.075 -0.575 -1.7 1.475 -1.075h-1.8l-0.55 -1.725 -0.55 1.725h-1.825l1.475 1.075 -0.575 1.7Zm-1.025 5.5c1.38335 0 2.5625 -0.48335 3.5375 -1.45 0.975 -0.96665 1.4625 -2.15 1.4625 -3.55 0 -0.13335 -0.00415 -0.26665 -0.0125 -0.4 -0.00835 -0.13335 -0.02915 -0.26665 -0.0625 -0.4 -0.18335 0.78335 -0.59165 1.42915 -1.225 1.9375 -0.63335 0.50835 -1.375 0.7625 -2.225 0.7625 -1 0 -1.84165 -0.34165 -2.525 -1.025 -0.68335 -0.68335 -1.025 -1.525 -1.025 -2.525 0 -0.76665 0.21665 -1.45415 0.65 -2.0625s1 -1.0375 1.7 -1.2875h-0.275c-1.4 0 -2.58335 0.4875 -3.55 1.4625 -0.96665 0.975 -1.45 2.15415 -1.45 3.5375 0 1.4 0.48335 2.58335 1.45 3.55s2.15 1.45 3.55 1.45Z"
                  strokeWidth="0.5"
                ></path>
              </svg>
              <span className="truncate">
                {t("prayerTimes") || "Prayer Times"}
              </span>
            </CardTitle>
            <div className="flex gap-2 sm:gap-3">
              {/* Adhan toggle button */}
              <Button
                variant={isAdhanEnabled ? "default" : "outline"}
                size="icon"
                onClick={toggleAdhan}
                title={isAdhanEnabled ? "Disable Adhan" : "Enable Adhan"}
              >
                {isAdhanEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>

              <Button
                variant={"outline"}
                size={isMobile ? "icon" : "sm"}
                disabled={loading}
                onClick={onRefresh}
                className={`flex items-center gap-2 bg-transparent ${
                  isRTL && "flex-row-reverse"
                }`}
                aria-label="refresh button"
              >
                <RefreshCcw className={isMobile ? "w-4 h-4" : ""} />
                {!isMobile && t("refresh")}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid gap-4">
              {[
                { name: "fajr", icon: "🌅" },
                { name: "dhuhr", icon: "☀️" },
                { name: "asr", icon: "🌤️" },
                { name: "maghrib", icon: "🌄" },
                { name: "isha", icon: "🌙" },
              ].map((prayer) => (
                <div
                  key={prayer.name}
                  className={`flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex items-center gap-3 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="text-2xl">{prayer.icon}</span>
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          ) : prayerTimes ? (
            <div className="grid gap-4">
              {[
                {
                  name: "fajr",
                  time: prayerTimes.Fajr,
                  icon: "🌅",
                },
                {
                  name: "dhuhr",
                  time: prayerTimes.Dhuhr,
                  icon: "☀️",
                },
                {
                  name: "asr",
                  time: prayerTimes.Asr,
                  icon: "🌤️",
                },
                {
                  name: "maghrib",
                  time: prayerTimes.Maghrib,
                  icon: "🌄",
                },
                {
                  name: "isha",
                  time: prayerTimes.Isha,
                  icon: "🌙",
                },
              ].map((prayer, index) => (
                <div
                  key={index}
                  className={`flex-between p-3 sm:p-4 rounded-lg transition-colors ${
                    prayer.name === nextPrayer
                      ? "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700"
                      : "bg-gray-50 dark:bg-gray-700/50"
                  } ${
                    isAdhanEnabled && prayer.name === nextPrayer
                      ? "ring-2 ring-green-300 dark:ring-ring"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-2xl">{prayer.icon}</span>
                    <span className="font-semibold text-lg text-gray-900 dark:text-white">
                      {t(prayer.name as keyof typeof t)}
                    </span>
                    {isAdhanEnabled && prayer.name === nextPrayer && (
                      <Volume2 className="w-4 h-4 text-green-600 animate-pulse" />
                    )}
                  </div>
                  <span className="text-xl font-mono font-bold text-gray-900 dark:text-white">
                    {formatTime(prayer.time, isRTL)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No prayer times available.
            </div>
          )}

          {/* Adhan status indicator */}
          {isAdhanEnabled && (
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              🔔 Adhan notifications enabled
            </div>
          )}
        </CardContent>
      </Card>
    );
  },
);

PrayerTimesCard.displayName = "PrayerTimesCard";

export default PrayerTimesCard;
