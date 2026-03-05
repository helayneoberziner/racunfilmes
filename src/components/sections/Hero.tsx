import { motion } from "framer-motion";
import { Play, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
import { useSectionContent } from "@/hooks/useSiteContent";

const DEFAULTS = {
  badge: "Produtora Audiovisual",
  title_prefix: "Vídeos que",
  title_highlight1: "vendem",
  title_connector: "e",
  title_highlight2: "posicionam",
  subtitle: "Produzimos conteúdo audiovisual estratégico para empresas que querem se destacar no mercado.",
  whatsapp_number: "5547999999999",
  whatsapp_message: "Olá! Gostaria de saber mais sobre os serviços da Racun Filmes.",
};

const Hero = () => {
  const { content } = useSectionContent('hero');
  const c = { ...DEFAULTS, ...content };
  const message = encodeURIComponent(c.whatsapp_message);

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Produção cinematográfica" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-20 px-5 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary">
              {c.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6"
          >
            {c.title_prefix}{" "}
            <span className="text-gradient glow-text">{c.title_highlight1}</span> {c.title_connector}{" "}
            <span className="text-gradient glow-text">{c.title_highlight2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-xl text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-10 px-2"
          >
            {c.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#contact" className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Solicitar Orçamento
              </a>
            </Button>
            <Button variant="whatsapp" size="xl" asChild>
              <a href={`https://wa.me/${c.whatsapp_number}?text=${message}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
