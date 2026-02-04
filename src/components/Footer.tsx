import { Instagram, Youtube, Linkedin, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container-custom py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <a href="#home" className="inline-block mb-2">
              <span className="text-xl font-bold tracking-tight">
                <span className="text-gradient">RACUN</span>
                <span className="text-foreground"> FILMES</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground">
              Vídeos que posicionam marcas e geram resultado.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              Quem Somos
            </a>
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
              Serviços
            </a>
            <a href="#portfolio" className="text-muted-foreground hover:text-primary transition-colors">
              Portfólio
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contato
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="https://instagram.com/racunfilmes"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com/@racunfilmes"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/racunfilmes"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Racun Filmes. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
            <Link 
              to="/admin/login" 
              className="flex items-center gap-1 hover:text-primary transition-colors"
              title="Área Administrativa"
            >
              <Settings className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
