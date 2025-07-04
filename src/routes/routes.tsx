import { Layout } from "@/components/layout/layout";
import { useAuth } from "@/context/auth-context";
import { Dahsboard } from "@/pages/dashboard";
import { Loading } from "@/pages/loading";
import { LoginPage } from "@/pages/LoginPage";
import { Route, Routes, Navigate } from "react-router-dom";

export function RootRoutes() {
  const { isAuthenticated, isLoading, isFetching } = useAuth();

  if ((isLoading && !isAuthenticated) || (isFetching && !isAuthenticated)) {
    return <Loading />;
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
