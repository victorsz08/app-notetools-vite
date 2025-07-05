import type React from "react";
import {
  Clipboard,
  Home,
  Notebook,
  User,
  LogOut,
  UserCheck,
  CheckCircle,
  Wallet,
  UserRound,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NavMenu } from "./nav-main";
import { NavLink } from "./nav-link";
import { useAuth } from "@/context/auth-context";

const items = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Contratos",
    href: "/pedidos",
    icon: Clipboard,
  },
  {
    title: "Anotações",
    href: "/anotacoes",
    icon: Notebook,
  },
];
const links = [
  {
    title: "Situação cadastral CPF",
    href: "https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp",
    icon: UserCheck,
  },
  {
    title: "Situação Cadastral CNPJ",
    href: "https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_Solicitacao.asp",
    icon: CheckCircle,
  },
  {
    title: "Negocia Fácil Claro",
    href: "https://claro.negociafacil.com.br/",
    icon: Wallet,
  },
];

const userRole = {
  User: "Usuário",
  Admin: "Administrador",
} as const;

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth();

  return (
    <Sidebar {...props} className="border-">
      <SidebarHeader className="py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <img
              src="/src/assets/icon.svg"
              className="text-primary-foreground w-5"
            />
          </div>
          <div className="group-data-[collapsible=icon]:hidden ease-[cubic-bezier(0.25,0.1,0.25,1)]">
            <h1 className="text-lg font-semibold text-muted-foreground/90 tracking-tight">
              Notetools
            </h1>
            <p className="text-xs text-muted-foreground/70">
              Gestão inteligente
            </p>
          </div>
        </div>
      </SidebarHeader>

      <Separator />

      <SidebarContent className="py-4">
        <NavMenu items={items} />
        <Separator />
        <NavLink items={links} />
        <Separator />
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="flex items-center">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={user?.avatarUrl} />
                    <AvatarFallback>
                      <UserRound className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-foreground/70 text-left text-sm leading-tight">
                    <span className="truncate font-normal">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <span className="truncate text-xs text-foreground/40">
                      {userRole[user?.role as keyof typeof userRole]}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <a
                    href="/perfil"
                    className="cursor-pointer flex items-center gap-1 w-full"
                  >
                    <User className="mr-1 h-4 w-4" />
                    Perfil
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="mr-1 h-4 w-4 text-red-600" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
