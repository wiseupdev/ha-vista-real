// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Imoveis from "./pages/Imoveis";
import ImovelDetail from "./pages/ImovelDetail";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Profile from "./page_auth/Profile";
import Dashboard from "./page_auth/Dashboard";
import Favoritos from "./page_auth/Favoritos";
import Ajuda from "./page_auth/Ajuda";
import Financiamento from "./pages/Credito";
import CadastroImoveis from "./page_auth/Cadastroimoveis";
import ImovelDetalhes from "./page_auth/Imoveisdetalhes";
import CadastroCorretores from "./page_auth/Corretor";
import AnaliseImoveis from "./page_auth/AnaliseImoveis";
import AnaliseImovelDetalhes from "./page_auth/AnaliseImovelDetalhes";
import Privacidade from "./pages/Privacidade";
import { useEffect, useState } from "react";
import "./index.css";
import { AuthProvider, useAuth } from "./authProvider";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        {/* 🌎 Rotas públicas */}
        <Route path="/" element={<Index />} />
        <Route path="/Imoveis" element={<Imoveis />} />
        <Route path="/Imoveis/:id" element={<ImovelDetail />} />
        <Route path="/Sobre" element={<Sobre />} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Credito" element={<Financiamento />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Privacidade" element={<Privacidade />} />

        {/* 🔒 Rotas protegidas */}
        {user && (
          <>
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Favoritos" element={<Favoritos />} />
            <Route path="/Ajuda" element={<Ajuda />} />
            <Route path="/Cadastroimoveis" element={<CadastroImoveis />} />
            <Route path="/Imoveisdetalhes/:id" element={<ImovelDetalhes />} />
            <Route path="/Corretor" element={<CadastroCorretores />} />
            <Route path="/AnaliseImoveis" element={<AnaliseImoveis />} />
            <Route path="//AnaliseImoveis/:id" element={<AnaliseImovelDetalhes />} />

          </>
        )}
      </Routes>
    </Layout>
  );
};

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* ☀️🌙 Botão de alternar tema — visível apenas em telas médias ou maiores */}
            <div
              className="hidden md:flex fixed top-6 right-6 z-[9999] items-center justify-center 
              rounded-full shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105"
              style={{
                width: "40px",
                height: "40px",
                background:
                  theme === "light"
                    ? "rgba(230, 230, 230, 0.85)"
                    : "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span
                onClick={toggleTheme}
                style={{
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: theme === "light" ? "#333" : "#fff",
                  userSelect: "none",
                  transition: "transform 0.2s ease, color 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1.0)")
                }
              >
                {theme === "light" ? "🌙" : "☀️"}
              </span>
            </div>

            {/* 🌍 Rotas */}
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
