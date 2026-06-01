// components/NoteCard.tsx - DARK MODE
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Note } from '../types';
import { Feather } from '@expo/vector-icons';

interface Props {
  note: Note;
  folderName?: string;
  onPress: () => void;
  onDelete: () => void;
}

export function NoteCard({ note, folderName, onPress, onDelete }: Props) {
  const preview = note.content.slice(0, 100);
  const date = new Date(note.updatedAt).toLocaleDateString();
  
  return (
    <Pressable onPress={onPress} style={{ marginBottom: 12 }}>
      <View style={{
        backgroundColor: '#1c1c1e',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 2
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '600', flex: 1, color: '#ffffff' }} numberOfLines={1}>
            {note.title || 'Untitled'}
          </Text>
          <TouchableOpacity onPress={onDelete} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Feather name="trash-2" size={18} color="#ff453a" />
          </TouchableOpacity>
        </View>
        
        {folderName && (
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <Feather name="folder" size={12} color="#8e8e93" />
            <Text style={{ fontSize: 12, color: '#8e8e93', marginLeft: 4 }}>{folderName}</Text>
          </View>
        )}
        
        <Text style={{ marginTop: 8, color: '#ebebf0', lineHeight: 20 }} numberOfLines={2}>
          {preview || 'Empty note'}
        </Text>
        
        <Text style={{ marginTop: 8, fontSize: 11, color: '#636366' }}>{date}</Text>
      </View>
    </Pressable>
  );
}
