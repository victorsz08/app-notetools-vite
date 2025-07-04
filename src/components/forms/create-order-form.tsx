import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { CidadeCombobox } from "../inputs/combobox";

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

  function onSubmit(data: CreateOrderForm) {
    console.log(data);
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">
          <Plus className="w-3 h-3" />
          <span>Novo pedido</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[40vw]">
        <DialogHeader className="mb-6">
          <DialogTitle>Novo pedido</DialogTitle>
          <DialogDescription>Preencha todas as informações</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
