"use client";
import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  ChevronLeft,
  Download,
  Share,
  Repeat,
  Shuffle,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// ----------------- Types -----------------
interface Ayah {
  number: number;
  startTime: number;
  text: string;
  translation: string;
}

interface Surah {
  id: number;
  name: string;
  arabicName: string;
  totalAyahs: number;
  reciter: string;
  duration: string;
  downloadUrl: string;
  ayahs: Ayah[];
}

interface Reciter {
  id: number;
  name: string;
  initials: string;
  active: boolean;
}

type RepeatMode = "none" | "surah" | "ayah";

// ----------------- Component -----------------
const Page: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(45);
  const [duration, setDuration] = useState<number>(135);
  const [volume, setVolume] = useState<number[]>([75]);
  const [currentAyah, setCurrentAyah] = useState<number>(3);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("none");
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const surah: Surah = {
    id: 1,
    name: "Al-Faatiha",
    arabicName: "الفاتحة",
    totalAyahs: 7,
    reciter: "Abdul Rahman Al-Sudais",
    duration: "2:15",
    downloadUrl: "#",
    ayahs: [
      {
        number: 1,
        startTime: 0,
        text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation:
          "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      },
      {
        number: 2,
        startTime: 15,
        text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        translation: "All praise is due to Allah, Lord of the worlds.",
      },
      {
        number: 3,
        startTime: 25,
        text: "الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "The Entirely Merciful, the Especially Merciful.",
      },
      {
        number: 4,
        startTime: 35,
        text: "مَالِكِ يَوْمِ الدِّينِ",
        translation: "Sovereign of the Day of Recompense.",
      },
      {
        number: 5,
        startTime: 45,
        text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translation: "It is You we worship and You we ask for help.",
      },
      {
        number: 6,
        startTime: 60,
        text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        translation: "Guide us to the straight path.",
      },
      {
        number: 7,
        startTime: 75,
        text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        translation:
          "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
      },
    ],
  };

  // const reciters: Reciter[] = [
  //   { id: 1, name: "Abdul Rahman Al-Sudais", initials: "AS", active: true },
  //   { id: 2, name: "Mishary Rashid Alafasy", initials: "MA", active: false },
  //   { id: 3, name: "Saad Al Ghamidi", initials: "SG", active: false },
  //   { id: 4, name: "Maher Al Mueaqly", initials: "MM", active: false },
  // ];

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlayPause = (): void => {
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (newValue: number[]): void => {
    const newTime = (newValue[0] / 100) * duration;
    setCurrentTime(newTime);
  };

  const toggleRepeat = (): void => {
    const modes: RepeatMode[] = ["none", "surah", "ayah"];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-x-hidden">
      {/* ---------- HEADER ---------- */}
      <div className="sticky top-0 z-10 bg-gray-900/90 backdrop-blur-2xl border-b border-gray-800/50 shadow-2xl">
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
                  {surah.reciter}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 transition-colors duration-200 ${
                  isFavorited
                    ? "text-red-400 hover:text-red-300"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isFavorited ? "currentColor" : "none"}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-2"
              >
                <Share className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-2"
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Current Ayah Card */}
          <Card className="bg-gray-800/60 backdrop-blur-xl border-gray-700/50 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-sm text-white font-semibold mb-6 shadow-lg">
                  Ayah {currentAyah} of {surah.totalAyahs}
                </span>
              </div>
              <p
                className="text-3xl font-arabic leading-relaxed mb-6 text-white drop-shadow-lg"
                style={{ fontFamily: "Amiri, serif", lineHeight: "2" }}
              >
                {surah.ayahs[currentAyah - 1]?.text}
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                {surah.ayahs[currentAyah - 1]?.translation}
              </p>
            </CardContent>
          </Card>

          {/* Progress Bar */}
          <div className="space-y-3">
            <Slider
              value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400 font-medium">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 py-4">
            <Button
              variant="ghost"
              size="lg"
              className={`text-white hover:bg-white/10 p-3 transition-all duration-200 ${
                repeatMode !== "none"
                  ? "text-green-400 hover:text-green-300"
                  : ""
              }`}
              onClick={toggleRepeat}
            >
              <Repeat className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 p-3"
            >
              <SkipBack className="w-7 h-7" />
            </Button>

            <Button
              onClick={togglePlayPause}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-2xl border-4 border-green-400/20"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 p-3"
            >
              <SkipForward className="w-7 h-7" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 p-3"
            >
              <Shuffle className="w-6 h-6" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-4 max-w-xs mx-auto bg-gray-800/30 rounded-full px-6 py-3">
            <Volume2 className="w-5 h-5 text-gray-300" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-gray-300 min-w-[3rem] font-medium">
              {volume[0]}%
            </span>
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="metadata" />
    </div>
  );
};

export default Page;
