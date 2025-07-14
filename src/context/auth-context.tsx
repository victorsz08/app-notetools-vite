import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { UserData } from "@/@types";
import api from "@/lib/api";

interface Credentials {
  username: string;
  password: string;
}

interface AuthContextProps {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  session: () => Promise<UserData | null>;
  refreshToken: () => Promise<void>;
  setUser: (user: UserData | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshToken = useCallback(async () => {
    await api.post("auth/refresh");
  }, []);

  const session = useCallback(async (): Promise<UserData | null> => {
    setIsLoading(true);
    try {
      const response = await api.get("auth/session");
      const userResponse = await api.get(`users/${response.data.id}`);
      setUser(userResponse.data);
      setIsAuthenticated(true);
      return userResponse.data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          await refreshToken();
          const response = await api.get("auth/session");
          const userResponse = await api.get(`users/${response.data.id}`);
          setUser(userResponse.data);
          setIsAuthenticated(true);
          return userResponse.data;
        } catch (refreshError: any) {
          if (refreshError?.response?.status === 401) {
            await logout();
          }
        }
      }
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = "/login";
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [refreshToken]);

  const login = useCallback(
    async (credentials: Credentials) => {
      setIsLoading(true);
      try {
        await api.post("auth/login", credentials);
        const user = await session();
        setUser(user);
        setIsAuthenticated(true);
      } finally {
        setIsLoading(false);
      }
    },
    [session]
  );

  const logout = useCallback(async () => {
    await api.post("auth/logout");
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    session();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        session,
        refreshToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
