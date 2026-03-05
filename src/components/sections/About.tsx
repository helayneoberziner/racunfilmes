import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, Award, TrendingUp } from "lucide-react";
import { useSectionContent } from "@/hooks/useSiteContent";

const features = [
  { icon: Target, title: "Estratégia", description: "Objetivo claro em cada projeto" },
  { icon: Lightbulb, title: "Criatividade", description: "Ideias que se destacam" },
  { icon: Award, title: "Qualidade", description: "Execução profissional" },
  { icon: TrendingUp, title: "Resultado", description: "Vídeos que convertem" },
];

const DEFAULTS = {
  tag: "Quem Somos",
  title_prefix: "Muito mais que",
  title_highlight: "vídeo bonito",
  description1: "A Racun Filmes une estratégia, criatividade e execução profissional. Entendemos que um bom vídeo precisa ter propósito e gerar resultado.",
  description2: "Atuamos com empresas, construtoras, restaurantes, eventos e marcas que buscam se posicionar de forma profissional no mercado.",
  card_subtitle: "Transformando marcas através do audiovisual",
  stat1_value: "50+", stat1_label: "Projetos",
  stat2_value: "30+", stat2_label: "Clientes",
  stat3_value: "5+", stat3_label: "Anos",
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSectionContent('about');
  const c = { ...DEFAULTS, ...content };

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div ref={ref} initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">{c.tag}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-5">
              {c.title_prefix}{" "}
              <span className="text-gradient">{c.title_highlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-5">{c.description1}</p>
            <p className="text-muted-foreground mb-8">{c.description2}</p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="aspect-auto sm:aspect-square rounded-2xl border-gradient bg-card p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mb-5 glow-primary">
                  <span className="text-3xl font-bold text-primary-foreground">R</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Racun Filmes</h3>
                <p className="text-muted-foreground text-sm mb-6">{c.card_subtitle}</p>
                <div className="grid grid-cols-3 gap-4 w-full">
                  <div className="text-center">
                    <span className="text-xl font-bold text-gradient">{c.stat1_value}</span>
                    <p className="text-xs text-muted-foreground mt-1">{c.stat1_label}</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-gradient">{c.stat2_value}</span>
                    <p className="text-xs text-muted-foreground mt-1">{c.stat2_label}</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-gradient">{c.stat3_value}</span>
                    <p className="text-xs text-muted-foreground mt-1">{c.stat3_label}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
