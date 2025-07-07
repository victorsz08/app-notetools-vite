import { Layout } from "@/components/layout/layout";
import { useAuth } from "@/context/auth-context";
import { Dahsboard } from "@/pages/dashboard";
import { LoginPage } from "@/pages/LoginPage";
import { NotePage } from "@/pages/notes";
import { OrdersPage } from "@/pages/orders";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return null;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export function RootRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dahsboard />} />
          <Route path="/pedidos" element={<OrdersPage />} />
          <Route path="/anotacoes" element={<NotePage />} />
        </Route>
      </Route>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />
    </Routes>
  );
}
