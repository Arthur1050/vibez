import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Badge from './Badge';

interface EventMenuCardProps {
  title: string;
  subtitle: string;
  distance: string;
  address: string;
  imageSource: any;
  isHappening?: boolean;
  onPress?: () => void;
}

export default function EventMenuCard({
  title,
  subtitle,
  distance,
  address,
  imageSource,
  isHappening = false,
  onPress,
}: EventMenuCardProps) {
  const backgroundColor = useThemeColor('--color-background-alt');
  const textColor = useThemeColor('--color-text');
  const borderColor = useThemeColor('--color-border');

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        backgroundColor,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor,
      }}
    >
      {/* Event Image */}
      <Image
        source={imageSource}
        style={{
          width: 60,
          height: '100%',
          borderRadius: 8,
          marginRight: 12,
        }}
        resizeMode="cover"
      />

      {/* Event Content */}
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        {/* Title and Badges Row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text
              style={{
                color: useThemeColor('--color-secondary'),
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 2,
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              style={{
                color: textColor,
                fontSize: 14,
                // opacity: 0.7,
                marginBottom: 8,
              }}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          </View>

          {isHappening && <Badge text="Agora" variant="happening" icon='dot-fill' />}
        </View>

        {/* Distance and Address */}
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <MaterialIcons color={useThemeColor('--color-text', 0.6)} name={"route"} size={14} />
            <Text
              style={{
                color: textColor,
                fontSize: 12,
                opacity: 0.6,
                marginLeft: 4,
              }}
              numberOfLines={1}
            >
              {distance}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <MaterialIcons color={useThemeColor('--color-text', 0.6)} name={"location-on"} size={14} />
            <Text
              style={{
                color: textColor,
                fontSize: 12,
                opacity: 0.6,
                marginLeft: 4,
              }}
              numberOfLines={1}
            >
              {address}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}