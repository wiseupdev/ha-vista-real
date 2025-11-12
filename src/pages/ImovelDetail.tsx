import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  ArrowLeft,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import supabase from "@/utility/supabaseClient";

// Define a interface para as URLs (objeto chave/valor)
interface Urls {
  [key: string]: string;
}

interface Imovel {
  id: number;
  titulo: string;
  descricao?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  cep?: string;
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
  url?: Urls;
}

// -------------------------------------------------------------
// Componente de Lightbox/Carrossel Simples (NOVO)
// -------------------------------------------------------------
interface LightboxProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-red-500 transition z-50 p-2 rounded-full bg-black/50"
        aria-label="Fechar galeria"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Botão Anterior */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/80 transition z-40"
        aria-label="Imagem anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Imagem Principal */}
      <div className="relative h-full w-full max-w-6xl max-h-[90vh]">
        <img
          src={images[currentIndex]}
          alt={`Visualização da imagem ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-1 rounded-full text-sm">
          {currentIndex + 1} de {images.length}
        </div>
      </div>

      {/* Botão Próximo */}
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/80 transition z-40"
        aria-label="Próxima imagem"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
// -------------------------------------------------------------

const ImovelDetail = () => {
  const { id } = useParams();
  const [imovel, setImovel] = useState<Imovel | null>(null);
  const [relacionados, setRelacionados] = useState<Imovel[]>([]);
  // NOVO: Estado para controlar o Lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);

  useEffect(() => {
    // ... (fetchImovel permanece o mesmo)
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

  // --- Lógica para extrair TODAS as URLs para o carrossel, e as 3 primeiras para a galeria ---
  let allImageUrls: string[] = [];
  if (imovel.url) {
    allImageUrls = Object.values(imovel.url);
  }
  const displayImageUrls = allImageUrls.slice(0, 3);
  const remainingImagesCount = allImageUrls.length - 3;
  // ------------------------------------------------------------------------------------------

  const formattedPrice = imovel.valor
    ? imovel.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : "Sob consulta";

  const endereco = `${imovel.rua || ""}, ${imovel.numero || ""} - ${imovel.bairro || ""}, ${
    imovel.cidade || ""
  }`;
  
  // URL do mapa ajustada para usar o endereço completo codificado (Melhor precisão)
  const addressQuery = encodeURIComponent(`${imovel.rua}, ${imovel.numero}, ${imovel.bairro}, ${imovel.cidade}, Brasil`);
  const mapUrl = addressQuery
    ? `https://maps.google.com/maps?q=${addressQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    : "";

  return (
    <div className="min-h-screen bg-background">
      {/* Lightbox - Carrossel de Imagens */}
      {isLightboxOpen && (
        <Lightbox
          images={allImageUrls}
          startIndex={lightboxStartIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}

      {/* Botão Voltar */}
      <div className="container mx-auto px-4 py-6">
        <Button asChild variant="ghost" className="mb-4 hover:text-primary">
          <Link to="/imoveis">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Imóveis
          </Link>
        </Button>
      </div>

      {/* Galeria de Imagens - AJUSTADA para 50% | 25% empilhado / 25% + Overlay */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 rounded-2xl overflow-hidden h-[500px] md:h-[600px]">
          {/* Mapeia até as 3 imagens de exibição */}
          {displayImageUrls.map((url, index) => {
            const isFirst = index === 0;
            const isLastOfThree = index === 2; // É a última miniatura a ser exibida (inferior direita)
            const showOverlay = isLastOfThree && remainingImagesCount > 0;

            // Define as classes de grid
            const colRowSpanClass = isFirst
              ? "col-span-1 row-span-2"
              : "col-span-1 row-span-1";

            return (
              <div
                key={index}
                className={`${colRowSpanClass} bg-muted bg-center bg-cover relative group cursor-pointer transition duration-300 ${
                  showOverlay ? "hover:scale-[1.02]" : "hover:brightness-90"
                }`}
                style={{ backgroundImage: `url(${url})` }}
                onClick={() => {
                  setIsLightboxOpen(true);
                  setLightboxStartIndex(index); // Inicia no clique da imagem
                }}
              >
                {/* Overlay de '+N fotos' na última miniatura */}
                {showOverlay && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    +{remainingImagesCount} Fotos
                  </div>
                )}
              </div>
            );
          })}

          {/* Placeholders (para garantir o layout 2x2 se faltarem imagens ou a miniatura 3 for o placeholder) */}
          {displayImageUrls.length < 3 && (
            <>
              {/* O Placeholder para a posição 50% só aparece se displayImageUrls.length === 0 */}
              {displayImageUrls.length === 0 && (
                <div
                  className={`col-span-1 row-span-2 bg-muted flex items-center justify-center text-muted-foreground relative group ${
                    remainingImagesCount > 0 ? "cursor-pointer hover:bg-muted-foreground/10" : ""
                  }`}
                  onClick={() => remainingImagesCount > 0 && setIsLightboxOpen(true)}
                >
                  <span className={remainingImagesCount > 0 ? "opacity-0 group-hover:opacity-0" : ""}>
                    {remainingImagesCount > 0 ? "" : "Nenhuma imagem disponível"}
                  </span>
                  {/* Se for o único espaço e houver mais fotos, o overlay vai aqui */}
                  {remainingImagesCount > 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      +{allImageUrls.length} Fotos
                    </div>
                  )}
                </div>
              )}
              {/* Placeholder superior direito */}
              {displayImageUrls.length <= 1 && (
                <div
                  className={`col-span-1 row-span-1 bg-muted flex items-center justify-center text-muted-foreground relative group ${
                    displayImageUrls.length === 1 && remainingImagesCount > 0
                      ? "cursor-pointer hover:bg-muted-foreground/10"
                      : ""
                  }`}
                  onClick={() =>
                    displayImageUrls.length === 1 &&
                    remainingImagesCount > 0 &&
                    setIsLightboxOpen(true)
                  }
                >
                  <span>—</span>
                </div>
              )}
              {/* Placeholder inferior direito (onde o overlay 'mais fotos' cairia se não houvesse imagem 3) */}
              {displayImageUrls.length <= 2 && (
                <div
                  className={`col-span-1 row-span-1 bg-muted flex items-center justify-center text-muted-foreground relative group ${
                    displayImageUrls.length === 2 && remainingImagesCount > 0
                      ? "cursor-pointer hover:bg-muted-foreground/10"
                      : ""
                  }`}
                  onClick={() =>
                    displayImageUrls.length === 2 &&
                    remainingImagesCount > 0 &&
                    setIsLightboxOpen(true)
                  }
                >
                  <span className={remainingImagesCount > 0 ? "opacity-0 group-hover:opacity-0" : ""}>
                    —
                  </span>
                  {/* Overlay de '+N fotos' no Placeholder inferior direito */}
                  {displayImageUrls.length === 2 && remainingImagesCount > 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      +{remainingImagesCount} Fotos
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Informações do Imóvel (restante do código...) */}
      <section className="container mx-auto px-4 mb-12">
        {/* ... (Restante do seu código, sem alterações necessárias) ... */}
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