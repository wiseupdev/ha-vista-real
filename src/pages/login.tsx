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
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useAuth();

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

      // Salvar no localStorage
      localStorage.setItem(
        "ha_user",
        JSON.stringify({ id: data.id, nome: data.name, tipo: data.tipo })
      );

      // Atualizar contexto
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

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;

      toast({
        title: "Login com Google realizado!",
        description: "Redirecionando...",
      });
    } catch (err: any) {
      toast({
        title: "Erro ao autenticar com Google",
        description: err.message,
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/5 px-4">
      <Card className="w-full max-w-md shadow-lg border border-border rounded-2xl animate-fade-in">
        <CardHeader className="text-center">
          <img
            src={logo}
            alt="H.A Imobiliária"
            className="w-16 h-16 mx-auto mb-3 rounded-xl object-contain"
          />
          <CardTitle className="text-2xl font-bold text-foreground">
            Bem-vindo(a) à{" "}
            <span className="text-primary">H.A Imobiliária</span>
          </CardTitle>
          <p className="text-muted-foreground text-sm mt-1">
            Acesse sua conta para continuar
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
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

           {/*  Google Login
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={loading}
              onClick={handleGoogleLogin}
              className="w-full rounded-xl border flex items-center justify-center gap-2 hover:bg-muted transition-all hover:scale-[1.02]"
            >
              <FcGoogle className="w-5 h-5" />
              Entrar com Google
            </Button>*/}

            {/* Link para cadastro */}
            <p className="text-center text-sm text-muted-foreground mt-4">
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
