import React from 'react';
import { Text, View } from 'react-native';

interface MessageBadgeProps {
  count: number;
}

export default function MessageBadge({ count }: MessageBadgeProps) {
  if (count === 0) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#FF5252',
        borderRadius: 12,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#24223A', // Dark theme background
        zIndex: 1,
      }}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 11,
          fontWeight: '600',
        }}
      >
        {count > 99 ? '99+' : count.toString()}
      </Text>
    </View>
  );
}