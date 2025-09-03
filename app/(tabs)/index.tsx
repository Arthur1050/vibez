import Map from '@/components/Map';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTheme } from '@/providers/ThemeProvider';
import { useGlobalStore } from '@/store';
import { useEffect } from 'react';
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MIN_HEIGHT = 25; // Altura mínima do menu
const MAX_HEIGHT = SCREEN_HEIGHT * 0.5; // 50% da tela

export default function Index() {
  const { schema } = useTheme();
  const { isUpcomingEventsOpened, setIsUpcomingEventsOpened } = useGlobalStore();

  const menuHeight = useSharedValue(isUpcomingEventsOpened ? MAX_HEIGHT : MIN_HEIGHT);
  const startHeight = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startHeight.value = menuHeight.value;
    })
    .onUpdate((event) => {
      // Inverter a direção: arrastar para cima diminui, para baixo aumenta
      const newHeight = startHeight.value - event.translationY;
      const clampedHeight = Math.max(MIN_HEIGHT, Math.min(newHeight, MAX_HEIGHT));
      menuHeight.value = clampedHeight;
    })
    .onEnd((event) => {
      const velocity = event.velocityY;
      const currentHeight = menuHeight.value;
      const heightThreshold = (MAX_HEIGHT + MIN_HEIGHT) / 4;
      
      // Se a velocidade for alta ou estiver abaixo do meio, minimizar
      const shouldMinimize = velocity > 500 || currentHeight < heightThreshold;
      
      if (shouldMinimize) {
        menuHeight.value = withTiming(MIN_HEIGHT, {
          duration: 250,
        });
        runOnJS(setIsUpcomingEventsOpened)(false);
      } else {
        menuHeight.value = withTiming(MAX_HEIGHT, {
          duration: 250,
        });
        runOnJS(setIsUpcomingEventsOpened)(true);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: menuHeight.value,
    };
  });

  const handleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      menuHeight.value,
      [MIN_HEIGHT, MAX_HEIGHT],
      [1, 0.6],
      Extrapolation.CLAMP
    );
    
    return {
      opacity,
    };
  });

  // Animação mais suave para mudanças de estado
  useEffect(() => {
    menuHeight.value = withTiming(
      isUpcomingEventsOpened ? MAX_HEIGHT : MIN_HEIGHT,
      {
        duration: 250,
      }
    );
  }, [isUpcomingEventsOpened, menuHeight]);

  return (
    <GestureHandlerRootView style={[schema, {flex: 1}]}>
      <View style={{flex: 1}}>
        <Map />
        
        <Animated.View 
          style={[
            {
              position: 'absolute',
              bottom: 100,
              width: '95%',
              alignSelf: 'center',
              zIndex: 10,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              backgroundColor: useThemeColor('--color-background'),
              overflow: 'hidden',
            },
            animatedStyle
          ]}
        >
          {/* Alça de arraste */}
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={[
                {
                  alignItems: 'center',
                  paddingVertical: 12,
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                },
                handleStyle
              ]}
            >
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: '#666',
                  borderRadius: 2,
                }}
              />
            </Animated.View>
          </GestureDetector>

          {/* Conteúdo do menu */}
          <View style={{ flex: 1, padding: 16 }}>
            {/* Seu conteúdo do menu aqui */}
          </View>
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  );
}