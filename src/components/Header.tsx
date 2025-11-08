import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/imoveis", label: "Imóveis" },
    { path: "/sobre", label: "Sobre" },
    { path: "/contato", label: "Contato" },
  ];

  // Verifica se o usuário está logado
  useEffect(() => {
    const token = localStorage.getItem("ha_user");
    setIsLoggedIn(!!token);
  }, [location]); // atualiza quando muda de rota

  const logout = () => {
    localStorage.removeItem("ha_user");
    setIsLoggedIn(false);
    window.location.href = "/login"; // redireciona após logout
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">
                H.A Imoveis Conceito
              </span>
              <span className="text-xs text-muted-foreground">
                Seu imóvel dos sonhos
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors relative group ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                    isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          {!isLoggedIn ? (
            <div className="hidden md:flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-xl transition-all"
              >
                <Link to="/cadastro">Cadastro</Link>
              </Button>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-[var(--shadow-primary)] transition-all hover:scale-105"
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all"
              >
                Sair
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Buttons */}
              {!isLoggedIn ? (
                <div className="flex flex-col gap-3 px-4 mt-2">
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-xl w-full"
                  >
                    <Link to="/cadastro" onClick={() => setIsMenuOpen(false)}>
                      Cadastro
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl w-full"
                  >
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 px-4 mt-2">
                  <Button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl w-full"
                  >
                    Sair
                  </Button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
