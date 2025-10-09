import { Award, Users, Target, TrendingUp, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Sobre = () => {
  const stats = [
    { number: "15+", label: "Anos de Experiência" },
    { number: "2.500+", label: "Imóveis Vendidos" },
    { number: "98%", label: "Clientes Satisfeitos" },
    { number: "50+", label: "Corretores Especializados" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Confiança",
      description: "Transparência e ética em todas as nossas negociações",
    },
    {
      icon: Heart,
      title: "Compromisso",
      description: "Dedicação total para realizar o sonho dos nossos clientes",
    },
    {
      icon: Target,
      title: "Excelência",
      description: "Busca constante pela qualidade em todos os serviços",
    },
    {
      icon: TrendingUp,
      title: "Inovação",
      description: "Tecnologia e métodos modernos no mercado imobiliário",
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: "Prêmio Melhor Imobiliária 2023",
      description: "Reconhecida pela ABMI como a melhor do estado",
    },
    {
      icon: Users,
      title: "Top 10 Nacional",
      description: "Entre as 10 maiores imobiliárias do Brasil",
    },
    {
      icon: TrendingUp,
      title: "Crescimento Sustentável",
      description: "Média de 25% de crescimento anual",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-card to-background py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Sobre a <span className="text-primary">H.A Imobiliária</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Mais de 15 anos transformando sonhos em realidade no mercado imobiliário de alto padrão
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-scale">
                <p className="text-5xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Nossa História</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Fundada em 2009, a H.A Imobiliária nasceu com o propósito de revolucionar o mercado 
                imobiliário, oferecendo um atendimento diferenciado e focado nas necessidades reais 
                dos clientes.
              </p>
              <p>
                O que começou como um pequeno escritório com apenas 3 corretores, hoje se transformou 
                em uma das maiores e mais respeitadas imobiliárias da região, com mais de 50 
                profissionais especializados e um portfólio de imóveis exclusivos.
              </p>
              <p>
                Nossa trajetória é marcada pela dedicação, profissionalismo e, principalmente, pela 
                confiança depositada por milhares de clientes que realizaram seus sonhos conosco. 
                Cada negócio fechado representa uma família feliz, um novo lar, uma história de sucesso.
              </p>
              <p className="text-foreground font-semibold">
                Hoje, continuamos firmes em nossa missão: conectar pessoas aos melhores imóveis, 
                com transparência, segurança e excelência no atendimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-8 border border-border hover:border-primary transition-all hover:shadow-[var(--shadow-hover)] text-center animate-fade-in"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
            Reconhecimento e Prêmios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 border border-border text-center hover:border-primary transition-all animate-fade-in"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                  <achievement.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{achievement.title}</h3>
                <p className="text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Faça Parte da Nossa História
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Venha conhecer nosso portfólio exclusivo de imóveis e descubra por que somos referência 
            no mercado imobiliário
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl px-8"
            >
              <Link to="/imoveis">Explorar Imóveis</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl font-bold"
            >
              <Link to="/contato">Entre em Contato</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
