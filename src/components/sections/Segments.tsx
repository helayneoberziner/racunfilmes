import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building, Factory, UtensilsCrossed, PartyPopper, Sparkles } from "lucide-react";
import { Vote } from "lucide-react";

const segments = [
  {
    icon: Building,
    title: "Imobiliário",
    description: "Vídeos que vendem e valorizam imóveis.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Factory,
    title: "Empresas",
    description: "Comunicação que fortalece sua imagem.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: UtensilsCrossed,
    title: "Gastronomia",
    description: "Conteúdo que desperta desejo.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: PartyPopper,
    title: "Eventos",
    description: "Cobertura que eterniza momentos.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Sparkles,
    title: "Marcas",
    description: "Filmes que posicionam e diferenciam.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Vote,
    title: "Eleições",
    description: "Campanhas que conectam candidatos.",
    color: "from-red-500 to-red-600",
  },
];

const Segments = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Segmentos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            Mercados que <span className="text-gradient">atendemos</span>
          </h2>
          <p className="text-muted-foreground">
            Experiência em diferentes segmentos com entendimento das necessidades de cada mercado.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {segments.map((segment, index) => (
            <motion.div
              key={segment.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative p-5 rounded-xl border-gradient bg-card text-center card-hover"
            >
              <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${segment.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <segment.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold mb-1">{segment.title}</h3>
              <p className="text-xs text-muted-foreground">{segment.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Segments;
