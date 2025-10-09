import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Simular envio (em produção, conectaria com backend)
    console.log("Formulário enviado:", formData);
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve. Obrigado!",
    });

    // Limpar formulário
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      details: ["Av. Principal, 1000 - Centro", "São Paulo, SP - CEP 01000-000"],
    },
    {
      icon: Phone,
      title: "Telefone",
      details: ["(11) 3456-7890", "(11) 99999-9999"],
    },
    {
      icon: Mail,
      title: "E-mail",
      details: ["contato@haimobiliaria.com.br", "vendas@haimobiliaria.com.br"],
    },
    {
      icon: Clock,
      title: "Horário",
      details: ["Segunda a Sexta: 9h às 18h", "Sábado: 9h às 13h"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-card to-background py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Entre em <span className="text-primary">Contato</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Estamos prontos para ajudá-lo a encontrar o imóvel perfeito. Fale conosco!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all hover:shadow-[var(--shadow-hover)] text-center animate-fade-in"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="animate-fade-in">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-3xl font-bold text-foreground mb-6">Envie sua Mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Nome Completo *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 bg-background border-border rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 bg-background border-border rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                      Telefone
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 bg-background border-border rounded-xl"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Mensagem *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Como podemos ajudá-lo?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[150px] bg-background border-border rounded-xl resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-[var(--shadow-primary)] transition-all hover:scale-105"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </div>

            {/* Map */}
            <div className="animate-fade-in">
              <div className="bg-card rounded-2xl p-6 border border-border h-full">
                <h2 className="text-3xl font-bold text-foreground mb-6">Nossa Localização</h2>
                <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0977869948244!2d-46.65428668537525!3d-23.56156736798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1sen!2sbr!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="mt-6 space-y-4">
                  <p className="text-muted-foreground">
                    Estamos localizados em uma das regiões mais nobres de São Paulo, 
                    com fácil acesso e estacionamento para visitantes.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl"
                  >
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Como Chegar
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Prefere conversar pelo WhatsApp?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nosso time está disponível para atendê-lo de forma rápida e personalizada
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold rounded-xl px-8"
          >
            <a
              href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20mais%20informações."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="mr-2 h-5 w-5" />
              Conversar no WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contato;
