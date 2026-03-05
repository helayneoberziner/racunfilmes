import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSectionContent } from "@/hooks/useSiteContent";

const DEFAULTS = {
  title_prefix: "Vídeos com",
  title_highlight: "estratégia",
  title_suffix: ", não apenas estética",
  subtitle: "Cada projeto começa com um objetivo claro. Entendemos sua marca, seu público e criamos vídeos que geram resultado.",
};

const StrategyStatement = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSectionContent('strategy');
  const c = { ...DEFAULTS, ...content };

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {c.title_prefix}{" "}
            <span className="text-gradient">{c.title_highlight}</span>{c.title_suffix}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">{c.subtitle}</p>
          <Button variant="heroOutline" size="lg" asChild>
            <a href="#portfolio" className="flex items-center gap-2">
              Ver Portfólio
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default StrategyStatement;
