import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import supabase from "@/utility/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface Property {
  id: string;
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
  url?: string;
}

const Imoveis = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    bairro: [] as string[],
    tipo: "",
    precoMin: "",
    precoMax: "",
    quartos: "",
    vagas: "",
    ordenacao: "relevancia",
  });

  const [userId, setUserId] = useState<number | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("ha_user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user.id);
    }
  }, []);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const { data, error } = await supabase.from("HA_IMOVEIS").select("*");

        if (error) throw error;

        const ativos = data?.filter((item) => item.status === true) || [];
        setAllProperties(ativos);
        setFilteredProperties(ativos);
      } catch (err) {
        console.error("Erro ao carregar imóveis:", err);
      }
    };

    fetchImoveis();
  }, []);

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("HA_favorito")
        .select("imovel_id")
        .eq("user_id", userId);

      if (error) {
        console.error("Erro ao buscar favoritos:", error);
        return;
      }

      setFavoritos(data.map((f) => f.imovel_id));
    };

    fetchFavoritos();
  }, [userId]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    let result = allProperties;

    if (filters.bairro.length > 0) {
      result = result.filter((p) =>
        filters.bairro.some((b) =>
          p.bairro?.toLowerCase().includes(b.toLowerCase())
        )
      );
    }

    if (filters.tipo) {
      result = result.filter((p) => p.tipo === filters.tipo);
    }

    if (filters.precoMin) {
      result = result.filter((p) => (p.valor || 0) >= Number(filters.precoMin));
    }

    if (filters.precoMax) {
      result = result.filter((p) => (p.valor || 0) <= Number(filters.precoMax));
    }

    if (filters.quartos) {
      result = result.filter((p) => (p.quartos || 0) >= Number(filters.quartos));
    }

    if (filters.vagas) {
      result = result.filter((p) => (p.vagas || 0) >= Number(filters.vagas));
    }

    if (filters.ordenacao === "precoAsc") {
      result = [...result].sort((a, b) => (a.valor || 0) - (b.valor || 0));
    } else if (filters.ordenacao === "precoDesc") {
      result = [...result].sort((a, b) => (b.valor || 0) - (a.valor || 0));
    }

    setFilteredProperties(result);
  };

  const toggleFavorito = async (imovelId: number) => {
    if (!userId) {
      setShowLoginModal(true);
      return;
    }

    const jaFavoritado = favoritos.includes(imovelId);

    if (jaFavoritado) {
      const { error } = await supabase
        .from("HA_favorito")
        .delete()
        .eq("user_id", userId)
        .eq("imovel_id", imovelId);

      if (!error) {
        setFavoritos((prev) => prev.filter((id) => id !== imovelId));
      } else {
        console.error("Erro ao remover favorito:", error);
      }
    } else {
      const { error } = await supabase
        .from("HA_favorito")
        .insert([{ user_id: userId, imovel_id: imovelId }]);

      if (!error) {
        setFavoritos((prev) => [...prev, imovelId]);
      } else {
        console.error("Erro ao adicionar favorito:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-b from-card to-background py-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Nossos <span className="text-primary">Imóveis</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore nossa seleção exclusiva de propriedades disponíveis
          </p>
        </div>
      </section>

      {/* Barra de Filtros */}
      <section className="w-full bg-background/70 backdrop-blur-md border-b border-border py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row flex-wrap items-center gap-3 bg-card border border-border rounded-2xl shadow-sm p-4">
            {/* Bairro */}
            <Input
              placeholder="Bairro ou região"
              value={filters.bairro.join(", ")}
              onChange={(e) =>
                handleFilterChange(
                  "bairro",
                  e.target.value.split(",").map((v) => v.trim())
                )
              }
              className="h-10 text-sm rounded-xl border-border bg-muted/50 focus:ring-2 focus:ring-primary/40 w-[160px]"
            />

            {/* Tipo */}
            <div className="w-[130px]">
              <Select onValueChange={(v) => handleFilterChange("tipo", v)}>
                <SelectTrigger className="h-10 rounded-xl border-border bg-muted/50 text-sm">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apartamento">Apartamento</SelectItem>
                  <SelectItem value="Casa">Casa</SelectItem>
                  <SelectItem value="Cobertura">Cobertura</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Preços */}
            <div className="flex items-center gap-2 w-[200px]">
              <Input
                type="number"
                placeholder="Mín. R$"
                value={filters.precoMin}
                onChange={(e) => handleFilterChange("precoMin", e.target.value)}
                className="h-10 text-sm rounded-xl border-border bg-muted/50 w-1/2 no-spinner"
              />
              <Input
                type="number"
                placeholder="Máx. R$"
                value={filters.precoMax}
                onChange={(e) => handleFilterChange("precoMax", e.target.value)}
                className="h-10 text-sm rounded-xl border-border bg-muted/50 w-1/2 no-spinner"
              />
            </div>

            {/* Quartos e vagas */}
            <Input
              type="number"
              placeholder="Quartos"
              value={filters.quartos}
              onChange={(e) => handleFilterChange("quartos", e.target.value)}
              className="h-10 text-sm rounded-xl border-border bg-muted/50 w-[80px] no-spinner"
            />
            <Input
              type="number"
              placeholder="Vagas"
              value={filters.vagas}
              onChange={(e) => handleFilterChange("vagas", e.target.value)}
              className="h-10 text-sm rounded-xl border-border bg-muted/50 w-[80px] no-spinner"
            />

            <Button
              onClick={handleSearch}
              className="h-10 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-sm hover:shadow-md transition-all"
            >
              Buscar
            </Button>
          </div>
        </div>
      </section>

      {/* Grid de Imóveis */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground mb-6">
            <span className="font-bold text-foreground">
              {filteredProperties.length}
            </span>{" "}
            imóveis encontrados
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((p) => (
              <div key={p.id} className="relative">
                <button
                  onClick={() => toggleFavorito(Number(p.id))}
                  className="absolute top-3 right-3 z-10 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favoritos.includes(Number(p.id))
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                <PropertyCard
                  id={p.id}
                  image={p.url || "/placeholder.jpg"}
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
        </div>
      </section>

      {/* Modal de Login */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="max-w-sm rounded-2xl text-center">
          <DialogHeader>
            <DialogTitle>Você precisa estar logado</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground mb-4">
            Faça login para favoritar imóveis e salvar suas preferências.
          </p>
          <DialogFooter className="flex justify-center gap-3">
            <Button
              onClick={() => {
                setShowLoginModal(false);
                navigate("/login");
              }}
              className="bg-primary text-white hover:bg-primary/90"
            >
              Fazer Login
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowLoginModal(false)}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CSS inline para remover setas dos inputs numéricos */}
      <style>
        {`
          input[type=number]::-webkit-inner-spin-button, 
          input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}
      </style>
    </div>
  );
};

export default Imoveis;
