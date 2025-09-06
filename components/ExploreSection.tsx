import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ExploreEventCard from './ExploreEventCard';

interface Event {
  id: string;
  title: string;
  subtitle: string;
  imageSource: any;
  vibeScore?: number; // Tornado opcional
}

interface ExploreSectionProps {
  title: string;
  events: Event[];
  showVibeIndicator?: boolean; // Controla se mostra vibe indicator
  onEventPress?: (eventId: string) => void;
}

export default function ExploreSection({ 
  title, 
  events, 
  showVibeIndicator = true, // Por padrão mostra
  onEventPress 
}: ExploreSectionProps) {
  const textColor = useThemeColor('--color-text');

  return (
    <View style={{ marginBottom: 32 }}>
      {/* Section Title */}
      <Text
        style={{
          color: textColor,
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 16,
          paddingHorizontal: 16,
        }}
      >
        {title}
      </Text>

      {/* Events Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      >
        {events.map((event) => (
          <ExploreEventCard
            key={event.id}
            id={event.id}
            title={event.title}
            subtitle={event.subtitle}
            imageSource={event.imageSource}
            vibeScore={event.vibeScore}
            showVibeIndicator={showVibeIndicator}
            onPress={() => onEventPress?.(event.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}