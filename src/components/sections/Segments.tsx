import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building, Factory, UtensilsCrossed, PartyPopper, Sparkles } from "lucide-react";

const segments = [
  {
    icon: Building,
    title: "Imobiliário",
    description: "Vídeos que vendem empreendimentos e valorizam imóveis de alto padrão.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Factory,
    title: "Empresas e Indústrias",
    description: "Comunicação institucional que fortalece a imagem corporativa.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurantes e Bares",
    description: "Conteúdo gastronômico que desperta desejo e atrai clientes.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: PartyPopper,
    title: "Eventos",
    description: "Cobertura completa que eterniza momentos especiais.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Sparkles,
    title: "Marcas e Campanhas",
    description: "Filmes publicitários que posicionam e diferenciam sua marca.",
    color: "from-purple-500 to-purple-600",
  },
];

const Segments = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-gradient-dark">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Segmentos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Atuação em{" "}
            <span className="text-gradient">diversos mercados</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Experiência consolidada em diferentes segmentos, com entendimento 
            profundo das necessidades de cada mercado.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {segments.map((segment, index) => (
            <motion.div
              key={segment.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative p-6 rounded-2xl border-gradient bg-card text-center card-hover"
            >
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${segment.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <segment.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">{segment.title}</h3>
              <p className="text-sm text-muted-foreground">{segment.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Segments;
