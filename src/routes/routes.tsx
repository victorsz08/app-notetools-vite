import { Layout } from "@/components/layout/layout";
import { useAuth } from "@/context/auth-context";
import { Loading } from "@/pages/loading";
import { LoginPage } from "@/pages/LoginPage";
import { Route, Routes, Navigate } from "react-router-dom";

export function RootRoutes() {
    const { isAuthenticated, isLoading } = useAuth();

    if(isLoading) {
        return <Loading/>
    }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<h1>Hello World</h1>} />
      </Route>
      <Route path="/login"  element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage/>} />
    </Routes>
  );
}
