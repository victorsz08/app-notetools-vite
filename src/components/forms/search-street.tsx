import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Label } from "../ui/label";
import { CheckCircle, MapPin, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Street {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}

const searchStreet = z.object({
  cep: z.string().nonempty("Digite um cep válido"),
});

type SearchStreetForm = z.infer<typeof searchStreet>;

export function SearchStreet() {
  const [address, setAddress] = useState<Street | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SearchStreetForm>({
    resolver: zodResolver(searchStreet),
    defaultValues: {
      cep: "",
    },
  });

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{3})/, "$1-$2")
    }
    return numbers.slice(0, 8).replace(/(\d{5})(\d{3})/, "$1-$2")
  }
  async function onSubmit(values: SearchStreetForm) {
    setIsLoading(true);
    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v2/${values.cep}`
    );
    const data = await response.json();

    if (data.status === 404) {
      form.setError("cep", {
        message: "CEP não encontrado",
      });
      setIsLoading(false);
    } else {
      setAddress(data);
      form.reset();
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full gap-7">
      <CardHeader className="flex mb-14 items-center justify-start gap-2">
        <span className="bg-primary/20 w-fit p-2 rounded-sm text-primary">
          <MapPin className="w-5 h-5" />
        </span>
        <div>
          <CardTitle>Buscar endereço</CardTitle>
          <CardDescription className="text-xs">
            Digite o cep para buscar o endereço
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem className="group relative">
                  <FormLabel className="bg-card px-1 absolute -translate-y-2 translate-x-2">
                    Digite o cep
                  </FormLabel>
                  <Input
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(formatCep(e.target.value));
                    }}
                    className="w-[350px] h-14 placeholder:text-muted-foreground/50"
                    placeholder="00000-000"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        {isLoading && (
          <section className="h-32 items-center flex justify-center">
            <div className="flex flex-row gap-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-bounce" />
              <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-.3s]" />
              <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-.5s]" />
            </div>
          </section>
        )}
        <AnimatePresence>
          {address && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4 bg-green-50 relative p-3 border border-muted-foreground/30 rounded-sm"
            >
              <X
                className="w-4 h-4 absolute right-2 top-2 text-foreground/60 cursor-pointer hover:text-foreground/80"
                onClick={() => setAddress(null)}
              />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h1 className="text-lg font-semibold text-muted-foreground">
                  Logradouro localizado
                </h1>
              </div>
              <section className="flex justify-between mr-5">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground/70 tracking-tight">
                    CEP
                  </Label>
                  <p className="text-sm font-medium text-foreground/60">
                    {address.cep || "Não informado"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground/70 tracking-tight">
                    Logradouro
                  </Label>
                  <p className="text-sm font-medium text-foreground/60">
                    {address.street || "Não informado"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground/70 tracking-tight">
                    Bairro
                  </Label>
                  <p className="text-sm font-medium text-foreground/60">
                    {address.neighborhood || "Não informado"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground/70 tracking-tight">
                    Cidade
                  </Label>
                  <p className="text-sm font-medium text-foreground/60">
                    {address.city || "Não informado"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground/70 tracking-tight">
                    Estado
                  </Label>
                  <p className="text-sm font-medium text-foreground/60">
                    {address.state || "Não informado"}
                  </p>
                </div>
              </section>
            </motion.section>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
