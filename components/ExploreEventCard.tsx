import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import VibeIndicator from './VibeIndicator';

interface ExploreEventCardProps {
  id: string;
  title: string;
  subtitle: string;
  imageSource: any;
  vibeScore?: number; // Tornado opcional
  showVibeIndicator?: boolean; // Controla se mostra ou não
  onPress?: () => void;
}

const CARD_WIDTH = 160;

export default function ExploreEventCard({
  title,
  subtitle,
  imageSource,
  vibeScore,
  showVibeIndicator = true, // Por padrão mostra
  onPress,
}: ExploreEventCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: CARD_WIDTH,
        marginRight: 12,
      }}
    >
      {/* Event Image */}
      <View style={{ position: 'relative', marginBottom: 8 }}>
        <Image
          source={imageSource}
          style={{
            width: CARD_WIDTH,
            height: 120,
            borderRadius: 12,
          }}
          resizeMode="cover"
        />
        
        {/* Vibe Indicator Overlay - Condicional */}
        {showVibeIndicator && vibeScore !== undefined && (
          <View
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
            }}
          >
            <VibeIndicator vibeScore={vibeScore} showLabel={false} />
          </View>
        )}
      </View>

      {/* Event Info */}
      <View>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 2,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 12,
            opacity: 0.7,
          }}
          numberOfLines={1}
        >
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}