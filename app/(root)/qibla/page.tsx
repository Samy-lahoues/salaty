"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Compass, MapPin, Navigation } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Page = () => {
    const [direction, setDirection] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<{
        lat: number;
        lng: number;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const { language, t } = useTranslation();

    useEffect(() => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    setLocation({
                        lat: coords.latitude,
                        lng: coords.longitude,
                    });
                    const url = `https://api.aladhan.com/v1/qibla/${coords.latitude}/${coords.longitude}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    setDirection(data.data.direction);
                } catch (e) {
                    setError(e instanceof Error ? e.message : String(e));
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setError(
                    "Location permission denied. Please enable location access to find Qibla direction."
                );
                setLoading(false);
            }
        );
    }, []);

    const CompassDesign = ({ qiblaDirection }: { qiblaDirection: number }) => {
        const cardinalDirections = [
            { label: "N", angle: 0, color: "text-red-500" },
            { label: "NE", angle: 45, color: "text-gray-400" },
            { label: "E", angle: 90, color: "text-gray-400" },
            { label: "SE", angle: 135, color: "text-gray-400" },
            { label: "S", angle: 180, color: "text-gray-400" },
            { label: "SW", angle: 225, color: "text-gray-400" },
            { label: "W", angle: 270, color: "text-gray-400" },
            { label: "NW", angle: 315, color: "text-gray-400" },
        ];

        return (
            <div className="flex flex-col items-center space-y-6">
                {/* Location Info */}
                {location && (
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                        <MapPin className="w-4 h-4" />
                        <span>
                            {location.lat.toFixed(4)}°,{" "}
                            {location.lng.toFixed(4)}°
                        </span>
                    </div>
                )}

                {/* Compass Container */}
                <div className="relative">
                    {/* Outer Ring with Degrees */}
                    <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-4 border-gray-600 shadow-2xl">
                        {/* Degree Markings */}
                        <div className="absolute inset-2 rounded-full border-2 border-gray-500">
                            {Array.from({ length: 72 }, (_, i) => {
                                const angle = i * 5;
                                const isMainDirection = angle % 90 === 0;
                                const isMidDirection =
                                    angle % 45 === 0 && !isMainDirection;
                                const length = isMainDirection
                                    ? 20
                                    : isMidDirection
                                    ? 15
                                    : 8;
                                const width = isMainDirection
                                    ? 3
                                    : isMidDirection
                                    ? 2
                                    : 1;

                                return (
                                    <div
                                        key={i}
                                        className={`absolute bg-gray-300 rounded-full origin-bottom`}
                                        style={{
                                            width: `${width}px`,
                                            height: `${length}px`,
                                            left: "50%",
                                            top: "8px",
                                            transform: `translateX(-50%) rotate(${angle}deg)`,
                                            transformOrigin: `center ${
                                                152 - length / 2
                                            }px`,
                                        }}
                                    />
                                );
                            })}
                        </div>

                        {/* Cardinal Directions */}
                        {cardinalDirections.map((dir) => {
                            const radius = 130; // Distance from center
                            const angleRad = (dir.angle * Math.PI) / 180;
                            const x = Math.sin(angleRad) * radius;
                            const y = -Math.cos(angleRad) * radius;

                            return (
                                <div
                                    key={dir.label}
                                    className={`absolute text-lg font-bold ${dir.color} select-none`}
                                    style={{
                                        left: "50%",
                                        top: "50%",
                                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                                    }}
                                >
                                    {dir.label}
                                </div>
                            );
                        })}

                        {/* Inner Compass Face */}
                        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 shadow-inner">
                            {/* Qibla Direction Arrow */}
                            <div
                                className="absolute w-1 bg-gradient-to-t from-green-600 to-green-400 rounded-full shadow-lg transition-transform duration-1000 ease-out origin-bottom"
                                style={{
                                    height: "120px",
                                    left: "50%",
                                    bottom: "50%",
                                    transform: `translateX(-50%) rotate(${qiblaDirection}deg)`,
                                    boxShadow:
                                        "0 0 10px rgba(34, 197, 94, 0.5)",
                                }}
                            >
                                {/* Arrow Head */}
                                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-green-400"></div>
                            </div>

                            {/* Mecca Indicator */}
                            <div
                                className="absolute"
                                style={{
                                    left: "50%",
                                    top: "50%",
                                    transform: `translate(-50%, -50%) rotate(${qiblaDirection}deg)`,
                                    transformOrigin: "center center",
                                }}
                            >
                                <div
                                    className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg border border-green-400"
                                    style={{
                                        transform: `translate(-50%, -110px) rotate(${-qiblaDirection}deg)`,
                                    }}
                                >
                                    🕋 Mecca
                                </div>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-600 shadow-md"></div>
                        </div>
                    </div>

                    {/* Direction Info */}
                    <div className="mt-6 text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-green-400">
                            <Navigation className="w-5 h-5" />
                            <span className="text-lg font-semibold">
                                Qibla Direction: {Math.round(qiblaDirection)}°
                            </span>
                        </div>
                        <p className="text-sm text-gray-400">
                            Point your device in the direction of the green
                            arrow
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="container mx-auto px-4 pt-6 md:py-8 max-w-4xl">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                    <CardTitle
                        style={{ direction: language === "ar" ? "rtl" : "ltr" }}
                        className="flex items-center gap-3"
                    >
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <Compass className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-black dark:text-white">
                                {t("qibla")}
                            </h2>
                            <p className="text-sm text-gray-400 font-normal">
                                Find the direction to Mecca
                            </p>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    {error && (
                        <div className="text-center py-8">
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                                <div className="text-red-400 text-lg font-semibold mb-2">
                                    Unable to determine location
                                </div>
                                <p className="text-red-300">{error}</p>
                            </div>
                        </div>
                    )}

                    {loading && !error && (
                        <div className="text-center py-16">
                            <div className="relative inline-block">
                                <Compass className="w-16 h-16 text-green-400 mx-auto mb-4 animate-spin" />
                                <div className="absolute inset-0 w-16 h-16 border-4 border-green-400/20 border-t-green-400 rounded-full animate-spin mx-auto"></div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">
                                Detecting Qibla Direction...
                            </h3>
                            <p className="text-gray-400 max-w-md mx-auto">
                                Please allow location access to determine the
                                precise direction to Mecca from your current
                                position.
                            </p>
                        </div>
                    )}

                    {direction !== null && !loading && !error && (
                        <CompassDesign qiblaDirection={direction} />
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default Page;
