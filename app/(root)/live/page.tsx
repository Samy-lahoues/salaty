"use client";
import { useState } from "react";
import YouTube from "react-youtube";
import { Video } from "lucide-react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
const Page = () => {
    const [videoError, setVideoError] = useState(false);
    const handleError = () => {
        setVideoError(true);
    };
    const { isRTL, t } = useTranslation();
    return (
        <section className="container-mx px-4 py-8 max-w-6xl">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader style={{ direction: isRTL ? "rtl" : "ltr" }}>
                    <CardTitle className="flex items-center gap-2">
                        <div className="p-2 bg-accent-bg rounded-lg">
                            <Video className="w-6 h-6 text-accent" />
                        </div>
                        <h2 className="text-2xl font-semibold">{t("live")}</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        {videoError ? (
                            <div className="text-center p-4">
                                <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Live Makkah Stream
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Sorry, the stream is currently unavailable.
                                    Please try again later.
                                </p>
                            </div>
                        ) : (
                            <YouTube
                                videoId="ueIOUTyRS84"
                                title="بث مباشر || قناة القرآن الكريم Makkah Live"
                                className="w-full h-full"
                                iframeClassName="w-full h-full rounded-lg"
                                opts={{
                                    playerVars: { autoplay: 1 },
                                }}
                                onError={handleError}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};
export default Page;
