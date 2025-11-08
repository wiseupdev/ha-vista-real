import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { Heart } from "lucide-react";
import supabase from "@/utility/supabaseClient";
import { Button } from "@/components/ui/button";

interface Property {
  id: number;
  titulo: string;
  descricao?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  cep?: number;
  data?: string;
  status?: boolean;
  valor?: number;
  negociacao?: string;
  tipo?: string;
  numero?: string;
  nome_anunciante?: string;
  caracteristicas?: any;
  condominio?: any;
  quartos?: number;
  banheiros?: number;
  metros?: number;
  vagas?: number;
}

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [imoveis, setImoveis] = useState<Property[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Buscar usuário do localStorage
  useEffect(() => {
    const userData = localStorage.getItem("ha_user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user.id);
    }
  }, []);

  // 🔹 Buscar imóveis favoritados do usuário
  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!userId) return;

      try {
        // Buscar IDs dos imóveis favoritados
        const { data: favs, error: favError } = await supabase
          .from("HA_favorito")
          .select("imovel_id")
          .eq("user_id", userId);

        if (favError) throw favError;

        const ids = favs.map((f) => f.imovel_id);
        setFavoritos(ids);

        if (ids.length === 0) {
          setImoveis([]);
          setLoading(false);
          return;
        }

        // Buscar imóveis completos
        const { data: imoveisData, error: imoveisError } = await supabase
          .from("HA_IMOVEIS")
          .select("*")
          .in("id", ids)
          .eq("status", true);

        if (imoveisError) throw imoveisError;

        setImoveis(imoveisData || []);
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, [userId]);

  // 🔹 Remover dos favoritos
  const removeFavorito = async (imovelId: number) => {
    if (!userId) return;

    const { error } = await supabase
      .from("HA_favorito")
      .delete()
      .eq("user_id", userId)
      .eq("imovel_id", imovelId);

    if (error) {
      console.error("Erro ao remover favorito:", error);
      return;
    }

    setFavoritos((prev) => prev.filter((id) => id !== imovelId));
    setImoveis((prev) => prev.filter((p) => p.id !== imovelId));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-b from-card to-background py-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Meus <span className="text-primary">Favoritos</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Veja os imóveis que você salvou
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Carregando...</p>
          ) : imoveis.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <p>Você ainda não possui imóveis favoritados.</p>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-6">
                <span className="font-bold text-foreground">
                  {imoveis.length}
                </span>{" "}
                imóveis favoritados
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {imoveis.map((p) => (
                  <div key={p.id} className="relative">
                    {/* ❤️ Remover favorito */}
                    <button
                      onClick={() => removeFavorito(p.id)}
                      className="absolute top-3 right-3 z-10 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all"
                    >
                      <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                    </button>

                    <PropertyCard
                      id={p.id}
                      image="/placeholder.jpg"
                      title={p.titulo}
                      price={(p.valor || 0).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                      location={`${p.bairro || ""}, ${p.cidade || ""}`}
                      bedrooms={p.quartos || 0}
                      bathrooms={p.banheiros || 0}
                      area={p.metros || 0}
                      type={p.tipo || "—"}
                      vagas={p.vagas || 0}
                      rating={4.5}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
