import { useNavigate } from "react-router-dom";
import { useAuth } from "../authProvider";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpa o localStorage e o contexto
    navigate("/login"); // redireciona para a tela de login
  };

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className="w-full mt-4 font-semibold"
    >
      Sair
    </Button>
  );
}
