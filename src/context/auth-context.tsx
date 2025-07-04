import { createContext, useContext } from "react";
import type { UserData } from "../@types";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { Loading } from "../pages/loading";
import { useQuery } from "@tanstack/react-query";

export type AuthContextProps = {
  user?: UserData | null;
  isAuthenticated?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useNavigate();
  const {
    data: user,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryFn: async () => {
      const response = await api.get("auth/session");
      if (response.status === 401) {
        router("/login");
        return null;
      }
      const responseSession = await api.get<UserData>(
        `users/${response.data.id}`
      );
      return responseSession.data;
    },
    queryKey: ["session"],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, //  10 minutes
  });

  const isAuthenticated = !!user;

  if (error) {
    router("/login");
  }

  if ((isLoading && !isAuthenticated) || (isFetching && !isAuthenticated)) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, isFetching }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export interface AuthContextType {
  user?: UserData | null;
  isAuthenticated?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  return context;
}
