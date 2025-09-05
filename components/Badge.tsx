import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

interface BadgeProps {
  text: string;
  variant?: 'happening' | 'distance' | 'default';
  style?: ViewStyle;
  icon?: React.ComponentProps<typeof MaterialIcons>['name'] | React.ComponentProps<typeof Octicons>['name'];
}

export default function Badge({ text, variant = 'default', style, icon }: BadgeProps) {
    const backgroundAlt = useThemeColor('--color-background-alt');
    const background = useThemeColor('--color-background');
    const textColorTheme = useThemeColor('--color-text');
    const primaryColor = useThemeColor('--color-primary');

    const getBadgeColors = () => {
    switch (variant) {
      case 'happening':
        return {
          backgroundColor: '#FFA836',
          textColor: background,
        };
      case 'distance':
        return {
          backgroundColor: backgroundAlt,
          textColor: textColorTheme,
        };
      default:
        return {
          backgroundColor: primaryColor,
          textColor: '#FFFFFF',
        };
    }
  };

  const { backgroundColor, textColor } = getBadgeColors();

  let iconElement = null;

  if (icon) {
    if (icon in MaterialIcons.glyphMap) {
      iconElement = <MaterialIcons name={icon as keyof typeof MaterialIcons.glyphMap} size={12} color={textColor} style={{ marginRight: 4 }} />;
    }
    
    if (icon in Octicons.glyphMap) {
      iconElement = <Octicons name={icon as keyof typeof Octicons.glyphMap} size={12} color={textColor} style={{ marginRight: 4 }} />;
    }
  }

  return (
    <View
      style={[
        {
          backgroundColor,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 12,
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 20,
        },
        style,
      ]}
    >
      {iconElement}
      <Text
        style={{
          color: textColor,
          fontSize: 12,
          fontWeight: '500',
        }}
      >
        {text}
      </Text>
    </View>
  );
}