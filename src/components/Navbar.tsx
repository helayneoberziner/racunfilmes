import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSectionContent } from "@/hooks/useSiteContent";

const links = [
  { name: "O Condomínio", href: "#lifestyle" },
  { name: "Um Dia",       href: "#um-dia" },
  { name: "Infraestrutura", href: "#infra" },
  { name: "Localização",  href: "#location" },
  { name: "Masterplan",   href: "#masterplan" },
  { name: "Galeria",      href: "#gallery" },
  { name: "Contato",      href: "#contact" },
];

const scroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  const el = document.querySelector(href);
  if (!el) return;
  const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top, behavior: "smooth" });
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { content } = useSectionContent("general");
  const logoUrl = content?.logo_url || "";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-xl border-b border-border/70"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom flex h-16 md:h-20 items-center justify-between">
        <a href="#home" onClick={(e) => scroll(e, "#home")} className="flex items-center gap-3 group">
          {logoUrl ? (
            <img src={logoUrl} alt="Lago di Garda" className="h-8 md:h-9 w-auto" />
          ) : (
            <div className={`flex items-baseline gap-2 transition-colors ${scrolled ? "text-ink" : "text-paper"}`}>
              <span className="font-display text-[22px] md:text-[26px] font-light tracking-tight">Lago</span>
              <span className="gold-rule w-6 md:w-8" />
              <span className="font-display text-[22px] md:text-[26px] font-light tracking-tight">di Garda</span>
            </div>
          )}
        </a>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => scroll(e, l.href)}
              className={`text-[12px] uppercase tracking-[0.22em] font-medium transition-colors ${
                scrolled ? "text-ink/70 hover:text-ink" : "text-paper/80 hover:text-paper"
              }`}
            >
              {l.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scroll(e, "#contact")}
            className={`text-[12px] uppercase tracking-[0.22em] font-medium px-5 py-3 border transition-all ${
              scrolled
                ? "border-ink text-ink hover:bg-ink hover:text-paper"
                : "border-paper text-paper hover:bg-paper hover:text-ink"
            }`}
          >
            Agendar Visita
          </a>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden ${scrolled ? "text-ink" : "text-paper"}`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-paper"
          >
            <div className="container-custom py-8 flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { scroll(e, l.href); setOpen(false); }}
                  className="text-base font-light tracking-tight text-ink/80 hover:text-ink"
                >
                  {l.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => { scroll(e, "#contact"); setOpen(false); }}
                className="mt-4 text-center text-[12px] uppercase tracking-[0.22em] font-medium px-5 py-4 border border-ink text-ink"
              >
                Agendar Visita
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
