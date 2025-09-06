import ExploreSection from '@/components/ExploreSection'; // Usando o mesmo componente
import InboxSection from '@/components/InboxSection';
import UserProfileHeader from '@/components/UserProfileHeader';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTheme } from '@/providers/ThemeProvider';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const mockUserData = {
  name: 'Arthur Tosta',
  points: 320,
  profileImage: require('@/assets/images/user-profile.jpg'), // Você precisa adicionar esta imagem
};

const mockFriends = [
  {
    id: '1',
    name: 'Ciclano',
    profileImage: require('@/assets/images/friend.jpg'),
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Ciclano',
    profileImage: require('@/assets/images/friend.jpg'),
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Ciclano',
    profileImage: require('@/assets/images/friend.jpg'),
    unreadCount: 1,
  },
  {
    id: '4',
    name: 'Ciclano',
    profileImage: require('@/assets/images/friend.jpg'),
    unreadCount: 5,
  },
  {
    id: '5',
    name: 'Ciclano',
    profileImage: require('@/assets/images/friend.jpg'),
    unreadCount: 0,
  },
];

const mockConfirmedEvents = [
  {
    id: '1',
    title: 'THE BEATLES',
    subtitle: 'Tribute Band',
    imageSource: require('@/assets/images/event-placeholder.png'),
  },
  {
    id: '2',
    title: 'OZZY',
    subtitle: 'Rock Concert',
    imageSource: require('@/assets/images/event-placeholder.png'),
  },
  {
    id: '3',
    title: '2 DOS HERDEIROS',
    subtitle: 'Sertanejo Show',
    imageSource: require('@/assets/images/event-placeholder.png'),
  },
];

const mockEventHistory = [
  {
    id: '4',
    title: 'PAGODE DO LOVE',
    subtitle: 'Casa di Giulietta',
    imageSource: require('@/assets/images/event-placeholder.png'),
  },
  {
    id: '5',
    title: 'ROCK NIGHT',
    subtitle: 'Bar do João',
    imageSource: require('@/assets/images/event-placeholder.png'),
  },
  {
    id: '6',
    title: 'JAZZ SESSION',
    subtitle: 'Blue Note',
    imageSource: require('@/assets/images/event-placeholder.png'),
  },
];

export default function Perfil() {
  const { schema } = useTheme();
  const textColor = useThemeColor('--color-text');

  const handleFriendPress = (friendId: string) => {
    console.log('Friend pressed:', friendId);
    // Implementar navegação para chat ou perfil do amigo
  };

  const handleEventPress = (eventId: string) => {
    console.log('Event pressed:', eventId);
    // Implementar navegação para detalhes do evento
  };

  return (
    <SafeAreaView style={[schema, { flex: 1 }]}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ paddingTop: 16, paddingBottom: 8 }}>
          <Text
            style={{
              color: textColor,
              fontSize: 28,
              fontWeight: '700',
              paddingHorizontal: 16,
              marginBottom: 8,
            }}
          >
            Perfil
          </Text>
        </View>

        {/* Content */}
        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* User Profile Header */}
          <UserProfileHeader
            name={mockUserData.name}
            points={mockUserData.points}
            profileImage={mockUserData.profileImage}
          />

          {/* Inbox Section */}
          <InboxSection
            friends={mockFriends}
            onFriendPress={handleFriendPress}
          />

          {/* Confirmed Events Section */}
          <ExploreSection
            title="Rolês confirmado"
            events={mockConfirmedEvents}
            showVibeIndicator={false} // Não mostra vibe indicator
            onEventPress={handleEventPress}
          />

          {/* Event History Section */}
          <ExploreSection
            title="Histórico de rolês"
            events={mockEventHistory}
            showVibeIndicator={false} // Não mostra vibe indicator
            onEventPress={handleEventPress}
          />

          {/* Bottom spacing for tab bar */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}