import { Editor } from "primereact/editor";
import { useNoteEditor } from "@/hooks/use-note-dialog";
import { useNote } from "@/hooks/use-note";
import { useMutation } from "@tanstack/react-query";
import { Dialog } from "primereact/dialog";

export function NoteEditorDialog() {
  const { isOpen, id, title, content, close, setContent } = useNoteEditor();

  const { updateNote } = useNote();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await updateNote({
        id: id,
        content,
        title,
      });

      return;
    },
    mutationKey: ["updateNote"],
  });

  return (
    <Dialog visible={isOpen} onHide={() => close()} modal={false}>
      <Editor
        value={content}
        onTextChange={(e) => setContent(e.htmlValue || "")}
        style={{ height: "90%", fontFamily: "Poppins" }}
        spellCheck={false}
        onBlur={() => mutate()}
      />
    </Dialog>
  );
}
