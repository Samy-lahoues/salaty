import { ReactNode } from "react";
import ThemeProvider from "@/contexts/providers/ThemeProvider";
import TranslationProvider from "@/contexts/providers/TranslationProvider";
import Navbar from "@/components/layout/Navbar";
interface layoutProps {
    children: ReactNode;
}

const Layout = ({ children }: layoutProps) => {
    return (
        <ThemeProvider>
            <TranslationProvider>
                <Navbar />
                {children}
            </TranslationProvider>
        </ThemeProvider>
    );
};

export default Layout;
