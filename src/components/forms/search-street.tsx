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
import { CheckCircle, LoaderCircle, MapPin, X } from "lucide-react";
import { motion } from "framer-motion";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<SearchStreetForm>({
    resolver: zodResolver(searchStreet),
    defaultValues: {
      cep: "",
    },
  });

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{3})/, "$1-$2");
    }
    return numbers.slice(0, 8).replace(/(\d{5})(\d{3})/, "$1-$2");
  };
  async function onSubmit(values: SearchStreetForm) {
    setIsLoading(true)
    try {
      const cepFormatted =
        values.cep.length === 7 ? `0${values.cep}` : values.cep;
      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${cepFormatted}`
      );
      const data = await response.json();
      setAddress(data);
      form.setValue("cep", "")
    } catch (error) {
      form.setError("cep", {
        message: "Cep incorreto",
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full gap-7 h-[260px]">
      <CardHeader className="flex mb-14 items-center justify-start gap-2">
        <div>
          <CardTitle>Buscar endereço</CardTitle>
          <CardDescription className="text-xs">
            Digite o cep para buscar o endereço
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between">
            <div className="relative w-fit">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem className="group relative">
                    <FormLabel className="bg-card px-1 absolute -translate-y-2 translate-x-2">
                      Digite o cep
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <Input
                      value={field.value}
                      onChange={(e) => {
                        setAddress(null);
                        field.onChange(formatCep(e.target.value));
                      }}
                      className="w-[350px] h-14 placeholder:text-muted-foreground/50"
                      placeholder="00000-000"
                    />
                    {isLoading && <LoaderCircle className="w-6 h-6 text-primary animate-spin repeat-infinite"/>}
                    </div>
                    <FormMessage />
                    {address && (
                      <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bg-card left-0 top-[110%] z-50 w-[60vw] space-y-4 p-3 border border-muted-foreground/30 rounded-sm shadow-lg"
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
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
