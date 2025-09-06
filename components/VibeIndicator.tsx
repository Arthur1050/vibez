import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface VibeIndicatorProps {
  vibeScore: number; // 0-100
  showLabel?: boolean;
}

export default function VibeIndicator({ vibeScore, showLabel = true }: VibeIndicatorProps) {
  const getVibeColor = (score: number) => {
    if (score >= 80) return '#4CAF50'; // Verde
    if (score >= 60) return '#FFA836'; // Laranja
    if (score >= 40) return '#FF9800'; // Laranja escuro
    return '#FF5252'; // Vermelho
  };

  const vibeColor = getVibeColor(vibeScore);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
      }}
    >
      <Ionicons 
        name="flame" 
        size={12} 
        color={vibeColor} 
        style={{ marginRight: 4 }}
      />
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 12,
          fontWeight: '600',
        }}
      >
        {vibeScore}°
      </Text>
      {showLabel && (
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 10,
            opacity: 0.8,
            marginLeft: 2,
          }}
        >
          vibe
        </Text>
      )}
    </View>
  );
}