import { Instagram, Mail, MapPin, Phone, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useSectionContent } from "@/hooks/useSiteContent";

export default function Footer() {
  const year = new Date().getFullYear();
  const { content } = useSectionContent("footer");
  const c = {
    address: content?.address ?? "Rua Divinópolis — Bairro Velha — Blumenau / SC",
    phone:   content?.phone   ?? "(47) 99999-9999",
    email:   content?.email   ?? "contato@lagodigarda.com.br",
    instagram: content?.instagram ?? "https://instagram.com/lagodigarda",
  };

  return (
    <footer className="bg-emerald-deep text-paper relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
           style={{ backgroundImage: "radial-gradient(circle at 20% 20%, hsl(42 52% 60%) 0%, transparent 60%)" }} />
      <div className="container-custom pt-16 sm:pt-20 pb-10 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl md:text-4xl font-light tracking-tight">Lago</span>
              <span className="h-px w-10 bg-gold" />
              <span className="font-display text-3xl md:text-4xl font-light tracking-tight">di Garda</span>
            </div>
            <p className="mt-6 max-w-md text-paper/70 font-light leading-relaxed text-pretty">
              Um novo padrão de viver em Blumenau. Condomínio fechado de alto padrão entre a natureza preservada do Vale e a sofisticação contemporânea.
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.32em] text-gold/80 mb-5">Navegação</div>
            <ul className="space-y-3 text-paper/80 font-light">
              <li><a href="#lifestyle" className="hover:text-gold transition-colors">O Condomínio</a></li>
              <li><a href="#infra" className="hover:text-gold transition-colors">Infraestrutura</a></li>
              <li><a href="#masterplan" className="hover:text-gold transition-colors">Masterplan</a></li>
              <li><a href="#location" className="hover:text-gold transition-colors">Localização</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Agendar Visita</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.32em] text-gold/80 mb-5">Contato</div>
            <ul className="space-y-4 text-paper/80 font-light">
              <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-1 text-gold/70 shrink-0" />{c.address}</li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold/70" />{c.phone}</li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold/70" />{c.email}</li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <a href={c.instagram} target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 border border-paper/20 hover:border-gold hover:text-gold flex items-center justify-center transition-all"
                 aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-paper/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-paper/50 font-light">
          <p>© {year} Lago di Garda. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gold transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-gold transition-colors">Termos de Uso</a>
            <Link to="/admin/login" className="flex items-center gap-1 hover:text-gold transition-colors" title="Painel">
              <Settings className="w-3 h-3" /> Painel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
