"use client";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { gregorianToHijri, hijriToGregorian } from "@tabby_ai/hijri-converter";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

class HijriDate {
  year: number;
  month: number;
  day: number;

  constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  static fromGregorian(gregorianDate: Date): HijriDate {
    const hijri = gregorianToHijri({
      year: gregorianDate.getFullYear(),
      month: gregorianDate.getMonth() + 1,
      day: gregorianDate.getDate(),
    });
    return new HijriDate(hijri.year, hijri.month, hijri.day);
  }

  static toGregorian(hijriDate: HijriDate): Date {
    const gregorian = hijriToGregorian({
      year: hijriDate.year,
      month: hijriDate.month,
      day: hijriDate.day,
    });
    return new Date(gregorian.year, gregorian.month - 1, gregorian.day);
  }

  addMonths(months: number): HijriDate {
    let newMonth = this.month + months;
    let newYear = this.year;

    while (newMonth > 12) {
      newMonth -= 12;
      newYear++;
    }

    while (newMonth < 1) {
      newMonth += 12;
      newYear--;
    }

    return new HijriDate(
      newYear,
      newMonth,
      Math.min(this.day, this.getDaysInMonth(newYear, newMonth)),
    );
  }

  getDaysInMonth(year?: number, month?: number): number {
    const y = year || this.year;
    const m = month || this.month;

    // Basic Hijri month lengths (alternating 30/29 days with leap year adjustments)
    // This is a simplified implementation
    const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];

    // Basic leap year calculation for Hijri calendar
    const isLeapYear = (y * 11 + 14) % 30 < 11;

    if (m === 12 && isLeapYear) {
      return 30; // Leap year adds day to last month
    }

    return monthLengths[m - 1];
  }

  format(isRTL: boolean = true): string {
    const monthNamesArabic = [
      "محرم",
      "صفر",
      "ربيع الأول",
      "ربيع الثاني",
      "جمادى الأولى",
      "جمادى الثانية",
      "رجب",
      "شعبان",
      "رمضان",
      "شوال",
      "ذو القعدة",
      "ذو الحجة",
    ];

    const monthNamesEnglish = [
      "Muharram",
      "Safar",
      "Rabi' al-Awwal",
      "Rabi' al-Thani",
      "Jumada al-Awwal",
      "Jumada al-Thani",
      "Rajab",
      "Sha'ban",
      "Ramadan",
      "Shawwal",
      "Dhu al-Qi'dah",
      "Dhu al-Hijjah",
    ];

    const monthNames = isRTL ? monthNamesArabic : monthNamesEnglish;
    return `${this.day} ${monthNames[this.month - 1]} ${this.year}`;
  }

  isSame(other: HijriDate): boolean {
    return (
      this.year === other.year &&
      this.month === other.month &&
      this.day === other.day
    );
  }
}

interface HijriCalendarProps {
  className?: string;
  selected?: { from?: Date; to?: Date };
  onSelect?: (range: { from?: Date; to?: Date }) => void;
  showDoubleCalendar?: boolean;
  buttonVariant?: "ghost" | "outline" | "secondary";
  isRTL?: boolean;
}

function HijriCalendar({
  className,
  selected,
  onSelect,
  showDoubleCalendar = true,
  buttonVariant = "ghost",
  isRTL = true,
}: HijriCalendarProps) {
  const today = new Date();
  const todayHijri = HijriDate.fromGregorian(today);

  const [currentMonth, setCurrentMonth] = useState(todayHijri);
  const [hoveredDate, setHoveredDate] = useState<HijriDate | null>(null);

  const getMonthNames = () =>
    isRTL
      ? [
          "محرم",
          "صفر",
          "ربيع الأول",
          "ربيع الثاني",
          "جمادى الأولى",
          "جمادى الثانية",
          "رجب",
          "شعبان",
          "رمضان",
          "شوال",
          "ذو القعدة",
          "ذو الحجة",
        ]
      : [
          "Muharram",
          "Safar",
          "Rabi' al-Awwal",
          "Rabi' al-Thani",
          "Jumada al-Awwal",
          "Jumada al-Thani",
          "Rajab",
          "Sha'ban",
          "Ramadan",
          "Shawwal",
          "Dhu al-Qi'dah",
          "Dhu al-Hijjah",
        ];

  const getWeekDays = () =>
    isRTL
      ? ["ح", "ن", "ث", "ر", "خ", "ج", "س"]
      : ["S", "M", "T", "W", "T", "F", "S"];

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => prev.addMonths(direction === "next" ? 1 : -1));
  };

  const generateCalendarDays = (month: HijriDate) => {
    const firstDay = new HijriDate(month.year, month.month, 1);
    const firstDayGregorian = HijriDate.toGregorian(firstDay);
    let startOfWeek = firstDayGregorian.getDay(); // 0 = Sunday

    // Adjust for RTL/LTR week start
    if (isRTL) {
      // In Arabic calendar, week starts from Saturday (6)
      startOfWeek = (startOfWeek + 1) % 7;
    }
    // For LTR (English), keep Sunday as start (no adjustment needed)

    const daysInMonth = month.getDaysInMonth();
    const prevMonth = month.addMonths(-1);
    const daysInPrevMonth = prevMonth.getDaysInMonth();

    const days: Array<{
      hijriDate: HijriDate;
      gregorianDate: Date;
      isCurrentMonth: boolean;
      isToday: boolean;
    }> = [];

    // Previous month's trailing days
    for (let i = startOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const hijriDate = new HijriDate(prevMonth.year, prevMonth.month, day);
      days.push({
        hijriDate,
        gregorianDate: HijriDate.toGregorian(hijriDate),
        isCurrentMonth: false,
        isToday: hijriDate.isSame(todayHijri),
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const hijriDate = new HijriDate(month.year, month.month, day);
      days.push({
        hijriDate,
        gregorianDate: HijriDate.toGregorian(hijriDate),
        isCurrentMonth: true,
        isToday: hijriDate.isSame(todayHijri),
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    const nextMonth = month.addMonths(1);
    for (let day = 1; day <= remainingDays; day++) {
      const hijriDate = new HijriDate(nextMonth.year, nextMonth.month, day);
      days.push({
        hijriDate,
        gregorianDate: HijriDate.toGregorian(hijriDate),
        isCurrentMonth: false,
        isToday: hijriDate.isSame(todayHijri),
      });
    }

    return days;
  };

  const handleDateClick = (gregorianDate: Date) => {
    if (!onSelect) return;

    if (!selected?.from || (selected.from && selected.to)) {
      // Start new selection
      onSelect({ from: gregorianDate, to: undefined });
    } else {
      // Complete selection
      if (gregorianDate < selected.from) {
        onSelect({ from: gregorianDate, to: selected.from });
      } else {
        onSelect({ from: selected.from, to: gregorianDate });
      }
    }
  };

  const isDateInRange = (date: Date): boolean => {
    if (!selected?.from) return false;
    if (!selected.to && !hoveredDate)
      return date.getTime() === selected.from.getTime();

    const endDate =
      selected.to ||
      (hoveredDate ? HijriDate.toGregorian(hoveredDate) : selected.from);
    const start = selected.from < endDate ? selected.from : endDate;
    const end = selected.from < endDate ? endDate : selected.from;

    return date >= start && date <= end;
  };

  const isRangeStart = (date: Date): boolean => {
    if (!selected?.from) return false;
    if (!selected.to && !hoveredDate)
      return date.getTime() === selected.from.getTime();

    const endDate =
      selected.to ||
      (hoveredDate ? HijriDate.toGregorian(hoveredDate) : selected.from);
    const start = selected.from < endDate ? selected.from : endDate;

    return date.getTime() === start.getTime();
  };

  const isRangeEnd = (date: Date): boolean => {
    if (!selected?.from || (!selected.to && !hoveredDate)) return false;

    const endDate =
      selected.to ||
      (hoveredDate ? HijriDate.toGregorian(hoveredDate) : selected.from);
    const end = selected.from < endDate ? endDate : selected.from;

    return date.getTime() === end.getTime();
  };

  const renderCalendar = (month: HijriDate, isSecondary = false) => {
    const days = generateCalendarDays(month);

    return (
      <div className={cn("flex flex-col w-full gap-4", isRTL && "rtl")}>
        {/* Header */}
        <div className="flex items-center justify-between">
          {!isSecondary && (
            <Button
              variant={buttonVariant}
              size="icon"
              onClick={() => navigateMonth("prev")}
              className="size-8"
              aria-label="previous month"
            >
              {isRTL ? (
                <ChevronRightIcon className="size-4" />
              ) : (
                <ChevronLeftIcon className="size-4" />
              )}
            </Button>
          )}

          <div className="flex-1 text-center">
            <h2
              className={cn(
                "text-sm font-medium",
                isRTL ? "font-arabic" : "font-sans",
              )}
            >
              {getMonthNames()[month.month - 1]} {month.year}
            </h2>
          </div>

          {(!showDoubleCalendar || isSecondary) && (
            <Button
              variant={buttonVariant}
              size="icon"
              onClick={() => navigateMonth("next")}
              className="size-8"
              aria-label="next month"
            >
              {isRTL ? (
                <ChevronLeftIcon className="size-4" />
              ) : (
                <ChevronRightIcon className="size-4" />
              )}
            </Button>
          )}
        </div>

        {/* Week days header */}
        <div className="flex w-full">
          {getWeekDays().map((day, index) => (
            <div
              key={index}
              className={cn(
                "flex-1 text-center text-xs font-medium text-muted-foreground p-2",
                isRTL ? "font-arabic" : "font-sans",
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((dayData, index) => {
            const isInRange = isDateInRange(dayData.gregorianDate);
            const isStart = isRangeStart(dayData.gregorianDate);
            const isEnd = isRangeEnd(dayData.gregorianDate);

            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => handleDateClick(dayData.gregorianDate)}
                onMouseEnter={() => setHoveredDate(dayData.hijriDate)}
                onMouseLeave={() => setHoveredDate(null)}
                className={cn(
                  "h-8 w-full p-0 font-normal text-sm hover:bg-green-700",
                  !dayData.isCurrentMonth && "text-muted-foreground opacity-50",
                  dayData.isToday &&
                    "bg-green-700 text-accent-foreground font-medium",
                  isInRange && "bg-primary/20",
                  (isStart || isEnd) && "bg-primary text-primary-foreground",
                  isStart &&
                    !isEnd &&
                    (isRTL ? "rounded-l-none" : "rounded-r-none"),
                  isEnd &&
                    !isStart &&
                    (isRTL ? "rounded-r-none" : "rounded-l-none"),
                  isInRange && !isStart && !isEnd && "rounded-none",
                  isRTL ? "font-arabic" : "font-sans",
                )}
                disabled={!dayData.isCurrentMonth}
              >
                {dayData.hijriDate.day}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "bg-transparent p-4 rounded-lg",
        showDoubleCalendar ? "flex gap-8" : "w-full",
        isRTL ? "rtl" : "ltr",
        className,
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {renderCalendar(currentMonth)}
      {showDoubleCalendar && renderCalendar(currentMonth.addMonths(1), true)}
    </div>
  );
}

// Example usage component
function HijriCalendarExample() {
  const [selectedRange, setSelectedRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});

  const [isRTL, setIsRTL] = useState(true);

  return (
    <div className="p-8 space-y-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">
          Hijri Calendar with Range Selection
        </h1>
        <Button
          variant="outline"
          onClick={() => setIsRTL(!isRTL)}
          className="ml-auto"
        >
          Switch to {isRTL ? "English" : "Arabic"}
        </Button>
      </div>

      <HijriCalendar
        selected={selectedRange}
        onSelect={setSelectedRange}
        showDoubleCalendar={true}
        isRTL={isRTL}
      />

      {selectedRange.from && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Selected Range:</h3>
          <p>From: {selectedRange.from.toLocaleDateString()}</p>
          {selectedRange.to && (
            <p>To: {selectedRange.to.toLocaleDateString()}</p>
          )}
          <div className="mt-2 text-sm text-muted-foreground">
            <p>
              Hijri From:{" "}
              {HijriDate.fromGregorian(selectedRange.from).format(isRTL)}
            </p>
            {selectedRange.to && (
              <p>
                Hijri To:{" "}
                {HijriDate.fromGregorian(selectedRange.to).format(isRTL)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { HijriCalendar, HijriCalendarExample, HijriDate };
