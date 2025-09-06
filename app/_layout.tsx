import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: useThemeColor('--color-background') },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
    </ThemeProvider>
  );
}
