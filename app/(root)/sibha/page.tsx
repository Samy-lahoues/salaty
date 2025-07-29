"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Circle, RotateCcw } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { dikr } from "@/constants";

export default function SibhaPage() {
    const { isRTL, t } = useTranslation();
    const [count, setCount] = useState(0);
    const increment = () =>
        setCount((prev) => {
            return prev === 99 ? 0 : prev + 1;
        });
    const reset = () => setCount(0);

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className={`text-2xl flex items-center gap-2`}>
                        <Circle className="w-6 h-6 text-blue-600" />
                        {t("sibha")}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center space-y-8">
                        {/* Counter Display */}
                        <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full w-48 h-48 mx-auto flex items-center justify-center">
                            <span className="text-6xl font-bold text-gray-900 dark:text-white">
                                {count === 99 ? 33 : count % 33}
                            </span>
                        </div>

                        {/* Buttons */}
                        <div className={`flex gap-4 justify-center`}>
                            <Button
                                onClick={increment}
                                size="lg"
                                className="px-8 py-4 text-lg"
                            >
                                {isRTL ? (
                                    <>
                                        إضغط
                                        <Circle className="w-5 h-5 mr-2" />
                                    </>
                                ) : (
                                    <>
                                        <Circle className="w-5 h-5 mr-2" />
                                        Tap
                                    </>
                                )}
                            </Button>
                            <Button
                                onClick={reset}
                                variant="outline"
                                size="lg"
                                className="px-8 py-4 text-lg bg-transparent"
                            >
                                {isRTL ? (
                                    <>
                                        إعادة
                                        <RotateCcw className="w-5 h-5 mr-2" />
                                    </>
                                ) : (
                                    <>
                                        <RotateCcw className="w-5 h-5 mr-2" />
                                        Reset
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Common Dhikr */}
                        <div className="grid gap-2 text-sm text-gray-600 dark:text-gray-400 transition-all duration-300">
                            {dikr(isRTL).map((dikr, index) => {
                                const brightDikrStyle =
                                    "text-normal font-semibold text-black dark:text-white";

                                return (
                                    <p
                                        className={`${
                                            count >= 66 &&
                                            index === 2 &&
                                            brightDikrStyle
                                        } ${
                                            count >= 33 &&
                                            count < 66 &&
                                            index === 1 &&
                                            brightDikrStyle
                                        } ${
                                            count < 33 &&
                                            index === 0 &&
                                            brightDikrStyle
                                        }`}
                                        key={index}
                                    >
                                        {dikr}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
