import type { DataOrder } from "@/@types";
import { useOrder } from "@/hooks/user-order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";






export function DeleteOrderForm({ data } : { data: DataOrder }) {
    const { deleteOrder } = useOrder();
    const queryClient = useQueryClient();

    const [open, setOpen] = useState<boolean>(false);

    const { mutate, isPending } = useMutation({
        mutationFn: () => deleteOrder({ id: data.id }),
        mutationKey: ["delete-order"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            setOpen(false);
            toast.success("Pedido deletado com sucesso");
        },
        onError: () => {
            toast.error("Erro ao deletar pedido");
        }
    });

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger 
                className="text-xs w-full flex items-center gap-1 p-2 
                    cursor-pointer text-destructive/90 hover:text-destructive transition-colors"
                >
                <Trash className="w-3 h-3"/>
                <span>Excluir</span>
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col gap-10">
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja excluir o pedido {data.number} - {data.local}?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex items-center justify-center gap-2">
                    <AlertDialogCancel asChild>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-[120px]"
                        >Cancelar</Button>
                    </AlertDialogCancel>
                    <Button
                        type="button"
                        variant="destructive"
                        className="w-[120px]"
                        disabled={isPending}
                        onClick={() => mutate()}
                    >
                        Excluir
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}