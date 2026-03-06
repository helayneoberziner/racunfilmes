import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building, Factory, UtensilsCrossed, PartyPopper, Sparkles, Vote } from "lucide-react";
import { useSectionContent } from "@/hooks/useSiteContent";

const ICON_MAP: Record<string, any> = {
  Building, Factory, UtensilsCrossed, PartyPopper, Sparkles, Vote,
};

const COLORS = [
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-emerald-600",
  "from-orange-500 to-orange-600",
  "from-pink-500 to-pink-600",
  "from-purple-500 to-purple-600",
  "from-red-500 to-red-600",
];

const DEFAULTS = {
  tag: "Segmentos",
  title_prefix: "Mercados que",
  title_highlight: "atendemos",
  subtitle: "Experiência em diferentes segmentos com entendimento das necessidades de cada mercado.",
  items: [
    { icon: "Building", title: "Imobiliário", description: "Vídeos que vendem e valorizam imóveis." },
    { icon: "Factory", title: "Empresas", description: "Comunicação que fortalece sua imagem." },
    { icon: "UtensilsCrossed", title: "Gastronomia", description: "Conteúdo que desperta desejo." },
    { icon: "PartyPopper", title: "Eventos", description: "Cobertura que eterniza momentos." },
    { icon: "Sparkles", title: "Marcas", description: "Filmes que posicionam e diferenciam." },
    { icon: "Vote", title: "Eleições", description: "Campanhas que conectam candidatos." },
  ],
};

const Segments = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSectionContent("segments");
  const c = { ...DEFAULTS, ...content };

  return (
    <section className="py-20 md:py-28 bg-gradient-dark">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {c.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            {c.title_prefix} <span className="text-gradient">{c.title_highlight}</span>
          </h2>
          <p className="text-muted-foreground">{c.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {(c.items as any[]).map((segment, index) => {
            const Icon = ICON_MAP[segment.icon] ?? Building;
            const color = COLORS[index % COLORS.length];
            return (
              <motion.div
                key={segment.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group relative p-3 sm:p-5 rounded-xl border-gradient bg-card text-center card-hover"
              >
                <div className={`w-11 h-11 sm:w-14 sm:h-14 mx-auto rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-1">{segment.title}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{segment.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Segments;
