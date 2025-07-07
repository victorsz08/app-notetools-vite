import type { DataOrder } from "@/@types";
import { useOrder } from "@/hooks/user-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { SchedulingInput } from "../inputs/scheduling-input";
import moment from "moment";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { CalendarCog } from "lucide-react";

const updateSchedulingSchema = z.object({
  schedulingDate: z.string().nonempty("Data de agendamento é obrigatória"),
  schedulingTime: z.string().nonempty("Horário de agendamento é obrigatório"),
});

type UpdateSchedulingForm = z.infer<typeof updateSchedulingSchema>;

export function UpdateSchedulingForm({ data }: { data: DataOrder }) {
  const [open, setOpen] = useState<boolean>(false);

  const { updateScheduling } = useOrder();
  const form = useForm<UpdateSchedulingForm>({
    resolver: zodResolver(updateSchedulingSchema),
    defaultValues: {
      schedulingDate: data.schedulingDate,
      schedulingTime: data.schedulingTime,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (order: UpdateSchedulingForm) =>
      updateScheduling({
        id: data.id,
        schedulingDate: order.schedulingDate,
        schedulingTime: order.schedulingTime,
      }),
    mutationKey: ["update-scheduling"],
    onSuccess: () => {
      form.reset();
      setOpen(false);
      toast.success("Agendamento atualizado com sucesso!");
    },
    onError: (err: any) => {
      err.response.data.details.forEach((error: any) => {
        form.setError(error.issue, {
          message: error.message,
        });
      });
    },
  });

  function onSubmit(input: UpdateSchedulingForm) {
    mutate(input);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-xs w-full flex items-center gap-1 p-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
        <CalendarCog className="w-3 h-3" />
        <span>Atualizar agendamento</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar agendamento</DialogTitle>
          <DialogDescription>
            Contrato: {data.number} - {data.local}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="schedulingDate"
              render={() => (
                <FormItem className="group relative">
                  <FormLabel className="absolute bg-card text-xs -translate-y-2 px-2 translate-x-1">
                    Agendamento
                  </FormLabel>
                  <SchedulingInput
                    value={{
                      date: moment(form.watch("schedulingDate")).toDate(),
                      time: form.watch("schedulingTime"),
                    }}
                    onChange={(value) => {
                      form.setValue("schedulingDate", value.date.toISOString());
                      form.setValue("schedulingTime", value.time);
                    }}
                  />
                  {form.formState.errors.schedulingDate && (
                    <FormMessage>
                      {form.formState.errors.schedulingDate.message}
                    </FormMessage>
                  )}
                  {form.formState.errors.schedulingTime && (
                    <FormMessage>
                      {form.formState.errors.schedulingTime.message}
                    </FormMessage>
                  )}
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
