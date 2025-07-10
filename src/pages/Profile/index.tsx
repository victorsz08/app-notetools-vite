import { AvatarSelector } from "@/components/avatar/avatar-selector";
import { UpdatePasswordUserForm } from "@/components/forms/update-password-user-form";
import { UpdateUserForm } from "@/components/forms/update-user-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { useUser } from "@/hooks/use-user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function ProfilePage() {
  const { updateAvatarUser } = useUser();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { mutate: updateAvatar } = useMutation({
    mutationFn: async (url: string) => {
      await updateAvatarUser({ avatarUrl: url });
    },
    mutationKey: ["update-avatar"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("Avatar atualizado com sucesso!");
    },
  });

  const getInitials = (firstName?: string, lastName?: string) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0).toUpperCase()}${lastName
        .charAt(0)
        .toUpperCase()}`;
    }
    return "";
  };

  return (
    <section className="p-8 space-y-4 flex flex-col justify-start items-center">
      <Card className="w-[40vw]">
        <CardHeader className="flex flex-col gap-1 justify-start items-start">
          <CardTitle>Informações pessoais</CardTitle>
          <CardDescription>Proteja suas informações.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <AvatarSelector
            currentAvatar={user?.avatarUrl}
            fallbackText={getInitials(user?.firstName, user?.lastName)}
            onAvatarChange={(url) => {
              updateAvatar(url);
            }}
          />
          <Separator />
          <UpdateUserForm />
        </CardContent>
      </Card>
      <Card className="w-[40vw]">
        <CardHeader className="flex flex-col gap-1 justify-start items-start">
          <CardTitle>Atualize sua senha</CardTitle>
          <CardDescription>
            Escolha uma senha segura para manter seus dados seguros.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdatePasswordUserForm />
        </CardContent>
      </Card>
    </section>
  );
}