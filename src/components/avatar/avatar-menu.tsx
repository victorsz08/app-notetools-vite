import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, UserRound } from "lucide-react";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

export function AvatarMenu() {
  const { user, logout } = useAuth();

  const getInitials = (firstName?: string, lastName?: string) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0).toUpperCase()}${lastName
        .charAt(0)
        .toUpperCase()}`;
    }
    return "";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-9 h-9 cursor-pointer border-4 border-primary">
          <AvatarImage src={user?.avatarUrl} alt={user?.username} />
          <AvatarFallback>
            {getInitials(user?.firstName, user?.lastName)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        <DropdownMenuItem className="flex flex-col justify-start items-start gap-0 hover:bg-transparent">
          <span className="font-semibold text-muted-foreground">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="text-xs text-muted-foreground/70">
            {user?.username}
          </span>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem className="text-muted-foreground">
          <Link to="/perfil" className="flex justify-start items-center gap-1">
            <UserRound className="w-2 h-2" />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => logout()}
          className="text-destructive hover:text-destructive flex justify-start items-center gap-1"
        >
          <LogOut className="w-2 h-2 text-destructive" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
