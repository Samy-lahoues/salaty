"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Circle, RotateCcw } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function SibhaPage() {
    const { language, t } = useTranslation();
    const [count, setCount] = useState(0);
    const isRTL = language === "ar";
    const increment = () => setCount((prev) => prev + 1);
    const reset = () => setCount(0);

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                    <CardTitle
                        className={`text-2xl flex items-center gap-2 ${
                            isRTL ? "flex-row-reverse" : ""
                        }`}
                    >
                        <Circle className="w-6 h-6 text-blue-600" />
                        {t("sibha")}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center space-y-8">
                        {/* Counter Display */}
                        <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full w-48 h-48 mx-auto flex items-center justify-center">
                            <span className="text-6xl font-bold text-gray-900 dark:text-white">
                                {count}
                            </span>
                        </div>

                        {/* Buttons */}
                        <div
                            className={`flex gap-4 justify-center ${
                                isRTL ? "flex-row-reverse" : ""
                            }`}
                        >
                            <Button
                                onClick={increment}
                                size="lg"
                                className="px-8 py-4 text-lg"
                            >
                                <Circle className="w-5 h-5 mr-2" />
                                Tap
                            </Button>
                            <Button
                                onClick={reset}
                                variant="outline"
                                size="lg"
                                className="px-8 py-4 text-lg bg-transparent"
                            >
                                <RotateCcw className="w-5 h-5 mr-2" />
                                Reset
                            </Button>
                        </div>

                        {/* Common Dhikr */}
                        <div className="grid gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <p>سُبْحَانَ اللهِ (SubhanAllah) - 33 times</p>
                            <p>الْحَمْدُ لِلَّهِ (Alhamdulillah) - 33 times</p>
                            <p>اللهُ أَكْبَرُ (Allahu Akbar) - 34 times</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
