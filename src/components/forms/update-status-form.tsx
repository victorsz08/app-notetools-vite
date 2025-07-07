import type { DataOrder, Status } from "@/@types";
import { useOrder } from "@/hooks/user-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BadgeStatus } from "../badge/badge-status";

const udpateStatusSchema = z.object({
  status: z.string().nonempty("Selecione um status"),
});

type UpdateStatusFormData = z.infer<typeof udpateStatusSchema>;

type StatusOptions = {
  value: Status;
};
const statusOptions: StatusOptions[] = [
  { value: "PENDENTE" },
  { value: "CONECTADO" },
  { value: "CANCELADO" },
];
export function UpdateStatusForm({ data }: { data: DataOrder }) {
  const { updateStatus } = useOrder();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<UpdateStatusFormData>({
    resolver: zodResolver(udpateStatusSchema),
    defaultValues: {
      status: data.status,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (newData: UpdateStatusFormData) =>
      updateStatus({ id: data.id, status: newData.status as Status }),
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["get-orders"] });
      toast.success("Status atualizado com sucesso!");
    },
    mutationKey: ["update-status"],
    onError: (error: any) => {
      error.response.data.details.forEach((err: any) =>
        form.setError(err.issue, { message: err.message })
      );
    },
  });

  function onSubmit(data: UpdateStatusFormData) {
    mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="text-xs w-full p-1 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
        asChild
      >
        <span>Atualizar status</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar status</DialogTitle>
          <DialogDescription>
            Contrato: {data.number} - {data.local}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={() => (
                <FormItem className="group relative">
                  <FormLabel className="absolute bg-card text-xs -translate-y-2 px-2 translate-x-1">
                    Status
                  </FormLabel>
                  <Select>
                    <SelectTrigger className="w-full">
                      <FormControl>
                        <SelectValue placeholder="--selecione um status--"/>
                      </FormControl>
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          <BadgeStatus variant={status.value} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center gap-2 w-full">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Atualizando..." : "Atualizar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
