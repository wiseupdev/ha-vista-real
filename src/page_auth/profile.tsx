import { useState, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, User } from "lucide-react";
import { useAuth } from "@/authProvider";
import { enviarPerfilWebhook } from "@/components/ImageEvents";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useAuth();

  // Estados de perfil
  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [telefone, setTelefone] = useState(user?.telefone || "");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Pré-visualizar a foto de perfil
  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Enviar atualização de perfil para o webhook
  const handleSalvar = async () => {
    try {
      setLoading(true);

      const payload = {
        nome,
        email,
        telefone,
        foto,
        acao: "perfil" as const,
      };

      const response = await enviarPerfilWebhook(payload);

      if (response.ok) {
        toast.success("Perfil atualizado com sucesso!");
      } else {
        toast.error("Erro ao atualizar o perfil!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro de conexão ao enviar os dados!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Meu Perfil</h1>
          <p className="text-muted-foreground">
            Atualize suas informações pessoais abaixo.
          </p>
        </div>

        <Card className="bg-card border border-border rounded-2xl shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <User className="h-5 w-5 text-primary" /> Informações Pessoais
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-6">
            {/* Foto de perfil */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img
                  src={
                    preview ||
                    user?.foto ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Foto de perfil"
                  className="w-32 h-32 rounded-full border-4 border-primary object-cover"
                />
                <label
                  htmlFor="foto"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-all"
                >
                  <Camera className="h-4 w-4" />
                </label>
                <input
                  id="foto"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFotoChange}
                />
              </div>
            </div>

            {/* Campos de texto */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Nome</label>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">E-mail</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@email.com"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Telefone</label>
                <Input
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSalvar}
                disabled={loading}
                className="bg-primary text-primary-foreground font-bold rounded-xl w-fit hover:scale-105 transition-all"
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
