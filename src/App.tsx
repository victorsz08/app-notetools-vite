import { BrowserRouter } from "react-router-dom";
import { RootRoutes } from "./routes/routes";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import { NoteEditorDialog } from "./components/dialog/dialog-note";
import { AuthProvider } from "./context/auth-context";

export default function App() {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <RootRoutes />
        <NoteEditorDialog />
      </AuthProvider>
    </BrowserRouter>
  );
}
