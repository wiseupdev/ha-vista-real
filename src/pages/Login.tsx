"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import supabase from "@/utility/supabaseClient";
import { useAuth } from "../authProvider";
import logo from "@/assets/logo.png";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useAuth();
  const isMobile = useIsMobile();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("HA_user")
        .select("*")
        .eq("email", form.email)
        .eq("senha", form.password)
        .single();

      if (error || !data) {
        toast({
          title: "Erro no login",
          description: "E-mail ou senha incorretos.",
          variant: "destructive",
        });
        return;
      }

      localStorage.setItem(
        "ha_user",
        JSON.stringify({ id: data.id, nome: data.name, tipo: data.tipo })
      );

      setUser(data);

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a), ${data.name}!`,
      });

      setTimeout(() => navigate("/"), 1200);
    } catch (err: any) {
      toast({
        title: "Erro inesperado",
        description: err.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex ${
        isMobile ? "items-start pt-10" : "items-center"
      } justify-center bg-gradient-to-br from-background to-primary/5 px-4`}
    >
      <Card
        className={`w-full ${
          isMobile ? "max-w-sm p-4 rounded-xl" : "max-w-md p-6 rounded-2xl"
        } shadow-lg border border-border animate-fade-in`}
      >
        <CardHeader className={`text-center ${isMobile ? "space-y-2" : ""}`}>
          <img
            src={logo}
            alt="H.A Imobiliária"
            className={`mx-auto mb-3 rounded-xl object-contain ${
              isMobile ? "w-12 h-12" : "w-16 h-16"
            }`}
          />
          <CardTitle
            className={`font-bold text-foreground ${
              isMobile ? "text-xl" : "text-2xl"
            }`}
          >
            Bem-vindo(a) à{" "}
            <span className="text-primary">H.A Imobiliária</span>
          </CardTitle>
          <p
            className={`text-muted-foreground ${
              isMobile ? "text-xs" : "text-sm"
            } mt-1`}
          >
            Acesse sua conta para continuar
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className={`space-y-${isMobile ? "4" : "5"}`}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                E-mail
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="rounded-xl pl-10"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Senha
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="rounded-xl pl-10 pr-10"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Botão Entrar */}
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-primary)] transition-all hover:scale-[1.02]"
            >
              {loading ? "Entrando..." : "Entrar"}
              {!loading && <LogIn className="ml-2 h-5 w-5" />}
            </Button>

            {/* Divisor */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
              <span className="h-[1px] w-16 bg-border"></span>
              <span>ou</span>
              <span className="h-[1px] w-16 bg-border"></span>
            </div>

            {/* Link para cadastro */}
            <p
              className={`text-center text-muted-foreground mt-4 ${
                isMobile ? "text-xs" : "text-sm"
              }`}
            >
              Não tem conta?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Cadastre-se
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
