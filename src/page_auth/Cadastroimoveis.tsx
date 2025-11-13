"use client";

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
import { PlusCircle, Trash2, Eye, XCircle } from "lucide-react";
import ModalCadastroImovel from "@/components/ModalCadastroImovel";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CadastroImoveis() {
  const [imoveis, setImoveis] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  async function carregarImoveis() {
    const { data, error } = await supabase.from("HA_IMOVEIS").select("*");
    if (!error) setImoveis(data || []);
    else console.error(error);
  }

  useEffect(() => {
    carregarImoveis();
  }, []);

  const handleSelect = (id: number) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleExcluirSelecionados = async () => {
    if (selecionados.length === 0)
      return alert("Selecione ao menos um imóvel!");
    setConfirmDelete(true);
  };

  const confirmarExclusao = async () => {
    const { error } = await supabase
      .from("HA_IMOVEIS")
      .delete()
      .in("id", selecionados);

    if (!error) {
      setSelecionados([]);
      carregarImoveis();
    } else {
      console.error(error);
    }
    setConfirmDelete(false);
  };

  const handleAbrirDetalhes = (id: number) => {
    navigate(`/imoveisdetalhes/${id}`);
  };

  const imoveisFiltrados = imoveis.filter((i) =>
    i.titulo?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 space-y-6 relative">
      {/* 🔹 Cabeçalho com busca e botões */}
      <div
        className={`flex ${
          isMobile ? "flex-col gap-3" : "justify-between items-center"
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
          Cadastro de Imóveis
        </h1>

        <div
          className={`flex ${
            isMobile ? "flex-col gap-2 w-full" : "flex-row gap-2"
          }`}
        >
          <Input
            placeholder="Buscar imóvel..."
            className={`${isMobile ? "w-full" : "w-64"}`}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <Button
            onClick={() => setShowModal(true)}
            className={`${isMobile ? "w-full" : ""}`}
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Novo Imóvel
          </Button>
          {selecionados.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleExcluirSelecionados}
              className={`${isMobile ? "w-full" : ""}`}
            >
              <Trash2 className="mr-2 h-5 w-5" /> Excluir
            </Button>
          )}
        </div>
      </div>

      {/* 🔹 Tabela (desktop) ou cards (mobile) */}
      {!isMobile ? (
        <div className="rounded-md border border-border shadow-sm overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[50px] text-center">Sel.</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Negociação</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {imoveisFiltrados.length > 0 ? (
                imoveisFiltrados.map((imovel) => (
                  <TableRow
                    key={imovel.id}
                    className={`hover:bg-muted/30 ${
                      selecionados.includes(imovel.id) ? "bg-muted/50" : ""
                    }`}
                  >
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        checked={selecionados.includes(imovel.id)}
                        onChange={() => handleSelect(imovel.id)}
                        className="accent-primary"
                      />
                    </TableCell>
                    <TableCell>{imovel.id}</TableCell>
                    <TableCell className="font-semibold">
                      {imovel.titulo}
                    </TableCell>
                    <TableCell className="capitalize">
                      {imovel.negociacao || "-"}
                    </TableCell>
                    <TableCell className="font-medium text-green-600">
                      {imovel.valor
                        ? `R$ ${imovel.valor.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          imovel.status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {imovel.status ? "Disponível" : "Vendido"}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAbrirDetalhes(imovel.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-6"
                  >
                    Nenhum imóvel encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        // 🔹 Exibição em formato de cards no mobile
        <div className="space-y-4">
          {imoveisFiltrados.length > 0 ? (
            imoveisFiltrados.map((imovel) => (
              <div
                key={imovel.id}
                className={`border rounded-xl p-4 shadow-sm bg-white ${
                  selecionados.includes(imovel.id) ? "border-primary" : ""
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-lg">{imovel.titulo}</h2>
                  <input
                    type="checkbox"
                    checked={selecionados.includes(imovel.id)}
                    onChange={() => handleSelect(imovel.id)}
                    className="accent-primary"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Negociação:</strong> {imovel.negociacao || "-"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Valor:</strong>{" "}
                  {imovel.valor
                    ? `R$ ${imovel.valor.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}`
                    : "-"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      imovel.status ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {imovel.status ? "Disponível" : "Vendido"}
                  </span>
                </p>

                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAbrirDetalhes(imovel.id)}
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-1" /> Detalhes
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              Nenhum imóvel encontrado.
            </p>
          )}
        </div>
      )}

      {/* 🔹 Modal de cadastro */}
      <ModalCadastroImovel
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={carregarImoveis}
      />

      {/* 🔹 Modal de confirmação */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-center animate-in fade-in-50 zoom-in-90">
            <XCircle className="text-red-500 w-12 h-12 mx-auto mb-3" />
            <h2 className="text-xl font-semibold mb-2">Confirmar exclusão</h2>
            <p className="text-gray-600 mb-6">
              Tem certeza de que deseja excluir os imóveis selecionados? <br />
              Essa ação não poderá ser desfeita.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={() => setConfirmDelete(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmarExclusao}>
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
