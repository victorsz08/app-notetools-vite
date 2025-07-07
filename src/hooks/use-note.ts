import type { DataNote } from "@/@types";
import { useAuth } from "@/context/auth-context";
import api from "@/lib/api";





interface GetNotesResponse {
  notes: DataNote[];
  totalItems: number;
  totalPages: number;
  limit: number;
  page: number;
};

interface UpdateNoteInput {
    id: string;
    title: string;
    content: string;
};

interface UseNoteProps {
    getNotes: () => Promise<GetNotesResponse>;
    newNote: () => Promise<void>;
    updateNote: (input: UpdateNoteInput) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
};


export function useNote(): UseNoteProps {
    const { user } = useAuth();
    const getNotes = async () => {
        const response = await api.get<GetNotesResponse>("list-notes?page=1&limit=100");
        return response.data;
    };

    const newNote = async () => {
        await api.post(`notes/${user?.id}`, {
            title: "Nova anotação",
            content: "Olá, comece a utilizar a sua anotação",
        });
        return;
    };

    const updateNote = async (input: UpdateNoteInput) => {
        await api.put(`notes/${input.id}`, {
            title: input.title,
            content: input.content,
        });
        return;
    };

    const deleteNote = async (id: string) => {
        await api.delete(`notes/${id}`);
        return;
    };

    return {
        getNotes,
        newNote,
        updateNote,
        deleteNote
    };
}