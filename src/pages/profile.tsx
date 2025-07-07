import { AvatarSelector } from "@/components/avatar/avatar-selector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";







export function ProfilePage() {
    const { user } = useAuth();

    const { mutate: updateAvatar } = useMutation({
        mutationFn: async (url: string) => {
            await api.put(`users/update-avatar/${user?.id}`, {
                avatarUrl: url,
            })
        },
        mutationKey: ['update-avatar']
    })

    const getInitials  = (firstName?: string, lastName?: string) => {
        if(firstName && lastName) {
            return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
        } 
        return ''
    }

    return (
        <section className="p-4 space-y-4">
            <Card>
                <CardHeader className="flex flex-col gap-1 justify-start items-start">
                    <CardTitle>Informações pessoais</CardTitle>
                    <CardDescription>Proteja suas informações.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AvatarSelector 
                        currentAvatar={user?.avatarUrl} 
                        fallbackText={getInitials(user?.firstName, user?.lastName)}
                        onAvatarChange={(url) => {
                            updateAvatar(url)
                        }}
                    />
                </CardContent>
            </Card>
        </section>
    )
}