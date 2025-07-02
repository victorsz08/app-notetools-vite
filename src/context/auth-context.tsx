import { createContext, useContext, useEffect, useState } from "react";
import type { UserData } from "../@types";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { Loading } from "../pages/loading";
import { destroyCookie, parseCookies } from "nookies";

export type AuthContextProps = {
  user?: UserData;
  isAuthenticated?: boolean;
  isLoading?: boolean;
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
  const [user, setUser] = useState<UserData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const isAuthenticated = !!user;
  const cookie = parseCookies(null);
  const token = cookie["nt.authtoken"];

  useEffect(() => {
    const getSession = async () => {
      try {
        const response = await api.get("/auth/session");
        const user = await api.get<UserData>(`users/${response.data.id}`);
        setUser(user.data);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      getSession();
    } else {
      setIsLoading(false);
      setError(true); // se não tem token, também é erro de auth
    }
  }, [token]);

  useEffect(() => {
    if (!isLoading && error) {
      router("/login");
    }
  }, [error, isLoading, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export interface AuthContextType {
  user?: UserData;
  isAuthenticated?: boolean;
  isLoading?: boolean;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  return context;
}
