import { UserData } from "@/@types";
import api from "@/lib/api";
import { create } from "zustand";

interface Credentials {
  username: string;
  password: string;
}

interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  session: () => Promise<UserData | null>;
  setUser: (user: UserData | null) => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      await api.post("auth/login", credentials);
      const user = await get().session();
      set({ user, isAuthenticated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await api.post("auth/logout");
    set({ user: null, isAuthenticated: false });
    window.location.href = "/login";
  },

  refreshToken: async () => {
    await api.post("auth/refresh");
  },

  session: async () => {
    try {
      const response = await api.get("auth/session");
      const userResponse = await api.get(`users/${response.data.id}`);
      set({ user: userResponse.data, isAuthenticated: true });
      return userResponse.data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          await get().refreshToken();
          const response = await api.get("auth/session");
          const userResponse = await api.get(`users/${response.data.id}`);
          set({ user: userResponse.data, isAuthenticated: true });
          return userResponse.data;
        } catch (refreshError: any) {
          if (refreshError?.response?.status === 401) {
            await get().logout();
          }
        }
      }
      set({ user: null, isAuthenticated: false });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));
