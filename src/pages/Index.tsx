import { ArrowRight, Award, Shield, Clock, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import heroImage from "@/assets/hero-luxury-real-estate.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const Index = () => {
  const featuredProperties = [
    {
      id: "1",
      image: property1,
      title: "Apartamento Moderno no Brooklin",
      price: "R$ 1.850.000",
      location: "Brooklin, São Paulo - SP",
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      type: "Apartamento",
    },
    {
      id: "2",
      image: property2,
      title: "Cobertura Duplex Vila Olímpia",
      price: "R$ 3.500.000",
      location: "Vila Olímpia, São Paulo - SP",
      bedrooms: 4,
      bathrooms: 4,
      area: 250,
      type: "Cobertura",
    },
    {
      id: "3",
      image: property3,
      title: "Casa em Condomínio Fechado",
      price: "R$ 2.200.000",
      location: "Alphaville, Barueri - SP",
      bedrooms: 4,
      bathrooms: 3,
      area: 350,
      type: "Casa",
    },
    {
      id: "4",
      image: property4,
      title: "Villa à Beira-Mar",
      price: "R$ 8.900.000",
      location: "Riviera de São Lourenço, Bertioga - SP",
      bedrooms: 5,
      bathrooms: 5,
      area: 600,
      type: "Casa",
    },
  ];

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
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 animate-fade-in">
            Encontre Seu <span className="text-primary">Imóvel</span> dos Sonhos
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in">
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
            <Link to="/imoveis">
              Explorar Imóveis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">Imóveis em Destaque</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seleção exclusiva dos nossos melhores imóveis disponíveis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

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

      {/* About Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-foreground mb-6">Sobre a H.A Imobiliária</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Com mais de 15 anos de experiência no mercado imobiliário, a H.A Imobiliária se consolidou 
                como referência em imóveis de alto padrão na região.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Nossa missão é transformar sonhos em realidade, oferecendo um atendimento personalizado e 
                soluções completas para compra, venda e locação de imóveis exclusivos.
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

      {/* CTA Section */}
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
