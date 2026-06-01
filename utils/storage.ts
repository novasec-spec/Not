// utils/storage.ts
import * as SecureStore from 'expo-secure-store';
import { Note, Folder, AppSettings } from '../types';

const KEYS = {
  NOTES: 'novanotes_notes',
  FOLDERS: 'novanotes_folders',
  SETTINGS: 'novanotes_settings'
};

export const storage = {
  // Notes
  async getNotes(): Promise<Note[]> {
    const data = await SecureStore.getItemAsync(KEYS.NOTES);
    return data ? JSON.parse(data) : [];
  },
  async saveNotes(notes: Note[]): Promise<void> {
    await SecureStore.setItemAsync(KEYS.NOTES, JSON.stringify(notes));
  },
  
  // Folders
  async getFolders(): Promise<Folder[]> {
    const data = await SecureStore.getItemAsync(KEYS.FOLDERS);
    return data ? JSON.parse(data) : [];
  },
  async saveFolders(folders: Folder[]): Promise<void> {
    await SecureStore.setItemAsync(KEYS.FOLDERS, JSON.stringify(folders));
  },
  
  // Settings
  async getSettings(): Promise<AppSettings> {
    const data = await SecureStore.getItemAsync(KEYS.SETTINGS);
    return data ? JSON.parse(data) : { autoSave: true, defaultFolderId: null };
  },
  async saveSettings(settings: AppSettings): Promise<void> {
    await SecureStore.setItemAsync(KEYS.SETTINGS, JSON.stringify(settings));
  }
};
