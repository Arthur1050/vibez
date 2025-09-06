import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface UserProfileHeaderProps {
  name: string;
  points: number;
  profileImage: any;
}

export default function UserProfileHeader({ name, points, profileImage }: UserProfileHeaderProps) {
  const textColor = useThemeColor('--color-text');
  const primaryColor = useThemeColor('--color-primary');

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 20,
        marginBottom: 24,
      }}
    >
      {/* Profile Image */}
      <Image
        source={profileImage}
        style={{
          width: 100,
          height: 100,
          borderRadius: 9999,
          marginRight: 16,
        }}
        resizeMode="cover"
      />

      {/* User Info */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: textColor,
            fontSize: 20,
            fontWeight: '600',
            marginBottom: 4,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            color: primaryColor,
            fontSize: 14,
            fontWeight: '500',
          }}
        >
          {points} pontos acumulados
        </Text>
      </View>
    </View>
  );
}