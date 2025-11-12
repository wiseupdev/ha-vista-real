import { useState } from "react";
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
import { createImovel } from "@/components/ImageEvents";
import { X } from "lucide-react";

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
  const [alert, setAlert] = useState<{ message: string; success: boolean } | null>(null);

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    cidade: "",
    bairro: "",
    rua: "",
    cep: "",
    numero: "",
    valor: "",
    negociacao: "",
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

  const handleRemoveFile = (index: number, tipo: "foto" | "video") => {
    if (tipo === "foto") {
      setFotos((prev) => prev.filter((_, i) => i !== index));
    } else {
      setVideos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleEnviar = async () => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        foto: [...fotos, ...videos],
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
        funcao: "cadastro imoveis",
      };

      await createImovel(payload);

      setFotos([]);
      setVideos([]);
      setStep(1);
      setAlert({ message: "Imóvel cadastrado com sucesso!", success: true });
      onSave();
    } catch (err) {
      console.error(err);
      setAlert({ message: "Erro ao enviar imóvel. Tente novamente.", success: false });
    } finally {
      setLoading(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className="max-w-3xl w-full rounded-2xl overflow-hidden p-0 bg-background border shadow-2xl"
          style={{
            maxHeight: "85vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="overflow-y-auto p-6">
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
                  <Input
                    name="numero"
                    placeholder="Número"
                    type="number"
                    value={form.numero}
                    onChange={handleChange}
                    className="no-spinner"
                  />
                  <Input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
                  <Input name="tipo" placeholder="Tipo (ex: Casa, Apartamento...)" value={form.tipo} onChange={handleChange} />
                  <Input
                    name="valor"
                    placeholder="Valor (R$)"
                    type="number"
                    value={form.valor}
                    onChange={handleChange}
                    className="no-spinner"
                  />
                  {/* 📝 Campo de negociação substitui o Select */}
                  <Input
                    name="negociacao"
                    placeholder="Negociação (ex: venda, aluguel...)"
                    value={form.negociacao}
                    onChange={handleChange}
                  />
                  <Input
                    name="quartos"
                    placeholder="Quartos"
                    type="number"
                    value={form.quartos}
                    onChange={handleChange}
                    className="no-spinner"
                  />
                  <Input
                    name="banheiros"
                    placeholder="Banheiros"
                    type="number"
                    value={form.banheiros}
                    onChange={handleChange}
                    className="no-spinner"
                  />
                  <Input
                    name="vagas"
                    placeholder="Vagas"
                    type="number"
                    value={form.vagas}
                    onChange={handleChange}
                    className="no-spinner"
                  />
                  <Input
                    name="metros"
                    placeholder="Metros quadrados"
                    type="number"
                    value={form.metros}
                    onChange={handleChange}
                    className="no-spinner"
                  />
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
                        <div key={i} className="relative">
                          <img src={URL.createObjectURL(file)} alt={`foto-${i}`} className="w-full h-28 object-cover rounded-md" />
                          <button
                            onClick={() => handleRemoveFile(i, "foto")}
                            className="absolute top-1 right-1 bg-black/60 hover:bg-black text-white rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
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
                        <div key={i} className="relative">
                          <video controls className="w-full h-40 rounded-md">
                            <source src={URL.createObjectURL(file)} type={file.type} />
                          </video>
                          <button
                            onClick={() => handleRemoveFile(i, "video")}
                            className="absolute top-1 right-1 bg-black/60 hover:bg-black text-white rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
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
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ Card de confirmação */}
      {alert && (
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-2xl shadow-lg text-center z-[9999] transition-all duration-300 ${
            alert.success ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          <p className="text-lg font-semibold">{alert.message}</p>
        </div>
      )}

      {/* CSS inline para remover setas dos inputs numéricos */}
      <style jsx>{`
        input[type="number"].no-spinner::-webkit-outer-spin-button,
        input[type="number"].no-spinner::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"].no-spinner {
          -moz-appearance: textfield;
        }
      `}</style>
    </>
  );
}
