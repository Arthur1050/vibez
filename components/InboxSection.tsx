import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import FriendInboxItem from './FriendInboxItem';

interface Friend {
  id: string;
  name: string;
  profileImage: any;
  unreadCount?: number;
}

interface InboxSectionProps {
  friends: Friend[];
  onFriendPress?: (friendId: string) => void;
}

export default function InboxSection({ friends, onFriendPress }: InboxSectionProps) {
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
        Inbox
      </Text>

      {/* Friends Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 2,
        }}
      >
        {friends.map((friend) => (
          <FriendInboxItem
            key={friend.id}
            id={friend.id}
            name={friend.name}
            profileImage={friend.profileImage}
            unreadCount={friend.unreadCount}
            onPress={() => onFriendPress?.(friend.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}