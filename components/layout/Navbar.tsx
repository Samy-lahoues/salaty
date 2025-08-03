"use client";
import useIsMobile from "@/hooks/useIsMobile";
import { usePathname } from "next/navigation";
import LanguageToggler from "../ui/LanguageToggler";
import ThemeToggler from "../ui/ThemeToggler";
import { useTheme } from "@/hooks/useTheme";
import { navItems } from "@/constants";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { WhiteLogo, GreenLogo } from "@/constants";
import Image from "next/image";
type navItem = "quran" | "qibla" | "sibha" | "live";

const Navbar = () => {
  const { isRTL, t } = useTranslation();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header
        className={cn(
          "px-4 sm:px-6 lg:px-20 py-3 sticky top-0 z-50 w-full border-b bg-gradient-to-r backdrop-blur from-black via-gray-900 to-black",
          isRTL ? "font-arabic" : "font-sans",
        )}
      >
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 via-emerald-400 to-transparent" />
        <div className="flex-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            className="flex items-center gap-x-2 hover:opacity-80 transition-opacity max-sm:pl-3"
            href="/"
          >
            <span
              className={
                "flex items-center text-2xl sm:text-3xl font-bold text-primary gap-x-1.5 font-sans"
              }
            >
              <Image
                src={theme === "dark" ? WhiteLogo : GreenLogo}
                height={isMobile ? 30 : 35}
                width={isMobile ? 25 : 30}
                alt="logo-img"
              />{" "}
              {!isMobile && (
                <p className={`pt-1 ${isRTL ? "font-arabic" : "font-sans"}`}>
                  {isRTL ? "صلاتي" : "Salaty"}
                </p>
              )}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80",
                    !isRTL && "font-sans",
                  )}
                  key={index}
                  href={item.href}
                >
                  <Icon size={18} />
                  <span className="font-semibold">
                    {t(item.key as navItem)}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <ThemeToggler />
            <LanguageToggler />
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggler />
            <LanguageToggler />
            <button
              onClick={toggleMobileMenu}
              className={cn(
                "p-2 rounded-lg hover:bg-muted transition-colors",
                mobileMenuOpen && "bg-muted",
              )}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Tablet Menu Button */}
          <div className="hidden sm:flex lg:hidden items-center gap-2">
            <button
              onClick={toggleMobileMenu}
              className={cn(
                "p-2 rounded-lg hover:bg-muted transition-colors",
                mobileMenuOpen && "bg-muted",
              )}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* Mobile/Tablet Menu */}
      <div
        className={cn(
          "lg:hidden fixed top-[73px] left-0 right-0 z-50 bg-background border-b shadow-lg transition-all duration-300 ease-in-out",
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none",
        )}
      >
        <nav className="px-4 py-4 max-w-7xl mx-auto">
          <div className="grid gap-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80 active:scale-95",
                    isRTL ? "font-arabic flex-row-reverse" : "font-sans",
                  )}
                  key={index}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-semibold">
                    {t(item.key as navItem)}
                  </span>
                  {isActive && (
                    <div
                      className={cn(
                        "ml-auto w-2 h-2 rounded-full bg-primary-foreground",
                        isRTL && "mr-auto ml-0",
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Footer */}
          <div className="mt-6 pt-4 border-t">
            <div className="text-center text-sm text-muted-foreground">
              <span className={cn(isRTL ? "font-arabic" : "font-sans")}>
                🕌 Salaty - {isRTL ? "صلها في وقتها" : "Pray it on time"}
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
