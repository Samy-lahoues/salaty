"use client";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Clock, RefreshCcw, Volume2, VolumeX } from "lucide-react";
import { Skeleton } from "../skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "../card";
import { Button } from "../button";
import useTranslation from "@/hooks/useTranslation";

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
    const { t, isRTL } = useTranslation();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isAdhanEnabled, setIsAdhanEnabled] = useState(true);
    const [lastPlayedPrayer, setLastPlayedPrayer] = useState<string | null>(
      null,
    );

    // You can customize these adhan audio URLs
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
                  body: `It's time for ${t(prayerName as keyof typeof t)} prayer`,
                  icon: "/icon-192x192.png", // Add your app icon
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
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg"
      >
        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          preload="none"
          onEnded={() => console.log("Adhan finished playing")}
        />

        <CardHeader>
          <div className="flex-between">
            <CardTitle className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
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
                size={"sm"}
                disabled={loading}
                onClick={onRefresh}
                className={`flex items-center gap-2 bg-transparent ${
                  isRTL && "flex-row-reverse"
                }`}
              >
                <RefreshCcw />
                {t("refresh")}
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
                { name: "maghrib", icon: "🌅" },
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
                { name: "asr", time: prayerTimes.Asr, icon: "🌤️" },
                {
                  name: "maghrib",
                  time: prayerTimes.Maghrib,
                  icon: "🌅",
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
                      ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700"
                      : "bg-gray-50 dark:bg-gray-700/50"
                  } ${
                    isAdhanEnabled && prayer.name === nextPrayer
                      ? "ring-2 ring-blue-300 dark:ring-blue-600"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-2xl">{prayer.icon}</span>
                    <span className="font-semibold text-lg text-gray-900 dark:text-white">
                      {t(prayer.name as keyof typeof t)}
                    </span>
                    {isAdhanEnabled && prayer.name === nextPrayer && (
                      <Volume2 className="w-4 h-4 text-blue-600 animate-pulse" />
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
