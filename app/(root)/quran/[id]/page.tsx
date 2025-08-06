"use client";
import { useParams } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";
import { Mic, BookmarkMinus, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import QuranCard from "@/components/ui/quran/QuranCard";
import OptionCard from "@/components/ui/quran/OptionCard";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const Page = () => {
  const params = useParams();
  const { id } = params;
  const { t, isRTL } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.4)] rounded-2xl md:mt-16 ">
        <CardContent>
          <div className="h-44 rounded-xl bg-cover bg-[url(/surah-bg.png)] overflow-hidden px-4 py-2 md:px-5 md:py-3 flex">
            <div className="w-full flex-between">
              <div className="space-y-1">
                <p className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-white" />
                  <span>{t("lastRead")}</span>
                </p>
                <div className="space-y-1 mt-2 mb-3">
                  <h2 className="font-bold text-2xl">Yaceen</h2>
                  <p className="text-sm text-white font-medium">
                    {t("ayahNumber")}:{id}
                  </p>
                </div>
                <Button className="rounded-xl flex items-center font-semibold px-4 py-2 bg-white hover:bg-gray-300 text-black transition-colors cursor-pointer">
                  {t("playSurah")}{" "}
                  {!isRTL && (
                    <Image
                      width={12}
                      height={12}
                      src="/play-fill.svg"
                      alt="play-svg"
                    />
                  )}
                </Button>
              </div>
              <div>
                <Image
                  width={141}
                  height={132}
                  src="/quran-book-open.png"
                  alt="quran-book-img"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <QuranCard title={t("readQuran")} subtitle={t("ar")} />
              <QuranCard title={t("readQuran")} subtitle={t("en")} />
            </div>
            <QuranCard
              title={t("readQuran")}
              col={false}
              subtitle={t("aren")}
            />
            <div className="grid grid-cols-2 gap-4">
              <OptionCard title={t("podcast")} Icon={Mic} />
              <OptionCard title={t("notes")} Icon={BookmarkMinus} />
              <OptionCard
                title={t("listenQuran")}
                subtitle={t("ar")}
                Icon={Headphones}
              />
              <OptionCard
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
