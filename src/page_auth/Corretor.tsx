"use client";

import { useEffect, useState } from "react";
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
import { PlusCircle, Trash2, Pencil, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/utility/supabaseClient";



export default function CadastroCorretores() {
  const [corretores, setCorretores] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState<any>(null);
  const [form, setForm] = useState<any>({
    nome: "",
    email: "",
    numero: "",
    descricao: "",
    creci: "",
    foto: null,
    fotoNome: "",
    preview: "",
  });

  // 📦 Busca os corretores do Supabase
  const carregarCorretores = async () => {
    const { data, error } = await supabase
      .from("HA_corretor")
      .select("*")
      ;

    if (error) console.error("Erro ao buscar corretores:", error);
    else setCorretores(data || []);
  };

  useEffect(() => {
    carregarCorretores();
  }, []);

  // 📸 Captura imagem/vídeo
  const handleFotoChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({
        ...form,
        foto: file,
        fotoNome: file.name,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // 📤 Envia para o Webhook (dados + binário)
  const enviarWebhook = async (dadosForm: any, file?: File) => {
    try {
      const webhookUrl =
        process.env.NEXT_PUBLIC_WEBHOOK_URL as string;

      const formData = new FormData();

      // Adiciona todos os campos do formulário
      for (const key in dadosForm) {
        formData.append(key, dadosForm[key]);
      }

      // Adiciona o arquivo binário real
      if (file) {
        formData.append("file", file, file.name);
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("❌ Erro ao enviar webhook:", response.statusText);
      } else {
        console.log("✅ Webhook enviado com sucesso!");
      }
    } catch (err) {
      console.error("❌ Erro no envio do webhook:", err);
    }
  };

  // 💾 Salvar corretor
  const handleSalvar = async () => {
    if (!form.nome || !form.email) {
      alert("Preencha pelo menos o nome e o email!");
      return;
    }

    const payload = {
      ...(editando ? { id: editando.id } : {}),
      nome: form.nome,
      email: form.email,
      numero: form.numero,
      descricao: form.descricao,
      creci: form.creci,
      fotoNome: form.foto?.name || "",
      funcao: editando ? "atualizar_corretor" : "corretor",
      data: new Date().toISOString(), // timestamp
    };

    await enviarWebhook(payload, form.foto);

    alert("✅ Corretor enviado para cadastro!");
    setShowModal(false);
    setEditando(null);

    // 🔄 Atualiza lista após o envio
    setTimeout(() => carregarCorretores(), 2000);
  };

  const corretoresFiltrados = corretores.filter((c) =>
    c.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  // 🧰 Modal de criação/edição
  const handleAbrirModal = (corretor: any = null) => {
    if (corretor) {
      setEditando(corretor);
      setForm(corretor);
    } else {
      setEditando(null);
      setForm({
        nome: "",
        email: "",
        numero: "",
        descricao: "",
        creci: "",
        foto: null,
        fotoNome: "",
        preview: "",
      });
    }
    setShowModal(true);
  };

  // 🗑️ Excluir (opcional via Supabase)
  const handleExcluirSelecionados = async () => {
    if (selecionados.length === 0) return;
    const idsExcluir = selecionados.map((i) => corretores[i].id);

    const { error } = await supabase
      .from("HA_CORRETORES")
      .delete()
      .in("id", idsExcluir);

    if (error) console.error("Erro ao excluir:", error);
    else {
      alert("Corretores excluídos com sucesso!");
      carregarCorretores();
    }
    setSelecionados([]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cadastro de Corretores</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Buscar corretor..."
            className="w-64"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <Button onClick={() => handleAbrirModal()}>
            <PlusCircle className="mr-2 h-5 w-5" /> Novo Corretor
          </Button>
          {selecionados.length > 0 && (
            <Button variant="destructive" onClick={handleExcluirSelecionados}>
              <Trash2 className="mr-2 h-5 w-5" /> Excluir
            </Button>
          )}
        </div>
      </div>

      {/* 📋 Tabela de corretores */}
      <div className="rounded-md border border-border shadow-sm overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[50px] text-center">Sel.</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Creci</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {corretoresFiltrados.length > 0 ? (
              corretoresFiltrados.map((c, i) => (
                <TableRow key={c.id}>
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      checked={selecionados.includes(i)}
                      onChange={() =>
                        setSelecionados((prev) =>
                          prev.includes(i)
                            ? prev.filter((s) => s !== i)
                            : [...prev, i]
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <img
                      src={
                        c.url ||
                        c.preview ||
                        "https://via.placeholder.com/40"
                      }
                      alt="Foto"
                      className="rounded-full w-10 h-10 object-cover border"
                    />
                  </TableCell>
                  <TableCell>{c.nome}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.numero || "-"}</TableCell>
                  <TableCell>{c.creci || "-"}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAbrirModal(c)}
                    >
                      <Pencil className="h-4 w-4 mr-1" /> Atualizar
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
                  Nenhum corretor encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🪟 Modal de cadastro */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editando ? "Atualizar Corretor" : "Cadastrar Novo Corretor"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-3 py-4">
            <div className="flex flex-col items-center gap-3">
              <img
                src={form.preview || "https://via.placeholder.com/100"}
                alt="Foto do corretor"
                className="rounded-full w-24 h-24 object-cover border"
              />
              <label className="flex items-center gap-2 cursor-pointer text-sm text-blue-600">
                <Upload className="w-4 h-4" />
                <span>Selecionar foto ou vídeo</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFotoChange}
                />
              </label>
            </div>

            <Input
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              placeholder="Telefone"
              value={form.numero}
              onChange={(e) => setForm({ ...form, numero: e.target.value })}
            />
            <Input
              placeholder="Creci"
              value={form.creci}
              onChange={(e) => setForm({ ...form, creci: e.target.value })}
            />
            <Textarea
              placeholder="Descrição"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSalvar}>
              {editando ? "Salvar Alterações" : "Cadastrar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
