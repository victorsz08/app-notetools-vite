import type { DataOrder } from "@/@types";
import { useOrder } from "@/hooks/user-order";
import { currency } from "@/lib/utils";
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
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CidadeCombobox } from "../inputs/combobox";
import { Pencil } from "lucide-react";

const updateInfoSchema = z.object({
  number: z.string().nonempty("numero do pedido é obrigatório"),
  local: z.string().nonempty("cidade é obrigatório"),
  price: z.string().nonempty("preço é obrigatório"),
  contact: z.string().nonempty("contato é obrigatório"),
});

type UpdateInfoFormData = z.infer<typeof updateInfoSchema>;

export function UpdateInfoForm({ data }: { data: DataOrder }) {
  const { updateInfo } = useOrder();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<UpdateInfoFormData>({
    resolver: zodResolver(updateInfoSchema),
    defaultValues: {
      number: String(data.number),
      local: data.local,
      price: currency(data.price),
      contact: data.contact,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (newData: UpdateInfoFormData) =>
      updateInfo({
        id: data.id,
        number: Number(newData.number),
        local: newData.local,
        price: Number(newData.price.replace("R$ ", "")),
        contact: newData.contact,
      }),
    mutationKey: ["update-info-form"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-orders"] });
      setOpen(false);
      toast.success("Pedido atualizado com sucesso!");
    },
    onError: (error: any) => {
      error.response.data.details.forEach((err: any) => {
        form.setError(err.issue, {
          message: err.message,
        });
      });
    },
  });

  function formatPrice(value: string) {
    const numbers = value.replace(/\D/g, "");
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(numbers) / 100);
  }

  function onSubmit(data: UpdateInfoFormData) {
    mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="text-xs w-full flex items-center gap-1 p-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
      >
        <Pencil className="w-3 h-3" />
        <span>Atualizar pedido</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar pedido</DialogTitle>
          <DialogDescription>
            Contrato: {data.number} - {data.local}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem className="group relative">
                  <FormLabel className="absolute bg-card text-xs -translate-y-2 px-2 translate-x-1">
                    N° do contrato
                  </FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="local"
              render={({ field }) => (
                <FormItem className="group relative">
                  <FormLabel className="absolute bg-card text-xs -translate-y-2 px-2 translate-x-1">
                    Cidade
                  </FormLabel>
                  <CidadeCombobox
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="group relative">
                  <FormLabel className="absolute bg-card text-xs -translate-y-2 px-2 translate-x-1">
                    Preço
                  </FormLabel>
                  <Input
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(formatPrice(e.target.value));
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem className="group relative">
                  <FormLabel className="absolute bg-card text-xs -translate-y-2 px-2 translate-x-1">
                    Contato
                  </FormLabel>
                  <Input {...field} maxLength={11}/>
                  <FormMessage />
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
