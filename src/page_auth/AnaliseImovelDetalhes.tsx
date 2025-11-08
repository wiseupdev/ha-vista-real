import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "@/utility/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AnaliseImovelDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [solicitacao, setSolicitacao] = useState<any>(null);
  const [midias, setMidias] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  // 🔄 Carregar solicitação do Supabase
  async function carregarSolicitacao() {
    const { data, error } = await supabase
      .from("HA_solicitacoes")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      setSolicitacao(data);
      const urls = data.url
        ? data.url.split(",").map((u: string) => u.trim())
        : [];
      setMidias(urls);
    } else {
      console.error("Erro ao carregar solicitação:", error);
    }
  }

  useEffect(() => {
    carregarSolicitacao();
  }, [id]);

  // ✅ Alterar status para "enviado"
  const marcarComoEnviado = async () => {
    const { error } = await supabase
      .from("HA_solicitacoes")
      .update({ status: "enviado" })
      .eq("id", id);

    if (error) {
      alert("❌ Erro ao atualizar status: " + error.message);
    } else {
      setShowModal(false);
      navigate("/AnaliseImoveis"); // Volta para a lista
    }
  };

  if (!solicitacao) return <p className="p-6">Carregando detalhes...</p>;

  // 🔹 Campos principais da tabela
  const campos = [
    { label: "Nome", key: "name" },
    { label: "E-mail", key: "email" },
    { label: "Número", key: "numero" },
    { label: "Tipo", key: "tipo" },
    { label: "Finalidade", key: "finalidade" },
    { label: "Título", key: "titulo" },
    { label: "Endereço", key: "endereço" },
    { label: "Metros", key: "metros" },
    { label: "Quartos", key: "quartos" },
    { label: "Banheiros", key: "banheiros" },
    { label: "Vagas", key: "vagas" },
    { label: "Valor", key: "valor" },
    { label: "Descrição", key: "descrição" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 🔹 Cabeçalho */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Detalhes da Solicitação</h1>

        {solicitacao.status === "em_analise" ? (
          <Button onClick={() => setShowModal(true)}>Marcar como Enviado</Button>
        ) : (
          <Button disabled variant="secondary">
            ✅ Já Enviado
          </Button>
        )}
      </div>

      {/* 🔸 Informações */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>{solicitacao.titulo || "Sem título"}</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campos.map(({ label, key }) => (
            <p key={key}>
              <b>{label}:</b> {solicitacao[key] ?? "—"}
            </p>
          ))}
        </CardContent>
      </Card>

      {/* 🔹 Mídias */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Mídias Enviadas</CardTitle>
        </CardHeader>
        <CardContent>
          {midias.length === 0 ? (
            <p className="text-gray-500">Nenhuma mídia anexada.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {midias.map((url, i) => (
                <div key={i} className="relative">
                  {url.endsWith(".mp4") || url.endsWith(".webm") ? (
                    <video
                      src={url}
                      controls
                      className="rounded-lg shadow-md w-full h-48 object-cover"
                    />
                  ) : (
                    <img
                      src={url}
                      alt={`Mídia ${i + 1}`}
                      className="rounded-lg shadow-md w-full h-48 object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 🔸 Modal de confirmação */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md text-center space-y-4">
          <DialogHeader>
            <DialogTitle>Confirmar Envio</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Deseja marcar esta solicitação como <b>"enviada"</b>?
          </p>
          <DialogFooter className="flex justify-center gap-4 pt-2">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button onClick={marcarComoEnviado}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
