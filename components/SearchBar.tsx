// components/SearchBar.tsx - DARK MODE
import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1c1c1e',
      margin: 16,
      paddingHorizontal: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#2c2c2e'
    }}>
      <Feather name="search" size={20} color="#8e8e93" />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search notes..."
        placeholderTextColor="#636366"
        style={{ flex: 1, padding: 12, fontSize: 16, color: '#ffffff' }}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
}
