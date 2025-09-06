import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import MessageBadge from './MessageBadge';

interface FriendInboxItemProps {
  id: string;
  name: string;
  profileImage: any;
  unreadCount?: number;
  onPress?: () => void;
}

export default function FriendInboxItem({
  id,
  name,
  profileImage,
  unreadCount = 0,
  onPress,
}: FriendInboxItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: 'center',
        marginRight: 16,
        width: 70,
      }}
    >
      {/* Profile Image with Badge */}
      <View style={{ position: 'relative', marginBottom: 8 }}>
        <Image
          source={profileImage}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
          resizeMode="cover"
        />
        <MessageBadge count={unreadCount} />
      </View>

      {/* Friend Name */}
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 12,
          fontWeight: '500',
          textAlign: 'center',
        }}
        numberOfLines={1}
      >
        {name}
      </Text>
    </Pressable>
  );
}