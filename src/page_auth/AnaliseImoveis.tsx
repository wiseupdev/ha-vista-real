import { useEffect, useState } from "react";
import supabase from "@/utility/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

export default function AnaliseImoveis() {
  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  // 🔄 Carregar solicitações da tabela HA_solicitacoes
  async function carregarSolicitacoes() {
    const { data, error } = await supabase
      .from("HA_solicitacoes")
      .select("*");

    if (error) {
      console.error("Erro ao carregar solicitações:", error);
    } else {
      setSolicitacoes(data || []);
    }
  }

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  // 🔍 Filtrar por ID, título ou valor
  const filtrados = solicitacoes.filter((s) => {
    const termo = busca.toLowerCase();
    return (
      s.id?.toString().includes(termo) ||
      s.titulo?.toLowerCase().includes(termo) ||
      s.valor?.toString().includes(termo)
    );
  });

  // 👁️ Ir para detalhes (se tiver uma rota)
  const handleAbrirDetalhes = (id: number) => {
    navigate(`/analiseimoveis/${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* 🏠 Cabeçalho */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Imóveis em Análise</h1>
        <Input
          placeholder="Buscar por título, ID ou valor..."
          className="w-64"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* 📋 Tabela */}
      <div className="rounded-md border border-border shadow-sm overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtrados.length > 0 ? (
              filtrados.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/30">
                  <TableCell>{item.id}</TableCell>
                  <TableCell className="font-semibold">
                    {item.titulo || "-"}
                  </TableCell>
                  <TableCell className="capitalize">
                    {item.tipo || "-"}
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {item.valor
                      ? `R$ ${item.valor.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === "em_analise"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "aprovado"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.status
                        ? item.status.replace("_", " ").toUpperCase()
                        : "SEM STATUS"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAbrirDetalhes(item.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-6"
                >
                  Nenhum imóvel em análise encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
