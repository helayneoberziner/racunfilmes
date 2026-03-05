import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Video, Megaphone, Smartphone, Building2, Calendar, ArrowRight, Vote, LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSectionContent } from "@/hooks/useSiteContent";

const ICON_MAP: Record<string, LucideIcon> = {
  Video, Megaphone, Smartphone, Building2, Calendar, Vote,
};

const DEFAULT_ITEMS = [
  { icon: "Video", title: "Vídeos Institucionais", description: "Apresente sua empresa de forma profissional e conquiste a confiança do seu público." },
  { icon: "Megaphone", title: "Campanhas Publicitárias", description: "Filmes comerciais que posicionam sua marca e geram conversão." },
  { icon: "Smartphone", title: "Conteúdo para Redes", description: "Vídeos otimizados que engajam e convertem nas plataformas digitais." },
  { icon: "Building2", title: "Vídeos Imobiliários", description: "Tours e apresentações que valorizam e vendem empreendimentos." },
  { icon: "Calendar", title: "Cobertura de Eventos", description: "Registro profissional que eterniza momentos importantes." },
  { icon: "Vote", title: "Campanhas Eleitorais", description: "Vídeos estratégicos que conectam candidatos ao eleitorado." },
];

const DEFAULTS = {
  tag: "Serviços",
  title_prefix: "O que",
  title_highlight: "fazemos",
  subtitle: "Soluções audiovisuais completas para cada necessidade da sua marca.",
  items: DEFAULT_ITEMS,
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSectionContent('services');
  const c = { ...DEFAULTS, ...content };
  const items = c.items ?? DEFAULT_ITEMS;

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container-custom">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">{c.tag}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            {c.title_prefix} <span className="text-gradient">{c.title_highlight}</span>
          </h2>
          <p className="text-muted-foreground">{c.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((service: any, index: number) => {
            const IconComp = ICON_MAP[service.icon] ?? Video;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group relative p-6 rounded-xl border-gradient bg-card card-hover"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-5 glow-primary group-hover:scale-110 transition-transform duration-300">
                    <IconComp className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.6 }} className="text-center mt-12">
          <Button variant="heroOutline" size="lg" asChild>
            <a href="#contact" className="flex items-center gap-2">
              Solicitar Orçamento
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
