import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { RootRoutes } from "./routes/routes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <RootRoutes />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
