"use client";
import useIsMobile from "@/hooks/useIsMobile";
import { useEffect, useRef } from "react";
import PrayerTimesCard from "@/components/ui/home/PrayerTimesCard";
import DateHeader from "@/components/ui/DateHeader";
import { Card, CardContent } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
import { HijriCalendar } from "@/components/ui/hijri-calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SpecialCard from "@/components/ui/SpecialCard";
import { CALCULATION_METHODS } from "@/constants";
// import { prayerNames } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Navigation,
  Calculator,
  AlertCircle,
  // FlagTriangleLeft,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";

import gsap from "gsap";

const Page = () => {
  const isMobile = useIsMobile();
  const { t, isRTL } = useTranslation();
  const prayerTimesCard = useRef<HTMLDivElement>(null);
  const locationCard = useRef<HTMLDivElement>(null);
  const CalculationMethodsCard = useRef<HTMLDivElement>(null);
  const prayerTrackerCard = useRef<HTMLDivElement>(null);
  const {
    prayerTimes,
    error,
    loading,
    selectedCity,
    calculationMethod,
    cities,
    dateInfo,
    currentLocation,
    useGPS,
    getCurrentLocation,
    handleMethodChange,
    handleCityChange,
    handleRefresh,
    setError,
  } = usePrayerTimes();

  // Clear error handler
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    // Wait for DOM elements to be ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Check if refs are available before animating
        if (prayerTrackerCard.current && !isMobile) {
          gsap.from(prayerTrackerCard.current, {
            xPercent: isRTL ? -100 : 100,
            opacity: 0,
            transformOrigin: isRTL ? "left left" : "right right",
            duration: 1,
            ease: "power2.inOut",
          });
        }

        // Animate left column cards
        const leftColCards = [locationCard, CalculationMethodsCard];
        leftColCards.forEach((cardRef) => {
          if (cardRef.current && !isMobile) {
            gsap.from(cardRef.current, {
              xPercent: isRTL ? 100 : -100,
              opacity: 0,
              transformOrigin: isRTL ? "right right" : "left left",
              duration: 1,
              ease: "power2.inOut",
            });
          }
        });

        // Animate prayer times card
        if (prayerTimesCard.current) {
          gsap.fromTo(
            prayerTimesCard.current,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: 0.3,
            },
          );
        }
      });

      // Cleanup function
      return () => {
        ctx.revert();
      };
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [isRTL, isMobile]);
  return (
    <section className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-6xl min-h-screen">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          {t("stayConnected")}
        </h3>
      </div>

      {/* Date Header */}
      <div className="mb-4 sm:mb-6">
        <DateHeader dateInfo={dateInfo} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 sm:mb-6">
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <CardContent className="p-3 sm:p-4">
              <div
                className={`flex items-start gap-3 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-red-700 dark:text-red-300 break-words">
                    {error}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearError}
                  className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30 flex-shrink-0"
                >
                  ×
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Left Column - Controls */}
        <div className="space-y-4 sm:space-y-6">
          {/* Location Card */}
          <SpecialCard ref={locationCard} title="location" Icon={MapPin} isRTL>
            <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Select
                value={selectedCity?.name || ""}
                onValueChange={handleCityChange}
                disabled={useGPS || loading}
                aria-label="location selector"
              >
                <SelectTrigger className="flex-1 min-w-0 font-sans">
                  <SelectValue
                    placeholder={t("selectCity")}
                    className="truncate"
                  />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto font-sans">
                  {cities.map((city) => (
                    <SelectItem
                      key={`${city.name}-${city.country}`}
                      value={city.name}
                      className="truncate"
                    >
                      <span className="truncate">
                        {city.name}, {city.country}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant={useGPS ? "default" : "outline"}
                size="icon"
                onClick={getCurrentLocation}
                disabled={loading}
                title={t("useGPS") || "Use GPS"}
                className="flex-shrink-0 w-10 h-10"
              >
                <Navigation className="w-4 h-4" />
              </Button>
            </div>
            {/* GPS Badge */}
            {useGPS && (
              <Badge variant="secondary" className="mt-3 w-fit text-xs">
                {t("usingGPS")}
              </Badge>
            )}

            {/* Current location display */}
            {currentLocation && useGPS && (
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 truncate">
                Lat: {currentLocation.lat.toFixed(4)}, Lng:{" "}
                {currentLocation.lng.toFixed(4)}
              </p>
            )}
          </SpecialCard>
          {/* Calculation Method Card */}
          <SpecialCard
            ref={CalculationMethodsCard}
            title="calculationMethod"
            Icon={Calculator}
            isRTL
          >
            <Select
              value={calculationMethod}
              onValueChange={handleMethodChange}
              disabled={loading}
              aria-label="calculation method selector"
            >
              <SelectTrigger className="w-full font-sans">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto font-sans">
                {CALCULATION_METHODS.map((method) => (
                  <SelectItem key={method.value} value={String(method.value)}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SpecialCard>
        </div>
        {/* Right Column - Prayer Times Display */}
        {/*<SpecialCard
          ref={prayerTrackerCard}
          title="prayerTracker"
          Icon={FlagTriangleLeft}
          isRTL
        >
          <div className="flex flex-col gap-3 sm:gap-4 pt-4">
            {prayerNames(isRTL).map((prayer, index) => (
              <div
                key={index}
                className={`flex items-center justify-start gap-3`}
              >
                <Checkbox
                  id={`terms-${index}`}
                  className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                />
                <div className="grid gap-2">
                  <Label
                    className="text-[18px] font-semibold"
                    htmlFor={`terms-${index}`}
                  >
                    {prayer}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </SpecialCard>*/}
        <SpecialCard isRTL={isRTL}>
          <h3
            className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2`}
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 192 192"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                d="M48 30c-9.972 0-18 8.028-18 18v96c0 9.972 8.028 18 18 18h80.154L162 128.154V48c0-9.972-8.028-18-18-18H48z"
                style={{
                  fontVariationSettings: "normal",
                  opacity: 1,
                  fill: "none",
                  fillOpacity: 1,
                  stroke: "#05df72",
                  strokeWidth: 12,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 4,
                  strokeDasharray: "none",
                  strokeDashoffset: 0,
                  strokeOpacity: 1,
                  paintOrder: "markers fill stroke",
                  stopColor: "#05df72",
                  stopOpacity: 1,
                }}
              />
              <path
                d="M140 125.123c0-37.468-39.291-34.926-44-58.248-4.709 23.322-44 20.78-44 58.248"
                style={{
                  fill: "none",
                  stroke: "#05df72",
                  strokeWidth: 12,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 4,
                  strokeDasharray: "none",
                  strokeOpacity: 1,
                }}
              />
            </svg>
            <span className="truncate">{t("hidjriCalendar")}</span>
          </h3>
          <HijriCalendar
            isRTL={isRTL}
            showDoubleCalendar={isMobile ? false : true}
          />
        </SpecialCard>
      </div>
      <PrayerTimesCard
        ref={prayerTimesCard}
        loading={loading}
        prayerTimes={prayerTimes}
        onRefresh={handleRefresh}
      />
    </section>
  );
};

export default Page;
