// src/stores/useNoteEditor.ts
import { create } from "zustand";

type NoteEditorStore = {
  isOpen: boolean;
  title: string;
  id: string;
  content: string;
  open: (title: string, content: string, id: string) => void;
  close: () => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
};

export const useNoteEditor = create<NoteEditorStore>((set) => ({
  isOpen: false,
  title: "",
  id: "",
  content: "",
  open: (title, content, id) => set({ isOpen: true, title, content, id }),
  close: () => set({ isOpen: false }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
}));
