import { Building2, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">H.A Imobiliária</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              Especializada em imóveis de alto padrão, oferecemos soluções completas para compra, venda e locação. 
              Seu sonho, nossa missão.
            </p>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                <strong>CRECI:</strong> 12345-J
              </p>
              <p className="text-xs text-muted-foreground">
                Registro profissional válido e regularizado
              </p>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-foreground font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/imoveis"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Imóveis
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
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
                  (11) 99999-9999
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
        </div>

        {/* Redes Sociais e Copyright */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} H.A Imobiliária. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
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
    </footer>
  );
};

export default Footer;
