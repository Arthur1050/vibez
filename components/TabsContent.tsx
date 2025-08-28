import { useThemeColor } from '@/hooks/useThemeColor';
import { Tabs, usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Platform } from 'react-native';

interface TabsContentProps extends React.ComponentProps<typeof Tabs> {
  children: React.ReactNode;
}

export default function TabsContent({ children, ...props }: TabsContentProps) {
  const pathname = usePathname();
  const isHomeScreen = pathname === "/" || pathname === "/index";

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
        toValue: isHomeScreen ? -30 : 0, // Move para cima para simular bottom
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
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: useThemeColor("--color-background"),
            borderRadius: borderRadiusAnim,
            height: 65,
            paddingTop: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
            transform: [{ scaleX: scaleAnim }, { translateY: translateYAnim }],
          },
          android: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: useThemeColor("--color-background", 0.95),
            borderRadius: borderRadiusAnim,
            height: 60,
            elevation: 8,
            transform: [{ scaleX: scaleAnim }, { translateY: translateYAnim }],
          },
          default: {},
        }),
        tabBarActiveTintColor: useThemeColor("--color-primary", 1),
        tabBarInactiveTintColor: useThemeColor("--color-text", 0.5),
      }}
        {...props}
    >
        {children}
    </Tabs>
  );
}
