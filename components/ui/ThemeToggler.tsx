import { useTheme } from "../../hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import { Button } from "./button";
const ThemeToggler = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button onClick={() => toggleTheme()}>
            {theme === "light" ? (
                <Moon className="h-4 w-4" />
            ) : (
                <Sun className="h-4 w-4" />
            )}
        </Button>
    );
};
export default ThemeToggler;
