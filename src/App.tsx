import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { RootRoutes } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function App() {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RootRoutes />
      </AuthContextProvider>
    </QueryClientProvider>
    </BrowserRouter>
  );
}
