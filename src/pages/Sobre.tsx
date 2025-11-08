import { useEffect, useState } from "react";
import { Award, Users, Target, TrendingUp, Shield, Heart, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import supabase from "@/utility/supabaseClient";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Sobre = () => {
  const [corretores, setCorretores] = useState<any[]>([]);

  //Busca os corretores do banco
  useEffect(() => {
    const fetchCorretores = async () => {
      const { data, error } = await supabase.from("HA_corretor").select("*");
      if (!error && data) {
        setCorretores(data);
      }
    };
    fetchCorretores();
  }, []);

  const stats = [
    { number: "15+", label: "Anos de Experiência" },
    { number: "2.500+", label: "Imóveis Vendidos" },
    { number: "98%", label: "Clientes Satisfeitos" },
    { number: "50+", label: "Corretores Especializados" },
  ];

  const values = [
    { icon: Shield, title: "Confiança", description: "Transparência e ética em todas as nossas negociações" },
    { icon: Heart, title: "Compromisso", description: "Dedicação total para realizar o sonho dos nossos clientes" },
    { icon: Target, title: "Excelência", description: "Busca constante pela qualidade em todos os serviços" },
    { icon: TrendingUp, title: "Inovação", description: "Tecnologia e métodos modernos no mercado imobiliário" },
  ];

  const achievements = [
    { icon: Award, title: "Prêmio Melhor Imobiliária 2023", description: "Reconhecida pela ABMI como a melhor do estado" },
    { icon: Users, title: "Top 10 Nacional", description: "Entre as 10 maiores imobiliárias do Brasil" },
    { icon: TrendingUp, title: "Crescimento Sustentável", description: "Média de 25% de crescimento anual" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-card to-background py-20 border-b border-border text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Sobre a <span className="text-primary">H.A Imobiliária</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Mais de 15 anos transformando sonhos em realidade no mercado imobiliário de alto padrão
        </p>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-5xl font-bold text-primary mb-2">{stat.number}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-background rounded-2xl p-8 border border-border hover:border-primary transition-all text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Nossa Equipe</h2>

          {corretores.length > 4 ? (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={30}
              slidesPerView={4}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {corretores.map((member, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-background rounded-2xl shadow-md border border-border hover:border-primary transition-all p-6 text-center">
                    <img
                      src={member.foto_url || "/placeholder.jpg"}
                      alt={member.nome}
                      className="w-32 h-32 mx-auto rounded-full object-cover mb-6 border-4 border-primary/20"
                    />
                    <h3 className="text-xl font-bold text-foreground">{member.nome}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{member.descricao}</p>
                    <p className="text-xs text-muted-foreground mb-4">{member.creci}</p>
                    <div className="flex items-center justify-center gap-4 text-sm text-primary">
                      <a href={`tel:${member.numero}`} className="flex items-center gap-1 hover:underline">
                        <Phone className="w-4 h-4" /> {member.numero}
                      </a>
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-1 text-sm text-primary">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${member.email}`} className="hover:underline">
                        {member.email}
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {corretores.map((member, i) => (
                <div
                  key={i}
                  className="bg-background rounded-2xl shadow-md border border-border hover:border-primary transition-all p-6 text-center"
                >
                  <img
                    src={member.foto_url || "/placeholder.jpg"}
                    alt={member.nome}
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-6 border-4 border-primary/20"
                  />
                  <h3 className="text-xl font-bold text-foreground">{member.nome}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{member.descricao}</p>
                  <p className="text-xs text-muted-foreground mb-4">{member.creci}</p>
                  <div className="flex items-center justify-center gap-4 text-sm text-primary">
                    <a href={`tel:${member.numero}`} className="flex items-center gap-1 hover:underline">
                      <Phone className="w-4 h-4" /> {member.numero}
                    </a>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1 text-sm text-primary">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${member.email}`} className="hover:underline">
                      {member.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-6">
          Faça Parte da Nossa História
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Venha conhecer nosso portfólio exclusivo de imóveis e descubra por que somos referência 
          no mercado imobiliário
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl px-8">
            <Link to="/imoveis">Explorar Imóveis</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl font-bold">
            <Link to="/contato">Entre em Contato</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
