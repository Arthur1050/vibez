import { ThemeProvider } from "@/providers/ThemeProvider";
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
        <Stack
          screenOptions={{
            headerShown: false,
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
