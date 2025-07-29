import { ReactNode } from "react";
import ThemeProvider from "@/contexts/providers/ThemeProvider";
import TranslationProvider from "@/contexts/providers/TranslationProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
interface layoutProps {
    children: ReactNode;
}

const Layout = ({ children }: layoutProps) => {
    return (
        <ThemeProvider>
            <TranslationProvider>
                <Navbar />
                {children}
                <Footer />
            </TranslationProvider>
        </ThemeProvider>
    );
};

export default Layout;
