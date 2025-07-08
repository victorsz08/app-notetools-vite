import { DataNote } from "@/@types";
import { useNote } from "@/hooks/use-note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog } from "primereact/dialog";
import { Editor } from "primereact/editor";
import { useState } from "react";

export function DialogNote({
  data,
  visible,
  setVisible,
}: {
  data: DataNote | null;
  visible: boolean;
  setVisible: (value: boolean) => void;
}) {
  const [noteCraft, setNoteCraft] = useState<DataNote | null>(data);

  const { updateNote } = useNote();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (noteCraft) {
        await updateNote({
          id: noteCraft.id,
          title: noteCraft.title,
          content: noteCraft.content,
        });
      }
    },
    mutationKey: ["update-note"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notes"] });
    },
  });

  return (
    <Dialog
      visible={visible}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
      modal={false}
    >
      <Editor
        spellCheck={false}
        style={{
          fontFamily: "Poppins",
          backgroundColor: "var(--color-card)",
          height: "60vh",
        }}
        className="w-full font-poppins"
        value={noteCraft?.content}
        key={noteCraft?.id}
        onBlur={() => {
          mutate();
        }}
        onTextChange={(e) => {
          if (noteCraft) {
            setNoteCraft({ ...noteCraft, content: e.htmlValue || "" });
          }
        }}
      />
    </Dialog>
  );
}
