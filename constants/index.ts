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

export { navItems, GreenLogo, WhiteLogo };
