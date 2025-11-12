import { useEffect, useState } from "react";

const LGPDBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("lgpd_accept");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const acceptLGPD = () => {
    localStorage.setItem("lgpd_accept", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-muted text-foreground border-t border-border shadow-lg z-[9999]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 p-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Usamos cookies e dados para melhorar sua experiência. Ao continuar,
          você concorda com nossa{" "}
          <a href="/privacidade" className="text-primary underline">
            Política de Privacidade
          </a>.
        </p>

        <button
          onClick={acceptLGPD}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/80 transition"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
};
export default LGPDBanner;