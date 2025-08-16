"use client";
import { useState } from "react";
import { ReactNode } from "react";
import {
  Play,
  Download,
  Share,
  Clock,
  User,
  Calendar,
  ChevronLeft,
  Bookmark,
  MessageSquare,
  Filter,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200";
  const variants = {
    default: "bg-green-500 text-white shadow-lg",
    secondary: "bg-gray-700 text-gray-300 hover:bg-gray-600",
    outline:
      "border border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </span>
  );
};

interface Podcast {
  id: number;
  title: string;
  description: string;
  speaker: string;
  duration: string;
  date: string;
  language: string;
  category: string;
  thumbnail: string;
  isPlaying: boolean;
  downloads: number;
  likes: number;
  rating: number;
}

type Category = "All" | "Tafsir" | "Commentary" | "Lectures" | "Stories";
type Language = "All" | "English" | "Arabic" | "Urdu";

const Page = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [activeLanguage, setActiveLanguage] = useState<Language>("All");

  const surah = {
    id: 1,
    name: "Al-Faatiha",
    arabicName: "الفاتحة",
  };

  const podcasts: Podcast[] = [
    {
      id: 1,
      title: "Understanding Al-Faatiha: The Opening",
      description:
        "A comprehensive explanation of the first chapter of the Quran, exploring its meanings, significance, and spiritual depth with detailed analysis of each verse.",
      speaker: "Sheikh Omar Suleiman",
      duration: "45:32",
      date: "2024-01-15",
      language: "English",
      category: "Tafsir",
      thumbnail: "/api/placeholder/120/120",
      isPlaying: false,
      downloads: 1250,
      likes: 89,
      rating: 4.8,
    },
    {
      id: 2,
      title: "The Seven Verses: Deep Dive into Al-Faatiha",
      description:
        "Exploring the linguistic beauty and profound meanings behind each verse of Surah Al-Faatiha with classical and contemporary perspectives.",
      speaker: "Dr. Yasir Qadhi",
      duration: "52:18",
      date: "2024-01-10",
      language: "English",
      category: "Commentary",
      thumbnail: "/api/placeholder/120/120",
      isPlaying: false,
      downloads: 980,
      likes: 67,
      rating: 4.6,
    },
    {
      id: 3,
      title: "شرح سورة الفاتحة",
      description:
        "تفسير مفصل لسورة الفاتحة مع شرح المعاني والحكم الإلهية والدروس المستفادة من كل آية",
      speaker: "الشيخ محمد صالح العثيمين",
      duration: "38:45",
      date: "2024-01-08",
      language: "Arabic",
      category: "Tafsir",
      thumbnail: "/api/placeholder/120/120",
      isPlaying: false,
      downloads: 2100,
      likes: 156,
      rating: 4.9,
    },
    {
      id: 4,
      title: "Al-Faatiha in Daily Life",
      description:
        "How to implement the teachings of Al-Faatiha in our daily prayers and spiritual practice with practical examples and applications.",
      speaker: "Imam Suhaib Webb",
      duration: "29:15",
      date: "2024-01-05",
      language: "English",
      category: "Lectures",
      thumbnail: "/api/placeholder/120/120",
      isPlaying: false,
      downloads: 750,
      likes: 92,
      rating: 4.7,
    },
  ];

  const categories: Category[] = [
    "All",
    "Tafsir",
    "Commentary",
    "Lectures",
    "Stories",
  ];
  const languages: Language[] = ["All", "English", "Arabic", "Urdu"];

  const filteredPodcasts = podcasts.filter((podcast) => {
    const matchesCategory =
      activeFilter === "All" || podcast.category === activeFilter;
    const matchesLanguage =
      activeLanguage === "All" || podcast.language === activeLanguage;
    return matchesCategory && matchesLanguage;
  });

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-10 bg-gray-900/90 backdrop-blur-2xl border-b border-gray-800/50 shadow-2xl">
        <div className="container mx-auto px-4 py-5">
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
                <h1 className="font-bold text-2xl text-white">
                  Podcasts & Commentary
                </h1>
                <p className="text-sm text-green-400 font-medium">
                  {surah.name} - {surah.arabicName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-2"
              >
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Filters */}
          <div className="mb-8 space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-gray-300 flex items-center bg-gray-700/50 px-3 py-2 rounded-lg">
                    Category:
                  </span>
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={
                        activeFilter === category ? "default" : "outline"
                      }
                      className="cursor-pointer hover:scale-105 transition-transform duration-200"
                      onClick={() => setActiveFilter(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-gray-300 flex items-center bg-gray-700/50 px-3 py-2 rounded-lg">
                    Language:
                  </span>
                  {languages.map((language) => (
                    <Badge
                      key={language}
                      variant={
                        activeLanguage === language ? "default" : "outline"
                      }
                      className="cursor-pointer hover:scale-105 transition-transform duration-200"
                      onClick={() => setActiveLanguage(language)}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Podcast Episodes */}
          <div className="space-y-6">
            {filteredPodcasts.map((podcast) => (
              <Card
                key={podcast.id}
                className="bg-gray-800/60 backdrop-blur-xl border-gray-700/50 hover:bg-gray-800/80 transition-all duration-300 shadow-2xl hover:shadow-green-500/10 hover:scale-[1.02] group"
              >
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    {/* Enhanced Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-gradient-to-br from-green-400/30 via-green-500/20 to-green-600/30 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300 border border-green-500/20">
                        <div className="text-white text-center">
                          <MessageSquare className="w-12 h-12 mx-auto mb-2 text-green-300" />
                          <div className="text-xs font-bold text-green-300">
                            {podcast.category}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            ★ {podcast.rating}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-xl text-white mb-2 line-clamp-2 group-hover:text-green-300 transition-colors duration-200">
                            {podcast.title}
                          </h3>
                          <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                            {podcast.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/10 p-2"
                          >
                            <Bookmark className="w-5 h-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/10 p-2"
                          >
                            <Share className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>

                      {/* Enhanced Speaker and metadata */}
                      <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                          <User className="w-4 h-4 text-green-400" />
                          <span className="text-white font-medium">
                            {podcast.speaker}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                          <Clock className="w-4 h-4 text-green-400" />
                          <span className="text-white font-medium">
                            {podcast.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                          <Calendar className="w-4 h-4 text-green-400" />
                          <span className="text-white font-medium">
                            {formatDate(podcast.date)}
                          </span>
                        </div>
                      </div>

                      {/* Enhanced Tags */}
                      <div className="flex items-center gap-3 mb-6">
                        <Badge
                          variant="secondary"
                          className="text-sm font-semibold"
                        >
                          {podcast.category}
                        </Badge>
                        <Badge variant="outline" className="text-sm">
                          {podcast.language}
                        </Badge>
                      </div>

                      {/* Enhanced Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl hover:scale-105 transition-all duration-200 px-6">
                            <Play className="w-5 h-5 mr-2" />
                            Play Episode
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-200"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-2 rounded-lg">
                            <Download className="w-4 h-4" />
                            <span className="font-medium">
                              {formatNumber(podcast.downloads)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-2 rounded-lg">
                            <Heart className="w-4 h-4" />
                            <span className="font-medium">{podcast.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button className="bg-gray-800/50 hover:bg-gray-700/50 text-white border-gray-700 px-8 py-3 rounded-xl shadow-xl hover:scale-105 transition-all duration-200">
              Load More Episodes
            </Button>
          </div>

          {/* Enhanced Featured Commentary Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Featured Commentary
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-xl border-blue-700/30 hover:scale-105 transition-all duration-300 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                      <MessageSquare className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-bold text-2xl mb-4 text-white">
                      Classical Tafsir
                    </h3>
                    <p className="text-blue-200 text-lg mb-6 leading-relaxed">
                      Explore traditional interpretations from renowned scholars
                      like Ibn Kathir and Al-Tabari
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:scale-105 transition-all duration-200 py-3">
                      Browse Classical Commentary
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-xl border-purple-700/30 hover:scale-105 transition-all duration-300 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-bold text-2xl mb-4 text-white">
                      Contemporary Scholars
                    </h3>
                    <p className="text-purple-200 text-lg mb-6 leading-relaxed">
                      Modern interpretations and reflections from today&apos;s
                      Islamic scholars
                    </p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-xl hover:scale-105 transition-all duration-200 py-3">
                      Explore Modern Commentary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
