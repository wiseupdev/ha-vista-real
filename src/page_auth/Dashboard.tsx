import { useAuth } from "@/authProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "@/utility/supabaseClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

interface ChartData {
  mes: string;
  usuarios: number;
  contatos: number;
}

interface CorretorData {
  nome: string;
  contatos: number;
}

interface ImovelFavorito {
  id: string;
  titulo: string;
  favoritos: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dadosGrafico, setDadosGrafico] = useState<ChartData[]>([]);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalImoveis, setTotalImoveis] = useState(0);
  const [totalMensagens, setTotalMensagens] = useState(0);
  const [corretores, setCorretores] = useState<CorretorData[]>([]);
  const [topImoveis, setTopImoveis] = useState<ImovelFavorito[]>([]);

  useEffect(() => {
    if (!user || user.tipo !== "adm") {
      navigate("/");
      return;
    }
    carregarDados();
  }, [user, navigate]);

  const carregarDados = async () => {
    try {
      const { count: countClientes } = await supabase
        .from("HA_user")
        .select("*", { count: "exact", head: true })
        .eq("tipo", "cliente");

      const { count: countImoveis } = await supabase
        .from("HA_IMOVEIS")
        .select("*", { count: "exact", head: true })
        .eq("status", "TRUE");

      const { data: contatos } = await supabase
        .from("HA_contatos")
        .select("client_id, created_at");

      const uniqueClients = new Set(contatos?.map((c) => c.client_id));
      setTotalUsuarios(countClientes || 0);
      setTotalImoveis(countImoveis || 0);
      setTotalMensagens(uniqueClients.size);

      const { data: usuarios } = await supabase
        .from("HA_user")
        .select("data")
        .eq("tipo", "cliente");

      const meses = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez",
      ];

      const agrupados: Record<string, { usuarios: number; contatos: number }> = {};
      meses.forEach((m) => (agrupados[m] = { usuarios: 0, contatos: 0 }));

      usuarios?.forEach((u) => {
        const data = new Date(u.data);
        const mes = meses[data.getMonth()];
        agrupados[mes].usuarios++;
      });

      contatos?.forEach((c) => {
        const data = new Date(c.created_at);
        const mes = meses[data.getMonth()];
        agrupados[mes].contatos++;
      });

      setDadosGrafico(
        meses.map((mes) => ({
          mes,
          usuarios: agrupados[mes].usuarios,
          contatos: agrupados[mes].contatos,
        }))
      );

      const { data: listaCorretores } = await supabase
        .from("HA_corretor")
        .select("id, nome");

      const { data: contatosCorretores } = await supabase
        .from("HA_contatos")
        .select("id_corretor");

      const contatosPorCorretor: Record<string, number> = {};
      contatosCorretores?.forEach((c) => {
        if (c.id_corretor) {
          contatosPorCorretor[c.id_corretor] =
            (contatosPorCorretor[c.id_corretor] || 0) + 1;
        }
      });

      const dadosCorretores =
        listaCorretores?.map((c) => ({
          nome: c.nome,
          contatos: contatosPorCorretor[c.id] || 0,
        })) || [];

      setCorretores(dadosCorretores);

      const { data: favs } = await supabase
        .from("HA_favorito")
        .select("imovel_id");

      const contagemFavoritos: Record<string, number> = {};
      favs?.forEach((f) => {
        contagemFavoritos[f.imovel_id] =
          (contagemFavoritos[f.imovel_id] || 0) + 1;
      });

      const topIds = Object.entries(contagemFavoritos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id]) => id);

      const { data: imoveisTop } = await supabase
        .from("HA_IMOVEIS")
        .select("id, titulo")
        .in("id", topIds);

      const topFavoritos =
        imoveisTop?.map((i) => ({
          id: i.id,
          titulo: i.titulo,
          favoritos: contagemFavoritos[i.id],
        })) || [];

      setTopImoveis(topFavoritos);
    } catch (err) {
      console.error("Erro ao carregar dados do dashboard:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-6 md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        📊 Painel do Administrador
      </h1>

      {/* === CARDS === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-card p-5 rounded-2xl shadow text-center">
          <h2 className="text-lg md:text-xl font-semibold">👥 Usuários</h2>
          <p className="text-3xl md:text-4xl font-bold mt-2 text-blue-500">
            {totalUsuarios}
          </p>
        </div>
        <div className="bg-card p-5 rounded-2xl shadow text-center">
          <h2 className="text-lg md:text-xl font-semibold">🏠 Imóveis</h2>
          <p className="text-3xl md:text-4xl font-bold mt-2 text-green-500">
            {totalImoveis}
          </p>
        </div>
        <div className="bg-card p-5 rounded-2xl shadow text-center">
          <h2 className="text-lg md:text-xl font-semibold">💬 Mensagens</h2>
          <p className="text-3xl md:text-4xl font-bold mt-2 text-amber-500">
            {totalMensagens}
          </p>
        </div>
      </div>

      {/* === GRÁFICO 1 === */}
      <div className="bg-card p-5 md:p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">
          📈 Crescimento de Usuários e Contatos
        </h2>
        <div className="w-full h-[250px] sm:h-[300px] md:h-[400px]">
          <ResponsiveContainer>
            <LineChart data={dadosGrafico}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="mes" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30,41,59,0.9)",
                  borderRadius: "10px",
                  border: "1px solid rgba(148,163,184,0.3)",
                  color: "#f1f5f9",
                }}
                itemStyle={{ color: "#f1f5f9" }}
                labelStyle={{ color: "#93c5fd", fontWeight: 600 }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="usuarios"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Usuários"
              />
              <Line
                type="monotone"
                dataKey="contatos"
                stroke="#10b981"
                strokeWidth={3}
                name="Contatos"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* === GRÁFICO 2 === */}
      <div className="bg-card p-5 md:p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">
          🤝 Contatos por Corretor
        </h2>
        <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={corretores}
              margin={{ top: 5, right: 10, left: 0, bottom: 50 }}
            >
              <defs>
                <linearGradient id="gradCorretor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="nome"
                tickFormatter={(v) =>
                  v.length > 10 ? v.slice(0, 10) + "..." : v
                }
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis />
              <Tooltip cursor={{ fill: "rgba(99,102,241,0.1)" }} />
              <Bar
                dataKey="contatos"
                fill="url(#gradCorretor)"
                radius={[10, 10, 0, 0]}
              >
                {corretores.map((_, i) => (
                  <Cell key={i} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* === GRÁFICO 3 === */}
      <div className="bg-card p-5 md:p-6 rounded-2xl shadow">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">
          ⭐ Top 5 Imóveis Favoritados
        </h2>
        <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topImoveis}
              margin={{ top: 5, right: 10, left: 0, bottom: 50 }}
            >
              <defs>
                <linearGradient id="gradImovel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="titulo"
                tickFormatter={(v) =>
                  v.length > 12 ? v.slice(0, 12) + "..." : v
                }
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis />
              <Tooltip
                formatter={(value: any, name: any, props: any) => [
                  `${value} favoritos`,
                  `Imóvel ID: ${props.payload.id}`,
                ]}
              />
              <Bar
                dataKey="favoritos"
                fill="url(#gradImovel)"
                radius={[10, 10, 0, 0]}
              >
                {topImoveis.map((_, i) => (
                  <Cell key={i} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
