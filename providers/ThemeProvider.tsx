import { themes } from "@/constants/Themes";
import { StatusBar } from "expo-status-bar";
import { colorScheme } from "nativewind";
import React, { createContext, useContext, useState } from "react";

interface ThemeProviderProps {
    children: React.ReactNode;
}

type ThemeContextType = {
    theme: "light" | "dark";
    schema: typeof themes.dark;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    schema: themes.dark,
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

    console.log('ThemeProvider - currentTheme:', currentTheme);

    const toggleTheme = () => {
        const newTheme = currentTheme === "light" ? "dark" : "light";
        setCurrentTheme(newTheme);
        colorScheme.set(newTheme);
    };

    // Clona o children e aplica o estilo do tema
    const styledChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const childElement = child as React.ReactElement<any>;
            return React.cloneElement(childElement, {
                style: [
                    themes[currentTheme],
                    childElement.props.style, // Preserva estilos existentes
                    { flex: 1 } // Garante que ocupe toda a tela
                ]
            });
        }
        return child;
    });

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, schema: themes[currentTheme] }}>
            <StatusBar style={currentTheme === "dark" ? "light" : "dark"} />
            {/* <View style={themes[currentTheme]} className="flex-1"> */}
                    {styledChildren}
            {/* </View> */}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 