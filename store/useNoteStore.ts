// store/useNoteStore.ts
import { create } from 'zustand';
import { Note, Folder } from '../types';
import { storage } from '../utils/storage';

interface NoteStore {
  notes: Note[];
  folders: Folder[];
  searchQuery: string;
  isLoading: boolean;
  
  // Actions
  loadData: () => Promise<void>;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  addFolder: (name: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
}

export const useNoteStore = create<NoteStore>((set, get) => ({
  notes: [],
  folders: [],
  searchQuery: '',
  isLoading: true,
  
  loadData: async () => {
    const [notes, folders] = await Promise.all([
      storage.getNotes(),
      storage.getFolders()
    ]);
    set({ notes, folders, isLoading: false });
  },
  
  addNote: async (noteData) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    const updatedNotes = [newNote, ...get().notes];
    await storage.saveNotes(updatedNotes);
    set({ notes: updatedNotes });
  },
  
  updateNote: async (id, updates) => {
    const updatedNotes = get().notes.map(note =>
      note.id === id 
        ? { ...note, ...updates, updatedAt: Date.now() }
        : note
    );
    await storage.saveNotes(updatedNotes);
    set({ notes: updatedNotes });
  },
  
  deleteNote: async (id) => {
    const updatedNotes = get().notes.filter(note => note.id !== id);
    await storage.saveNotes(updatedNotes);
    set({ notes: updatedNotes });
  },
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  addFolder: async (name) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      createdAt: Date.now()
    };
    const updatedFolders = [...get().folders, newFolder];
    await storage.saveFolders(updatedFolders);
    set({ folders: updatedFolders });
  },
  
  deleteFolder: async (id) => {
    // Move notes in this folder to no folder (null)
    const updatedNotes = get().notes.map(note =>
      note.folderId === id ? { ...note, folderId: null } : note
    );
    const updatedFolders = get().folders.filter(folder => folder.id !== id);
    
    await Promise.all([
      storage.saveNotes(updatedNotes),
      storage.saveFolders(updatedFolders)
    ]);
    set({ notes: updatedNotes, folders: updatedFolders });
  }
}));
