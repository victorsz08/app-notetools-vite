import { useOrder } from "@/hooks/user-order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";





interface DeleteGroup {
    groupId?: string[];
};



export function DeleteGroupOrders({ groupId }: DeleteGroup) {
    const { deleteGroupOrders } = useOrder();
    const queryClient = useQueryClient();
    const [open, setOpen] = useState<boolean>(false);

    const { mutate, isPending } = useMutation({
        mutationFn: () => deleteGroupOrders(groupId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-orders"] });
            setOpen(false);
            toast.success("Pedidos excluidos com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao excluir pedidos!");
        }
    });

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    type="button"
                    variant="destructive"
                    className="flex items-center gap-1"
                    disabled={isPending || groupId?.length === 0}
                >
                    <span>Excluir selecionados</span>
                    <Trash className="w-4 h-4"/>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col gap-10">
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja excluir os pedidos selecionados?
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