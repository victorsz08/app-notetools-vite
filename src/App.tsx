import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { RootRoutes } from "./routes/routes";


import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <RootRoutes />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
