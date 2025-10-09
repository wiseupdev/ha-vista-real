import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SearchBarProps {
  onSearch?: (params: { query: string; type: string; maxPrice: string }) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [maxPrice, setMaxPrice] = useState("all");

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ query, type, maxPrice });
    }
  };

  return (
    <div className="w-full bg-card/95 backdrop-blur-md rounded-2xl shadow-[var(--shadow-card)] p-4 md:p-6 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="md:col-span-1">
          <Input
            placeholder="Digite cidade, bairro ou tipo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-xl"
          />
        </div>

        {/* Type Select */}
        <div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="h-12 bg-background border-border text-foreground rounded-xl">
              <SelectValue placeholder="Tipo de Imóvel" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="cobertura">Cobertura</SelectItem>
              <SelectItem value="terreno">Terreno</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Select */}
        <div>
          <Select value={maxPrice} onValueChange={setMaxPrice}>
            <SelectTrigger className="h-12 bg-background border-border text-foreground rounded-xl">
              <SelectValue placeholder="Valor Máximo" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">Qualquer Valor</SelectItem>
              <SelectItem value="500000">Até R$ 500 mil</SelectItem>
              <SelectItem value="1000000">Até R$ 1 milhão</SelectItem>
              <SelectItem value="2000000">Até R$ 2 milhões</SelectItem>
              <SelectItem value="5000000">Até R$ 5 milhões</SelectItem>
              <SelectItem value="10000000">Acima de R$ 5 milhões</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div>
          <Button
            onClick={handleSearch}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-[var(--shadow-primary)] transition-all hover:scale-105"
          >
            <Search className="h-5 w-5 mr-2" />
            Buscar Imóveis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
