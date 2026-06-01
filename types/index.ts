// types/index.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string | null;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Folder {
  id: string;
  name: string;
  createdAt: number;
}

export interface AppSettings {
  autoSave: boolean;
  defaultFolderId: string | null;
}
