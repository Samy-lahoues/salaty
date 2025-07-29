import useTranslation from "@/hooks/useTranslation";
import { Card, CardContent } from "./card";
import { Calendar } from "lucide-react";
import type { DateInfo } from "@/hooks/usePrayerTimes";
import { translations } from "@/lib/translations";

interface DateHeaderProps {
  dateInfo: DateInfo | null;
}

const DateHeader = ({ dateInfo = null }: DateHeaderProps) => {
  const { language, t } = useTranslation();
  const isRTL = language === "ar";

  if (!dateInfo) return null;

  // Helper function to get translated month names
  const getGregorianMonth = (monthName: string) => {
    const monthMap: Record<string, keyof (typeof translations)["en"]> = {
      Jan: "january",
      January: "january",
      Feb: "february",
      February: "february",
      Mar: "march",
      March: "march",
      Apr: "april",
      April: "april",
      May: "may",
      Jun: "june",
      June: "june",
      Jul: "july",
      July: "july",
      Aug: "august",
      August: "august",
      Sep: "september",
      September: "september",
      Oct: "october",
      October: "october",
      Nov: "november",
      November: "november",
      Dec: "december",
      December: "december",
    };
    return monthMap[monthName] ? t(monthMap[monthName]) : monthName;
  };

  const getHijriMonth = (monthName: string) => {
    const hijriMonthMap: Record<string, keyof (typeof translations)["en"]> = {
      Muharram: "muharram",
      Safar: "safar",
      "Rabi' al-awwal": "rabiAlAwwal",
      "Rabi' al-thani": "rabiAlThani",
      "Jumada al-awwal": "jumadaAlAwwal",
      "Jumada al-thani": "jumadaAlThani",
      Rajab: "rajab",
      "Sha'ban": "shaban",
      Ramadan: "ramadan",
      Shawwal: "shawwal",
      "Dhu al-Qi'dah": "dhuAlQadah",
      "Dhu al-Hijjah": "dhuAlHijjah",
    };
    return hijriMonthMap[monthName] ? t(hijriMonthMap[monthName]) : monthName;
  };

  const getWeekday = (weekdayName: string) => {
    const weekdayMap: Record<string, keyof (typeof translations)["en"]> = {
      Monday: "monday",
      Tuesday: "tuesday",
      Wednesday: "wednesday",
      Thursday: "thursday",
      Friday: "friday",
      Saturday: "saturday",
      Sunday: "sunday",
    };
    return weekdayMap[weekdayName] ? t(weekdayMap[weekdayName]) : weekdayName;
  };

  return (
    <Card className="mb-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="pt-2 sm:pt-4">
        <div className="flex-center gap-4 text-center">
          <div
            className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <div>
              <div
                className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <Calendar className="w-5 h-5 text-blue-500" />
                <h2
                  className={`text-lg font-semibold text-gray-900 dark:text-white ${isRTL ? "arabic-text" : "english-text"}`}
                >
                  {isRTL ? (
                    <>
                      {dateInfo.gregorian.weekday.ar ||
                        getWeekday(dateInfo.gregorian.weekday.en)}
                      ، {dateInfo.gregorian.day}{" "}
                      {dateInfo.gregorian.month.ar ||
                        getGregorianMonth(dateInfo.gregorian.month.en)}{" "}
                      {dateInfo.gregorian.year}
                    </>
                  ) : (
                    <>
                      {getWeekday(dateInfo.gregorian.weekday.en)},{" "}
                      {getGregorianMonth(dateInfo.gregorian.month.en)}{" "}
                      {dateInfo.gregorian.day}, {dateInfo.gregorian.year}
                    </>
                  )}
                </h2>
              </div>
              <p
                className={`text-sm text-gray-600 dark:text-gray-300 ${isRTL ? "arabic-text" : "english-text"}`}
              >
                {isRTL ? (
                  <>
                    {dateInfo.hijri.day}{" "}
                    {dateInfo.hijri.month.ar ||
                      getHijriMonth(dateInfo.hijri.month.en)}{" "}
                    {dateInfo.hijri.year} هـ
                  </>
                ) : (
                  <>
                    {dateInfo.hijri.day}{" "}
                    {getHijriMonth(dateInfo.hijri.month.en)}{" "}
                    {dateInfo.hijri.year} AH
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateHeader;
