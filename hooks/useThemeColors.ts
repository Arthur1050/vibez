import { darkColors, lightColors } from "@/constants/Themes";
import { useTheme } from "@/providers/ThemeProvider";

export function useThemeColors() {
    const { theme } = useTheme();
    const colors = theme === 'dark' ? darkColors : lightColors;

    return colors;
}