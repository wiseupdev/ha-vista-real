import { useState } from "react";
import { Search, User, Building2, Settings, Shield, CreditCard, HelpCircle, Megaphone, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Ajuda() {
  const [modo, setModo] = useState<"anunciante" | "comprador">("anunciante");

  const categorias = [
    {
      titulo: "Anúncios",
      artigos: 14,
      icone: <Megaphone className="text-purple-600 w-10 h-10" />,
    },
    {
      titulo: "Canal Pro",
      artigos: 34,
      icone: <Building2 className="text-purple-600 w-10 h-10" />,
    },
    {
      titulo: "Carga e Integração",
      artigos: 14,
      icone: <Settings className="text-purple-600 w-10 h-10" />,
    },
    {
      titulo: "DataZAP",
      artigos: 14,
      icone: <HelpCircle className="text-purple-600 w-10 h-10" />,
    },
    {
      titulo: "Pagamentos",
      artigos: 5,
      icone: <CreditCard className="text-purple-600 w-10 h-10" />,
    },
    {
      titulo: "Segurança",
      artigos: 4,
      icone: <Shield className="text-purple-600 w-10 h-10" />,
    },
    {
      titulo: "Contatos",
      artigos: 1,
      icone: <Phone className="text-purple-600 w-10 h-10" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 md:px-10">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Como podemos te ajudar?
        </h1>

        {/* Campo de busca */}
        <div className="relative w-full md:w-[60%] mx-auto mb-10">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Ex: Como criar um anúncio?"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* Alternância entre modos */}
        <div className="flex justify-center mb-10 gap-2">
          <Button
            variant={modo === "anunciante" ? "default" : "outline"}
            className={`px-6 ${modo === "anunciante" ? "bg-purple-600 text-white" : ""}`}
            onClick={() => setModo("anunciante")}
          >
            Quem anuncia
          </Button>
          <Button
            variant={modo === "comprador" ? "default" : "outline"}
            className={`px-6 ${modo === "comprador" ? "bg-purple-600 text-white" : ""}`}
            onClick={() => setModo("comprador")}
          >
            Quem procura
          </Button>
        </div>

        {/* Grid de categorias */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {categorias.map((cat, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer"
            >
              <CardContent className="flex flex-col items-center text-center py-6">
                {cat.icone}
                <h2 className="mt-4 font-semibold text-lg">{cat.titulo}</h2>
                <p className="text-gray-500 text-sm">{cat.artigos} Artigos</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
