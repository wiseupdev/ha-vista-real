import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/logo.png";
import { Eye, EyeOff, UserPlus, Mail, Lock, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "@/components/ui/use-toast";
import supabase from "@/utility/supabaseClient";

const Cadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nome || !form.email || !form.senha) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Inserir dados na tabela (certifique-se de usar o nome correto da tabela!)
      const { error: insertError } = await supabase.from("HA_user").insert([
        {
          name: form.nome,
          email: form.email,
          senha: form.senha,
          tipo: "cliente",
          data: new Date(),
        },
      ]);

      // Se houver erro, mostrar feedback e parar execução
      if (insertError) {
        console.error("Erro Supabase:", insertError);
        toast({
          title: "Erro ao salvar no banco",
          description:
            insertError.message ||
            "Não foi possível salvar o cadastro. Verifique o nome da tabela e as permissões RLS.",
          variant: "destructive",
        });
        return;
      }

      // Sucesso 🎉
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Verifique seu e-mail para confirmar a conta.",
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      toast({
        title: "Erro inesperado",
        description: err.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error("Erro inesperado:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
      console.error("Erro OAuth:", err);
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
            Crie sua conta na <span className="text-primary">H.A Imobiliária</span>
          </CardTitle>
          <p className="text-muted-foreground text-sm mt-1">
            É rápido e fácil. Comece agora!
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium mb-1">
                Nome completo
              </label>
              <div className="relative">
                <Input
                  id="nome"
                  type="text"
                  placeholder="Seu nome"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="rounded-xl pl-10"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                E-mail
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-xl pl-10"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium mb-1">
                Senha
              </label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.senha}
                  onChange={(e) => setForm({ ...form, senha: e.target.value })}
                  className="rounded-xl pl-10 pr-10"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-primary)] transition-all hover:scale-[1.02]"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
              {!loading && <UserPlus className="ml-2 h-5 w-5" />}
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
              <span className="h-[1px] w-16 bg-border"></span>
              <span>ou</span>
              <span className="h-[1px] w-16 bg-border"></span>
            </div>

            {/*<Button
              type="button"
              variant="outline"
              size="lg"
              disabled={loading}
              onClick={handleGoogleSignUp}
              className="w-full rounded-xl border flex items-center justify-center gap-2 hover:bg-muted transition-all hover:scale-[1.02]"
            >
              <FcGoogle className="w-5 h-5" />
              Cadastrar com Google
            </Button>*/}

            <p className="text-center text-sm text-muted-foreground mt-4">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Faça login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cadastro;
