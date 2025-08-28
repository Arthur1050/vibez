import { vars } from "nativewind";

export const lightColors = {
    "--color-background": "#F6F0FF",
    "--color-background-alt": "#E0D7FF",
    "--color-border": "#E0D7FF",
    "--color-text": "#151718",
    "--color-primary": "#8A4FFF",
    "--color-secondary": "#FFA836",
};

export const darkColors = {
    "--color-background": "#24223A",
    "--color-background-alt": "#2F2D4D",
    "--color-border": "#43406F",
    "--color-text": "#FFF5E1",
    "--color-primary": "#8A4FFF",
    "--color-secondary": "#FFA836",
};

export const themes = {
  light: vars(lightColors),
  dark: vars(darkColors),
};