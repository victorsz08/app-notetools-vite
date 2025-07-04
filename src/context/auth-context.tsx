import { createContext, useContext, useEffect, useState } from "react";
import type { UserData } from "../@types";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { Loading } from "../pages/loading";
import { destroyCookie } from "nookies";

export type AuthContextProps = {
  user?: UserData | null;
  isAuthenticated?: boolean;
  isLoading?: boolean;
  logout: () => void;
  login: (credentials: LoginCredentials) => Promise<void>;
};

interface LoginCredentials {
  username: string;
  password: string;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAndSetUser = async () => {
    const response = await api.get("auth/session");
    const { data } = await api.get<UserData>(`users/${response.data.id}`);
    setUser(data);
  };

  useEffect(() => {
    const getSession = async () => {
      try {
        await fetchAndSetUser();
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      await api.post("auth/login", credentials);
      await fetchAndSetUser();
      router("/");
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("auth/logout");
    } catch (error) {
      console.error("Falha ao fazer logout no backend:", error);
    } finally {
      destroyCookie(null, "nt.authtoken");
      setUser(null);
      router("/login");
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  const isAuthenticated: boolean = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
