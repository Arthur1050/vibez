import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import BtnFilter from './BtnFilter';

interface Filter {
  id: string;
  title: string;
}

interface FilterScrollBarProps {
  filters: Filter[];
  onFilterPress?: (filterId: string) => void;
}

export default function FilterScrollBar({ filters, onFilterPress }: FilterScrollBarProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterPress = (filterId: string) => {
    setActiveFilter(activeFilter === filterId ? null : filterId);
    onFilterPress?.(filterId);
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      >
        {filters.map((filter) => (
          <BtnFilter
            key={filter.id}
            title={filter.title}
            isActive={activeFilter === filter.id}
            onPress={() => handleFilterPress(filter.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}