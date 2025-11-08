import { useState } from "react";
import supabase from "@/utility/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { createImovel } from "@/components/ImageEvents";

interface ModalCadastroImovelProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function ModalCadastroImovel({
  open,
  onClose,
  onSave,
}: ModalCadastroImovelProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    cidade: "",
    bairro: "",
    rua: "",
    cep: "",
    numero: "",
    valor: "",
    negociacao: "venda",
    tipo: "",
    nome_anunciante: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    metros: "",
    caracteristicas: "",
    condominio: "",
  });

  const [fotos, setFotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>, tipo: "foto" | "video") => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (tipo === "foto") {
        setFotos((prev) => [...prev, ...filesArray]);
      } else {
        setVideos((prev) => [...prev, ...filesArray]);
      }
    }
  };

  const handleEnviar = async () => {
    setLoading(true);
    try {
    
      // Enviar para o webhook com fotos e vídeos
      const payload = {
        ...form,
        foto: [...fotos, ...videos],
        agree: true,
        phone: "",
        email: "",
        message: "",
        area: form.metros,
        quarto: form.quartos,
        banheiro: form.banheiros,
        vaga: form.vagas,
        valor: form.valor,
        endereco: `${form.rua}, ${form.numero}, ${form.bairro}, ${form.cidade}`,
        tipo: form.tipo,
        finalidade: form.negociacao,
        name: form.nome_anunciante,
        funcao : "cadastro imoveis"
      };

      await createImovel(payload);

      alert("Imóvel e mídias enviados com sucesso!");
      setFotos([]);
      setVideos([]);
      setStep(1);
      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar imóvel ou mídias.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Cadastrar Imóvel" : "Adicionar Fotos e Vídeos"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} />
              <Input name="nome_anunciante" placeholder="Nome do anunciante" value={form.nome_anunciante} onChange={handleChange} />
              <Textarea name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} className="col-span-2" />
              <Input name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />
              <Input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} />
              <Input name="rua" placeholder="Rua" value={form.rua} onChange={handleChange} />
              <Input name="numero" placeholder="Número" value={form.numero} onChange={handleChange} />
              <Input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
              <Input name="tipo" placeholder="Tipo (ex: Casa, Apartamento...)" value={form.tipo} onChange={handleChange} />
              <Input name="valor" placeholder="Valor (R$)" type="number" value={form.valor} onChange={handleChange} />
              <Select value={form.negociacao} onValueChange={(v) => setForm((p) => ({ ...p, negociacao: v }))}>
                <SelectTrigger><SelectValue placeholder="Negociação" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="venda">Venda</SelectItem>
                  <SelectItem value="aluguel">Aluguel</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Label>Status</Label>
                <Switch checked={status} onCheckedChange={setStatus} />
                <span className="text-sm text-muted-foreground">
                  {status ? "Disponível" : "Vendido"}
                </span>
              </div>
              <Input name="quartos" placeholder="Quartos" type="number" value={form.quartos} onChange={handleChange} />
              <Input name="banheiros" placeholder="Banheiros" type="number" value={form.banheiros} onChange={handleChange} />
              <Input name="vagas" placeholder="Vagas" type="number" value={form.vagas} onChange={handleChange} />
              <Input name="metros" placeholder="Metros quadrados" type="number" value={form.metros} onChange={handleChange} />
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Características</h3>
              <Textarea name="caracteristicas" placeholder="Ex: Piscina, Churrasqueira..." value={form.caracteristicas} onChange={handleChange} rows={2} />
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Condomínio oferece</h3>
              <Textarea name="condominio" placeholder="Ex: Academia, Salão de festas..." value={form.condominio} onChange={handleChange} rows={2} />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="secondary" onClick={onClose}>Cancelar</Button>
              <Button onClick={() => setStep(2)}>Próximo</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            <div>
              <Label>Fotos do imóvel</Label>
              <Input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e, "foto")} />
              {fotos.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {fotos.map((file, i) => (
                    <img key={i} src={URL.createObjectURL(file)} alt={`foto-${i}`} className="w-full h-28 object-cover rounded-md" />
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label>Vídeos do imóvel</Label>
              <Input type="file" accept="video/*" multiple onChange={(e) => handleFiles(e, "video")} />
              {videos.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {videos.map((file, i) => (
                    <video key={i} controls className="w-full h-40 rounded-md">
                      <source src={URL.createObjectURL(file)} type={file.type} />
                    </video>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between border-t pt-4">
              <Button variant="secondary" onClick={() => setStep(1)}>Voltar</Button>
              <Button onClick={handleEnviar} disabled={loading}>
                {loading ? "Enviando..." : "Enviar Imóvel"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
