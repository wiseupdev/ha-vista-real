import { Building2, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import LGPDBanner from "./LGPDBanner"; // ✅ Banner LGPD

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-card border-t border-border relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

            {/* Logo e Descrição */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <img
                  src={logo}
                  alt="logo"
                  className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
                />
                <span className="text-xl font-bold text-foreground">H.A Imoveis Conceito</span>
              </Link>

              <p className="text-muted-foreground text-sm mb-4 max-w-md leading-relaxed">
                Especializada em imóveis de alto padrão, oferecemos soluções completas para compra,
                venda e locação. Seu sonho, nossa missão.
              </p>

              <div className="space-y-1 text-xs text-muted-foreground">
                <p>
                  <strong>CRECI:</strong> 12345-J
                </p>
                <p>Registro profissional válido e regularizado</p>
              </div>
            </div>

            {/* Contato */}
            <div>
              <h3 className="text-foreground font-bold mb-4">Contato</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Av. Principal, 1000 - Centro
                    <br />
                    São Paulo, SP
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <a
                    href="tel:+5511999999999"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    (85) 98112-7529
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <a
                    href="mailto:contato@haimobiliaria.com.br"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    contato@haimobiliaria.com.br
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Legais */}
            <div>
              <h3 className="text-foreground font-bold mb-4">Informações</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/privacidade"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    to="/termos"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Redes Sociais e Copyright */}
          <div className="border-t border-border pt-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} H.A Imoveis Conceito. Todos os direitos reservados.
            </p>

            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Espaço extra para evitar colisão com botão WhatsApp */}
        <div className="h-20 md:h-10" />
      </footer>

      {/* ✅ Banner LGPD */}
      <LGPDBanner />
    </>
  );
};

export default Footer;
