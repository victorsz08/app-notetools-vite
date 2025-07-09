import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Button } from "../ui/button";
import { LoaderCircleIcon, Plus } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { CidadeCombobox } from "../inputs/combobox";
import { SchedulingInput } from "../inputs/scheduling-input";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import api from "@/lib/api";
import { useState } from "react";

const createOrderSchema = z.object({
  number: z.string().nonempty("o numero do pedido é obrigatório"),
  local: z.string().nonempty("a cidade é obrigatório"),
  schedulingDate: z.string().nonempty("a data de agendamento é obrigatório"),
  schedulingTime: z.string().nonempty("o horário de agendamento é obrigatório"),
  price: z.string().nonempty("o valor é obrigatório"),
  contact: z.string().nonempty("o contato é obrigatório"),
});

type CreateOrderForm = z.infer<typeof createOrderSchema>;

export function CreateOrderForm() {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<CreateOrderForm>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      number: "",
      local: "",
      schedulingDate: "",
      schedulingTime: "",
      price: "",
      contact: "",
    },
  });

  function formatPriceFloat(value: string): number {
    const valueFormatted = value.replace("R$", "").replace(",", ".");
    return parseFloat(valueFormatted);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateOrderForm) => {
      await api.post(`orders/${user?.id}`, {
        number: Number(data.number),
        local: data.local,
        schedulingDate: moment(data.schedulingDate).toDate(),
        schedulingTime: data.schedulingTime,
        contact: data.contact,
        price: formatPriceFloat(data.price),
      });

      return;
    },
    mutationKey: ["create-order"],
    onSuccess: () => {
      form.reset();
      setOpen(false);
    },
    onError: (err: any) => {
      err.response.data.details.forEach((err: any) => {
        form.setError(err.issue, {
          message: err.message,
        });
      });
    },
  });

  function onSubmit(data: CreateOrderForm) {
    mutate(data);
  }

  function formatPrice(value: string) {
    const numbers = value.replace(/\D/g, "");
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(numbers) / 100);
  }

  function formatContact(value: string) {
    const numbers = value.replace(/\D/g, "");
    return numbers;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="w-fit">
          <Plus className="w-2 h-2" />
          <span className="pr-2">Novo pedido</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-[40vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="mb-6">
          <DialogTitle>Novo pedido</DialogTitle>
          <DialogDescription>Preencha todas as informações</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 space-x-2 space-y-6">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem className="group relative">
                    <FormLabel
                      className="bg-card text-xs font-medium text-muted-foreground/80 absolute -translate-y-2 
                                    px-2 translate-x-1"
                    >
                      N° do pedido
                    </FormLabel>
                    <Input
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/\D/g, ""));
                      }}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="local"
                render={({ field }) => (
                  <FormItem className="group relative">
                    <FormLabel
                      className="bg-card text-xs font-medium text-muted-foreground/80 absolute -translate-y-2 
                                    px-2 translate-x-1"
                    >
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
                    <FormLabel
                      className="bg-card text-xs font-medium text-muted-foreground/80 absolute -translate-y-2 
                                    px-2 translate-x-1"
                    >
                      Preço
                    </FormLabel>
                    <Input
                      onChange={(e) => {
                        field.onChange(formatPrice(e.target.value));
                      }}
                      value={field.value}
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
                    <FormLabel
                      className="bg-card text-xs font-medium text-muted-foreground/80 absolute -translate-y-2 
                                    px-2 translate-x-1"
                    >
                      Contato
                    </FormLabel>
                    <Input
                      onChange={(e) => {
                        field.onChange(formatContact(e.target.value));
                      }}
                      maxLength={11}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({}) => (
                  <FormItem className="group relative col-span-2">
                    <FormLabel
                      className="bg-card text-xs font-medium text-muted-foreground/80 absolute -translate-y-2 
                                    px-2 translate-x-1"
                    >
                      Agendamento
                    </FormLabel>
                    <SchedulingInput
                      value={{
                        date: moment(
                          form.watch("schedulingDate") || new Date()
                        ).toDate(),
                        time: form.watch("schedulingTime"),
                      }}
                      onChange={(value) => {
                        if (value) {
                          form.setValue(
                            "schedulingDate",
                            moment(value.date).format("YYYY-MM-DD")
                          ),
                            form.setValue("schedulingTime", value.time || "");
                        }
                      }}
                    />
                    {form.formState.errors.schedulingDate && (
                      <FormMessage>
                        {form.formState.errors.schedulingDate?.message}
                      </FormMessage>
                    )}
                    {form.formState.errors.schedulingTime && (
                      <FormMessage>
                        {form.formState.errors.schedulingTime?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-2 mt-6 justify-end">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="w-32">
                  Cancelar
                </Button>
              </DialogClose>
              <Button disabled={isPending} type="submit" className="w-32">
                {isPending ? (
                  <LoaderCircleIcon
                    className="-ms-1 animate-spin"
                    size={16}
                    aria-hidden="true"
                  />
                ) : (
                  "Criar"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
