import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import EventMenuCard from './EventMenuCard';

interface Event {
  id: string;
  title: string;
  subtitle: string;
  distance: string;
  address: string;
  imageSource: any;
  isHappening?: boolean;
}

interface NearbyEventsSectionProps {
  events: Event[];
  onEventPress?: (eventId: string) => void;
}

export default function NearbyEventsSection({ events, onEventPress }: NearbyEventsSectionProps) {
  const textColor = useThemeColor('--color-text');

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          color: textColor,
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 16,
          paddingHorizontal: 16,
        }}
      >
        Perto de você
      </Text>
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {events.map((event) => (
          <EventMenuCard
            key={event.id}
            title={event.title}
            subtitle={event.subtitle}
            distance={event.distance}
            address={event.address}
            imageSource={event.imageSource}
            isHappening={event.isHappening}
            onPress={() => onEventPress?.(event.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}