import { BookOpen, Circle, Compass, Video } from "lucide-react";
import GreenLogo from "@/public/salaty-green-v2.svg";
import WhiteLogo from "@/public/salaty.svg";
import type { LucideProps } from "lucide-react";
interface navItem {
    href: string;
    icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    key: string;
}
const navItems: navItem[] = [
    { href: "/quran", icon: BookOpen, key: "quran" as const },
    { href: "/sibha", icon: Circle, key: "sibha" as const },
    { href: "/qibla", icon: Compass, key: "qibla" as const },
    { href: "/live", icon: Video, key: "live" as const },
];
const dikr = (isRtl: boolean) => {
    return isRtl
        ? [
              "سُبْحَانَ اللهِ - 33 مرة",
              "الْحَمْدُ لِلَّهِ - 33 مرة",
              "اللهُ أَكْبَرُ - 33 مرة",
          ]
        : [
              "سُبْحَانَ اللهِ (SubhanAllah) - 33 times",
              "الْحَمْدُ لِلَّهِ (Alhamdulillah) - 33 times",
              "اللهُ أَكْبَرُ (Allahu Akbar) - 34 times",
          ];
};
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
const CITIES = [
    { name: "New York", country: "US", lat: 40.7128, lng: -74.006 },
    { name: "London", country: "GB", lat: 51.5074, lng: -0.1278 },
    { name: "Mecca", country: "SA", lat: 21.4225, lng: 39.8262 },
    { name: "Istanbul", country: "TR", lat: 41.0082, lng: 28.9784 },
    { name: "Dubai", country: "AE", lat: 25.2048, lng: 55.2708 },
    { name: "Cairo", country: "EG", lat: 30.0444, lng: 31.2357 },
    { name: "Jakarta", country: "ID", lat: -6.2088, lng: 106.8456 },
    { name: "Kuala Lumpur", country: "MY", lat: 3.139, lng: 101.6869 },
    { name: "Toronto", country: "CA", lat: 43.6532, lng: -79.3832 },
    { name: "Sydney", country: "AU", lat: -33.8688, lng: 151.2093 },
];
const CALCULATION_METHODS = [
    { value: 1, label: "Muslim World League" },
    { value: 2, label: "Islamic Society of North America" },
    { value: 3, label: "Egyptian General Authority of Survey" },
    { value: 4, label: "Umm Al-Qura University, Makkah" },
    { value: 5, label: "University of Islamic Sciences, Karachi" },
    { value: 6, label: "Institute of Geophysics, University of Tehran" },
    { value: 7, label: "Shia Ithna-Ashari, Leva Institute, Qum" },
    { value: 8, label: "Gulf Region" },
    { value: 9, label: "Kuwait" },
    { value: 10, label: "Qatar" },
    { value: 11, label: "Majlis Ugama Islam Singapura, Singapore" },
    { value: 12, label: "Union Organization islamic de France" },
    { value: 13, label: "Diyanet İşleri Başkanlığı, Turkey" },
    { value: 14, label: "Spiritual Administration of Muslims of Russia" },
    { value: 15, label: "Moonsighting Committee" },
    {
        value: 16,
        label: "Dubai, UAE ",
    },
    { value: 17, label: "Jabatan Kemajuan Islam Malaysia (JAKIM)" },
    { value: 18, label: "Tunisia" },
    { value: 19, label: "Algeria" },
    { value: 20, label: "Kementerian Agama Republik Indonesia" },
    { value: 21, label: "Morocco" },
    { value: 22, label: "Comunidate Islamica de Lisboa (Portugal)" },
];

export type city = {
    name: string;
    country: string;
    lat: number;
    lng: number;
};
export {
    navItems,
    GreenLogo,
    WhiteLogo,
    dikr,
    cardinalDirections,
    CITIES,
    CALCULATION_METHODS,
};
