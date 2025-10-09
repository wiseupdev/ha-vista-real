import { useParams, Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square, Car, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const ImovelDetail = () => {
  const { id } = useParams();

  // Mock data - em produção viria de um banco de dados
  const property = {
    id: id || "1",
    title: "Apartamento Moderno no Brooklin",
    price: "R$ 1.850.000",
    location: "Rua Exemplo, 123 - Brooklin, São Paulo - SP",
    type: "Apartamento",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    parking: 2,
    description:
      "Apartamento alto padrão com acabamento impecável, localizado em uma das regiões mais valorizadas de São Paulo. Conta com ampla varanda gourmet, sala integrada com cozinha planejada, suíte master com closet e banheira de hidromassagem. Condomínio oferece área de lazer completa com piscina, academia, salão de festas e playground.",
    features: [
      "Varanda Gourmet",
      "Cozinha Planejada",
      "Closet na Suíte",
      "Ar Condicionado",
      "Piso Porcelanato",
      "Armários Embutidos",
      "Energia Solar",
      "Sistema de Segurança",
    ],
    amenities: [
      "Piscina",
      "Academia",
      "Salão de Festas",
      "Playground",
      "Quadra Poliesportiva",
      "Sauna",
      "Espaço Gourmet",
      "Segurança 24h",
    ],
    images: [property1, property2, property3],
  };

  const relatedProperties = [
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
  ];

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no imóvel: ${property.title} - ${property.price}`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Confira este imóvel: ${property.title}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button asChild variant="ghost" className="mb-4 hover:text-primary">
          <Link to="/imoveis">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Imóveis
          </Link>
        </Button>
      </div>

      {/* Image Gallery */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl overflow-hidden">
          <div className="md:row-span-2">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {property.images.slice(1).map((image, index) => (
            <div key={index} className="aspect-video overflow-hidden">
              <img
                src={image}
                alt={`${property.title} - ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Property Info */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{property.location}</span>
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
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{property.bedrooms} quartos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{property.bathrooms} banheiros</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{property.area}m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{property.parking} vagas</span>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Sobre o Imóvel</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Características</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Comodidades do Condomínio</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Localização</h2>
              <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.143837616681!2d-46.70260368537467!3d-23.60588608467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5742c5bda7e5%3A0x1e5d731c0f3c6c0!2sBrooklin%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1sen!2sbr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 border border-border sticky top-24 space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Valor do Imóvel</p>
                <p className="text-4xl font-bold text-primary">{property.price}</p>
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

      {/* Related Properties */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8">Imóveis Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProperties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImovelDetail;
