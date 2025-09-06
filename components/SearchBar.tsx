import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({ 
  placeholder = "Buscar por eventos...", 
  onSearch, 
  onChangeText 
}: SearchBarProps) {
  const [searchText, setSearchText] = useState('');
  const backgroundColor = useThemeColor('--color-background-alt');
  const textColor = useThemeColor('--color-text');
  const placeholderColor = useThemeColor('--color-text');

  const handleTextChange = (text: string) => {
    setSearchText(text);
    onChangeText?.(text);
  };

  const handleSubmit = () => {
    onSearch?.(searchText);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 16,
        marginBottom: 20,
      }}
    >
      <Ionicons 
        name="search" 
        size={20} 
        color={placeholderColor} 
        style={{ opacity: 0.6, marginRight: 12 }}
      />
      <TextInput
        style={{
          flex: 1,
          color: textColor,
          fontSize: 16,
        }}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={searchText}
        onChangeText={handleTextChange}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />
    </View>
  );
}