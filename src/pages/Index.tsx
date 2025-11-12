import { useEffect, useState } from "react";
import { ArrowRight, Award, Shield, Clock, Star, Quote, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import supabase from "@/utility/supabaseClient";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Imagens
import bgDark from "@/assets/hero-luxury-real-estate.jpg";
import bgLight from "@/assets/hero-luxury-light.jpg";

// Definindo uma interface para o Imóvel com a contagem de likes e URLs
interface Imovel {
  id: number;
  titulo: string;
  cidade?: string;
  bairro?: string;
  valor?: number;
  tipo?: string;
  quartos?: number;
  banheiros?: number;
  metros?: number;
  status?: boolean;
  url?: { [key: string]: string } | null; // Adiciona o campo URL (JSONB)
  HA_favorito: { user_id: string }[] | null;
  likes: number; // Adicionado após o processamento
  image: string; // URL da primeira imagem para o Card
}

const Index = () => {
  // Detectar tema atual
  const [theme, setTheme] = useState(
    document.documentElement.classList.contains("light") ? "light" : "dark"
  );

  const [imoveis, setImoveis] = useState<Imovel[]>([]); // Tipagem adicionada
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.classList.contains("light")
        ? "light"
        : "dark";
      setTheme(currentTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // 🔹 Buscar imóveis mais favoritados (ALTERADO)
  useEffect(() => {
    const buscarImoveis = async () => {
      setLoading(true);
      
      // 1. Buscamos os imóveis, incluindo as URLs e a lista de favoritos
      const { data, error } = await supabase
        .from("HA_IMOVEIS")
        .select(`
          id,
          titulo,
          cidade,
          bairro,
          valor,
          tipo,
          quartos,
          banheiros,
          metros,
          status,
          url,
          HA_favorito (user_id)
        `)
        .eq("status", true)
        // Buscamos um número maior que 10 se houver, para depois ordenar e pegar os 10 mais curtidos.
        // Se a ordem for crucial, o ideal seria uma View ou Função SQL no Supabase.
        .limit(50); // Aumentamos o limite para ter mais amostra para ordenar.

      if (error) {
        console.error("Erro ao buscar imóveis:", error);
        setLoading(false);
        return;
      }

      // 2. Processar, calcular likes e adicionar a primeira URL da imagem
      let listaProcessada: Imovel[] = data.map((i: any) => {
        const likesCount = i.HA_favorito ? i.HA_favorito.length : 0;
        
        // Pega a primeira URL do objeto JSONB para usar como imagem de capa
        let firstImageUrl = "/placeholder.jpg"; 
        if (i.url && typeof i.url === 'object') {
          const urlsArray = Object.values(i.url);
          if (urlsArray.length > 0) {
            firstImageUrl = urlsArray[0];
          }
        }

        return {
          ...i,
          likes: likesCount,
          image: firstImageUrl,
        };
      });

      // 3. Ordenar a lista pelo número de likes (do maior para o menor)
      listaProcessada.sort((a, b) => b.likes - a.likes);

      // 4. Limitar aos 10 mais favoritados para o carrossel
      const top10Imoveis = listaProcessada.slice(0, 10);

      setImoveis(top10Imoveis);
      setLoading(false);
    };

    buscarImoveis();
  }, []); // Dependências vazias, roda apenas no mount

  const benefits = [
    {
      icon: Award,
      title: "Imóveis Exclusivos",
      description: "Portfolio selecionado com os melhores imóveis do mercado",
    },
    {
      icon: Shield,
      title: "Segurança Jurídica",
      description: "Processos transparentes e documentação completa",
    },
    {
      icon: Clock,
      title: "Atendimento Ágil",
      description: "Equipe dedicada disponível para você 24/7",
    },
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Compradora",
      text: "Experiência excepcional! A equipe da H.A me ajudou a encontrar o apartamento perfeito.",
      rating: 5,
    },
    {
      name: "João Santos",
      role: "Vendedor",
      text: "Vendi meu imóvel em tempo recorde. Profissionalismo e dedicação impecáveis.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Locatária",
      text: "Encontrei minha casa dos sonhos. Atendimento personalizado e suporte total.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center justify-center overflow-hidden transition-all"
        style={{
          backgroundImage: `url(${theme === "light" ? bgLight : bgDark})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-white text-6xl font-extrabold text-center drop-shadow-lg">
            Encontre Seu <span className="text-primary">Imóvel</span> dos Sonhos
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-fade-in">
            Mais de 15 anos conectando pessoas aos melhores imóveis de alto padrão
          </p>

          {/* Search Bar */}
          <div className="max-w-5xl mx-auto mb-8 animate-fade-in-scale">
            <SearchBar />
          </div>

          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl px-8 py-6 text-lg shadow-[var(--shadow-primary)] transition-all hover:scale-105 animate-fade-in"
          >
            <Link to="/credito">
              Simule seu Crédito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">Imóveis Mais Favoritados ⭐</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja a seleção dos imóveis mais populares e desejados por nossos clientes
            </p>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground">Carregando imóveis...</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              className="mb-12"
            >
              {imoveis.map((imovel) => (
                <SwiperSlide key={imovel.id}>
                  <div className="relative">
                    {/* Aqui passamos a URL da primeira imagem, extraída na lógica acima */}
                    <PropertyCard 
                        id={String(imovel.id)}
                        image={imovel.image}
                        title={imovel.titulo}
                        price={imovel.valor?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) || "Sob Consulta"}
                        location={`${imovel.bairro || ""}, ${imovel.cidade || ""}`}
                        bedrooms={imovel.quartos || 0}
                        bathrooms={imovel.banheiros || 0}
                        area={imovel.metros || 0}
                        type={imovel.tipo || ""}
                        
                    />
                    {/* Ícone discreto de favoritos */}
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      <span>{imovel.likes}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl font-bold"
            >
              <Link to="/imoveis">
                Ver Todos os Imóveis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-foreground mb-6">Sobre a H.A Imobiliária</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Com mais de 15 anos de experiência no mercado imobiliário, a H.A Imobiliária se
                consolidou como referência em imóveis de alto padrão na região.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Nossa missão é transformar sonhos em realidade, oferecendo um atendimento
                personalizado e soluções completas para compra, venda e locação de imóveis
                exclusivos.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl"
              >
                <Link to="/sobre">Conheça Nossa História</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-background rounded-2xl p-6 border border-border hover:border-primary transition-colors animate-fade-in"
                >
                  <benefit.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experiências reais de quem encontrou seu imóvel conosco
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 border border-border hover:border-primary transition-all hover:shadow-[var(--shadow-hover)] animate-fade-in"
              >
                <Quote className="h-10 w-10 text-primary mb-4" />
                <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6 animate-fade-in">
            Pronto para Encontrar Seu Imóvel Ideal?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Nossa equipe de especialistas está pronta para ajudá-lo em cada etapa da jornada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-scale">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl px-8"
            >
              <Link to="/contato">Fale Conosco</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl font-bold"
            >
              <Link to="/imoveis">Ver Imóveis</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;