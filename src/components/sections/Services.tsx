import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Video, 
  Smartphone, 
  Megaphone, 
  Building2, 
  Calendar, 
  Target 
} from "lucide-react";

const services = [
  {
    icon: Video,
    title: "Vídeos Institucionais",
    description: "Apresente sua empresa de forma profissional e impactante, transmitindo seus valores e diferenciais.",
  },
  {
    icon: Smartphone,
    title: "Vídeos para Redes Sociais",
    description: "Conteúdo otimizado para cada plataforma, criado para engajar e converter seu público.",
  },
  {
    icon: Megaphone,
    title: "Campanhas Publicitárias",
    description: "Filmes comerciais com narrativa estratégica para campanhas de alto impacto.",
  },
  {
    icon: Building2,
    title: "Vídeos Imobiliários",
    description: "Tours virtuais e apresentações que valorizam e vendem empreendimentos.",
  },
  {
    icon: Calendar,
    title: "Cobertura de Eventos",
    description: "Registro profissional de eventos corporativos, lançamentos e celebrações.",
  },
  {
    icon: Target,
    title: "Conteúdo para Tráfego Pago",
    description: "Criativos otimizados para anúncios que performam e geram resultados.",
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Soluções audiovisuais{" "}
            <span className="text-gradient">completas</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Oferecemos uma gama completa de serviços para atender todas as 
            necessidades de comunicação visual da sua marca.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative p-8 rounded-2xl border-gradient bg-card card-hover"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 glow-primary group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
