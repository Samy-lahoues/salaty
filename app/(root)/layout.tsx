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
    <ThemeProvider>
      <TranslationProvider>
        <Toaster />
        <Navbar />
        {children}
        <Footer />
      </TranslationProvider>
    </ThemeProvider>
  );
};

export default Layout;
