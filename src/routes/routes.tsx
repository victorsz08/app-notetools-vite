import { Layout } from "@/components/layout/layout";
import { useAuth } from "@/context/auth-context";
import { Dahsboard } from "@/pages/dashboard";
import { LoginPage } from "@/pages/LoginPage";
import { Route, Routes, Navigate } from "react-router-dom";

export function RootRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dahsboard />} />
      </Route>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />
    </Routes>
  );
}
