import { ReactNode } from "react";
import ThemeProvider from "@/contexts/providers/ThemeProvider";
import TranslationProvider from "@/contexts/providers/TranslationProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

interface layoutProps {
  children: ReactNode;
}

const Layout = ({ children }: layoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="fixed inset-0 overflow-hidden z-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-green-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      <ThemeProvider>
        <TranslationProvider>
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </TranslationProvider>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
