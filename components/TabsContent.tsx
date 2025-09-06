import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs, usePathname } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

interface TabsContentProps extends React.ComponentProps<typeof Tabs> {
  children: React.ReactNode;
}

export default function TabsContent({ children, ...props }: TabsContentProps) {
  const pathname = usePathname();
  const isHomeScreen = pathname === "/" || pathname === "/index";
  const backgroundColor = useThemeColor('--color-background');

  // Valores animados usando transform (suportado pelo native driver)
  const scaleAnim = useRef(new Animated.Value(isHomeScreen ? 0.9 : 1)).current;
  const translateYAnim = useRef(
    new Animated.Value(isHomeScreen ? -20 : 0)
  ).current;
  const borderRadiusAnim = useRef(
    new Animated.Value(isHomeScreen ? 25 : 0)
  ).current;

  // Animar quando a rota muda
  useEffect(() => {
    const duration = 300;
    const easing = Easing.bezier(0.25, 0.1, 0.25, 1);

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: isHomeScreen ? 0.95 : 1, // 95% do tamanho para simular margin
        duration,
        easing,
        useNativeDriver: true, // transform é suportado
      }),
      Animated.timing(translateYAnim, {
        toValue: isHomeScreen ? -30 : -10, // Move para cima para simular bottom
        duration,
        easing,
        useNativeDriver: true, // transform é suportado
      }),
      Animated.timing(borderRadiusAnim, {
        toValue: isHomeScreen ? 25 : 0,
        duration,
        easing,
        useNativeDriver: true, // borderRadius precisa ser false
      }),
    ]).start();
  }, [isHomeScreen]);

  return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: borderRadiusAnim,
              borderBottomRightRadius: borderRadiusAnim,
              height: 70,
              paddingTop: 10,
              transform: [
                { scaleX: scaleAnim },
                { translateY: translateYAnim },
              ],
              borderColor: "transparent",
            },
          tabBarActiveTintColor: useThemeColor("--color-primary", 1),
          tabBarInactiveTintColor: useThemeColor("--color-text", 0.5),
          tabBarBackground: () => null, // Fundo transparente, já que o estilo do tabBar já define a cor,
          sceneStyle: { backgroundColor }, // Define a cor de fundo da cena
          headerStyle: { backgroundColor },
          animation: 'shift',
        }}
        {...props}
      >
        {children}
      </Tabs>
  );
}
