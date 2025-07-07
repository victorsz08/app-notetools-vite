import type { DataNote } from "@/@types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useNote } from "@/hooks/use-note";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { Editor } from "primereact/editor";
import { useState } from "react";

export function NotePage() {
  const queryClient = useQueryClient();
  const { getNotes, newNote, updateNote, deleteNote } = useNote();

  const { data, isPending } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    refetchOnWindowFocus: false,
    initialData: {
      notes: [],
      totalItems: 0,
      totalPages: 0,
      limit: 0,
      page: 0,
    },
  });

  const { mutate: createNote } = useMutation({
    mutationFn: newNote,
    mutationKey: ["create-note"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: () =>
      updateNote({
        id: selectedNote.id,
        title: selectedNote.title,
        content: selectedNote.content,
      }),
    mutationKey: ["update-note"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const { mutate: remove } = useMutation({
    mutationFn: () => deleteNote(selectedNote.id),
    mutationKey: ["delete-note"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
            setSelectedNote(data.notes[0]);
    },
  });

  const [selectedNote, setSelectedNote] = useState<DataNote>(data.notes[0]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (isPending) {
    return <Skeleton className="w-full h-full bg-muted" />;
  }

  return (
    <section className="p-4 h-[85vh] flex gap-4">
      <div className="w-[30vw] h-full space-y-6">
        <div className="flex flex-col gap-1">
          <Button onClick={() => createNote()}>Criar anotação</Button>
        </div>
        <ScrollArea>
          <div className="flex flex-col gap-2">
            {data.notes.map((note) => (
              <Card
                className={`w-full ${
                  note?.id === selectedNote?.id
                    ? "bg-muted border border-primary"
                    : ""
                } cursor-pointer hover:bg-muted transition-colors`}
                key={note?.id}
                onClick={() => setSelectedNote(note)}
              >
                <CardHeader>
                  <CardTitle>{note?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs">
                    {note?.content.replace(/<[^>]*>/g, "").substring(0, 30)}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col gap-0 justify-start items-start">
                  <Label className="text-xs text-muted-foreground/40 font-light">
                    Atualizado:
                  </Label>
                  <CardDescription className="text-xs font-light">
                    {moment(note.updatedAt).format("DD MMM YYYY HH:mm")}
                  </CardDescription>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-col bg-card p-4 border h-[85vh] border-border rounded-sm gap-2 w-full">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1 mb-5">
            <Label className="text-xs text-muted-foreground/60">Título</Label>
            {isEditing ? (
              <input
                className="w-full p-4 text-base font-semibold tracking-tight text-muted-foreground bg-transparent"
                key={selectedNote?.id}
                value={selectedNote?.title}
                onChange={(e) => {
                  setSelectedNote((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }));
                }}
                onBlur={() => {
                  update();
                  setIsEditing(false);
                }}
              />
            ) : (
              <h1
                onClick={() => setIsEditing(true)}
                key={selectedNote?.id}
                className="text-base font-semibold tracking-tight text-muted-foreground"
              >
                {selectedNote?.title}
              </h1>
            )}
          </div>
          <Button variant="destructive" onClick={() => remove()}>
            Excluir anotação
          </Button>
        </div>
        <Editor
          spellCheck={false}
          style={{
            fontFamily: "Poppins",
            backgroundColor: "var(--color-card)",
            height: "60vh",
          }}
          className="w-full font-poppins"
          value={selectedNote?.content}
          key={selectedNote?.id}
          onBlur={() => {
            update();
          }}
          onTextChange={(e) =>
            setSelectedNote((prev) => ({ ...prev, content: e.textValue }))
          }
        />
      </div>
    </section>
  );
}
