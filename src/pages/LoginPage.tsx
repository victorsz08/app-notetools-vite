import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useAuth } from "@/context/auth-context";
const loginSchema = z.object({
  username: z.string().nonempty("Campo obrigatório"),
  password: z.string().nonempty("Campo obrigatório"),
});

type LoginDataType = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<LoginDataType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginDataType) {
    try {
      setIsLoading(true);
      await login(data);
    } catch (error: any) {
      if (error.response.status === 400) {
        form.setError("username", {
          type: "manual",
          message: "Usuário ou senha inválidos",
        });
        form.setError("password", {
          type: "manual",
          message: "Usuário ou senha inválidos",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="w-screen h-screen flex">
      <div className="w-full flex-col gap-4 bg-muted/60 flex items-center justify-center h-full">
        <img src="/src/assets/icon.svg" alt="Logo" className="w-28" />
        <div className="text-center">
          <p className="text-2xl font-bold text-muted-foreground/90">
            Notetools Inc
          </p>
          <p className="text-muted-foreground/80 font-light text-base">
            Gestão inteligente
          </p>
        </div>
      </div>
      <div className="bg-white w-full h-screen space-y-10 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-semibold text-muted-foreground/90">
            Login
          </h1>
          <small className="text-xs text-muted-foreground/70">
            Faça login para continuar
          </small>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="group relative">
                  <FormLabel className="bg-white absolute -translate-y-2 translate-x-2 pr-1">
                    Username
                  </FormLabel>
                  <Input {...field} className="w-72" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="group relative">
                  <FormLabel className="bg-white absolute -translate-y-2 translate-x-2 pr-1">
                    Senha
                  </FormLabel>
                  <Input {...field} type="password" className="w-72" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader className="w-3 h-3 spin-in repeat-infinite text-background" />
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>
        <div className="flex flex-col justify-center items-center gap-2">
          <img src="/src/assets/icon.svg" className="w-5" />
          <small className="text-sm font-medium text-muted-foreground/80">
            Notetools
          </small>
          <small className="text-[10px] font-light text-muted-foreground/70">
            Copyright 2024-2025 - Todos os direitos reservados
          </small>
        </div>
      </div>
    </section>
  );
}
