// src/pages/Contato.tsx
import { useState, ChangeEvent } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createImovel }  from "@/components/ImageEvents"; // 👈 integração webhook

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    id: "",
    foto: [] as File[],
    tipo: "",
    finalidade: "",
    titulo: "",
    endereco: "",
    area: "",
    quarto: "",
    banheiro: "",
    vaga: "",
    valor: "",
    agree: false,
  });

  const [previews, setPreviews] = useState<string[]>([]);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const updatedFiles = [...formData.foto, ...files];
    setFormData({ ...formData, foto: updatedFiles });

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemovePhoto = (index: number) => {
    const updatedFoto = formData.foto.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFormData({ ...formData, foto: updatedFoto });
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      formData.foto.length === 0 ||
      !formData.tipo ||
      !formData.finalidade ||
      !formData.titulo ||
      !formData.endereco ||
      !formData.area ||
      !formData.quarto ||
      !formData.banheiro ||
      !formData.vaga ||
      !formData.valor ||
      !formData.agree
    ) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await createImovel(formData);

      if (response.ok) {
        toast({
          title: "Imóvel enviado com sucesso!",
          description: "Seu anúncio foi cadastrado e será analisado.",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          id: "",
          foto: [],
          tipo: "",
          finalidade: "",
          titulo: "",
          endereco: "",
          area: "",
          quarto: "",
          banheiro: "",
          vaga: "",
          valor: "",
          agree: false,
        });
        setPreviews([]);
      } else {
        toast({
          title: "Erro ao enviar",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro inesperado",
        description: "Não foi possível enviar o formulário.",
        variant: "destructive",
      });
    }
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
            Anúncie seu <span className="text-primary">imóvel</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Mais de 20K imóveis vendidos. Cadastre seu imóvel conosco e alcance
            milhares de compradores em potencial!
          </p>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="animate-fade-in">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Cadastre seu Imóvel
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Nome Completo *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-12 bg-background border-border rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12 bg-background border-border rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Telefone
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-12 bg-background border-border rounded-xl"
                    />
                  </div>

                  {/* Tipo */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Tipo de Imóvel *
                    </label>
                    <select
                      value={formData.tipo}
                      onChange={(e) =>
                        setFormData({ ...formData, tipo: e.target.value })
                      }
                      className="w-full border rounded-xl p-3 bg-background"
                      required
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="casa">Casa</option>
                      <option value="apartamento">Apartamento</option>
                      <option value="sala comercial">Sala Comercial</option>
                      <option value="terreno">Terreno</option>
                      <option value="chácara">Chácara</option>
                      <option value="fazenda">Fazenda</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  {/* Finalidade */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Finalidade *
                    </label>
                    <select
                      value={formData.finalidade}
                      onChange={(e) =>
                        setFormData({ ...formData, finalidade: e.target.value })
                      }
                      className="w-full border rounded-xl p-3 bg-background"
                      required
                    >
                      <option value="">Selecione a finalidade</option>
                      <option value="venda">Venda</option>
                      <option value="aluguel">Aluguel</option>
                      <option value="temporada">Temporada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Título do anúncio
                    </label>
                    <Input
                      type="text"
                      placeholder="Ex: Casa ampla no centro"
                      value={formData.titulo}
                      onChange={(e) =>
                        setFormData({ ...formData, titulo: e.target.value })
                      }
                      className="h-12 bg-background border-border rounded-xl"
                    />
                  </div>

                  {/* Endereço */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Endereço completo
                    </label>
                    <Input
                      type="text"
                      placeholder="Rua, número, bairro, cidade"
                      value={formData.endereco}
                      onChange={(e) =>
                        setFormData({ ...formData, endereco: e.target.value })
                      }
                      className="h-12 bg-background border-border rounded-xl"
                    />
                  </div>

                  {/* Área, Quartos, Banheiros, Vagas */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Área (m²)", key: "area" },
                      { label: "Quartos", key: "quarto" },
                      { label: "Banheiros", key: "banheiro" },
                      { label: "Vagas", key: "vaga" },
                    ].map((item) => (
                      <div key={item.key} className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">
                          {item.label}
                        </label>
                        <Input
                          type="number"
                          min={0}
                          placeholder={item.label}
                          value={(formData as any)[item.key]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [item.key]: e.target.value,
                            })
                          }
                          className="h-12"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Valor */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Valor pedido (R$)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ex: 4500,00"
                      value={formData.valor}
                      onChange={(e) =>
                        setFormData({ ...formData, valor: e.target.value })
                      }
                    />
                  </div>

                  {/* Descrição */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Descrição *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Descreva seu imóvel"
                      maxLength={500}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="min-h-[150px] bg-background border-border rounded-xl resize-none"
                      required
                    />
                  </div>

                  {/* Fotos */}
                  <div>
                    <label
                      htmlFor="foto"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Fotos *
                    </label>
                    <input
                      id="foto"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoChange}
                      className="bg-background border-border rounded-xl p-2 cursor-pointer"
                    />
                    {previews.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-3">
                        {previews.map((src, index) => (
                          <div key={index} className="relative">
                            <img
                              src={src}
                              alt={`Prévia ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-lg border border-border"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={formData.agree}
                      onChange={(e) =>
                        setFormData({ ...formData, agree: e.target.checked })
                      }
                      required
                    />
                    <label
                      htmlFor="agree"
                      className="text-sm text-muted-foreground"
                    >
                      Aceito os termos e a política de privacidade (LGPD)
                    </label>
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

            {/* Mapa */}
            <div className="animate-fade-in">
              <div className="bg-card rounded-2xl p-6 border border-border h-full">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Nossa Localização
                </h2>
                <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0977869948244!2d-46.65428668537525!3d-23.56156736798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20São%20Paulo%20-%20SP!5e0!3m2!1sen!2sbr!4v1234567890"
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
                    Estamos localizados em uma das regiões mais nobres de São
                    Paulo, com fácil acesso e estacionamento para visitantes.
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
    </div>
  );
};

export default Contato;
