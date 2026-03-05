import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSectionContent } from "@/hooks/useSiteContent";

const DEFAULTS = {
  title_prefix: "Pronto para",
  title_highlight: "transformar sua marca",
  title_suffix: "?",
  subtitle: "Vamos criar algo incrível juntos. Entre em contato agora.",
  whatsapp_number: "5547999999999",
  whatsapp_message: "Olá! Quero transformar minha marca com vídeos profissionais.",
};

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSectionContent('cta');
  const c = { ...DEFAULTS, ...content };
  const message = encodeURIComponent(c.whatsapp_message);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-dark">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="container-custom relative z-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            {c.title_prefix}{" "}
            <span className="text-gradient glow-text">{c.title_highlight}</span>{c.title_suffix}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">{c.subtitle}</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="whatsapp" size="xl" asChild>
              <a href={`https://wa.me/${c.whatsapp_number}?text=${message}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#contact" className="flex items-center gap-2">
                Solicitar Orçamento
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
