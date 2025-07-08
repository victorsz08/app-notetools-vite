import { useAuth } from "@/context/auth-context";
import { useUser } from "@/hooks/use-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";


const updateUserSchema = z.object({
    username: z.string().nonempty("O nome de usuário é obrigatório"),
    firstName: z.string().nonempty("O nome é obrigatório"),
    lastName: z.string().nonempty("O sobrenome é obrigatório"),
});

type UpdateUserFormData = z.infer<typeof updateUserSchema>;


export function UpdateUserForm() {
    const { user } = useAuth();
    const { updateUser } = useUser();
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const form = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            username: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName,
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UpdateUserFormData) => {
            await updateUser(data);
        },
        mutationKey: ["update-user"],
        onSuccess: () => {
            toast.success("Usuário atualizado com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["session"] });
            setIsEditing(false);
        },
        onError: (error: any) => {
            error.response.data.details.forEach((err: any) => {
                form.setError(err.issue, {
                    message: err.message
                })
            })
        }
    });


    function onSubmit(data: UpdateUserFormData) {
        mutate(data);
    };




    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="group relative">
                            <FormLabel className="absolute text-xs bg-card px-2 -translate-y-2 translate-x-1">
                                Username
                            </FormLabel>
                            <Input 
                                type="text"
                                placeholder="Digite seu username"
                                value={field.value}
                                onChange={field.onChange}
                                disabled={!isEditing}
                            />
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem className="group relative">
                            <FormLabel className="absolute text-xs bg-card px-2 -translate-y-2 translate-x-1">
                                Nome
                            </FormLabel>
                            <Input 
                                type="text"
                                placeholder="Digite seu nome"
                                value={field.value}
                                onChange={field.onChange}
                                disabled={!isEditing}
                            />
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem className="group relative">
                            <FormLabel className="absolute text-xs bg-card px-2 -translate-y-2 translate-x-1">
                                Sobrenome
                            </FormLabel>
                            <Input 
                                type="text"
                                placeholder="Digite seu sobrenome"
                                value={field.value}
                                onChange={field.onChange}
                                disabled={!isEditing}
                            />
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex items-center w-full justify-end gap-2">
                    {isEditing ? (
                        <>
                            <Button 
                                variant="outline" 
                                type="button"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending ? "Atualizando..." : "Atualizar"}
                            </Button>
                        </>
                    ) : (
                        <Button
                            type="button"
                            className="w-[140px]"
                            onClick={() => setIsEditing(true)}
                        >
                            Editar dados
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    )
}