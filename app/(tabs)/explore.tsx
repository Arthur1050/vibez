import BannerSlider from '@/components/BannerSlider';
import ExploreSection from '@/components/ExploreSection';
import SearchBar from '@/components/SearchBar';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTheme } from '@/providers/ThemeProvider';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const mockBanners = [
  {
    id: '1',
    imageSource: require('@/assets/images/banner-1.png'), // Você precisa adicionar estas imagens
  },
  {
    id: '2',
    imageSource: require('@/assets/images/banner-2.png'),
  },
  {
    id: '3',
    imageSource: require('@/assets/images/banner-3.png'),
  },
];

const mockEventsData = {
  trending: [
    {
      id: '1',
      title: 'THE BEATLES',
      subtitle: 'Tribute Band',
      imageSource: require('@/assets/images/event-placeholder.png'),
      vibeScore: 100,
    },
    {
      id: '2',
      title: 'OZZY',
      subtitle: 'Rock Concert',
      imageSource: require('@/assets/images/event-placeholder.png'),
      vibeScore: 87,
    },
    {
      id: '3',
      title: '2 DOS HERDEIROS',
      subtitle: 'Sertanejo Show',
      imageSource: require('@/assets/images/event-placeholder.png'),
      vibeScore: 93,
    },
  ],
  nearby: [
    {
      id: '4',
      title: 'PAGODE NO QUINTAL',
      subtitle: 'Casa di Giulietta',
      imageSource: require('@/assets/images/event-placeholder.png'),
      vibeScore: 76,
    },
    {
      id: '5',
      title: 'ROCK NIGHT',
      subtitle: 'Bar do João',
      imageSource: require('@/assets/images/event-placeholder.png'),
      vibeScore: 82,
    },
    {
      id: '6',
      title: 'JAZZ SESSION',
      subtitle: 'Blue Note',
      imageSource: require('@/assets/images/event-placeholder.png'),
      vibeScore: 65,
    },
  ],
};

export default function Explore() {
  const { schema } = useTheme();
  const textColor = useThemeColor('--color-text');

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implementar lógica de busca
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
              marginBottom: 16,
            }}
          >
            Explorar
          </Text>
          
          <SearchBar 
            placeholder="Buscar por eventos..."
            onSearch={handleSearch}
          />
        </View>

        {/* Content */}
        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Banner Slider */}
          <BannerSlider banners={mockBanners} />

          {/* Trending Section */}
          <ExploreSection
            title="Bombando agora em Uberaba"
            events={mockEventsData.trending}
            onEventPress={handleEventPress}
          />

          {/* Nearby Section */}
          <ExploreSection
            title="Pertos de você"
            events={mockEventsData.nearby}
            onEventPress={handleEventPress}
          />

          {/* Bottom spacing for tab bar */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}