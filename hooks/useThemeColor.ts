import { darkColors, lightColors } from "@/constants/Themes";
import { useTheme } from "@/providers/ThemeProvider";

type SchemeColors = typeof lightColors & typeof darkColors;

export function useThemeColor(color: keyof SchemeColors, opacity: number|null = null) {
    const { theme } = useTheme();
    
    const colors = theme === 'dark' ? darkColors : lightColors;

    let opacityHex = '';
    if (opacity) {
        opacityHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
    }
    return colors[color] + opacityHex;
}