import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import caixaLogo from "@/assets/caixaalfa.png";
import brasilLogo from "@/assets/brasilalfa.png";
import santanderLogo from "@/assets/santanderalfa.png";
import bradescoLogo from "@/assets/bradescoalfa.png";

export default function Financiamento() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bancos = [
    {
      nome: "Caixa Econômica Federal",
      logo: caixaLogo,
      link: "https://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso&utm_source=chatgpt.com",
    },
    {
      nome: "Banco do Brasil",
      logo: brasilLogo,
      link: "https://cim-simulador-imovelproprio.apps.bb.com.br/simulacao-imobiliario/sobre-imovel?utm_source=chatgpt.com",
    },
    {
      nome: "Banco Santander",
      logo: santanderLogo,
      link: "https://www.santander.com.br/atendimento-para-voce/simuladores/simulador-credito-imobiliario?utm_source=chatgpt.com",
    },
    {
      nome: "Banco Bradesco",
      logo: bradescoLogo,
      link: "https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/encontre-seu-credito/simuladores-imoveis.shtm?utm_source=chatgpt.com",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 🔹 Capa Hero */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1920"
          alt="Facilitação de crédito imobiliário"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg text-center">
            Facilitação de Crédito Imobiliário
          </h1>
        </div>
      </section>

      {/* 🔹 Explicação */}
      <section className="container mx-auto px-6 py-16 text-center max-w-4xl">
        <h2 className="text-3xl font-semibold mb-6 text-primary">
          Encontre o melhor financiamento para o seu novo lar
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Na <span className="font-semibold text-foreground">HA Imobiliária</span>, facilitamos todo o processo
          de crédito imobiliário para que você encontre as melhores taxas e condições do mercado.
          <br />
          <br />
          Nossa equipe de especialistas auxilia desde a simulação até a aprovação do financiamento,
          garantindo uma experiência simples, transparente e segura junto aos principais bancos do país.
        </p>
      </section>

      {/* 🔹 Bancos Parceiros */}
      <section className="container mx-auto px-6 pb-20">
        <h3 className="text-2xl font-semibold text-center mb-8">
          Bancos Parceiros
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {bancos.map((banco) => (
            <Card
              key={banco.nome}
              className="p-6 flex flex-col items-center justify-center hover:shadow-lg transition-all cursor-pointer w-full max-w-[200px]"
            >
              <a
                href={banco.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center"
              >
                <img
                  src={banco.logo}
                  alt={banco.nome}
                  className="h-16 object-contain mx-auto mb-3"
                />
                <p className="font-medium text-foreground text-sm">{banco.nome}</p>
              </a>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
