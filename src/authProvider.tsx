import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Usuario {
  id: number;
  email: string;
  nome: string;
  tipo?: string;
}

interface AuthContextType {
  user: Usuario | null;
  setUser: (user: Usuario | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("ha_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("");
      setUser(parsedUser);
    } else {
      console.log("");
    }
  }, []);

  const logout = () => {
    console.log("🚪 Iniciando logout...");
    localStorage.removeItem("ha_user");
    setUser(null);
    

    // Força atualização completa da página pra limpar qualquer cache de estado
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");
  return context;
}
