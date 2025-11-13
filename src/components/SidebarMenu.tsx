import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Heart,
  Phone,
  HelpCircle,
  LayoutDashboard,
  Building2,
  Users,
  FileSearch,
} from "lucide-react";

interface User {
  nome: string;
  tipo: string;
}

const SidebarMenu = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("ha_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao ler usuário:", error);
      }
    }
  }, []);

  const isAdmin = user?.tipo === "adm";

  return (
    <>
      {/* Botão sanduíche */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-5 left-5 z-[60] p-2 rounded-md bg-background shadow-md hover:bg-accent transition md:top-6 md:left-6"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Fundo escurecido */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50] transition-opacity"
        />
      )}

      {/* Menu lateral */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-border shadow-xl z-[55] transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-6 flex flex-col gap-4 text-lg font-medium">
          {/* Cabeçalho */}
          <div className="mb-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Bem-vindo(a),</p>
              <p className="text-lg font-semibold text-foreground">
                {user?.nome || "Usuário"}
              </p>
            </div>
            <button onClick={() => setOpen(false)}>
              <X className="h-5 w-5 text-muted-foreground hover:text-foreground transition" />
            </button>
          </div>

          <hr className="border-border mb-4" />

          {/* Menu Cliente */}
          {!isAdmin && (
            <>
              <Link
                to="/Profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <User className="h-5 w-5 text-primary" />
                <span>Perfil</span>
              </Link>

              <Link
                to="/Favoritos"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <Heart className="h-5 w-5 text-primary" />
                <span>Favoritos</span>
              </Link>

              <Link
                to="/Contato"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <Phone className="h-5 w-5 text-primary" />
                <span>Anunciar</span>
              </Link>

              <Link
                to="/Ajuda"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <HelpCircle className="h-5 w-5 text-primary" />
                <span>Ajuda</span>
              </Link>
            </>
          )}

          {/* Menu Admin */}
          {isAdmin && (
            <>
              <Link
                to="/Profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <User className="h-5 w-5 text-primary" />
                <span>Perfil</span>
              </Link>

              <Link
                to="/Dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <LayoutDashboard className="h-5 w-5 text-primary" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/Cadastroimoveis"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <Building2 className="h-5 w-5 text-primary" />
                <span>Imóveis</span>
              </Link>
              <Link
                to="/AnaliseImoveis"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <FileSearch className="h-5 w-5 text-primary" />
                <span>Imóveis em Análise</span>
              </Link>

              <Link
                to="/Corretor"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <Users className="h-5 w-5 text-primary" />
                <span>Corretores</span>
              </Link>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default SidebarMenu;
