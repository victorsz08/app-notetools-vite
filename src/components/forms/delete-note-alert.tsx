import { useNote } from "@/hooks/use-note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useState } from "react";






export function DeleteNoteAlert({ id } : { id: string }) {
    const { deleteNote } = useNote();
    const queryClient = useQueryClient();

    const [open, setOpen] = useState<boolean>(false);

    const { mutate , isPending } = useMutation({
        mutationFn: () => deleteNote(id),
        mutationKey: ["delete-note"],
        onSuccess: () => {
            toast.success("Anotação excluida com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["get-notes"]});
            setOpen(false);
        }
    });


    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" disabled={isPending}>
                    Excluir anotação
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você deseja excluir essa anotação?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogCancel>
                    Cancelar
                </AlertDialogCancel>
                <AlertDialogAction disabled={isPending} onClick={() => mutate()}>
                    {isPending ? "Excluindo....": "Confirmar"}
                </AlertDialogAction>
            </AlertDialogContent>
        </AlertDialog>
    )
}