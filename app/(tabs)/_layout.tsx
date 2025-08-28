import { useThemeColor } from '@/hooks/useThemeColor';
import { Tabs, usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Platform } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function TabLayout() {
  const pathname = usePathname();
  const isHomeScreen = pathname === '/' || pathname === '/index';
  
  // Valores animados usando transform (suportado pelo native driver)
  const scaleAnim = useRef(new Animated.Value(isHomeScreen ? 0.9 : 1)).current;
  const translateYAnim = useRef(new Animated.Value(isHomeScreen ? -20 : 0)).current;
  const borderRadiusAnim = useRef(new Animated.Value(isHomeScreen ? 25 : 0)).current;

  // Animar quando a rota muda
  useEffect(() => {
    const duration = 300;
    const easing = Easing.bezier(0.25, 0.1, 0.25, 1);

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: isHomeScreen ? 0.9 : 1, // 90% do tamanho para simular margin
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
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: useThemeColor('--color-background', 0.95),
            borderRadius: borderRadiusAnim,
            height: Platform.OS === 'ios' ? 65 : 60,
            paddingBottom: Platform.OS === 'ios' ? 34 : 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
            transform: [
              { scaleX: scaleAnim },
              { translateY: translateYAnim }
            ],
          },
          android: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: useThemeColor('--color-background', 0.95),
            borderRadius: borderRadiusAnim,
            height: 60,
            elevation: 8,
            transform: [
              { scaleX: scaleAnim },
              { translateY: translateYAnim }
            ],
          },
          default: {},
        }),
        tabBarActiveTintColor: useThemeColor('--color-primary', 1),
        tabBarInactiveTintColor: useThemeColor('--color-text', 0.5),
      }}>
        <Tabs.Screen name="index" options={{
            title: 'Home',
        }} />
        <Tabs.Screen name="explore" options={{
            title: 'Explore',
        }} />
      </Tabs>
  );
}
