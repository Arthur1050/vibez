import React, { useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';

interface Banner {
  id: string;
  imageSource: any;
  onPress?: () => void;
}

interface BannerSliderProps {
  banners: Banner[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 32; // 16px margin on each side

export default function BannerSlider({ banners }: BannerSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / BANNER_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        snapToInterval={BANNER_WIDTH + 16} // Banner width + gap
        decelerationRate="fast"
      >
        {banners.map((banner, index) => (
          <View key={banner.id} style={{ marginRight: index === banners.length - 1 ? 0 : 16 }}>
            <Image
              source={banner.imageSource}
              style={{
                width: BANNER_WIDTH,
                height: 180,
                borderRadius: 16,
              }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      {/* Dots Indicator */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 12,
        }}
      >
        {banners.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === activeIndex ? '#8A4FFF' : '#666',
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>
    </View>
  );
}