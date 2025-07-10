import { Layout } from "@/components/layout/layout";
import { useAuth } from "@/context/auth-context";
import { Dahsboard } from "@/pages/Dashboard";
import { Loading } from "@/pages/loading";
import { LoginPage } from "@/pages/Login";
import { NotePage } from "@/pages/Notes";
import { OrdersPage } from "@/pages/Orders";
import { ProfilePage } from "@/pages/Profile";
import { useEffect } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export function RootRoutes() {
  const { isAuthenticated, session, isLoading } = useAuth();

  useEffect(() => {
    session();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dahsboard />} />
          <Route path="/pedidos" element={<OrdersPage />} />
          <Route path="/anotacoes" element={<NotePage />} />
          <Route path="/perfil" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />
    </Routes>
  );
}
