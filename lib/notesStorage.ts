import * as SecureStore from "expo-secure-store";
import { Note } from "../types/note";

const STORAGE_KEY = "NOTES_APP_DATA";

export const getNotes = async (): Promise<Note[]> => {
  try {
    const data = await SecureStore.getItemAsync(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error loading notes:", error);
    return [];
  }
};

export const saveNotes = async (notes: Note[]) => {
  try {
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.log("Error saving notes:", error);
  }
};

export const addNote = async (note: Note) => {
  const notes = await getNotes();
  notes.unshift(note);
  await saveNotes(notes);
};

export const updateNote = async (updatedNote: Note) => {
  const notes = await getNotes();
  const updated = notes.map((n) =>
    n.id === updatedNote.id ? updatedNote : n
  );
  await saveNotes(updated);
};

export const deleteNote = async (id: string) => {
  const notes = await getNotes();
  const filtered = notes.filter((n) => n.id !== id);
  await saveNotes(filtered);
};
