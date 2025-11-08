import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import SidebarMenu from "./SidebarMenu";
import { useAuth } from "../authProvider";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth(); // Pega o usuário logado do contexto

  return (
    <div className="min-h-screen flex flex-col">
      {/* Se o usuário estiver logado, mostra o menu lateral */}
      {user && <SidebarMenu />}

      {/* Mantém seu layout original */}
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
