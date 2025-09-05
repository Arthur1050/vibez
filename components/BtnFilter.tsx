import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';

interface BtnFilterProps {
  title: string;
  isActive?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export default function BtnFilter({ title, isActive = false, onPress, style }: BtnFilterProps) {
  const backgroundColor = useThemeColor(isActive ? '--color-primary' : '--color-background-alt');
  const textColor = useThemeColor('--color-text');
  const borderColor = useThemeColor('--color-border');

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          backgroundColor,
          borderWidth: 1,
          borderColor: isActive ? backgroundColor : borderColor,
          marginRight: 8,
          minWidth: 60,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 14,
          fontWeight: isActive ? '600' : '400',
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}