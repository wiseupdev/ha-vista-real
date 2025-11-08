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
import { PlusCircle, Trash2, Pencil, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

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
    foto: "",
  });

  // 🔄 Carregar corretores
  async function carregarCorretores() {
    const { data, error } = await supabase.from("HA_corretor").select("*");
    if (!error) setCorretores(data || []);
    else console.error(error);
  }

  useEffect(() => {
    carregarCorretores();
  }, []);

  // ✅ Selecionar/desmarcar corretores
  const handleSelect = (id: number) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // 🗑️ Excluir corretores selecionados
  const handleExcluirSelecionados = async () => {
    if (selecionados.length === 0)
      return alert("Selecione ao menos um corretor!");
    if (!confirm("Deseja realmente excluir os corretores selecionados?")) return;

    const { error } = await supabase
      .from("HA_corretor")
      .delete()
      .in("id", selecionados);

    if (!error) {
      setSelecionados([]);
      carregarCorretores();
    } else {
      console.error(error);
    }
  };

  // ✏️ Abrir modal (para novo ou edição)
  const handleAbrirModal = (corretor: any = null) => {
    if (corretor) {
      setEditando(corretor);
      setForm(corretor);
    } else {
      setEditando(null);
      setForm({ nome: "", email: "", numero: "", descricao: "", creci: "", foto: "" });
    }
    setShowModal(true);
  };

  // 📸 Upload da foto (somente local por enquanto)
  const handleFotoChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, foto: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // 💾 Salvar (inserir ou atualizar)
  const handleSalvar = async () => {
    if (!form.nome || !form.email) {
      alert("Preencha pelo menos o nome e o email!");
      return;
    }

    if (editando) {
      // Atualizar corretor existente
      const { error } = await supabase
        .from("HA_corretor")
        .update({
          nome: form.nome,
          email: form.email,
          numero: form.numero,
          descricao: form.descricao,
          creci: form.creci,
        })
        .eq("id", editando.id);

      if (!error) alert("Corretor atualizado com sucesso!");
      else console.error(error);
    } else {
      // Criar novo corretor
      const { error } = await supabase.from("HA_corretor").insert([
        {
          nome: form.nome,
          email: form.email,
          numero: form.numero,
          descricao: form.descricao,
          creci: form.creci,
        },
      ]);

      if (!error) alert("Corretor cadastrado com sucesso!");
      else console.error(error);
    }

    setShowModal(false);
    setEditando(null);
    carregarCorretores();
  };

  // 🔍 Filtrar corretores
  const corretoresFiltrados = corretores.filter((c) =>
    c.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Cabeçalho com busca e botões */}
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

      {/* 👔 Tabela de corretores */}
      <div className="rounded-md border border-border shadow-sm overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[50px] text-center">Sel.</TableHead>
              <TableHead>ID</TableHead>
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
              corretoresFiltrados.map((c) => (
                <TableRow
                  key={c.id}
                  className={`hover:bg-muted/30 ${
                    selecionados.includes(c.id) ? "bg-muted/50" : ""
                  }`}
                >
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      checked={selecionados.includes(c.id)}
                      onChange={() => handleSelect(c.id)}
                      className="accent-primary"
                    />
                  </TableCell>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>
                    <img
                      src={c.foto || "https://via.placeholder.com/40"}
                      alt="Foto"
                      className="rounded-full w-10 h-10 object-cover border"
                    />
                  </TableCell>
                  <TableCell className="font-semibold">{c.nome}</TableCell>
                  <TableCell>{c.email || "-"}</TableCell>
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
                  colSpan={8}
                  className="text-center text-muted-foreground py-6"
                >
                  Nenhum corretor encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🧾 Modal de Cadastro/Atualização */}
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
                src={form.foto || "https://via.placeholder.com/100"}
                alt="Foto do corretor"
                className="rounded-full w-24 h-24 object-cover border"
              />
              <label className="flex items-center gap-2 cursor-pointer text-sm text-blue-600">
                <Upload className="w-4 h-4" />
                <span>Selecionar foto</span>
                <input
                  type="file"
                  accept="image/*"
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
