import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, Bed, Bath, Square, Car, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import supabase from "@/utility/supabaseClient";

interface Imovel {
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
  caracteristicas?: string;
  Condominio?: string;
  quartos?: number;
  banheiros?: number;
  metros?: number;
  vagas?: number;
}

const ImovelDetail = () => {
  const { id } = useParams();
  const [imovel, setImovel] = useState<Imovel | null>(null);
  const [relacionados, setRelacionados] = useState<Imovel[]>([]);

  useEffect(() => {
    const fetchImovel = async () => {
      try {
        const { data, error } = await supabase
          .from("HA_IMOVEIS")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setImovel(data);

        const { data: rel } = await supabase
          .from("HA_IMOVEIS")
          .select("*")
          .eq("tipo", data.tipo)
          .neq("id", id)
          .limit(3);
        setRelacionados(rel || []);
      } catch (err) {
        console.error("Erro ao buscar imóvel:", err);
      }
    };

    if (id) fetchImovel();
  }, [id]);

  const handleWhatsApp = () => {
    if (!imovel) return;
    const message = encodeURIComponent(
      `Olá! Tenho interesse no imóvel: ${imovel.titulo} - ${imovel.valor?.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, "_blank");
  };

  const handleShare = () => {
    if (!imovel) return;
    if (navigator.share) {
      navigator.share({
        title: imovel.titulo,
        text: `Confira este imóvel: ${imovel.titulo}`,
        url: window.location.href,
      });
    }
  };

  if (!imovel) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Carregando informações do imóvel...
      </div>
    );
  }

  const formattedPrice = imovel.valor
    ? imovel.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : "Sob consulta";

  const endereco = `${imovel.rua || ""}, ${imovel.numero || ""} - ${imovel.bairro || ""}, ${
    imovel.cidade || ""
  }`;
  const mapUrl = imovel.cep
    ? `https://www.google.com/maps?q=${imovel.cep}&output=embed`
    : "";

  return (
    <div className="min-h-screen bg-background">
      {/* Botão Voltar */}
      <div className="container mx-auto px-4 py-6">
        <Button asChild variant="ghost" className="mb-4 hover:text-primary">
          <Link to="/imoveis">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Imóveis
          </Link>
        </Button>
      </div>

      {/* Galeria de Imagens */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl overflow-hidden">
          <div className="md:row-span-2 bg-muted aspect-video flex items-center justify-center text-muted-foreground">
            <span>Sem imagem disponível</span>
          </div>
          <div className="bg-muted aspect-video flex items-center justify-center text-muted-foreground">
            <span>—</span>
          </div>
          <div className="bg-muted aspect-video flex items-center justify-center text-muted-foreground">
            <span>—</span>
          </div>
        </div>
      </section>

      {/* Informações do Imóvel */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{imovel.titulo}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{endereco}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShare}
                  className="rounded-full hover:bg-primary hover:text-primary-foreground"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-6 text-muted-foreground mb-6">
                {imovel.quartos ? (
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{imovel.quartos} quartos</span>
                  </div>
                ) : null}
                {imovel.banheiros ? (
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{imovel.banheiros} banheiros</span>
                  </div>
                ) : null}
                {imovel.metros ? (
                  <div className="flex items-center gap-2">
                    <Square className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{imovel.metros}m²</span>
                  </div>
                ) : null}
                {imovel.vagas ? (
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{imovel.vagas} vagas</span>
                  </div>
                ) : null}
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Sobre o Imóvel</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {imovel.descricao || "Descrição não disponível."}
                </p>
              </div>
            </div>

            {/* Características */}
            {imovel.caracteristicas && typeof imovel.caracteristicas === "string" && (
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Características</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imovel.caracteristicas
                    .split(",")
                    .map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full" />
                        <span className="text-muted-foreground">{item.trim()}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Condomínio */}
            {imovel.Condominio && typeof imovel.Condominio === "string" && (
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Comodidades do Condomínio</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imovel.Condominio
                    .split(",")
                    .map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full" />
                        <span className="text-muted-foreground">{item.trim()}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Mapa */}
            {mapUrl && (
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Localização</h2>
                <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Contato */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 border border-border sticky top-24 space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Valor do Imóvel</p>
                <p className="text-4xl font-bold text-primary">{formattedPrice}</p>
              </div>

              <Button
                onClick={handleWhatsApp}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl h-12"
              >
                Fale com um Corretor
              </Button>

              <div className="space-y-3 pt-6 border-t border-border">
                <h3 className="font-bold text-foreground">Informações de Contato</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>📞 (11) 99999-9999</p>
                  <p>✉️ contato@haimobiliaria.com.br</p>
                  <p>🕒 Segunda a Sexta: 9h às 18h</p>
                  <p>🕒 Sábado: 9h às 13h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <section className="py-12 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-8">Imóveis Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relacionados.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  id={String(prop.id)}
                  image="/placeholder.jpg"
                  title={prop.titulo}
                  price={prop.valor?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  location={`${prop.bairro || ""}, ${prop.cidade || ""}`}
                  bedrooms={prop.quartos || 0}
                  bathrooms={prop.banheiros || 0}
                  area={prop.metros || 0}
                  type={prop.tipo || ""}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ImovelDetail;
