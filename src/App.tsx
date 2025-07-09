import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { RootRoutes } from "./routes/routes";


import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import { NoteEditorDialog } from "./components/dialog/dialog-note";

export default function App() {
  return (
    <BrowserRouter basename="/">
      <AuthContextProvider>
        <RootRoutes />
        <NoteEditorDialog />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
