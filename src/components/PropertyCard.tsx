import { MapPin, Bed, Bath, Square } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  type: string;
}

const PropertyCard = ({
  id,
  image,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  type,
}: PropertyCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card border-border hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-[1.02]">
      {/* Image */}
      <div className="relative overflow-hidden h-64">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            {type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Features */}
        {(bedrooms || bathrooms || area) && (
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            {bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4 text-primary" />
                <span>{bedrooms}</span>
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4 text-primary" />
                <span>{bathrooms}</span>
              </div>
            )}
            {area && (
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4 text-primary" />
                <span>{area}m²</span>
              </div>
            )}
          </div>
        )}

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Valor</p>
            <p className="text-2xl font-bold text-primary">{price}</p>
          </div>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all hover:scale-105"
          >
            <Link to={`/imoveis/${id}`}>Ver Detalhes</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
