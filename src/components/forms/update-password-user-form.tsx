import { useUser } from "@/hooks/use-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";







const udpatePasswordUserSchema = z.object({
    currentPassword:  z.string().nonempty("A senha atual é obrigatória"),
    newPassword: z.string().nonempty("A nova senha é obrigatória"),
    confirmPassword: z.string().nonempty("A confirmação de senha é obrigatória")
        .refine((data: any) => data.newPassword === data.confirmPassword, {
        message: "As senhas não corresponpondem",
    })
});


type UpdatePasswordUserFormData = z.infer<typeof udpatePasswordUserSchema>;


export function UpdatePasswordUserForm() {
    const queryClient = useQueryClient();
    const { updatePasswordUser } = useUser();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const form = useForm<UpdatePasswordUserFormData>({
        resolver: zodResolver(udpatePasswordUserSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UpdatePasswordUserFormData) => {
            await updatePasswordUser({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });

            return;
        },
        mutationKey: ["update-password-user"],
        onSuccess: () => {
            toast.success("Senha atualizada com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["session"] });

        }
    });

    

    function onSubmit(data: UpdatePasswordUserFormData) {
        mutate(data);
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem className="group relative">
                            <FormLabel className="absolute text-xs bg-card px-2 -translate-y-2 translate-x-1">
                                Senha atual
                            </FormLabel>
                            <Input 
                                type="password"
                                placeholder="*********"
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
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem className="group relative">
                            <FormLabel className="absolute text-xs bg-card px-2 -translate-y-2 translate-x-1">
                                Nova senha
                            </FormLabel>
                            <Input 
                                type="password"
                                placeholder="*********"
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
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="group relative">
                            <FormLabel className="absolute text-xs bg-card px-2 -translate-y-2 translate-x-1">
                                Confirmar senha
                            </FormLabel>
                            <Input 
                                type="password"
                                placeholder="*********"
                                value={field.value}
                                onChange={field.onChange}
                                disabled={!isEditing}
                            />
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-end gap-2">
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
                            Editar senha
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    )
}