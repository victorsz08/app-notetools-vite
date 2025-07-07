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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNote } from "@/hooks/use-note";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, Notebook } from "lucide-react";
import moment from "moment";
import { Editor } from "primereact/editor";
import { useState } from "react";
import { toast } from "sonner";

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

  const { mutate: createNote, isPending: createIsPending } = useMutation({
    mutationFn: newNote,
    mutationKey: ["create-note"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Anotação criada!")
    },
  });

  const { mutate: update, isPending: updateIsPending } = useMutation({
    mutationFn: async () => {
      if (selectedNote) {
        await updateNote({
          id: selectedNote.id,
          title: selectedNote.title,
          content: selectedNote.content,
        });
      }
    },
    mutationKey: ["update-note"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const { mutate: remove, isPending: isRemovePending } = useMutation({
    mutationFn: async () => {
      if (selectedNote) {
        await deleteNote(selectedNote.id);
      }
    },
    mutationKey: ["delete-note"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setSelectedNote(undefined);
      toast.success("Anotação excluida com sucesso!");
    },
  });

  const [selectedNote, setSelectedNote] = useState<DataNote | undefined>(
    undefined
  );

  if (isPending) {
    return <Skeleton className="w-full h-full bg-muted" />;
  }

  return (
    <section className="p-4 h-[85vh] flex gap-4">
      <div className="w-[30vw] h-full space-y-6">
        <div className="flex flex-col gap-1">
          <Button disabled={createIsPending} onClick={() => createNote()}>
            {createIsPending ? "Criando..." : "Criar anotação"}
          </Button>
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

      <Separator orientation="vertical" />

      {/* Bloco do editor de texto */}
      {selectedNote ? (
        <div className="flex flex-col bg-card p-4 border h-[85vh] border-border rounded-sm gap-2 w-full">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1 mb-5">
              <Label className="text-xs text-muted-foreground/60">Título</Label>
                <input
                  className="w-full p-0 text-base font-semibold tracking-tight text-muted-foreground bg-transparent"
                  key={selectedNote.id}
                  value={selectedNote.title}
                  onChange={(e) => {
                    setSelectedNote({ ...selectedNote, title: e.target.value });
                  }}
                  onBlur={() => {
                    update();
                  }}
                />
            </div>
            <div className="flex items-center gap-3 justify-end">
              {updateIsPending && (
                <div className="flex items-center gap-1">
                    <LoaderCircle className="w-3 h-3 animate-spin repeat-infinite text-muted-foreground/80" />
                    <span className="text-xs font-light text-muted-foreground/80">Salvando...</span>
                  </div>
              )}
              <Button
                disabled={isRemovePending}
                variant="destructive"
                onClick={() => remove()}
              >
                {isRemovePending ? "Excluindo..." : "Excluir"}
              </Button>
            </div>
          </div>

          <Editor
            spellCheck={false}
            style={{
              fontFamily: "Poppins",
              backgroundColor: "var(--color-card)",
              height: "60vh",
            }}
            className="w-full font-poppins"
            value={selectedNote.content}
            key={selectedNote.id}
            onBlur={() => {
              update();
            }}
            onTextChange={(e) => {
              setSelectedNote({ ...selectedNote, content: e.textValue });
            }}
          />
        </div>
      ) : (
        <section className="h-full w-full flex justify-center items-center">
          <div className="flex flex-col gap-4 items-center justify-center">
            <Notebook className="w-16 h-16 text-muted-foreground" />
            <div className="text-center">
              <h1 className="text-xl font-semibold text-muted-foreground">
                Selecione ou crie uma anotação
              </h1>
              <small className="text-xs font-light text-muted-foreground/60">
                Selecione uma anotação ou crie uma nova anotação, e comece a
                utilizar o editor
              </small>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
