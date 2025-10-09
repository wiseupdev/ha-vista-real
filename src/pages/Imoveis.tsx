import { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const Imoveis = () => {
  const allProperties = [
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
    {
      id: "5",
      image: property1,
      title: "Loft Industrial Pinheiros",
      price: "R$ 980.000",
      location: "Pinheiros, São Paulo - SP",
      bedrooms: 1,
      bathrooms: 1,
      area: 85,
      type: "Apartamento",
    },
    {
      id: "6",
      image: property2,
      title: "Apartamento de Luxo Jardins",
      price: "R$ 4.200.000",
      location: "Jardins, São Paulo - SP",
      bedrooms: 4,
      bathrooms: 3,
      area: 220,
      type: "Apartamento",
    },
  ];

  const [filteredProperties] = useState(allProperties);

  const handleSearch = (params: { query: string; type: string; maxPrice: string }) => {
    console.log("Parâmetros de busca:", params);
    // Aqui você implementaria a lógica de filtro real
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-card to-background py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-foreground mb-4 text-center animate-fade-in">
            Nossos <span className="text-primary">Imóveis</span>
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-8 animate-fade-in">
            Explore nossa seleção exclusiva de propriedades de alto padrão
          </p>
          <div className="animate-fade-in-scale">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              <span className="font-bold text-foreground">{filteredProperties.length}</span> imóveis encontrados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Imoveis;
