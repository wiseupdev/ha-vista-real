import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/authProvider";

const PrivateRoute = () => {
  const { user } = useAuth();

  // Se não estiver logado, redireciona para o login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Se estiver logado, renderiza as rotas internas
  return <Outlet />;
};

export default PrivateRoute;
